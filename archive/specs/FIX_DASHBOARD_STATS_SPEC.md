# Fix: Dashboard Stats Semantics + Dead Code Removal

**Branch:** `fix/dashboard-stats-semantics`  
**Spec date:** 2026-06-17  
**ADR:** `docs/adr/ADR-013-dashboard-stats-canonical-computation.md`  
**Scope constraint:** Touch only files in task list. Do not rename `DashboardStats` fields (deferred per ADR-013 Decision 5). Do not refactor adjacent code.  
**Priority:** Merge BEFORE Phase 17 — this is a production bug.

---

## Objective

Fix the production bug where `SummaryCards.tsx` shows wrong counts because `api/jobs/route.ts` computes stats with old semantics that don't match the UI labels. Delete two dead code paths. Consolidate `DashboardStats` type to one location.

---

## Task List

### Task 1 — Branch gate
```
git branch --show-current
# must output: fix/dashboard-stats-semantics

git ls-remote --heads origin fix/dashboard-stats-semantics
# must be non-empty
```
Evidence: paste output of both commands.

---

### Task 2 — Replace dead `computeStats` in `dal/mappers.ts` with correct `computeDashboardStats`

**File:** `tech-pwa/src/lib/dal/mappers.ts`

Delete the existing `computeStats` function (lines 58–76). Add in its place:

```ts
export function computeDashboardStats(jobs: Job[], today: string) {
  const active = jobs.filter(j => j.status !== 'Archived' && j.status !== 'Complete');
  return {
    urgentCount:         active.filter(j => j.status === 'Needs Review').length,
    needsActionCount:    active.filter(j => j.status === 'PTE Required' || j.status === 'Awaiting Approval').length,
    ptePendingCount:     active.filter(j => j.status === 'Ready to Schedule').length,
    todayScheduledCount: active.filter(j => j.scheduledDate === today).length,
    doneThisWeekCount:   jobs.filter(j => j.status === 'Complete' && j.scheduledDate === today).length,
  };
}
```

`today` is passed in (not computed inside) so the function is pure and testable.  
Evidence: old `computeStats` gone, new `computeDashboardStats` present, `npx tsc --noEmit` exits 0.

---

### Task 3 — Update `dal/jobs.ts`: delete `getDispatchData()`, update import

**File:** `tech-pwa/src/lib/dal/jobs.ts`

- Delete `getDispatchData()` method from `jobsRepository` (lines 35–55 approximately)
- Update the import from `./mappers` — replace `computeStats` with `computeDashboardStats`
- Remove the `computeStats` call that was inside `getDispatchData`

Evidence: `getDispatchData` absent from file, import updated, `npx tsc --noEmit` exits 0.

---

### Task 4 — Fix `api/jobs/route.ts` inline stats block

**File:** `tech-pwa/src/app/api/jobs/[jobId]/../route.ts` → actually `tech-pwa/src/app/api/jobs/route.ts`

Replace the inline stats computation (lines ~142–159) with a call to `computeDashboardStats`:

```ts
import { computeDashboardStats } from '@/lib/dal/mappers';

// ...inside the GET handler, after building filteredJobs:
const now = new Date();
const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit'
});
const todayStr = formatter.format(now);

const stats = computeDashboardStats(filteredJobs, todayStr);
```

Remove the inline `active` filter variable and all inline stat assignments.  
Evidence: inline block replaced, `computeDashboardStats` imported, `npx tsc --noEmit` exits 0.

---

### Task 5 — Consolidate `DashboardStats` type

**Remove from:** `tech-pwa/src/lib/dashboard-api.ts` (lines 10–16)  
**Canonical location:** `tech-pwa/src/lib/types.ts` (already defined at lines 178–182 — keep as-is)

Update `dashboard-api.ts` to import from `types.ts`:
```ts
import type { DashboardStats } from '@/lib/types';
```

`SummaryCards.tsx` already imports from `dashboard-api` — update its import to pull from `@/lib/types` directly:
```ts
import type { DashboardStats } from '@/lib/types';
```

Evidence: `DashboardStats` defined once in `types.ts`, imported in both files, `npx tsc --noEmit` exits 0.

---

### Task 6 — TypeScript + diff + push (STOP)

```bash
npx tsc --noEmit
# must exit 0 — zero errors

git diff main...HEAD > artifacts/ag_diff_dashboard_stats.txt
git add artifacts/ag_diff_dashboard_stats.txt
git commit -m "fix: correct dashboard stats semantics + delete dead getDispatchData"
git push
```

Post diff to Claude Code. **STOP. Wait for diff review.**

Evidence: paste `npx tsc --noEmit` output + confirm push succeeded.

---

### Task 7 — Manual smoke test (STOP)

Dev server running (`npm run dev`):

1. Load dashboard (`/live`) → inspect SummaryCards:
   - "New Leads" count = count of jobs in `Needs Review` status (not urgent-priority count)
   - "Blocked" count = count of jobs in `PTE Required` + `Awaiting Approval` (not including Needs Review)
   - "Ready to Dispatch" count = count of jobs in `Ready to Schedule` status
   - "Completed Today" count = count of jobs completed today (not last 7 days)

For each card: compare number shown to actual jobs filtered by hand in the job table.

Document: **expected → actual** for each of the 4 cards.

Post results to Claude Code. **STOP. Wait for test review.**

---

### Task 8 — Merge

Only after Claude Code "Clear to merge."
```bash
gh pr merge --squash
```

---

## Out of Scope

- Renaming `DashboardStats` fields (`urgentCount` → `newLeadsCount` etc.) — deferred per ADR-013
- `source: 'neon'` removal — deferred to `chore/remove-neon-source-field`
- Any changes to `dashboard-api.ts:computeStats` (mock mode only, already correct semantics)
- Any UI changes to SummaryCards layout or labels
