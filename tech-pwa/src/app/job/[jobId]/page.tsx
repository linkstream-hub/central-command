/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { PhoneCall, Navigation, Flag, Info, CheckCircle, ChevronLeft, Send, AlertCircle } from "lucide-react";
import { Job } from "@/lib/types";
import { apiGet, apiCall } from "@/lib/syncQueue";
import CameraUpload from "@/components/CameraUpload";
import { getSession } from "@/lib/auth";
import { getCurrentPosition } from "@/lib/location";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { useTranslation } from "@/lib/i18n";

import { getShiftSession } from "@/lib/tech-session";

export default function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { jobId } = use(params);
  const { toast } = useToast();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const shift = getShiftSession();

  // Flag Modal States
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagNote, setFlagNote] = useState("");
  const [flagging, setFlagging] = useState(false);

  // Timer & UI States
  const [timeWorkedMinutes, setTimeWorkedMinutes] = useState(0);
  const [timeWorkedSeconds, setTimeWorkedSeconds] = useState(0);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (!getSession()) { router.replace('/login'); return; }

    async function loadJob() {
      try {
        const res = await apiGet<any>("getJobs");
        if (res.success) {
          const j = res.jobs.find((x: Job) => x.jobId === jobId);
          if (j) setJob(j);
        }
      } catch {
        const cached = localStorage.getItem("apt_cached_jobs");
        if (cached) {
          const jobs = JSON.parse(cached);
          const j = jobs.find((x: Job) => x.jobId === jobId);
          if (j) setJob(j);
        }
      } finally {
        setLoading(false);
      }
    }
    loadJob();
  }, [jobId, router]);

  useEffect(() => {
    if (shift && job?.status !== "Complete") {
      const interval = setInterval(() => {
        const start = new Date(shift.clockInTime).getTime();
        const now = Date.now();
        const totalSeconds = Math.floor((now - start) / 1000);
        const breakSeconds = (shift.breakDurationMinutes || 0) * 60;
        const netSeconds = Math.max(0, totalSeconds - breakSeconds);
        
        setTimeWorkedSeconds(netSeconds);
        setTimeWorkedMinutes(Math.floor(netSeconds / 60));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [shift, job]);

  const handleMarkComplete = async () => {
    setLocationStatus(t('locking_position'));
    const coords = await getCurrentPosition();
    const res = await apiCall<any>("markComplete", { 
      jobId: job?.jobId, 
      recordId: shift?.shiftId,
      notes: "Job completed by technician.", 
      lat: coords?.lat, 
      lng: coords?.lng 
    });
    if (res.success) {
        if (job) setJob({ ...job, status: "Complete" });
        navigator.vibrate?.([50, 30, 50]);
        setShowCelebration(true);
        setTimeout(() => {
            setShowCelebration(false);
            router.push('/jobs');
        }, 2000);
    }
  };

  const handleFlagSubmit = async () => {
    if (!flagNote.trim()) return;
    setFlagging(true);
    await apiCall<any>("flagIssue", { jobId: job?.jobId, notes: flagNote });
    setFlagging(false);
    setShowFlagModal(false);
    setFlagNote("");
    toast.success(t('toast_flag_success'));
  };

  if (loading || !job) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] p-6 space-y-6">
        <div className="h-10 w-24 bg-[var(--bg-surface)] rounded-xl animate-pulse" />
        <div className="h-14 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl animate-pulse" />
        <div className="h-40 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl animate-pulse" />
        <div className="h-24 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl animate-pulse" />
        <div className="h-14 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl animate-pulse" />
      </div>
    );
  }

  const complianceWarnings = [];
  if (timeWorkedMinutes >= 270 && (shift?.breakDurationMinutes || 0) === 0) {
    complianceWarnings.push(t('rest_break_reminder'));
  }
  if (timeWorkedMinutes >= 300 && (shift?.breakDurationMinutes || 0) < 30) {
    complianceWarnings.push(t('meal_break_required'));
  }

  function formatTimer(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-48">
      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center gap-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }}
              transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
              className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
              <CheckCircle size={48} className="text-green-400" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
              <p className="text-2xl font-black text-white italic tracking-tight uppercase">{t('job_complete')}</p>
              <p className="text-sm text-white/50 font-bold uppercase tracking-widest mt-1">{t('excellent_work')}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="px-6 pt-8 pb-4 flex items-center gap-4">
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push("/jobs")} 
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-all active:scale-90 backdrop-blur-sm">
          <ChevronLeft size={24} />
        </motion.button>
        <div className="min-w-0">
          <h1 className="text-lg font-black text-[var(--text-primary)] truncate tracking-tight">{job.address}</h1>
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{job.serviceCategory} • {job.jobId}</p>
        </div>
      </header>

      <main className="px-6 space-y-6">
        
        {/* Timer Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={`w-2 h-2 rounded-full ${
              shift?.status === 'active' ? "bg-green-500 animate-pulse" :
              shift?.status === 'on-break' ? "bg-purple-500 animate-pulse" : "bg-gray-500"
            }`} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {shift?.status === 'active' ? t('shift_active') :
               shift?.status === 'on-break' ? t('rest_period') : t('service_pending')}
            </span>
          </div>
          
          {job.status !== "Complete" ? (
            <motion.div key={timeWorkedSeconds} className="font-mono text-5xl font-black text-[var(--text-primary)] tracking-tighter"
              initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
              {formatTimer(timeWorkedSeconds)}
            </motion.div>
          ) : (
            <div className="font-mono text-5xl font-black text-[var(--text-muted)] tracking-tighter">00:00:00</div>
          )}
          
          {shift && (
            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest bg-black/20 py-2 rounded-xl">
              <span>{t('clock_in_label')} {new Date(shift.clockInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              {(shift.breakDurationMinutes ?? 0) > 0 && <span className="text-blue-500">{t('break_label')} {shift.breakDurationMinutes}m</span>}
            </div>
          )}
        </div>

        {/* Compliance & Location Alerts */}
        <AnimatePresence>
          {(complianceWarnings.length > 0 || locationStatus) && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="space-y-2 overflow-hidden">
                {locationStatus && (
                    <div className="bg-blue-600/10 border border-blue-600/20 rounded-xl p-4 flex items-center gap-3 text-blue-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
                        <Navigation size={14} />
                        <span>{locationStatus}</span>
                    </div>
                )}
                {shift?.status === 'active' && complianceWarnings.map((warn, i) => {
                    const isCrit = warn.includes("meal") || warn.includes("10 hours");
                    return (
                        <div key={i} className={`rounded-xl p-4 flex items-start gap-3 text-[10px] font-bold uppercase tracking-wide border ${isCrit ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-amber-500/10 border-amber-500/20 text-amber-400"}`}>
                            <AlertCircle size={16} className="shrink-0" />
                            <span>{warn}</span>
                        </div>
                    );
                })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Access & Tenant Section */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4 backdrop-blur-md">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">{t('section_contact')}</p>
              <h2 className="text-xl font-black text-[var(--text-primary)] truncate tracking-tight">{job.tenantName || t('tenant_not_listed')}</h2>
              {job.tenantPhone && <p className="text-sm font-bold text-blue-500 mt-1">{job.tenantPhone}</p>}
            </div>
            {job.tenantPhone && (
              <a href={`tel:${job.tenantPhone}`} className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 active:scale-90 transition-transform">
                <PhoneCall size={20} fill="currentColor" />
              </a>
            )}
          </div>
          
          <div className="bg-black/20 border border-white/5 p-4 rounded-2xl flex gap-3 text-xs leading-relaxed text-[var(--text-secondary)]">
            <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="font-medium">{job.accessInfo || t('no_access_info')}</p>
          </div>
        </section>

        {/* Task Description */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-3 backdrop-blur-md">
          <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">{t('section_scope')}</p>
          <p className="text-sm font-medium leading-relaxed text-[var(--text-primary)]">{job.description}</p>
        </section>

        {/* Documentation / Photos */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">{t('section_docs')}</p>
            <div className="h-px flex-1 bg-[var(--border-subtle)] ml-4" />
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {/* Show before photos always if job is incomplete */}
            {job.status !== "Complete" && (
              <CameraUpload photoType="before" jobId={job.jobId} />
            )}
            <CameraUpload photoType="receipt" jobId={job.jobId} />
            {/* Show after photos if job is incomplete (can be done anytime during job) */}
            {job.status !== "Complete" && (
              <CameraUpload photoType="after" jobId={job.jobId} />
            )}
          </div>
        </section>

        {/* Flag Issue Button */}
        <button onClick={() => setShowFlagModal(true)} className="w-full py-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:text-red-400 transition-colors">
          <Flag size={14} /> {t('flag_title')}
        </button>

      </main>

      {/* Flag Issue Bottom Sheet */}
      <AnimatePresence>
        {showFlagModal && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowFlagModal(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-[var(--surface-raised)] border-t border-white/10 rounded-t-[2.5rem] p-8 space-y-6 z-50">
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto" />
              <div className="space-y-1">
                <p className="text-xl font-black text-white italic uppercase tracking-tight">{t('flag_title')}</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t('flag_subtitle')}</p>
              </div>
              <textarea
                value={flagNote} onChange={e => setFlagNote(e.target.value)}
                placeholder={t('flag_placeholder')}
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm text-white placeholder-white/20 resize-none h-32 focus:border-red-500/50 focus:bg-black/60 transition-all outline-none"
              />
              <button onClick={handleFlagSubmit} disabled={flagging || !flagNote.trim()}
                className="w-full bg-red-600 disabled:opacity-40 text-white font-black uppercase tracking-widest rounded-2xl py-5 shadow-xl shadow-red-900/20 active:scale-95 transition-transform flex items-center justify-center gap-3">
                {flagging ? t('btn_flag_loading') : <><Send size={16} /> {t('btn_flag_submit')}</>}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pb-20 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto max-w-lg mx-auto">
          {job.status !== "Complete" && (
            <button onClick={handleMarkComplete}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-[0.2em] rounded-[2rem] py-6 transition-all active:scale-[0.96] shadow-[0_20px_50px_rgba(22,163,74,0.3)]">
              {t('btn_mark_complete')}
            </button>
          )}

          {job.status === "Complete" && (
            <div className="w-full text-center py-6 rounded-[2rem] border border-green-500/20 text-green-400 text-xs font-black uppercase tracking-[0.3em] bg-green-500/5 backdrop-blur-md">
              <CheckCircle size={14} className="inline mr-2 -mt-1" /> {t('btn_verified_complete')}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
