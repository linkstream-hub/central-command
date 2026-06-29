# ANTIGRAVITY_CALENDAR_SPEC.md
# /calendar — Unified Team Calendar View
# Sprint owner: Antigravity | Spec author: Claude Code | Date: 2026-04-26

---

## OVERVIEW

Build a read-only `/calendar` page inside Central Command. It is the office staff's unified view of:
- **Dispatch view:** which jobs are scheduled, on which days, assigned to which techs
- **Team view:** which staff members are on approved time off, on which days

This replaces "open Google Calendar to see who's out" and "open the schedule grid to see what's loaded this month." Both views live in the same page with a mode toggle (where role permits).

The reference aesthetic is **Cal.com** — clean month grid, subtle chips per day, warm dark palette, good typography. No DnD. No write operations. This is a planning/observation surface only.

---

## WHAT TO BUILD

### New files
- `tech-pwa/src/app/calendar/page.tsx` — the page

### Files to edit
- `dashboard-api/DashboardAPI.gs` — add `getCalendarData` action + `getCalendarDataDA` function
- `tech-pwa/src/components/dashboard/AppSidebar.tsx` — add Calendar nav item
- `tech-pwa/src/components/dashboard/RouteGuard.tsx` — add `/calendar` route permissions
- `tech-pwa/src/lib/dashboard-api.ts` — add `CalendarDay`, `CalendarDispatchEntry`, `CalendarTeamEntry`, `CalendarResponse` types

### Do NOT touch
- Any existing `.gs` file functions — only ADD `getCalendarData` action dispatch + `getCalendarDataDA` function
- Any existing page files
- `tech-pwa/src/lib/types.ts`
- The schedule grid (`schedule/page.tsx`) or weekly-schedule page

---

## BACKEND — DashboardAPI.gs

### Step 1: Wire the action in `doPost`

In the `doPost` read actions block (after line 119 in current file, after `getTechAvailability`):

```javascript
if (action === 'getCalendarData')   return daResponse(getCalendarDataDA(body));
```

### Step 2: Add `getCalendarDataDA` function

Add this function after `getTechAvailabilityWeekDA` (after line 1598):

```javascript
// Unified calendar data for the /calendar page.
// Params: { month: 'YYYY-MM', view: 'dispatch' | 'team' | 'both' }
// Returns:
//   dispatchDays: { 'YYYY-MM-DD': [{ tech, jobCount, estHours, hasUrgent }] }
//   teamDays:     { 'YYYY-MM-DD': [{ name, leaveType }] }
// dispatchDays only populated if view === 'dispatch' || 'both'
// teamDays only populated if view === 'team' || 'both'
function getCalendarDataDA(params) {
  try {
    var month = String((params && params.month) || '').trim();
    var view  = String((params && params.view)  || 'both').trim();

    // Validate month format
    if (!/^\d{4}-\d{2}$/.test(month)) {
      var laFmt = Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyy-MM');
      month = laFmt;
    }

    var monthStart = month + '-01';
    // Last day of the month
    var parts   = month.split('-');
    var yr      = parseInt(parts[0]);
    var mo      = parseInt(parts[1]);
    var lastDay = new Date(yr, mo, 0).getDate(); // 0th day of next month = last day of this month
    var monthEnd = month + '-' + String(lastDay).padStart(2, '0');

    var dispatchDays = {};
    var teamDays     = {};

    // ── DISPATCH VIEW ──────────────────────────────────────────────────────
    if (view === 'dispatch' || view === 'both') {
      var dqSheet = getDQSheet();
      if (dqSheet && dqSheet.getLastRow() >= 2) {
        var dqData = dqSheet.getDataRange().getValues();
        dqData.slice(1).forEach(function(row) {
          var status = String(row[DA_DQ.STATUS] || '').trim();
          if (status === 'Archived' || status === 'Complete') return;

          var sched = parseScheduledDate(row[DA_DQ.SCHED]);
          if (!sched.date) return;
          if (sched.date < monthStart || sched.date > monthEnd) return;

          var techName = String(row[DA_DQ.TECH]    || '').trim() || 'Unassigned';
          var estHrs   = parseFloat(row[DA_DQ.EST_HRS]) || 0;
          var priority = String(row[DA_DQ.PRIORITY] || '').trim();
          var isUrgent = priority === '1-URGENT';

          if (!dispatchDays[sched.date]) dispatchDays[sched.date] = {};
          if (!dispatchDays[sched.date][techName]) {
            dispatchDays[sched.date][techName] = { tech: techName, jobCount: 0, estHours: 0, hasUrgent: false };
          }
          dispatchDays[sched.date][techName].jobCount++;
          dispatchDays[sched.date][techName].estHours += estHrs;
          if (isUrgent) dispatchDays[sched.date][techName].hasUrgent = true;
        });
      }

      // Convert nested objects to arrays
      Object.keys(dispatchDays).forEach(function(date) {
        dispatchDays[date] = Object.values(dispatchDays[date]);
      });
    }

    // ── TEAM VIEW ──────────────────────────────────────────────────────────
    if (view === 'team' || view === 'both') {
      var tomSS    = SpreadsheetApp.openById(TOM_SHEET_ID_DA);
      var torSheet = tomSS.getSheetByName('TimeOffRequests');
      if (torSheet && torSheet.getLastRow() >= 2) {
        var torRows = torSheet.getDataRange().getValues().slice(1);
        torRows.forEach(function(row) {
          // TimeOffRequests column order (0-indexed):
          // 0=RequestID, 1=EmployeeID, 2=EmployeeName, 3=LeaveType, 4=StartDate, 5=EndDate, 6=Status, ...
          var status    = String(row[6] || '').trim();
          if (status !== 'Approved') return;

          var empName   = String(row[2] || '').trim();
          var leaveType = String(row[3] || '').trim();
          var startDate = String(row[4] || '').trim().slice(0, 10);
          var endDate   = String(row[5] || '').trim().slice(0, 10);

          if (!empName || !startDate || !endDate) return;
          // Check overlap with the month window
          if (endDate < monthStart || startDate > monthEnd) return;

          // Enumerate each calendar date in the leave range that falls within the month
          var cur = new Date(startDate + 'T12:00:00');
          var end = new Date(endDate   + 'T12:00:00');
          while (cur <= end) {
            var d = Utilities.formatDate(cur, 'America/Los_Angeles', 'yyyy-MM-dd');
            if (d >= monthStart && d <= monthEnd) {
              if (!teamDays[d]) teamDays[d] = [];
              // Avoid duplicates (in case of overlapping approved requests)
              var alreadyAdded = teamDays[d].some(function(e) { return e.name === empName; });
              if (!alreadyAdded) {
                teamDays[d].push({ name: empName, leaveType: leaveType });
              }
            }
            cur.setDate(cur.getDate() + 1);
          }
        });
      }
    }

    return { success: true, month: month, view: view, dispatchDays: dispatchDays, teamDays: teamDays };

  } catch (e) {
    Logger.log('getCalendarDataDA error: ' + e.message);
    return { success: false, error: e.message, month: '', view: '', dispatchDays: {}, teamDays: {} };
  }
}
```

**Critical note on TOM column indices:** The `TimeOffRequests` tab column order used above (row[2]=EmployeeName, row[3]=LeaveType, row[4]=StartDate, row[5]=EndDate, row[6]=Status) matches the existing `getTechAvailabilityWeekDA` function which uses the same hardcoded indices and is already working in production. Do NOT use `getTomColMapDA` here — it opens the Employees sheet unnecessarily. Do NOT change these indices without also updating `getTechAvailabilityWeekDA`. If AppSheet changes the schema, update both functions together.

---

## FRONTEND — dashboard-api.ts additions

Add these types to `tech-pwa/src/lib/dashboard-api.ts`. Find the existing type definitions block and append:

```typescript
export interface CalendarDispatchEntry {
  tech: string;
  jobCount: number;
  estHours: number;
  hasUrgent: boolean;
}

export interface CalendarTeamEntry {
  name: string;
  leaveType: string;
}

export interface CalendarResponse {
  success: boolean;
  month: string;
  view: string;
  dispatchDays: Record<string, CalendarDispatchEntry[]>;
  teamDays: Record<string, CalendarTeamEntry[]>;
}
```

---

## SIDEBAR & ROUTE GUARD

### AppSidebar.tsx

In the `NAV_ITEMS` array, add the Calendar entry **after the `weekly-schedule` entry**:

```typescript
{ id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '/calendar' },
```

Use the existing `CalendarDays` import — it is already imported.

In `ROUTE_PERMISSIONS`:
```typescript
'/calendar': ['dispatch', 'management', 'hr', 'compliance', 'admin'],
```

### RouteGuard.tsx

In `ROUTE_PERMISSIONS`:
```typescript
'/calendar': ['dispatch', 'management', 'hr', 'compliance', 'admin'],
```

No change to `DEFAULT_ROUTE` needed.

---

## FRONTEND — calendar/page.tsx

### State variables

```typescript
const [calData, setCalData] = useState<CalendarResponse | null>(null);
const [loading, setLoading] = useState(true);
const [currentMonth, setCurrentMonth] = useState<string>(() => {
  // 'YYYY-MM' for today in Pacific
  const laFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' });
  return laFmt.format(new Date()).slice(0, 7);
});
const [viewMode, setViewMode] = useState<'dispatch' | 'team' | 'both'>('both');
const [selectedDay, setSelectedDay] = useState<string | null>(null);
```

### Role-aware view mode initialization

```typescript
const role = getSession()?.role ?? 'dispatch';

// Determine which views this role may see
const canSeeDispatch = ['dispatch', 'management', 'admin', 'compliance'].includes(role);
const canSeeTeam     = ['hr', 'management', 'admin', 'compliance'].includes(role);
const showToggle     = canSeeDispatch && canSeeTeam;

// On mount, set the correct initial view for roles that only have one view
useEffect(() => {
  if (!canSeeDispatch && canSeeTeam) setViewMode('team');
  if (canSeeDispatch && !canSeeTeam)  setViewMode('dispatch');
}, []);
```

### Data fetch

```typescript
const loadCalendar = async () => {
  setLoading(true);
  const apiView = showToggle ? viewMode : (canSeeDispatch ? 'dispatch' : 'team');
  const res = await dashboardRequest('getCalendarData', { month: currentMonth, view: apiView });
  if (res.success) setCalData(res as CalendarResponse);
  setLoading(false);
};

useEffect(() => { loadCalendar(); }, [currentMonth, viewMode]);
```

### Month navigation helpers

```typescript
function shiftMonth(delta: number) {
  const [yr, mo] = currentMonth.split('-').map(Number);
  const next = new Date(yr, mo - 1 + delta, 1);
  const pad = (n: number) => String(n).padStart(2, '0');
  setCurrentMonth(`${next.getFullYear()}-${pad(next.getMonth() + 1)}`);
  setSelectedDay(null);
}

function getMonthDays(month: string): Array<{ date: string; isCurrentMonth: boolean }> {
  const [yr, mo] = month.split('-').map(Number);
  const firstDay = new Date(yr, mo - 1, 1);
  const lastDay  = new Date(yr, mo, 0);
  const days: Array<{ date: string; isCurrentMonth: boolean }> = [];

  // Pad with previous month days so the grid starts on Monday
  const firstDow = firstDay.getDay(); // 0=Sun
  const padDays  = firstDow === 0 ? 6 : firstDow - 1; // days before the 1st to show (Mon-based)
  for (let i = padDays - 1; i >= 0; i--) {
    const d = new Date(yr, mo - 1, -i);
    days.push({ date: formatDate(d), isCurrentMonth: false });
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ date: `${yr}-${String(mo).padStart(2,'0')}-${String(i).padStart(2,'0')}`, isCurrentMonth: true });
  }
  // Pad to complete the last row
  while (days.length % 7 !== 0) {
    const last = new Date(days[days.length - 1].date + 'T12:00:00');
    last.setDate(last.getDate() + 1);
    days.push({ date: formatDate(last), isCurrentMonth: false });
  }
  return days;
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
```

### Page JSX structure

```tsx
<DashboardLayout>
  <div className="space-y-6 pb-20">

    {/* ── HEADER ── */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">
          Calendar
        </h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          {showToggle
            ? 'Job schedule + team availability'
            : canSeeDispatch
              ? 'Job assignment schedule'
              : 'Team time-off calendar'}
        </p>
      </div>

      {/* Mode toggle — only shown when role can see both */}
      {showToggle && (
        <div className="flex items-center bg-white/5 rounded-lg p-1 border border-[var(--border-subtle)]">
          {(['dispatch', 'both', 'team'] as const).map(m => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                viewMode === m
                  ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {m === 'dispatch' ? 'Jobs' : m === 'team' ? 'Time Off' : 'Both'}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* ── MONTH NAVIGATION ── */}
    <div className="flex items-center space-x-4">
      <button
        onClick={() => shiftMonth(-1)}
        className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-base font-black text-[var(--text-primary)] uppercase tracking-widest min-w-[140px] text-center">
        {new Date(currentMonth + '-15T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </span>
      <button
        onClick={() => shiftMonth(1)}
        className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all"
      >
        <ChevronRight size={18} />
      </button>
      <button
        onClick={() => { setCurrentMonth(new Date().toISOString().slice(0, 7)); setSelectedDay(null); }}
        className="ml-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] border border-[var(--border-subtle)] rounded-lg hover:bg-white/5 hover:text-[var(--text-primary)] transition-all"
      >
        Today
      </button>
    </div>

    {/* ── MONTH GRID ── */}
    {loading ? (
      <CalendarSkeleton />
    ) : (
      <MonthGrid
        month={currentMonth}
        calData={calData}
        viewMode={viewMode as 'dispatch' | 'team' | 'both'}
        selectedDay={selectedDay}
        onDayClick={setSelectedDay}
      />
    )}

    {/* ── DAY DETAIL PANEL ── */}
    {selectedDay && calData && (
      <DayDetailPanel
        date={selectedDay}
        dispatchEntries={calData.dispatchDays[selectedDay] ?? []}
        teamEntries={calData.teamDays[selectedDay] ?? []}
        viewMode={viewMode as 'dispatch' | 'team' | 'both'}
        onClose={() => setSelectedDay(null)}
      />
    )}

  </div>
</DashboardLayout>
```

### MonthGrid component (inline in the file)

```tsx
function MonthGrid({
  month, calData, viewMode, selectedDay, onDayClick
}: {
  month: string;
  calData: CalendarResponse | null;
  viewMode: 'dispatch' | 'team' | 'both';
  selectedDay: string | null;
  onDayClick: (date: string) => void;
}) {
  const days = getMonthDays(month);
  const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date());
  const DOW_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-white/[0.02] overflow-hidden">
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 border-b border-[var(--border-subtle)]">
        {DOW_LABELS.map(d => (
          <div key={d} className="py-3 text-center text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {days.map(({ date, isCurrentMonth }) => {
          const dispatchEntries = (viewMode === 'dispatch' || viewMode === 'both') ? (calData?.dispatchDays[date] ?? []) : [];
          const teamEntries     = (viewMode === 'team' || viewMode === 'both') ? (calData?.teamDays[date] ?? []) : [];
          const hasAny  = dispatchEntries.length > 0 || teamEntries.length > 0;
          const isToday = date === todayStr;
          const isSelected = date === selectedDay;

          // Max 3 chips visible — rest are "+N more"
          const allChips: JSX.Element[] = [];
          dispatchEntries.forEach(e => {
            allChips.push(
              <span
                key={`d-${e.tech}`}
                className={`text-[10px] font-bold truncate px-1.5 py-0.5 rounded-md max-w-full block ${
                  e.hasUrgent
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-blue-500/15 text-blue-400'
                }`}
              >
                {e.tech.split(' ')[0]} · {e.jobCount}j
              </span>
            );
          });
          teamEntries.forEach(e => {
            allChips.push(
              <span
                key={`t-${e.name}`}
                className={`text-[10px] font-bold truncate px-1.5 py-0.5 rounded-md max-w-full block ${
                  e.leaveType === 'Sick'
                    ? 'bg-green-500/15 text-green-400'
                    : 'bg-amber-500/15 text-amber-400'
                }`}
              >
                OUT: {e.name.split(' ')[0]}
              </span>
            );
          });

          const visibleChips = allChips.slice(0, 3);
          const overflow     = allChips.length - 3;

          return (
            <motion.div
              key={date}
              onClick={() => hasAny && onDayClick(date)}
              whileHover={hasAny ? { backgroundColor: 'rgba(255,255,255,0.04)' } : {}}
              className={`min-h-[90px] p-2 border-r border-b border-[var(--border-subtle)] flex flex-col gap-1 relative transition-colors ${
                !isCurrentMonth ? 'opacity-25' : ''
              } ${hasAny ? 'cursor-pointer' : ''} ${
                isSelected ? 'bg-[var(--accent)]/5 ring-1 ring-inset ring-[var(--accent)]/30' : ''
              }`}
            >
              {/* Date number */}
              <span className={`text-xs font-black self-start leading-none mb-1 ${
                isToday
                  ? 'bg-[var(--accent)] text-white w-6 h-6 flex items-center justify-center rounded-full text-[11px]'
                  : isCurrentMonth
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)]'
              }`}>
                {parseInt(date.split('-')[2])}
              </span>

              {/* Event chips */}
              {visibleChips}
              {overflow > 0 && (
                <span className="text-[9px] text-[var(--text-muted)] font-bold pl-1">+{overflow} more</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```

### DayDetailPanel component (inline in the file)

```tsx
function DayDetailPanel({
  date, dispatchEntries, teamEntries, viewMode, onClose
}: {
  date: string;
  dispatchEntries: CalendarDispatchEntry[];
  teamEntries: CalendarTeamEntry[];
  viewMode: 'dispatch' | 'team' | 'both';
  onClose: () => void;
}) {
  const formatted = new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className="rounded-2xl border border-[var(--border-subtle)] bg-white/[0.03] backdrop-blur-sm p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">{formatted}</h2>
        <button
          onClick={onClose}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs font-bold uppercase tracking-widest transition-colors"
        >
          Close ✕
        </button>
      </div>

      {/* Dispatch section */}
      {(viewMode === 'dispatch' || viewMode === 'both') && (
        <div className="space-y-3">
          <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Job Schedule</p>
          {dispatchEntries.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] italic">No jobs scheduled this day.</p>
          ) : (
            <div className="space-y-2">
              {dispatchEntries.map(e => (
                <div key={e.tech} className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${
                  e.hasUrgent
                    ? 'bg-orange-500/10 border-orange-500/20'
                    : 'bg-blue-500/8 border-blue-500/15'
                }`}>
                  <span className="text-sm font-bold text-[var(--text-primary)]">{e.tech}</span>
                  <div className="flex items-center space-x-3">
                    {e.hasUrgent && (
                      <span className="text-[9px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">
                        URGENT
                      </span>
                    )}
                    <span className="text-xs text-[var(--text-muted)] font-bold">
                      {e.jobCount} job{e.jobCount !== 1 ? 's' : ''} · {e.estHours}h
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Team section */}
      {(viewMode === 'team' || viewMode === 'both') && (
        <div className="space-y-3">
          <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Time Off</p>
          {teamEntries.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] italic">No approved time off this day.</p>
          ) : (
            <div className="space-y-2">
              {teamEntries.map(e => (
                <div key={e.name} className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${
                  e.leaveType === 'Sick'
                    ? 'bg-green-500/8 border-green-500/15'
                    : 'bg-amber-500/8 border-amber-500/15'
                }`}>
                  <span className="text-sm font-bold text-[var(--text-primary)]">{e.name}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    e.leaveType === 'Sick'
                      ? 'text-green-400 bg-green-500/15'
                      : 'text-amber-400 bg-amber-500/15'
                  }`}>
                    {e.leaveType}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
```

### CalendarSkeleton component (inline in the file)

```tsx
function CalendarSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-white/[0.02] overflow-hidden animate-pulse">
      <div className="grid grid-cols-7 border-b border-[var(--border-subtle)]">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="py-3 flex justify-center">
            <div className="h-3 w-8 bg-white/10 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="min-h-[90px] p-2 border-r border-b border-[var(--border-subtle)]">
            <div className="h-4 w-5 bg-white/10 rounded mb-2" />
            {i % 3 === 0 && <div className="h-4 w-full bg-white/5 rounded mb-1" />}
            {i % 5 === 0 && <div className="h-4 w-3/4 bg-white/5 rounded" />}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Required imports for calendar/page.tsx

```typescript
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { dashboardRequest, CalendarResponse, CalendarDispatchEntry, CalendarTeamEntry } from "@/lib/dashboard-api";
import { getSession } from "@/lib/auth";
```

---

## RBAC SUMMARY

| Role       | viewMode init | Toggle shown | API view param |
|------------|--------------|--------------|----------------|
| dispatch   | 'dispatch'   | No           | 'dispatch'     |
| hr         | 'team'       | No           | 'team'         |
| management | 'both'       | Yes          | uses viewMode  |
| admin      | 'both'       | Yes          | uses viewMode  |
| compliance | 'both'       | Yes          | uses viewMode  |

---

## VERIFICATION STEPS (check these in the browser after build)

1. **Sidebar:** "Calendar" nav link appears for all non-tech roles. Does not appear for tech role.
2. **Route guard:** `/calendar` without a session → redirects to `/login`.
3. **dispatch role:** Calendar loads, "Both/Jobs/Time Off" toggle is NOT shown, dispatch job chips appear, no "OUT" chips visible.
4. **hr role:** Calendar loads, toggle NOT shown, only "OUT" chips appear for approved time off, no job chips.
5. **management/admin/compliance role:** Toggle shown, switching between Jobs/Both/Time Off correctly shows/hides chip types.
6. **Today's date:** today's date cell has accent background ring on the date number.
7. **Month nav:** Prev/Next arrows change the month. "Today" button returns to current month.
8. **Clicking a day with events:** DayDetailPanel appears below the grid with correct entries.
9. **Clicking same day again:** DayDetailPanel closes (selectedDay set to null or deselected — deselect on second click: if `date === selectedDay`, set to null).
10. **Empty month:** No chips, no errors, calendar grid still renders correctly.
11. **Skeleton:** visible while loading on month change.
12. **TypeScript:** `tsc --noEmit` passes with zero errors.
13. **Mobile (<768px):** Calendar grid is scrollable horizontally, chips truncate cleanly.

---

## WHAT TO KEEP UNCHANGED

- All existing DashboardAPI.gs functions — do not modify any existing function
- `schedule/page.tsx`, `weekly-schedule/page.tsx`, `hr/page.tsx`
- `tech-pwa/src/lib/types.ts`
- The dispatch grid DnD scheduling workflow

---

## NOTES

- This is a **read-only** surface. No DnD. No write operations. No modals for editing jobs.
- The dispatch chips show aggregated counts (jobs + hours) — not individual job cards. The full job detail lives on `/live` and `/schedule`.
- The team chips show just name + leave type. The approval workflow lives on `/hr`.
- Month navigation has no upper/lower bound — don't add one.
- `getCalendarDataDA` uses the same `TOM_SHEET_ID_DA` constant already defined in DashboardAPI.gs.
- `parseScheduledDate` is already defined in DashboardAPI.gs — use it for DQ col 18 parsing, do not reimplement.
