'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Job } from '@/lib/types';
import { TechStatus } from '@/lib/dashboard-api';

interface ManualScheduleModalProps {
  job: Job | null;
  techs: TechStatus[];
  weekDates: string[];        // ISO date strings for the current week
  open: boolean;
  onClose: () => void;
  onConfirm: (techName: string, date: string, time: string, hours: number) => void;
}

const DURATION_OPTIONS = [1, 2, 4, 6, 8];
const TIME_OPTIONS = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];

export default function ManualScheduleModal({
  job, techs, weekDates, open, onClose, onConfirm
}: ManualScheduleModalProps) {
  const [tech, setTech]   = useState('');
  const [date, setDate]   = useState('');
  const [time, setTime]   = useState('08:00');
  const [hours, setHours] = useState(4);

  if (!job) return null;

  const canConfirm = !!tech && !!date;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[var(--bg-card,#111)] border border-[var(--border-subtle,rgba(255,255,255,0.08))] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
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
                className="w-full bg-white/5 border border-[var(--border-subtle,rgba(255,255,255,0.08))] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/40"
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
                className="w-full bg-white/5 border border-[var(--border-subtle,rgba(255,255,255,0.08))] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/40"
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
                  className="w-full bg-white/5 border border-[var(--border-subtle,rgba(255,255,255,0.08))] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/40"
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
