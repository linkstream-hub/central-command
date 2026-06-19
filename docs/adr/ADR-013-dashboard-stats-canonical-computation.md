# ADR-013: Dashboard Stats — Canonical Computation and Dead Code Removal

**Status:** Accepted  
**Date:** 2026-06-17  
**Deciders:** Brandon Bittner  

---

## Context

Architecture review (Candidate 4) found three independent implementations of dashboard stats computation. They diverged and the divergence is a production bug.

**Three implementations:**

1. `tech-pwa/src/lib/dal/mappers.ts:computeStats` — exported function, original semantics. Only caller is `jobsRepository.getDispatchData()`, which is dead code (routing table at `dashboard-api.ts:527` sends `getDispatchData` action directly to `/api/jobs`, bypassing the DAL method entirely). This implementation is dead.

2. `tech-pwa/src/lib/dashboard-api.ts:computeStats` — private function, runs only in mock mode (badge=1, PIN=1234). Uses **repurposed semantics** — field names in `DashboardStats` were intentionally repurposed to match new UI labels when the dashboard was redesigned:
   - `urgentCount` → Needs Review count ("New Leads")
   - `needsActionCount` → PTE Required ∪ Awaiting Approval count ("Blocked")
   - `ptePendingCount` → Ready to Schedule count ("Ready to Dispatch")
   - `doneThisWeekCount` → today-only complete count ("Completed Today")

3. `tech-pwa/src/app/api/jobs/route.ts:142-159` — inline computation, original semantics. A comment says "Compute stats (matching computeStats in dashboard-api.ts)" but the implementations diverge. **This is the live production path.** The page `live/page.tsx` fetches `/api/jobs` and passes the response stats directly to `SummaryCards.tsx`.

**Production impact:** `SummaryCards.tsx` renders the live API stats under UI labels designed for the repurposed semantics. Dispatchers see "New Leads" that counts urgent-priority jobs instead of Needs Review jobs; "Ready to Dispatch" that counts PTE Required instead of Ready to Schedule; "Completed Today" that counts the last 7 days instead of today. Wrong numbers on every session.

**Additional issues:**
- `DashboardStats` type defined twice: `dashboard-api.ts:10` and `lib/types.ts:178`
- Inline timezone+filter block in API route is 20 lines of boilerplate with no name

---

## Decision

### Decision 1: Fix API route stats to use repurposed semantics

The repurposed semantics in `dashboard-api.ts` are correct — they match the UI labels. Update `api/jobs/route.ts` inline stats block to match exactly:

```ts
urgentCount:        active.filter(j => j.status === 'Needs Review').length,
needsActionCount:   active.filter(j => j.status === 'PTE Required' || j.status === 'Awaiting Approval').length,
ptePendingCount:    active.filter(j => j.status === 'Ready to Schedule').length,
todayScheduledCount: active.filter(j => j.scheduledDate === todayStr).length,
doneThisWeekCount:  filteredJobs.filter(j => j.status === 'Complete' && j.scheduledDate === todayStr).length,
```

### Decision 2: Extract to named `computeDashboardStats()` in `dal/mappers.ts`

Replace the inline block in `api/jobs/route.ts` with a call to an exported `computeDashboardStats(jobs, today)` function in `dal/mappers.ts`. Delete the old dead `computeStats` from that file. The new function uses repurposed semantics.

This restores `dal/mappers.ts:computeStats` to a live, named, tested function at the correct location.

### Decision 3: Delete `jobsRepository.getDispatchData()`

Dead code — has no live callers. The routing table at `dashboard-api.ts:527` bypasses it. Delete the method and its dependencies from `dal/jobs.ts`.

### Decision 4: Consolidate `DashboardStats` type

Canonical location: `tech-pwa/src/lib/types.ts`. Remove duplicate from `dashboard-api.ts`. Update the import in `SummaryCards.tsx`, `live/page.tsx`, and anywhere else that imports from `dashboard-api`.

### Decision 5: Rename `DashboardStats` fields to match UI labels

Optional in this sprint — field renaming touches many files and can be deferred. Fields remain with existing names (`urgentCount`, etc.) but semantics are now correct. Field renaming (`newLeadsCount`, `blockedCount`, etc.) can happen later when types.ts is the canonical owner.

---

## Consequences

- Production bug resolved: summary cards show correct counts
- `getDispatchData()` deleted → DAL shrinks
- `dal/mappers.ts:computeStats` replaced with correctly-named `computeDashboardStats()`
- `DashboardStats` type lives in one place
- `dashboard-api.ts:computeStats` (mock-only) stays — it already uses correct semantics and is guarded by mock mode
- No UI changes — only the numbers change (to correct values)
