# Phase 12 — Plan 04 Summary: Cut Sheets Read Fallbacks (NEON-02)

## What Was Built

Severed all Sheets read fallbacks and the createManualJob Sheets write from the DAL layer. Every read and write in jobs.ts and techs.ts now goes through Neon only.

### jobs.ts Changes
- `getDispatchData()`: Removed sheetsRequest call, merge/deduplicate logic, hybrid source detection. Now returns `source: 'neon'` always.
- `getJobById()`: Removed Sheets enrichment fallback (rmEmail/tenantEmail) and full Sheets fallback. Returns `JOB_NOT_FOUND` if not in Neon.
- `createManualJob()`: Replaced `sheetsRequest('createManualJob', payload)` with `db.insert(jobsTable).values(row).onConflictDoNothing()`. orgId hardcoded to `APT-CA`.
- `updateJob()`: Unchanged — was already Neon-only.
- `sheetsRequest` import removed.

### techs.ts Changes
- `getTechList()`: Removed sheetsRequest call, merge/deduplicate logic. Neon-only. Corrected skill column references from raw record casting (`raw.carpentry`) to actual Drizzle properties (`t.skillCarpentry`).
- `getLiveFieldStatus()`: Same treatment. `minutesWorked` remains 0 placeholder (future sprint).
- `sheetsRequest` import removed.

### sheets-client.ts Tombstone
- Function body replaced with unconditional `throw new Error('[NEON-CUTOVER]...')`.
- Sandbox guard removed — throws in all environments.
- Function signature preserved for TypeScript compatibility.
- Return type set to `Promise<never>` for type safety.

## Blast Radius Audit (beyond plan scope)
- 0 remaining `sheetsRequest` callers anywhere in `src/`
- 0 remaining `source: 'sheets'` or `source: 'hybrid'` in codebase
- No frontend components conditionally branch on source value
- `DASHBOARD_API_URL` still used by comms (Gmail thread fetch), auth, gas bridge, push subscribe — all separate domains, not Sheets data reads

## Deviations from Plan
- **Skill columns**: Plan referenced `t.carpentry`, `t.plumbing` etc. Actual Drizzle properties are `t.skillCarpentry`, `t.skillPlumbing`. Corrected. The old code was silently returning 0 for all skills via `raw.carpentry ?? 0` — the raw record has `skillCarpentry`, not `carpentry`.

## Verification
- `npx tsc --noEmit` — 0 errors
- Net: 65 insertions, 138 deletions (−73 lines)

## Commit
- `2ef7f46` — feat(phase-12): cut Sheets read fallbacks — Neon-only DAL (NEON-02)
