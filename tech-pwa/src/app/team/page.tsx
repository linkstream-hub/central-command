/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TechCard from "@/components/dashboard/TechCard";
import { dashboardRequest, TechStatus } from "@/lib/dashboard-api";
import { Job, TechRosterEntry, FieldStatusEntry } from "@/lib/types";
import { User, ShieldCheck, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DaySchedule {
  date: string;
  dayLabel: string;
  jobs: {
    time: string;
    address: string;
    category: string;
    estimatedHours: number;
  }[];
}

export default function TeamPage() {
  const [loading, setLoading] = useState(true);
  const [techs, setTechs] = useState<TechStatus[]>([]);
  const [todayJobsByTech, setTodayJobsByTech] = useState<Record<string, Job[]>>({});
  const [selectedTech, setSelectedTech] = useState<TechStatus | null>(null);
  const [techSchedule, setTechSchedule] = useState<DaySchedule[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setTimeout(() => setLoading(true), 0);
      try {
        const [resTechs, resField, resDispatch] = await Promise.all([
          dashboardRequest<any>('getTechList'),
          dashboardRequest<any>('getLiveFieldStatus'),
          dashboardRequest<any>('getDispatchData')
        ]);

        // Build map of clocked-in techs by name
        const activeMap: Record<string, FieldStatusEntry> = {};
        if (resField.success) {
          (resField.activeTechs || []).forEach((t: FieldStatusEntry) => {
            activeMap[t.techName] = t;
          });
        }

        // Compute current week Mon–Fri in Pacific time
        const _laFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' });
        const _todayStr = _laFmt.format(new Date());
        const [_yr, _mo, _dy] = _todayStr.split('-').map(Number);
        const _cursor = new Date(_yr, _mo - 1, _dy);
        const _dow = _cursor.getDay();
        _cursor.setDate(_cursor.getDate() + (_dow === 0 ? -6 : 1 - _dow));
        const _weekDates = new Set<string>();
        for (let i = 0; i < 5; i++) {
          const d = new Date(_cursor.getFullYear(), _cursor.getMonth(), _cursor.getDate() + i);
          _weekDates.add(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
        }

        const weekJobMap: Record<string, number> = {};
        const todayJobMap: Record<string, Job[]> = {};

        if (resDispatch.success) {
          (resDispatch.jobs as Job[])
            .filter(j => (j.status === 'Scheduled' || j.status === 'In Progress') && j.scheduledDate && _weekDates.has(j.scheduledDate))
            .forEach(j => {
              const names = String(j.assignedTech || '').split(';').map((s: string) => s.trim()).filter(Boolean);
              names.forEach(n => {
                const rawName = n.split(' #')[0].trim();
                weekJobMap[rawName] = (weekJobMap[rawName] || 0) + 1;
                
                if (j.scheduledDate === _todayStr) {
                  if (!todayJobMap[rawName]) todayJobMap[rawName] = [];
                  todayJobMap[rawName].push(j);
                }
              });
            });
        }

        const mapped: TechStatus[] = (resTechs.techs || []).map((t: TechRosterEntry) => {
          const live = activeMap[t.name] || null;
          return {
            techId:         t.badge || t.name,
            techName:       t.name,
            status:         live ? (live.hasActiveBreak ? 'on-break' : 'active') : (weekJobMap[t.name] > 0 ? 'scheduled' : 'unassigned'),
            currentAddress: live?.address || '',
            elapsedMin:     live?.elapsedMin || 0,
            jobsRemaining:  weekJobMap[t.name] || 0,
            violations:     live?.mealDue ? ['MEAL_BREAK_OVERDUE'] : live?.secondMealDue ? ['SECOND_MEAL_OVERDUE'] : [],
            clockIn:        live?.clockIn || '',
            phone:          t.phone,
            role:           t.role,
            rank:           t.rank,
            skills:         t.skills
          };
        });

        setTodayJobsByTech(todayJobMap);
        setTechs(mapped);
      } catch (e) {
        console.error("TeamPage load error:", e);
        setError("Failed to load team data from Dispatch Command.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const openTechDetails = async (tech: TechStatus) => {
    setSelectedTech(tech);
    setLoadingSchedule(true);
    try {
    // Compute current week dates
    const laFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' });
    const todayStr = laFmt.format(new Date());
    const [yr, mo, dy] = todayStr.split('-').map(Number);
    const cursor = new Date(yr, mo - 1, dy);
    const dow = cursor.getDay();
    cursor.setDate(cursor.getDate() + (dow === 0 ? -6 : 1 - dow));
    const allDates: string[] = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + i);
      allDates.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
    }

    const res = await dashboardRequest<any>('getDispatchData');
    const jobsByDate: Record<string, typeof res.jobs> = {};
    allDates.forEach(d => { jobsByDate[d] = []; });

    if (res.success) {
      (res.jobs as Job[])
        .filter(j =>
          (j.status === 'Scheduled' || j.status === 'In Progress') &&
          j.scheduledDate &&
          jobsByDate[j.scheduledDate] !== undefined &&
          String(j.assignedTech || '').split(';').map((s: string) => s.trim()).includes(tech.techName)
        )
        .forEach(j => jobsByDate[j.scheduledDate].push(j));
    }

    const grouped: DaySchedule[] = allDates.map(d => ({
      date: d,
      dayLabel: new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      jobs: (jobsByDate[d] || []).map((j: Job) => ({
        time: j.scheduledTime || 'TBD',
        address: j.address || 'Unknown',
        category: j.serviceCategory || 'Service',
        estimatedHours: Number(j.estimatedHours) || 0,
      }))
    }));

    setTechSchedule(grouped);
    } catch (e) {
      console.error("Schedule load error:", e);
    } finally {
      setLoadingSchedule(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 relative">
        {error && (
          <div className="bg-urgent/10 border border-urgent/20 rounded-xl p-4 flex items-center gap-3 text-urgent text-[10px] font-black uppercase tracking-widest">
            <AlertTriangle size={14} />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto p-1 hover:bg-urgent/10 rounded-full"><X size={12} /></button>
          </div>
        )}
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic flex items-center">
              Field <span className="text-[var(--accent)] ml-2">Roster</span>
            </h2>
            <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] mt-1">
              {techs.filter(t => t.status === 'active' || t.status === 'on-break').length} On Duty · Total force tracking
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
             <div className="flex items-center space-x-2 px-3 py-1.5 bg-[var(--text-primary)]/5 border border-[var(--border-subtle)] rounded-lg">
                <ShieldCheck size={14} className="text-standard" />
                <span className="text-[9px] font-black text-[var(--text-primary)] uppercase tracking-widest">Compliance Verifed</span>
             </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)]" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {techs.map((tech, i) => (
                <TechCard 
                  key={tech.techId} 
                  tech={tech} 
                  todayJobs={todayJobsByTech[tech.techName] || []} 
                  index={i} 
                  onClick={openTechDetails} 
                />
              ))}
            </div>

            {techs.length === 0 && (
              <div className="py-32 text-center flex flex-col items-center opacity-30">
                <User size={48} className="text-[var(--text-muted)] mb-4" />
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">No techs on roster</h3>
              </div>
            )}
          </>
        )}

        {/* Side Panel Overlay */}
        <AnimatePresence>
          {selectedTech && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTech(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--bg-primary)] border-l border-[var(--border-subtle)] z-[70] shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]">
                   <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-lg">
                        {(selectedTech.techName || '')[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-[var(--text-primary)] leading-none">{selectedTech.techName}</h3>
                        <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">Personnel Detail View</p>
                      </div>
                   </div>
                    <button 
                      onClick={() => setSelectedTech(null)}
                      className="p-2 hover:bg-[var(--accent)]/10 rounded-full text-[var(--text-muted)] transition-colors"
                    >
                      <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                   <section>
                      <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[.2em] mb-4">Week Schedule</h4>
                       {loadingSchedule ? (
                        <div className="space-y-3">
                           {[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-[var(--bg-surface)] rounded-xl animate-pulse border border-[var(--border-subtle)]" />)}
                        </div>
                      ) : (
                        <div className="space-y-3">
                           {techSchedule.map(day => (
                             <div key={day.date}>
                               <div className="flex items-center justify-between mb-2 mt-2">
                                 <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">{day.dayLabel}</span>
                                 <span className="text-[9px] font-black text-[var(--accent)]">
                                   {day.jobs.reduce((s, j) => s + j.estimatedHours, 0).toFixed(1)} hrs
                                 </span>
                               </div>
                               {day.jobs.length === 0 ? (
                                 <div className="mb-3 px-3 py-2 rounded-lg border border-dashed border-white/10 text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest opacity-40 text-center">
                                   No assignments
                                 </div>
                               ) : (
                                 day.jobs.map((job, idx) => (
                                   <div key={idx} className="mb-2 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--accent)]/[0.02] transition-colors">
                                     <div className="flex items-center justify-between mb-1">
                                       <span className="text-[9px] font-black text-[var(--accent)] uppercase tracking-tighter">{job.time}</span>
                                       <span className="text-[8px] font-black text-[var(--text-muted)] uppercase">{job.estimatedHours}h · {job.category}</span>
                                     </div>
                                     <p className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">{job.address}</p>
                                   </div>
                                 ))
                               )}
                             </div>
                           ))}
                        </div>
                      )}
                   </section>

                   <section className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                      <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[.2em] mb-3">Weekly Summary</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-center">
                          <div className="text-xl font-black text-[var(--text-primary)]">{selectedTech?.jobsRemaining ?? 0}</div>
                          <div className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-0.5">Jobs This Week</div>
                        </div>
                        <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-center">
                          <div className={`text-xl font-black ${selectedTech?.status === 'active' ? 'text-standard' : selectedTech?.status === 'on-break' ? 'text-pte' : 'text-[var(--text-muted)]'}`}>
                            {selectedTech?.status ?? 'unassigned'}
                          </div>
                          <div className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-0.5">Current Status</div>
                        </div>
                      </div>
                   </section>
                </div>

                <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                   <button className="w-full py-4 bg-[var(--accent)] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:brightness-110 transition-all">
                      Dispatch Direct Message
                   </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

