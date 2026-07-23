# GrantPulse Demo Video Script

This script outlines the flow, visual shots, and narration for a 2-3 minute product demonstration video.

*Target Length:* ~2.5 minutes (150 seconds)
*Visual Vibe:* High-resolution screen capture, smooth mouse movements, showing the beautiful dark-theme glassmorphism interface.

---

## Shot-List & Voiceover Narration

### Section 1: Landing Page & Public Dashboard (0:00 - 0:25)
* **Visual:** The browser opens to the GrantPulse dashboard. The wallet is disconnected. The mouse hovers over the **Public Stats Strip** at the top showing "14 Proposals", "188 Total Votes", "450.0 XLM Disbursed". The user scrolls down through the view-only initiatives.
* **Narration:**
  > "Welcome to GrantPulse. We are looking at the landing page of our reputation-weighted community micro-grants platform. Notice that even before connecting a wallet, new visitors are greeted by a live Stats Strip showing the total proposals created, votes cast, and treasury grants disbursed. This immediate transparency proves the platform is active and eliminates the empty-state friction common in Web3 apps."

---

### Section 2: Wallet Connection & Mobile/Albedo Onboarding (0:25 - 0:50)
* **Visual:** The user clicks the **Connect Wallet** button. The wallet selector modal appears. The user hovers over the Albedo card highlighting its "no installation, mobile-first" web wallet capability. The user selects Freighter desktop extension, clicks approve in the Freighter popup, and the page transitions. The **My Activity** card slides into view showing "🏆 10 REP" balance and a list of past voted initiatives.
* **Narration:**
  > "Let's connect a wallet. We've simplified the onboarding flow based on real user feedback. Along with Freighter and xBull support, we prominently guide users to Albedo—a web-based wallet that requires zero extensions, making mobile onboarding incredibly smooth. Once connected, a dedicated 'My Activity' panel instantly loads, summarizing the user's current reputation balance and complete on-chain voting history."

---

### Section 3: Proposal Sharing & Deep-Linking (0:50 - 1:10)
* **Visual:** The user hovers over Proposal #5 and clicks the **🔗 Share** button. A toast notification says "✅ Copied!". The user opens a new browser tab, pastes the URL (which contains `?proposal=5`), and loads it. The page automatically filters the list to only display Proposal #5, scrolls it into the center of the viewport, and wraps it in a subtle gold pulsing highlight border.
* **Narration:**
  > "To support organic community growth, we built shareable proposal deep links. By clicking the Share button on any initiative, the user copies a direct URL. When clicked, this link filters the dashboard to focus solely on that initiative, scrolls it into view, and highlights it with a pulsing outline, making it extremely easy to drive voters directly to specific discussions."

---

### Section 4: Voting & Optimistic UI Update (1:10 - 1:35)
* **Visual:** On Proposal #5, the voter hovers over the **👍 Vote YES** button. Directly above, an inline tip reads: *"💡 You will vote with 10 REP (reputation balance captured at snapshot block #384210)..."*. The user clicks Vote YES and signs the transaction. The UI **instantly** increments the Support tally and shows "✅ You voted" while the transaction processes in the background (preventing perceived latency). Once confirmed, the transaction hash is printed.
* **Narration:**
  > "When casting a vote, GrantPulse explains exactly *why* a vote has its weight. An inline indicator shows the voter's REP snapshot balance captured at the proposal's creation ledger. When we click Vote, the UI updates optimistically, instantly reflecting the vote weight on-screen while Freighter handles the transaction in the background, eliminating the typical 5-second blockchain wait time."

---

### Section 5: Creating an Initiative (1:35 - 1:55)
* **Visual:** The user switches to the **➕ submit proposal** tab. They fill out a form: Title: "Regional Hackathon Sponsorship", Description: "Support local developers with food and venue expenses", Amount: "150 XLM", Recipient address. The form validates the amount against the treasury balance. The user clicks Submit and signs.
* **Narration:**
  > "Creating a new proposal is just as simple. The form performs real-time validation, checking the requested amount against the current treasury pool, validating recipient Stellar addresses, and confirming deadlines. Submitting the proposal schedules the voting window on-chain, and awards the creator a reputation boost."

---

### Section 6: Treasury Dashboard & Disbursements (1:55 - 2:15)
* **Visual:** The user clicks the **🏦 treasury pool** tab. It lazy-loads in under 100ms. It displays the pool balance (e.g. 500 XLM), deposit form, and the list of **Disbursement History Logs** showing Proposal ID, Recipient Address, and the Stellar transaction hash for past payouts.
* **Narration:**
  > "On the Treasury Pool tab, we see the shared community vault. Users can deposit XLM to fund future grants. When proposals close and pass, the smart contract automatically executes a cross-contract call to disburse funds. The disbursement logs are updated in real-time, providing click-through explorer links for auditing."

---

### Section 7: Analytics & Google Form Prompts (2:15 - 2:30)
* **Visual:** The user is prompted by the **Feedback Widget** at the bottom-right corner: *"💬 Help Us Improve GrantPulse! Open Official Google Form"*. The user clicks the button. Then, the video cuts to a brief view of the developer console, showing the custom Plausible onboarding funnel events printing in real-time (`Funnel_Landing -> Funnel_WalletConnected -> Funnel_FirstActionCompleted`).
* **Narration:**
  > "Finally, to drive growth, a post-interaction widget invites users to submit detailed feedback via Google Forms. Lightweight analytics track user conversions through the onboarding funnel. This ensures that every growth metric is data-driven, helping us evolve GrantPulse into a mainnet-ready DAO governance portal. Thank you for watching!"
