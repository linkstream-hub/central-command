# ANTIGRAVITY SPEC — RTS SCHEDULE GRID REWORK
**Status:** Ready for AG implementation
**Sprint type:** Implementation only
**Branch:** `feat/rts-grid-rework`
**Base commit:** run `git rev-parse HEAD` and record here before touching any file

---

## OBJECTIVE

Replace the tech-lane-stacked schedule grid with a clean day × time grid. Time (8AM–5PM) is the only vertical axis. Days (Mon–Fri) are columns. No tech lanes, no tech headers, nothing below 5PM. When dispatch drops a WO onto a cell, the confirmation modal lets them set duration, time, and tech.

---

## VERIFIED LITERALS — pulled from live files

| Literal | Source |
|---|---|
| `TIME_SLOTS` export | `SchedulePageComponents.tsx:137` — `['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']` |
| `TIME_LABELS` export | `SchedulePageComponents.tsx:138` — `['8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM']` |
| `DroppableTimeSlot` component | `SchedulePageComponents.tsx:222` — props: `techName, day, time, jobs, onJobClick, isPast, onCreateManualJob` |
| `TechLaneHeader` import | `schedule/page.tsx:26` |
| `TechProfileModal` import | `schedule/page.tsx:28` |
| `techs.map(tech => ...)` grid loop | `schedule/page.tsx:462` |
| `outDates` state | `schedule/page.tsx:121` |
| `getTechAvailability` call | `schedule/page.tsx:152` |
| `selectedTech` state | `schedule/page.tsx:131` |
| `isTechModalOpen` state | `schedule/page.tsx:133` |
| `handleDragEnd` guard: `!overData?.techName` | `schedule/page.tsx:234` |
| `pendingDrop.techName` set from `overData.techName` | `schedule/page.tsx:241` |
| `prefillTech={pendingDrop?.techName}` | `schedule/page.tsx:552` |
| `scheduledJobs` state | `schedule/page.tsx:120` |
| `gridData` useMemo | `schedule/page.tsx:189` — still needed for DateDetailModal |
| `TechProfileModal` JSX block | `schedule/page.tsx:586–593` |
| info banner text | `schedule/page.tsx:305` — "Drag jobs to assign techs" |

---

## CHANGES — EXACT FILES

### FILE 1: `tech-pwa/src/app/schedule/page.tsx`

**Read the file first. Then make exactly these changes in order.**

---

#### Change A — Remove unused imports

Remove `TechLaneHeader` and `TechProfileModal` from the import on lines 26–28:

Replace:
```typescript
  DraggableJobCard,
  DroppableTimeSlot,
  TechLaneHeader,
  DurationSelectorModal,
  TechProfileModal,
  DateDetailModal,
  TIME_SLOTS,
  TIME_LABELS,
```

With:
```typescript
  DraggableJobCard,
  DroppableTimeSlot,
  DurationSelectorModal,
  DateDetailModal,
  TIME_SLOTS,
  TIME_LABELS,
```

---

#### Change B — Remove outDates state and selectedTech/isTechModalOpen state

Remove these two lines (they are on lines 121 and 131–133):
```typescript
  const [outDates, setOutDates] = useState<Record<string, string[]>>({});
```
```typescript
  const [selectedTech, setSelectedTech] = useState<TechStatus | null>(null);
```
```typescript
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
```

---

#### Change C — Remove getTechAvailability call from loadData

In `loadData`, replace:
```typescript
    const [weekRes, jobsRes, availRes] = await Promise.all([
      dashboardRequest('getWeekSchedule', { weekStart: newDates[0] }),
      dashboardRequest('getDispatchData'),
      dashboardRequest('getTechAvailability', { weekStart: newDates[0] })
    ]);
```

With:
```typescript
    const [weekRes, jobsRes] = await Promise.all([
      dashboardRequest('getWeekSchedule', { weekStart: newDates[0] }),
      dashboardRequest('getDispatchData'),
    ]);
```

Also remove this block that used `availRes`:
```typescript
    if (availRes.success) {
      setOutDates(availRes.outDates || {});
    }
```

---

#### Change D — Fix handleDragEnd guard and pendingDrop techName

Replace:
```typescript
    // Guard: both job and a valid drop target with techName + day are required
    if (!job || !overData?.techName || !overData?.day) {
      console.warn('[Schedule DnD] Drop discarded — missing job or cell data', { job, overData });
      return;
    }

    setPendingDrop({
      job,
      techName : overData.techName,
      dayDate  : overData.day,
      time     : overData.time,
      sourceType: active.data.current?.sourceType as string
    });
```

With:
```typescript
    // Guard: job and drop target day required; techName comes from modal, not grid
    if (!job || !overData?.day) {
      console.warn('[Schedule DnD] Drop discarded — missing job or drop target', { job, overData });
      return;
    }

    setPendingDrop({
      job,
      techName : '',
      dayDate  : overData.day,
      time     : overData.time,
      sourceType: active.data.current?.sourceType as string
    });
```

---

#### Change E — Replace the grid body (the techs.map loop)

This is the largest change. In the grid body section (starting at the comment `{/* Grid Body — time runs as shared rows, techs are compact dividers */}`), replace everything inside the `<div className="flex-1 overflow-y-auto custom-scrollbar">` with the following:

Replace:
```typescript
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                   {!loading && techs.length === 0 ? (
                     <div className="flex flex-col items-center justify-center py-24 text-center">
                       <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center mb-4">
                         <CalendarIcon size={24} className="text-[var(--text-muted)]" />
                       </div>
                       <p className="text-sm font-black text-[var(--text-primary)] mb-1">Nothing scheduled this week</p>
                       <p className="text-xs text-[var(--text-muted)]">Drag jobs from the sidebar to assign them to this week</p>
                     </div>
                   ) : (
                     techs.map(tech => {
                       const techGrid = gridData[tech.techName] || {};
                       const todayISO = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date());
                       const todayHours = (techGrid[todayISO] || []).reduce((s: number, j: Job) => s + (Number(j.estimatedHours) || 0), 0);
                       const weekHours  = weekDates.reduce((sum: number, d: string) =>
                         sum + (techGrid[d] || []).reduce((s: number, j: Job) => s + (Number(j.estimatedHours) || 0), 0), 0);

                       return (
                         <div key={tech.techId}>
                           {/* Compact tech divider row — spans full width */}
                           <TechLaneHeader
                             techName={tech.techName}
                             badge={tech.badge}
                             todayHours={todayHours}
                             weekHours={weekHours}
                             onClick={() => { setSelectedTech(tech); setIsTechModalOpen(true); }}
                           />
                           {/* Time rows — one per hour, shared across all day columns */}
                           {TIME_SLOTS.map((time, i) => (
                             <div key={time} className="flex">
                               {/* Shared time label — left column, same width as day-header spacer */}
                               <div className="w-14 shrink-0 flex items-center justify-end pr-2 border-r border-white/[0.05]">
                                 <span className="text-[8px] font-black text-white/30 uppercase tracking-tighter">
                                   {TIME_LABELS[i]}
                                 </span>
                               </div>
                               {/* Day cells */}
                               {weekDates.map(dateStr => {
                                 const isOut = outDates?.[tech.techName]?.includes(dateStr) ?? false;
                                 const dayJobs: Job[] = techGrid[dateStr] || [];
                                 const slotJobs = dayJobs.filter(j => {
                                   if (!j.scheduledTime) return false;
                                   return parseInt(j.scheduledTime.split(':')[0], 10) === parseInt(time.split(':')[0], 10);
                                 });
                                 return (
                                   <div key={dateStr} className={`flex-1 min-w-[140px] border-r border-white/[0.03] ${isOut ? 'bg-amber-500/5' : ''}`}>
                                     {isOut ? (
                                       <div className="h-[44px] flex items-center justify-center">
                                         {i === 0 && <span className="text-[8px] font-black text-amber-500/50 uppercase tracking-widest">OUT</span>}
                                       </div>
                                     ) : (
                                       <DroppableTimeSlot
                                         techName={tech.techName}
                                         day={dateStr}
                                         time={time}
                                         jobs={slotJobs}
                                         onJobClick={(j) => setSelectedJob(j)}
                                         isPast={dateStr < todayISO}
                                         onCreateManualJob={(techName, day, time) => setManualJobSlot({ techName, day, time })}
                                       />
                                     )}
                                   </div>
                                 );
                               })}
                             </div>
                           ))}
                         </div>
                       );
                     })
                   )}
                </div>
```

With:
```typescript
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {(() => {
                    const todayISO = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date());
                    return TIME_SLOTS.map((time, i) => (
                      <div key={time} className="flex">
                        <div className="w-14 shrink-0 flex items-center justify-end pr-2 border-r border-white/[0.05]">
                          <span className="text-[8px] font-black text-white/30 uppercase tracking-tighter">
                            {TIME_LABELS[i]}
                          </span>
                        </div>
                        {weekDates.map(dateStr => {
                          const slotJobs = scheduledJobs.filter(j =>
                            j.scheduledDate === dateStr &&
                            j.scheduledTime != null &&
                            parseInt(j.scheduledTime.split(':')[0], 10) === parseInt(time.split(':')[0], 10)
                          );
                          return (
                            <div key={dateStr} className="flex-1 min-w-[140px] border-r border-white/[0.03]">
                              <DroppableTimeSlot
                                techName="grid"
                                day={dateStr}
                                time={time}
                                jobs={slotJobs}
                                onJobClick={(j) => setSelectedJob(j)}
                                isPast={dateStr < todayISO}
                                onCreateManualJob={(_, day, time) => setManualJobSlot({ techName: '', day, time })}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ));
                  })()}
                </div>
```

---

#### Change F — Fix prefillTech prop on DurationSelectorModal

Replace:
```typescript
            prefillTech={pendingDrop?.techName}
```

With:
```typescript
            prefillTech=""
```

---

#### Change G — Update info banner text

Replace:
```typescript
                <span className="text-[10px] font-black uppercase tracking-widest">Drag jobs to assign techs</span>
```

With:
```typescript
                <span className="text-[10px] font-black uppercase tracking-widest">Drag jobs to schedule</span>
```

---

#### Change H — Remove TechProfileModal JSX block

Remove this entire block:
```typescript
      <TechProfileModal
        tech={selectedTech}
        weekDates={weekDates}
        gridData={selectedTech ? (gridData[selectedTech.techName] || {}) : {}}
        isOpen={isTechModalOpen}
        onClose={() => { setIsTechModalOpen(false); setSelectedTech(null); }}
        onJobClick={(job) => { setSelectedJob(job); }}
      />
```

---

#### Change I — Remove unused TechStatus import if it becomes unused

Check whether `TechStatus` is still referenced after removing `selectedTech` and `TechProfileModal`. If the only remaining usage is `const [techs, setTechs] = useState<TechStatus[]>([])` and the `techs` prop on `DateDetailModal` and `ManualScheduleModal`, then keep the import. Do not remove it if it is still referenced.

---

### FILE 2: `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`

No changes required. `TechLaneHeader` stays in the file (it may be used in future sprints). `DroppableTimeSlot` continues to work with `techName="grid"` — the droppable ID becomes `slot-grid-${day}-${time}` which is unique and valid.

---

## WHAT NOT TO TOUCH

- `gridData` useMemo — keep as-is, still used by `DateDetailModal`
- `DateDetailModal` — keep as-is, still used for day-header clicks
- `ManualScheduleModal` — keep as-is
- `DurationSelectorModal` — keep as-is; the modal already has duration + time + tech fields
- `handleConfirmSchedule` — keep as-is; `techName` comes from the modal's `selectedTech`
- Any `.gs` or `.js` files at repo root
- `DashboardAPI.gs`

---

## COMPLETION CHECKLIST

1. [ ] Read `schedule/page.tsx` in full before editing
2. [ ] Apply Change A — imports
3. [ ] Apply Change B — remove state vars
4. [ ] Apply Change C — remove getTechAvailability from loadData
5. [ ] Apply Change D — fix handleDragEnd guard
6. [ ] Apply Change E — replace grid body
7. [ ] Apply Change F — fix prefillTech
8. [ ] Apply Change G — update banner text
9. [ ] Apply Change H — remove TechProfileModal JSX
10. [ ] Apply Change I — check TechStatus import
11. [ ] Run `npx tsc --noEmit` from `tech-pwa/` — zero errors
12. [ ] Run `git diff HEAD | Out-File -FilePath artifacts/ag_diff.txt -Encoding UTF8`
13. [ ] Report: "Implementation complete. tsc: zero errors. Diff written to artifacts/ag_diff.txt."

---

## BEHAVIOR AFTER THIS SPRINT

- Schedule grid shows a single 8AM–5PM time axis with 5 day columns. No tech rows. No repeat of time.
- Jobs already scheduled appear as chips in their day/time cell regardless of which tech is assigned.
- Drop a WO from the sidebar onto any cell → `DurationSelectorModal` opens with that day/time prefilled. Dispatcher sets duration, adjusts time if needed, and selects the tech. Nothing is auto-assigned from the drop target.
- 5PM is the hard bottom of the grid. Nothing renders below it.
