# ADR-006: DAL Pattern — Neon-First with Sheets Fallback (Now Neon-Only)

**Status:** Superseded — Phase 3 cut-over complete 2026-06-01. Sheets path is dead. DAL cleanup pending.  
**Date:** 2026-06-06  
**Deciders:** Brandon Bittner  

---

## Context

During the migration from Google Sheets to Neon Postgres, a direct cutover was too risky — the Sheets data was the live production dataset and Neon was being seeded incrementally. The system needed to keep serving live data while the migration ran.

A parallel-write / dual-read approach (sometimes called "strangler fig") was chosen: write to both systems simultaneously during migration, read from Neon when data exists there, fall back to Sheets when it doesn't.

---

## Decision (Original — Phase 2 Migration)

All data access goes through a repository pattern in `tech-pwa/src/lib/dal/`:

**Read pattern (Neon-First):**
1. Query Neon first
2. If Neon has the record → return it, enriching from Sheets if contact fields are sparse
3. If Neon is empty or in sandbox mode → fall back to Sheets via `sheetsRequest()`
4. Merge results, deduplicate by `jobId` (Neon takes precedence)

**Write pattern (Sheets-First, Neon Shadow-Write):**
1. Write to Sheets via `sheetsRequest()` (source of truth during migration)
2. If Sheets write succeeds → shadow-write same data to Neon (best-effort, swallow failures)
3. If sandbox mode → skip both writes

**Migration gate:** `NEXT_PUBLIC_SANDBOX_MODE=true` disables all Neon reads/writes for safe local testing without touching production data.

---

## Superseded State (Post Phase 3 Cut-Over)

As of 2026-06-01:
- **Neon is the sole write path and source of truth**
- **Google Sheets Dispatch Queue is locked as read-only archive**
- `WRITE_PATH_NEON_ONLY=true` is set in GAS Script Properties (gates GAS-side `updateJob`)

**Known gap:** `dal/jobs.ts:updateJob` still contains the Sheets-first write logic from the migration period. This code calls `sheetsRequest('updateJob')` before writing to Neon. This is dead code — the Sheets path should be no-ops or explicitly removed in a cleanup sprint.

The intended post-cut-over DAL shape:
1. Write directly to Neon via Drizzle
2. No Sheets write
3. No fallback reads from Sheets for dispatch data
4. Sheets reads remain only for legacy data (Historical Assignments for `suggestTechs`, Time Records until migrated)

---

## Consequences

**Positive:**
- Strangler fig pattern allowed zero-downtime migration with no data loss
- Sandbox mode prevents accidental production writes during development
- Repository pattern isolates data access — switching from Sheets to Neon required only DAL changes, not page changes

**Negative / Constraints:**
- The DAL cleanup sprint is pending — until it runs, `updateJob` is making a wasteful Sheets API call on every job update even though the GAS side no-ops it
- The `source` field on DAL responses (`'neon'` / `'sheets'` / `'hybrid'`) will always return `'neon'` post cut-over — this field can be removed in the cleanup sprint
- Any developer reading `dal/jobs.ts` cold will see Sheets write code and think Sheets is still writable — this ADR and the cleanup sprint together resolve that confusion
