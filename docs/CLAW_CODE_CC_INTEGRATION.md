# CLAW_CODE_CC_INTEGRATION.md
# Central Command × Claw-Code Army: Expert Integration Brief
# Authored: April 26, 2026 | For Claude review and strategic sign-off

---

## WHAT CLAUDE NEEDS TO REVIEW BEFORE ENGAGING

To give an expert opinion on the Claw-Code Army configuration for Central Command (and all PTOW projects), Claude must read:

1. `CLAUDE.md` — System state, column maps, deployment workflow, quality gate
2. `DESIGN_REFERENCE_ANCHORS.md` — Design standards all workers must conform to
3. `CLAW_STRATEGY.md` (in `A:\PTOW\4_Double_Great_Project_35\`) — Global worker fleet strategy
4. The three active sprint specs:
   - `ANTIGRAVITY_CALENDAR_SPEC.md`
   - `ANTIGRAVITY_NOTIFICATIONS_SPEC.md`
   - `ANTIGRAVITY_COMMS_SPEC.md`

---

## CORE PREMISE: THE FACTORY MODEL

The goal is not to replace human judgment. It is to move all mechanical, repeatable, and pattern-confirmable work to an autonomous worker layer so that the human + Claude strategy layer focuses exclusively on decisions with real business stakes.

**If a task fits a pattern**, a Claw Worker does it.
**If a task requires judgment**, Claude specs it and Claw executes it.
**If a task requires strategic architecture**, Claude leads and Claw verifies.

---

## THE 10 STRATEGIC USES OF CLAW-CODE FOR CENTRAL COMMAND

### 1. 🔄 Pre-Sprint "Freshness Verification" Worker
**Problem**: Every sprint currently begins with a human re-reading CLAUDE.md to load context.
**Claw Solution**: Before any sprint, a pre-flight worker:
- Reads CLAUDE.md and confirms version parity with GitHub
- Runs `tsc --noEmit` and reports zero/fail
- Confirms the target spec files exist and have not changed since last run
- Emits a `PRE_SPRINT_BRIEF.md` with a diff of what changed since the last session

**Railway Config**: Schedule trigger (before business hours). Worker: `cc-preflight-agent`

---

### 2. ✅ Post-Sprint TypeScript Guardian
**Problem**: `tsc --noEmit` is a manual step. If forgotten, type errors are pushed to production.
**Claw Solution**: After every Antigravity push to `main`:
- GitHub Actions triggers the `cc-ts-guardian` Railway worker
- Runs `npx tsc --noEmit` inside `tech-pwa/`
- If errors: opens a GitHub Issue with the exact TypeScript error JSON + the file + the line
- If clean: closes any open TypeScript issues for that sprint
- Blocks merge if errors exist

**Quality Gate Enforcement**: Replaces the manual "tsc --noEmit must pass" sprint requirement.

---

### 3. 🎨 Design Reference Compliance Checker
**Problem**: DESIGN_REFERENCE_ANCHORS.md defines 10 checklist items every component must pass. This is currently a manual honor system.
**Claw Solution**: A "Design Lint" worker scans all new TSX files for:
- Missing Framer Motion on new panels (`open/close` must have `initial/animate/exit`)
- `alert()` or `window.confirm()` calls → auto-reject
- `bg-white` or `text-black` (light mode bleed) → flags for review
- Missing skeleton loaders on async components (no `{loading ? <Skeleton>` pattern)
- `any` casting in TypeScript → flags

**Output**: A `DESIGN_AUDIT_REPORT.md` in the `/sprint-reports/` folder on GitHub after each push.

---

### 4. 🔒 Security Sentinel (PAGA Compliance Guard)
**Problem**: Central Command is a LIVE PRODUCTION SYSTEM handling CA Labor Code compliance data. One bad push could expose sensitive employee records.
**Claw Solution**: A Security Sentinel worker runs on every push:
- Audits `DashboardAPI.gs` for exposed CORS headers or missing `validateSessionToken` calls
- Confirms all new `doPost` action routes require authentication
- Flags if `TOM_SHEET_ID_DA` or any Google Sheet ID is hardcoded (vs. Script Properties)
- Scans for `console.log()` with employee data patterns
- Reports via Slack/n8n webhook to Brandon

**Directive**: "This system has PAGA liability exposure. Every security gate must be autonomous."

---

### 5. 📋 Spec Drift Detector
**Problem**: Specs (like `ANTIGRAVITY_CALENDAR_SPEC.md`) are written by Claude but implemented later. Schema drift can occur — the spec describes column indices that no longer match production.
**Claw Solution**: A "Spec Freshness" worker:
- Cross-references column maps in CLAUDE.md against actual `DashboardAPI.gs` constants
- Checks that action names in specs exist as `if (action === '...')` clauses in `doPost`
- Alerts if a spec's column reference (`row[DA_DQ.STATUS]`) doesn't match the current constant map
- Generates a `SPEC_DRIFT_REPORT.md` before every sprint starts

**Prevents**: The entire class of sprint failures where we spend tokens debugging a wrong column index.

---

### 6. 🧪 Automated Browser Test Worker
**Problem**: After building `/calendar`, we need a human to manually open the browser and verify all 13 VERIFICATION STEPS in `ANTIGRAVITY_CALENDAR_SPEC.md`.
**Claw Solution**: A Playwright/Puppeteer worker on Railway:
- Logs in with each role (dispatch, hr, management, admin)
- Visits `/calendar` and verifies: grid renders, chips appear, toggle visible/hidden per role, month nav works
- Captures a screenshot for each role
- Uploads screenshots to a `sprint-verification/` folder in the repo
- Reports `PASS` or `FAIL` per verification step

**Replaces**: ~45 minutes of manual browser verification per sprint.

---

### 7. 📊 Morning Intelligence Brief Worker
**Problem**: Brandon receives a morning audit email from Apps Script, but it is text-only and covers only email activity.
**Claw Solution**: A `cc-morning-brief` Railway worker (runs at 6:30am Pacific):
- Calls `getComplianceAlerts` and summarizes violations
- Calls `getNotifications` for pending time-off requests
- Calls the DQ to find stale jobs (>24h in New, >48h in Scheduled)
- Formats a rich HTML email with summary cards + action links
- Replaces the raw `morningAuditReport()` in Apps Script entirely

**Result**: Information that used to require 3 sheets + a dashboard tab now arrives in one smart brief.

---

### 8. 🔁 Compliance Alert Escalation Worker
**Problem**: CA Labor Code §512 violations currently log to a sheet but don't escalate to anyone in real-time.
**Claw Solution**: A `cc-compliance-escalator` worker (triggered by n8n):
- Monitors the `ComplianceAlerts` sheet for new `PREMIUM` violations
- Automatically notifies Brandon via OpenPhone SMS (when enabled)
- Creates a timestamped "Wage Premium Log" entry in the relevant tech's Time Records
- On 3+ violations in 30 days for one tech: triggers a "Pattern Flag" alert

**Prevents**: PAGA exposure from unaddressed wage premium patterns.

---

### 9. 📁 Stale Spec Archive Worker
**Problem**: Repo 1 currently has 37+ spec files. Many are from completed sprints and create noise for context loading.
**Claw Solution**: A `cc-spec-janitor` worker (runs weekly):
- Reads ANTIGRAVITY_LOG.md to identify "LIVE" sprint completions
- Moves completed spec files to an `/archive/specs/` directory
- Updates a `SPEC_INDEX.md` with "Active" vs "Archived" status
- Ensures the root directory only contains active/pending sprint specs

**Reduces**: Context window usage every session by eliminating stale spec noise.

---

### 10. 🤖 Sprint Execution Agent (The "Full Replacement" Path)
**Problem**: Antigravity (the human-in-the-loop agent) still requires human approval for each command.
**Claw Solution**: For mechanical, spec-defined sprints (like Calendar, Notifications, Comms):
- Claude writes the spec (strategy)
- Claw reads the spec and executes it autonomously
- Claw runs `tsc --noEmit` and self-corrects up to 3 type errors
- Claw opens a GitHub PR titled `[CLAW] Sprint X: /calendar implemented`
- Human (Brandon/Claude) reviews the PR for QA — not the implementation

**Result**: The "Token Cost" of a sprint drops by ~80%. Claude only reads the PR diff, not the entire implementation.

---

## THE RAILWAY DEPLOYMENT MAP FOR CC WORKERS

| Worker Name | Trigger | Runs On | Est. Monthly Cost |
|---|---|---|------|
| `cc-preflight-agent` | Scheduled (6am PT) | Railway / Docker | ~$10 |
| `cc-ts-guardian` | GitHub Push | Railway / GitHub Actions | Free (GH Actions) |
| `cc-design-linter` | GitHub Push | Railway / Docker | ~$5 |
| `cc-security-sentinel` | GitHub Push | Railway / Docker | ~$5 |
| `cc-spec-drift-detector` | On-demand / Scheduled | Railway / Docker | ~$5 |
| `cc-browser-tester` | GitHub Push | Railway / Docker (Playwright) | ~$15 |
| `cc-morning-brief` | Scheduled (6:30am PT) | Railway / Docker | ~$5 |
| `cc-compliance-escalator` | n8n webhook | Railway / Docker | ~$10 |
| `cc-spec-janitor` | Scheduled (weekly) | Railway / Docker | ~$3 |

**Estimated Total**: ~$58/month for a fully autonomous Central Command maintenance fleet.
**Current token cost of equivalent manual work**: Hundreds of dollars per month in Claude API costs.

---

## WHAT CLAUDE NEEDS TO SIGN OFF ON

For Claude to approve this architecture and give actionable guidance, it needs to:

1. **Confirm the Railway Container Strategy**: Review `Containerfile` in `claw-code-private` and confirm it is suitable for multi-repo worker hosting.
2. **Define the "Claw-Readable Spec" Standard**: Review the 3 sprint specs (`CALENDAR`, `NOTIFICATIONS`, `COMMS`) and determine which sections are mechanical enough for Claw to execute vs. which require Claude judgment.
3. **Approve the Security Sentinel Rules**: Review `DashboardAPI.gs` (v27) and define exactly what the security worker must scan for — hardcoded sheet IDs, missing auth checks, etc.
4. **Validate the Browser Test Matrix**: Review the 13-step verification checklist in `ANTIGRAVITY_CALENDAR_SPEC.md` and map each step to a Playwright assertion.
5. **Set the "Escalation Policy"**: Define when a Claw Worker should escalate to a human vs. self-correct vs. log-and-continue.

---

## CROSS-PROJECT GENERALIZATION

Once the CC pattern is proven, it becomes the template for all 8 PTOW projects:

- **Zen Legal / Zen Legal CA**: Spec Drift Detector watches for changes in California statutes that break the Wizard flow.
- **Credit Defense**: Compliance Sentinel monitors FCRA/FDCPA dispute letter templates for outdated citations.
- **Tax Search**: Data Intelligence Worker scans county auction feeds and triggers deal-alert n8n flows autonomously.
- **Golden Coast Law**: Litigation Deadline Worker monitors CCP timelines and escalates to attorney.

**The architecture is the same. Only the "Directive" changes per project.**

---

*This document was authored by Antigravity on April 26, 2026.*
*For Claude review: read this file BEFORE responding to any Claw-Code integration request for Central Command.*
