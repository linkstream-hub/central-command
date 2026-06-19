# ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC
**Date:** 2026-04-30
**Sprint:** Dispatch excellence — keyboard navigation, Kanban view, inline status change, actionable row enhancements

---

## What This Changes

Four high-leverage improvements to the dispatch hub (`/live`). No API changes. No new backend endpoints. No changes to data shapes. No changes to any `.gs` files.

1. **Keyboard navigation** — j/k navigate rows, Enter opens modal, Esc clears focus, / focuses search
2. **Kanban view** — wire the dead "Kanban" mode button into a real drag-between-columns board
3. **Inline status change** — change job status directly from the table row without opening the modal
4. **Actionable row enhancements** — Google Maps quick link + tenant phone link on row hover

---

## Files You Must Change

| # | File | What |
|---|------|------|
| 1 | `tech-pwa/src/app/live/page.tsx` | Add viewMode state, searchRef, KanbanBoard import |
| 2 | `tech-pwa/src/components/dashboard/JobQueueTable.tsx` | Keyboard nav, inline status, actionable links |
| 3 | `tech-pwa/src/components/dashboard/KanbanBoard.tsx` | **NEW FILE** — Kanban implementation |

## Files You Must NOT Change

- Any `.gs` files
- `tech-pwa/src/lib/dashboard-api.ts`
- `tech-pwa/src/lib/types.ts`
- `tech-pwa/src/components/dashboard/JobDetailModal.tsx`
- `tech-pwa/src/components/dashboard/TechAvailabilityPanel.tsx`
- `tech-pwa/src/components/dashboard/ActivityFeed.tsx`
- `tech-pwa/src/components/dashboard/CommandPalette.tsx`
- `tech-pwa/src/components/dashboard/SummaryCards.tsx`
- `tech-pwa/src/app/live/page.tsx` — except the three specific changes below

---

## Feature 1 — Keyboard Navigation

### 1A. Changes to `live/page.tsx`

#### Import line (currently line 3):
```tsx
import { useEffect, useState } from "react";
```
**Replace with:**
```tsx
import { useEffect, useState, useRef } from "react";
```

#### After existing state declarations (after line 30, `const [statusTab, setStatusTab] = useState<StatusTab>('ALL');`), add:
```tsx
  const searchRef = useRef<HTMLInputElement>(null);
```

#### Search `<input>` element (currently lines 101–108):
```tsx
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search address or description..."
                      className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-2 pl-11 pr-4 text-xs font-black text-white focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 outline-none w-64 transition-all"
                    />
```
**Replace with:**
```tsx
                    <input 
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search address or description..."
                      className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-2 pl-11 pr-4 text-xs font-black text-white focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 outline-none w-64 transition-all"
                    />
```

#### `<JobQueueTable>` component (currently starting around line 126). Find this prop:
```tsx
                onJobStatusChange={(jobId, newStatus) => {
```
**Add `onFocusSearch` prop immediately before it:**
```tsx
                onFocusSearch={() => { searchRef.current?.focus(); searchRef.current?.select(); }}
                onJobStatusChange={(jobId, newStatus) => {
```

### 1B. Changes to `JobQueueTable.tsx`

#### Add to imports (line 1–9):
Add `useEffect, useRef` to the existing react import. Current:
```tsx
import { useState, useMemo } from "react";
```
**Replace with:**
```tsx
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
```

#### Add to `JobQueueTableProps` interface (after `onJobStatusChange` line):
```tsx
  onFocusSearch?: () => void;
```

#### Add to function signature destructuring (after `onJobStatusChange`):
```tsx
  onFocusSearch,
```

#### After the existing state declarations (`showArchived`, `now`), add:
```tsx
  const [focusedIdx, setFocusedIdx] = useState<number>(-1);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
```

#### After the `toggleSort` function, add these two new effects:

```tsx
  // Keyboard navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIdx(i => Math.min(i + 1, filteredAndSortedJobs.length - 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIdx(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        if (focusedIdx >= 0 && filteredAndSortedJobs[focusedIdx]) {
          onJobClick?.(filteredAndSortedJobs[focusedIdx]);
        }
      } else if (e.key === 'Escape') {
        setFocusedIdx(-1);
      } else if (e.key === '/') {
        e.preventDefault();
        onFocusSearch?.();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filteredAndSortedJobs, focusedIdx, onJobClick, onFocusSearch]);

  // Scroll focused row into view
  useEffect(() => {
    if (focusedIdx >= 0 && rowRefs.current[focusedIdx]) {
      rowRefs.current[focusedIdx]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedIdx]);
```

#### On each row `<motion.div>` element (currently line 313–318):
```tsx
              <motion.div
                key={job.jobId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => onJobClick?.(job)}
                className="group flex items-center bg-[var(--bg-surface)] hover:bg-[var(--accent)]/[0.04] h-20 transition-all relative overflow-hidden cursor-pointer"
              >
```
**Replace with:**
```tsx
              <motion.div
                key={job.jobId}
                ref={(el) => { rowRefs.current[i] = el; }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => { setFocusedIdx(i); onJobClick?.(job); }}
                className={`group flex items-center h-20 transition-all relative overflow-hidden cursor-pointer ${
                  i === focusedIdx
                    ? 'bg-[var(--accent)]/[0.06] ring-1 ring-inset ring-[var(--accent)]/30'
                    : 'bg-[var(--bg-surface)] hover:bg-[var(--accent)]/[0.04]'
                }`}
              >
```

---

## Feature 2 — Kanban View

### 2A. Changes to `live/page.tsx`

#### Add `viewMode` state after existing state declarations:
```tsx
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
```

#### Add KanbanBoard import at the top of the file, after the existing imports:
```tsx
import KanbanBoard from "@/components/dashboard/KanbanBoard";
```

#### Wire the dead Mode toggle buttons (currently lines 110–115):
```tsx
                  <div className="flex items-center space-x-1 border border-[var(--border-subtle)] bg-[var(--bg-primary)] rounded-lg px-2 py-1 shadow-inner">
                    <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-tighter pr-2 border-r border-[var(--border-subtle)]">Mode</span>
                    <button className="text-[9px] font-black text-[var(--accent)] uppercase px-2">Table</button>
                    <span className="text-[var(--border-subtle)] opacity-40">|</span>
                    <button className="text-[9px] font-black text-[var(--text-muted)] uppercase px-2 hover:text-[var(--text-primary)] transition-colors">Kanban</button>
                  </div>
```
**Replace with:**
```tsx
                  <div className="flex items-center space-x-1 border border-[var(--border-subtle)] bg-[var(--bg-primary)] rounded-lg px-2 py-1 shadow-inner">
                    <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-tighter pr-2 border-r border-[var(--border-subtle)]">Mode</span>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`text-[9px] font-black uppercase px-2 transition-colors ${viewMode === 'table' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                    >
                      Table
                    </button>
                    <span className="text-[var(--border-subtle)] opacity-40">|</span>
                    <button
                      onClick={() => setViewMode('kanban')}
                      className={`text-[9px] font-black uppercase px-2 transition-colors ${viewMode === 'kanban' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                    >
                      Kanban
                    </button>
                  </div>
```

#### Replace the existing loading/table conditional render (currently lines 119–138):
```tsx
            {loading ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-16 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)]" />
                ))}
              </div>
            ) : (
              <JobQueueTable 
                jobs={jobs} 
                view="coordination"
                searchQuery={searchQuery}
                activeStatFilter={activeStatFilter}
                statusTab={statusTab}
                onStatusTabChange={setStatusTab}
                onJobClick={(job) => setSelectedJob(job)} 
                onJobStatusChange={(jobId, newStatus) => {
                  setJobs(prev => prev.map(j => j.jobId === jobId ? { ...j, status: newStatus as any } : j));
                }}
              />
            )}
```
**Replace with:**
```tsx
            {loading ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-16 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)]" />
                ))}
              </div>
            ) : viewMode === 'kanban' ? (
              <KanbanBoard
                jobs={jobs}
                searchQuery={searchQuery}
                activeStatFilter={activeStatFilter}
                onJobClick={(job) => setSelectedJob(job)}
                onJobStatusChange={(jobId, newStatus) => {
                  setJobs(prev => prev.map(j => j.jobId === jobId ? { ...j, status: newStatus as any } : j));
                }}
              />
            ) : (
              <JobQueueTable 
                jobs={jobs} 
                view="coordination"
                searchQuery={searchQuery}
                activeStatFilter={activeStatFilter}
                statusTab={statusTab}
                onStatusTabChange={setStatusTab}
                onFocusSearch={() => { searchRef.current?.focus(); searchRef.current?.select(); }}
                onJobClick={(job) => setSelectedJob(job)} 
                onJobStatusChange={(jobId, newStatus) => {
                  setJobs(prev => prev.map(j => j.jobId === jobId ? { ...j, status: newStatus as any } : j));
                }}
              />
            )}
```

### 2B. New file: `tech-pwa/src/components/dashboard/KanbanBoard.tsx`

Create this file exactly as written:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { Job } from "@/lib/types";
import { StatFilter } from "./SummaryCards";
import { dashboardRequest } from "@/lib/dashboard-api";

interface KanbanBoardProps {
  jobs: Job[];
  searchQuery?: string;
  activeStatFilter?: StatFilter;
  onJobClick?: (job: Job) => void;
  onJobStatusChange?: (jobId: string, newStatus: string) => void;
}

const COLUMNS: { id: string; label: string; status: string[] }[] = [
  { id: 'NEW',   label: 'New',               status: ['New'] },
  { id: 'READY', label: 'Ready to Schedule', status: ['Ready to Schedule'] },
  { id: 'PTE',   label: 'PTE Required',      status: ['PTE Required', 'Awaiting Approval'] },
  { id: 'SCHED', label: 'Scheduled',         status: ['Scheduled', 'In Progress'] },
];

const COLUMN_TARGET_STATUS: Record<string, string> = {
  NEW:   'New',
  READY: 'Ready to Schedule',
  PTE:   'PTE Required',
  SCHED: 'Scheduled',
};

const PRIORITY_CLASS: Record<string, string> = {
  '1-URGENT':      'text-red-400 border-red-400/30 bg-red-400/10',
  '2-TURNOVER':    'text-orange-400 border-orange-400/30 bg-orange-400/10',
  '3-PTE-PENDING': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  '4-STANDARD':    'text-[var(--text-muted)] border-white/10 bg-white/5',
};

const PRIORITY_LABEL: Record<string, string> = {
  '1-URGENT':      'URGENT',
  '2-TURNOVER':    'TURNOVER',
  '3-PTE-PENDING': 'PTE',
  '4-STANDARD':    'ROUTINE',
};

async function persistStatusChange(job: Job, newStatus: string) {
  await dashboardRequest('updateJob', {
    job: {
      rowIndex: job.rowIndex,
      assignedTech: job.assignedTech,
      scheduledDate: job.scheduledDate,
      scheduledTime: job.scheduledTime,
      estHours: job.estimatedHours,
      status: newStatus,
      notes: job.notes,
      address: job.address,
      unit: job.unit,
      description: job.description,
      serviceCategory: job.serviceCategory,
      tenantName: job.tenantName,
      tenantPhone: job.tenantPhone,
      tenantEmail: job.tenantEmail,
      rmName: job.rmName,
      rmEmail: job.rmEmail,
      accessInfo: job.accessInfo,
    },
  });
}

// ─── Draggable Card ──────────────────────────────────────────────────────────

function KanbanCard({ job, onJobClick, overlay = false }: { job: Job; onJobClick?: (job: Job) => void; overlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.jobId,
    data: { job },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => { if (!isDragging) { e.stopPropagation(); onJobClick?.(job); } }}
      className={`
        rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 space-y-2
        cursor-grab active:cursor-grabbing select-none transition-all
        hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/[0.03]
        ${isDragging && !overlay ? 'opacity-30 scale-[0.98]' : ''}
        ${overlay ? 'shadow-2xl shadow-black/40 rotate-1 scale-[1.02]' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-black text-[var(--text-primary)] leading-tight tracking-tight line-clamp-2">
          {job.address}{job.unit ? ` · Unit ${job.unit}` : ''}
        </p>
        <span className={`shrink-0 px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest border ${PRIORITY_CLASS[job.priority] ?? PRIORITY_CLASS['4-STANDARD']}`}>
          {PRIORITY_LABEL[job.priority] ?? 'ROUTINE'}
        </span>
      </div>

      <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest truncate">
        {job.serviceCategory}
      </p>

      {job.assignedTech && (
        <span className="inline-flex items-center text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25 truncate max-w-full">
          👤 {job.assignedTech.split(',')[0].trim()}
        </span>
      )}

      {job.rmName && (
        <p className="text-[9px] font-bold text-[var(--text-muted)] truncate">
          {job.rmName}
        </p>
      )}
    </div>
  );
}

// ─── Droppable Column ─────────────────────────────────────────────────────────

function KanbanColumn({
  column,
  jobs,
  onJobClick,
}: {
  column: typeof COLUMNS[number];
  jobs: Job[];
  onJobClick?: (job: Job) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col min-w-[240px] flex-1">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">
          {column.label}
        </span>
        <span className="text-[9px] font-black text-[var(--text-muted)] bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-full">
          {jobs.length}
        </span>
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={`
          flex-1 min-h-[400px] rounded-2xl border-2 border-dashed p-3 space-y-3 transition-all
          ${isOver
            ? 'border-[var(--accent)]/60 bg-[var(--accent)]/[0.04]'
            : 'border-[var(--border-subtle)] bg-[var(--bg-primary)]/50'
          }
        `}
      >
        {jobs.length === 0 && (
          <div className="flex items-center justify-center h-24 text-[9px] font-black text-[var(--text-muted)]/30 uppercase tracking-widest">
            {isOver ? 'Drop here' : 'Empty'}
          </div>
        )}
        {jobs.map(job => (
          <KanbanCard key={job.jobId} job={job} onJobClick={onJobClick} />
        ))}
      </div>
    </div>
  );
}

// ─── Board ────────────────────────────────────────────────────────────────────

export default function KanbanBoard({
  jobs,
  searchQuery = '',
  activeStatFilter,
  onJobClick,
  onJobStatusChange,
}: KanbanBoardProps) {
  const [draggingJob, setDraggingJob] = useState<Job | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  // Apply the same search/filter logic as JobQueueTable
  const visibleJobs = jobs.filter(j => {
    if (j.status === 'Complete' || j.status === 'Archived') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !String(j.address || '').toLowerCase().includes(q) &&
        !String(j.description || '').toLowerCase().includes(q) &&
        !String(j.rmName || '').toLowerCase().includes(q) &&
        !String(j.assignedTech || '').toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });

  function getColumnJobs(col: typeof COLUMNS[number]) {
    return visibleJobs.filter(j => col.status.includes(j.status));
  }

  function handleDragStart(event: DragStartEvent) {
    const job = event.active.data.current?.job as Job;
    setDraggingJob(job ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    setDraggingJob(null);
    const { active, over } = event;
    if (!over) return;
    const job = active.data.current?.job as Job;
    const newStatus = COLUMN_TARGET_STATUS[over.id as string];
    if (!newStatus || newStatus === job.status) return;
    onJobStatusChange?.(job.jobId, newStatus);
    await persistStatusChange(job, newStatus);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ minHeight: '500px' }}
      >
        {COLUMNS.map(col => (
          <KanbanColumn
            key={col.id}
            column={col}
            jobs={getColumnJobs(col)}
            onJobClick={onJobClick}
          />
        ))}
      </motion.div>

      <DragOverlay>
        {draggingJob ? (
          <KanbanCard job={draggingJob} overlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
```

---

## Feature 3 — Inline Status Change

### 3A. Changes to `JobQueueTable.tsx`

#### Add Radix DropdownMenu import at the top:
```tsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
```

Also add `ChevronDown` to the lucide-react import (it is already imported — verify it's there).
The current lucide import is:
```tsx
import { ChevronDown, ChevronUp, Users } from "lucide-react";
```
This already has `ChevronDown` — no change needed.

#### Add the status transitions map as a module-level constant (add it near the other constants at the top, after `TYPE_MAP`):

```typescript
const STATUS_TRANSITIONS: Record<string, string[]> = {
  'New':                ['Ready to Schedule', 'PTE Required', 'Awaiting Approval', 'Archived'],
  'Ready to Schedule':  ['Scheduled', 'PTE Required', 'Awaiting Approval', 'Archived'],
  'PTE Required':       ['Ready to Schedule', 'Awaiting Approval', 'Archived'],
  'Awaiting Approval':  ['Ready to Schedule', 'Scheduled', 'Archived'],
  'Scheduled':          ['In Progress', 'Complete', 'Archived'],
  'In Progress':        ['Complete', 'Archived'],
  'Complete':           ['Archived'],
  'Archived':           ['New'],
};
```

#### Add the `handleInlineStatusChange` function inside the component (after `toggleSort`):

```typescript
  async function handleInlineStatusChange(job: Job, newStatus: string) {
    onJobStatusChange?.(job.jobId, newStatus);
    await dashboardRequest('updateJob', {
      job: {
        rowIndex: job.rowIndex,
        assignedTech: job.assignedTech,
        scheduledDate: job.scheduledDate,
        scheduledTime: job.scheduledTime,
        estHours: job.estimatedHours,
        status: newStatus,
        notes: job.notes,
        address: job.address,
        unit: job.unit,
        description: job.description,
        serviceCategory: job.serviceCategory,
        tenantName: job.tenantName,
        tenantPhone: job.tenantPhone,
        tenantEmail: job.tenantEmail,
        rmName: job.rmName,
        rmEmail: job.rmEmail,
        accessInfo: job.accessInfo,
      },
    });
  }
```

#### Replace the status column div (currently lines 363–392):

**Current:**
```tsx
                 <div className="w-36 flex flex-col items-start shrink-0 gap-1">
                   <span className={`status-pill !text-[8px] font-black uppercase tracking-[0.15em] truncate ${getStatusColor(job.status)}`}>
                     {displayStatus}
                   </span>
                   {job.assignedTech && (
                     <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25 truncate max-w-full">
                       👤 {job.assignedTech.split(',')[0].trim()}
                     </span>
                   )}
                   {job.status === "New" && (() => {
                     const age = getJobAge(job.timestamp || "");
                     if (age.level === "fresh") return null;
                     return (
                       <span
                         className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                           age.level === "stale"
                             ? "bg-red-500/20 text-red-400 border border-red-500/20 animate-pulse"
                             : "bg-amber-500/20 text-amber-400 border border-amber-500/20"
                         }`}
                       >
                         {age.level === "stale" ? `STALE · ${age.label}` : age.label}
                       </span>
                     );
                   })()}
                   {job.tenantScheduled && (
                     <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                       Tenant Sched
                     </span>
                   )}
                 </div>
```

**Replace with:**
```tsx
                 <div className="w-36 flex flex-col items-start shrink-0 gap-1">
                   {/* Status pill with inline change trigger */}
                   <div className="flex items-center gap-1 max-w-full">
                     <span className={`status-pill !text-[8px] font-black uppercase tracking-[0.15em] truncate ${getStatusColor(job.status)}`}>
                       {displayStatus}
                     </span>
                     <DropdownMenu.Root>
                       <DropdownMenu.Trigger asChild>
                         <button
                           onClick={e => e.stopPropagation()}
                           className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 shrink-0"
                           title="Change status"
                         >
                           <ChevronDown size={10} />
                         </button>
                       </DropdownMenu.Trigger>
                       <DropdownMenu.Portal>
                         <DropdownMenu.Content
                           className="z-50 min-w-[160px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1 shadow-2xl shadow-black/40"
                           sideOffset={4}
                           onClick={e => e.stopPropagation()}
                         >
                           {(STATUS_TRANSITIONS[job.status] ?? []).map(next => (
                             <DropdownMenu.Item
                               key={next}
                               onSelect={() => handleInlineStatusChange(job, next)}
                               className="flex items-center px-3 py-2 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--accent)]/10 rounded-lg cursor-pointer outline-none transition-colors"
                             >
                               {next}
                             </DropdownMenu.Item>
                           ))}
                         </DropdownMenu.Content>
                       </DropdownMenu.Portal>
                     </DropdownMenu.Root>
                   </div>

                   {job.assignedTech && (
                     <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25 truncate max-w-full">
                       👤 {job.assignedTech.split(',')[0].trim()}
                     </span>
                   )}
                   {job.status === "New" && (() => {
                     const age = getJobAge(job.timestamp || "");
                     if (age.level === "fresh") return null;
                     return (
                       <span
                         className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                           age.level === "stale"
                             ? "bg-red-500/20 text-red-400 border border-red-500/20 animate-pulse"
                             : "bg-amber-500/20 text-amber-400 border border-amber-500/20"
                         }`}
                       >
                         {age.level === "stale" ? `STALE · ${age.label}` : age.label}
                       </span>
                     );
                   })()}
                   {job.tenantScheduled && (
                     <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                       Tenant Sched
                     </span>
                   )}
                 </div>
```

---

## Feature 4 — Actionable Row Enhancements

### 4A. Changes to `JobQueueTable.tsx`

#### Add `MapPin` and `Phone` to the lucide-react import:
```tsx
import { ChevronDown, ChevronUp, Users, MapPin, Phone } from "lucide-react";
```

#### In the Address & Details column div (the `flex-1 min-w-0 px-4` div, currently lines 335–355), find the closing `</div>` of the outermost address div. The current structure ends with:
```tsx
                  <div className="flex items-center mt-1.5 text-[9px] font-black uppercase tracking-widest gap-2">
                    <span className="truncate text-[var(--text-muted)]">
                      {job.rmName ? (
                        <span className="text-[var(--text-secondary)] font-black italic border-b border-[var(--accent)]/30 pb-0.5">REQUESTER: {job.rmName}</span>
                      ) : (
                        <span className="opacity-40">REQUESTER UNKNOWN</span>
                      )}
                    </span>
                  </div>
                </div>
```

**Replace with:**
```tsx
                  <div className="flex items-center mt-1.5 text-[9px] font-black uppercase tracking-widest gap-2">
                    <span className="truncate text-[var(--text-muted)]">
                      {job.rmName ? (
                        <span className="text-[var(--text-secondary)] font-black italic border-b border-[var(--accent)]/30 pb-0.5">REQUESTER: {job.rmName}</span>
                      ) : (
                        <span className="opacity-40">REQUESTER UNKNOWN</span>
                      )}
                    </span>
                  </div>

                  {/* Quick action links — appear on row hover */}
                  <div className="flex items-center gap-3 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address + (job.unit ? ` Unit ${job.unit}` : ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-blue-400 transition-colors"
                    >
                      <MapPin size={10} />
                      Maps
                    </a>
                    {job.tenantPhone && (
                      <a
                        href={`tel:${job.tenantPhone}`}
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-green-400 transition-colors"
                      >
                        <Phone size={10} />
                        {job.tenantPhone}
                      </a>
                    )}
                  </div>
                </div>
```

---

## Verification Steps

### TypeScript
1. Run `npx tsc --noEmit` in `tech-pwa/` — must show zero errors

### Keyboard Navigation (`/live`)
2. With the dispatch hub open, press `j` three times — confirm third job row gets a blue accent ring highlight
3. Press `k` once — confirm second job row is now highlighted
4. Press `Enter` — confirm job detail modal opens for the highlighted job
5. Press `Escape` — confirm highlight clears (modal should already be closed)
6. Press `/` — confirm cursor jumps into the search input
7. Type in the search input and press `j` — confirm keyboard nav does NOT fire while the input is focused (input tag guard working)

### Kanban View (`/live`)
8. Click "Kanban" in the Mode toggle — confirm the table disappears and 4 columns appear: New / Ready to Schedule / PTE Required / Scheduled
9. Confirm job cards appear in correct columns matching their status
10. Drag a "New" job card to the "Ready to Schedule" column — confirm:
    - Card visually moves to new column
    - Status chip in Table view also reflects the change if you switch back (optimistic update)
11. Click "Table" — confirm table re-renders with the updated status
12. Drag a card and release it outside any column — confirm nothing changes

### Inline Status Change (`/live`)
13. In Table view, hover a job row — confirm a small chevron appears next to the status pill
14. Click the chevron — confirm a dropdown opens listing valid next statuses (not including the current status)
15. Click a status from the dropdown — confirm the status pill on the row updates immediately without opening the modal
16. Confirm clicking the row area (not the chevron) still opens the job detail modal

### Actionable Row (`/live`)
17. Hover any job row — confirm "Maps" link appears in the address column
18. Click "Maps" (hold Ctrl/Cmd if needed) — confirm Google Maps opens in a new tab at the job address
19. Hover a job with a tenant phone number — confirm the phone number appears as a tappable link
20. Confirm clicking the phone link on a mobile device initiates a call (tel: scheme)
21. Confirm clicking Maps or the phone link does NOT open the job detail modal (stopPropagation working)

---

## Feature 5 — Schedule Page Sidebar Search

Robert needs to search/filter the unscheduled jobs sidebar on `/schedule` (Workorder Schedule). The sidebar shows draggable job cards. Add a search input above those cards.

### 5A. Changes to `tech-pwa/src/app/schedule/page.tsx`

#### Add `sidebarSearch` state after existing state declarations:
```tsx
const [sidebarSearch, setSidebarSearch] = useState('');
```

#### Find the sidebar search placeholder (currently a static input or no search at all). In the sidebar panel, locate the section that renders draggable job cards — it maps over `jobs` filtered by `unscheduledJobs`. Add a search input immediately above the job cards list:

Find this block (the sidebar header / unscheduled jobs section):
```tsx
{/* Unscheduled jobs */}
```
Add immediately before the `.map(` that renders `DraggableJobCard` components:
```tsx
<div className="relative mb-3">
  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
  <input
    type="text"
    value={sidebarSearch}
    onChange={(e) => setSidebarSearch(e.target.value)}
    placeholder="Search jobs..."
    className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-2 pl-8 pr-3 text-xs font-black text-white focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 outline-none transition-all"
  />
</div>
```

#### Add `Search` to the lucide-react import in `schedule/page.tsx` (it may already be there — verify first, only add if missing).

#### Filter the unscheduled jobs list. Find where `unscheduledJobs` is used in the sidebar `.map()` and replace it with:
```tsx
unscheduledJobs.filter(j => {
  if (!sidebarSearch.trim()) return true;
  const q = sidebarSearch.toLowerCase();
  return (
    String(j.address || '').toLowerCase().includes(q) ||
    String(j.description || '').toLowerCase().includes(q) ||
    String(j.serviceCategory || '').toLowerCase().includes(q) ||
    String(j.rmName || '').toLowerCase().includes(q) ||
    String(j.assignedTech || '').toLowerCase().includes(q) ||
    String(j.tenantName || '').toLowerCase().includes(q)
  );
})
```

---

## Feature 6 — Manual Job Creation in Tech Time Slot

Robert needs to create a brand-new job directly in a tech's time slot on the schedule grid — not just assign an existing workorder. This requires a new backend action and a new frontend modal.

### 6A. Backend — New action in `dashboard-api/DashboardAPI.gs`

**DO NOT touch this file.** The backend fix for this feature will be implemented by Claude Code separately. AG implements frontend only for this feature. The API action `createManualJob` will exist by the time AG builds the frontend.

The action signature (for reference only):
```
POST body: { action: 'createManualJob', payload: { address, unit, description, serviceCategory, priority, assignedTech, scheduledDate, scheduledTime, estHours, tenantName, tenantPhone, tenantEmail, accessInfo, rmName, rmEmail, notes } }
Response: { success: true, job: Job }
```

### 6B. New file: `tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx`

Create this file:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { dashboardRequest } from "@/lib/dashboard-api";
import { Job } from "@/lib/types";

const SERVICE_CATEGORIES = [
  'Plumbing', 'Electrical', 'HVAC', 'Carpentry', 'Painting',
  'Landscaping', 'Janitorial', 'Multi-Trade', 'Inspection', 'Other'
];

const PRIORITIES = [
  { value: '1-URGENT', label: 'Urgent' },
  { value: '2-TURNOVER', label: 'Turnover' },
  { value: '3-PTE-PENDING', label: 'PTE Pending' },
  { value: '4-STANDARD', label: 'Standard' },
];

interface ManualJobCreateModalProps {
  techName: string;
  scheduledDate: string;   // ISO YYYY-MM-DD
  scheduledTime: string;   // HH:MM
  onClose: () => void;
  onJobCreated: (job: Job) => void;
}

export default function ManualJobCreateModal({
  techName, scheduledDate, scheduledTime, onClose, onJobCreated
}: ManualJobCreateModalProps) {
  const [form, setForm] = useState({
    address: '',
    unit: '',
    description: '',
    serviceCategory: 'Plumbing',
    priority: '4-STANDARD',
    tenantName: '',
    tenantPhone: '',
    tenantEmail: '',
    accessInfo: '',
    rmName: '',
    rmEmail: '',
    estHours: 2,
    notes: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(field: string, value: string | number) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.address.trim()) { setError('Address is required.'); return; }
    if (!form.description.trim()) { setError('Description is required.'); return; }
    setError('');
    setSaving(true);
    const res = await dashboardRequest('createManualJob', {
      ...form,
      assignedTech: techName,
      scheduledDate,
      scheduledTime,
    });
    setSaving(false);
    if (res.success) {
      onJobCreated(res.job as Job);
      onClose();
    } else {
      setError('Failed to create job. Please try again.');
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
            <div>
              <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">New Job</h2>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                {techName} · {scheduledDate} at {scheduledTime}
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Address */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Address *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => set('address', e.target.value)}
                  placeholder="123 Main St"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Unit</label>
                <input
                  type="text"
                  value={form.unit}
                  onChange={e => set('unit', e.target.value)}
                  placeholder="4B"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
                />
              </div>
            </div>

            {/* Category + Priority */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Category</label>
                <select
                  value={form.serviceCategory}
                  onChange={e => set('serviceCategory', e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
                >
                  {SERVICE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Priority</label>
                <select
                  value={form.priority}
                  onChange={e => set('priority', e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
                >
                  {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Description *</label>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Describe the work to be done..."
                rows={3}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none resize-none"
              />
            </div>

            {/* Access Info */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Access / Lockbox Info</label>
              <input
                type="text"
                value={form.accessInfo}
                onChange={e => set('accessInfo', e.target.value)}
                placeholder="Lockbox code, parking, key location..."
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
              />
            </div>

            {/* Tenant */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Tenant</label>
              <div className="grid grid-cols-3 gap-3">
                <input type="text" value={form.tenantName} onChange={e => set('tenantName', e.target.value)} placeholder="Name" className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none" />
                <input type="tel" value={form.tenantPhone} onChange={e => set('tenantPhone', e.target.value)} placeholder="Phone" className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none" />
                <input type="email" value={form.tenantEmail} onChange={e => set('tenantEmail', e.target.value)} placeholder="Email" className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none" />
              </div>
            </div>

            {/* RM + Est Hours */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Property Manager</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={form.rmName} onChange={e => set('rmName', e.target.value)} placeholder="Name" className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none" />
                  <input type="email" value={form.rmEmail} onChange={e => set('rmEmail', e.target.value)} placeholder="Email" className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Est. Hours</label>
                <select
                  value={form.estHours}
                  onChange={e => set('estHours', Number(e.target.value))}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
                >
                  {[1,2,3,4,5,6,7,8].map(h => <option key={h} value={h}>{h}h</option>)}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Internal Notes</label>
              <input
                type="text"
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                placeholder="Optional dispatcher notes..."
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[var(--accent)] outline-none"
              />
            </div>

            {error && (
              <p className="text-xs font-black text-red-400">{error}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
            >
              <Plus size={12} />
              {saving ? 'Creating...' : 'Create Job'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
```

### 6C. Changes to `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`

Add a "+" button to `DroppableTimeSlot` that appears on hover of an **empty** slot (no jobs in it). The button opens `ManualJobCreateModal`.

#### Add to `DroppableTimeSlotProps` interface (after `isPast`):
```tsx
  onCreateManualJob?: (techName: string, day: string, time: string) => void;
```

#### Add to `DroppableTimeSlot` function signature:
```tsx
{ techName, day, time, jobs, onJobClick, isPast = false, onCreateManualJob }
```

#### Inside the `DroppableTimeSlot` return, add the "+" button inside the existing container div, after the `jobs.map(...)`:
```tsx
{jobs.length === 0 && !isPast && onCreateManualJob && (
  <button
    onClick={(e) => { e.stopPropagation(); onCreateManualJob(techName, day, time); }}
    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity group/plus"
  >
    <span className="w-5 h-5 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] group-hover/plus:bg-[var(--accent)]/30 transition-all">
      <Plus size={10} />
    </span>
  </button>
)}
```

Add `Plus` to the lucide-react import in `SchedulePageComponents.tsx`.

### 6D. Changes to `tech-pwa/src/app/schedule/page.tsx`

#### Import `ManualJobCreateModal`:
```tsx
import ManualJobCreateModal from "@/components/dashboard/ManualJobCreateModal";
```

#### Add state for manual job creation modal:
```tsx
const [manualJobSlot, setManualJobSlot] = useState<{ techName: string; day: string; time: string } | null>(null);
```

#### Pass `onCreateManualJob` prop through `DroppableScheduleCell` → `DroppableTimeSlot`. In `DroppableScheduleCell`, thread the new prop:
```tsx
// Add to DroppableScheduleCellProps:
onCreateManualJob?: (techName: string, day: string, time: string) => void;

// Pass down to each DroppableTimeSlot:
<DroppableTimeSlot
  ...existing props...
  onCreateManualJob={onCreateManualJob}
/>
```

#### In the schedule grid render (where `DroppableScheduleCell` is rendered per tech per day), pass:
```tsx
onCreateManualJob={(techName, day, time) => setManualJobSlot({ techName, day, time })}
```

#### Add the modal render at the bottom of the page JSX (before the closing `</DashboardLayout>`):
```tsx
{manualJobSlot && (
  <ManualJobCreateModal
    techName={manualJobSlot.techName}
    scheduledDate={manualJobSlot.day}
    scheduledTime={manualJobSlot.time}
    onClose={() => setManualJobSlot(null)}
    onJobCreated={(newJob) => {
      // Add job to the schedule grid optimistically
      setScheduleData(prev => {
        if (!prev) return prev;
        const updated = { ...prev };
        if (!updated.byTech[manualJobSlot.techName]) updated.byTech[manualJobSlot.techName] = {};
        const dayJobs = updated.byTech[manualJobSlot.techName][manualJobSlot.day] ?? [];
        updated.byTech[manualJobSlot.techName][manualJobSlot.day] = [...dayJobs, newJob];
        return updated;
      });
      setManualJobSlot(null);
    }}
  />
)}
```

**Note on `setScheduleData`:** Find the exact state setter name used in `schedule/page.tsx` for the schedule grid data (the state that holds `byTech`). Use that exact setter name.

---

## Feature 7 — Job Detail Visibility in Schedule Grid Cells

When a job is assigned to a tech's time slot, the `GridJobCard` in `SchedulePageComponents.tsx` currently shows only the address. It must also show tenant contact, access info, and description so Robert and the tech can see job details without opening the full modal.

### 7A. Changes to `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`

Find the `GridJobCard` component (the component rendered inside `DroppableTimeSlot` for each scheduled job). It currently shows the address and maybe category. Replace the card body to also show:

**Current `GridJobCard` render** — whatever it currently shows (address only or minimal).

**Replace with:**
```tsx
function GridJobCard({ job, onJobClick }: { job: Job; onJobClick?: (job: Job) => void }) {
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onJobClick?.(job); }}
      className="px-1.5 py-1 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]/20 cursor-pointer hover:bg-[var(--accent)]/20 transition-all group"
    >
      {/* Address */}
      <p className="text-[9px] font-black text-[var(--text-primary)] truncate leading-tight">
        {job.address}{job.unit ? ` · ${job.unit}` : ''}
      </p>
      {/* Category */}
      {job.serviceCategory && (
        <p className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-widest truncate mt-0.5">
          {job.serviceCategory}
        </p>
      )}
      {/* Tenant phone — most critical for field contact */}
      {job.tenantPhone && (
        <a
          href={`tel:${job.tenantPhone}`}
          onClick={e => e.stopPropagation()}
          className="text-[8px] font-bold text-blue-400 hover:text-blue-300 truncate block mt-0.5"
        >
          {job.tenantPhone}
        </a>
      )}
      {/* Access info — appears on hover */}
      {job.accessInfo && (
        <p className="text-[8px] font-bold text-amber-400/70 truncate mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {job.accessInfo}
        </p>
      )}
    </div>
  );
}
```

---

## Updated File List

| # | File | What |
|---|------|------|
| 1 | `tech-pwa/src/app/live/page.tsx` | Add viewMode state, searchRef, KanbanBoard import |
| 2 | `tech-pwa/src/components/dashboard/JobQueueTable.tsx` | Keyboard nav, inline status, actionable links |
| 3 | `tech-pwa/src/components/dashboard/KanbanBoard.tsx` | **NEW FILE** — Kanban implementation |
| 4 | `tech-pwa/src/app/schedule/page.tsx` | Sidebar search, manual job modal state + render |
| 5 | `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx` | "+" on empty slots, job detail in GridJobCard |
| 6 | `tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx` | **NEW FILE** — manual job creation form |

## Additional Verification Steps (Features 5–7)

### Schedule Sidebar Search (`/schedule`)
22. Type "plumb" in the sidebar search box — confirm only plumbing jobs appear in the sidebar list
23. Type a tech name — confirm jobs assigned to that tech appear (or are filtered correctly)
24. Clear the search — confirm all unscheduled jobs return
25. Confirm the search input does NOT filter the schedule grid (only the sidebar)

### Manual Job Creation (`/schedule`)
26. Hover over an empty time slot in any tech's column — confirm a "+" icon appears
27. Click the "+" — confirm ManualJobCreateModal opens showing the tech name, date, and time pre-filled
28. Submit with address and description filled in — confirm job appears in that tech's time slot on the grid immediately (optimistic update)
29. Confirm the newly created job also appears in the Dispatch Queue on `/live` on next page load (it was written to the spreadsheet)
30. Submit without address — confirm error message "Address is required." appears and form does not submit

### Job Detail in Grid Cells (`/schedule`)
31. Assign a job with tenant phone to a tech slot — confirm the phone number is visible as a tappable link in the grid cell
32. Hover a grid cell card — confirm access info appears
33. Click the card — confirm the job detail modal still opens (click-through still works)

---

## Do NOT submit as complete until:
- `git diff --name-only` shows only the 6 files listed in the Updated File List above (plus `KanbanBoard.tsx` and `ManualJobCreateModal.tsx` as new files)
- Zero TypeScript errors
- All 33 verification checks confirmed
- No console errors in DevTools during normal use
