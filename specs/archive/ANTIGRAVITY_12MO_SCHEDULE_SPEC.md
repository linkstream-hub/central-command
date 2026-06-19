# ANTIGRAVITY SPRINT — 12-Month Scheduling Horizon
**Author:** Claude Code
**Priority:** Robert's explicit request — current 5-day window is too short
**Scope:** Schedule page (`/schedule`) + DashboardAPI.gs `getWeekSchedule`

---

## WHAT THIS SPRINT BUILDS

Robert needs to schedule jobs weeks or months in advance — especially large
Lapham turnover blocks and inspection rounds booked by property managers.
Today, the grid only shows 5 days. This sprint extends it to a full 12-month
forward view with a month-jump control so he doesn't have to click "next week"
52 times to reach January 2027.

---

## THE ROOT CAUSE (read this first)

The frontend already sends `weekStart` to the backend:
```typescript
dashboardRequest('getWeekSchedule', { weekStart: newDates[0] })
```

The backend completely ignores it — `getWeekSchedule()` derives the week
internally via `weekDateRange()` every time. Fix the backend to use the
param, and the existing week navigation instantly works for any future week.

---

## BACKEND: `dashboard-api/DashboardAPI.gs`

### Change 1 — Route `body` into `getWeekSchedule`

Find this line in `doPost`:
```javascript
if (action === 'getWeekSchedule')   return daResponse(getWeekSchedule());
```
Replace with:
```javascript
if (action === 'getWeekSchedule')   return daResponse(getWeekSchedule(body));
```

### Change 2 — Rewrite `getWeekSchedule` to accept and use `weekStart`

Find the entire function signature and opening block:
```javascript
// Shape: { success: true, week: { start, end }, byTech: { "Tech": { "2026-04-18": [job, ...] } }, unassigned: [job, ...] }
function getWeekSchedule() {
  try {
    var range = weekDateRange();

    // Build list of weekday dates in the window
    var weekDates = [];
    var cursor = new Date(range.start + 'T12:00:00');
    while (true) {
      var ds = Utilities.formatDate(cursor, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      if (ds > range.end) break;
      var dow = cursor.getDay();
      if (dow !== 0 && dow !== 6) weekDates.push(ds);
      cursor.setDate(cursor.getDate() + 1);
    }
```

Replace with:
```javascript
// Shape: { success: true, week: { start, end }, byTech: { "Tech": { "2026-04-18": [job, ...] } }, unassigned: [job, ...] }
function getWeekSchedule(body) {
  try {
    var reqWeekStart = (body && body.weekStart && /^\d{4}-\d{2}-\d{2}$/.test(body.weekStart))
      ? body.weekStart : null;

    var range, weekDates;

    if (reqWeekStart) {
      // Build Mon-Fri for the requested week
      weekDates = [];
      var cursor = new Date(reqWeekStart + 'T12:00:00');
      while (weekDates.length < 5) {
        var dow = cursor.getDay();
        if (dow !== 0 && dow !== 6) {
          weekDates.push(Utilities.formatDate(cursor, 'America/Los_Angeles', 'yyyy-MM-dd'));
        }
        cursor.setDate(cursor.getDate() + 1);
      }
      range = { start: weekDates[0], end: weekDates[weekDates.length - 1] };
    } else {
      range = weekDateRange();
      weekDates = [];
      var c2 = new Date(range.start + 'T12:00:00');
      while (true) {
        var ds = Utilities.formatDate(c2, Session.getScriptTimeZone(), 'yyyy-MM-dd');
        if (ds > range.end) break;
        var d2 = c2.getDay();
        if (d2 !== 0 && d2 !== 6) weekDates.push(ds);
        c2.setDate(c2.getDate() + 1);
      }
    }
```

### Change 3 — Use DQ col 18 as primary source for ALL weeks

The current function reads scheduling sheet TABS to find assignments, then
falls back to DQ col 18. Sheet tabs only exist for historical weeks — future
weeks have no tabs. Swap the order: **DQ col 18 is primary; sheet tabs are
secondary (current week only, for backward compatibility with Keith's entries).**

After the `weekDates` block is established, find the existing scheduling sheet
tab read block that starts with:
```javascript
    // ── Read scheduling sheet tabs for this week ──
    var schedSS     = SpreadsheetApp.openByUrl(DA_SCHEDULE_SHEET_URL);
```
...and ends before the line:
```javascript
    // ── Seed byTech with ALL active techs so grid always shows full roster ──
```

Replace that entire block (the tab-reading section and the schedRecords processing)
with this new DQ-first approach:

```javascript
    // ── Seed byTech with ALL active techs ──
    var byTech     = {};
    var unassigned = [];
    var trSheet    = getTRSheet();
    if (trSheet && trSheet.getLastRow() >= 2) {
      var trData = trSheet.getDataRange().getValues();
      trData.slice(1).forEach(function(row) {
        var name   = String(row[DA_TR.NAME]   || '').trim();
        var active = String(row[DA_TR.ACTIVE] || '').toUpperCase().trim();
        if (!name || active !== 'TRUE') return;
        byTech[name] = {};
      });
    }

    // ── PRIMARY: Read DQ col 18 for jobs scheduled in this week ──
    var dqSheet = getDQSheet();
    if (dqSheet && dqSheet.getLastRow() >= 2) {
      var dqData = dqSheet.getDataRange().getValues();
      dqData.slice(1).forEach(function(row, i) {
        var status = String(row[DA_DQ.STATUS] || '').trim();
        if (status === 'Archived') return;

        var sched    = parseScheduledDate(row[DA_DQ.SCHED]);
        if (!sched.date || weekDates.indexOf(sched.date) === -1) return;

        var techName = String(row[DA_DQ.TECH] || '').trim();
        var job      = rowToJob(row, i + 2);

        if (techName && byTech[techName]) {
          if (!byTech[techName][sched.date]) byTech[techName][sched.date] = [];
          byTech[techName][sched.date].push(job);
        } else {
          unassigned.push(job);
        }
      });
    }

    // ── SECONDARY: Scheduling sheet tabs (current week only — Keith's legacy entries) ──
    // Only run this pass if we're looking at the current week (reqWeekStart is null or
    // matches the current weekDateRange). Skipped entirely for future weeks.
    var isCurrentWeek = !reqWeekStart || reqWeekStart === weekDates[0];
    if (isCurrentWeek) {
      try {
        var schedSS      = SpreadsheetApp.openByUrl(DA_SCHEDULE_SHEET_URL);
        var schedSheets  = schedSS.getSheets();
        var seenJobIds   = {};

        // Build a set of job IDs already added from DQ pass
        Object.keys(byTech).forEach(function(t) {
          Object.keys(byTech[t]).forEach(function(d) {
            byTech[t][d].forEach(function(j) { if (j.id) seenJobIds[j.id] = true; });
          });
        });
        unassigned.forEach(function(j) { if (j.id) seenJobIds[j.id] = true; });

        var dqSheet2  = getDQSheet();
        var openJobs2 = [];
        if (dqSheet2 && dqSheet2.getLastRow() >= 2) {
          var dqData2 = dqSheet2.getDataRange().getValues();
          dqData2.slice(1).forEach(function(row, i) {
            var status = String(row[DA_DQ.STATUS] || '').trim();
            if (status === 'Archived') return;
            openJobs2.push({ row: row, rowIndex: i + 2 });
          });
        }

        schedSheets.forEach(function(sheet) {
          var tabName = sheet.getName();
          if (tabName === 'blank') return;
          var date = parseDateFromTabDA(sheet, tabName);
          if (!date || weekDates.indexOf(date) === -1) return;

          var lastRow = sheet.getLastRow();
          var lastCol = sheet.getLastColumn();
          if (lastRow < 3 || lastCol < 3) return;

          var allData = sheet.getRange(1, 1, lastRow, lastCol).getValues();
          var colIdx  = detectColumnsDA(allData[0]);

          for (var r = 2; r < lastRow; r++) {
            var techCell = String(allData[r][1] || '').trim();
            if (!techCell) continue;
            var tech = parseTechCellDA(techCell);
            if (!tech.name) continue;

            [colIdx.job1, colIdx.job2, colIdx.job3, colIdx.job4, colIdx.job5, colIdx.returnJob]
              .forEach(function(ci) {
                if (ci < 0) return;
                var text = String(allData[r][ci] || '').trim();
                if (!text || text.length <= 3) return;

                // Match against DQ
                var bestEntry = null, bestScore = 0;
                openJobs2.forEach(function(entry) {
                  if (seenJobIds[String(entry.row[DA_DQ.LEAD_ID] || '')]) return;
                  var addr  = String(entry.row[DA_DQ.ADDRESS] || '').trim();
                  var unit  = String(entry.row[DA_DQ.UNIT]    || '').trim();
                  var words = extractAddressWordsDA(addr + ' ' + unit);
                  var score = fuzzyAddressScoreDA(words, text);
                  if (score >= 2 && score > bestScore) { bestScore = score; bestEntry = entry; }
                });

                var techName = tech.name;
                if (bestEntry) {
                  var job = rowToJob(bestEntry.row, bestEntry.rowIndex);
                  job.scheduledDate = date;
                  if (!job.assignedTech) job.assignedTech = techName;
                  seenJobIds[job.id] = true;
                  if (!byTech[techName]) byTech[techName] = {};
                  if (!byTech[techName][date]) byTech[techName][date] = [];
                  byTech[techName][date].push(job);
                } else {
                  unassigned.push({
                    id: '', rowIndex: 0,
                    assignedTech: techName, scheduledDate: date,
                    address: text.substring(0, 80), description: text,
                    status: 'Scheduled', serviceCategory: '',
                    priority: '4-STANDARD', unit: '', notes: '',
                    estHours: '', gmailMsgId: '', tenantName: '', tenantPhone: ''
                  });
                }
              });
          }
        });
      } catch (tabErr) {
        Logger.log('getWeekSchedule tab-read error (non-fatal): ' + tabErr.message);
      }
    }
```

After this block, **delete the original** `// ── FALLBACK: Add jobs from Dispatch Queue` section
(lines starting from `// ── FALLBACK` through the closing of that forEach) — it's now
redundant since DQ is the primary source above.

The tech enrichment block (badge, rank, skills) and the final `return` statement stay
exactly as they are — do not touch them.

---

## FRONTEND: `tech-pwa/src/app/schedule/page.tsx`

### Change 1 — Raise the week navigation ceiling to 52 weeks

Find the existing ChevronRight (next week) button. It currently has no upper limit.
Add a cap of 52 weeks so Robert can't navigate past 1 year out:

Find:
```tsx
onClick={() => setWeekOffset(o => o + 1)}
```
Replace with:
```tsx
onClick={() => setWeekOffset(o => Math.min(o + 1, 52))}
```

### Change 2 — Add month-jump row above the week navigation

Robert cannot click "next week" 40 times to reach January. Add a horizontal
scrollable row of the next 13 months (this month + 12 forward) that lets him
jump directly to a month.

Add this helper function near the top of the file (after `getScheduleWeekDates`):

```typescript
function getMonthJumps(): { label: string; weekOffset: number }[] {
  const laFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' });
  const todayStr = laFmt.format(new Date());
  const [yr, mo] = todayStr.split('-').map(Number);
  const today = new Date(yr, mo - 1, 1);

  // Current Monday
  const now = new Date(yr, mo - 1, Number(todayStr.split('-')[2]));
  const dow = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() + (dow === 0 ? -6 : 1 - dow));

  const jumps: { label: string; weekOffset: number }[] = [];
  for (let m = 0; m <= 12; m++) {
    const d = new Date(today.getFullYear(), today.getMonth() + m, 1);
    // First Monday of that month (or the Monday of the week containing the 1st)
    const firstDow = d.getDay();
    const firstMonday = new Date(d);
    firstMonday.setDate(d.getDate() + (firstDow === 0 ? 1 : firstDow === 1 ? 0 : 8 - firstDow));
    const diffMs = firstMonday.getTime() - monday.getTime();
    const diffWeeks = Math.round(diffMs / (7 * 86400000));
    jumps.push({
      label: d.toLocaleString('en-US', { month: 'short', year: '2-digit' }),
      weekOffset: diffWeeks
    });
  }
  return jumps;
}
```

Then, inside the component, add this state and computed value near the existing
`weekOffset` state:

```typescript
const monthJumps = useMemo(() => getMonthJumps(), []);
```

Add `useMemo` to the React imports if not already present.

### Change 3 — Render the month-jump row in JSX

Find the existing week navigation bar (the div containing the ChevronLeft/Right
buttons and the "This Week" / "+N w" label). Place the month-jump row
**immediately above** that bar:

```tsx
{/* Month-jump row */}
<div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
  {monthJumps.map((m) => {
    const isActive = weekOffset >= m.weekOffset &&
      weekOffset < m.weekOffset + 4; // highlight if viewing that month
    return (
      <button
        key={m.label}
        onClick={() => setWeekOffset(m.weekOffset)}
        className={`shrink-0 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
          isActive
            ? 'bg-[var(--accent)] text-white'
            : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
        }`}
      >
        {m.label}
      </button>
    );
  })}
</div>
```

Add this to `globals.css` if `no-scrollbar` isn't already defined:
```css
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

### Change 4 — Empty state for future weeks

When a future week has zero scheduled jobs and zero unscheduled sidebar jobs,
show a clear empty state instead of a blank grid.

Find the section that renders the schedule grid (the `{weekDates.map(...)}` section
or the loading skeleton). Add this empty-state check wrapping the grid render:

```tsx
{!loading && scheduledJobs.length === 0 && weekOffset > 0 ? (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center mb-4">
      <CalendarIcon size={24} className="text-[var(--text-muted)]" />
    </div>
    <p className="text-sm font-black text-[var(--text-primary)] mb-1">Nothing scheduled this week</p>
    <p className="text-xs text-[var(--text-muted)]">Drag jobs from the sidebar to assign them to this week</p>
  </div>
) : (
  /* existing grid JSX — unchanged */
)}
```

---

## WHAT TO KEEP UNCHANGED

- All existing drag-and-drop logic — do not touch
- `DurationSelectorModal` — do not touch
- `SchedulePageComponents.tsx` — do not touch
- The rolling window behavior for `weekOffset === 0` in `getScheduleWeekDates` — keep it
- All other DashboardAPI.gs functions — do not touch
- `weeklySchedule/page.tsx` — do not touch
- All `.gs` files at repo root — do not touch

---

## VERIFICATION CHECKLIST

Before marking complete:
- [ ] `npx tsc --noEmit` — zero errors
- [ ] Navigate to `/schedule`, click ChevronRight 8+ times — grid shows a future week without going blank
- [ ] Month-jump row visible and scrollable. Clicking "Jun 26" jumps to that week.
- [ ] Active month pill highlights correctly as you navigate weeks within that month
- [ ] Future week with no jobs shows the empty state message
- [ ] Current week (weekOffset=0) still shows jobs correctly (DQ + tab fallback both working)
- [ ] Dragging a job from Ready-to-Schedule sidebar onto a future week still works (saves to DQ col 18 with correct future date)
- [ ] ChevronRight stops at 52 weeks out
- [ ] `clasp push --force` + `clasp deploy` run for DashboardAPI.gs with description "v23 — 12-month scheduling horizon"
  - Working dir: `dashboard-api/`
  - Deploy ID: `AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ`

---

*Generated: April 25, 2026 | APT Central Command — Session 24*
