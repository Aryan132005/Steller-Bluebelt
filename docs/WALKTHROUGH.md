# Technical Walkthrough - GrantPulse Level 5 Upgrades

This document describes the technical details of the Level 5 updates in the GrantPulse platform.

---

## 1. Public Read-Only Fallback & Stats Strip
When a visitor first lands on GrantPulse without a connected wallet, the frontend uses Alice's keypair address (`GCXAWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY`) as a fallback public key for RPC simulations.
- **Why:** Soroban read queries are executed by simulating transactions, which require an active account public key to fetch ledger sequences.
- **Result:** The system fetches all active proposals, treasury balances, and disbursements immediately, calculating statistics for the Public Stats Strip without requiring wallet popups.
- **Stats Strip calculation:**
  - Total Proposals: `proposals.length`
  - Total Votes: `sum of support_votes + oppose_votes`
  - Disbursed: `sum of disbursements`

---

## 2. Shareable Proposal Deep Links
We implemented direct deep-link proposal routing.
- **Share Trigger:** The `🔗 Share` button on the proposal card copies the URL `window.location.origin + '?proposal=' + proposal.id` to the clipboard.
- **Deep Link Parser:** On app load, `App.tsx` parses `?proposal=X` query parameters.
- **Highlighting & Focus:** If present, the app switches to the "proposals" view, scrolls the card into viewport alignment, and applies a pulsing CSS outline class (`.proposal-card.highlighted`) to emphasize it.

---

## 3. RPC Performance Optimizations under Scale
To prevent 50+ concurrent testers from rate-limiting public RPC nodes, we implemented two front-end optimizations:
1. **Closed Proposal Caching:** Closed proposals have final results and voting states that can never change. We cache their parsed vote history (`userVoted`, `userWeight`) in a memory map `closedProposalVoteCache`, avoiding redundant on-chain calls on subsequent polls.
2. **Parallel Queries:** Optimized sequential `hasVoted` and `getVoteWeight` checks to execute concurrently via `Promise.all`.
3. **Background Tab Throttling:** The polling mechanism checks `document.hidden` before triggering a refresh cycle, suspending blockchain queries when the browser tab is backgrounded.

---

## 4. Optimistic UI for Voting
When a voter clicks "Vote YES" or "Vote NO":
- The UI immediately applies the voter's reputation balance to the proposal's voting tally and toggles the card to a voted state.
- The Freighter/Albedo transaction signature request is processed in the background.
- If the transaction is approved and submits successfully, the app fetches the verified state.
- If the transaction fails, the app performs a state rollback to the original proposals array and displays an action error banner.

---

## 5. Telemetry & User Onboarding
We integrated Plausible/Console logging to map out user onboarding conversions:
1. `Funnel_Landing` — User loads the dashboard.
2. `Funnel_WalletConnectAttempted` — User clicks the connection button.
3. `Funnel_WalletConnected` — User approves wallet links.
4. `Funnel_FirstActionCompleted` — User successfully submits their first vote or proposal.
- **Google Form Prompt:** Upon the first successful transaction, the widget prompts users to fill out our Google Form (`GOOGLE_FORM_URL`), collecting emails, addresses, and user experience ratings.
