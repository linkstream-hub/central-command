# GATES.md — APT Central Command
# Load this when: doing a diff review, reviewing test results, or making a merge decision.
# AG: load before implement sprint and before test sprint.
# Not part of base session load — fetch on demand.

---

## ✅ SPRINT CHECKLISTS

**For AG (before implement sprint):**
- [ ] GSD plan exists
- [ ] Flagged items cleared by Claude Code
- [ ] `git branch --show-current` → output matches `feat/[feature-name]` in spec — STOP if it doesn't
- [ ] Branch exists on remote: `git ls-remote --heads origin feat/[feature-name]` returns a result

**For Claude Code (before diff review):**
1. `wc -l artifacts/ag_diff.txt` — must be non-zero before reading anything else
2. `git log main..HEAD --oneline` on the PR branch — must show commits
3. Read `artifacts/ag_diff.txt` directly — never review from a prose summary
4. Check every file in the diff against the spec's expected file list — flag anything not listed
5. New `/api/` routes: read the route file directly, verify dual auth (session + x-api-key + 401)
6. Diff touches any test file or e2e.yml: read `playwright.config.ts` directly — verify webServer, baseURL, DATABASE_URL wiring
7. Run all DIFF GATES below in order before issuing PASS or BLOCK

**For AG (test sprint — non-negotiable):**
- [ ] `DATABASE_URL` connected to real Neon dev branch — no mock/sandbox ever
- [ ] Visual features: screenshot committed to `artifacts/`
- [ ] CSS/font/color changes: paste browser console output for each changed token — not just a screenshot:
  - Font swap: `document.fonts.check("1em <FontName>")` → must return `true`
  - Color token: `getComputedStyle(document.body).getPropertyValue("--accent").trim()` → paste exact hex
- [ ] API-dependent features: network request/response (status + bodies) in `ag_test_results.txt`
- [ ] `ag_test_results.txt` references specific observed data — not generic "PASS"
- [ ] `npx playwright test` run and summary line pasted into `ag_test_results.txt` — not just "passed," the literal output line (e.g. `42 passed (31s)`)

**Merge gate (Claude Code says "Clear to merge"):**
- [ ] tsc zero errors confirmed
- [ ] All test results PASS or BLOCKED with valid reason
- [ ] Screenshots and/or network evidence present for relevant features
- [ ] No production data files in repo
- [ ] No API keys or secrets in diff
- [ ] No key values or secret-resembling strings in `ag_test_results.txt` or any committed artifact — scan it before clearing
- [ ] `npx playwright test` summary line present in `ag_test_results.txt`
- [ ] Any live-service integration (Sentry, push, webhook): event ID or service-confirmed response present

---

## CLAUDE CODE — REVIEW GATES (run in order, every diff and every test result)

**DIFF GATES**
1. **Diff non-empty:** `wc -l artifacts/ag_diff.txt` → non-zero. Zero = BLOCK immediately, do not proceed.
2. **Branch correct:** `git log main..HEAD --oneline` on the PR branch → must show commits. Empty = BLOCK.
3. **File scope:** Every file in the diff is in the spec's expected file list. Unexpected file = flag, do not auto-PASS.
4. **No root file moves:** AG must never move/rename/delete `.gs`, `.js`, or `.html` at repo root. Any such change = hard BLOCK.
5. **Dual auth on every new route:** Each new `/api/` route has `auth()` + `x-api-key` header check + 401 on both failing. Read the route file directly — do not infer from the diff summary. Missing either = BLOCK.
6. **No `as any`:** Zero `as any` casts in diff. Any found = BLOCK.
7. **No production data:** No `data_exports/`, real JSON records, or customer data in diff. Hard FAIL.
8. **No secrets in diff:** No UUID-shaped strings, hex tokens, DSNs, or key-like patterns anywhere in the diff. Hard FAIL — require rotation if found.

**TEST RESULT GATES**
9. **Specific values only:** `ag_test_results.txt` contains real observed data — IDs, status codes, response bodies. Generic "PASS" = send back for re-test.
10. **Network evidence:** Every new API endpoint has HTTP status code + response body excerpt in `ag_test_results.txt`. Missing = BLOCK.
11. **E2E summary line:** `npx playwright test` summary line (e.g. `42 passed (31s)`) present in `ag_test_results.txt`. Missing = BLOCK.
12. **No secrets in test results:** Scan `ag_test_results.txt` for UUID-shaped strings, hex tokens, key-like patterns. Found = hard FAIL, confirm rotation needed.
13. **Real Neon only:** Any indication of mock/sandbox database = immediate BLOCK.

**PROCESS GATES**
14. **Implement and test are separate sprints:** If AG submits diff and test results in the same report = send back, enforce separation.
15. **Only Claude Code clears merge:** AG stating "cleared for merge" or "ready to merge" = protocol violation. Restate the rule.
16. **Fix inline, don't backlog:** Wrong and fixable in 1–3 files with no browser verification = fix it now. Backlog is for things genuinely impossible to fix in the current sprint.
17. **Branch integrity after every sprint:** Run `git log --oneline -5`. Any sprint commit on `main` = BLOCK and investigate.
