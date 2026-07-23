/**
 * Truncate a Stellar G-Address or Contract ID for UI display.
 */
export function truncateAddress(address?: string): string {
  if (!address) return '';
  if (address.length <= 12) return address;
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

/**
 * Format a number as currency (XLM).
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Convert a ledger count into a human-readable estimated duration.
 * Assumes average Stellar ledger sequence takes ~6 seconds.
 */
export function ledgersToTime(ledgers: number): string {
  const seconds = ledgers * 6;
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `~${minutes} min`;
  }
  const hours = (seconds / 3600).toFixed(1);
  return `~${hours} hr`;
}
