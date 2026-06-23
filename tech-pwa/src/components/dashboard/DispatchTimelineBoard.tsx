"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  PointerSensor, useSensor, useSensors, useDroppable, useDraggable
} from "@dnd-kit/core";
import { Job, JobStatus } from "@/lib/types";
import { dashboardRequest } from "@/lib/dashboard-api";
import { AlertTriangle, Navigation } from "lucide-react";
import JobAssignmentModal from "./JobAssignmentModal";

interface DispatchTimelineBoardProps {
  jobs: Job[];
  roster?: { techName: string; badge?: string | null }[];
  searchQuery?: string;
  onJobClick?: (job: Job) => void;
  onJobUpdated?: (updatedJob: Job) => void;
}

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16]; // 8 AM to 4 PM
const TOTAL_HOURS = HOURS.length;

function TimelineCell({ techName, hour }: { techName: string, hour: number }) {
  const { isOver, setNodeRef } = useDroppable({ id: `${techName}|${hour}` });
  return (
    <div 
      ref={setNodeRef} 
      className={`flex-1 border-r border-white/5 transition-colors ${
        isOver ? 'bg-[var(--accent)]/20 ring-1 ring-inset ring-[var(--accent)] shadow-[inset_0_0_15px_rgba(var(--accent-rgb),0.5)]' : ''
      }`} 
    />
  );
}

function DraggableJobCard({ job, onJobClick, overlay = false }: { job: Job; onJobClick?: (job: Job) => void; overlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.jobId,
    data: { job },
  });

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  const pInfo = job.priority?.includes('URGENT') ? 'border-red-500/50 bg-red-500/10 text-red-400' 
              : job.priority?.includes('TURNOVER') ? 'border-purple-500/50 bg-purple-500/10 text-purple-400'
              : 'border-[var(--border-subtle)] bg-[#151f32] text-white hover:bg-[#1a253c]';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => { if (!isDragging) { e.stopPropagation(); onJobClick?.(job); } }}
      className={`
        relative rounded-lg border p-2 flex flex-col justify-between overflow-hidden
        cursor-grab active:cursor-grabbing select-none transition-all h-[64px]
        hover:border-[var(--accent)]/60 hover:shadow-[0_0_15px_rgba(0,180,216,0.3)]
        ${overlay ? 'shadow-2xl ring-1 ring-[var(--accent)] rotate-2 scale-105 z-50 w-[200px] bg-[#1a253c] !opacity-100' : pInfo}
        ${isDragging && !overlay ? 'opacity-30' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold leading-tight truncate">
          {job.address}{job.unit ? ` · Unit ${job.unit}` : ''}
        </p>
      </div>
      <p className="text-[8px] font-black uppercase truncate opacity-70 mt-1">
        {job.serviceCategory}
      </p>
      <div className="absolute bottom-1 right-1 text-[8px] font-black text-white bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-md">
        {job.estimatedHours || 2}H
      </div>
    </div>
  );
}

function TechTimelineRow({ tech, jobs, onJobClick }: { tech: { name: string; skills: string; load: number }; jobs: Job[]; onJobClick?: (job: Job) => void; }) {
  const totalHours = jobs.reduce((sum, j) => sum + (j.estimatedHours || 2), 0);
  const loadPercentage = Math.min(Math.round((totalHours / 8) * 100), 100);

  return (
    <div className="flex border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] min-h-[80px]">
      <div className="w-[280px] shrink-0 border-r border-[var(--border-subtle)] p-3 flex flex-col justify-center space-y-2 bg-[#0f1522] z-20 sticky left-0 shadow-[4px_0_15px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-[12px] font-black text-white truncate w-40">{tech.name}</h4>
            <div className="flex gap-1 mt-1">
              <span className="text-[8px] font-bold bg-[var(--accent)]/20 text-[var(--accent)] px-1.5 py-0.5 rounded border border-[var(--accent)]/30 truncate max-w-[120px]">
                {tech.skills}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-white/70">{loadPercentage}% LOAD</span>
            <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
              <div className={`h-full ${loadPercentage > 80 ? 'bg-red-400' : 'bg-[var(--accent)]'}`} style={{ width: `${loadPercentage}%` }} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-[var(--text-muted)] uppercase tracking-widest font-bold">
          <Navigation size={10} className="text-blue-400" /> Travel: Coming Soon
        </div>
      </div>

      <div className="flex-1 flex relative min-w-[800px]">
        {/* Background Grid & Drop Zones */}
        <div className="absolute inset-0 flex">
          {HOURS.map(h => (
            <TimelineCell key={h} techName={tech.name} hour={h} />
          ))}
        </div>

        {/* Placed Jobs */}
        {jobs.map(job => {
          let startHour = 8;
          if (job.scheduledTime) {
            const [h, m] = job.scheduledTime.split(':').map(Number);
            startHour = h + (m / 60);
          }
          startHour = Math.max(HOURS[0], Math.min(startHour, HOURS[HOURS.length - 1]));
          const duration = job.estimatedHours || 2;
          
          const leftPct = ((startHour - HOURS[0]) / TOTAL_HOURS) * 100;
          const widthPct = (Math.min(duration, HOURS[HOURS.length - 1] - startHour + 1) / TOTAL_HOURS) * 100;

          return (
            <div 
              key={job.jobId} 
              className="absolute top-1 bottom-1 z-10" 
              style={{ left: `${leftPct}%`, width: `${widthPct}%`, paddingRight: '4px', paddingLeft: '4px' }}
            >
              <DraggableJobCard job={job} onJobClick={onJobClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DispatchTimelineBoard({ jobs, roster = [], searchQuery = '', onJobClick, onJobUpdated }: DispatchTimelineBoardProps) {
  const [draggingJob, setDraggingJob] = useState<Job | null>(null);
  const [pendingDrop, setPendingDrop] = useState<{ job: Job; tech: string; hour: string } | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const visibleJobs = jobs.filter(j => j.status !== 'Complete' && j.status !== 'Archived');
  
  const backlogJobs = visibleJobs.filter(j => !j.scheduledTime && j.status === 'Ready to Schedule');
  const scheduledJobs = visibleJobs.filter(j => j.scheduledTime || j.status === 'Scheduled' || j.status === 'In Progress');

  const techs = useMemo(() => {
    const map = new Map<string, { name: string; skills: string; load: 0 }>();
    roster.forEach(t => {
      const techName = t.techName || t.name;
      if (techName && techName !== 'Unassigned') {
        map.set(techName, { name: techName, skills: t.skills ? Object.keys(t.skills).join(', ') : 'General', load: 0 });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [roster]);

  function handleDragStart(event: DragStartEvent) {
    setDraggingJob(event.active.data.current?.job as Job ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    setDraggingJob(null);
    const { active, over } = event;
    if (!over) return;
    
    const job = active.data.current?.job as Job;
    const overId = String(over.id);
    
    let newTech = '';
    let newHour = '';

    if (overId === 'UNASSIGNED') {
      const updatedJob = { ...job, assignedTech: '', status: 'Ready to Schedule' as JobStatus, scheduledTime: '' };
      onJobUpdated?.(updatedJob);
      await dashboardRequest('updateJob', { job: updatedJob });
      return;
    }

    if (overId.includes('|')) {
      const [tech, hour] = overId.split('|');
      newTech = tech;
      newHour = `${hour.padStart(2, '0')}:00`;
    }

    if (newTech && newHour) {
      setPendingDrop({ job, tech: newTech, hour: newHour });
    }
  }

  async function handleConfirmDrop(hours: number, assignedTechs: string[]) {
    if (!pendingDrop) return;
    const { job, hour } = pendingDrop;
    const techString = assignedTechs.join('; ');
    const updatedJob = { ...job, assignedTech: techString, status: 'Scheduled' as JobStatus, scheduledTime: hour, estimatedHours: hours };
    onJobUpdated?.(updatedJob);
    setPendingDrop(null);
    await dashboardRequest('updateJob', { job: updatedJob });
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-full w-full gap-6">
        {/* The Timeline Canvas (LEFT) */}
        <div className="flex-1 overflow-hidden flex flex-col border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-primary)] shadow-lg">
          <div className="flex border-b border-[var(--border-subtle)] bg-[#0f1522]">
            <div className="w-[280px] shrink-0 border-r border-[var(--border-subtle)] p-3 flex items-center z-30 sticky left-0 shadow-[4px_0_15px_rgba(0,0,0,0.5)] bg-[#0f1522]">
              <span className="text-[11px] font-black uppercase text-white tracking-widest">Assignment Board</span>
            </div>
            <div className="flex-1 flex min-w-[800px]">
              {HOURS.map(h => (
                <div key={h} className="flex-1 border-r border-white/5 py-2 px-1 text-center shrink-0">
                  <span className="text-[10px] font-bold text-[var(--text-muted)]">
                    {h > 12 ? h - 12 : h} {h === 12 ? 'PM' : h > 12 ? 'PM' : 'AM'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-auto custom-scrollbar flex-1 relative">
            {techs.map(tech => (
              <TechTimelineRow key={tech.name} tech={tech} jobs={scheduledJobs.filter(j => j.assignedTech?.includes(tech.name))} onJobClick={onJobClick} />
            ))}
          </div>
        </div>

        {/* Backlog Droppable Zone for Unassigning Jobs (RIGHT) */}
        <div className="w-[320px] shrink-0 flex flex-col border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-primary)] relative shadow-lg">
          <DroppableUnassignedZone isDragging={!!draggingJob} />
          
          <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[#0f1522] z-10">
            <h3 className="text-[11px] font-black text-[var(--accent)] uppercase tracking-widest">Ready to Dispatch</h3>
            <span className="bg-white/10 text-white px-2 py-0.5 rounded text-[10px] font-black">
              {backlogJobs.length}
            </span>
          </div>
          
          <div className="p-3 flex-1 overflow-y-auto custom-scrollbar z-10">
            <div className="grid grid-cols-2 gap-2">
              {backlogJobs.map(job => (
                <DraggableJobCard key={job.jobId} job={job} onJobClick={onJobClick} />
              ))}
              {backlogJobs.length === 0 && (
                <div className="col-span-2 text-center text-[10px] uppercase tracking-widest text-[var(--text-muted)] py-10 opacity-50 font-black">
                  No jobs to schedule
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DragOverlay>
        {draggingJob ? <DraggableJobCard job={draggingJob} overlay /> : null}
      </DragOverlay>

      <JobAssignmentModal
        isOpen={!!pendingDrop}
        onClose={() => setPendingDrop(null)}
        onConfirm={handleConfirmDrop}
        job={pendingDrop?.job || null}
        primaryTech={pendingDrop?.tech || ''}
        startTime={pendingDrop?.hour || ''}
        roster={techs}
      />
    </DndContext>
  );
}

function DroppableUnassignedZone({ isDragging }: { isDragging: boolean }) {
  const { isOver, setNodeRef } = useDroppable({ id: 'UNASSIGNED' });
  if (!isDragging) return null;
  return (
    <div 
      ref={setNodeRef} 
      className={`absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl transition-all border-2 ${
        isOver ? 'border-red-500 bg-red-500/20' : 'border-dashed border-white/20'
      }`}
    >
      <span className="text-xs font-black uppercase tracking-widest text-white">
        Drop to Unassign
      </span>
    </div>
  );
}
