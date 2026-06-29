# ANTIGRAVITY DISPATCH BATTLE TEST SPEC
# Session 48 — Test Sprint Only
# Objective: Exhaustive browser verification of dispatch workflow + deliberate break attempts
# Mode: TEST SPRINT ONLY — find bugs, log them, fix NOTHING

---

## MANDATORY PRE-FLIGHT

1. Run `npm run dev` from `tech-pwa/` — paste raw terminal output showing server ready on port 3000
2. Open http://localhost:3000 in browser
3. Click "Dev Login (Admin)" — confirm you land on `/live`
4. Paste a screenshot of the `/live` page before starting any tests

**DO NOT fix any failure you find. Log it as [FAIL] and move on.**
**Every PASS must include: "navigated to X, saw Y, clicked Z, saw W" — no code inspection.**

---

## VERIFIED LITERALS (pulled from live code — AG must not alter these)

| Item | Value | Source |
|------|-------|--------|
| Tab key for "Needs Review" | `'NEW'` | JobQueueTable.tsx:323 |
| Tab label for "Needs Review" | `'Needs Review'` | JobQueueTable.tsx:323 |
| Tab label for full dispatch view | `'All'` (not 'All Coordination') | JobQueueTable.tsx:322 |
| DnD collision strategy | `pointerWithin` | schedule/page.tsx:7 |
| Mock tech names | `'Salvador Cabrera'`, `'Eduardo Pena'`, `'Boyette Johnson'`, `'Federico Santos'` | dashboard-api.ts:223-229 |
| Federico Santos rank | `'T'` (Trainee) | dashboard-api.ts:229 |
| Mock jobs Ready to Schedule | `APT-3003` (890 Market St), `APT-3004` (350 Hanover St) | dashboard-api.ts:251-264 |
| Mock jobs Scheduled | `APT-3008` (Salvador, today 09:00), `APT-3009` (Eduardo, tomorrow 08:00) | dashboard-api.ts:290-305 |
| Mock jobs New | `APT-3001` (65 Thornton, URGENT), `APT-3002` (1420 Alice, URGENT) | dashboard-api.ts:234-249 |
| localStorage key for dispatch session | `apt_tech_session` (tech) / NextAuth cookie (dispatch) | CLAUDE.md |

---

## BLOCK 1 — Dev Server + Auth

**1.1** Run `npm run dev` from `tech-pwa/`. Paste raw terminal output. Server must be on port 3000.

**1.2** Navigate to http://localhost:3000. Verify redirect → `/login`.

**1.3** Click "Dev Login (Admin)". Verify redirect → `/live`. Verify page shows job queue, not a blank screen or error.

**1.4** Verify the top navigation bar is present. Verify no light-mode bleed (page must be dark — no white backgrounds).

**1.5** Verify the sidebar shows nav items including Live, Schedule, Team, HR, Billing, Feedback.

**1.6** Hard-reload the page (Ctrl+Shift+R). Verify session persists — still on `/live` as admin, not redirected to `/login`.

---

## BLOCK 2 — Dispatch Queue Tab Filtering

**2.1** On `/live`, verify the tab bar shows exactly these labels in order:
`All | Needs Review | Ready to Schedule | PTE Required | Scheduled | Complete`
Report the exact labels you see.

**2.2** Click **All** tab. Count the total jobs visible. Expected: at minimum 10 jobs (APT-3001 through APT-3010 minus any Archived). Report exact count.

**2.3** Click **Needs Review** tab. Verify exactly 2 jobs visible: `65 Thornton Ave` (APT-3001) and `1420 Alice St` (APT-3002). Report what you see.

**2.4** Verify both APT-3001 and APT-3002 show a red/urgent visual indicator (border, badge, or chip labeled URGENT or 1-URGENT).

**2.5** Click **Ready to Schedule** tab. Verify `890 Market St` (APT-3003) and `350 Hanover St` (APT-3004) appear. Report exact count and job addresses visible.

**2.6** Click **PTE Required** tab. Verify `120 Mission St` (APT-3005) and `55 Oak Grove Ave` (APT-3006) appear. Report count.

**2.7** Click **Scheduled** tab. Verify `240 Lakeshore Ave` (APT-3008, Salvador) and `1100 Broadway` (APT-3009, Eduardo) appear. Report count.

**2.8** Click **Complete** tab. Verify `310 Park Blvd` (APT-3011) and `450 Grand Ave` (APT-3012) appear. Report count.

**2.9** Click **All** tab. Type `Thornton` in the search box. Verify only APT-3001 (65 Thornton Ave) is visible. Clear the search. Verify all jobs return.

**2.10** Type a search term that matches nothing: `zzznomatch`. Verify an empty state is shown (message or illustration — not a blank white div or crash). Report what the empty state looks like.

---

## BLOCK 3 — Job Detail Modal (Read + Edit)

**3.1** On the **Needs Review** tab, click the card for APT-3001 (65 Thornton Ave). Verify a modal opens. Report the modal title and the status shown.

**3.2** In the modal, verify these fields are visible: Service Category (Plumbing), Address (65 Thornton Ave), Unit (304), RM Name (Jan Blythe), Tenant Name (Maria Santos), Tenant Phone (510-555-0192), Access Info (Lockbox code: 1954). Report any that are missing.

**3.3** In the modal, find the Status field. Attempt to change status from `New` to `Ready to Schedule`. Save. Verify: (a) the modal shows the new status, (b) the modal closes or the card updates, (c) the job no longer appears on the **Needs Review** tab.

**3.4** Switch to **Ready to Schedule** tab. Verify APT-3001 now appears there.

**3.5** Open APT-3003 (890 Market St) from **Ready to Schedule** tab. Find the tech assignment field. Assign `Salvador Cabrera`. Save. Verify the job card shows a tech chip or name for Salvador Cabrera after save.

**3.6** Open APT-3003 again. Verify the assigned tech field shows `Salvador Cabrera` (persists after save).

**3.7** Open APT-3005 (120 Mission St, PTE Required). Find the Notes field. Add a note: `Battle test note — do not deploy`. Save. Reopen the modal. Verify the note persists.

**3.8** Open APT-3008 (240 Lakeshore Ave, Scheduled). Verify the Scheduled Date and Time are shown (today, 09:00). Attempt to change the scheduled time to `13:00`. Save. Verify the new time is reflected.

**3.9** Verify the **Internal Thread** section is NOT present in the Job Detail Modal. (Per WO card redesign spec, it was removed.) Report what tabs or sections you see in the modal.

**3.10** Press Escape with the modal open. Verify the modal closes cleanly with no errors or frozen UI.

---

## BLOCK 4 — Schedule Page Golden Path (DnD)

**4.1** Navigate to `/schedule`. Verify the page loads with:
- A left sidebar showing "Ready to Schedule" job cards (at minimum APT-3003, APT-3004)
- A schedule grid showing columns for tech names (Salvador Cabrera, Eduardo Pena, Boyette Johnson, Federico Santos) and rows for today + next 4 working days

**4.2** Verify APT-3008 (240 Lakeshore Ave) appears in the grid under Salvador Cabrera's column for today.

**4.3** Verify APT-3009 (1100 Broadway) appears in the grid under Eduardo Pena's column for tomorrow.

**4.4** In the sidebar, locate APT-3003 (890 Market St, Plumbing). Drag it and drop it onto **Federico Santos's lane for tomorrow**. 
- If a Duration Selector modal appears: set 2 hours, time 09:00, click Confirm.
- Verify APT-3003 now appears in Federico Santos's column for tomorrow.
- Report whether the sidebar card for APT-3003 disappears after scheduling.

**4.5** In the sidebar, locate APT-3004 (350 Hanover St, Janitorial). Drag it and drop it onto **Salvador Cabrera's lane for the day after tomorrow** (or next available day).
- If a Duration Selector modal appears: set 4 hours, time 08:00, click Confirm.
- Verify APT-3004 appears in Salvador's column for that day.

**4.6** Hard-reload `/schedule`. Verify APT-3003 still appears in Federico Santos's column for tomorrow. Verify APT-3004 still appears in Salvador's column. (Tests mock persistence across reload.)

**4.7** Verify the sidebar no longer shows APT-3003 or APT-3004 (they are now scheduled — sidebar should only show unscheduled Ready to Schedule jobs). Report what the sidebar shows.

---

## BLOCK 5 — Reschedule and Modify Scheduled WOs

**5.1** On `/schedule`, drag **APT-3008** (Salvador Cabrera, today) and drop it onto **Eduardo Pena's lane for today**.
- Duration modal should appear pre-populated. Confirm with same or updated hours.
- Verify APT-3008 moves from Salvador's lane to Eduardo's lane for today.
- Verify APT-3008 is no longer shown in Salvador's lane for today.

**5.2** Navigate to `/live`. Open APT-3008 from the **Scheduled** tab. Verify the Assigned Tech field now shows Eduardo Pena (reflecting the reschedule). Report what you see.

**5.3** In the modal for APT-3008, change the Assigned Tech back to `Salvador Cabrera`. Save. Navigate to `/schedule`. Verify APT-3008 is back in Salvador's lane.

**5.4** On `/schedule`, drag APT-3009 (Eduardo, tomorrow) to **a different time slot within Eduardo's lane on the same day** (grid-to-grid, same tech, different time).
- Duration modal appears. Change time to 14:00. Confirm.
- Verify the job card in the grid shows 14:00.

**5.5** Open APT-3009 from `/live` Scheduled tab. Verify scheduled time shows 14:00.

**5.6** Navigate to `/schedule`. Use the **week navigation** (next/prev chevrons) to advance one week. Verify the grid shows the next week's Mon–Fri dates. Verify the sidebar still shows Ready to Schedule jobs (they are not week-filtered). Navigate back to current week.

---

## BLOCK 6 — Break Attempts: DnD Edge Cases

**6.1** On `/schedule`, begin dragging APT-3004 (if rescheduled earlier, pick any sidebar job). Drop it in the **empty space BETWEEN two tech lanes** (not on any time slot). Verify: no Duration modal fires, no scheduling occurs, no console error crashes the page.

**6.2** Begin dragging a sidebar job. While dragging, press **Escape**. Verify: drag is cancelled, no modal opens, no scheduling occurs.

**6.3** Drag a job onto the **page header** (above the grid). Verify: no modal fires.

**6.4** Drag a job onto the **sidebar itself** (drop a job back where it came from). Verify: no modal fires, job stays in sidebar.

**6.5** Drag a scheduled job from the grid and drop it on the **same cell it already occupies** (same tech, same date). Verify: Duration modal fires (this is expected — reschedule path), cancel out of it. Verify no corruption.

**6.6** Schedule a job. Immediately try to drag it again before the optimistic update settles. Verify: no duplicate jobs appear in the grid.

**6.7** Click **rapidly through all date columns** while a drag is in progress (simulate pointer jitter). Verify: only the final drop target fires the modal. Verify page does not freeze.

---

## BLOCK 7 — Break Attempts: Job Queue and Modals

**7.1** On `/live`, open any job modal. Click **outside the modal** (on the backdrop). Verify the modal closes. Verify the job queue is still visible and scrollable.

**7.2** Open a job modal. Click the **Status dropdown**. Click **outside the dropdown** (not on an option). Verify the dropdown closes without changing the status.

**7.3** Open APT-3003 modal. Change status to `Complete` (skipping intermediate statuses). Attempt to save. Report what happens — does it save, show a warning, or block?

**7.4** On `/live`, click the **summary stat cards** at the top (e.g., "Needs Action" count). Verify clicking a card filters the queue. Report what filter is applied for each card.

**7.5** Type a search query in the queue. Then click a status tab. Verify: the search query persists across tab switches (or is cleared — report which behavior occurs).

**7.6** Open two different job modals in rapid succession (click one card, then immediately click another card before the first modal fully opens). Verify: only one modal is open at a time, no stacking or ghost modals.

**7.7** On `/schedule`, click a tech's column header (the name at the top of each lane). Verify a tech profile modal or panel opens. Verify it closes when dismissed.

**7.8** On `/schedule`, click a **date cell header** (the date at the top of each column). Verify a date detail modal or panel opens showing jobs for that day. Verify it lists APT-3008 when clicking today. Verify it closes cleanly.

---

## BLOCK 8 — Break Attempts: Status Transitions and Data Integrity

**8.1** Move APT-3001 from `New` → `Ready to Schedule` (done in Block 3.3). Then move it `Ready to Schedule` → `PTE Required`. Then move it `PTE Required` → `Scheduled`. Each step: verify the job appears in the correct tab filter.

**8.2** On `/live`, verify APT-3010 (660 Grand Ave, In Progress) appears in the **Scheduled** tab (In Progress shows in Scheduled as per system design). Report which tab it appears in.

**8.3** Attempt to edit the **Address** field on any job. Verify: is this field editable in the modal or read-only? Report what you see.

**8.4** Open APT-3007 (780 Foothill Blvd, Awaiting Approval). Verify it appears in the **All** tab. Verify it does NOT appear in **Needs Review**, **Ready to Schedule**, or **Scheduled** tabs. Report which tabs it does appear in.

**8.5** On `/schedule`, try to drag APT-3007 (Awaiting Approval) to the grid. Note: this job should NOT be in the sidebar since it's not "Ready to Schedule". Verify it is absent from the sidebar. Report.

**8.6** Navigate to `/live`. Open the Notifications bell (top right). Verify the panel opens showing at least 2 notifications. Verify clicking notification N001 ("Stale Job: APT-3005") navigates or highlights the relevant job.

---

## BLOCK 9 — Session 47 Features Verification

**9.1** On `/live`, verify the **left panel** contains a "Coordination Required" section (or equivalent coordination content panel). Report the exact heading text you see.

**9.2** Verify a **TECH** tab exists in the left panel or main area. Click it. Verify it shows a placeholder (not a crash, not a blank white screen). Report the placeholder text.

**9.3** Verify the tab bar includes **"Needs Review"** (not "New"). Report the exact label.

**9.4** On `/schedule`, open any job that has a tech dropdown. Click the dropdown to open it. Click **outside the dropdown** (not on any option). Verify the dropdown closes without selecting anything.

**9.5** Navigate to `/change-pin`. Verify the page loads without error. Verify it shows a PIN change form. (Do not submit — just verify the page renders.)

---

## BLOCK 10 — Navigation and Session Edge Cases

**10.1** Navigate directly to `/schedule` via URL (without going through `/live` first). Verify the page loads correctly with grid and sidebar.

**10.2** Navigate to `/live?tab=pte` via URL. Verify the PTE Required tab is active on load. Report whether the URL parameter is honored.

**10.3** Use the **browser back button** after navigating from `/live` to `/schedule`. Verify return to `/live` with correct state (no white screen, no crash).

**10.4** Open a job modal on `/live`. Use the **browser back button**. Verify the modal closes and you remain on `/live`.

**10.5** Navigate to a non-existent route: `/live/does-not-exist`. Verify a 404 page or graceful error is shown — not a blank screen or React crash boundary.

**10.6** Navigate to `/` (root). Verify redirect to `/live` (or `/login` if session expired). Report actual behavior.

---

## BLOCK 11 — Mobile Viewport

Set browser viewport to **375px wide** before this block.

**11.1** Navigate to `/live` at 375px. Verify the sidebar is collapsed (hidden or hamburger menu). Verify job cards are readable and not truncated in a broken way.

**11.2** Open a job modal at 375px. Verify the modal is scrollable and no content is clipped off-screen. Verify the close/save buttons are accessible.

**11.3** Navigate to `/schedule` at 375px. Verify the schedule grid is scrollable horizontally. Verify the sidebar is accessible (collapsed or swipe-in).

**11.4** Verify all tappable elements are at minimum 44×44px touch target at 375px. Check: tab buttons, job cards, modal action buttons.

Reset viewport to desktop width before Block 12.

---

## BLOCK 12 — Trainee Rule Enforcement (Federico Santos = Rank T)

**12.1** On `/live`, open any unassigned job. Open the tech assignment dropdown. Verify **Federico Santos** is listed. 

**12.2** Assign **Federico Santos** as the sole tech on a job. Save. Verify: does the system warn that a Trainee cannot be assigned solo? Report what happens — warn, block, or allow silently.

**12.3** On `/schedule`, drag a job onto **Federico Santos's lane**. Complete the Duration modal. Verify: same question — does a trainee warning appear? Report behavior.

---

## BLOCK 13 — Tech PWA: Login and Session

**Tech login credentials (mock/dev):** Badge `1`, PIN `1234`

**13.1** Navigate to http://localhost:3000/login. Verify the page shows a badge number field and a PIN field — not the "Dev Login (Admin)" dispatch button.

**13.2** Enter badge `1`, PIN `1234`. Click login. Verify redirect to `/jobs` (not `/live` or `/change-pin`). Report the exact redirect destination.

**13.3** On `/jobs`, verify the page header shows a greeting ("Good morning / Good afternoon / Good evening") and the tech's first name. Report the greeting and name shown.

**13.4** Hard-reload `/jobs`. Verify the session persists — still logged in as tech, no redirect to `/login`.

**13.5** Navigate directly to `/jobs` via URL bar without being logged in (open a private/incognito window, go to http://localhost:3000/jobs). Verify redirect to `/login`.

**13.6** Navigate directly to `/job/APT-3008` without a tech session. Verify redirect to `/login`.

**13.7** On `/jobs`, click the avatar/logout button (top right, shows first initial). Verify redirect to `/login`. Verify session is cleared (navigating back to `/jobs` in the same tab redirects to `/login`).

---

## BLOCK 14 — Tech PWA: Jobs List

Re-login with badge `1`, PIN `1234` before this block.

**14.1** On `/jobs`, verify job cards are listed. Verify they are sorted by priority — URGENT jobs first (red left border), then TURNOVER (orange), then STANDARD (blue). Report the order of the first 3 cards.

**14.2** Verify each job card shows: address, service category, and priority indicator. Report what information is visible on a card.

**14.3** Verify the job count badge in the header matches the number of job cards visible.

**14.4** Click the refresh button (circular arrow icon, top right). Verify the list reloads (spinner on button). Verify no crash.

**14.5** The **EN/ES toggle button** is present in the top right. Click it (from EN → ES). Verify:
- The greeting text changes to Spanish ("Buenos días / Buenas tardes / Buenas noches")
- The job count badge text changes to Spanish
- The "Start Shift" button text changes (if visible)
Report the exact Spanish text you see for the greeting.

**14.6** Click the toggle again (ES → EN). Verify the UI returns to English.

**14.7** If no shift is active: verify an amber "Shift Not Started" banner is visible with a **Start Shift** button. Report the exact text on the banner and button.

**14.8** If a shift IS already active (no banner shown): verify the banner is absent and the job list is directly accessible.

---

## BLOCK 15 — Tech PWA: Shift Workflow

**15.1** If the shift has not been started: on `/jobs`, click the **Start Shift** button. Verify:
- A loading spinner appears briefly
- The amber "Shift Not Started" banner disappears after success
- A success toast appears
Report the toast message text.

**15.2** After starting a shift, hard-reload `/jobs`. Verify the shift banner does NOT reappear (shift persists via `apt_shift_session` in localStorage).

**15.3** Attempt to click **Start Shift** a second time if the button is still visible. Verify: the system either prevents a second shift start (disables the button, shows a warning, or the banner is already gone). Report behavior.

**15.4** Navigate to `/job/APT-3008` (240 Lakeshore Ave — Salvador's scheduled plumbing job). Verify the timer card shows the shift status indicator (green dot = active). Verify the timer is counting up.

**15.5** On the job detail page, verify the **ClockedInBar** component is visible (a persistent bar showing shift time, possibly at top or bottom). Report where it appears and what text it shows.

**15.6** Verify the **Mark Complete** button is present at the bottom of the job detail page. Report the exact button text.

---

## BLOCK 16 — Tech PWA: Job Detail Page

Navigate to `/job/APT-3008` for these tests.

**16.1** Verify the page header shows the address (`240 Lakeshore Ave`) and the service category + job ID (`Plumbing • APT-3008`).

**16.2** Verify the **Contact section** shows: Tenant Name (`Paul Kim`), Tenant Phone (`510-555-0394`), a tap-to-call button (phone icon). Report if the phone number is a tappable `tel:` link.

**16.3** Verify the **Access Info section** shows the lockbox info (`Lockbox: 4491`).

**16.4** Verify the **Task Description section** shows the job description (`Bathroom vanity drain clogged — backed up.`).

**16.5** Verify the **Documentation section** shows camera upload buttons for: Before photos, Receipt, After photos. Report the exact labels on each upload button.

**16.6** Verify the **Flag Issue** button is present. Click it. Verify a bottom sheet slides up with a text area and a submit button. Type `Test flag — battle test`. Verify the submit button becomes enabled. Click outside or dismiss. Verify the sheet closes without submitting.

**16.7** Navigate to `/job/APT-3001` (65 Thornton Ave — URGENT, no tenant). Verify the tenant section shows a fallback (e.g., "Tenant not listed" or equivalent) since this job has no tenant name for a tech-facing view. Report what you see.

**16.8** Navigate to `/job/APT-3011` (Complete job — 310 Park Blvd). Verify:
- The **Mark Complete** button is NOT shown (job is already complete)
- A "Verified Complete" indicator is shown instead
- The timer shows 00:00:00 (not counting)
- Before/After photo upload buttons are hidden (only Receipt remains)
Report what the bottom action area shows.

---

## BLOCK 17 — Tech PWA: Mark Complete Flow

Navigate to `/job/APT-3004` (350 Hanover St, Janitorial — Ready to Schedule, no tenant). Use this job to avoid interfering with dispatch test data.

**17.1** Click **Mark Complete**. Verify:
- A brief location-locking indicator appears
- A full-screen **celebration overlay** appears (green check circle, "JOB COMPLETE" text)
- The overlay auto-dismisses after ~2 seconds
- You are redirected back to `/jobs`
Report the exact text shown on the celebration overlay.

**17.2** On `/jobs`, verify APT-3004 no longer appears in the job list (it is now Complete). Report what the job list shows.

**17.3** Navigate back to `/job/APT-3004`. Verify the job shows as Complete (timer at 00:00:00, "Verified Complete" indicator, no Mark Complete button).

---

## BLOCK 18 — Tech PWA: Change PIN Page

**18.1** Navigate to `/change-pin`. Verify the page loads with:
- A title indicating PIN change
- A "New PIN" input field
- A "Confirm PIN" input field
- A submit button
- A show/hide PIN toggle (eye icon)
Report the exact heading text.

**18.2** Enter a PIN less than 4 digits (e.g., `123`). Submit. Verify an error appears: "PIN must be at least 4 digits." Report the exact error text.

**18.3** Enter `5678` in "New PIN" and `9999` in "Confirm PIN". Submit. Verify an error appears: "PINs do not match." Report exact error text.

**18.4** Enter `5678` in both fields. Submit. Verify redirect to `/jobs` on success. (Mock mode should return success.) Report behavior.

---

## BLOCK 19 — Tech PWA: Time Off Page

**19.1** Navigate to `/time-off`. Verify the page loads — no crash, no blank screen.

**19.2** Verify a form or interface exists for submitting a time-off request. Report what fields are shown (date range, type, notes, etc.).

**19.3** Attempt to submit an empty form. Verify validation fires and an error or disabled state prevents submission.

**19.4** Use the browser back button from `/time-off`. Verify return to `/jobs` without issues.

---

## BLOCK 20 — Tech PWA: Break Attempts and Edge Cases

**20.1** Navigate to `/job/APT-9999` (non-existent job ID). Verify a graceful error state — not a white crash screen. Report what is shown.

**20.2** On `/jobs`, disconnect the network (browser DevTools → Network → Offline). Verify:
- An offline banner appears ("You're offline" or equivalent)
- The job list still shows cached jobs
Reconnect the network. Verify the offline banner disappears.

**20.3** While offline, navigate to a job detail page. Verify the page loads from cache (no blank screen). Report any degraded behavior.

**20.4** On `/jobs`, rapidly tap a job card multiple times (simulate double-tap). Verify: you land on the job detail page once — no stacked navigation or double-render.

**20.5** On a job detail page, click **Mark Complete** then immediately press the browser back button before the celebration overlay dismisses. Verify: no broken state — the job should still be marked Complete when you re-navigate to it.

**20.6** Set the viewport to **375px wide**. Navigate to `/jobs`. Verify job cards stack correctly, all text is readable, touch targets are at least 44×44px. Navigate to a job detail page. Verify all sections are accessible without horizontal scroll.

**20.7** On `/jobs`, switch to Spanish (ES). Navigate to a job detail page. Verify the job detail page also uses Spanish strings (timer label, section headings, button text). Report the Spanish text on the Mark Complete button.

**20.8** On the login page, enter badge `1` and an incorrect PIN (`9999`). Verify an error message appears: "Invalid badge number or PIN." or equivalent. Verify you remain on `/login` (no redirect).

**20.9** On the login page, enter badge `999` (non-existent). Verify the same error behavior as 20.8.

**20.10** On the login page, submit with both fields empty. Verify form validation fires before any API call is made. Report the validation behavior.

---

## OUTPUT FORMAT

Write results to `artifacts/ag_test_results.txt`. One line per test item:
```
[PASS] 2.3 Needs Review tab → navigated to /live, clicked Needs Review tab, saw APT-3001 (65 Thornton Ave) and APT-3002 (1420 Alice St) only
[FAIL] 4.6 Persistence after reload → expected APT-3003 in Federico lane, grid was empty after reload
[BLOCKED] 9.2 TECH tab placeholder → no TECH tab found in left panel or anywhere on /live
```

Report ONLY: "Test sprint complete. Results written to artifacts/ag_test_results.txt."

**DO NOT fix any failure. DO NOT modify any source files. Log bugs as FAIL and move on.**

**DO NOT fix any failure. DO NOT modify any source files. Log bugs as FAIL and move on.**
