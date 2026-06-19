# SPEC: P2A — CI Hardening
# Closes P2-1 (npm audit), P2-5 (nightly E2E cron), P2-8 (GAS trigger inventory).
# P2-2 (Dependabot) is already done — .github/dependabot.yml confirmed in repo.
# Owner: AG | Reviewer: Claude Code | Branch: feat/p2a-ci-hardening

---

## CONTEXT

Three P2 baseline items are pure CI and docs work — no database, no auth, no cross-system writes. All three can ship in one sprint.

**What exists today:**
- `ci.yml` — tsc + lint + build on PRs. No vulnerability scan.
- `e2e.yml` — Playwright on PRs + manual trigger. No scheduled run.
- `.github/dependabot.yml` — already configured (P2-2 done).
- GAS triggers — defined in code but never inventoried in ARCHITECTURE.md.

**What this sprint adds:**
- `npm audit --audit-level=high` as a CI gate on every PR.
- Nightly E2E cron (Mon–Fri 6am UTC) to catch regressions without a PR trigger.
- Documented trigger inventory in ARCHITECTURE.md so no one creates duplicate triggers.

---

## TASKS

### Task 1 — Add `npm audit` step to `ci.yml`

**File:** `.github/workflows/ci.yml`

After the `Install dependencies` step and before `TypeScript check`, add:

```yaml
      - name: Dependency vulnerability audit
        run: npm audit --audit-level=high
```

Full updated steps block:
```yaml
    steps:
      - uses: actions/checkout@v6

      - uses: actions/setup-node@v6
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: tech-pwa/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Dependency vulnerability audit
        run: npm audit --audit-level=high

      - name: TypeScript check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          NEXT_TELEMETRY_DISABLED: 1
          NEXT_PUBLIC_DASHBOARD_API_URL: https://placeholder.example.com
          NEXT_PUBLIC_DASHBOARD_API_KEY: ci-placeholder
          AUTH_SECRET: ci-placeholder-32-char-secret-xx
          NEXTAUTH_URL: http://localhost:3000
          DATABASE_URL: postgresql://placeholder:placeholder@placeholder/placeholder
          SENTRY_SUPPRESS_TURBOPACK_WARNING: 1
```

`--audit-level=high` fails CI only on HIGH or CRITICAL severity vulnerabilities. Moderate and low issues are reported but do not block. This is the right threshold for a production system — zero tolerance for critical CVEs, pragmatic about low-severity noise.

Run locally first to see current state:
```powershell
cd tech-pwa && npm audit --audit-level=high
```

Document in `artifacts/ag_test_results.txt`:
```
Task 1: npm audit local run
Exit code: ______  (0 = clean, 1 = vulnerabilities found)
High/critical vulnerabilities found: ______  (list each, or "none")
Action taken: ______  (e.g., "audit clean — no action" or "documented findings for next sprint")
```

If HIGH/CRITICAL vulns are found: do NOT fix them in this sprint. Document them in `ag_test_results.txt` and flag to Claude Code. This sprint's goal is to add the gate, not to fix everything it catches on day one.

---

### Task 2 — Add nightly E2E cron to `e2e.yml`

**File:** `.github/workflows/e2e.yml`

Add a `schedule` trigger to the existing `on:` block:

```yaml
on:
  workflow_dispatch:
  schedule:
    - cron: '0 6 * * 1-5'
  pull_request:
    branches: [main]
    paths:
      - 'tech-pwa/**'
```

`0 6 * * 1-5` = 6:00 UTC Monday–Friday. This catches regressions overnight without requiring a PR. The 62 fixme tests are skipped cleanly — only the 12 auth + scheduling tests that currently pass will run. That's sufficient as a regression baseline.

No other changes to `e2e.yml`. The existing secrets (`E2E_AUTH_SECRET`, `DATABASE_URL_TEST`) are already available to scheduled runs via GitHub Actions.

Document in `artifacts/ag_test_results.txt`:
```
Task 2: Nightly E2E cron added
Cron expression: ______  (expected: 0 6 * * 1-5)
First scheduled run will execute: ______  (next weekday at 6am UTC)
```

---

### Task 3 — Document GAS trigger inventory in `ARCHITECTURE.md`

**File:** `docs/ARCHITECTURE.md`

Find the section for **Lead Parsing + TechPWA (root dir)** under `CURRENT COMPONENT MAP`. After the existing component description, add:

```markdown
**Active GAS Triggers (Lead Parsing project):**
| Function | Schedule | Purpose |
|---|---|---|
| `checkNewLeadEmails` | Every 15 minutes | Polls Gmail for new lead emails, parses via Gemini, writes to Sheets |
| `morningAuditReport` | Daily ~6am PT | Sends daily job summary audit email |
| `dailyScheduleSheetSync` | Daily ~6am PT (fires before morningAuditReport) | Syncs schedule sheet data |

Note: `runBackfillBatch` (every 5 min) is a one-time backfill trigger — confirm it is deleted in GAS console if backfill is complete.

**Active GAS Triggers (DashboardAPI project):** None — DashboardAPI is request-driven only (doGet/doPost).
```

Do not run GAS functions or clasp commands for this task. The trigger inventory is derived from code reading — `Code.js:1163`, `Code.js:1552`, `ScheduleMiner.js:1058`, `Backfill.js:102`.

Document in `artifacts/ag_test_results.txt`:
```
Task 3: GAS trigger inventory
Triggers documented: ______  (expected: 3 active + 1 note on backfill)
```

---

### Task 4 — Update `PROFESSIONAL_BASELINE.md`

**File:** `docs/PROFESSIONAL_BASELINE.md`

**4a.** In the Dimension 1 gaps table, update the three rows:

```markdown
| No `npm audit` in CI | ~~**P2**~~ ✅ DONE | `npm audit --audit-level=high` added to `ci.yml`. Fails PR on HIGH/CRITICAL CVE. |
| No Dependabot | ~~**P2**~~ ✅ DONE | `.github/dependabot.yml` confirmed — weekly npm + GH Actions updates. Major versions blocked. |
| No scheduled nightly E2E | ~~**P2**~~ ✅ DONE | `schedule: cron: '0 6 * * 1-5'` added to `e2e.yml`. Runs Mon–Fri 6am UTC. |
```

**4b.** In the Dimension 6 gaps table, update the Apps Script trigger row:

```markdown
| Apps Script trigger inventory | ~~**P2**~~ ✅ DONE | 3 active triggers documented in ARCHITECTURE.md. Backfill trigger flagged for manual deletion check. |
```

**4c.** In the consolidated roadmap P2 table, strike through and close P2-1, P2-2, P2-5, P2-8:

```markdown
| ~~P2-1~~ | ~~`npm audit` in CI~~ | ~~AG~~ | ✅ DONE |
| ~~P2-2~~ | ~~Dependabot configuration~~ | ~~AG~~ | ✅ DONE — `.github/dependabot.yml` was already in repo |
| ~~P2-5~~ | ~~Scheduled nightly E2E~~ | ~~AG~~ | ✅ DONE |
| ~~P2-8~~ | ~~Apps Script trigger inventory~~ | ~~AG~~ | ✅ DONE |
```

---

### Task 5 — tsc + diff

```powershell
cd tech-pwa && npx tsc --noEmit
git diff main...HEAD > artifacts/ag_diff.txt
```

Post to Claude Code. Wait for PASS.

Expected: `______` (0 tsc errors — no TypeScript files changed in this sprint)

---

### Task 6 (separate session) — Test sprint

No browser verification needed — this sprint is CI config + docs only.

Run the npm audit locally and paste the exact output summary:

```powershell
cd tech-pwa && npm audit --audit-level=high
```

Paste into `artifacts/ag_test_results.txt`:
```
Task 6: npm audit full output summary
Exit code: ______
Vulnerabilities by severity: ______  (e.g., "0 critical, 0 high, 3 moderate, 1 low" or paste the npm audit summary table)
High/critical requiring action: ______  (expected: none, or list them)
```

Validate YAML syntax on both changed workflow files:
```powershell
node -e "const fs=require('fs'); require('js-yaml').load(fs.readFileSync('../.github/workflows/ci.yml','utf8')); console.log('ci.yml: valid')"
node -e "const fs=require('fs'); require('js-yaml').load(fs.readFileSync('../.github/workflows/e2e.yml','utf8')); console.log('e2e.yml: valid')"
```

Document:
```
Task 6: YAML validation
ci.yml: ______  (expected: valid)
e2e.yml: ______  (expected: valid)
```

After test sprint results posted: wait for Claude Code clear-to-merge.

---

### Task 7 — Merge after "Clear to merge"

Not before.

---

## MERGE GATE

Claude Code checks:
- [ ] `npm audit --audit-level=high` step present in `ci.yml` after `npm ci`, before tsc
- [ ] `schedule: cron: '0 6 * * 1-5'` in `e2e.yml` `on:` block
- [ ] No other changes to `e2e.yml` (existing env and steps untouched)
- [ ] GAS trigger inventory added to `ARCHITECTURE.md`
- [ ] PROFESSIONAL_BASELINE.md P2-1, P2-2, P2-5, P2-8 all struck through and closed
- [ ] npm audit exit code documented — if HIGH/CRITICAL found, flagged to Claude Code before merge
- [ ] YAML files validated
- [ ] tsc zero errors
- [ ] No TypeScript or application code changed
