# Phase 13: Write Path Flip — Context

**Gathered:** 2026-06-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Stop Code.js from dual-writing to the Dispatch Queue Google Sheets tab. After this phase, `addToDispatchQueue()` and `updateJob()` write to Neon only — no `appendRow` or `setValue` reaches the Dispatch Queue Sheets tab. The `/live` read path already reads from Neon; this phase closes the write side. Phase 14 then locks Sheets as a read-only archive.

This is a pure GAS + backend change. No UI changes. No Next.js route additions. The Neon read path is already confirmed working from Phase 12 audit.

</domain>

<decisions>
## Implementation Decisions

### Flip Safety Mechanism

- **D-01:** Use a GAS Script Property toggle (`WRITE_PATH_NEON_ONLY`). Both `addToDispatchQueue()` and `updateJob()` check this property before executing any Sheets write. When `true`, Sheets writes are skipped and Neon becomes the sole write path. This allows instant rollback (flip the property in the Apps Script console) without a `clasp push` + deploy cycle. The toggle is removed in Phase 14 cleanup once the flip is proven stable.

### updateJob() Scope

- **D-02:** `updateJob()` uses `setValue` on the Dispatch Queue Sheets tab — it is explicitly in WPATH-01 scope ("no `appendRow` or `setValue`"). The researcher traces all callers in `DashboardAPI.gs` and `Code.js`. If dashboard-initiated job updates already route through the Next.js `PATCH /api/jobs/[jobId]` endpoint (which writes to Neon directly), then `updateJob()` is dead code for those paths — stub it (log + return early) when `WRITE_PATH_NEON_ONLY` is true. If any callers are NOT superseded by the Next.js PATCH path, those callers must be redirected to a Neon HTTP call instead. Either way: no `setValue` to Dispatch Queue exits Phase 13.

### Auth Pre-flight (Task 1 — Blocker)

- **D-03:** Verify the `x-api-key` header value that Code.js sends in `syncJobToNeon()` matches the `DASHBOARD_API_KEY` environment variable on the Next.js `/api/jobs/sync` endpoint before any Sheets write is removed. SHADOW_WRITES.md flagged this as a known potential mismatch. If they don't match, fix auth first — do not proceed with the flip until confirmed. This is Task 1 of the plan.

### Error Handling Hardening

- **D-04:** Currently `syncJobToNeon()` in Code.js wraps the HTTP call in a try/catch that logs to `Logger.log` and swallows failures silently. This is acceptable when Sheets is the authoritative write — sync failure is degraded, not data loss. After the flip, Neon is the ONLY write path: silent sync failure = data loss. The flip plan must harden `syncJobToNeon()` so that when `WRITE_PATH_NEON_ONLY` is true, a sync failure throws (or at minimum explicitly alerts via email/Logger.log error + re-throw) rather than silently continuing.

### Verification Approach

- **D-05:** After enabling `WRITE_PATH_NEON_ONLY = true` in production Script Properties: send a test email to `workorder@aptmaintenanceinc.com` that will trigger `addToDispatchQueue()`. Confirm (a) the job appears in `/live` at the production URL (Neon read path), and (b) no new row appears in the Dispatch Queue Sheets tab. This is the explicit WPATH-01 pass/fail check. AG documents observed evidence for both (a) and (b) in `artifacts/ag_test_results.txt`.

### What's Explicitly Out of Scope

- **D-06:** `time_records`, `job_comments`, `employees`, and `compliance_alerts` shadow-writes are NOT touched in Phase 13. They remain dual-write through Phase 14. The `job_comments` unique index issue (flagged HIGH risk in SHADOW_WRITES.md) is deferred — it does not block the `jobs` write path flip.
- **D-07:** No schema migrations in Phase 13. No new Neon columns or tables. No new Next.js routes.
- **D-08:** The GAS `archiveJob()` function (Code.js:1793) also writes to the Dispatch Queue Sheets tab (`setValue('Archived')`). Include it in the `WRITE_PATH_NEON_ONLY` gate — archive action must also route to Neon after the flip.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Write Path State + Gaps
- `docs/SHADOW_WRITES.md` — authoritative inventory of all shadow-write paths, gaps, and conflict strategies. **Read this first.** Section "Cutover Readiness by Table" and "Duplicate Write Path Risks" define what Phase 13 must address.

### GAS Source Files
- `Code.js` (repo root) — `addToDispatchQueue()` (lines 810–924), `updateJob()` (lines 1737–1785), `archiveJob()` (lines 1786–1804), `syncJobToNeon()` (search for it — the HTTP call to `/api/jobs/sync`). These are the exact functions Phase 13 modifies.
- `dashboard-api/DashboardAPI.gs` — trace all callers of `updateJob()` here. Determines whether to stub or redirect.

### Next.js Job Routes
- `tech-pwa/src/app/api/jobs/sync/route.ts` (or equivalent) — the `/api/jobs/sync` endpoint that `syncJobToNeon()` calls. Verify auth header handling (`x-api-key` vs `DASHBOARD_API_KEY`).
- `tech-pwa/src/app/api/jobs/[jobId]/route.ts` — the PATCH endpoint the dashboard uses for direct Neon job updates. Understand whether this supersedes `updateJob()` for dashboard actions.

### GAS Migration Scope
- `docs/GAS_MIGRATION_SCOPE.md` — function-level inventory. Confirm `updateJob`, `addToDispatchQueue`, `archiveJob` migration status.

### Requirements
- `.planning/REQUIREMENTS.md` §v1.1 — WPATH-01, WPATH-02, WPATH-03 define the exact success criteria.
- `.planning/ROADMAP.md` §Phase 13: Write Path Flip — goal, depends-on, success criteria.

### Schema
- `tech-pwa/src/lib/schema.ts` — Neon `jobs` table definition. Verify columns align with what `syncJobToNeon()` sends.

</canonical_refs>

<code_context>
## Existing Code Insights

### Key Functions to Modify
- `addToDispatchQueue()` (Code.js:810–924): Two branches (LOOKUP_BY_SENDER + standard). Both do `appendRow(rowData)` then `syncJobToNeon(getJobDataFromRow(rowData))`. The Neon sync already exists and is called after the Sheets write. Removing `appendRow` and gating the overall function on `WRITE_PATH_NEON_ONLY` is the surgical change.
- `updateJob()` (Code.js:1737–1785): Only Sheets writes — no Neon sync today. Must be handled per D-02.
- `archiveJob()` (Code.js:1786–1804): One `setValue('Archived')` to Dispatch Queue. Include in gate per D-08.

### Auth Path to Verify
- `syncJobToNeon()` in Code.js uses `x-api-key` header.
- `/api/jobs/sync` Next.js endpoint checks `DASHBOARD_API_KEY`.
- SHADOW_WRITES.md noted these "may not match" — D-03 requires verification before any Sheets write is removed.

### Established Patterns
- Script Property access in GAS: `PropertiesService.getScriptProperties().getProperty('KEY')`
- Existing Script Properties used in Code.js: `DASHBOARD_API_URL`, `DASHBOARD_API_KEY` — follow same access pattern for `WRITE_PATH_NEON_ONLY`
- GAS deploy convention: `clasp push --force` + `clasp deploy --deploymentId ... --description "v##"` (see CLAUDE.md). Manual Code.js deploys only — never automate.

</code_context>

<specifics>
## Specific Constraints

- Code.js deploy is manual-only — never automated (see CLAUDE.md). Plan must include Brandon setting the Script Property in GCP console, not a CLI command.
- The `WRITE_PATH_NEON_ONLY` Script Property is set by Brandon in the Apps Script UI (Script Properties panel) — this is a dashboard action he owns.
- Phase 13 must NOT change the Playwright baseline (0 new failures vs ~40 passed / 32 skipped). The flip should be invisible to the UI tests.
- GAS quota: `syncJobToNeon()` makes an HTTP call (UrlFetch). Each new email trigger creates one. No quota concern at current APT volume, but note it.

</specifics>

<deferred>
## Deferred Ideas

- `job_comments` unique index — HIGH risk flagged in SHADOW_WRITES.md. Not Phase 13 scope. Belongs in a dedicated data-quality phase or Phase 14 pre-work.
- `time_records` dual-write resolution — separate cutover with its own gate. Not Phase 13.
- `employees` cutover — separate. Not Phase 13.
- n8n compliance alerts Neon sync — separate endpoint work. Not Phase 13.
- Backfilling any jobs that exist in Sheets but not Neon — Phase 12 audit gate ensures zero mismatches before flip. No backfill needed at flip time.
- Removing the `WRITE_PATH_NEON_ONLY` toggle — Phase 14 cleanup task.

</deferred>

---

*Phase: 13-write-path-flip*
*Context gathered: 2026-06-01*
*All implementation decisions made by Claude Code per WWPGDPTD standard — no gray areas deferred to Brandon.*
