# ANTIGRAVITY SPRINT — Schedule & Team Page Overhaul
# Priority: HIGH — These are management-facing views that need to look expert-grade.
# Read this entire document before writing a single line of code.

---

## CONTEXT

This sprint covers two pages: Schedule (`src/app/schedule/page.tsx`) and Team (`src/app/team/page.tsx`).

The goal is professional-grade dispatch tooling — the kind that would impress a property management
company evaluating software. Every number must be accurate. Every interaction must be fluid.

**Claude Code has already applied these fixes in this session:**
- `techGrid` variable now declared inside `techs.map` callback — schedule grid renders correctly
- Team page now fetches `getWeekSchedule` on load and shows real `jobsRemaining` counts
- Team page "Deployment Note" section removed

Your work picks up where those fixes left off.

---

## PART 1 — SCHEDULE PAGE REDESIGN

### File: `src/app/schedule/page.tsx`
### File: `src/components/dashboard/SchedulePageComponents.tsx`

---

### 1A — Day Headers: Show Actual Dates

**Current behavior:** Headers say "Monday", "Tuesday", etc. with a date below (e.g., "Apr 28").
**Required:** Keep the date display, ensure it's prominent. Specifically, the format should be:

```
MON        TUE        WED        THU        FRI
Apr 28     Apr 29     Apr 30     May 1      May 2
```

Highlight TODAY's column with a subtle accent border/background so Robert can orient himself instantly.

**Implementation:**
```typescript
// Inside the day header loop in schedule/page.tsx
const isToday = dateStr === new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });

// Apply to the header div:
className={`flex-1 p-4 border-r border-white/5 flex flex-col items-center ... ${
  isToday ? 'bg-[var(--accent)]/5 border-b-2 border-b-[var(--accent)]' : ''
}`}
```

---

### 1B — Time Slots: Vertical Time Axis

**Current behavior:** Each cell is a flat box with no time structure.
**Required:** Each droppable cell should have vertical time slot rows: 8am, 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm (10 slots).

**Implementation approach:**

Replace the current `DroppableScheduleCell` component in `SchedulePageComponents.tsx` with a
time-slotted version. Each slot is its own droppable target.

```typescript
// New DroppableTimeSlot component
export function DroppableTimeSlot({ techName, day, time, jobs, onJobClick }: {
  techName: string;
  day: string;       // "YYYY-MM-DD"
  time: string;      // "08:00", "09:00", etc.
  jobs: Job[];       // jobs scheduled at this time slot for this tech+day
  onJobClick: (job: Job) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${techName}-${day}-${time}`,
    data: { techName, day, time }
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative min-h-[44px] border-b border-white/[0.04] px-2 py-1 transition-colors ${
        isOver ? 'bg-[var(--accent)]/10' : 'hover:bg-white/[0.02]'
      }`}
    >
      {jobs.map(job => <GridJobCard key={job.jobId} job={job} onClick={() => onJobClick(job)} />)}
    </div>
  );
}

// Time labels column (leftmost column, pinned)
const TIME_SLOTS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
const TIME_LABELS = ['8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM'];
```

The outer grid structure becomes:
```
[ Tech Lane Header ] [ Time label col ] [ Mon slots ] [ Tue slots ] [ Wed slots ] [ Thu slots ] [ Fri slots ]
```

Wait — that adds too many columns. Simpler approach: keep the same grid structure (tech × day),
but inside each cell render 10 time-slot rows stacked vertically. The time labels appear in the
tech lane header column (pinned left), aligned with the rows.

```
Tech column (w-48):              Day columns (flex-1 each, min-w-[200px]):
┌─────────────────┐              ┌──────────────────┐ ┌──────────────────┐
│ Salvador Cabrera │  8 AM  ──── │  [slot drop zone] │ │  [slot drop zone] │
│ ████░░░░  6/8h  │  9 AM  ──── │                   │ │  [Job card here]  │
│ This wk: 14 hrs  │  10 AM ──── │  [Job card here]  │ │                   │
└─────────────────┘  ...         └──────────────────┘ └──────────────────┘
```

Implement the time labels as rows INSIDE the tech lane header, aligned with the slot rows.

---

### 1C — Drag-to-Slot: Lock In Specific Time

**Current behavior:** Drag from sidebar → `DurationSelectorModal` opens → user picks duration and
a start time. The time picker exists but confirmation doesn't visually "lock" the job into a slot.

**Required:** After `handleConfirmSchedule` resolves successfully, the job must appear in the
correct time-slot row in the grid. This is already handled by `gridData` (useMemo recomputes after
`setJobs`), but ONLY if `scheduledTime` is set correctly.

Verify that the `handleConfirmSchedule` optimistic update sets `scheduledTime` to the exact string
the time slot uses (e.g., `"08:00"`, not `"8:00 AM"`). The grid matches on `j.scheduledTime`.

If a job is dragged from one grid cell to another (grid-to-grid drag, `sourceType === 'grid'`),
the same `DurationSelectorModal` should open pre-filled with the job's existing duration and the
NEW time slot as the start time.

---

### 1D — Tech Hours: Show Real Scheduled Hours

**Current behavior:** Lane header shows `0.0/8.0 HRS` because `techGrid` was undefined (now fixed).
After the `techGrid` fix, hours should reflect actual scheduled jobs IF `estimatedHours` is set.

**Required additional display:**

Each tech lane should show TWO hour metrics:
1. **Today** — hours committed today (already exists as `todayHours`)
2. **This Week** — total hours across Mon–Fri

```typescript
// Inside techs.map callback, after const techGrid = gridData[tech.techName] || {}:
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
const todayHours = (techGrid[today] || []).reduce((s, j) => s + (Number(j.estimatedHours) || 0), 0);
const weekHours  = weekDates.reduce((sum, d) => 
  sum + (techGrid[d] || []).reduce((s, j) => s + (Number(j.estimatedHours) || 0), 0), 0
);
```

Pass both to `TechLaneHeader`:

```typescript
<TechLaneHeader 
  techName={tech.techName}
  badge={tech.badge}
  todayHours={todayHours}
  weekHours={weekHours}
/>
```

Update `TechLaneHeader` in `SchedulePageComponents.tsx` to accept and render both:

```typescript
export function TechLaneHeader({ techName, badge, todayHours, weekHours }: {
  techName: string;
  badge?: string;
  todayHours: number;
  weekHours: number;
}) {
  const todayOver = todayHours > 8;
  const weekOver  = weekHours > 40;
  return (
    <div className="w-48 shrink-0 border-r border-white/5 p-3 flex flex-col justify-start sticky left-0 bg-[var(--bg-surface)] z-10">
      <div className="font-black text-[11px] text-[var(--text-primary)] leading-tight truncate">{techName}</div>
      {badge && <div className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-0.5">#{badge}</div>}
      <div className="mt-2 space-y-1">
        <div className={`text-[9px] font-black uppercase tracking-widest ${todayOver ? 'text-urgent' : 'text-[var(--text-muted)]'}`}>
          Today: {todayHours.toFixed(1)}/8.0 hrs
        </div>
        <div className={`text-[9px] font-black uppercase tracking-widest ${weekOver ? 'text-urgent' : 'text-standard'}`}>
          Week: {weekHours.toFixed(1)} hrs
        </div>
      </div>
    </div>
  );
}
```

---

### 1E — What to Keep Unchanged

- DndContext, sensors, drag overlay — keep exactly as-is
- `readyToScheduleJobs` sidebar — keep exactly as-is
- `DurationSelectorModal` — keep exactly as-is
- `handleDragEnd`, `handleConfirmSchedule`, `loadData` — keep exactly as-is
- `getWeekSchedule` + `getDispatchData` parallel fetch — keep exactly as-is
- Navigation arrows (ChevronLeft/Right) — keep, but note: week navigation is not yet implemented
  in the backend; leave the buttons visible but non-functional for now (don't add TODO comments)

---

### 1F — Verification (Schedule)

After building:
1. Open `/schedule` — grid renders with 10 time rows per cell
2. Drag a job from sidebar — slot highlights on hover, `DurationSelectorModal` appears
3. Confirm — job card appears in the correct time row of the correct tech/day cell
4. Tech lane headers show today hrs + week hrs (numbers > 0 if any jobs are scheduled)
5. Today's column is visually highlighted
6. `npx tsc --noEmit` — zero errors

---

## PART 2 — TEAM PAGE ENHANCEMENTS

### File: `src/app/team/page.tsx`

---

### 2A — Tech Card: Show Week Job Count

**Current behavior (after Claude Code's fix):** `jobsRemaining` is now populated from
`getWeekSchedule`. The card already renders it in the top-right corner.

**Required:** The label should be "This Week" not "Assigned" to be unambiguous.

Find:
```tsx
<div className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-0.5">Assigned</div>
```
Replace with:
```tsx
<div className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-0.5">This Week</div>
```

---

### 2B — Tech Detail Panel: Show Full Weekly Schedule

**Current behavior:** `openTechDetails` fetches `getWeekSchedule` and shows a flat list of job
cards by date. The `flattened` array loses the date grouping.

**Required:** Group jobs by date. Show each day as a section header with the date, then list jobs
under it. If a day has no jobs, show a subtle "No assignments" row for that day (so management can
see the gap).

```typescript
// Replace the existing flattened schedule display
const weekRes = await dashboardRequest('getWeekSchedule');
if (weekRes.success) {
  const byTech = (weekRes.byTech as Record<string, Record<string, any[]>>) || {};
  const techData = byTech[tech.techName] || {};
  
  // Get the week dates from the response
  const weekStart = weekRes.week?.start;
  const allDates: string[] = [];
  if (weekStart) {
    const cursor = new Date(weekStart + 'T12:00:00');
    for (let i = 0; i < 5; i++) {
      allDates.push(cursor.toISOString().split('T')[0]);
      cursor.setDate(cursor.getDate() + 1);
    }
  }
  
  // Restructure as array of { date, dayLabel, jobs }
  const grouped = allDates.map(d => ({
    date: d,
    dayLabel: new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    jobs: (techData[d] || []).map((j: any) => ({
      date: d,
      time: j.scheduledTime || 'TBD',
      address: j.address || 'Unknown',
      category: j.serviceCategory || j.category || 'Service',
      estimatedHours: Number(j.estimatedHours) || 0,
    }))
  }));
  setTechSchedule(grouped); // Type needs updating — see below
}
```

Update the `JobAssignment` interface at the top of the file:
```typescript
interface DaySchedule {
  date: string;
  dayLabel: string;
  jobs: {
    time: string;
    address: string;
    category: string;
    estimatedHours: number;
  }[];
}
```

Change `techSchedule` state type:
```typescript
const [techSchedule, setTechSchedule] = useState<DaySchedule[]>([]);
```

Render in the panel:
```tsx
{techSchedule.map(day => (
  <div key={day.date}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">{day.dayLabel}</span>
      <span className="text-[9px] font-black text-[var(--accent)]">
        {day.jobs.reduce((s, j) => s + j.estimatedHours, 0).toFixed(1)} hrs
      </span>
    </div>
    {day.jobs.length === 0 ? (
      <div className="mb-3 px-3 py-2 rounded-lg border border-dashed border-white/10 text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest opacity-40">
        No assignments
      </div>
    ) : (
      day.jobs.map((job, idx) => (
        <div key={idx} className="mb-2 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-black text-[var(--accent)] uppercase tracking-tighter">{job.time}</span>
            <span className="text-[8px] font-black text-[var(--text-muted)] uppercase">{job.estimatedHours}h · {job.category}</span>
          </div>
          <p className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">{job.address}</p>
        </div>
      ))
    )}
  </div>
))}
```

---

### 2C — What to Keep Unchanged

- The `Promise.all([getTechList, getLiveFieldStatus, getWeekSchedule])` fetch Claude Code added
- The `weekJobMap` computation and `jobsRemaining` mapping Claude Code added
- The tech card grid layout and animations
- The slide-in panel overlay
- The "Weekly Summary" stats section Claude Code added (replacing the removed Deployment Note)
- All status badge logic (ON JOB / ON BREAK / UNSCHEDULED)

---

### 2D — Verification (Team)

1. Open `/team` — all 28 techs render with real names
2. Tech cards show a number > 0 in "This Week" if that tech has scheduled jobs
3. Click a tech card → panel slides in → shows Mon-Fri rows, each with jobs or "No assignments"
4. Each day row shows total hours for that day
5. `npx tsc --noEmit` — zero errors

---

## PART 3 — COORDINATION SCREEN (Cosmetic Fixes Only)

### File: `src/app/live/page.tsx` and `src/components/dashboard/SummaryCards.tsx`

**Claude Code already fixed the `needsActionCount` logic.** No further stat logic changes are
needed. The counts will now show correctly after the Vercel deploy.

**One label tweak required:**

In `SummaryCards.tsx`, find the "Needs Action" card and update its sub-label so it's clear what
it counts:

Find:
```tsx
label: "Needs Action",
```
The sub-label (below the number) should read: "New + PTE + Pending Approval"

Look for the sub-label text near the card definition and update it. If there is no sub-label,
add one:
```tsx
<div className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-wider mt-0.5 opacity-60">
  Needs Coordination
</div>
```

---

## DEPLOYMENT

After completing ALL of the above:

```bash
cd tech-pwa
npx tsc --noEmit
# Must show zero errors before proceeding

git add -A
git commit -m "feat: schedule time slots, tech weekly hours, team page job grouping"
git push origin main
# Vercel auto-deploys from main
```

Do NOT deploy until TypeScript is clean.

---

## WHAT NOT TO DO

- Do not add mock data or hardcoded job arrays to any of these pages
- Do not change the DnD library, sensors, or collision detection
- Do not add new API calls beyond `getTechList`, `getLiveFieldStatus`, `getWeekSchedule`, `getDispatchData`
- Do not touch `dashboard-api.ts`, `types.ts`, `DashboardLayout.tsx`, `JobDetailModal.tsx`, or `JobQueueTable.tsx`
- Do not move, rename, or delete any `.gs`, `.js`, or `.html` files at the repo root

---

*Spec written by Claude Code (claude-sonnet-4-6) — April 23, 2026*
*Supersedes any prior schedule/team guidance in ANTIGRAVITY_LOG.md*
