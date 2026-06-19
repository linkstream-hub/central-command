/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Clock, ChevronRight, RefreshCw, WifiOff, Play, AlertCircle, Loader2 } from "lucide-react";
import { apiGet, apiCall } from "@/lib/syncQueue";
import { Job } from "@/lib/types";
import { getSession, clearSession } from "@/lib/auth";
import { SkeletonCard } from "@/components/Skeleton";
import BottomNav from "@/components/BottomNav";
import { useTranslation } from "@/lib/i18n";
import { type Messages } from "@/lib/i18n/en";
import { getShiftSession, setShiftSession } from "@/lib/tech-session";
import { toast } from "sonner";

const PRIORITY_TOP_BORDER: Record<string, string> = {
  "1-URGENT":      "border-t-red-500",
  "2-TURNOVER":    "border-t-orange-500",
  "3-PTE-PENDING": "border-t-yellow-500",
  "4-STANDARD":    "border-t-blue-500",
  "Scheduled":     "border-t-blue-500",
};

const PRIORITY_CHIP: Record<string, string> = {
  "1-URGENT":      "bg-red-500/20 text-red-400",
  "2-TURNOVER":    "bg-orange-500/20 text-orange-400",
  "3-PTE-PENDING": "bg-yellow-500/20 text-yellow-400",
  "4-STANDARD":    "bg-blue-500/20 text-blue-400",
  "Scheduled":     "bg-blue-500/20 text-blue-400",
};

function getPriorityLabel(priority: string, t: (k: keyof Messages) => string): string {
  if (priority.includes('URGENT')) return t('priority_urgent');
  if (priority.includes('TURNOVER')) return t('priority_turnover');
  if (priority.includes('PTE')) return t('priority_pte');
  return t('priority_standard');
}

export default function TechJobsPage() {
  const { locale, setLocale, t } = useTranslation();
  const router = useRouter();
  const session = getSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [queueCount, setQueueCount] = useState(0);
  const [shiftActive, setShiftActive] = useState(false);
  const [startingShift, setStartingShift] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const prefersReduced = useReducedMotion();
  const firstName = session?.techName?.split(" ")[0] ?? "Tech";
  const hour = new Date().getHours();
  const greetingKey = hour < 12 ? "good_morning" : hour < 17 ? "good_afternoon" : "good_evening";
  const greeting = t(greetingKey as keyof Messages);

  useEffect(() => {
    if (!getSession()) { router.replace("/login"); return; }

    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online",  handleOnline);
    window.addEventListener("offline", handleOffline);

    // Handle synchronous state updates after the main effect to avoid cascading renders
    setTimeout(() => {
      const q = localStorage.getItem("apt_sync_queue");
      if (q) { try { setQueueCount(JSON.parse(q).length); } catch { /**/ } }
      setShiftActive(!!getShiftSession());
    }, 0);

    loadJobs();
    registerPush();

    return () => {
      window.removeEventListener("online",  handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadJobs(isRefresh = false) {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    try {
      const res = await apiGet<any>("getJobs");
      if (res.success) {
        setFetchError(null);
        const PRIORITY_ORDER: Record<string, number> = {
          '1-URGENT': 0, '2-TURNOVER': 1, '3-PTE-PENDING': 2, '4-STANDARD': 3,
        };
        setJobs((res.jobs ?? []).slice().sort((a: Job, b: Job) =>
          (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3)
        ));
        localStorage.setItem("apt_cached_jobs", JSON.stringify(res.jobs ?? []));
      } else {
        setFetchError(t('fetch_error'));
      }
    } catch {
      setFetchError(t('fetch_error'));
      const cached = localStorage.getItem("apt_cached_jobs");
      if (cached) setJobs(JSON.parse(cached));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleStartShift() {
    setStartingShift(true);
    try {
      const res = await apiCall<any>("startShift");
      if (res.success) {
        setShiftSession({
          shiftId: res.shiftId,
          clockInTime: res.startTime,
          breakDurationMinutes: 0,
          status: 'active'
        });
        setShiftActive(true);
        toast.success(t('toast_clocked_in'));
      }
    } catch {
      toast.error(t('toast_error_start_shift'));
    } finally {
      setStartingShift(false);
    }
  }

  async function registerPush() {
    if (!session?.token) return;
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    try {
      const reg = await navigator.serviceWorker.ready;
      const existing = await reg.pushManager.getSubscription();
      if (existing) return;
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) return;
      const padding = "=".repeat((4 - (publicKey.length % 4)) % 4);
      const base64 = (publicKey + padding).replace(/-/g, "+").replace(/_/g, "/");
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
      const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: outputArray });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: session.token, subscription: sub.toJSON() }),
      });
    } catch { /**/ }
  }

  const handleLogout = () => {
    clearSession();
    localStorage.removeItem("apt_cached_jobs");
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      {/* Offline Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            role="alert"
            aria-live="assertive"
            initial={prefersReduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReduced ? 0.15 : 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="bg-amber-900/50 border-b border-amber-700 text-amber-300 text-xs font-bold px-4 py-2 flex items-center gap-2">
            <WifiOff size={12} />
            {t('offline')} {queueCount > 0 ? `— ${queueCount} ${t('events_pending_sync')}` : ""}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-[var(--bg-surface)] px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-white font-semibold text-lg">
            {greeting}, {firstName}
          </h1>
          {!loading && (
            <span className="mt-2 inline-flex items-center text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
              {jobs.length} {jobs.length === 1 ? t('jobs_today_one') : t('jobs_today_other')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
            aria-label={locale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
            className="px-2 py-1 text-[9px] font-black uppercase tracking-widest border border-[var(--border-subtle)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/50 transition-all"
            title={locale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>
          <button onClick={() => router.push('/hours')}
            className="px-2 py-1 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest border border-[var(--border-subtle)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/50 transition-all">
            <Clock size={12} /> {t('nav_hours')}
          </button>
          <button onClick={() => loadJobs(true)}
            aria-label="Refresh jobs"
            className={`p-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all ${refreshing ? "animate-spin" : ""}`}>
            <RefreshCw size={20} />
          </button>
          <button onClick={handleLogout}
            aria-label={`${firstName}'s account — sign out`}
            className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] text-sm font-black hover:border-[var(--accent)]/40 transition-colors">
            {firstName.charAt(0).toUpperCase()}
          </button>
        </div>
      </header>

      {/* Shift Status Banner */}
      <AnimatePresence>
        {!shiftActive && !loading && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0.15 : 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="mx-6 mb-6 p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest leading-none mb-1">Status</p>
                <p className="text-sm font-black text-amber-200 uppercase tracking-tight leading-none">{t('shift_not_started')}</p>
              </div>
            </div>
            <button 
              onClick={handleStartShift}
              disabled={startingShift}
              className="px-6 py-3 bg-[var(--accent)] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[var(--accent)]/20 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2 hover:bg-[var(--accent-hover)]"
            >
              {startingShift ? <Loader2 className="animate-spin" size={14} /> : <Play fill="currentColor" size={12} />}
              {t('btn_start_shift')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Job List */}
      <main className="px-6 space-y-4 pb-16">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        ) : fetchError && jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-24 text-center space-y-4">
            <div className="w-16 h-16 bg-[var(--bg-surface)] border border-red-500/20 rounded-full flex items-center justify-center text-red-400">
              <WifiOff size={32} />
            </div>
            <div className="space-y-2">
              <p className="font-bold text-[var(--text-primary)] text-lg">{t('fetch_error')}</p>
              <button
                onClick={() => loadJobs(true)}
                className="text-sm text-[var(--accent)] underline underline-offset-2"
              >{t('btn_retry')}</button>
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-24 text-center space-y-4">
            <div className="w-16 h-16 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-full flex items-center justify-center text-[var(--text-muted)]">
              <Clock size={32} />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-[var(--text-primary)] text-lg">{t('no_jobs_today')}</p>
              <p className="text-sm text-[var(--text-muted)] max-w-[200px]">{t('no_jobs_contact')}</p>
            </div>
          </div>
        ) : (
          jobs.map((job, i) => {
            const priorityKey = (job.priority ?? "4-STANDARD") as string;
            return (
              <motion.button
                key={job.jobId}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={prefersReduced ? { opacity: 0.85 } : { scale: 1.01 }}
                whileTap={prefersReduced ? { opacity: 0.7 } : { scale: 0.98 }}
                transition={prefersReduced ? { duration: 0 } : { delay: Math.min(i * 0.05, 0.25), ease: [0.25, 1, 0.5, 1], duration: 0.3 }}
                onClick={() => router.push(`/job/${job.jobId}`)}
                className={`w-full text-left bg-[var(--bg-surface)]/80 border border-white/10 border-t-2 ${PRIORITY_TOP_BORDER[priorityKey] ?? "border-t-blue-500"} rounded-2xl p-5 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    {job.status === "In Progress" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                    )}
                    <p className="font-black text-[var(--text-primary)] truncate text-lg tracking-tight">{job.address}</p>
                  </div>
                  <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-tight">
                    {job.unit ? `Unit ${job.unit} · ` : ""}{job.serviceCategory}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${PRIORITY_CHIP[priorityKey] ?? "bg-blue-500/20 text-blue-400"} tabular-nums`}>
                      {getPriorityLabel(priorityKey, t)}
                    </span>
                    {job.estimatedHours && (
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
                        <Clock size={12} className="text-blue-500" />{job.estimatedHours}H Est.
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                  <ChevronRight size={20} />
                </div>
              </motion.button>
            );
          })
        )}
      </main>
      <BottomNav activeTab="jobs" />
    </div>
  );
}

