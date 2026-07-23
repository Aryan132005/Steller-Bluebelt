import type { WalletState } from '../hooks/useWallet';

interface Props {
  wallet: WalletState;
  reputationBalance: number;
  onConnect: () => void;
  onDisconnect: () => void;
  onShowTour?: () => void;
  onShowFeedback?: () => void;
}

function truncate(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

export function WalletConnect({
  wallet,
  reputationBalance,
  onConnect,
  onDisconnect,
  onShowTour,
  onShowFeedback,
}: Props) {
  const orbClass =
    wallet.status === 'connecting'
      ? 'orb busy'
      : wallet.status === 'connected'
      ? 'orb live'
      : wallet.status === 'error'
      ? 'orb error'
      : 'orb';

  if (wallet.status === 'connected' && wallet.publicKey) {
    return (
      <div className="card wallet-card" id="wallet-card-tour">
        <p className="section-label">
          <span className={orbClass} aria-hidden="true" />
          Active Account
        </p>
        <div className="wallet-row">
          <div className="wallet-info-section">
            <span className="wallet-address">{truncate(wallet.publicKey)}</span>
            <div className="wallet-meta">
              <span className="wallet-provider">{wallet.walletName}</span>
              <span className="divider">•</span>
              <span className="rep-badge">
                🏆 <strong>{reputationBalance} REP</strong>
              </span>
            </div>
          </div>
          <div className="wallet-actions">
            {onShowTour && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={onShowTour}
                title="Show Quick Tour"
              >
                ❓ How it works
              </button>
            )}
            {onShowFeedback && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={onShowFeedback}
                title="Give Feedback"
              >
                💬 Feedback
              </button>
            )}
            <button className="btn btn-ghost btn-sm btn-disconnect" onClick={onDisconnect}>
              Disconnect
            </button>
          </div>
        </div>
        <div className="weight-explanation-banner">
          💡 <strong>Reputation Weight:</strong> Your voting weight is determined by your REP balance at the start of each proposal. Voting awards <strong>+1 REP</strong>!
        </div>
      </div>
    );
  }

  const handleConnectClick = () => {
    import('../lib/analytics').then(({ trackEvent }) => {
      trackEvent('Funnel_WalletConnectAttempted');
    });
    onConnect();
  };

  return (
    <div className="card">
      <div className="empty-state">
        <span className={orbClass} aria-hidden="true" style={{ margin: '0 auto 14px' }} />
        <h2>Welcome to GrantPulse</h2>
        <p style={{ maxWidth: '440px', margin: '0 auto 20px', lineHeight: '1.5', color: 'var(--text-muted)' }}>
          A reputation-weighted community micro-grants platform. Connect your Stellar wallet to submit funding proposals, vote on community initiatives, and inspect the shared treasury.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button
            className="btn btn-primary"
            onClick={handleConnectClick}
            disabled={wallet.status === 'connecting'}
          >
            {wallet.status === 'connecting' ? 'Opening wallet selector…' : 'Connect Wallet'}
          </button>
          {onShowFeedback && (
            <button
              className="btn btn-ghost"
              onClick={onShowFeedback}
              title="Give Feedback"
            >
              💬 Feedback
            </button>
          )}
        </div>
        {wallet.status === 'error' && wallet.errorMessage && (
          <div className="wallet-error-container" style={{ marginBottom: '20px' }}>
            <p className="field-error" style={{ margin: 0 }}>
              {wallet.errorKind === 'not_found' && '🔌 '}
              {wallet.errorKind === 'rejected' && '🚫 '}
              {wallet.errorKind === 'insufficient_balance' && '💰 '}
              {wallet.errorMessage}
            </p>
            {wallet.errorKind === 'not_found' && (
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>
                Hint: Make sure your wallet extension is installed and unlocked, or try using <strong>Albedo</strong> which is web-based and doesn't require installation.
              </p>
            )}
          </div>
        )}

        <div className="wallet-help-guide" style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', width: '100%', textAlign: 'left' }}>
          <h4 style={{ fontSize: 13, margin: '0 0 10px', color: 'var(--text)' }}>💡 Which wallet should I use?</h4>
          <ul className="wallet-guide-list" style={{ paddingLeft: '20px', margin: 0, fontSize: 12, color: 'var(--text-muted)', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '6px' }}>
              <strong>Albedo (Recommended for instant testing):</strong> A secure, web-based Stellar wallet. Works immediately on mobile & desktop without downloading anything.
            </li>
            <li style={{ marginBottom: '6px' }}>
              <strong>Freighter (Stellar's official extension):</strong> Recommended for desktop developers. Download it at <a href="https://www.freighter.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)' }}>freighter.app</a>.
            </li>
            <li>
              <strong>xBull:</strong> A feature-rich browser extension. Download it at <a href="https://xbull.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)' }}>xbull.app</a>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
