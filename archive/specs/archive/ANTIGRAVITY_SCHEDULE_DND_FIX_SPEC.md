# ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md
# Schedule Grid: D&D Fix + Manual Schedule Button Fallback
# Sprint 30 | Spec author: Claude Code | Date: 2026-04-28

---

## PROBLEM STATEMENT

Robert reported that drag-and-drop onto a time slot does not populate the job.
Root cause: `handleDragEnd` in `schedule/page.tsx` guards on `if (job && overData)` — if
`over.data.current` is null/undefined (which happens when the droppable cell does not pass
data correctly via `useDroppable`), the entire drop is silently discarded.

Secondary request: Robert wants to be able to manually assign a time slot without D&D, 
because jobs change throughout the day and D&D is imprecise for specific time entry.

---

## FILES TO TOUCH

- `tech-pwa/src/components/dashboard/DroppableScheduleCell.tsx`
- `tech-pwa/src/app/schedule/page.tsx`

## DO NOT TOUCH

- Any other page or component
- `DashboardAPI.gs`
- `handleConfirmSchedule` logic — already correct

---

## FIX 1 — DroppableScheduleCell data passthrough

Open `DroppableScheduleCell.tsx`. Find the `useDroppable` call. It must pass `data` containing
`techName`, `day`, and `time`. Verify it currently looks like this:

```typescript
const { setNodeRef, isOver } = useDroppable({
  id: `${techName}-${day}-${time ?? 'any'}`,
  data: { techName, day, time }
});
```

If `data` is missing or the shape is wrong, correct it to exactly the above.
Also ensure the component's props interface includes all three fields:

```typescript
interface DroppableScheduleCellProps {
  techName: string;
  day: string;       // ISO date string "YYYY-MM-DD"
  time?: string;     // "HH:MM" 24h — optional
  children?: React.ReactNode;
  isOut?: boolean;
  existingJobs?: Job[];
  // ... any other existing props — keep them
}
```

The `id` must be unique per cell. If two cells share the same `id`, dnd-kit silently picks one
and drops context on the other. The composite key `${techName}-${day}-${time ?? 'any'}` is unique.

---

## FIX 2 — handleDragEnd null-safety + debug log

In `schedule/page.tsx`, update `handleDragEnd`:

```typescript
const handleDragEnd = (event: DragEndEvent) => {
  setActiveDragJob(null);
  const { active, over } = event;

  if (!over) return;

  const job      = active.data.current?.job as Job | undefined;
  const overData = over.data.current as { techName?: string; day?: string; time?: string } | undefined;

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
  setIsModalOpen(true);
};
```

The `console.warn` line makes the failure visible in devtools during testing. Keep it.

---

## ADDITION — Manual "Schedule" button per grid cell

Robert needs to be able to click a cell directly to schedule a job without dragging.
This requires knowing *which job* to schedule — so the flow is:

1. In the sidebar job list, each job card already has a "drag handle." Add a **"Schedule" button**
   that opens a tech+date picker directly.

### Implementation

In `schedule/page.tsx`, add a `selectedSidebarJob` state:

```typescript
const [selectedSidebarJob, setSelectedSidebarJob] = useState<Job | null>(null);
```

In the sidebar job card JSX (the area that renders `readyJobs`), add a small "Schedule" button
alongside the drag handle:

```tsx
<button
  onClick={() => {
    setSelectedSidebarJob(job);
    setIsManualModalOpen(true);
  }}
  className="ml-auto text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-all"
>
  Schedule
</button>
```

Add a second modal open state:

```typescript
const [isManualModalOpen, setIsManualModalOpen] = useState(false);
```

The manual modal reuses `DurationSelectorModal` but also needs the user to pick a tech and day.
Use a lightweight inline form approach — a new small component `ManualScheduleModal`:

### ManualScheduleModal component

Create `tech-pwa/src/components/dashboard/ManualScheduleModal.tsx`:

```tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Job } from '@/lib/types';

interface ManualScheduleModalProps {
  job: Job | null;
  techs: { techName: string }[];
  weekDates: string[];        // ISO date strings for the current week
  open: boolean;
  onClose: () => void;
  onConfirm: (techName: string, date: string, time: string, hours: number) => void;
}

const DURATION_OPTIONS = [1, 2, 4, 6, 8];
const TIME_OPTIONS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];

export default function ManualScheduleModal({
  job, techs, weekDates, open, onClose, onConfirm
}: ManualScheduleModalProps) {
  const [tech, setTech]     = useState('');
  const [date, setDate]     = useState('');
  const [time, setTime]     = useState('08:00');
  const [hours, setHours]   = useState(4);

  if (!job) return null;

  const canConfirm = !!tech && !!date;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">
                Schedule Job
              </h3>
              <button onClick={onClose}>
                <X size={14} className="text-[var(--text-muted)]" />
              </button>
            </div>

            <p className="text-[10px] text-[var(--text-muted)] mb-4 truncate">
              {job.address}{job.unit ? ` · ${job.unit}` : ''} — {job.serviceCategory}
            </p>

            {/* Tech select */}
            <div className="mb-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] block mb-1">
                Assign Tech
              </label>
              <select
                value={tech}
                onChange={e => setTech(e.target.value)}
                className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/40"
              >
                <option value="">— Select tech —</option>
                {techs.map(t => (
                  <option key={t.techName} value={t.techName}>{t.techName}</option>
                ))}
              </select>
            </div>

            {/* Date select */}
            <div className="mb-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] block mb-1">
                Date
              </label>
              <select
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/40"
              >
                <option value="">— Select date —</option>
                {weekDates.map(d => (
                  <option key={d} value={d}>
                    {new Date(d + 'T12:00:00').toLocaleDateString('en-US', {
                      weekday: 'short', month: 'short', day: 'numeric'
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Time + Duration */}
            <div className="flex gap-3 mb-5">
              <div className="flex-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] block mb-1">
                  Start Time
                </label>
                <select
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/40"
                >
                  {TIME_OPTIONS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] block mb-1">
                  Est. Hours
                </label>
                <div className="flex gap-1 flex-wrap">
                  {DURATION_OPTIONS.map(h => (
                    <button
                      key={h}
                      onClick={() => setHours(h)}
                      className={`px-2 py-1 rounded-lg text-[9px] font-black transition-all ${
                        hours === h
                          ? 'bg-[var(--accent)] text-black'
                          : 'bg-white/5 text-[var(--text-muted)] hover:bg-white/10'
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              disabled={!canConfirm}
              onClick={() => { onConfirm(tech, date, time, hours); onClose(); }}
              className="w-full py-2.5 rounded-xl bg-[var(--accent)] text-black text-xs font-black uppercase tracking-widest disabled:opacity-30 hover:brightness-110 transition-all"
            >
              Confirm Schedule
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Wire ManualScheduleModal in schedule/page.tsx

Import the component, then add it to the JSX (alongside the existing `DurationSelectorModal`):

```tsx
<ManualScheduleModal
  job={selectedSidebarJob}
  techs={techs}
  weekDates={weekDates}
  open={isManualModalOpen}
  onClose={() => { setIsManualModalOpen(false); setSelectedSidebarJob(null); }}
  onConfirm={(techName, date, time, hours) => {
    if (!selectedSidebarJob) return;
    setPendingDrop({
      job: selectedSidebarJob,
      techName,
      dayDate: date,
      time,
      sourceType: 'sidebar'
    });
    handleConfirmSchedule(hours, time);
  }}
/>
```

Wait — `handleConfirmSchedule` reads from `pendingDrop` state, not arguments. So instead of
wiring through `pendingDrop`, call the backend directly inside `onConfirm`:

```tsx
onConfirm={async (techName, date, time, hours) => {
  if (!selectedSidebarJob) return;
  setIsManualModalOpen(false);

  const res = await dashboardRequest('updateJob', {
    job: {
      rowIndex     : selectedSidebarJob.rowIndex,
      assignedTech : techName,
      scheduledDate: date,
      scheduledTime: time,
      estHours     : hours,
      status       : 'Scheduled'
    }
  });
  if (res.success) loadData();
  setSelectedSidebarJob(null);
}}
```

---

## VERIFICATION STEPS

1. Drag a "Ready to Schedule" job card from the sidebar onto a grid cell — `DurationSelectorModal`
   opens with the tech lane and day pre-filled. Confirm → job appears in the grid, disappears from sidebar.
2. If the drop lands outside a valid cell (e.g., on the header row), nothing happens and no error
   is thrown. `console.warn` fires in devtools with the reason.
3. Click the "Schedule" button on any sidebar job card — `ManualScheduleModal` opens.
4. Select tech, date, time, hours → Confirm → job is scheduled. Grid updates without full reload.
5. `ManualScheduleModal` closes on backdrop click and on Confirm.
6. `tsc --noEmit` — zero errors. No `any` types introduced.
7. On mobile (< 768px), "Schedule" button is still tappable (min 44px touch target).
