import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useWallet } from './hooks/useWallet';
import { usePollContract } from './hooks/usePollContract';
import { usePollEvents } from './hooks/usePollEvents';
import { WalletConnect } from './components/WalletConnect';
import { ProposalList } from './components/ProposalList';
import { CreateProposalForm } from './components/CreateProposalForm';
import { TransactionStatus } from './components/TransactionStatus';
import { OnboardingTour } from './components/OnboardingTour';
import { FeedbackWidget } from './components/FeedbackWidget';
import { ActivityFeed } from './components/ActivityFeed';
import { SentryErrorBoundary } from './components/SentryErrorBoundary';
import { trackEvent } from './lib/analytics';

// Lazy-load the Treasury tab to reduce initial bundle size and split dependencies
const TreasuryTab = lazy(() => import('./components/TreasuryTab'));
const DelegationTab = lazy(() => import('./components/DelegationTab'));

function LumenMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="17" r="16" stroke="#4ecdc4" strokeWidth="1.4" opacity="0.6" />
      <path d="M17 6 L20 14 L28 17 L20 20 L17 28 L14 20 L6 17 L14 14 Z" fill="#4ecdc4" />
      <circle cx="17" cy="17" r="3" fill="#0b0e1a" />
    </svg>
  );
}

export default function App() {
  const { wallet, connect, disconnect } = useWallet();
  const isConnected = wallet.status === 'connected' && wallet.publicKey;

  const {
    proposals,
    treasuryBalance,
    reputationBalance,
    disbursements,
    latestLedger,
    delegateAddress,
    delegators,
    loading,
    loadError,
    isSyncing,
    txState,
    createProposal,
    vote,
    closeProposal,
    deposit,
    delegate,
    undelegate,
    resetTxState,
    refresh,
  } = usePollContract(wallet.publicKey);

  const { events, error: eventsError } = usePollEvents(true); // Poll events for activity feed globally

  // View States
  const [activeTab, setActiveTab] = useState<'proposals' | 'create' | 'treasury' | 'delegation'>('proposals');
  const [showTour, setShowTour] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [highlightedProposalId, setHighlightedProposalId] = useState<number | null>(null);

  // Track landing page funnel event
  useEffect(() => {
    trackEvent('Funnel_Landing');
  }, []);

  // Parse deep-linked proposal parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const propId = params.get('proposal');
    if (propId) {
      const id = parseInt(propId, 10);
      if (!isNaN(id)) {
        setHighlightedProposalId(id);
        setActiveTab('proposals');
        setTimeout(() => {
          const element = document.getElementById(`proposal-${id}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 1000);
      }
    }
  }, [proposals.length]);

  // Check onboarding and track connected wallet on first connect
  useEffect(() => {
    if (isConnected) {
      const tourCompleted = localStorage.getItem('grantpulse_tour_completed');
      if (!tourCompleted) {
        setShowTour(true);
        localStorage.setItem('grantpulse_tour_completed', 'true');
      }
      trackEvent('WalletConnected', { wallet: wallet.walletName });

      // Onboarding Funnel: Wallet Connected successfully
      const walletConnectedFunnel = sessionStorage.getItem('funnel_wallet_connected');
      if (!walletConnectedFunnel) {
        sessionStorage.setItem('funnel_wallet_connected', 'true');
        trackEvent('Funnel_WalletConnected', { wallet: wallet.walletName });
      }
    }
  }, [isConnected, wallet.walletName]);

  // Contextually trigger feedback widget after first successful vote or proposal creation
  useEffect(() => {
    if (txState.state === 'success') {
      const alreadyProvidedFeedback = localStorage.getItem('grantpulse_feedback');
      if (!alreadyProvidedFeedback) {
        // Delay slightly for good UX
        const timer = setTimeout(() => {
          setShowFeedback(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [txState]);

  const handleVoteSubmit = async (proposalId: number, support: boolean) => {
    trackEvent('VoteInitiated', { proposalId, support });
    await vote(proposalId, support);
  };

  const handleCreateProposalSubmit = async (
    title: string,
    description: string,
    amount: number,
    recipient: string,
    deadlineLedgers: number,
    votingMechanism: number
  ) => {
    trackEvent('ProposalCreationInitiated', { amount, votingMechanism });
    await createProposal(title, description, amount, recipient, deadlineLedgers, votingMechanism);
    setActiveTab('proposals'); // Switch back to view proposals
  };

  const handleCloseProposalSubmit = async (proposalId: number) => {
    trackEvent('ProposalCloseInitiated', { proposalId });
    await closeProposal(proposalId);
  };

  const handleDepositSubmit = async (amount: number) => {
    trackEvent('DepositInitiated', { amount });
    await deposit(amount);
  };

  const handleDelegateSubmit = async (targetAddr: string) => {
    trackEvent('DelegationInitiated', { targetAddr });
    await delegate(targetAddr);
  };

  const handleUndelegateSubmit = async () => {
    trackEvent('UndelegationInitiated');
    await undelegate();
  };

  // Calculate statistics strip metrics
  const totalProposals = proposals.length;
  const totalVotesCast = proposals.reduce((sum, p) => sum + p.supportVotes + p.opposeVotes, 0);
  const totalDisbursed = disbursements.reduce((sum, d) => sum + d.amount, 0);
  const myVotedProposals = proposals.filter((p) => p.userVoted);

  return (
    <SentryErrorBoundary>
      <div className="app">
        <header className="header">
          <div className="header-title">
            <LumenMark />
            <div>
              <h1>GrantPulse</h1>
              <p className="tagline">Reputation-Weighted Governance Pool</p>
            </div>
          </div>
          {isConnected && (
            <div className="sync-indicator">
              <span className={`orb ${isSyncing ? 'busy' : 'live'}`} />
              <span className="sync-text">{isSyncing ? 'Syncing...' : 'Live'}</span>
            </div>
          )}
        </header>

        {/* Public Stats Strip (Visible to all visitors) */}
        <div className="stats-strip card">
          <div className="stats-item">
            <span className="stats-label">📋 Proposals</span>
            <span className="stats-value">{totalProposals}</span>
          </div>
          <div className="stats-item">
            <span className="stats-label">🗳️ Total Votes</span>
            <span className="stats-value">{totalVotesCast} Power</span>
          </div>
          <div className="stats-item">
            <span className="stats-label">🏦 Total Grants</span>
            <span className="stats-value text-accent">{totalDisbursed.toFixed(1)} XLM</span>
          </div>
          <div className="stats-item">
            <span className="stats-label">💰 Pool Liquidity</span>
            <span className="stats-value">{treasuryBalance.toFixed(1)} XLM</span>
          </div>
        </div>

        {/* Wallet Onboarding Guide */}
        {showTour && <OnboardingTour onClose={() => setShowTour(false)} />}

        {/* Global Wallet Card */}
        <WalletConnect
          wallet={wallet}
          reputationBalance={reputationBalance}
          onConnect={connect}
          onDisconnect={disconnect}
          onShowTour={() => setShowTour(true)}
          onShowFeedback={() => setShowFeedback(true)}
        />

        {/* My Activity view for connected voters */}
        {isConnected && wallet.publicKey && (
          <div className="card my-activity-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', margin: 0 }}>👤 My Activity</h3>
              <span className="rep-badge">🏆 <strong>{reputationBalance} REP</strong></span>
            </div>
            {myVotedProposals.length === 0 ? (
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                You haven't cast any votes yet. Help the community by voting on active proposals below to earn +1 REP!
              </p>
            ) : (
              <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                <ul className="activity-list" style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {myVotedProposals.map((p) => (
                    <li key={p.id} style={{ marginBottom: '6px' }}>
                      Voted on <strong>Proposal #{p.id}: {p.title}</strong> (Weight: {p.userWeight} REP)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Contextual Feedback Widget */}
        {showFeedback && (
          <FeedbackWidget onClose={() => setShowFeedback(false)} />
        )}

        {/* Navigation Tabs (Only available when wallet connected) */}
        {isConnected && wallet.publicKey ? (
          <div className="nav-tabs-wrapper">
            <nav className="nav-tabs">
              <button
                className={`nav-tab-btn ${activeTab === 'proposals' ? 'active' : ''}`}
                onClick={() => setActiveTab('proposals')}
              >
                📋 initiatives
              </button>
              <button
                className={`nav-tab-btn ${activeTab === 'create' ? 'active' : ''}`}
                onClick={() => setActiveTab('create')}
              >
                ➕ submit proposal
              </button>
              <button
                className={`nav-tab-btn ${activeTab === 'treasury' ? 'active' : ''}`}
                onClick={() => setActiveTab('treasury')}
              >
                🏦 treasury pool
              </button>
              <button
                className={`nav-tab-btn ${activeTab === 'delegation' ? 'active' : ''}`}
                onClick={() => setActiveTab('delegation')}
              >
                🗳️ delegation
              </button>
            </nav>
          </div>
        ) : (
          <div style={{ marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', margin: '20px 0 4px' }}>
              📋 Active Initiatives (View-Only Mode)
            </h3>
          </div>
        )}

        {/* Transaction Alerts Panel */}
        <TransactionStatus result={txState} onClose={resetTxState} />

        {/* Platform Load Error Display */}
        {loadError && (
          <div className="card load-error-card animated-zoom">
            <h3>⚠️ Network Error</h3>
            <p>{loadError}</p>
            <button className="btn btn-outline" onClick={refresh}>
              🔄 Retry Connection
            </button>
          </div>
        )}

        {/* Tab Views */}
        <div className="tab-view-content">
          {(activeTab === 'proposals' || !isConnected) && (
            <ProposalList
              proposals={proposals}
              loading={loading}
              latestLedger={latestLedger}
              isVoting={txState.state === 'pending'}
              isConnected={Boolean(isConnected)}
              highlightedProposalId={highlightedProposalId}
              onVote={handleVoteSubmit}
              onCloseProposal={handleCloseProposalSubmit}
              onClearHighlight={() => setHighlightedProposalId(null)}
            />
          )}

          {isConnected && activeTab === 'create' && (
            <CreateProposalForm
              treasuryBalance={treasuryBalance}
              isSubmitting={txState.state === 'pending'}
              onCreateProposal={handleCreateProposalSubmit}
            />
          )}

          {isConnected && activeTab === 'treasury' && (
            <Suspense
              fallback={
                <div className="card skeleton-card">
                  <div className="skeleton skeleton-title" style={{ width: '40%' }} />
                  <div className="skeleton skeleton-badge" style={{ height: 48, marginTop: 12 }} />
                </div>
              }
            >
              <TreasuryTab
                treasuryBalance={treasuryBalance}
                disbursements={disbursements}
                loading={loading}
                isSubmitting={txState.state === 'pending'}
                onDeposit={handleDepositSubmit}
              />
            </Suspense>
          )}

          {isConnected && activeTab === 'delegation' && (
            <Suspense
              fallback={
                <div className="card skeleton-card">
                  <div className="skeleton skeleton-title" style={{ width: '40%' }} />
                  <div className="skeleton skeleton-badge" style={{ height: 48, marginTop: 12 }} />
                </div>
              }
            >
              <DelegationTab
                delegateAddress={delegateAddress}
                delegators={delegators}
                isSubmitting={txState.state === 'pending'}
                onDelegate={handleDelegateSubmit}
                onUndelegate={handleUndelegateSubmit}
              />
            </Suspense>
          )}
        </div>

        {/* Live Ledger Activity */}
        <ActivityFeed events={events} error={eventsError} />

        <p className="footer-note">Stellar Soroban MVP · Level 5 Growth & Scale Submission</p>
      </div>
    </SentryErrorBoundary>
  );
}
