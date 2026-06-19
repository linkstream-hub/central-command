# Phase 27: DashboardAPI Remainder Migration - Context

**Gathered:** 2026-06-11
**Status:** Ready for planning
**Source:** Lead-dev action inventory (verified 2026-06-10 via dashboard-api.ts fallthrough analysis) + standing GAS-exit mandate

<domain>
## Phase Boundary

Port the last non-Gmail GAS DashboardAPI actions to Next.js routes against Neon, so the `/api/gas` fallthrough in `dashboard-api.ts` serves ZERO non-Gmail actions. After this phase, GAS contains only dead code (Phase 24 deletes it) plus the Gmail-domain actions explicitly carved out to Phase 23.

</domain>

<decisions>
## Implementation Decisions

### In scope (verified fallthrough actions)
- Reads: `getTimecardApprovalQueue`, `getTechAvailability`, `getCalendarData`
- Writes: `approveTimecard`, `disputeTimecard`, `markPTEGranted`, `expandScope`, `generateTenantScheduleLink`, `submitFeedback`

### Out of scope (locked)
- Gmail-domain actions (`getGmailThread`, `getDraftReply`, `replyToThread` GAS fallback) — Phase 23 Unified Dispatch Comms
- No GAS file edits in this phase — actions become caller-less and die in Phase 24
- No new GAS code, ever

### Architecture (locked)
- Each action → Next.js route under `/api/` with Neon via Drizzle; route shape follows existing migrated-action patterns in dashboard-api.ts (MIGRATED_ACTIONS map or special-case blocks)
- Auth: staff session (`auth()` from `@/auth`) for dashboard-called routes; org_id scoping on every query (DAL gate)
- dashboard-api.ts: each ported action added to MIGRATED_ACTIONS or a special case; on port failure return explicit error — never fall through to `/api/gas`
- Data sources MUST be verified per action during research: timecards = `time_records`, availability = schedule/jobs, calendar = jobs scheduled fields. If any action's data still lives only in Sheets (not Neon), that action's port is BLOCKED — flag it, do not fake it

### Quality bar (locked)
- Read each GAS source function in FULL before porting (read-source-before-porting — non-negotiable)
- TDD where logic is non-trivial; unit tests against the 111-test green baseline; zero regressions
- Per-plan terminal gates: tsc + eslint + diff artifact + STOP for Claude Code review
- Playwright 0-failure ceiling before merge

### Claude's Discretion
- Route paths and grouping (one route per action vs grouped resource routes)
- Whether timecard approval queue logic ports verbatim or simplifies against the Neon schema
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Port sources (read in full)
- `dashboard-api/DashboardAPI.gs` — every in-scope *DA function body
- `tech-pwa/src/lib/dashboard-api.ts` — MIGRATED_ACTIONS map, special-case blocks, DEV_BLOCKED_WRITES

### Patterns from Phase 25 (proven analogs)
- `tech-pwa/src/app/api/intake/access-sync/route.ts` — API-key route pattern
- `tech-pwa/src/app/api/jobs/route.ts` — session-auth GET/POST pattern
- `tech-pwa/src/lib/schema.ts` — time_records, employees, jobs tables

### Migration scope
- `docs/GAS_MIGRATION_SCOPE.md` — per-function migration status catalog
</canonical_refs>

<specifics>
## Specific Ideas

- `generateTenantScheduleLink` likely touches trackingToken on jobs — check schema's trackingToken column
- `markPTEGranted` and `expandScope` are dispatcher actions in DEV_BLOCKED_WRITES — ported routes must respect the dev write guard pattern for any side effects, but Neon writes in dev hit the dev branch (archiveJob precedent: remove from DEV_BLOCKED_WRITES when Neon-only)
- Timecard approval feeds payroll — wcCode/meal-premium adjacency; do not change calculation semantics in this phase

</specifics>

<deferred>
## Deferred Ideas

- Gmail-domain actions — Phase 23
- GAS file deletion — Phase 24
- Meal premium auto-calculation — backlogged since CC3.0 milestone doc

</deferred>

---

*Phase: 27-dashboard-remainder*
*Context gathered: 2026-06-11 from verified action inventory*
