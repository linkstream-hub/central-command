# ANTIGRAVITY SPRINT — WEEK NAVIGATION (Schedule + Weekly Schedule)
# Owner: Claude Code | Executor: Antigravity
# Date: April 23, 2026
# Files:
#   tech-pwa/src/app/weekly-schedule/page.tsx
#   tech-pwa/src/app/schedule/page.tsx
#   tech-pwa/src/components/dashboard/SchedulePageComponents.tsx

---

## GOAL

Both the Schedule (read-only weekly view) and Ready to Schedule (DnD grid) views
need week navigation — prev/next arrows, a "Today" button, and free navigation
forward months ahead.

---

# PART A — weekly-schedule/page.tsx (read-only view)

## Step A1 — Update getWeekDates to accept offset

```ts
// REPLACE the existing getWeekDates() with:
function getWeekDates(weekOffset: number = 0): string[] {
  const laFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' });
  const todayStr = laFmt.format(new Date());
  const [yr, mo, dy] = todayStr.split('-').map(Number);
  const cursor = new Date(yr, mo - 1, dy);
  const dow = cursor.getDay();
  const toMonday = dow === 0 ? -6 : 1 - dow;
  cursor.setDate(cursor.getDate() + toMonday + (weekOffset * 7));

  const dates: string[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + i);
    dates.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    );
  }
  return dates;
}
```

## Step A2 — Add weekOffset state, update weekDates and useEffect

```ts
// ADD after existing useState declarations:
const [weekOffset, setWeekOffset] = useState(0);

// CHANGE:
// REMOVE: const weekDates = useMemo(() => getWeekDates(), []);
// ADD:
const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);

// CHANGE useEffect to re-fetch on weekOffset change:
// REMOVE the existing useEffect that calls dashboardRequest('getWeekSchedule')
// ADD:
useEffect(() => {
  setLoading(true);
  setJobs([]);
  dashboardRequest('getWeekSchedule', { weekStart: weekDates[0] }).then(res => {
    if (res.success) {
      const flattenedJobs: Job[] = [];
      if (res.byTech) {
        Object.values(res.byTech).forEach((dateMap: any) => {
          Object.values(dateMap).forEach((jobArr: any) => {
            flattenedJobs.push(...jobArr);
          });
        });
      }
      if (res.unassigned) flattenedJobs.push(...res.unassigned);
      setJobs(flattenedJobs);
    }
    setLoading(false);
  });
}, [weekDates[0]]);
```

## Step A3 — Replace header with navigation UI

```tsx
{/* Header */}
<div className="flex items-center justify-between shrink-0">
  <div>
    <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">
      WEEKLY <span className="text-[var(--accent)]">SCHEDULE</span>
    </h2>
    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
      {weekRange ? `Week of ${weekRange}` : 'Loading...'}
    </p>
  </div>
  <div className="flex items-center gap-2">
    {weekOffset !== 0 && (
      <button
        onClick={() => setWeekOffset(0)}
        className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border border-[var(--accent)]/30 text-[var(--accent)] rounded-full hover:bg-[var(--accent)]/10 transition-all"
      >
        Today
      </button>
    )}
    <button
      onClick={() => setWeekOffset(w => w - 1)}
      className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-white/20 transition-all"
    >
      <ChevronLeft size={14} />
    </button>
    <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest min-w-[60px] text-center">
      {weekOffset === 0 ? 'This Week' : weekOffset > 0 ? `+${weekOffset}w` : `${weekOffset}w`}
    </span>
    <button
      onClick={() => setWeekOffset(w => w + 1)}
      className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-white/20 transition-all"
    >
      <ChevronRight size={14} />
    </button>
  </div>
</div>
```

Add `ChevronLeft, ChevronRight` to the lucide-react import at the top of the file.
Remove `CalendarIcon` from the import if it's no longer used after this change.

---

# PART B — schedule/page.tsx (DnD Ready to Schedule grid)

## Step B1 — Add weekOffset state

```ts
// ADD after existing useState declarations:
const [weekOffset, setWeekOffset] = useState(0);
```

## Step B2 — Replace the date-building logic in loadData

The current `loadData` builds a rolling 5-day window (today + 4 working days).
Replace the date section to use Mon-Fri when navigating, rolling window for current week:

```ts
// REMOVE this entire block inside loadData:
const laDate  = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' });
const laDay   = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short' });
const dates: string[] = [];
const cursor = new Date();
while (dates.length < 5) {
  const dayName = laDay.format(cursor);
  if (dayName !== 'Sat' && dayName !== 'Sun') {
    dates.push(laDate.format(cursor));
  }
  cursor.setDate(cursor.getDate() + 1);
}
setWeekDates(dates);

const fmtLabel = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
setWeekRange(`${fmtLabel(dates[0])} — ${fmtLabel(dates[4])}`);

// ADD this replacement (extract into helper above the component):
```

Add this helper function above the `SchedulePage` component definition:

```ts
function getScheduleWeekDates(weekOffset: number): string[] {
  const laFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' });
  const todayStr = laFmt.format(new Date());
  const [yr, mo, dy] = todayStr.split('-').map(Number);

  if (weekOffset === 0) {
    // Current week: rolling window — today + next 4 working days
    const laDay = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short' });
    const dates: string[] = [];
    const cursor = new Date(yr, mo - 1, dy);
    while (dates.length < 5) {
      const dayName = laDay.format(cursor);
      if (dayName !== 'Sat' && dayName !== 'Sun') {
        dates.push(laFmt.format(cursor));
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
  }

  // Other weeks: Mon-Fri of that offset week
  const cursor = new Date(yr, mo - 1, dy);
  const dow = cursor.getDay();
  const toMonday = dow === 0 ? -6 : 1 - dow;
  cursor.setDate(cursor.getDate() + toMonday + (weekOffset * 7));
  const dates: string[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + i);
    dates.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    );
  }
  return dates;
}
```

Then inside `loadData`, replace the removed block with:

```ts
const newDates = getScheduleWeekDates(weekOffset);
setWeekDates(newDates);
const fmtLabel = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
setWeekRange(`${fmtLabel(newDates[0])} — ${fmtLabel(newDates[4])}`);
```

## Step B3 — Re-run loadData when weekOffset changes

```ts
// CHANGE:
// REMOVE: useEffect(() => { loadData(); }, []);
// ADD:
useEffect(() => { loadData(); }, [weekOffset]);
```

Note: `loadData` references `weekOffset` — make sure it reads the current value.
Since `loadData` is defined inside the component and `weekOffset` is in scope, this works.

## Step B4 — Add navigation UI to the schedule page header

Find the existing header in schedule/page.tsx — it contains the weekRange display.
Add the same navigation controls alongside it:

```tsx
{/* Add this nav block next to wherever weekRange is displayed in the header */}
<div className="flex items-center gap-2">
  {weekOffset !== 0 && (
    <button
      onClick={() => setWeekOffset(0)}
      className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border border-[var(--accent)]/30 text-[var(--accent)] rounded-full hover:bg-[var(--accent)]/10 transition-all"
    >
      Today
    </button>
  )}
  <button
    onClick={() => setWeekOffset(w => w - 1)}
    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-white/20 transition-all"
  >
    <ChevronLeft size={14} />
  </button>
  <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest min-w-[60px] text-center">
    {weekOffset === 0 ? 'This Week' : weekOffset > 0 ? `+${weekOffset}w` : `${weekOffset}w`}
  </span>
  <button
    onClick={() => setWeekOffset(w => w + 1)}
    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-white/20 transition-all"
  >
    <ChevronRight size={14} />
  </button>
</div>
```

`ChevronLeft` and `ChevronRight` are already imported in schedule/page.tsx — check line 20 and confirm before adding to imports.

## Step B5 — Dim past date columns and disable dropping

In `SchedulePageComponents.tsx`, the `DroppableScheduleCell` component needs to know
whether the day is in the past so it can be visually dimmed and DnD-disabled.

### Add `isPast` prop to DroppableScheduleCell:

Find the `DroppableScheduleCellProps` interface:

```ts
// FIND:
interface DroppableScheduleCellProps {
  techName: string;
  day: string;
  jobs?: Job[];
  onJobClick?: (job: Job) => void;
}

// REPLACE WITH:
interface DroppableScheduleCellProps {
  techName: string;
  day: string;
  jobs?: Job[];
  onJobClick?: (job: Job) => void;
  isPast?: boolean;
}
```

In the `DroppableScheduleCell` function body, add the `isPast` prop and pass it to `DroppableTimeSlot`:

```tsx
// FIND:
export function DroppableScheduleCell({ techName, day, jobs = [], onJobClick }: DroppableScheduleCellProps) {

// REPLACE WITH:
export function DroppableScheduleCell({ techName, day, jobs = [], onJobClick, isPast = false }: DroppableScheduleCellProps) {
```

Then wrap the container div with a dimming class:

```tsx
// FIND:
<div className="h-full flex flex-col border-r border-white/5 bg-transparent min-h-[440px]">

// REPLACE WITH:
<div className={`h-full flex flex-col border-r border-white/5 bg-transparent min-h-[440px] ${isPast ? 'opacity-30 pointer-events-none' : ''}`}>
```

### In schedule/page.tsx, compute isPast for each date and pass it down:

In the grid render where `DroppableScheduleCell` is used, add:

```tsx
// Compute once outside the map — today's ISO date in Pacific time
const todayISO = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date());

// When rendering DroppableScheduleCell, add isPast:
<DroppableScheduleCell
  techName={tech.techName}
  day={dateStr}
  jobs={gridData[tech.techName]?.[dateStr] || []}
  onJobClick={(job) => { setSelectedJob(job); }}
  isPast={dateStr < todayISO}
/>
```

---

## VERIFICATION

1. `npx tsc --noEmit` — zero errors
2. **weekly-schedule**: prev/next arrows change the week, Today button appears/disappears correctly
3. **schedule**: same navigation; current week still shows rolling window from today; future weeks show Mon-Fri
4. **schedule**: past date columns (dates before today) are visibly dimmed and do not accept drops
5. Navigating 8+ weeks forward works without crash on both pages
6. Today column highlight (accent color) only shows on today's date when viewing current week

---

## DO NOT TOUCH
- DnD drop handler logic in schedule/page.tsx
- DurationSelectorModal
- The sidebar (readyToScheduleJobs)
- CLAUDE.md
- Any other file

---

## COMMIT MESSAGE
`feat: week navigation on Schedule and Ready to Schedule — prev/next/today, past cells dimmed`
