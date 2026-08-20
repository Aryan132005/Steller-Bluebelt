import { Networks } from '@stellar/stellar-sdk';

/**
 * Configure your deployed contract addresses below after running the deploy script:
 *   ./scripts/deploy.sh (or .\scripts\deploy.ps1)
 */
export const REPUTATION_TOKEN_ID = 'CD7PQTDWCWVBNTJBWWLKKLRPO3KDXB7NKILA3Z7HPHJ27ZL4LIJ5UZRG'; // Replace after deploy
export const TREASURY_CONTRACT_ID = 'CAYGN42YU4NVHRDJCTK3EXL674ZUD7RLDZEEKXEETPNQ5FTZXNKWNDDA'; // Replace after deploy
export const PROPOSAL_CONTRACT_ID = 'CAK7LBF2F5GZH3KNBVZE6UDYCY3BYNBPFVGATJ2WEZ7YI52PHFEEMLMZ'; // Replace after deploy

// For compatibility with any legacy imports
export const CONTRACT_ID = PROPOSAL_CONTRACT_ID;

// Soroban RPC server configured for public Stellar Testnet nodes.
// If encountering rate-limits, you may substitute this with a custom RPC provider.
export const SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org';
export const HORIZON_URL = 'https://horizon-testnet.stellar.org';
export const NETWORK_PASSPHRASE = Networks.TESTNET;

/** How often (ms) the UI polls for live updates. */
export const POLL_INTERVAL_MS = 5000;
