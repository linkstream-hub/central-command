"use client";

import { ReactNode, useEffect, useState, Suspense, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppSidebar from "./AppSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, AlertTriangle, Clock, CalendarCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { dashboardRequest, Notification, NotificationsResponse } from "@/lib/dashboard-api";
import CommandPalette from "./CommandPalette";
import JobDetailModal from "./JobDetailModal";
import { Job } from "@/lib/types";

import RouteGuard from "./RouteGuard";

const PAGE_TITLES: Record<string, string> = {
  "/live": "Dashboard",
  "/schedule": "Schedule Queue",
  "/weekly-schedule": "Work Schedule",
  "/calendar": "Time Off",
  "/team": "Team",
  "/compliance": "Compliance",
  "/hr": "HR",
  "/billing": "Billing",
  "/intel": "Intel",
  "/feedback": "Feedback",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen]         = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifCount, setNotifCount]       = useState(0);
  const [notifLoading, setNotifLoading]   = useState(false);
  const [paletteJob, setPaletteJob]       = useState<Job | null>(null);

  useEffect(() => {
    // Force dark mode — light mode CSS is incomplete, dark is the only supported theme
    document.documentElement.classList.remove('light-mode');
    localStorage.removeItem('apt_theme');
  }, []);

  const { data: session, status } = useSession();
  


  const fetchNotifications = useCallback(async () => {
    if (status !== 'authenticated') return;
    setNotifLoading(true);
    try {
      const role = session?.permissions?.admin ? 'admin' : 'dispatch';
      const res = await dashboardRequest('getNotifications', { role }) as NotificationsResponse;
      if (res.success) {
        setNotifications(res.notifications);
        setNotifCount(res.unreadCount);
      }
    } catch { /* silent */ }
    setNotifLoading(false);
  }, [session, status]);

  useEffect(() => {
    // Initial fetch
    const timeout = setTimeout(() => {
      fetchNotifications();
    }, 0);

    // Refresh notifications every 3 minutes
    const interval = setInterval(fetchNotifications, 180000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [fetchNotifications]);

  const isDevGuardActive =
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_DEV_ALLOW_WRITES !== 'true';

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] overflow-hidden">
      <AppSidebar />

      <main className="flex-1 flex flex-col min-w-0 relative">
        {isDevGuardActive && (
          <div className="flex items-center justify-center bg-amber-500 text-black px-4 py-1.5 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-widest">⚠ DEV MODE — Writes blocked. Reads hit live data. No emails will be sent.</span>
          </div>
        )}
        <header className="h-16 flex items-center justify-between px-8 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
              {PAGE_TITLES[pathname] || "APT Central Command"}
            </h1>
          </div>

          <div className="flex items-center space-x-6">


            <button
              onClick={() => { setNotifOpen(o => !o); if (!notifOpen) fetchNotifications(); }}
              className="relative p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-white/5"
              title="Notifications"
            >
              <Bell size={20} />
              {notifCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-black flex items-center justify-center rounded-full bg-[var(--accent)] text-white leading-none">
                  {notifCount > 9 ? '9+' : notifCount}
                </span>
              )}
            </button>

            <div className="flex items-center space-x-3 border-l border-zinc-800 pl-6 h-6">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-bold text-zinc-100 uppercase tracking-wide leading-none">{session?.staffName || session?.user?.name || "Staff"}</span>
                <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mt-1">{(session?.permissions?.admin ? "Administrator" : "Dispatcher")}</span>
              </div>
            </div>
          </div>
        </header>

        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 overflow-y-auto p-8 custom-scrollbar relative"
        >
          <RouteGuard>
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              {children}
            </Suspense>
          </RouteGuard>
          
          <CommandPalette onSelectJob={(job) => setPaletteJob(job)} />
          {paletteJob && (
            <JobDetailModal
              key={paletteJob.jobId}
              job={paletteJob}
              onClose={() => setPaletteJob(null)}
              onSave={() => { setPaletteJob(null); window.dispatchEvent(new CustomEvent('apt:job-saved')); }}
            />
          )}
        </motion.div>
      </main>

      {/* ── NOTIFICATION PANEL ── */}
      <AnimatePresence>
        {notifOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="notif-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotifOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            />

            {/* Panel */}
            <motion.div
              key="notif-panel"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed right-4 top-20 z-50 w-[380px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--text-primary)]">
                  Notifications
                  {notifCount > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-[9px]">
                      {notifCount}
                    </span>
                  )}
                </span>
                <button
                  onClick={() => setNotifOpen(false)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {notifLoading ? (
                  <div className="space-y-3 p-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <span className="text-green-400 text-lg">✓</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] font-bold">All clear — no open items</p>
                  </div>
                ) : (
                  <div className="p-3 space-y-2">
                    {notifications.map(n => (
                      <NotificationItem key={n.id} notif={n} onClose={() => setNotifOpen(false)} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const NOTIF_ICON: Record<string, React.ReactNode> = {
  STALE_JOB         : <Clock size={14} />,
  COMPLIANCE        : <AlertTriangle size={14} />,
  TIME_OFF_PENDING  : <CalendarCheck size={14} />,
};

const NOTIF_COLORS: Record<string, string> = {
  urgent  : 'text-red-400 bg-red-500/10 border-red-500/20',
  warning : 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  info    : 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

function NotificationItem({ notif, onClose }: { notif: Notification; onClose: () => void }) {
  const colorClass = NOTIF_COLORS[notif.severity] ?? NOTIF_COLORS.info;
  const icon       = NOTIF_ICON[notif.type] ?? <Bell size={14} />;

  return (
    <Link href={notif.href} onClick={onClose}>
      <div className={`flex items-start gap-3 px-3 py-3 rounded-xl border cursor-pointer hover:brightness-110 transition-all ${colorClass}`}>
        <span className="mt-0.5 flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black leading-tight text-[var(--text-primary)] truncate">{notif.title}</p>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">{notif.body}</p>
        </div>
      </div>
    </Link>
  );
}
