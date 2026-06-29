# SPEC: P2-1 — Infrastructure Hardening
# Phase 2 opener. CI dependency security + Dependabot + Apps Script trigger audit.
# Owner: AG | Reviewer: Claude Code | Branch: feat/p2-1-infra-hardening

---

## CONTEXT

Phase 1 is complete. Phase 2 hardens the infrastructure before Phase 3 (GAS → Next.js migration).

Three items this sprint:
1. Dependabot — automated dependency PRs, currently absent
2. npm audit gate — audit already runs in CI but `continue-on-error: true` means it never blocks. Fix the 7 known high vulns first, then make the gate hard.
3. Apps Script trigger inventory — run `ScriptApp.getProjectTriggers()` on both GAS projects, document results in ARCHITECTURE.md so we know exactly what's running on a schedule.

---

## TASKS

### Task 1 — Add Dependabot config

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/tech-pwa"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
    labels:
      - "dependencies"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
    open-pull-requests-limit: 3
    labels:
      - "dependencies"
```

Document: `______` (file created at `.github/dependabot.yml`)

### Task 2 — Audit and fix npm high vulnerabilities

```
cd tech-pwa && npm audit --audit-level=high 2>&1 | head -60
```

Paste full output into `ag_test_results.txt`:
```
Task 2: npm audit output
______
```

For each HIGH severity vulnerability:
- If `npm audit fix` resolves it without breaking changes: run it and commit
- If it requires `--force` (breaking change): document it in `ag_test_results.txt` as "NEEDS MANUAL REVIEW: [package] [reason]" and skip — do not force-upgrade
- If it is a dev-only dependency with no production exposure: document as "DEV-ONLY: [package]" — acceptable to leave

After running any safe fixes:
```
cd tech-pwa && npm audit --audit-level=high
```

Paste final audit summary: `______`

### Task 3 — Harden the CI audit gate

**File:** `.github/workflows/ci.yml`

If Task 2 reduced HIGH vulns to 0:

Change:
```yaml
      - name: Dependency vulnerability audit
        run: npm audit --audit-level=high
        continue-on-error: true
```

To:
```yaml
      - name: Dependency vulnerability audit
        run: npm audit --audit-level=high
```

If HIGH vulns remain (unfixable without breaking changes):

Change to:
```yaml
      - name: Dependency vulnerability audit
        run: npm audit --audit-level=critical
```

(Downgrades the gate to critical-only, which is still better than silent. Document the remaining HIGH vulns in `docs/KNOWN_VULNS.md` with reason they can't be fixed.)

Document: `______` (gate level set to: high / critical, reason: ______)

### Task 4 — Apps Script trigger inventory

In GAS console → open the **Lead Parsing** project (repo root `TechPWA.gs` / `Code.js`).

Run this once from the editor (do not deploy):

```javascript
function listTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) {
    Logger.log(
      'Function: ' + t.getHandlerFunction() +
      ' | Type: ' + t.getEventType() +
      ' | Source: ' + t.getTriggerSource()
    );
  });
  Logger.log('Total: ' + triggers.length);
}
```

Paste the Logger output into `ag_test_results.txt`:
```
Task 4a: Lead Parsing triggers
______
```

Repeat for **Dashboard API** project (`dashboard-api/DashboardAPI.gs`):
```
Task 4b: Dashboard API triggers
______
```

### Task 5 — Document trigger inventory in ARCHITECTURE.md

In `docs/ARCHITECTURE.md`, find the GAS components section and add a `## GAS TRIGGER INVENTORY` subsection after the component table:

```markdown
## GAS TRIGGER INVENTORY
Last audited: 2026-05-21

### Lead Parsing Project
| Function | Type | Source | Notes |
|---|---|---|---|
[fill from Task 4a output]

### Dashboard API Project
| Function | Type | Source | Notes |
|---|---|---|---|
[fill from Task 4b output]
```

If any trigger calls a function from a file deleted this session (BTCalendar.js, ScheduleMiner.js, Dashboard.js, Calendar.js, Backfill.js): flag it to Claude Code before proceeding — do not delete the trigger yourself.

### Task 6 — tsc + diff

```
cd tech-pwa && npx tsc --noEmit
git diff main...HEAD > artifacts/ag_diff.txt
```

Post to Claude Code. Wait for PASS.

Expected: `______` (0 tsc errors)

### Task 7 (separate session) — Test sprint

```
cd tech-pwa && npm audit --audit-level=high 2>&1 | tail -5
```

Paste the summary line: `______`

Post `ag_test_results.txt` with Tasks 2–5 filled in. Wait for clear-to-merge.

### Task 8 — Merge after "Clear to merge"

Not before.

---

## MERGE GATE

Claude Code checks:
- [ ] `.github/dependabot.yml` present and valid
- [ ] npm audit gate is no longer `continue-on-error: true`
- [ ] Any remaining HIGH vulns documented in `docs/KNOWN_VULNS.md` with reason
- [ ] Trigger inventory present in ARCHITECTURE.md for both GAS projects
- [ ] No trigger calls a deleted file
- [ ] tsc zero errors
- [ ] `package-lock.json` updated if `npm audit fix` ran
- [ ] No files outside: `.github/dependabot.yml`, `.github/workflows/ci.yml`, `docs/ARCHITECTURE.md`, `docs/KNOWN_VULNS.md` (if created), `tech-pwa/package.json`, `tech-pwa/package-lock.json`
