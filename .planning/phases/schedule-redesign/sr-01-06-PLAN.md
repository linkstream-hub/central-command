---
phase: sr-01
plan: 06
type: execute
wave: 4
depends_on: [sr-01-02, sr-01-03, sr-01-04, sr-01-05]
files_modified:
  - tech-pwa/tests/e2e/scheduling.spec.ts
autonomous: false
requirements: [SR-REGRESSION]
must_haves:
  truths:
    - "Playwright full suite: 0 failed (regression ceiling vs 43p/68s/0f baseline)"
    - "scheduling.spec.ts 5.1 PASS — tech-row grid visible on /schedule"
    - "scheduling.spec.ts 5.2 PASS — Lock and Send button visible"
    - "scheduling.spec.ts 7.1, 7.2, 7.3 PASS — weekly-schedule and live pages unaffected"
    - "auth.spec.ts 1.6 PASS — Invalid badge number or PIN error string unchanged"
    - "All phase2-verification tests pass or skip (no new failures)"
  artifacts:
    - path: "tech-pwa/tests/e2e/scheduling.spec.ts"
      provides: "Final verified test file — 5.1 and 5.2 rewritten, 7.x unchanged"
      contains: "tech-row"
  key_links:
    - from: "scheduling.spec.ts 5.1"
      to: "TechRow component"
      via: "data-testid=tech-row"
      pattern: "tech-row"
    - from: "scheduling.spec.ts 5.2"
      to: "LockSendButton component"
      via: "data-testid=lock-send-btn"
      pattern: "lock-send-btn"
---

<objective>
Final verification wave. Run the complete Playwright suite against all SR-01 changes and confirm zero new failures vs the 43p/68s/0f baseline. Add two additional smoke tests (5.3 Lock and Send confirmation screen, 5.4 day/week toggle) if the suite is green. Produce the final ag_test_results.txt artifact.

Purpose: The regression ceiling is the hard gate before merge. This plan is the proof that SR-01 ships clean.
Output: Verified Playwright suite with final test results artifact.
</objective>

<execution_context>
@C:/Users/Aldrick/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Aldrick/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-CONTEXT.md
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-RESEARCH.md
@C:/PTOW/1_APT_Central_Command/RULES.md
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-02-SUMMARY.md
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-03-SUMMARY.md

<interfaces>
<!-- Playwright baseline — NEVER go below this -->
Baseline: 44 passed, 68 skipped, 0 failed (S129 local smoke, C:\ path)
CI baseline: 6 passed, 20 skipped, 0 failed
Regression ceiling: 0 new failures. Any new failure = STOP, fix before continuing.

<!-- Playwright config -->
Config: tech-pwa/playwright.config.ts
Run command: cd tech-pwa && npx playwright test
Single file: cd tech-pwa && npx playwright test tests/e2e/scheduling.spec.ts
Auth fixture: tests/fixtures/auth.ts — loginAsAdmin uses badge=1 flow, 60s waitForURL timeout

<!-- Tests rewritten in plan 02 (scheduling.spec.ts) -->
5.1: expects [data-testid="tech-row"] to be visible on /schedule
5.2: expects [data-testid="lock-send-btn"] to be visible on /schedule
7.1: unchanged — /weekly-schedule, text=240 Lakeshore Ave
7.2: unchanged — /weekly-schedule, text=Cabrera, Salvador
7.3: unchanged — /live, text=240 Lakeshore Ave NOT visible

<!-- Tests that must stay passing -->
auth.spec.ts 1.2: Dev Login button (dispatch login section unchanged)
auth.spec.ts 1.3: Dev Login lands on /live
auth.spec.ts 1.6: Invalid badge number or PIN. (string preserved in TechLoginView)
phase2-verification.spec.ts: all DISP-01/02/03 — /live and API routes (unaffected by SR-01)

<!-- New smoke tests to add if suite is green (5.3 and 5.4) -->
5.3: Lock and Send confirmation screen appears after click
  - Navigate to /schedule
  - Locate [data-testid="lock-send-btn"], click it
  - Wait for element with text matching /Dispatched|Already dispatched/i to be visible
    (handles both success confirmation and 409 repeat-click scenario)
  - timeout: 10000

5.4: Day/week toggle present
  - Navigate to /schedule
  - Expect element with text "Day" to be visible
  - Expect element with text "Week" to be visible
  - timeout: 8000

Add 5.3 and 5.4 ONLY after confirming 5.1 and 5.2 pass. If suite is not clean, fix first.
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Run scheduling.spec.ts in isolation — verify 5.1 and 5.2 pass</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/tests/e2e/scheduling.spec.ts
  </read_first>
  <action>
    Start dev server if not running:
    cd C:/PTOW/1_APT_Central_Command/tech-pwa && npm run dev
    (run in background — wait for "Ready" output before proceeding)

    Run scheduling tests only:
    cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx playwright test tests/e2e/scheduling.spec.ts --reporter=list

    Expected output: All 5 tests pass (5.1, 5.2, 7.1, 7.2, 7.3).
    If 5.1 fails: the data-testid="tech-row" is missing from TechRow component — fix TechRow.tsx.
    If 5.2 fails: the data-testid="lock-send-btn" is missing from LockSendButton — fix LockSendButton.tsx.
    If 7.x fails: regression in /weekly-schedule or /live — STOP and report to Claude Code.

    Do NOT proceed to Task 2 until scheduling.spec.ts shows 0 failed.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx playwright test tests/e2e/scheduling.spec.ts --reporter=list 2>&1 | tail -10</automated>
  </verify>
  <acceptance_criteria>
    - scheduling.spec.ts output contains "5 passed" or equivalent count with 0 failed
    - Test "5.1 Schedule page loads tech-row grid" = PASSED
    - Test "5.2 Lock and Send button is visible in schedule header" = PASSED
    - Tests 7.1, 7.2, 7.3 = PASSED (not failed — skip is acceptable if seeded data missing)
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Add smoke tests 5.3 and 5.4 to scheduling.spec.ts</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/tests/e2e/scheduling.spec.ts
  </read_first>
  <action>
    Only proceed with this task if Task 1 shows 0 failed.

    Edit tests/e2e/scheduling.spec.ts — add two new tests inside the existing describe block,
    after test 5.2 and before test 7.1:

    test('5.3 Lock and Send confirmation or duplicate guard appears on click', async ({ page }) => {
      await page.goto('/schedule');
      await page.locator('[data-testid="lock-send-btn"]').click();
      await expect(page.locator('text=/Dispatched|Already dispatched/i').first()).toBeVisible({ timeout: 10000 });
    });

    test('5.4 Day and week view toggles are present', async ({ page }) => {
      await page.goto('/schedule');
      await expect(page.locator('text=Day').first()).toBeVisible({ timeout: 8000 });
      await expect(page.locator('text=Week').first()).toBeVisible({ timeout: 8000 });
    });

    Do not change the beforeEach block.
    Do not change 7.1, 7.2, 7.3.
    Do not change 5.1, 5.2.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -3</automated>
  </verify>
  <acceptance_criteria>
    - scheduling.spec.ts contains test '5.3 Lock and Send confirmation or duplicate guard appears on click'
    - scheduling.spec.ts contains test '5.4 Day and week view toggles are present'
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Run full Playwright suite — confirm 0 new failures</name>
  <read_first>Nothing to read — terminal task</read_first>
  <action>
    Run the complete suite:
    cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx playwright test --reporter=list

    Acceptable outcome: passed count >= 43, failed = 0, skipped count similar to baseline (68).
    New passes vs baseline are fine (5.3 and 5.4 add to passed count).
    New skips are acceptable if caused by missing seeded data for new tests.

    If ANY test shows FAILED (not skipped):
    - Read the failure message
    - Determine which plan's component is the root cause
    - Fix the component
    - Re-run until 0 failed
    - Do NOT mark this task done while any test shows FAILED

    After 0 failed confirmed:
    Kill dev server:
    Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx playwright test 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - Playwright output contains "0 failed" (exact string)
    - Passed count is >= 43 (new tests may increase this)
    - No test name appears in red or marked FAILED
    - Dev server killed after run
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 4 (N-2): tsc + push + git diff + final test results artifact</name>
  <read_first>Nothing to read — terminal task</read_first>
  <action>
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit — must exit 0.
    2. git add tech-pwa/tests/e2e/scheduling.spec.ts
    3. git commit -m "test(schedule): add 5.3 + 5.4 smoke tests — SR-01 Playwright suite complete"
    4. git push origin HEAD
    5. git diff main...HEAD > C:/PTOW/1_APT_Central_Command/artifacts/sr-01-06-diff.txt
    6. Write C:/PTOW/1_APT_Central_Command/artifacts/sr-01-06-test-results.txt with the following filled in:
       - Full Playwright summary line (e.g. "47 passed, 68 skipped, 0 failed"): ______
       - scheduling.spec.ts 5.1 result: ______
       - scheduling.spec.ts 5.2 result: ______
       - scheduling.spec.ts 5.3 result: ______
       - scheduling.spec.ts 5.4 result: ______
       - scheduling.spec.ts 7.1 result: ______
       - scheduling.spec.ts 7.2 result: ______
       - scheduling.spec.ts 7.3 result: ______
       - auth.spec.ts 1.6 result: ______
       - Regression ceiling (0 new failures vs 43p/68s/0f baseline): PASS / FAIL
    7. git add artifacts/sr-01-06-diff.txt artifacts/sr-01-06-test-results.txt
    8. git commit -m "chore: sr-01-06 diff + final test results artifact"
    9. git push origin HEAD
    Post both artifact paths to Claude Code and stop. Wait for PASS.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit</automated>
  </verify>
  <acceptance_criteria>
    - npx tsc --noEmit exits 0
    - artifacts/sr-01-06-test-results.txt exists and contains "0 failed" in Playwright summary line
    - artifacts/sr-01-06-test-results.txt contains "PASS" for regression ceiling line
    - Branch is feat/schedule-redesign
  </acceptance_criteria>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 5 (N-1): Final human review — all SR-01 features working end-to-end</name>
  <read_first>Nothing to read — final visual review</read_first>
  <what-built>
    Full end-to-end review of all SR-01 deliverables before merge:
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npm run dev
    2. /schedule — verify: tech-row grid, amber Lock and Send button, day/week toggle, date nav
    3. /schedule → Lock and Send → verify confirmation screen with tech count + job count
    4. /login (dispatch mode) — verify: Google OAuth button visible, amber accent (not blue)
    5. /login?tech=1 (tech mode) — verify: numeric keypad, PIN dots, amber Confirm button
    6. /jobs (mobile viewport 375×812) — verify: amber URGENT cards, teal STANDARD cards, bottom nav
    7. /live — verify: amber accent on interactive elements (not blue — platform-wide token change)
    8. Paste full content of artifacts/sr-01-06-test-results.txt into response
    9. Kill dev server
  </what-built>
  <how-to-verify>
    - All 6 pages match their reference images / design spec from sr-01-CONTEXT.md
    - No blue accent anywhere (platform is fully amber)
    - Playwright summary confirms 0 failed
  </how-to-verify>
  <resume-signal>Post artifacts/sr-01-06-test-results.txt content to Claude Code and stop. Wait for clear-to-merge.</resume-signal>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 6 (N): Merge after Claude Code clear-to-merge</name>
  <read_first>Nothing to read</read_first>
  <what-built>N/A — merge gate only. This is the final merge for the entire SR-01 phase.</what-built>
  <how-to-verify>Merge only after Claude Code issues "Clear to merge." Not before. This closes the Schedule Page Redesign milestone.</how-to-verify>
  <resume-signal>Claude Code issues "Clear to merge" — then merge PR. SR-01 complete.</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Test suite → live dev server | Playwright tests run against local dev; no production data affected |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-sr06-01 | Tampering | Playwright globalSetup seed data | accept | globalSetup.ts seeds badge=1 and badge=99 — unchanged from baseline |
| T-sr06-SC | Tampering | npm installs | accept | No new packages in this plan |
</threat_model>

<verification>
- npx playwright test shows 0 failed
- Passed count >= 43 (baseline)
- scheduling.spec.ts 5.1, 5.2, 5.3, 5.4 all PASS or SKIP (not FAIL)
- auth.spec.ts 1.6 PASS
- phase2-verification.spec.ts: no new failures
- sr-01-06-test-results.txt documents all results
</verification>

<success_criteria>
- Full Playwright suite: 0 failed, >= 43 passed, 0 regressions vs baseline
- All SR-01 features verified working in browser
- Final test results artifact committed to repo
- Claude Code issues clear-to-merge
- SR-01 Schedule Page Redesign milestone COMPLETE
</success_criteria>

<output>
Create C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-06-SUMMARY.md when done
</output>
