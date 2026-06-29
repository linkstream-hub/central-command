# ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md
# Schedule Grid Overhaul + Inline Estimate Editing
# Sprint 32 | Spec author: Claude Code | Date: 2026-04-28

---

## Overview

Three focused fixes to the Ready to Schedule grid (`/schedule`):

1. **Compact tech lanes** — headers are too tall; time slots are invisible (16px); the gap between techs is massive
2. **Visible time slot grid** — time labels exist but are 30% opacity and unreadably small; slots need height to be droppable targets
3. **Inline estimate editing** — dispatcher must be able to change a job's time estimate from the sidebar card (no modal required); 0h is still blocked

One file for items 1+2+3: `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`
One file for wiring item 3: `tech-pwa/src/app/schedule/page.tsx`

---

## SPEC 1 — Compact Tech Lane Header

### File: `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`

### What to find and DELETE:

```tsx
    <div 
      className={`w-48 shrink-0 border-r border-white/5 bg-[var(--bg-surface)]/50 backdrop-blur-sm sticky left-0 z-20 flex flex-col transition-colors ${onClick ? 'cursor-pointer hover:bg-[var(--accent)]/5' : ''}`}
      onClick={onClick}
    >
      <div className="p-3 border-b border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-xs shrink-0 border border-[var(--accent)]/20 shadow-inner">
            {techName[0]}
          </div>
          <div className="min-w-0">
            <h4 className="text-[11px] font-black text-[var(--text-primary)] truncate leading-none tracking-tight uppercase">
              {techName}
            </h4>
            <span className="text-[8px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1 block opacity-60">
              {badge || 'TECH'}
            </span>
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <div className={`text-[9px] font-black uppercase tracking-widest ${todayOver ? 'text-urgent animate-pulse' : 'text-[var(--text-muted)]'}`}>
            Today: {todayHours.toFixed(1)}/8.0 hrs
          </div>
          <div className={`text-[9px] font-black uppercase tracking-widest ${weekOver ? 'text-urgent' : 'text-standard'}`}>
            Week: {weekHours.toFixed(1)} hrs
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col w-full h-full justify-start mt-1">
         {TIME_LABELS.map(lbl => (
           <div key={lbl} className="min-h-[16px] flex items-start border-white/[0.04] pl-2 pt-0.5">
             <span className="text-[9px] font-black text-white/30 uppercase tracking-tighter w-full pr-2">
               {lbl}
             </span>
           </div>
         ))}
      </div>
    </div>
```

### Replace with:

```tsx
    <div 
      className={`w-44 shrink-0 border-r border-white/5 bg-[var(--bg-surface)]/50 backdrop-blur-sm sticky left-0 z-20 flex flex-col transition-colors ${onClick ? 'cursor-pointer hover:bg-[var(--accent)]/5' : ''}`}
      onClick={onClick}
    >
      {/* Compact identity row — fixed height, no extra padding */}
      <div className="h-[52px] shrink-0 flex items-center gap-2 px-2 border-b border-white/5">
        <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-[10px] shrink-0 border border-[var(--accent)]/20">
          {techName[0]}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-[10px] font-black text-[var(--text-primary)] truncate leading-none tracking-tight uppercase">
            {techName}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[8px] font-black uppercase tracking-widest ${todayOver ? 'text-urgent animate-pulse' : 'text-[var(--text-muted)] opacity-60'}`}>
              {todayHours.toFixed(1)}/8h
            </span>
            <span className="text-white/10 text-[8px]">·</span>
            <span className={`text-[8px] font-black uppercase tracking-widest ${weekOver ? 'text-urgent' : 'text-[var(--accent)] opacity-60'}`}>
              {weekHours.toFixed(1)}wk
            </span>
          </div>
        </div>
      </div>
      {/* Time labels — one per slot, exact height match to DroppableTimeSlot */}
      <div className="flex flex-col w-full">
        {TIME_LABELS.map(lbl => (
          <div key={lbl} className="h-[44px] flex items-center border-b border-white/[0.04] pl-2">
            <span className="text-[9px] font-black text-white/50 uppercase tracking-tighter">
              {lbl}
            </span>
          </div>
        ))}
      </div>
    </div>
```

---

## SPEC 2 — Visible Time Slot Grid

### File: `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`

### What to find and REPLACE in `DroppableTimeSlot`:

Find:
```tsx
      className={`relative min-h-[16px] border-b border-white/[0.04] px-1 py-0.5 transition-colors ${
        isOver ? 'bg-[var(--accent)]/10 ring-1 ring-inset ring-[var(--accent)]/30' : 'hover:bg-white/[0.02]'
      }`}
    >
      <div className="space-y-1 relative z-10 w-full min-h-[12px]">
```

Replace with:
```tsx
      className={`relative h-[44px] border-b border-white/[0.04] px-1 py-1 transition-colors ${
        isOver ? 'bg-[var(--accent)]/10 ring-1 ring-inset ring-[var(--accent)]/30' : 'hover:bg-white/[0.02]'
      }`}
    >
      <div className="space-y-0.5 relative z-10 w-full h-full overflow-hidden">
```

### Also in `DroppableScheduleCell`, find and REPLACE:

Find:
```tsx
    <div className={`h-full flex flex-col border-r border-white/5 bg-transparent min-h-[160px] ${isPast ? 'opacity-30 pointer-events-none' : ''}`}>
```

Replace with:
```tsx
    <div className={`flex flex-col border-r border-white/5 bg-transparent ${isPast ? 'opacity-30 pointer-events-none' : ''}`}>
```

> **Why:** Remove `h-full` and `min-h-[160px]` — height is now driven by the 10 slots × 44px = 440px. No min-height needed.

### Also: add a header row spacer to `DroppableScheduleCell` so the slot grid aligns with the tech lane header.

Find (the return JSX open in DroppableScheduleCell):
```tsx
  return (
    <div className={`flex flex-col border-r border-white/5 bg-transparent ${isPast ? 'opacity-30 pointer-events-none' : ''}`}>
      {TIME_SLOTS.map((time) => (
```

Replace with:
```tsx
  return (
    <div className={`flex flex-col border-r border-white/5 bg-transparent ${isPast ? 'opacity-30 pointer-events-none' : ''}`}>
      {/* 52px spacer aligns slots with the tech lane identity row */}
      <div className="h-[52px] shrink-0 border-b border-white/5" />
      {TIME_SLOTS.map((time) => (
```

---

## SPEC 3 — Inline Estimate Editing on Sidebar Job Cards

### Context

The sidebar shows `DraggableJobCard` components for all Ready to Schedule jobs. Currently there is no way to edit `estHours` without opening the full job modal. Brandon needs to be able to set or adjust the estimate directly on the card before dragging to the grid.

**Rules:**
- Clicking the hours badge opens an inline number input
- Accepts values in 0.5h increments, min 0.5, max 12
- On blur or Enter: calls `updateJob` API with new `estHours`, updates local job state
- Cannot save 0 or blank — revert to previous value if invalid
- The dragging behavior must not trigger the edit (use `e.stopPropagation()` and `e.preventDefault()` on the input)

### Step 1 — Update `DraggableJobCard` interface and component

#### File: `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`

Find:
```tsx
interface DraggableJobCardProps {
  job: Job;
}

export function DraggableJobCard({ job }: DraggableJobCardProps) {
```

Replace with:
```tsx
interface DraggableJobCardProps {
  job: Job;
  onEstimateChange?: (jobId: string, hours: number) => void;
}

export function DraggableJobCard({ job, onEstimateChange }: DraggableJobCardProps) {
```

#### Inside `DraggableJobCard`, add state (after the useDraggable hook):

```tsx
  const [editingEst, setEditingEst] = React.useState(false);
  const [estDraft, setEstDraft]     = React.useState<string>('');
```

#### Find the closing section of the DraggableJobCard return JSX — locate where address/category is shown and find the est hours display. It will look something like:

```tsx
          {job.estHours && (
```

or similar. **Add the following inline estimate control** at the bottom of the card, just before the closing `</div>` of the card's inner content:

```tsx
          {/* Inline estimate editor */}
          <div className="flex items-center gap-1 mt-1.5">
            <Clock size={9} className="text-[var(--text-muted)] opacity-50" />
            {editingEst ? (
              <input
                type="number"
                min={0.5}
                max={12}
                step={0.5}
                value={estDraft}
                autoFocus
                className="w-14 bg-white/10 border border-[var(--accent)]/40 rounded px-1 text-[9px] font-black text-white outline-none"
                onChange={e => setEstDraft(e.target.value)}
                onPointerDown={e => e.stopPropagation()}
                onKeyDown={e => {
                  e.stopPropagation();
                  if (e.key === 'Enter') e.currentTarget.blur();
                  if (e.key === 'Escape') { setEditingEst(false); }
                }}
                onBlur={() => {
                  const val = parseFloat(estDraft);
                  if (!isNaN(val) && val >= 0.5 && val <= 12) {
                    onEstimateChange?.(job.jobId, val);
                  }
                  setEditingEst(false);
                }}
              />
            ) : (
              <button
                className="text-[9px] font-black text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors px-1 rounded hover:bg-white/5"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => {
                  e.stopPropagation();
                  setEstDraft(String(job.estHours || 4));
                  setEditingEst(true);
                }}
              >
                {job.estHours ? `${job.estHours}h` : '4h est'}
              </button>
            )}
          </div>
```

> **Note:** Import `Clock` from `lucide-react` if not already imported at the top of the file. Check existing imports first.

### Step 2 — Wire `onEstimateChange` in schedule/page.tsx

#### File: `tech-pwa/src/app/schedule/page.tsx`

Find the sidebar map that renders `DraggableJobCard`:
```tsx
                      <DraggableJobCard job={job} />
```

Replace with:
```tsx
                      <DraggableJobCard 
                        job={job}
                        onEstimateChange={async (jobId, hours) => {
                          try {
                            await dashboardRequest('updateJob', { leadId: jobId, estHours: String(hours) });
                            setJobs(prev => prev.map(j => j.jobId === jobId ? { ...j, estHours: String(hours) } : j));
                          } catch {
                            // silently fail — estimate reverts on blur
                          }
                        }}
                      />
```

---

## What Must NOT Change

- `DurationSelectorModal` — keep exactly as-is (still used after drop for time confirmation)
- `ManualScheduleModal` — keep exactly as-is
- `handleDragEnd` in `schedule/page.tsx` — keep exactly as-is
- All other files — do not touch

---

## TypeScript Check

Run `npx tsc --noEmit` from `tech-pwa/` before committing. Must pass with 0 errors.

---

## Verification

1. Open `/schedule` — each tech lane should be compact: avatar + name + hours all in one 52px row
2. Each day cell shows 10 time slots (8 AM – 5 PM), each 44px tall, with visible time labels aligned to the left sidebar labels
3. Dragging a job card from the sidebar and hovering over a time slot highlights that slot in accent color
4. After drop, DurationSelectorModal opens pre-filled with the time from the slot you dropped on
5. On a sidebar job card, click the "4h est" hours label → input appears → type 6 → press Enter → card updates to "6h" without opening any modal
6. Try to save 0 → value reverts to previous
7. Dragging still works normally — editing the estimate does not accidentally trigger drag
