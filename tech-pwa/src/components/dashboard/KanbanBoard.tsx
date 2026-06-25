"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors, useDroppable, useDraggable } from "@dnd-kit/core";
import { Job, JobStatus } from "@/lib/types";
import { dashboardRequest } from "@/lib/dashboard-api";
import { Clock, AlertTriangle, ListChecks, type LucideIcon } from "lucide-react";

interface KanbanBoardProps {
  jobs: Job[];
  searchQuery?: string;
  onJobClick?: (job: Job) => void;
  onJobStatusChange?: (jobId: string, newStatus: string) => void;
}

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

// Define our fixed columns
export const KANBAN_COLUMNS: { id: JobStatus; title: string; icon: LucideIcon; color: string }[] = [
  { id: 'Needs Review', title: 'Needs Review', icon: AlertTriangle, color: 'text-red-400' },
  { id: 'PTE Required', title: 'PTE / Blocked', icon: Clock, color: 'text-amber-400' },
  { id: 'Ready to Schedule', title: 'Ready to Dispatch', icon: ListChecks, color: 'text-[var(--accent)]' },
];

async function persistStatusChange(job: Job, newStatus: JobStatus) {
  await dashboardRequest('updateJob', {
    job: { ...job, status: newStatus },
  });
}

// ─── Draggable Card ──────────────────────────────────────────────────────────

function KanbanCard({ job, onJobClick, overlay = false }: { job: Job; onJobClick?: (job: Job) => void; overlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.jobId,
    data: { job },
  });

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  const priorityColor = job.priority?.includes('URGENT') ? 'shadow-[inset_2px_0_0_var(--color-urgent)]' : 
                        job.priority?.includes('TURNOVER') ? 'shadow-[inset_2px_0_0_var(--color-turnover)]' :
                        job.priority?.includes('PTE') ? 'shadow-[inset_2px_0_0_var(--accent)]' :
                        'shadow-[inset_2px_0_0_#1e293b]';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => { if (!isDragging) { e.stopPropagation(); onJobClick?.(job); } }}
      className={`
        rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-3 space-y-2
        cursor-grab active:cursor-grabbing select-none transition-all
        hover:border-[var(--accent)]/40 hover:bg-[#151f32] ${priorityColor}
        ${isDragging && !overlay ? 'opacity-30 scale-[0.98]' : ''}
        ${overlay ? 'shadow-2xl shadow-[var(--accent)]/10 ring-1 ring-[var(--accent)]/50 rotate-2 scale-105 z-50' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-bold text-[var(--text-primary)] leading-tight tracking-wide line-clamp-2">
          {job.address}{job.unit ? ` · Unit ${job.unit}` : ''}
        </p>
        <span className={`shrink-0 px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest border ${PRIORITY_CLASS[job.priority] ?? PRIORITY_CLASS['4-STANDARD']}`}>
          {PRIORITY_LABEL[job.priority] ?? 'ROUTINE'}
        </span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="text-[9px] font-bold text-[var(--color-teal)] uppercase tracking-widest truncate max-w-[120px]">
          {job.serviceCategory || 'General'}
        </p>
        {job.assignedTech && (
          <span className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[var(--text-muted)] truncate max-w-[80px]">
            {job.assignedTech.split(' #')[0]}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Droppable Column ─────────────────────────────────────────────────────────

function KanbanColumn({
  column,
  jobs,
  onJobClick,
}: {
  column: typeof KANBAN_COLUMNS[0];
  jobs: Job[];
  onJobClick?: (job: Job) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col flex-1 shrink-0 min-w-[280px]">
      <div className="flex items-center justify-between mb-3 px-2 border-b border-[var(--border-subtle)] pb-2">
        <div className="flex items-center gap-2">
          <column.icon size={14} className={column.color} />
          <span className={`text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-primary)]`}>
            {column.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black text-[var(--text-muted)] bg-[var(--surface-raised)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-md">
            {jobs.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`
          flex-1 min-h-[600px] rounded-xl p-2 space-y-2 transition-all duration-300 overflow-y-auto custom-scrollbar
          ${isOver
            ? 'bg-[var(--accent)]/[0.08] ring-1 ring-[var(--accent)]/50 shadow-[inset_0_0_20px_rgba(245,185,0,0.05)]'
            : 'bg-[#0f1522] border border-[#162032]'
          }
        `}
      >
        {jobs.length === 0 && (
          <div className="flex items-center justify-center h-24 text-[9px] font-black text-[var(--text-muted)]/40 uppercase tracking-widest border border-dashed border-[var(--border-subtle)]/50 rounded-lg mx-2 mt-2">
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

export default function KanbanBoard({ jobs, searchQuery = '', onJobClick, onJobStatusChange }: KanbanBoardProps) {
  const [draggingJob, setDraggingJob] = useState<Job | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const visibleJobs = jobs.filter(j => {
    if (j.status === 'Archived') return false; // Hide archived everywhere
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !String(j.address || '').toLowerCase().includes(q) &&
        !String(j.description || '').toLowerCase().includes(q) &&
        !String(j.assignedTech || '').toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });

  function handleDragStart(event: DragStartEvent) {
    const job = event.active.data.current?.job as Job;
    setDraggingJob(job ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    setDraggingJob(null);
    const { active, over } = event;
    if (!over) return;
    
    const job = active.data.current?.job as Job;
    const newStatus = over.id as JobStatus;
    
    if (job.status === newStatus) return; // No change

    // Optimistically update
    onJobStatusChange?.(job.jobId, newStatus); 
    
    // Propagate API call
    await persistStatusChange(job, newStatus);
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto custom-scrollbar pb-4">
        {KANBAN_COLUMNS.map(column => {
          // Merge "Awaiting Approval" into the PTE Required (Blocked) column visually
          const colJobs = visibleJobs
            .filter(j =>
              j.status === column.id ||
              (column.id === 'PTE Required' && j.status === 'Awaiting Approval')
            )
            .sort((a, b) =>
              (a.priority ?? '9-UNKNOWN').localeCompare(b.priority ?? '9-UNKNOWN')
            );
          
          return (
            <KanbanColumn
              key={column.id}
              column={column}
              jobs={colJobs}
              onJobClick={onJobClick}
            />
          );
        })}
      </div>

      <DragOverlay>
        {draggingJob ? <KanbanCard job={draggingJob} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
