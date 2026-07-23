import { useState } from 'react';
import type { Proposal } from '../lib/soroban';
import { truncateAddress, ledgersToTime } from '../lib/utils';

interface Props {
  proposals: Proposal[];
  loading: boolean;
  latestLedger: number;
  isVoting: boolean;
  isConnected: boolean;
  highlightedProposalId?: number | null;
  onVote: (proposalId: number, support: boolean) => void;
  onCloseProposal: (proposalId: number) => void;
  onClearHighlight?: () => void;
}

export function ProposalList({
  proposals,
  loading,
  latestLedger,
  isVoting,
  isConnected,
  highlightedProposalId,
  onVote,
  onCloseProposal,
  onClearHighlight,
}: Props) {
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyLink = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?proposal=${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const filteredProposals = proposals.filter((p) => {
    // If a proposal is deep-linked and highlighted, bypass the normal filters to show it
    if (highlightedProposalId && p.id === highlightedProposalId) {
      return true;
    }

    const isDeadlinePassed = latestLedger >= p.votingDeadlineLedger;
    const isProposalClosed = p.closed;

    if (filter === 'active') {
      return !isProposalClosed && !isDeadlinePassed;
    }
    if (filter === 'closed') {
      return isProposalClosed;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="proposal-list-container">
        {[1, 2].map((i) => (
          <div key={i} className="card skeleton-card">
            <div className="skeleton-badge-row">
              <div className="skeleton skeleton-badge" />
              <div className="skeleton skeleton-badge" />
            </div>
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-bar" />
            <div className="skeleton skeleton-buttons" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="proposal-list-container">
      {highlightedProposalId && onClearHighlight && (
        <div className="highlight-banner card animated-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: '500' }}>
              🔍 Viewing shared <strong>Proposal #{highlightedProposalId}</strong>
            </span>
            <button className="btn btn-ghost btn-sm" onClick={onClearHighlight}>
              ✕ Show All
            </button>
          </div>
        </div>
      )}

      <div className="filter-tabs">
        <button
          className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({proposals.length})
        </button>
        <button
          className={`tab-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({proposals.filter((p) => !p.closed && latestLedger < p.votingDeadlineLedger).length})
        </button>
        <button
          className={`tab-btn ${filter === 'closed' ? 'active' : ''}`}
          onClick={() => setFilter('closed')}
        >
          Closed ({proposals.filter((p) => p.closed).length})
        </button>
      </div>

      {filteredProposals.length === 0 ? (
        <div className="card empty-state">
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            No proposals found matching the filter.
          </p>
        </div>
      ) : (
        filteredProposals.map((proposal) => {
          const totalVotes = proposal.supportVotes + proposal.opposeVotes;
          const supportPct =
            totalVotes > 0 ? Math.round((proposal.supportVotes / totalVotes) * 100) : 0;
          const opposePct =
            totalVotes > 0 ? Math.round((proposal.opposeVotes / totalVotes) * 100) : 0;

          const isDeadlinePassed = latestLedger >= proposal.votingDeadlineLedger;
          const isClosed = proposal.closed;

          let badgeClass = '';
          let badgeText = '';

          if (isClosed) {
            if (proposal.approved) {
              badgeClass = 'approved';
              badgeText = 'Passed & Disbursed';
            } else {
              badgeClass = 'rejected';
              badgeText = 'Rejected';
            }
          } else {
            if (isDeadlinePassed) {
              badgeClass = 'pending-close';
              badgeText = 'Pending Closure';
            } else {
              badgeClass = 'active';
              badgeText = 'Active';
            }
          }

          const isCurrentlyHighlighted = highlightedProposalId === proposal.id;

          return (
            <div
              key={proposal.id}
              id={`proposal-${proposal.id}`}
              className={`card proposal-card ${isClosed ? 'closed' : ''} ${
                isCurrentlyHighlighted ? 'highlighted' : ''
              }`}
            >
              <div className="proposal-header">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className={`badge ${badgeClass}`}>{badgeText}</span>
                  {isCurrentlyHighlighted && <span className="badge highlighted-badge">Shared</span>}
                </div>
                <div className="proposal-header-right">
                  <button
                    className="btn btn-ghost btn-sm btn-share"
                    onClick={(e) => handleCopyLink(proposal.id, e)}
                    title="Copy share link"
                  >
                    {copiedId === proposal.id ? '✅ Copied!' : '🔗 Share'}
                  </button>
                  <span className="proposal-id-tag">Proposal #{proposal.id}</span>
                </div>
              </div>

              <h2 className="proposal-title">{proposal.title}</h2>
              <p className="proposal-description">{proposal.description}</p>

              <div className="proposal-meta-grid">
                <div>
                  <span className="meta-label">Requested Amount</span>
                  <span className="meta-value text-accent">💰 {proposal.requestedAmount} XLM</span>
                </div>
                <div>
                  <span className="meta-label">Recipient</span>
                  <span className="meta-value" title={proposal.recipient}>
                    👤 {truncateAddress(proposal.recipient)}
                  </span>
                </div>
                <div>
                  <span className="meta-label">Creator</span>
                  <span className="meta-value" title={proposal.creator}>
                    👤 {truncateAddress(proposal.creator)}
                  </span>
                </div>
                <div>
                  <span className="meta-label">Voting Deadline</span>
                  <span className="meta-value">
                    ⏱️ Ledger {proposal.votingDeadlineLedger}{' '}
                    {!isClosed && !isDeadlinePassed && `(${ledgersToTime(proposal.votingDeadlineLedger - latestLedger)} left)`}
                  </span>
                </div>
              </div>

              {/* Tally Bars */}
              <div className="tally-section">
                <div className="tally-labels">
                  <span>Support: <strong>{proposal.supportVotes} REP</strong> ({supportPct}%)</span>
                  <span>Oppose: <strong>{proposal.opposeVotes} REP</strong> ({opposePct}%)</span>
                </div>
                <div className="tally-bar">
                  <div
                    className="tally-bar-fill support"
                    style={{ width: `${supportPct}%` }}
                  />
                  <div
                    className="tally-bar-fill oppose"
                    style={{ width: `${opposePct}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="proposal-actions-row">
                {!isConnected ? (
                  <div className="connect-to-vote-banner">
                    🔒 Connect wallet to vote. Your voting power is weighted by your REP balance.
                  </div>
                ) : !isClosed && !isDeadlinePassed && (
                  <>
                    {proposal.userVoted ? (
                      <div className="voted-indicator">
                        ✅ You voted (Weight: <strong>{proposal.userWeight ?? 0} REP</strong>)
                      </div>
                    ) : (
                      <div className="voting-action-block">
                        <div className="vote-weight-inline-explanation">
                          💡 You will vote with <strong>{proposal.userWeight ?? 0} REP</strong> (reputation balance captured at snapshot block #{proposal.startLedger}). Voting awards you <strong>+1 REP</strong>!
                        </div>
                        <div className="voting-buttons">
                          <button
                            className="btn btn-outline btn-support"
                            onClick={() => onVote(proposal.id, true)}
                            disabled={isVoting}
                          >
                            👍 Vote YES (Support)
                          </button>
                          <button
                            className="btn btn-outline btn-oppose"
                            onClick={() => onVote(proposal.id, false)}
                            disabled={isVoting}
                          >
                            👎 Vote NO (Oppose)
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Closing a passed proposal */}
                {isConnected && !isClosed && isDeadlinePassed && (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => onCloseProposal(proposal.id)}
                    disabled={isVoting}
                  >
                    🔒 Finalize Voting & Disburse
                  </button>
                )}

                {isClosed && (
                  <div className="closed-indicator">
                    🏁 Voting ended. {proposal.approved ? 'Funds disbursed from treasury.' : 'Proposal rejected by community.'}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
