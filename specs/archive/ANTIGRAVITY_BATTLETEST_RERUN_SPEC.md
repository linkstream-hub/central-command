# ANTIGRAVITY BATTLE TEST — RE-RUN SPEC
# Session 49 — Test Sprint Only
# Mode: TEST SPRINT ONLY — find bugs, log them, fix NOTHING
# Objective: (1) Verify the tab bar bug fix, (2) Re-run the items AG got wrong due to nav errors,
#            (3) Cover the spec blocks that were entirely skipped in Session 48.

---

## CONTEXT — WHY THIS RE-RUN EXISTS

Session 48 test results had three categories of problems:
1. Items that failed because of a real code bug (now fixed — `view="full"` on live/page.tsx)
2. Items that failed because AG used the wrong interaction pattern
3. Entire spec blocks that AG skipped or remapped with invented items

This re-run is scoped to those three categories only. Do NOT re-run items already confirmed PASS in Session 48.

**DO NOT fix any failure. Log it as [FAIL] and move on.**
**Every PASS must include "navigated to X, clicked Y, saw Z" — no code inspection.**

---

## MANDATORY PRE-FLIGHT

1. Run `npm run dev` from `tech-pwa/`. Paste raw terminal output showing server ready on port 3000.
2. Navigate to http://localhost:3000. Click "Dev Login (Admin)". Confirm you land on `/live`.
3. Confirm the page is on the **latest build** — the commit message on Vercel or the footer should not show the old coordination view. The tab bar fix is commit `d37e08f`.

---

## PART A — VERIFY THE BUG FIX (Block 2 re-run)

**A.1** On `/live`, read the tab bar labels exactly. Expected:
`All | Needs Review | Ready to Schedule | PTE Required | Scheduled | Complete`
Report the exact labels you see. If you still see "All Coordination" the fix did not deploy — STOP and report [BLOCKED].

**A.2** Click **All** tab. Count total jobs. Expected: 10 or more (APT-3001 through APT-3012). Report exact count.

**A.3** Click **Needs Review** tab. Verify exactly 2 jobs: `65 Thornton Ave` (APT-3001) and `1420 Alice St` (APT-3002). Report what you see.

**A.4** Click **Scheduled** tab. Verify `240 Lakeshore Ave` (APT-3008) and `1100 Broadway` (APT-3009) appear. Report count.

**A.5** Click **Complete** tab. Verify `310 Park Blvd` (APT-3011) and `450 Grand Ave` (APT-3012) appear. Report count.

**A.6** Click **All** tab. Type `Thornton` in the search box. Verify only APT-3001 (65 Thornton Ave) is visible. Clear search. Verify all jobs return.

**A.7** Type `zzznomatch`. Verify empty state shown — not a blank div or crash. Report what the empty state looks like.

---

## PART B — CORRECT INTERACTION ITEMS (Session 48 nav errors)

### B.1 — Status Change in Job Detail Modal (was spec item 3.3)

**B.1.1** On **Needs Review** tab, click the card for APT-3001 (65 Thornton Ave). Verify modal opens.

**B.1.2** In the modal, scroll to the **"Job Status"** section. There is a **pencil icon button** to the right of the "JOB STATUS" heading. Click it. Verify a `<select>` dropdown appears with all status options.

**B.1.3** Use the select to change status to `Ready to Schedule`. The select changes value immediately on selection — there is no separate Save button for this field. Verify the status display in the modal updates.

**B.1.4** Close the modal (click backdrop or press Escape). Click the **Needs Review** tab. Verify APT-3001 is no longer listed there. Click **Ready to Schedule** tab. Verify APT-3001 now appears.

### B.2 — Schedule via Hover Button (replaces DnD for AG testing)

DnD cannot be performed via browser automation. The **"Schedule" hover button** on sidebar cards is the testable alternative — it uses the same underlying code path.

**B.2.1** Navigate to `/schedule`. On the sidebar, hover over a job card (APT-3003 or APT-3004). A small **"Schedule"** button appears in the top-right of the card. Click it.

**B.2.2** Verify a modal opens asking for tech, date, duration, and time. Select `Salvador Cabrera`, set duration to 2 hours, time to 09:00. Click Confirm.

**B.2.3** Verify the job appears in the grid under Salvador Cabrera for the selected date.

**B.2.4** Verify the sidebar card for that job disappears (it is now Scheduled, not Ready to Schedule).

**B.2.5** Hard-reload `/schedule`. Verify the job still appears in Salvador's column (optimistic update persisted).

### B.3 — Command Palette (was spec item 7.1)

**B.3.1** On `/live`, click anywhere on the **main content area** of the page to ensure the document has focus (not a browser toolbar or address bar).

**B.3.2** Press **Ctrl+K**. Verify a search/command overlay appears.

**B.3.3** Type a job ID or address. Verify results appear. Press Escape. Verify overlay closes.

### B.4 — Mark Complete flow (was spec item 17–19)

The Tech PWA in dev mode uses the mock API at `/api/mock/exec` — all calls return `success: true`. No real spreadsheet writes happen.

**B.4.1** Log in as tech (badge `1`, PIN `1234`). Start a shift if not already active (click Start Shift on `/jobs`).

**B.4.2** Navigate to `/job/APT-3004` (350 Hanover St). Verify the **MARK AS COMPLETE** button is visible at the bottom. Note: there is no "START JOB" button — the shift model replaced per-job clock-in. MARK AS COMPLETE appearing immediately is correct behavior.

**B.4.3** Click **MARK AS COMPLETE**. Verify:
- A brief location-locking indicator appears
- A full-screen celebration overlay appears (green, "JOB COMPLETE" or equivalent)
- The overlay dismisses after ~2 seconds
- You are redirected to `/jobs`
Report exact text on the celebration overlay.

**B.4.4** On `/jobs`, verify APT-3004 no longer appears in the job list (mock marks it Complete). Report what you see.

---

## PART C — SKIPPED SPEC BLOCKS

These blocks were entirely absent from Session 48 results.

### C.1 — DnD Edge Cases (original spec Block 6, adapted for no-drag)

**C.1.1** On `/schedule`, click the **"Schedule"** hover button on a sidebar job. When the modal opens, click **Cancel** (or press Escape). Verify: no scheduling occurs, the job stays in the sidebar, no crash.

**C.1.2** Open the Schedule modal for a job. Click outside the modal (backdrop). Verify: modal closes, no scheduling occurs.

**C.1.3** Schedule a job via the hover button. Immediately try the hover button on the same card (if still visible). Verify: no duplicate jobs appear in the grid.

### C.2 — Queue and Modal Break Attempts (original spec Block 7)

**C.2.1** On `/live`, open any job modal. Click **outside the modal** (backdrop). Verify modal closes and the job queue is still visible and scrollable.

**C.2.2** Open a job modal. Click the **Status dropdown** (pencil icon → select appears). Click outside the select area without choosing an option. Verify the select area collapses without changing status.

**C.2.3** Open APT-3003 modal. Change status to `Complete` (skipping intermediate statuses). Report what happens — saves, shows warning, or blocks.

**C.2.4** On `/live`, click a **summary stat card** at the top (e.g., "Needs Action" count). Verify clicking filters the queue. Report which filter is applied.

**C.2.5** Type a search in the queue. Then click a different status tab. Report: does the search persist across tab switch, or clear?

**C.2.6** Click one job card, then immediately click a different job card before the first modal fully opens. Verify: only one modal is open, no stacking.

**C.2.7** On `/schedule`, click a **tech's column header** (name at top of lane). Verify a tech profile modal or panel opens. Verify it closes when dismissed.

**C.2.8** On `/schedule`, click a **date cell header**. Verify a date detail modal opens showing jobs for that day. Verify it closes cleanly.

### C.3 — Status Transitions and Data Integrity (original spec Block 8)

**C.3.1** Take APT-3001 (now in Ready to Schedule from Part B). Move it: `Ready to Schedule` → `PTE Required`. Verify it appears in PTE Required tab. Then move it `PTE Required` → `Awaiting Approval`. Verify it appears in the All tab only (not in Needs Review, Ready to Schedule, or Scheduled). Report which tabs it appears in.

**C.3.2** Verify APT-3010 (660 Grand Ave, In Progress) appears in the **Scheduled** tab (In Progress is grouped with Scheduled). Report which tab it appears in.

**C.3.3** Open any job modal. Attempt to edit the **Address** field. Report: is it editable or read-only?

**C.3.4** Open APT-3007 (780 Foothill Blvd, Awaiting Approval). Verify it is NOT in the sidebar on `/schedule` (Awaiting Approval jobs should not appear as schedulable). Report what you see.

### C.4 — Session 47 Feature Verification (original spec Block 9)

**C.4.1** On `/live`, verify the **left coordination panel** is present. Report the exact heading text of the coordination section.

**C.4.2** Verify a **TECH** tab or section exists in the left panel or main area. Click it. Verify it renders a placeholder (not a crash). Report the placeholder text.

**C.4.3** Verify the tab bar includes **"Needs Review"** (not "New"). Already confirmed in Part A — mark PASS if A.3 passed.

**C.4.4** On `/schedule`, open the tech assignment dropdown on any job in the Duration modal. Click outside the dropdown without selecting. Verify dropdown closes without selecting anything.

**C.4.5** Navigate to `/change-pin`. Verify the page loads with a PIN change form. Report the exact heading text.

### C.5 — Navigation Edge Cases (original spec Block 10)

**C.5.1** Navigate directly to `/schedule` via URL bar (without going through `/live`). Verify page loads correctly.

**C.5.2** Navigate to `/live?tab=pte` via URL. Verify the PTE Required tab is active on load. Report whether the URL parameter is honored.

**C.5.3** Use the **browser back button** after navigating from `/live` to `/schedule`. Verify return to `/live` with no white screen.

**C.5.4** Navigate to `/live/does-not-exist`. Verify a 404 or graceful error — not a blank screen or React crash.

**C.5.5** Navigate to `/` (root). Report: redirect to `/live` or `/login`?

### C.6 — Mobile Viewport (original spec Block 11)

Set browser to **375px wide** before this section.

**C.6.1** Navigate to `/live` at 375px. Verify sidebar is collapsed or hidden. Verify job cards are readable.

**C.6.2** Open a job modal at 375px. Verify it is scrollable and close/save buttons are accessible.

**C.6.3** Navigate to `/schedule` at 375px. Verify the grid is horizontally scrollable.

Reset to desktop width after this section.

### C.7 — Trainee Rule (original spec Block 12)

**C.7.1** On `/live`, open any unassigned job modal. Open the tech assignment dropdown. Verify **Federico Santos** is listed.

**C.7.2** Assign **Federico Santos** as the sole tech. Report: does the system warn that a Trainee cannot be assigned solo, or does it allow silently?

**C.7.3** On `/schedule`, assign a job to **Federico Santos's lane** via the hover Schedule button. In the modal, report: does a trainee warning appear?

### C.8 — Tech PWA: Change PIN (original spec Block 18)

**C.8.1** Navigate to `/change-pin` as a logged-in tech. Report the exact heading text.

**C.8.2** Enter a PIN less than 4 digits (e.g., `123`). Submit. Report the exact error text.

**C.8.3** Enter `5678` in New PIN, `9999` in Confirm PIN. Submit. Report the exact error text.

**C.8.4** Enter `5678` in both fields. Submit. Report the redirect destination.

### C.9 — Tech PWA: Time Off (original spec Block 19)

**C.9.1** Navigate to `/time-off`. Verify page loads — no crash.

**C.9.2** Report what fields are shown (date range, type, notes, etc.).

**C.9.3** Submit an empty form. Verify validation fires before any API call. Report behavior.

### C.10 — Tech PWA: Break Attempts (original spec Block 20, selected items)

**C.10.1** Navigate to `/job/APT-9999` (non-existent job). Verify graceful error — not a white crash screen. Report what is shown.

**C.10.2** On `/jobs`, switch to Spanish (ES toggle). Navigate to a job detail page. Verify Spanish strings are used. Report the Spanish text on the Mark Complete button.

**C.10.3** On the login page, enter badge `1` and an incorrect PIN (`9999`). Verify error message appears. Report exact text.

**C.10.4** Submit the login form with both fields empty. Verify validation fires before API call. Report behavior.

---

## OUTPUT FORMAT

Append results to `artifacts/ag_test_results.txt` — do NOT overwrite the file, append a new section:

```
=== SESSION 49 RE-RUN — [date] ===
[PASS] A.1 Tab bar labels → navigated to /live, saw: All | Needs Review | Ready to Schedule | PTE Required | Scheduled | Complete
[FAIL] B.2.3 Job appears in grid → expected Salvador column, grid was empty
[BLOCKED] C.7.2 Trainee warning → no tech assignment dropdown found in this modal
```

Report ONLY: "Re-run complete. Results appended to artifacts/ag_test_results.txt."

**DO NOT fix any failure. DO NOT modify any source files. Log bugs as FAIL and move on.**
