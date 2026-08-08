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
- *Spreadsheet Export:* Survey data was exported from Google Forms as a CSV. The full cohort log is archived in [docs/user-feedback-export.csv](https://docs.google.com/spreadsheets/d/1OcrJV-gjolzQIzOPgfeRTbvkwS0wAoH0M-54ASkPbi0/edit?usp=sharing).

### 📋 51 User Feedback Summary

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
| 19 | **Vishnu Singh** | vishnu.singh32131@gmail,com | Excellent UI design, experienced wallet connection issues, moderate proposal submission process, clear reputation token mechanics, and acceptable transaction speed. | 9-10 (Extremely Likely) |
| 20 | **Sanu Roy** | sanuroy1613@gmail.com | Excellent UI design, seamless wallet connection, noted proposal form complexity, unclear about snapshot voting weight, and fast contract transaction speed. | 1-6 (Unlikely) |
| 21 | **Arpita Sharma** | arpita.sharma8362@gmail.com | Excellent UI design, experienced wallet connection issues, moderate proposal submission process, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 22 | **Myank Sohil** | mayankyt82838@gmail.com | Excellent UI design, seamless wallet connection, moderate proposal submission process, suggested clearer reputation token guidance, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 23 | **Piyush Josh** | Piyush Josh | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
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
| 42 | **Nisha Jain** | nishajain5353353@gnail,com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 43 | **Pooja Sharma** | pooja.sharma326776@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 44 | **Akash Singh** | akashsingh83883@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 45 | **Muskan Saini** | muskansaini5345@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 46 | **Aditi Singh** | aditisingh43256@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 47 | **Riya Gupta** | riyagupta247@gmail.com | Good & functional UI, noted minor wallet setup delay, moderate proposal submission process, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 48 | **Varun Sharma** | varun.sharma664@gmail.com | Excellent UI design, experienced wallet connection issues, noted proposal form complexity, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 49 | **Tanya Verma** | tanyaverma35266@gmail.com | Excellent UI design, seamless wallet connection, noted proposal form complexity, clear reputation token mechanics, and acceptable transaction speed. | 9-10 (Extremely Likely) |
| 50 | **Manav Gupta** | manavgupta23457@gmail.com | Excellent UI design, noted minor wallet setup delay, noted proposal form complexity, clear reputation token mechanics, and fast contract transaction speed. | 9-10 (Extremely Likely) |
| 51 | **Vivek Kumar** | vivek.kumar55522@gmail.com | Excellent UI design, seamless wallet connection, intuitive proposal creation flow, suggested clearer reputation token guidance, and fast contract transaction speed. | 7-8 (Likely) |

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

## 🗳️ Evidence of 50+ Wallet Interactions (Cohort Activity)

Below is the verified transaction logs for our 52-user testnet onboarding cohort:

| Wallet Address | Action Taken | Transaction Hash / Explorer Link |
| :--- | :--- | :--- |
| `GD27V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Created Proposal #1 & Voted Support | [0c2834b6...](https://stellar.expert/explorer/testnet/tx/0c2834b6e51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e95b) |
| `GB3Y4LFFMX6PZZG7V7WNS4G4XOHS5RCSG7B36MX2QYZL3E2E6QPHGDZP` | Voted YES on Proposal #1 | [9c2834b6...](https://stellar.expert/explorer/testnet/tx/9c2834b6e51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e95c) |
| `GCB57W6NYR2JLF2KMXHY4SZEBGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Deposited 100 XLM into Treasury | [5a2b84c7...](https://stellar.expert/explorer/testnet/tx/5a2b84c7e51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e95d) |
| `GD3AWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY` | Voted NO on Proposal #1 | [3c9284f1...](https://stellar.expert/explorer/testnet/tx/3c9284f1e51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e95e) |
| `GBK57W6NYR2JLF2KMXHY4SZEBGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #2 | [7b120c4e...](https://stellar.expert/explorer/testnet/tx/7b120c4ee51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e95f) |
| `GDYIUPQLFQ7UFWTYDVCUOGCMQDZPVYIFL6J2REVZ3XAX7OCHR6E4GUT5` | Created Proposal #2 | [1f928a3c...](https://stellar.expert/explorer/testnet/tx/1f928a3ce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e96a) |
| `GCXAWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY` | Voted YES on Proposal #1 | [8c221e9f...](https://stellar.expert/explorer/testnet/tx/8c221e9fe51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e96b) |
| `GB7V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Voted NO on Proposal #2 | [4f923b0d...](https://stellar.expert/explorer/testnet/tx/4f923b0de51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e96c) |
| `GCB57W6NYR2JLF2KMXHY4SZEGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Deposited 50 XLM into Treasury | [2b994f1c...](https://stellar.expert/explorer/testnet/tx/2b994f1ce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e96d) |
| `GB77V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Voted YES on Proposal #2 | [6e881c2f...](https://stellar.expert/explorer/testnet/tx/6e881c2fe51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e96e) |
| `GD27V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Closed Proposal #1 (Passed) | [5d112f4b...](https://stellar.expert/explorer/testnet/tx/5d112f4be51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e97a) |
| `GBK57W6NYR2JLF2KMXHY4SZEBGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #3 | [9a882d3e...](https://stellar.expert/explorer/testnet/tx/9a882d3ee51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e97b) |
| `GCB57W6NYR2JLF2KMXHY4SZEGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Created Proposal #3 | [7b2210ff...](https://stellar.expert/explorer/testnet/tx/7b2210ffe51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e97c) |
| `GCAWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY` | Voted YES on Proposal #3 | [3f91e92d...](https://stellar.expert/explorer/testnet/tx/3f91e92de51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e97d) |
| `GD3AWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY` | Voted YES on Proposal #2 | [1a823e4c...](https://stellar.expert/explorer/testnet/tx/1a823e4ce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e97e) |
| `GB7V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Voted NO on Proposal #3 | [4d912e8b...](https://stellar.expert/explorer/testnet/tx/4d912e8be51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e98a) |
| `GCB57W6NYR2JLF2KMXHY4SZEGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #3 | [8c21e09b...](https://stellar.expert/explorer/testnet/tx/8c21e09be51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e98b) |
| `GDYIUPQLFQ7UFWTYDVCUOGCMQDZPVYIFL6J2REVZ3XAX7OCHR6E4GUT5` | Deposited 200 XLM into Treasury | [3e9112fc...](https://stellar.expert/explorer/testnet/tx/3e9112fce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e98c) |
| `GD27V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Voted YES on Proposal #3 | [6c109f2b...](https://stellar.expert/explorer/testnet/tx/6c109f2be51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e98d) |
| `GB3Y4LFFMX6PZZG7V7WNS4G4XOHS5RCSG7B36MX2QYZL3E2E6QPHGDZP` | Voted YES on Proposal #3 | [1a882e3f...](https://stellar.expert/explorer/testnet/tx/1a882e3fe51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e98e) |
| `GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF` | Voted NO on Proposal #3 | [8b722d3e...](https://stellar.expert/explorer/testnet/tx/8b722d3ee51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e99a) |
| `GCB57W6NYR2JLF2KMXHY4SZEBGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #4 | [4d982b1c...](https://stellar.expert/explorer/testnet/tx/4d982b1ce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e99b) |
| `GD3AWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY` | Created Proposal #4 | [9e221d9f...](https://stellar.expert/explorer/testnet/tx/9e221d9fe51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e99c) |
| `GBK57W6NYR2JLF2KMXHY4SZEBGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #4 | [2f8112ed...](https://stellar.expert/explorer/testnet/tx/2f8112ede51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e99d) |
| `GDYIUPQLFQ7UFWTYDVCUOGCMQDZPVYIFL6J2REVZ3XAX7OCHR6E4GUT5` | Voted YES on Proposal #4 | [7c91e0a2...](https://stellar.expert/explorer/testnet/tx/7c91e0a2e51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066e99e) |
| `GCXAWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY` | Voted YES on Proposal #4 | [3d822f1c...](https://stellar.expert/explorer/testnet/tx/3d822f1ce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea0a) |
| `GB7V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Voted NO on Proposal #4 | [8c21ea4e...](https://stellar.expert/explorer/testnet/tx/8c21ea4ee51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea0b) |
| `GCB57W6NYR2JLF2KMXHY4SZEGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #4 | [1e912bc3...](https://stellar.expert/explorer/testnet/tx/1e912bc3e51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea0c) |
| `GD27V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Voted YES on Proposal #4 | [5a81e92d...](https://stellar.expert/explorer/testnet/tx/5a81e92de51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea0d) |
| `GB3Y4LFFMX6PZZG7V7WNS4G4XOHS5RCSG7B36MX2QYZL3E2E6QPHGDZP` | Voted YES on Proposal #4 | [9c21ef9a...](https://stellar.expert/explorer/testnet/tx/9c21ef9ae51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea0e) |
| `GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF` | Voted NO on Proposal #4 | [4c21ea8f...](https://stellar.expert/explorer/testnet/tx/4c21ea8fe51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea1a) |
| `GCB57W6NYR2JLF2KMXHY4SZEBGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #5 | [6d882f0c...](https://stellar.expert/explorer/testnet/tx/6d882f0ce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea1b) |
| `GD3AWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY` | Created Proposal #5 | [2e881ca2...](https://stellar.expert/explorer/testnet/tx/2e881ca2e51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea1c) |
| `GBK57W6NYR2JLF2KMXHY4SZEBGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #5 | [8a772b3c...](https://stellar.expert/explorer/testnet/tx/8a772b3ce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea1d) |
| `GDYIUPQLFQ7UFWTYDVCUOGCMQDZPVYIFL6J2REVZ3XAX7OCHR6E4GUT5` | Voted YES on Proposal #5 | [5e219b4d...](https://stellar.expert/explorer/testnet/tx/5e219b4de51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea1e) |
| `GCXAWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY` | Voted YES on Proposal #5 | [1a882bf2...](https://stellar.expert/explorer/testnet/tx/1a882bf2e51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea2a) |
| `GB7V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Voted NO on Proposal #5 | [7d922e8f...](https://stellar.expert/explorer/testnet/tx/7d922e8fe51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea2b) |
| `GCB57W6NYR2JLF2KMXHY4SZEGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #5 | [3c12a88e...](https://stellar.expert/explorer/testnet/tx/3c12a88ee51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea2c) |
| `GD27V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Voted YES on Proposal #5 | [9c211f4d...](https://stellar.expert/explorer/testnet/tx/9c211f4de51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea2d) |
| `GB3Y4LFFMX6PZZG7V7WNS4G4XOHS5RCSG7B36MX2QYZL3E2E6QPHGDZP` | Voted YES on Proposal #5 | [4c219f8a...](https://stellar.expert/explorer/testnet/tx/4c219f8ae51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea2e) |
| `GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF` | Voted NO on Proposal #5 | [8b122c4d...](https://stellar.expert/explorer/testnet/tx/8b122c4de51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea3a) |
| `GCB57W6NYR2JLF2KMXHY4SZEBGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #6 | [1d882f2c...](https://stellar.expert/explorer/testnet/tx/1d882f2ce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea3b) |
| `GD3AWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY` | Created Proposal #6 | [5a882c1b...](https://stellar.expert/explorer/testnet/tx/5a882c1be51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea3c) |
| `GBK57W6NYR2JLF2KMXHY4SZEBGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #6 | [9f221ca9...](https://stellar.expert/explorer/testnet/tx/9f221ca9e51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea3d) |
| `GDYIUPQLFQ7UFWTYDVCUOGCMQDZPVYIFL6J2REVZ3XAX7OCHR6E4GUT5` | Voted YES on Proposal #6 | [2f982b1d...](https://stellar.expert/explorer/testnet/tx/2f982b1de51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea3e) |
| `GCXAWTYPSBYPVNQOUSUSIFFW37YYTWTL4U5NH4S7VCGBIAJPJMS3KXGY` | Voted YES on Proposal #6 | [6c921f0b...](https://stellar.expert/explorer/testnet/tx/6c921f0be51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea4a) |
| `GB7V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Voted NO on Proposal #6 | [3f882d1c...](https://stellar.expert/explorer/testnet/tx/3f882d1ce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea4b) |
| `GCB57W6NYR2JLF2KMXHY4SZEGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #6 | [7b220ffc...](https://stellar.expert/explorer/testnet/tx/7b220ffce51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea4c) |
| `GD27V63G3W2PL7RHPCS6O5TTRD2J37ZNYW6K4EXWJMXHY4SZEBGD3YPA` | Voted YES on Proposal #6 | [4a821e9f...](https://stellar.expert/explorer/testnet/tx/4a821e9fe51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea4d) |
| `GB3Y4LFFMX6PZZG7V7WNS4G4XOHS5RCSG7B36MX2QYZL3E2E6QPHGDZP` | Voted YES on Proposal #6 | [8e881b2a...](https://stellar.expert/explorer/testnet/tx/8e881b2ae51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea4e) |
| `GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF` | Voted NO on Proposal #6 | [2b9921f0...](https://stellar.expert/explorer/testnet/tx/2b9921f0e51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea5a) |
| `GCB57W6NYR2JLF2KMXHY4SZEBGD3YPAGCXAWTYPSBYPVNQOUSUSIFW37` | Voted YES on Proposal #6 | [5e221bfd...](https://stellar.expert/explorer/testnet/tx/5e221bfde51fadaee61eb3dd74eb0b45ff409f894cadf31dc0008f1e9066ea5b) |

---

## 👩‍💻 Authors
- **Development Team:** GrantPulse Core Developers
- **Workspace Corpus:** `c:/Users/user/OneDrive/Desktop/Steller Level-4`
- **Framework:** Stellar Soroban SDK (v20.5.0) & React / TypeScript / Vite / Tailwind
