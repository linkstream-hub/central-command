# ANTIGRAVITY SPRINT — Schedule Integrity
**Author:** Claude Code
**Date:** April 26, 2026
**Theme:** Make scheduling operations self-enforcing — prevent Robert from accidentally scheduling a tech who is on approved leave or already fully booked, and close the UX gaps left from the last polish sprint.

**Files touched:**
- `dashboard-api/DashboardAPI.gs` — update `getTechAvailabilityWeekDA`
- `tech-pwa/src/app/schedule/page.tsx` — fetch availability data, pass to SchedulingDispatch
- `tech-pwa/src/app/live/page.tsx` — pass `onSave` callback to JobDetailModal
- `tech-pwa/src/components/dashboard/SchedulingDispatch.tsx` — OUT cells, capacity guard
- `tech-pwa/src/components/dashboard/JobDetailModal.tsx` — accept and fire `onSave` prop
- `tech-pwa/src/components/dashboard/JobQueueTable.tsx` — Mark Ready optimistic state update
- `tech-pwa/src/lib/dashboard-api.ts` — add `getTechAvailability` request type

**No other files. Do not touch Code.js, TechPWA.gs, or any other component.**

---

## FEATURE 1 — OUT Cells for Approved Time Off on the Schedule Grid

### What it does
When Robert opens the Schedule page, any tech who has approved leave on a given date shows that cell as a non-droppable "OUT" block. He cannot accidentally schedule them for that day.

### Backend — `getTechAvailabilityWeekDA` in `dashboard-api/DashboardAPI.gs`

This function already exists (registered at `action === 'getTechAvailability'`). Update it to read approved leave from the TOM sheet and return a map of tech name → blocked dates.

**TOM sheet constants (already defined in DashboardAPI.gs):**
```javascript
var TOM_SHEET_ID_DA = '1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk';
```

The TimeOffRequests tab has these columns (0-indexed):
- Col 0: Request ID
- Col 1: Employee ID (badge number)
- Col 2: Employee Name
- Col 3: Request Type (sick / vacation / personal)
- Col 4: Start Date (YYYY-MM-DD)
- Col 5: End Date (YYYY-MM-DD)
- Col 6: Status (Pending / Approved / Denied / Cancelled)
- Col 7: Notes
- Col 8: Submitted At
- Col 9: Reviewed By
- Col 10: Reviewed At
- Col 11: Denial Reason

**Replace the body of `getTechAvailabilityWeekDA` with this logic:**

```javascript
function getTechAvailabilityWeekDA(weekStart) {
  try {
    // Build the 5 weekday dates for the requested week
    var weekDates = [];
    var cursor = new Date((weekStart || new Date().toISOString().slice(0,10)) + 'T12:00:00');
    while (weekDates.length < 5) {
      var dow = cursor.getDay();
      if (dow !== 0 && dow !== 6) {
        weekDates.push(Utilities.formatDate(cursor, 'America/Los_Angeles', 'yyyy-MM-dd'));
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    var rangeStart = weekDates[0];
    var rangeEnd   = weekDates[weekDates.length - 1];

    // Read TimeOffRequests from TOM sheet
    var tomSS    = SpreadsheetApp.openById(TOM_SHEET_ID_DA);
    var torSheet = tomSS.getSheetByName('TimeOffRequests');
    if (!torSheet || torSheet.getLastRow() < 2) {
      return { success: true, outDates: {} };
    }

    var rows = torSheet.getDataRange().getValues().slice(1);
    // outDates: { "Tech Name": ["2026-04-28", "2026-04-29", ...] }
    var outDates = {};

    rows.forEach(function(row) {
      var status    = String(row[6] || '').trim();
      if (status !== 'Approved') return;

      var empName   = String(row[2] || '').trim();
      var startDate = String(row[4] || '').trim().slice(0, 10);
      var endDate   = String(row[5] || '').trim().slice(0, 10);

      if (!empName || !startDate || !endDate) return;
      // Check overlap with the week window
      if (endDate < rangeStart || startDate > rangeEnd) return;

      // Enumerate each date in the leave range that falls in the week
      weekDates.forEach(function(d) {
        if (d >= startDate && d <= endDate) {
          if (!outDates[empName]) outDates[empName] = [];
          if (outDates[empName].indexOf(d) === -1) outDates[empName].push(d);
        }
      });
    });

    return { success: true, outDates: outDates };
  } catch(e) {
    Logger.log('getTechAvailabilityWeekDA error: ' + e.message);
    return { success: false, error: e.message, outDates: {} };
  }
}
```

### Frontend — `dashboard-api.ts`

Add the request/response types:

```typescript
// Add to the existing dashboardRequest overloads or action type union:
export async function getTechAvailability(weekStart: string): Promise<{ outDates: Record<string, string[]> }> {
  const res = await dashboardRequest('getTechAvailability', { weekStart });
  return { outDates: res.outDates ?? {} };
}
```

### Frontend — `schedule/page.tsx`

Fetch availability alongside `getWeekSchedule`. Add state:

```typescript
const [outDates, setOutDates] = useState<Record<string, string[]>>({});
```

In the data-loading function (wherever `getWeekSchedule` is called), add in parallel:

```typescript
const [scheduleRes, availRes] = await Promise.all([
  dashboardRequest('getWeekSchedule', { weekStart: currentWeekStart }),
  dashboardRequest('getTechAvailability', { weekStart: currentWeekStart }),
]);
if (scheduleRes.success) setScheduleData(scheduleRes);
if (availRes.success) setOutDates(availRes.outDates ?? {});
```

Pass `outDates` to `SchedulingDispatch`:

```tsx
<SchedulingDispatch
  scheduleData={scheduleData}
  outDates={outDates}          // ADD THIS
  onJobUpdate={handleJobUpdate}
  // ... existing props unchanged
/>
```

### Frontend — `SchedulingDispatch.tsx`

**Update the props interface:**

```typescript
interface SchedulingDispatchProps {
  // ... existing props ...
  outDates?: Record<string, string[]>;  // ADD
}
```

**In `DroppableScheduleCell` (or wherever cells are rendered), check for OUT status before rendering a droppable target:**

Find where a cell is rendered for a specific `techName` + `date`. Add this check:

```typescript
const isOut = outDates?.[techName]?.includes(date) ?? false;
```

If `isOut` is true, render the cell as a non-interactive OUT block instead of a droppable:

```tsx
{isOut ? (
  <div className="h-full min-h-[60px] flex items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 cursor-not-allowed">
    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">OUT</span>
  </div>
) : (
  // existing DroppableScheduleCell JSX — unchanged
)}
```

The OUT cell must NOT be a drop target. Ensure it has no `useDroppable` hook or DnD event handlers.

---

## FEATURE 2 — Daily Capacity Warning in DurationSelectorModal

### What it does
When Robert drops a job onto a tech who already has jobs on that day, a warning appears in the `DurationSelectorModal` showing current committed hours so he can make an informed decision. This is a warning, not a hard block.

### Where the data is
`byTech[techName][date]` is an array of jobs already scheduled. Each job has an `estimatedHours` field. Sum them.

### In `SchedulingDispatch.tsx`, pass existing daily load to `DurationSelectorModal`

Find where `DurationSelectorModal` is opened (on drop). Calculate:

```typescript
const existingJobs = scheduleData?.byTech?.[droppedTechName]?.[droppedDate] ?? [];
const existingHours = existingJobs.reduce((sum: number, j: Job) => sum + (j.estimatedHours ?? 0), 0);
```

Pass to the modal:

```tsx
<DurationSelectorModal
  existingDailyHours={existingHours}  // ADD
  existingJobCount={existingJobs.length}  // ADD
  // ... all existing props unchanged ...
/>
```

### In `DurationSelectorModal`

Add props:

```typescript
interface DurationSelectorModalProps {
  // ... existing ...
  existingDailyHours?: number;
  existingJobCount?: number;
}
```

Render a warning below the duration selector when `existingHours > 0`:

```tsx
{(existingDailyHours ?? 0) > 0 && (
  <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mt-3">
    <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
    <p className="text-[10px] font-bold text-amber-400 leading-snug">
      {existingJobCount} existing job{existingJobCount !== 1 ? 's' : ''} on this day
      · {existingDailyHours}h already committed. Verify capacity before confirming.
    </p>
  </div>
)}
```

At >8h total (existing + selected duration), escalate the warning to red:

```tsx
const totalHours = (existingDailyHours ?? 0) + selectedDuration;
// Use bg-red-500/10 border-red-500/20 text-red-400 when totalHours > 8
```

---

## FEATURE 3 — Mark Ready Optimistic State Update

### The gap
Clicking "Mark Ready" fires the API call but the job stays visible until a manual page refresh. Fix: after the API call succeeds, remove the job from the local `jobs` state if the current tab is NEW.

### In `JobQueueTable.tsx`

The component already receives `jobs: Job[]` as a prop. It needs a way to notify the parent that a job's status changed. Add a new optional prop:

```typescript
interface JobQueueTableProps {
  // ... existing props ...
  onJobStatusChange?: (jobId: string, newStatus: string) => void;  // ADD
}
```

In the Mark Ready button's onClick, after the `await dashboardRequest(...)` call succeeds, fire the callback:

```typescript
onClick={async (e) => {
  e.stopPropagation();
  const res = await dashboardRequest('updateJob', { job: { ...jobPayload, status: 'Ready to Schedule' } });
  if (res?.success !== false) {
    onJobStatusChange?.(job.jobId, 'Ready to Schedule');
  }
}}
```

### In `live/page.tsx`

Pass the handler to `JobQueueTable`:

```tsx
<JobQueueTable
  jobs={jobs}
  onJobStatusChange={(jobId, newStatus) => {
    setJobs(prev => prev.map(j => j.jobId === jobId ? { ...j, status: newStatus as JobStatus } : j));
  }}
  // ... existing props unchanged ...
/>
```

---

## FEATURE 4 — Queue Refresh After Modal Save

### The gap
After Robert saves changes in `JobDetailModal`, the queue still shows the old data until a manual refresh. Fix: modal fires an `onSave` callback, parent reloads jobs.

### In `JobDetailModal.tsx`

Add to the props interface:

```typescript
interface JobDetailModalProps {
  // ... existing props ...
  onSave?: () => void;  // ADD
}
```

Find the save handler (the function that calls `dashboardRequest('updateJob', ...)`). After a successful save, call:

```typescript
onSave?.();
```

### In `live/page.tsx`

Pass the callback:

```tsx
<JobDetailModal
  job={selectedJob}
  onClose={() => setSelectedJob(null)}
  onSave={() => loadLiveData()}    // ADD — triggers full job + tech refresh
  // ... existing props unchanged ...
/>
```

---

## WHAT TO KEEP UNCHANGED

- All existing DnD logic in `SchedulingDispatch.tsx` — only add the OUT check and capacity warning
- All existing modal phases (COORDINATION, DISPATCH, EXECUTION, POST-JOB)
- All existing tab/filter/sort logic in `JobQueueTable.tsx`
- `TechPWA.gs` — do not touch
- `Code.js` — do not touch
- All other components not listed above

---

## DEPLOYMENT

After frontend changes: `npx tsc --noEmit` must pass with zero errors.

After DashboardAPI.gs changes:
```
cd dashboard-api && clasp push --force
clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v26 — tech availability OUT cells + capacity guard"
```

---

## VERIFICATION

Write results to `AG_DONE.md` with these grep commands:

1. OUT cell render check:
   `grep -n "isOut" tech-pwa/src/components/dashboard/SchedulingDispatch.tsx`

2. Capacity warning in modal:
   `grep -n "existingDailyHours" tech-pwa/src/components/dashboard/SchedulingDispatch.tsx`
   `grep -n "existingDailyHours" tech-pwa/src/components/dashboard/JobDetailModal.tsx`

3. Mark Ready optimistic update:
   `grep -n "onJobStatusChange" tech-pwa/src/components/dashboard/JobQueueTable.tsx`

4. Modal save callback:
   `grep -n "onSave" tech-pwa/src/components/dashboard/JobDetailModal.tsx`
   `grep -n "onSave" tech-pwa/src/app/live/page.tsx`

5. getTechAvailabilityWeekDA updated:
   `grep -n "outDates" dashboard-api/DashboardAPI.gs`

6. TypeScript clean:
   `npx tsc --noEmit` — zero errors

---

*Generated: April 26, 2026 | APT Central Command — Session 25*
*Next after this sprint: CA Break Compliance → Flowise architecture (Claude Code decides), then Time Off Manager Phase 2 backend (Calendar blocking on approval).*
