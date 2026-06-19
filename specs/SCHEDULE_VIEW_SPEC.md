# SPEC — SCHEDULE VIEW RESTRUCTURE (Scheduling & Assignment)
**Status:** Ready for AG implementation
**Sprint type:** UI restructure + tech picker redesign
**Branch:** `feat/schedule-view`
**Prerequisite:** `feat/operations-view` must be merged first — this spec depends on the `viewContext` prop added to `JobDetailModal` in Sprint 1.

**Target files:**
- `tech-pwa/src/app/schedule/page.tsx`
- `tech-pwa/src/components/dashboard/SchedulingDispatch.tsx`
- `tech-pwa/src/components/dashboard/JobDetailModal.tsx`
- `tech-pwa/src/app/team/page.tsx` (read-side fix only)
- `tech-pwa/src/app/weekly-schedule/page.tsx` (read-side fix only)

---

## OBJECTIVE

Make the `/schedule` page the single authoritative home for all **Scheduling & Assignment (SnA)** work:

1. Add Field Status card (moved from Operations view — it belongs with dispatch when assigning techs)
2. Add an RtS backlog panel showing unscheduled Ready-to-Schedule jobs
3. Redesign the tech picker: ranked dropdown, First Last names, Suggested Techs at top
4. Enforce a canonical SnA write format that eliminates all downstream name-transformation bugs
5. Ensure rescheduling of already-Scheduled jobs is always possible from this view

This sprint does NOT add new API endpoints. It uses existing `suggestTechsDA`, `getLiveFieldStatus`, `getDispatchData`, and `updateJobDA` actions already present in DashboardAPI.gs.

---

## CONSTRAINT — CONTRADICTION DETECTOR

Before the first commit, read each target file and verify these literals exist. Flag mismatches to Claude Code.

| Literal | Expected file |
|---|---|
| `TechAvailabilityPanel` component file exists | `src/components/dashboard/TechAvailabilityPanel.tsx` |
| `suggestTechsDA` or `suggestTechs` action string | `src/lib/dashboard-api.ts` |
| `formatTechName` function | `src/components/dashboard/JobDetailModal.tsx` |
| `SchedulingDispatch` component | `src/components/dashboard/SchedulingDispatch.tsx` |
| `viewContext` prop on `JobDetailModalProps` | `src/components/dashboard/JobDetailModal.tsx` (added in Sprint 1) |
| `status === 'Ready to Schedule'` filtering | `src/app/schedule/page.tsx` (confirm how RtS jobs are currently handled) |
| `assignedTech` split logic | `src/app/team/page.tsx` and `src/app/weekly-schedule/page.tsx` — note the current separator and transformation logic |

---

## CHANGE 1 — Add Field Status (TechAvailabilityPanel) to `schedule/page.tsx`

Import `TechAvailabilityPanel` from `@/components/dashboard/TechAvailabilityPanel`.

Add `getLiveFieldStatus` to the schedule page's data load (parallel with the existing `getWeekSchedule` call). Store result in `activeTechs` state.

Render `<TechAvailabilityPanel techs={activeTechs}>` in the schedule page layout. Position it as a sidebar or below-the-fold panel — visible to dispatch when assigning techs so they can see current field capacity.

Refresh `activeTechs` on the same interval as the existing schedule refresh (or every 60 seconds if no existing interval). Dispatch is actively assigning here and needs current field state.

---

## CHANGE 2 — RtS Backlog Panel in `schedule/page.tsx`

Add a panel showing all jobs where `status === 'Ready to Schedule'` and `scheduledDate` is empty or null. Source: the existing `getDispatchData` call already fetches all jobs — filter client-side, do not add a new API call.

**Panel layout:**
- Title: "Ready to Schedule" with a count badge
- Scrollable list of job cards
- Each card shows: address + unit, service category, incoming date (timestamp field as proxy for how long it's been waiting), access info note if non-empty
- Cards are draggable to the calendar grid (integrate with existing DnD context)
- Cards are also clickable to open the assignment modal directly (same as clicking a calendar cell)

**Panel position:** Left sidebar alongside the calendar grid, or above the grid on narrow viewports. This must not obscure the calendar — the panel and calendar should coexist at full width.

If the panel is empty (no RtS jobs): show a single empty-state line ("No jobs awaiting scheduling").

---

## CHANGE 3 — Tech picker redesign in `SchedulingDispatch.tsx`

Replace the current tech picker UI with a **multi-select dropdown**.

Read `SchedulingDispatch.tsx` in full before making any changes — understand the current component's props, state, and how it communicates selection back to the parent.

### Dropdown structure (top to bottom):

```
┌─────────────────────────────────────────────────────┐
│ ★ SUGGESTED                                         │
│   ☐ Salvador Cabrera    87 pts  Plumbing ×4, this address ×2  │
│   ☐ Miguel Rodriguez    71 pts  Plumbing ×6                   │
│   ☐ Jose Contreras      58 pts  Available today              │
├─────────────────────────────────────────────────────┤
│ ALL TECHS                                           │
│   ☐ Carlos Cabrera                                  │
│   ☐ David Cervantes                                 │
│   ☐ (remaining active techs, alphabetical)         │
└─────────────────────────────────────────────────────┘
```

### Behavior rules:

- **Names:** All names in First Last format. Apply `formatTechName()` (already defined in `JobDetailModal.tsx`) to every name before rendering. Copy or import this function — do not duplicate it as a second implementation. Single source of truth.
- **Multi-select:** Clicking a name toggles its checkbox. Dropdown stays open after selection. Close on outside click or explicit close button.
- **Selected display:** Above the dropdown trigger, render a row of removable chips — one per selected tech — showing First Last name. Clicking the × on a chip deselects that tech.
- **Suggested section:** Shows up to 3 results from `suggestTechsDA`. Each row shows: name, score (e.g., "87 pts"), and the top 1 reason from the `reasons[]` array. If loading: show 3 skeleton rows in the Suggested section.
- **At-capacity warning:** If a tech has `availableToday: false` (4+ jobs), show a ⚠ icon next to their name but do NOT hide them. Dispatch may deliberately assign an at-capacity tech.
- **No suggestions:** If `suggestTechsDA` returns empty or errors, hide the Suggested section entirely. Show All Techs only.
- **Trainees:** Apply existing trainee warning logic — if a trainee is selected without a supervisor, surface the existing warning message.

### Suggested Techs API call:

Fire `suggestTechsDA` (verify exact action name in `dashboard-api.ts`) when the dropdown first opens. Pass:
```
{ serviceCategory: job.serviceCategory, address: job.address, proposedDate: selectedDate }
```
The call is non-blocking — render All Techs immediately while Suggested loads. If the job has no `serviceCategory`, pass `"General Repair"` as fallback.

---

## CHANGE 4 — Canonical SnA write format (CRITICAL)

This is the highest-impact change in this sprint. Every downstream bug involving tech names traces to inconsistent write format. This change fixes the root cause.

When dispatch saves an assignment via `updateJobDA`, the `assignedTech` field written to the sheet must conform to this exact format:

**Single tech:**
```
"Salvador Cabrera"
```
- First Last, one space, no badge suffix (no `#101`), no comma, no extra whitespace
- Apply `formatTechName()` to the selected tech name immediately before writing

**Multi-tech:**
```
"Salvador Cabrera; Miguel Rodriguez"
```
- Each name in First Last format
- Separated by `"; "` — semicolon then one space
- No commas between names (commas are reserved for Last, First disambiguation in raw data)
- Apply `formatTechName()` to each name individually, then join with `"; "`

### Downstream read normalization:

After writing in the canonical format, verify and fix these three downstream readers so they only split on `;` (semicolons):

**`team/page.tsx`:** Find where `assignedTech` is split to determine which jobs belong to a tech. Ensure the split uses `';'` as the separator. Apply `formatTechName()` to each segment after split. Remove any comma-split fallback.

**`weekly-schedule/page.tsx`:** Same — find the assignedTech split, ensure semicolons only. Apply `formatTechName()` to each segment. Remove comma-split fallback.

**`schedule/page.tsx` gridData:** Verify the calendar grid renders tech names correctly from the canonical format.

Do NOT add `','` as a fallback separator in any of these readers. Once canonical format is enforced at write time, comma-fallback in readers just hides future bugs.

---

## CHANGE 5 — `viewContext="schedule"` on JobDetailModal in `schedule/page.tsx`

When `schedule/page.tsx` opens `<JobDetailModal>`, pass `viewContext="schedule"`.

In `JobDetailModal.tsx`, when `viewContext === 'schedule'` (or when `viewContext` is omitted — default):

**SHOW:**
- `<SchedulingDispatch>` tech picker with the new dropdown design
- scheduledDate, scheduledTime, estimatedHours fields — all editable
- TECH comms tab in the stakeholder strip
- Triage fields (access info, PTE status, notes) — visible but **read-only**. Render them as display text, not editable inputs. Dispatch needs this context when assigning but should not be editing triage data from the Schedule view.

**Status transitions available in Schedule mode:**
| Current status | Available transitions |
|---|---|
| Ready to Schedule | Scheduled (primary — saving with a date/tech auto-sets this) |
| Scheduled | Needs Review (deschedule — sends job back to Operations), In Progress (manual override) |
| In Progress | Complete (manual override) |

---

## CHANGE 6 — Rescheduling is always editable

Any job with `status === 'Scheduled'` on the calendar grid must be:
- **Draggable** to a new calendar slot (verify existing DnD flow handles this — do not break it)
- **Clickable** to open `JobDetailModal` with `viewContext="schedule"`, where date, time, and tech are all editable
- On save: `updateJobDA` fires with new date/time/tech in canonical format

There is no "locked" state. Dispatch can always reschedule a job from this view. If the current DnD implementation has any guard that prevents moving already-Scheduled jobs, remove that guard.

---

## DO NOT TOUCH

- `tech-pwa/src/app/live/page.tsx` — completed in Sprint 1; do not re-open
- `dashboard-api/DashboardAPI.gs` — `suggestTechsDA` backend is correct; frontend is the change
- `tech-pwa/src/lib/schema.ts` — no schema changes
- `TechPWA.gs` — no backend changes
- The `JobDetailModal.tsx` `phase` variable — do not modify the existing phase logic; `viewContext` is a separate prop

---

## TASK LIST — EXECUTE IN ORDER

Complete each task fully before moving to the next. Do not skip ahead. Do not batch tasks.

1. Read `tech-pwa/src/app/schedule/page.tsx` in full.
2. Read `tech-pwa/src/components/dashboard/SchedulingDispatch.tsx` in full.
3. Read `tech-pwa/src/components/dashboard/JobDetailModal.tsx` in full — confirm `viewContext` prop and `formatTechName` function exist from Sprint 1. If either is missing, stop and report to Claude Code.
4. Read `tech-pwa/src/components/dashboard/TechAvailabilityPanel.tsx` in full.
5. Read `tech-pwa/src/lib/dashboard-api.ts` — find and record the exact action string for the tech suggestions call (likely `suggestTechsDA` or `suggestTechs`).
6. Read `tech-pwa/src/app/team/page.tsx` — find and record the exact line(s) where `assignedTech` is split (note the separator character used).
7. Read `tech-pwa/src/app/weekly-schedule/page.tsx` — same as above.
8. Run the contradiction detector: verify every literal in the CONSTRAINT table exists. Flag any mismatch to Claude Code before proceeding.
9. In `schedule/page.tsx`: Import `TechAvailabilityPanel`. Add `activeTechs` state. Add `getLiveFieldStatus` to the data load (parallel with existing calls). Render `<TechAvailabilityPanel techs={activeTechs} />` in the page layout. Set up a 60-second refresh interval for `activeTechs` matching the existing schedule refresh pattern.
10. In `schedule/page.tsx`: Add the RtS backlog panel. Filter the existing `jobs` state for `status === 'Ready to Schedule'` and empty `scheduledDate`. Render a scrollable panel of job cards showing: address + unit, service category, timestamp/age, and access info if present. Wire each card to be draggable into the existing DnD context and clickable to open the assignment modal.
11. In `SchedulingDispatch.tsx`: Redesign the tech picker as a multi-select dropdown. Structure: Suggested section (up to 3 entries, skeleton while loading) at top, separator, All Techs section (full active roster, alphabetical) below. Apply `formatTechName()` — imported or copied from `JobDetailModal.tsx` — to every name before rendering. Use checkboxes for multi-select. Clicking a name toggles selection without closing the dropdown. Close on outside click. Render selected techs as removable chips above the trigger button.
12. In `SchedulingDispatch.tsx`: Wire the Suggested Techs API call. When the dropdown opens, fire a request using the action string found in Task 5 with payload `{ serviceCategory, address, proposedDate }`. Show skeleton rows while loading. On success, populate the Suggested section. On error or empty result, hide the Suggested section header and show All Techs only. Techs with `availableToday: false` get a ⚠ icon but are not hidden or disabled.
13. In the `updateJobDA` write path (in `SchedulingDispatch.tsx` or wherever the save action is composed): Enforce canonical write format. Apply `formatTechName()` to each selected tech name. For single tech: write the plain First Last string. For multiple techs: join with `"; "` (semicolon + one space). Never use commas between tech names.
14. In `schedule/page.tsx`: Pass `viewContext="schedule"` to all `<JobDetailModal>` renders on this page.
15. In `JobDetailModal.tsx`: Implement Schedule-mode behavior (when `viewContext === 'schedule'` or default): show `<SchedulingDispatch>` with new dropdown, show scheduling fields, show TECH comms tab, render triage fields (access info, PTE status, notes) as read-only display text (not editable inputs). Implement Schedule-mode status transitions per the CHANGE 5 table.
16. In `schedule/page.tsx`: Verify Scheduled jobs on the calendar grid are draggable to new slots. If any DnD guard blocks moving already-Scheduled jobs, remove that guard. Scheduled jobs must be always-moveable.
17. In `team/page.tsx`: Update the `assignedTech` split to use `';'` as the only separator. Apply `formatTechName()` to each segment after splitting. Remove any `','` comma-split fallback.
18. In `weekly-schedule/page.tsx`: Same fix as Task 17 — `';'` separator only, `formatTechName()` on each segment, remove comma fallback.
19. Run `npx tsc --noEmit`. Fix all type errors before continuing.
20. Start dev server. Open the Schedule page. Confirm: TechAvailabilityPanel visible, RtS backlog panel visible with correct jobs, tech picker dropdown opens with Suggested and All Techs sections, all names in First Last format.
21. Make a test assignment: select two techs, set a date and time, save. Then read the corresponding row in the Dispatch Queue sheet directly and paste the exact value of the assignedTech cell into the test results. It must be `"First Last; First Last"` format.
22. Open the Team view and Weekly Schedule — confirm the assigned tech name appears correctly after the test assignment from Task 21.
23. Test rescheduling: drag a Scheduled job to a new calendar slot. Confirm it moves without error. Then open it and change the tech — confirm save works.
24. Run `git diff main...HEAD > artifacts/ag_diff.txt`.
25. Write `artifacts/ag_test_results.txt` — one explicit PASS/FAIL/BLOCKED line per success criterion below, plus the raw assignedTech cell value from Task 21.
26. Report to Claude Code: one line stating diff is at `artifacts/ag_diff.txt` and test results are at `artifacts/ag_test_results.txt`. Stop.

---

## SUCCESS CRITERIA

AG must confirm each item with explicit evidence ("I opened [page], I saw [X]") before this sprint is complete.

- [ ] Tech picker dropdown shows Suggested Techs section with name, score, and reason text
- [ ] All tech names in the dropdown are First Last format (not "Last, First" and not "Last, First #badge")
- [ ] Multi-selecting two techs and saving produces `"First Last; First Last"` in the sheet — verify by reading the sheet row directly, not by inspecting UI
- [ ] Team view (`/team`) correctly shows assigned tech name after an SnA write from the Schedule view
- [ ] Weekly schedule (`/weekly-schedule`) correctly places the job on the right tech's row after an SnA write
- [ ] Field Status card is visible on the Schedule page
- [ ] RtS backlog panel appears and shows jobs with `status === 'Ready to Schedule'` and no scheduled date
- [ ] A Scheduled job can be dragged to a new calendar slot without error
- [ ] A Scheduled job can have its tech changed from the modal without error
- [ ] Triage fields (access info, PTE status) are visible but not editable in Schedule view modal
- [ ] TECH comms tab appears in Schedule view modal and does NOT appear in Operations view modal
- [ ] `npx tsc --noEmit` — zero errors confirmed
- [ ] `git diff main...HEAD --name-only` pasted verbatim
