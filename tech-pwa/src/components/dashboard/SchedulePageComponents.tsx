"use client";

import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Job } from '@/lib/types';
import { TechStatus } from '@/lib/dashboard-api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, MapPin, Users, ChevronRight, X as CloseIcon, 
  Check, AlertTriangle, Plus, Search 
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Draggable Job Card (Sidebar)
// ─────────────────────────────────────────────────────────────────────────────

interface DraggableJobCardProps {
  job: Job;
  onEstimateChange?: (jobId: string, hours: number) => void;
}

interface DateDetailModalProps {
  dateStr: string | null;
  techs: TechStatus[];
  gridData: Record<string, Record<string, Job[]>>;
  isOpen: boolean;
  onClose: () => void;
  onJobClick?: (job: Job) => void;
}

export function DraggableJobCard({ job, onEstimateChange }: DraggableJobCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `sidebar-${job.jobId}`,
    data: { job, sourceType: 'sidebar' }
  });

  const [editingEst, setEditingEst] = React.useState(false);
  const [estDraft, setEstDraft]     = React.useState<string>('');

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl cursor-grab active:cursor-grabbing hover:border-[var(--accent)]/50 hover:bg-white/[0.05] transition-all group scale-100 shadow-[0_4px_20px_rgba(0,0,0,0.2)] ${isDragging ? 'opacity-50 scale-95 shadow-2xl' : 'opacity-100'}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest border ${
              job.priority.includes('URGENT') ? 'text-urgent border-urgent/30 bg-urgent/10' :
              job.priority.includes('TURNOVER') ? 'text-turnover border-turnover/30 bg-turnover/10' :
              'text-text-muted border-white/5 bg-white/5'
            }`}>
              {job.priority.split('-')[1] || job.priority}
            </span>
            <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest truncate max-w-[120px]">
              {job.serviceCategory}
            </span>
          </div>
          <h4 className="text-xs font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
            {job.address}
          </h4>
          {job.assignedTech && (job.assignedTech.includes(';') || job.assignedTech.includes(',')) && (
            <div className="flex items-center gap-1 mt-0.5">
              <Users size={9} className="text-[var(--accent)] opacity-70" />
              <span className="text-[8px] font-black text-[var(--accent)] uppercase tracking-widest opacity-70">
                Crew · {(job.assignedTech.includes(';') ? job.assignedTech.split(';') : job.assignedTech.split(',')).length} techs
              </span>
            </div>
          )}
        </div>
        <ChevronRight size={14} className="text-[var(--text-muted)] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-[var(--text-muted)] tracking-widest">
          <div className="flex items-center gap-1.5">
            <MapPin size={10} className="text-[var(--accent)]" />
            <span>{job.unit ? `Unit ${job.unit}` : 'Main'}</span>
          </div>
        </div>

        {/* Inline estimate editor */}
        <div className="flex items-center gap-1">
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
                setEstDraft(String(job.estimatedHours || 4));
                setEditingEst(true);
              }}
            >
              {job.estimatedHours ? `${job.estimatedHours}H` : '4H EST'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export const TIME_SLOTS  = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
export const TIME_LABELS = ['8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM'];

// ─────────────────────────────────────────────────────────────────────────────
// Draggable Grid Card (Rescheduling)
// ─────────────────────────────────────────────────────────────────────────────

interface GridJobCardProps {
  job: Job;
  onJobClick?: (job: Job) => void;
}

export function GridJobCard({ job, onJobClick }: GridJobCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `grid-${job.jobId}`,
    data: { job, sourceType: 'grid' }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => { e.stopPropagation(); onJobClick?.(job); }}
      className={`px-1.5 py-1 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]/20 cursor-pointer hover:bg-[var(--accent)]/20 transition-all group overflow-hidden ${
        isDragging ? 'opacity-50 scale-95 shadow-2xl ring-2 ring-[var(--accent)]' : 'opacity-100'
      }`}
    >
      {/* Address */}
      <p className="text-[9px] font-black text-[var(--text-primary)] truncate leading-tight">
        {job.address}{job.unit ? ` · ${job.unit}` : ''}
      </p>
      {/* Category + tech */}
      <div className="flex items-center gap-1 mt-0.5">
        {job.serviceCategory && (
          <p className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-widest truncate flex-1">
            {job.serviceCategory}
          </p>
        )}
        {job.assignedTech && (
          <span className="text-[7px] font-black text-[var(--accent)]/70 uppercase tracking-widest shrink-0 truncate max-w-[60px]">
            {(job.assignedTech.includes(';') ? job.assignedTech.split(';') : job.assignedTech.split(','))[0].trim().split(' ')[0]}
          </span>
        )}
      </div>
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

// ─────────────────────────────────────────────────────────────────────────────
// Droppable Cell (Grid)
// ─────────────────────────────────────────────────────────────────────────────

interface DroppableTimeSlotProps {
  techName: string;
  day: string;
  time: string;
  jobs: Job[];
  onJobClick?: (job: Job) => void;
  isPast?: boolean;
  onCreateManualJob?: (techName: string, day: string, time: string) => void;
}

export function DroppableTimeSlot({ techName, day, time, jobs, onJobClick, isPast = false, onCreateManualJob }: DroppableTimeSlotProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${techName}-${day}-${time}`,
    data: { techName, day, time }
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative h-[44px] border-b border-white/[0.03] px-1 py-1 transition-colors ${
        isPast ? 'opacity-25 pointer-events-none' :
        isOver ? 'bg-[var(--accent)]/10 ring-1 ring-inset ring-[var(--accent)]/30' : 'hover:bg-white/[0.02]'
      }`}
    >
      <div className="space-y-0.5 relative z-10 w-full h-full overflow-hidden">
        {jobs.map(job => <GridJobCard key={job.jobId} job={job} onJobClick={onJobClick} />)}
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
      </div>
    </div>
  );
}

interface DroppableScheduleCellProps {
  techName: string;
  day: string; // ISO Date string
  jobs?: Job[];
  onJobClick?: (job: Job) => void;
  isPast?: boolean;
  onCreateManualJob?: (techName: string, day: string, time: string) => void;
}

export function DroppableScheduleCell({ techName, day, jobs = [], onJobClick, isPast = false, onCreateManualJob }: DroppableScheduleCellProps) {
  const getSlotJobs = (timeStr: string) => {
    const slotHour = parseInt(timeStr.split(':')[0], 10);
    return jobs.filter(j => {
      if (!j.scheduledTime) return false;
      const jHour = parseInt(j.scheduledTime.split(':')[0], 10);
      return jHour === slotHour;
    });
  };

  return (
    <div className={`flex flex-col border-r border-white/5 bg-transparent ${isPast ? 'opacity-30 pointer-events-none' : ''}`}>
      {/* 52px spacer aligns slots with the tech lane identity row */}
      <div className="h-[52px] shrink-0 border-b border-white/5" />
      {TIME_SLOTS.map((time) => (
        <DroppableTimeSlot 
          key={`${techName}-${day}-${time}`} 
          techName={techName} 
          day={day} 
          time={time} 
          jobs={getSlotJobs(time)} 
          onJobClick={onJobClick} 
          onCreateManualJob={onCreateManualJob}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tech Lane Header (Sidebar for Grid)
// ─────────────────────────────────────────────────────────────────────────────

interface TechLaneHeaderProps {
  techName: string;
  badge?: string;
  todayHours: number;
  weekHours?: number;
  onClick?: () => void;
}

export function TechLaneHeader({ techName, todayHours, weekHours = 0, onClick }: TechLaneHeaderProps) {
  const todayOver = todayHours > 8;
  const weekOver  = weekHours > 40;

  return (
    <div
      className={`h-[28px] shrink-0 flex items-center gap-3 px-3 bg-zinc-900/40 border-y border-white/[0.04] z-10 ${onClick ? 'cursor-pointer hover:bg-[var(--accent)]/5' : ''}`}
      onClick={onClick}
      title={techName}
    >
      <div className="flex-1 h-[1px] bg-white/[0.06]" />
      <span className={`text-[8px] font-black tabular-nums ${todayOver ? 'text-red-400 animate-pulse' : 'text-white/50'}`}>
        {todayHours.toFixed(1)}/8h
      </span>
      <span className="text-white/10 text-[8px] shrink-0">·</span>
      <span className={`text-[8px] font-black tabular-nums shrink-0 ${weekOver ? 'text-red-400' : 'text-white/20'}`}>
        {weekHours.toFixed(1)}wk
      </span>
      <div className="flex-1 h-[1px] bg-white/[0.06]" />
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Duration Selection Modal
// ─────────────────────────────────────────────────────────────────────────────

interface DurationSelectorModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (hours: number, time: string, techName: string) => void;
  sourceType?: string;
  prefillTime?: string;
  prefillTech?: string;
  techs?: TechStatus[];
  existingDailyHours?: number;
  existingJobCount?: number;
}

export function DurationSelectorModal({
  job, isOpen, onClose, onConfirm, sourceType, prefillTime, prefillTech, techs, existingDailyHours, existingJobCount
}: DurationSelectorModalProps) {
  const [selectedHours, setSelectedHours] = React.useState<number>(job && sourceType === 'grid' ? (Number(job.estimatedHours) || 4) : 4);
  const [selectedTime, setSelectedTime] = React.useState<string>(prefillTime || job?.scheduledTime || "08:00");
  const [selectedTech, setSelectedTech] = React.useState<string>(prefillTech || '');

  if (!job) return null;

  const options = [2, 4, 6, 8];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-[var(--bg-surface)] border border-white/10 rounded-3xl shadow-2xl overflow-hidden glass-panel"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Schedule Work Order</h3>
                <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-tight mt-1 truncate max-w-[200px]">
                  {job.address}
                </p>
              </div>
              <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-white transition-colors">
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest px-1">Block Size (Hours)</label>
                <div className="grid grid-cols-4 gap-3">
                  {options.map(h => (
                    <button
                      key={h}
                      onClick={() => setSelectedHours(h)}
                      className={`h-14 rounded-2xl border text-xs font-black transition-all flex flex-col items-center justify-center relative overflow-hidden ${
                        selectedHours === h 
                          ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20' 
                          : 'bg-white/5 border-white/10 text-[var(--text-muted)] hover:border-[var(--accent)]/30'
                      }`}
                    >
                      <span>{h}H</span>
                      {selectedHours === h && (
                        <div className="absolute top-1 right-1">
                          <Check size={8} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {selectedHours === 0 && (
                  <p className="text-[9px] text-urgent font-black uppercase tracking-widest text-center animate-pulse">
                    Duration required — select hours to schedule
                  </p>
                )}
                <p className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-tighter opacity-40 px-1 italic">
                  APT targets filling 8.0 hours per tech/day
                </p>

                {(existingDailyHours ?? 0) > 0 && (
                  <div className={`flex items-start gap-3 px-4 py-3 rounded-2xl border mt-4 ${(existingDailyHours ?? 0) + selectedHours > 8 ? 'bg-red-500/10 border-red-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                    <AlertTriangle size={14} className={(existingDailyHours ?? 0) + selectedHours > 8 ? 'text-red-400 shrink-0 mt-0.5' : 'text-amber-400 shrink-0 mt-0.5'} />
                    <div className="space-y-1">
                      <p className={`text-[10px] font-black uppercase tracking-tight ${(existingDailyHours ?? 0) + selectedHours > 8 ? 'text-red-400' : 'text-amber-400'}`}>
                        {existingJobCount} current job{existingJobCount !== 1 ? 's' : ''} on this day
                      </p>
                      <p className={`text-[9px] font-bold leading-tight opacity-80 ${(existingDailyHours ?? 0) + selectedHours > 8 ? 'text-red-300' : 'text-amber-300'}`}>
                        {existingDailyHours}h already committed. 
                        {(existingDailyHours ?? 0) + selectedHours > 8 ? ' Total will exceed 8.0h threshold.' : ' Verify capacity before confirming.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest px-1">Start Time</label>
                <div className="relative">
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-xs font-black text-white outline-none focus:border-[var(--accent)] appearance-none transition-all"
                  >
                    {[7,8,9,10,11,12,13,14,15,16,17].map(h => (
                      [0, 30].map(m => {
                        const hh = String(h).padStart(2, '0');
                        const mm = String(m).padStart(2, '0');
                        const ampm = h < 12 ? 'AM' : 'PM';
                        const displayH = h > 12 ? h - 12 : h;
                        return (
                          <option key={`${hh}:${mm}`} value={`${hh}:${mm}`} className="bg-[#1a1a1a]">
                            {displayH}:{mm} {ampm}
                          </option>
                        );
                      })
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                    <CloseIcon size={12} className="rotate-45" />
                  </div>
                </div>
              </div>

              {techs && techs.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Assign Technicians</label>
                    <span className="text-[8px] font-bold text-[var(--accent)] uppercase tracking-tighter">Multi-select enabled</span>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-white/5 border border-white/10 rounded-2xl custom-scrollbar">
                    {techs.map(t => {
                      const isSelected = selectedTech.split(';').map(s => s.trim()).includes(t.techName);
                      return (
                        <button
                          key={t.techId}
                          type="button"
                          onClick={() => {
                            const current = selectedTech.split(';').map(s => s.trim()).filter(Boolean);
                            if (isSelected) {
                              setSelectedTech(current.filter(s => s !== t.techName).join('; '));
                            } else {
                              setSelectedTech([...current, t.techName].join('; '));
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all ${
                            isSelected 
                              ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20' 
                              : 'bg-white/5 border-white/10 text-[var(--text-muted)] hover:border-white/30'
                          }`}
                        >
                          {t.techName}
                        </button>
                      );
                    })}
                  </div>
                  {!selectedTech && (
                    <p className="text-[9px] text-urgent font-black uppercase tracking-widest text-center animate-pulse">
                      Select at least one tech to confirm
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => selectedHours > 0 && (!techs?.length || selectedTech) && onConfirm(selectedHours, selectedTime, selectedTech)}
                disabled={selectedHours === 0 || (!!techs?.length && !selectedTech)}
                className={`w-full py-5 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all ${
                  selectedHours === 0 || (!!techs?.length && !selectedTech)
                  ? 'bg-white/10 opacity-30 cursor-not-allowed'
                  : 'bg-[var(--accent)] hover:scale-[1.02] active:scale-95 shadow-xl shadow-[var(--accent)]/20'
                }`}
              >
                Confirm & Lock Assignment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tech Profile Modal
// ─────────────────────────────────────────────────────────────────────────────

interface TechProfileModalProps {
  tech: import('@/lib/dashboard-api').TechStatus | null;
  weekDates: string[];
  gridData: Record<string, Job[]>; // dateStr → jobs for this tech
  isOpen: boolean;
  onClose: () => void;
  onJobClick?: (job: Job) => void;
}

const RANK_LABELS: Record<string, string> = {
  C: 'Captain', L: 'Lieutenant', L1: '1st Lieutenant', L2: '2nd Lieutenant', T: 'Trainee',
};

export function TechProfileModal({ tech, weekDates, gridData, isOpen, onClose, onJobClick }: TechProfileModalProps) {
  if (!tech) return null;

  // tech.rank = rank code (C/L/L1/L2/T); tech.badge = numeric employee ID ("101")
  const rank = RANK_LABELS[tech.rank || ''] || tech.rank || 'Tech';
  const isTrainee = tech.rank === 'T';
  // Skills come back with full names as keys; rating 0 means unrated — omit those
  const skillEntries = tech.skills
    ? Object.entries(tech.skills).filter(([, rating]) => rating > 0)
    : [];
  const totalWeekHours = weekDates.reduce((sum, d) =>
    sum + (gridData[d] || []).reduce((s, j) => s + (Number(j.estimatedHours) || 0), 0), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[var(--bg-surface)] border border-white/10 rounded-3xl shadow-2xl overflow-hidden glass-panel flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-lg border border-[var(--accent)]/20">
                  {tech.techName[0]}
                </div>
                <div>
                  <h3 className="text-base font-black text-[var(--text-primary)] uppercase tracking-tight">{tech.techName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">{rank}</span>
                    {tech.badge && (
                      <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                        EMP #{tech.badge}
                      </span>
                    )}
                    {isTrainee && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[8px] font-black uppercase tracking-widest">
                        Pair Required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <CloseIcon size={18} />
              </button>
            </div>

            {/* Skills */}
            {skillEntries.length > 0 && (
              <div className="px-6 pt-5 pb-4 border-b border-white/5 shrink-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3">Skill Profile</p>
                <div className="flex flex-wrap gap-2">
                  {skillEntries
                    .sort(([, a], [, b]) => a - b)
                    .map(([skillName, rating]) => (
                      <div key={skillName} className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                        rating === 1 ? 'border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]' :
                        rating === 2 ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' :
                        'border-white/10 bg-white/5 text-[var(--text-muted)]'
                      }`}>
                        <span>{skillName}</span>
                        <span className="opacity-60">·</span>
                        <span>{rating === 1 ? 'Primary' : rating === 2 ? 'Secondary' : 'Supporting'}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Week stats */}
            <div className="px-6 py-4 border-b border-white/5 shrink-0">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Week Load</p>
                <span className={`text-sm font-black ${totalWeekHours > 40 ? 'text-urgent' : 'text-[var(--text-primary)]'}`}>
                  {totalWeekHours.toFixed(1)} / 40.0 hrs
                </span>
              </div>
              {totalWeekHours > 40 && (
                <p className="text-[9px] text-urgent font-black uppercase tracking-widest mt-1 animate-pulse">Over capacity this week</p>
              )}
            </div>

            {/* Week schedule */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {weekDates.map(dateStr => {
                const dayJobs = gridData[dateStr] || [];
                const d = new Date(dateStr + 'T12:00:00');
                const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                const dayHours = dayJobs.reduce((s, j) => s + (Number(j.estimatedHours) || 0), 0);

                return (
                  <div key={dateStr} className="border-b border-white/5 last:border-0">
                    <div className="px-6 py-3 bg-white/[0.02] flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                        {dayLabel}
                      </span>
                      <span className={`text-[10px] font-black ${dayHours > 8 ? 'text-urgent' : 'text-[var(--text-primary)]'}`}>
                        {dayHours.toFixed(1)}h
                      </span>
                    </div>
                    <div className="px-6 py-2 space-y-1">
                      {dayJobs.length === 0 ? (
                        <p className="text-[9px] text-[var(--text-muted)] italic py-1">No jobs scheduled</p>
                      ) : (
                        dayJobs.map(job => (
                          <button
                            key={job.jobId}
                            onClick={() => { onJobClick?.(job); onClose(); }}
                            className="w-full text-left py-1 group/job flex items-center justify-between"
                          >
                            <span className="text-[10px] font-bold text-[var(--text-primary)] truncate group-hover/job:text-[var(--accent)] transition-colors">
                              {job.address}
                            </span>
                            <span className="text-[9px] text-[var(--text-muted)] shrink-0">
                              {job.scheduledTime || 'TBD'}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function DateDetailModal({ dateStr, techs, gridData, isOpen, onClose, onJobClick }: DateDetailModalProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  if (!dateStr) return null;

  const d = new Date(dateStr + 'T12:00:00');
  const dayLabel = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Flatten all jobs for the day
  const allJobsForDay = techs.flatMap(tech => {
    const normalizedName = tech.techName.trim().toLowerCase();
    const techJobs = gridData[normalizedName]?.[dateStr] || [];
    return techJobs.map(job => ({ ...job, techName: tech.techName })); // Attach tech to job for rendering
  }).sort((a, b) => (a.scheduledTime || '').localeCompare(b.scheduledTime || ''));

  // Filter based on search query
  const filteredJobs = allJobsForDay.filter(job => {
    const query = searchQuery.toLowerCase();
    return (
      job.address.toLowerCase().includes(query) ||
      (job.unit || '').toLowerCase().includes(query) ||
      job.techName.toLowerCase().includes(query) ||
      job.serviceCategory.toLowerCase().includes(query)
    );
  });

  const totalJobs = filteredJobs.length;
  const totalHours = filteredJobs.reduce((s, j) => s + (Number(j.estimatedHours) || 0), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[var(--bg-surface)] border border-white/10 rounded-3xl shadow-2xl overflow-hidden glass-panel flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 space-y-4 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-[var(--text-primary)] uppercase tracking-tight">{dayLabel}</h3>
                  <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
                    {totalJobs} work order{totalJobs !== 1 ? 's' : ''} {searchQuery ? 'matching' : ''} · {totalHours.toFixed(1)} hrs
                  </p>
                </div>
                <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                  <CloseIcon size={18} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Filter jobs by address, tech, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 outline-none focus:border-[var(--accent)]/50 transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white"
                  >
                    <CloseIcon size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
              {filteredJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-[var(--text-muted)] opacity-30">
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    {searchQuery ? 'No matches found' : 'No work orders scheduled'}
                  </p>
                </div>
              ) : (
                filteredJobs.map((job, idx) => (
                  <button
                    key={`${job.jobId}-${idx}`}
                    onClick={() => { onJobClick?.(job); onClose(); }}
                    className="w-full text-left p-4 bg-[var(--bg-primary)] border border-white/5 rounded-xl hover:border-[var(--accent)]/30 transition-all group flex items-start gap-4"
                  >
                    {/* Tech Avatar (Left) */}
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-xs border border-[var(--accent)]/20 shrink-0">
                      {job.techName[0]}
                    </div>
                    
                    {/* Job Details (Middle) */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                        {job.address}{job.unit ? ` · Unit ${job.unit}` : ''}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-widest truncate">
                          {job.techName}
                        </span>
                        <span className="text-[8px] text-[var(--text-muted)]/50">•</span>
                        <span className="text-[9px] text-[var(--accent)] uppercase tracking-wide font-black">
                          {job.serviceCategory}
                        </span>
                      </div>
                    </div>

                    {/* Time & Hours (Right) */}
                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <span className="text-[10px] font-black text-[var(--text-primary)]">
                        {job.scheduledTime || 'TBD'}
                      </span>
                      <span className="text-[9px] font-black text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                        {job.estimatedHours || '?'}h
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
