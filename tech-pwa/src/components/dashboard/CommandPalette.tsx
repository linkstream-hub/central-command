"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { Search, MapPin, Clock, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { dashboardRequest } from "@/lib/dashboard-api";
import { Job } from "@/lib/types";

const PRIORITY_COLOR: Record<string, string> = {
  '1-URGENT':      'text-red-400',
  '2-TURNOVER':    'text-orange-400',
  '3-PTE-PENDING': 'text-yellow-400',
  '4-STANDARD':    'text-zinc-500',
};

interface CommandPaletteProps {
  onSelectJob?: (job: Job) => void;
}

export default function CommandPalette({ onSelectJob }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Toggle on ⌘K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Lazy-load jobs when palette opens for the first time
  useEffect(() => {
    if (open && !loaded) {
      dashboardRequest('getDispatchData').then(res => {
        if (res.success && Array.isArray(res.jobs)) {
          setJobs(res.jobs.filter((j: Job) => j.status !== 'Archived'));
        }
        setLoaded(true);
      });
    }
  }, [open, loaded]);

  const close = useCallback(() => setOpen(false), []);

  const runSelect = (job: Job) => {
    close();
    onSelectJob?.(job);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="relative w-full max-w-2xl bg-[var(--bg-primary)]/95 backdrop-blur-xl border border-[var(--border-subtle)] shadow-[0_0_80px_rgba(0,0,0,0.7)] rounded-3xl overflow-hidden flex flex-col max-h-[60vh]"
          >
            <Command shouldFilter className="flex flex-col flex-1 overflow-hidden">
              {/* Input row */}
              <div className="flex items-center border-b border-[var(--border-subtle)] px-6 h-16 shrink-0">
                <Search className="mr-4 h-4 w-4 text-[var(--text-muted)] shrink-0" />
                <Command.Input
                  autoFocus
                  placeholder="Search jobs, techs, or addresses..."
                  className="flex-1 bg-transparent text-sm font-bold text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                />
              </div>

              {/* Results */}
              <Command.List className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <Command.Empty className="py-16 text-center">
                  <p className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                    {loaded ? 'No jobs found' : 'Loading...'}
                  </p>
                </Command.Empty>

                {jobs.length > 0 && (
                  <Command.Group
                    heading="Work Orders"
                    className="px-2 pt-3 pb-1 text-[9px] uppercase font-black tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    {jobs.map(job => (
                      <Command.Item
                        key={job.jobId}
                        value={`${job.address} ${job.unit} ${job.serviceCategory} ${job.assignedTech} ${job.rmName} ${job.jobId}`}
                        onSelect={() => runSelect(job)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm transition-all hover:bg-[var(--accent)]/8 data-[selected=true]:bg-[var(--accent)]/10 group"
                      >
                        <MapPin size={14} className={`shrink-0 ${PRIORITY_COLOR[job.priority] || 'text-zinc-500'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-black text-[var(--text-primary)] truncate group-data-[selected=true]:text-[var(--accent)] transition-colors">
                            {job.address}{job.unit ? ` · Unit ${job.unit}` : ''}
                          </p>
                          <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest truncate mt-0.5">
                            {job.serviceCategory}
                            {job.assignedTech ? ` · ${job.assignedTech.split(' #')[0]}` : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {(job.status === 'Scheduled' || job.status === 'In Progress') && (
                            <Clock size={11} className="text-emerald-400" />
                          )}
                          {job.priority === '1-URGENT' && (
                            <AlertTriangle size={11} className="text-red-400" />
                          )}
                          <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded-full">
                            {job.status}
                          </span>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}
              </Command.List>

              {/* Footer hint */}
              <div className="px-6 py-3 border-t border-[var(--border-subtle)] shrink-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]/40 text-center">
                  {jobs.length > 0 ? `${jobs.length} active work orders` : ''}
                </p>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
