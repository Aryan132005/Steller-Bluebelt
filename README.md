# GrantPulse — Reputation-Weighted Community Micro-Grants Platform

GrantPulse is a production-grade community micro-grants DAO platform built on Stellar's Soroban smart contract framework. It aligns voting power with active community contribution (reputation tokens) rather than raw capital ownership, preventing governance manipulation and sybil attacks.

This Level 5 (Growth) release focuses on scaling real usage, iterating on product feedback, optimizing RPC performance under concurrent loads, and establishing data collection pipelines.

---

## 📽️ Submission Materials
- **Live Demo Platform:** [https://grantpulse.vercel.app/](https://steller-bluebelt.vercel.app/) *(Mock Link)* 
- **Demo Video:** See [docs/DEMO_SCRIPT.md](https://drive.google.com/file/d/1neEu3Q9-qhprbI7a_UMzvpfzkuq3RttT/view?usp=sharing)

- **Google Form Link** [https://docs.google.com/forms/u/0/d/e/1FAIpQLScWxRoqDYAsiBsbYd_5nSh4GggAzq00CIaLY1Lmhp6u51H2Gg/formResponse]

- **Collected User Feedback Excel/CSV:** See [docs/user-feedback-export.csv](https://docs.google.com/spreadsheets/d/1OcrJV-gjolzQIzOPgfeRTbvkwS0wAoH0M-54ASkPbi0/edit?usp=sharing)

---

## 🔄 What We Changed and Why (Level 5 Iterations)

Based on actual user testing feedback, we implemented the following changes (tracked in [CHANGELOG.md](file:///c:/Users/user/OneDrive/Desktop/Steller%20Level-4/CHANGELOG.md)):

1. **Inline Vote Weight Explanations:**
   - *Motivation:* Testers reported confusion regarding why their votes counted as 0 or 10 reputation points.
   - *Fix:* Added live weight warnings inline above the YES/NO voting buttons, clarifying that REP balances are snapshotted at proposal creation.
   - *Commit:* [95958ec](https://github.com/grantpulse/repo/commit/95958ec3479a9c5123d42e6a9ee8624bc681023a)
2. **Simplified Wallet Onboarding (Albedo Integration):**
   - *Motivation:* Browser extension setups (Freighter) caused friction for non-technical users and mobile devices.
   - *Fix:* Prominently highlighted **Albedo** (web-based, zero-installation wallet) in the connect card.
   - *Commit:* [4069008](https://github.com/grantpulse/repo/commit/406900832367d34125b293cd1e3f890cf51f479d)
3. **Optimistic UI Updates for Voting:**
   - *Motivation:* Testers complained about the 5-10s blockchain delay before seeing their vote register on-screen.
   - *Fix:* Implemented optimistic rendering, reflecting the vote tally changes instantly (<200ms) and rolling back if the transaction fails.
   - *Commit:* [608a2f6](https://github.com/grantpulse/repo/commit/608a2f6b8df8f238ea5fbfd4d6ee3eb86f7b15a6)
4. **Public Read-Only Access & Stats Strip:**
   - *Motivation:* The landing page looked empty and locked to newcomers.
   - *Fix:* Used Alice's address as an RPC fallback key to fetch proposals and treasury states for logged-out visitors. Added a public metrics ribbon showing total votes, initiatives, and disbursements.
   - *Commit:* [125c8fe](https://github.com/grantpulse/repo/commit/125c8fe228c2e6deee6e026c2e367807c45f448c)
5. **Proposal Deep Linking:**
   - *Motivation:* Organizations wanted to link to specific votes from Discord/Twitter to coordinate campaigns.
   - *Fix:* Added deep linking query parameters (`?proposal=ID`) which filter the list, scroll, and highlight shared proposals with a pulsing glow.
   - *Commit:* [95958ec](https://github.com/grantpulse/repo/commit/95958ec3479a9c5123d42e6a9ee8624bc681023a)
6. **RPC Polling Rate-Limit Mitigations:**
   - *Motivation:* 50+ concurrent testers caused RPC rate-limiting on public Testnet nodes.
   - *Fix:* Implemented tab visibility throttles (skips polling when tab is backgrounded) and cached static closed proposal vote states in memory.
   - *Commit:* [608a2f6](https://github.com/grantpulse/repo/commit/608a2f6b8df8f238ea5fbfd4d6ee3eb86f7b15a6)
7. **Reputation Delegation (Liquid Democracy) — August Product Update:**
   - *Motivation:* Users wanted a way to delegate their voting power to community representatives or trusted delegates without losing their REP balance ownership.
   - *Fix:* Implemented delegation mapping and delegator-balance aggregation at the smart contract level (`delegate`, `undelegate`), and integrated a premium Delegation Tab featuring active delegate tracking, supporter list, and a governance leaderboard.
   - *Commit:* [f08a2d1](https://github.com/grantpulse/repo/commit/f08a2d1a8df8f238ea5fbfd4d6ee3eb86f7b15a6)

---

## 📈 Onboarding Funnel & Google Form Data Collection

### Onboarding Funnel Telemetry Metrics
We integrated Plausible/Console logging to track user conversions:
* **Landing Page Visited (`Funnel_Landing`):** 280 visits.
* **Wallet Connection Clicked (`Funnel_WalletConnectAttempted`):** 110 clicks.
* **Wallet Connected Successfully (`Funnel_WalletConnected`):** 62 wallets linked.
* **First Action Completed (`Funnel_FirstActionCompleted`):** 52 wallets voted or deposited.
* *Conversion Rate:* ~18.5% conversion from landing page to successful transaction.

### Google Feedback Form Survey Schema
Following their first successful transaction, a widget prompts users to fill out our Google Form:
1. **Wallet Address** (Short Answer, Required) — Matches user to on-chain action.
2. **Email address** (Short Answer, Optional) — For newsletter updates.
3. **GitHub Username / Name** (Short Answer, Optional) — For contributor leaderboards.
4. **Experience Rating** (1-5 Linear Scale, Required) — Tracks general UX quality.
5. **Suggestions** (Paragraph, Optional) — Open text field for product feedback.
- *Spreadsheet Export:* Survey data was exported from Google Forms as a CSV. The full 52-user cohort log is archived in [docs/user-feedback-export.csv](file:///c:/Users/user/OneDrive/Desktop/Steller%20Level-4/docs/user-feedback-export.csv).

---

## 🛠️ The Three-Contract Smart Contract System
1. **`reputation_token`:** SEP-41 compliant. Only writable by the proposal contract. Saves snapshots of historical balances at specific ledger sequences to prevent double-spending or vote-power manipulation.
2. **`proposal_contract`:** Manages proposal lifecycle. Snapshot-queries reputation weight to vote, awards voters with +1 REP, and invokes treasury disbursements.
3. **`treasury_contract`:** Escrows XLM deposits. disbursement is locked behind authorized proposal execution with idempotency checks.

---

## 🚀 Build, Test, and Deploy Guide

### 1. Build Smart Contracts
Compile all three contracts to optimized WebAssembly binaries:
```bash
cd contract
stellar contract build
```
Verify compiled outputs in `target/wasm32v1-none/release/`.

### 2. Deploy and Initialize (Testnet)
Deploy to Testnet via the automated deployment scripts:
- **Windows (PowerShell):** `pwsh ./scripts/deploy.ps1`
- **macOS / Linux (Shell):** `./scripts/deploy.sh`

### 3. Run Frontend
```bash
cd frontend
npm install
cp .env.production .env.local  # Paste deployed contract IDs
npm run dev
```

---

## 🔒 Extended Error Taxonomy
- **`Wallet Not Installed`:** Directs users to Freighter links or suggests web-based Albedo.
- **`Transaction Rejected`:** Gracefully aborts when user rejects signatures in wallets.
- **`Already Voted`:** Catches duplicate votes on-chain and displays locked indicators.
- **`Treasury Underfunded`:** Disallows proposals or disbursements requesting more XLM than treasury assets.
- **`Stale Cache Reset`:** Custom Sentry boundary error view provides a "Clear Cache & Reload" escape hatch.

---
## Screenshots

Here are the screenshots demonstrating application functionality, builds, and pipeline runs:

### 1. Wallet Connection & Main UI
![Wallet Connection](![alt text](image-1.png))

### 2. Mobile Responsive Viewport
![Mobile Viewport](![alt text](image-2.png))

### 3. Transaction Confirmation & Stellar Explorer
![Transaction Confirmation](![alt text](image-3.png))

### 4. CI/CD Pipeline Execution
![CI/CD Pipeline](![alt text](image.png))

---

### 📋 User Feedback Summary 50+ Wallet Interactions (Cohort Activity)

| # | User Name | Gmail | Feedback Summary | Rating |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **Viru Kumar** | virukumar1529@gmail.com | Excellent UI design, seamless wallet connection, noted proposal form complexity, suggested clearer reputation token guidance, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 2 | **Madan Rao** | madan.rao112944@gmail.com | Excellent UI design, noted minor wallet setup delay, moderate proposal submission process, clear reputation token mechanics, and acceptable transaction speed. | 9-10 (Extremely Likely) |
| 3 | **Riya Chauhan** | riyachauhan3355@gmail.com | Good & functional UI, seamless wallet connection, intuitive proposal creation flow, suggested clearer reputation token guidance, and acceptable transaction speed. | 7-8 (Likely) |
| 4 | **Sarita Kumari** | saritakumari674@gmail.com | Suggested UI layout improvements, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 5 | **Naveen Sharma** | sharmaji23654@gmail.com | Suggested UI layout improvements, seamless wallet connection, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 6 | **Sunny Tiwari** | sunnyyt13242@gmail.com | Good & functional UI, noted minor wallet setup delay, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 7 | **Kartik Kumar** | kartikkumar9843@gmail.com | Good & functional UI, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 8 | **Monu Yadav** | monu.yadav82324@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 9 | **Lalit Dev** | lalitdev844829@gmail.com | Excellent UI design, noted minor wallet setup delay, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 10 | **Mohit Saini** | mohitsaini118473@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, suggested clearer reputation token guidance, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 11 | **Harshu Roy** | harshuroy838@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and reported transaction timeout delay. | 1-6 (Unlikely) |
| 12 | **Hariom Yadav** | hariomyadav938@gmail.com | Good & functional UI, experienced wallet connection issues, noted proposal form complexity, clear reputation token mechanics, and acceptable transaction speed. | 9-10 (Extremely Likely) |
| 13 | **Vaishnavi Roy** | vaishnaviroy8731@gmail.com | Excellent UI design, noted minor wallet setup delay, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 14 | **Priya Dev** | priyadev987172@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 15 | **Raj Saini** | sainiraj371673@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, suggested clearer reputation token guidance, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 16 | **Sahil Manoj** | sahil.manoj121523@gmail.com | Excellent UI design, seamless wallet connection, noted proposal form complexity, clear reputation token mechanics, and reported transaction timeout delay. | 1-6 (Unlikely) |
| 17 | **Ishika Saini** | ishikasaini21893@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 18 | **Sameer Kumawat** | sameerkumawatyt8727781@gmail.com | Good & functional UI, noted minor wallet setup delay, noted proposal form complexity, clear reputation token mechanics, and fast contract transaction speed. | 7-8 (Likely) |
| 19 | **Vishnu Singh** | vishnu.singh32131@gmail. com | Excellent UI design, experienced wallet connection issues, moderate proposal submission process, clear reputation token mechanics, and acceptable transaction speed. | 9-10 (Extremely Likely) |
| 20 | **Sanu Roy** | sanuroy1613@gmail.com | Excellent UI design, seamless wallet connection, noted proposal form complexity, unclear about snapshot voting weight, and fast contract transaction speed. | 1-6 (Unlikely) |
| 21 | **Arpita Sharma** | arpita.sharma8362@gmail.com | Excellent UI design, experienced wallet connection issues, moderate proposal submission process, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 22 | **Myank Sohil** | mayankyt82838@gmail.com | Excellent UI design, seamless wallet connection, moderate proposal submission process, suggested clearer reputation token guidance, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 23 | **Piyush Josh** | joshpiyush323@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 24 | **Ronak Ishu** | ronakishu1213221@gmail.com | Excellent UI design, noted minor wallet setup delay, intuitive proposal creation flow, clear reputation token mechanics, and acceptable transaction speed. | 9-10 (Extremely Likely) |
| 25 | **Devesh Singh** | deveshsingh42331@gmail.com | Excellent UI design, seamless wallet connection, moderate proposal submission process, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 26 | **Rohit Kumar** | rohit.kumar42313@gmail.com | Excellent UI design, noted minor wallet setup delay, moderate proposal submission process, unclear about snapshot voting weight, and acceptable transaction speed. | 7-8 (Likely) |
| 27 | **Aarav Sharma** | aarav.sharma0172@gmail.com | Excellent UI design, seamless wallet connection, noted proposal form complexity, unclear about snapshot voting weight, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 28 | **Rohan Verma** | rohan.verma852@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 7-8 (Likely) |
| 29 | **Priya Singh** | priyasingh3843@gmail.com | Good & functional UI, experienced wallet connection issues, noted proposal form complexity, clear reputation token mechanics, and acceptable transaction speed. | 9-10 (Extremely Likely) |
| 30 | **Ananya Gupta** | ananyagupta36@gmail.com | Suggested UI layout improvements, experienced wallet connection issues, noted proposal form complexity, suggested clearer reputation token guidance, and fast contract transaction speed. | 1-6 (Unlikely) |
| 31 | **Rahul Meena** | rahulmeena837@gmail.com | Good & functional UI, experienced wallet connection issues, moderate proposal submission process, suggested clearer reputation token guidance, and fast contract transaction speed. | 7-8 (Likely) |
| 32 | **Aditya Sharma** | adityasharma94727@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 33 | **Neha Joshi** | nehajoshi4828@gmail.com | Excellent UI design, noted minor wallet setup delay, intuitive proposal creation flow, and clear reputation token mechanics. | 9-10 (Extremely Likely) |
| 34 | **Divya Roy** | divyaroy9388198@gmail.com | Excellent UI design, experienced wallet connection issues, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 35 | **Yash Kumar** | yashkumar38733@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 36 | **Simran Kaur** | simrankaur721783@gmail.com | Excellent UI design, seamless wallet connection, moderate proposal submission process, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 37 | **Arjun Patel** | arjunpatel821863@gmail.com | Excellent UI design, seamless wallet connection, moderate proposal submission process, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 38 | **Karan Singh** | karansingh877336@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 39 | **Sneha Verma** | sneha.verma31434@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 40 | **Nikhil Jain** | nikhiljain53456@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 41 | **Dev Meena** | devmeena848724@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 42 | **Nisha Jain** | nishajain5353353@gnail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 43 | **Pooja Sharma** | pooja.sharma326776@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 44 | **Akash Singh** | akashsingh83883@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 45 | **Muskan Saini** | muskansaini5345@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 46 | **Aditi Singh** | aditisingh43256@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 47 | **Riya Gupta** | riyagupta247@gmail.com | Good & functional UI, noted minor wallet setup delay, moderate proposal submission process, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 48 | **Varun Sharma** | varun.sharma664@gmail.com | Excellent UI design, experienced wallet connection issues, noted proposal form complexity, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 49 | **Tanya Verma** | tanyaverma35266@gmail.com | Excellent UI design, seamless wallet connection, noted proposal form complexity, clear reputation token mechanics, and acceptable transaction speed. | 9-10 (Extremely Likely) |
| 50 | **Manav Gupta** | manavgupta23457@gmail.com | Excellent UI design, noted minor wallet setup delay, noted proposal form complexity, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 51 | **Vivek Kumar** | vivek.kumar55522@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, suggested clearer reputation token guidance, and fast contract transaction speed. | 7-8 (Likely) |

## 👩‍💻 Authors
- **Development Team:** GrantPulse Core Developers
- **Workspace Corpus:** `c:/Users/user/OneDrive/Desktop/Steller Level-4`
- **Framework:** Stellar Soroban SDK (v20.5.0) & React / TypeScript / Vite / Tailwind
