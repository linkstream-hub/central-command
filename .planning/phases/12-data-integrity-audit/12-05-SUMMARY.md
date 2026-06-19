# Phase 12 — Plan 05 Summary: Sever Sheets Write Path (NEON-03)

## What Was Built

Rewrote `/api/job-comments/[jobId]/route.ts` to be fully Neon-only. The last active Sheets write path in the Next.js application is now severed.

### GET Handler
- Removed: DashboardAPI fallback (lines 57-114), SheetsComment interface, shadow-write block
- Now: Direct Neon query → map → return. Empty array returned when no rows (no fallback).
- Always returns `source: 'neon'`

### POST Handler
- Removed: `fetch(apiUrl, ...)` Sheets write (lines 144-172), `sheetsComment` variable, `sheetsId` on insert, `onConflictDoNothing()`
- Now: `db.insert(jobComments).values({...}).returning()` → map inserted row → return
- Uses `.returning()` to get the auto-incremented `id` and `createdAt` from Neon directly
- No `sheetsId` set on new inserts (no Sheets origin)
- No `onConflictDoNothing` (not needed without sheetsId dedup)

### Removed
- `SheetsComment` interface
- All `NEXT_PUBLIC_DASHBOARD_API_URL` and `DASHBOARD_API_KEY` references
- Shadow-write failure swallowing (`catch {}` blocks)

## Deviations from Plan
None.

## Verification
- `npx tsc --noEmit` — 0 errors
- Net: 28 insertions, 134 deletions (−106 lines)

## Commit
- `15bad39` — feat(phase-12): sever Sheets write path for job-comments — Neon-only (NEON-03)

## Addendum (2026-06-10 merge-gate review)

The "last active Sheets write path" claim was incomplete: `ManualJobCreateModal` still routed `createManualJob` through `/api/gas` → GAS `createManualJobDA` → Sheets `appendRow` (+ best-effort Neon sync). Found and closed at the merge gate:

- `09fdcb3` — createManualJob ported to Neon (POST /api/jobs + jobsRepository.createManualJob + wc-codes.ts); GAS path no longer reachable from the app
- GAS `createManualJobDA` is now caller-less — catalog for deletion in a later GAS phase
