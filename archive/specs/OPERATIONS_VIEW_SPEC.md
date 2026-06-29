# SPEC — OPERATIONS VIEW RESTRUCTURE
**Status:** Ready for AG implementation
**Sprint type:** UI restructure — no API changes, no schema changes
**Branch:** `feat/operations-view`
**Prerequisite:** None — this spec is Sprint 1 of 2 (Schedule view spec is Sprint 2)

**Target files:**
- `tech-pwa/src/app/live/page.tsx`
- `tech-pwa/src/components/dashboard/JobDetailModal.tsx`
- `tech-pwa/src/components/dashboard/AppSidebar.tsx`
- `tech-pwa/src/components/dashboard/JobQueueTable.tsx` (tab labels only)

---

## OBJECTIVE

Restructure the `/live` page into a focused **Operations view**. Operations owns exactly one phase of the WO lifecycle: **triage and coordination** — Needs Review, PTE Required, and Awaiting Approval jobs. Scheduling and assignment UI does not belong here and must not render here.

This is targeted UI surgery. No new components. No new API actions. No schema changes. The goal is removal and gating, not addition.

---

## CONSTRAINT — CONTRADICTION DETECTOR

Before the first commit, read each target file and verify these literals exist exactly as shown. Flag any mismatch to Claude Code — do NOT resolve mismatches yourself.

| Literal | Expected file |
|---|---|
| `<SummaryCards` JSX render | `src/app/live/page.tsx` |
| `<TechAvailabilityPanel` JSX render | `src/app/live/page.tsx` |
| `const phase = !activeJob ? 'COORDINATION'` | `src/components/dashboard/JobDetailModal.tsx` |
| `commStakeholder` state declaration | `src/components/dashboard/JobDetailModal.tsx` |
| `PRIORITY_BADGES` object | `src/components/dashboard/JobDetailModal.tsx` |
| `SchedulingDispatch` import | `src/components/dashboard/JobDetailModal.tsx` |
| `activeStatFilter` state | `src/app/live/page.tsx` |

---

## CHANGE 1 — Remove SummaryCards from `live/page.tsx`

Remove the `<SummaryCards>` JSX render block from `live/page.tsx`.
Remove the `SummaryCards` import.
Remove the `activeStatFilter` state and `setActiveStatFilter` — if and only if their only consumers are `SummaryCards` and the `onCardClick` handler. Verify before removing.
Remove the `StatFilter` import from `@/components/dashboard/SummaryCards` if no longer used.

Do NOT remove the `stats` state or the `getDispatchData` stats payload — the API still returns them and they may be used elsewhere.

---

## CHANGE 2 — Remove TechAvailabilityPanel from `live/page.tsx`

Remove the `<TechAvailabilityPanel>` JSX render from `live/page.tsx`.
Remove its import.
Remove the `activeTechs` state and the `getLiveFieldStatus` API call from `loadLiveData()` — only if `activeTechs` is exclusively consumed by TechAvailabilityPanel in this file. If it is used elsewhere on the page, keep the state and call, just stop rendering the panel.

Do NOT delete `TechAvailabilityPanel.tsx` — it moves to the Schedule view in Sprint 2.

---

## CHANGE 3 — Add `viewContext` prop to `JobDetailModal`

In `JobDetailModal.tsx`, extend the `JobDetailModalProps` interface:

```typescript
interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onRefresh?: () => void;
  onSave?: () => void;
  viewContext?: 'operations' | 'schedule'; // defaults to 'schedule' for backward compat
}
```

Default behavior (no prop passed, or `viewContext="schedule"`): existing behavior is preserved exactly. Nothing changes for the schedule page or any other caller.

When `viewContext="operations"`: apply the gating rules in Change 4.

---

## CHANGE 4 — Operations-mode gating in `JobDetailModal`

Using the new `viewContext` prop, add conditional rendering rules. The existing `phase` variable (already in the modal — `'COORDINATION' | 'DISPATCH' | 'EXECUTION' | 'POST-JOB'`) handles status-based logic and must not be removed. `viewContext` is a separate, view-based gate.

### What to HIDE when `viewContext === 'operations'`:

**Scheduling section:**
- Do not render `<SchedulingDispatch>` — the tech picker, date picker, time picker, estimated hours field
- If these fields are rendered inside an `editingSection === 'status'` or similar conditional, ensure they are excluded from the operations render path

**TECH comms tab:**
- In the stakeholder tab strip (where `commStakeholder` is set), do not render the `'TECH'` tab option
- If `commStakeholder` was previously set to `'TECH'`, reset it to `'REQUESTER'` on mount when `viewContext === 'operations'`

### What to SHOW (confirm these render normally):
- Full triage fields: description, service category, access info, PTE status, estimate needed flag, notes
- REQUESTER and TENANT comms tabs
- Status dropdown — see transitions below
- Archive action

### Status transitions in Operations mode:

The status dropdown must only offer these transitions:

| Current status | Available transitions |
|---|---|
| Needs Review | PTE Required, Awaiting Approval, **Ready to Schedule**, Archived |
| PTE Required | Needs Review, **Ready to Schedule**, Archived |
| Awaiting Approval | Needs Review, **Ready to Schedule**, Archived |

**"Ready to Schedule" must be the visually most prominent option** — use accent color, larger text, or a primary button style to distinguish it. This is the primary outcome of the Operations phase.

### Priority badge — suppress everywhere:

Remove the render of `PRIORITY_BADGES` (the Urgent/Turnover/PTE/Standard badge that appears in the modal header). Do this unconditionally — not just in operations mode. The priority field is being retired from the UI across both views.

Do NOT remove `priority` from the `Job` interface in `types.ts`. Do NOT remove it from the data fetch. Just stop displaying it.

---

## CHANGE 5 — Pass `viewContext` from `live/page.tsx`

In `live/page.tsx`, wherever `<JobDetailModal>` is rendered, add:

```tsx
<JobDetailModal
  job={selectedJob}
  onClose={...}
  onSave={...}
  viewContext="operations"
/>
```

---

## CHANGE 6 — Rename nav item to "Operations"

In `AppSidebar.tsx`, find the nav item whose `href` points to `/live`. Change its display label to **"Operations"**. Do not change the route — `/live` stays as the URL. Do not rename any other routes or files.

---

## CHANGE 7 — Operations tab strip

In the tab strip component used by `live/page.tsx` (likely `JobQueueTable.tsx` — confirm by reading the file), ensure the visible tabs are:

- **All** (shows Needs Review + PTE Required + Awaiting Approval combined)
- **Needs Review**
- **PTE Required**
- **Awaiting Approval**

If tabs for `Scheduled`, `Complete`, `In Progress` exist in the current Operations/live tab strip, remove them. These statuses are managed exclusively in the Schedule view.

---

## DO NOT TOUCH

- `tech-pwa/src/app/schedule/page.tsx` — out of scope
- `tech-pwa/src/components/dashboard/TechAvailabilityPanel.tsx` — do not delete; it moves to Schedule in Sprint 2
- `tech-pwa/src/components/dashboard/SchedulingDispatch.tsx` — only conditionally hidden via `viewContext`, not deleted
- `tech-pwa/src/lib/types.ts` — no type changes to `priority` field
- `dashboard-api/DashboardAPI.gs` — no API changes
- Neon / database code — no data layer changes

---

## TASK LIST — EXECUTE IN ORDER

Complete each task fully before moving to the next. Do not skip ahead. Do not batch tasks.

1. Read `tech-pwa/src/app/live/page.tsx` in full.
2. Read `tech-pwa/src/components/dashboard/JobDetailModal.tsx` in full.
3. Read `tech-pwa/src/components/dashboard/AppSidebar.tsx` in full.
4. Read `tech-pwa/src/components/dashboard/JobQueueTable.tsx` in full.
5. Run the contradiction detector: verify every literal in the CONSTRAINT table exists in the files just read. If any mismatch is found, stop and report it to Claude Code. Do not proceed until cleared.
6. In `live/page.tsx`: Remove `<SummaryCards>` JSX render and its import. Verify `activeStatFilter` has no other consumers, then remove that state and the `StatFilter` import.
7. In `live/page.tsx`: Remove `<TechAvailabilityPanel>` JSX render and its import. If `activeTechs` is exclusively consumed by TechAvailabilityPanel, remove the state and the `getLiveFieldStatus` API call too. Do not delete the component file.
8. In `JobDetailModal.tsx`: Add `viewContext?: 'operations' | 'schedule'` to the `JobDetailModalProps` interface.
9. In `JobDetailModal.tsx`: Destructure `viewContext` from props with default `'schedule'`. Add `const isOps = viewContext === 'operations'` as a derived constant for readability.
10. In `JobDetailModal.tsx`: Gate `<SchedulingDispatch>` render with `{!isOps && <SchedulingDispatch ... />}`. Gate all scheduling input fields (scheduledDate, scheduledTime, estimatedHours) with the same `!isOps` condition.
11. In `JobDetailModal.tsx`: Gate the TECH tab in the stakeholder strip with `{!isOps && <tab for TECH />}`. Add a `useEffect` that resets `commStakeholder` to `'REQUESTER'` when `isOps` is true and the current value is `'TECH'`.
12. In `JobDetailModal.tsx`: Implement Operations-mode status transitions. When `isOps`, the available status options are limited to: Needs Review, PTE Required, Awaiting Approval, Ready to Schedule, Archived. Style the "Ready to Schedule" option as the primary/accent action — visually distinct from the others.
13. In `JobDetailModal.tsx`: Remove the `PRIORITY_BADGES` render from the modal header. Do this unconditionally (not just in `isOps` mode). Do not remove the `PRIORITY_BADGES` object definition or the `priority` field from types.
14. In `live/page.tsx`: Add `viewContext="operations"` to the `<JobDetailModal>` render.
15. In `AppSidebar.tsx`: Change the `/live` nav item display label to `"Operations"`. Do not change the href or any other nav items.
16. In `JobQueueTable.tsx` (or wherever the tab strip for the live page is defined): Limit the Operations view tabs to: All, Needs Review, PTE Required, Awaiting Approval. Remove Scheduled, Complete, and In Progress tabs from this view.
17. Run `npx tsc --noEmit`. Fix all type errors before continuing.
18. Start the dev server (`npm run dev`). Open the Operations page. Open a Needs Review job. Visually confirm: no date picker, no time picker, no tech picker, no TECH comms tab visible. Confirm SummaryCards and Field Status panel are gone from the page. Confirm "Ready to Schedule" is visually prominent in the status options.
19. Run `git diff main...HEAD > artifacts/ag_diff.txt`.
20. Write `artifacts/ag_test_results.txt` — one explicit PASS/FAIL/BLOCKED line per success criterion below.
21. Report to Claude Code: one line stating diff is at `artifacts/ag_diff.txt` and test results are at `artifacts/ag_test_results.txt`. Stop.

---

## SUCCESS CRITERIA

AG must confirm each item with explicit browser evidence ("I opened [page], I saw [specific element] was [present/absent]") before marking this sprint complete.

- [ ] Opening a Needs Review job from the Operations page shows NO date picker, NO time picker, NO tech picker
- [ ] The TECH comms tab does NOT appear in Operations view modal
- [ ] TechAvailabilityPanel / Field Status card is NOT visible on the Operations page
- [ ] SummaryCards (Urgent, Needs Action, PTE-Pending, etc.) are NOT visible on the Operations page
- [ ] Nav item label reads "Operations"
- [ ] A job can be moved Needs Review → Ready to Schedule from the Operations modal
- [ ] "Ready to Schedule" action is visually distinct/prominent in the status options
- [ ] Priority badge (URGENT / STANDARD / etc.) does NOT appear in the modal header
- [ ] `npx tsc --noEmit` — zero errors confirmed
- [ ] `git diff main...HEAD --name-only` pasted verbatim in test results
