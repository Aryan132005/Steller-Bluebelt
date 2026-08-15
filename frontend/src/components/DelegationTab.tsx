import { useState } from 'react';
import { truncateAddress } from '../lib/utils';

interface Props {
  delegateAddress: string | null;
  delegators: string[];
  isSubmitting: boolean;
  onDelegate: (address: string) => void;
  onUndelegate: () => void;
}

// Simulated top delegates for leaderboard and governance mapping
const MOCK_LEADERBOARD = [
  { rank: 1, address: 'GD74KW264WDBB5VHPLMFVPBTJ4XUGSNWENI6LHW7GPZ6GSBBCRH4M6HI', rep: 280, name: 'Alice (DAO Steward)' },
  { rank: 2, address: 'GAIDNY7SKU2GW7OTQ7YAEJG4TYWUOJIHQONER7FLLVAQXEX4M5UKGZ4J', rep: 195, name: 'Bob (Core Dev)' },
  { rank: 3, address: 'GAWFJ52NSFAY7ZHZRQ2HF2W4JT7Q3JLNK2WSDU5HAJGUSOORACGIYGM7', rep: 120, name: 'Charlie (Community Lead)' },
  { rank: 4, address: 'GB44L2MSU7YC7WQRJKMOGXZYNZKJFABB3YHSW7TF7JGJO74EDOVN6ZIR', rep: 85, name: 'Dev Team Multisig' },
];

export default function DelegationTab({
  delegateAddress,
  delegators,
  isSubmitting,
  onDelegate,
  onUndelegate,
}: Props) {
  const [targetAddress, setTargetAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAddress) {
      setError('Please enter a valid Stellar address.');
      return;
    }
    if (targetAddress.length !== 56 || !targetAddress.startsWith('G')) {
      setError('Stellar addresses must start with G and be 56 characters long.');
      return;
    }
    setError(null);
    onDelegate(targetAddress);
    setTargetAddress('');
  };

  return (
    <div className="delegation-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Active Delegation Card */}
      <div className="card delegation-status-card" style={{ borderLeft: delegateAddress ? '4px solid var(--accent)' : '4px solid var(--primary)' }}>
        <p className="section-label">Governance Status</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ margin: '0 0 6px 0' }}>
              {delegateAddress ? '🗳️ Voting Power Delegated' : '👤 Direct Voting Active'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0, lineHeight: '1.4' }}>
              {delegateAddress
                ? `You have delegated your reputation voting power to ${truncateAddress(delegateAddress)}. They will vote on your behalf.`
                : 'You are currently voting directly with your own reputation weight on all active proposals.'}
            </p>
          </div>
          {delegateAddress && (
            <button
              className="btn btn-outline btn-sm"
              onClick={onUndelegate}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Undelegating...' : '🔄 Revoke Delegation'}
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Set Delegation Form */}
        <div className="card">
          <p className="section-label">Action Panel</p>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>Delegate Your Reputation</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20, lineHeight: '1.4' }}>
            Choose a delegate to represent you in voting. Your reputation balance is temporarily added to their weight. You can revoke delegation at any time.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                placeholder="Stellar Public Key (G...)"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
                disabled={isSubmitting || !!delegateAddress}
                className={error ? 'input-error' : ''}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
              />
              {error && <p className="field-error" style={{ margin: 0, fontSize: 12 }}>{error}</p>}
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !!delegateAddress || !targetAddress}
                style={{ alignSelf: 'flex-start' }}
              >
                {isSubmitting ? 'Delegating...' : '🗳️ Delegate Power'}
              </button>
            </div>
            {delegateAddress && (
              <p style={{ fontSize: 12, color: 'var(--accent)', marginTop: 8, margin: '8px 0 0' }}>
                * Revoke current delegation first to choose a new delegate.
              </p>
            )}
          </form>
        </div>

        {/* Delegators List */}
        <div className="card">
          <p className="section-label">Your Supporters</p>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>Delegations to You</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16, lineHeight: '1.4' }}>
            Addresses that have delegated their reputation voting weight to you:
          </p>

          {delegators.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, border: '1px dashed var(--border)', borderRadius: '6px' }}>
              No active delegators yet. Earn reputation to establish leadership in the DAO.
            </div>
          ) : (
            <div style={{ maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {delegators.map((addr) => (
                <div key={addr} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: 12 }}>
                  <span style={{ fontFamily: 'monospace' }}>{truncateAddress(addr)}</span>
                  <span style={{ color: 'var(--accent)' }}>Active Support</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Delegate Leaderboard */}
      <div className="card">
        <p className="section-label">Stewardship Leaderboard</p>
        <h3 style={{ marginTop: 0, marginBottom: 16 }}>Top Governance Delegates</h3>
        <div className="table-responsive">
          <table className="feedback-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '12px' }}>Rank</th>
                <th style={{ padding: '12px' }}>Delegate</th>
                <th style={{ padding: '12px' }}>Address</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Voting Power (REP)</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.map((item) => (
                <tr key={item.rank} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: item.address === delegateAddress ? 'rgba(78, 205, 196, 0.05)' : 'transparent' }}>
                  <td style={{ padding: '12px' }}>🏆 {item.rank}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.name}</td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{truncateAddress(item.address)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', color: 'var(--primary)' }}>{item.rep} REP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
