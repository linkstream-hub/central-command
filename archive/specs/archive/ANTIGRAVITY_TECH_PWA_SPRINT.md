# ANTIGRAVITY SPRINT — Tech PWA Field Interface
**Supersedes:** ANTIGRAVITY_PWA_UI_PROMPT.md (April 17 — stale)
**Status:** Ready to execute
**Scope:** Field tech surfaces only — do NOT touch dispatch dashboard components

---

## CRITICAL BUG TO FIX FIRST

### `/jobs` is broken for field techs

`tech-pwa/src/app/jobs/page.tsx` currently uses `DashboardLayout` and `dashboardRequest('getDispatchData')` — the dispatch API. Field techs are routed here after login (`session.role === "tech"` → `/jobs`) and they see the wrong page.

**Fix:** Replace the entire `jobs/page.tsx` with the "Today's Jobs" tech interface defined below. The dispatch job archive can stay at `/live` — there is no separate route needed for it. The dispatch job history is already accessible inside the `/live` page.

**Do NOT move, rename, or delete any `.gs`, `.js`, or `.html` files in the repo root.**

---

## TECH STACK NOTES

- Next.js App Router — `params` is a Promise, always unwrap with `React.use(params)`
- Tailwind v4 — no `tailwind.config.ts`. Add tokens to `globals.css` under `@theme {}`
- Existing CSS variables (already in `globals.css`): `--bg-primary`, `--bg-surface`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border-subtle`, `--accent` (orange)
- `framer-motion` — already installed
- `lucide-react` — already installed
- All field tech API calls go through `src/lib/syncQueue.ts` → `apiCall()` / `apiGet()`
- **CORS: POST requests use `Content-Type: text/plain` — do NOT change syncQueue.ts**

---

## DESIGN TOKENS TO ADD TO `globals.css`

Add these inside the existing `@theme {}` block:

```css
/* Status colors */
--color-status-urgent:   #ef4444;
--color-status-turnover: #f97316;
--color-status-pending:  #eab308;
--color-status-standard: #3b82f6;
--color-status-complete: #22c55e;
--color-status-break:    #a855f7;

/* Compliance colors */
--color-compliance-warn: #f59e0b;
--color-compliance-crit: #ef4444;
--color-compliance-rest: #3b82f6;
--color-compliance-ok:   #22c55e;

/* Surface elevations */
--color-surface-card:   #13151a;
--color-surface-raised: #1c1f27;
```

Also add to `:root {}`:
```css
--surface-card: #13151a;
--surface-raised: #1c1f27;
```

Add `shake` keyframe and safe-area insets to `globals.css`:
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}

body {
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
}
```

---

## FILES TO CREATE

```
tech-pwa/src/
  components/
    Toast.tsx
    Skeleton.tsx
    InstallPrompt.tsx
  context/
    ToastContext.tsx
```

---

## FILE: `src/context/ToastContext.tsx` (NEW)

```tsx
"use client";
import { createContext, useContext, useState, useCallback } from "react";

type ToastType = "success" | "error" | "info" | "warning";
interface ToastItem { id: number; message: string; type: ToastType; }

const ToastContext = createContext<{
  toast: { success: (m: string) => void; error: (m: string) => void; info: (m: string) => void; warning: (m: string) => void }
}>({ toast: { success: () => {}, error: () => {}, info: () => {}, warning: () => {} } });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  let counter = 0;

  const add = useCallback((message: string, type: ToastType) => {
    const id = ++counter;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const toast = {
    success: (m: string) => add(m, "success"),
    error:   (m: string) => add(m, "error"),
    info:    (m: string) => add(m, "info"),
    warning: (m: string) => add(m, "warning"),
  };

  const borderColors = {
    success: "border-l-green-500",
    error:   "border-l-red-500",
    info:    "border-l-blue-500",
    warning: "border-l-amber-500",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-80 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id}
            className={`bg-[var(--surface-raised)] border border-[var(--border-subtle)] border-l-4 ${borderColors[t.type]} rounded-xl px-4 py-3 shadow-2xl text-sm text-[var(--text-primary)] font-medium`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
```

---

## FILE: `src/components/Skeleton.tsx` (NEW)

```tsx
export function SkeletonCard() {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-4 animate-pulse space-y-3">
      <div className="h-4 bg-[var(--border-subtle)] rounded w-3/4" />
      <div className="h-3 bg-[var(--border-subtle)] rounded w-1/2" />
      <div className="h-3 bg-[var(--border-subtle)] rounded w-1/3" />
    </div>
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`bg-[var(--border-subtle)] rounded animate-pulse ${className ?? ""}`} />;
}
```

---

## FILE: `src/components/Toast.tsx` (NEW)

Re-export from context for convenience:
```tsx
export { useToast } from "@/context/ToastContext";
```

---

## FILE: `src/components/InstallPrompt.tsx` (NEW)

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event & { prompt?: () => void } | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("apt_install_dismissed");
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return;

    const handler = (e: Event) => { e.preventDefault(); setDeferredPrompt(e as never); };
    window.addEventListener("beforeinstallprompt", handler);
    const timer = setTimeout(() => setShow(true), 30000);
    return () => { window.removeEventListener("beforeinstallprompt", handler); clearTimeout(timer); };
  }, []);

  const install = () => {
    if (deferredPrompt && (deferredPrompt as { prompt?: () => void }).prompt) {
      (deferredPrompt as { prompt: () => void }).prompt();
    }
    setShow(false);
  };

  const dismiss = () => {
    localStorage.setItem("apt_install_dismissed", String(Date.now()));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && deferredPrompt && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-card)] border-t border-[var(--border-subtle)] rounded-t-3xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-white font-black text-lg">APT</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[var(--text-primary)]">Add to Home Screen</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Works offline — one tap away</p>
            </div>
            <button onClick={dismiss} className="text-[var(--text-muted)] p-1"><X size={18} /></button>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={install}
              className="flex-1 bg-blue-600 text-white font-semibold rounded-2xl py-3 flex items-center justify-center gap-2">
              <Download size={16} /> Install
            </button>
            <button onClick={dismiss}
              className="flex-1 text-[var(--text-muted)] font-medium rounded-2xl py-3 border border-[var(--border-subtle)]">
              Not Now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## FILE: `src/app/layout.tsx` — UPDATE (add providers)

Wrap the body children with `ToastProvider`. Add `InstallPrompt` inside the provider. Fix viewport export if not already done:

```tsx
export const viewport = {
  themeColor: "#0d0f14",
};
```

Import and wrap:
```tsx
import { ToastProvider } from "@/context/ToastContext";
import InstallPrompt from "@/components/InstallPrompt";
// ...
<ToastProvider>
  {children}
  <InstallPrompt />
</ToastProvider>
```

Do NOT change `AnimatePresence` wrapping if already present.

---

## FILE: `src/app/jobs/page.tsx` — FULL REPLACEMENT

Replace the entire file. This is the field tech "Today's Jobs" view.

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ChevronRight, RefreshCw, WifiOff } from "lucide-react";
import { apiGet } from "@/lib/syncQueue";
import { Job } from "@/lib/types";
import { getSession } from "@/lib/auth";
import { SkeletonCard } from "@/components/Skeleton";

const PRIORITY_BORDER: Record<string, string> = {
  "1-URGENT":      "border-l-red-500",
  "2-TURNOVER":    "border-l-orange-500",
  "3-PTE-PENDING": "border-l-yellow-500",
  "4-STANDARD":    "border-l-blue-500",
};

const PRIORITY_CHIP: Record<string, string> = {
  "1-URGENT":      "bg-red-500/20 text-red-400",
  "2-TURNOVER":    "bg-orange-500/20 text-orange-400",
  "3-PTE-PENDING": "bg-yellow-500/20 text-yellow-400",
  "4-STANDARD":    "bg-blue-500/20 text-blue-400",
};

const PRIORITY_LABEL: Record<string, string> = {
  "1-URGENT": "URGENT", "2-TURNOVER": "TURNOVER",
  "3-PTE-PENDING": "PTE", "4-STANDARD": "STANDARD",
};

export default function TechJobsPage() {
  const router = useRouter();
  const session = getSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [queueCount, setQueueCount] = useState(0);

  const firstName = session?.techName?.split(" ")[0] ?? "Tech";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    setIsOnline(navigator.onLine);
    window.addEventListener("online",  () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    const q = localStorage.getItem("apt_sync_queue");
    if (q) { try { setQueueCount(JSON.parse(q).length); } catch { /**/ } }

    loadJobs();
    registerPush();
  }, []);

  async function loadJobs(isRefresh = false) {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    try {
      const res = await apiGet("getTechJobs");
      if (res.success) {
        setJobs(res.jobs ?? []);
        localStorage.setItem("apt_cached_jobs", JSON.stringify(res.jobs ?? []));
      }
    } catch {
      const cached = localStorage.getItem("apt_cached_jobs");
      if (cached) setJobs(JSON.parse(cached));
    } finally {
      setLoading(false);
      setRefreshing(false);
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
    localStorage.removeItem("apt_session");
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      {/* Offline Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="bg-amber-900/50 border-b border-amber-700 text-amber-300 text-xs font-bold px-4 py-2 flex items-center gap-2 overflow-hidden">
            <WifiOff size={12} />
            Offline {queueCount > 0 ? `— ${queueCount} events pending sync` : ""}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="px-4 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--text-muted)] font-medium">{greeting},</p>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">{firstName}</h1>
          {!loading && (
            <span className="mt-1 inline-block text-xs bg-blue-500/20 text-blue-400 font-semibold px-2 py-0.5 rounded-full">
              {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"} Today
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => loadJobs(true)}
            className={`p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] ${refreshing ? "animate-spin" : ""}`}>
            <RefreshCw size={18} />
          </button>
          <button onClick={handleLogout}
            className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
            {firstName.charAt(0).toUpperCase()}
          </button>
        </div>
      </header>

      {/* Job List */}
      <main className="px-4 space-y-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-24 text-center space-y-3">
            <Clock size={48} className="text-[var(--text-muted)]" />
            <p className="font-semibold text-[var(--text-primary)]">No jobs assigned today</p>
            <p className="text-sm text-[var(--text-muted)]">Pull to refresh or check with dispatch</p>
          </div>
        ) : (
          jobs.map((job, i) => {
            const priorityKey = (job.priority ?? "4-STANDARD") as string;
            return (
              <motion.button
                key={job.jobId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => router.push(`/job/${job.jobId}`)}
                className={`w-full text-left bg-[var(--bg-surface)] border border-[var(--border-subtle)] border-l-4 ${PRIORITY_BORDER[priorityKey] ?? "border-l-blue-500"} rounded-2xl p-4 flex items-center gap-3`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {job.status === "In Progress" && (
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                    )}
                    <p className="font-semibold text-[var(--text-primary)] truncate">{job.address}</p>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    {job.unit ? `Unit ${job.unit} · ` : ""}{job.serviceCategory}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PRIORITY_CHIP[priorityKey] ?? "bg-blue-500/20 text-blue-400"}`}>
                      {PRIORITY_LABEL[priorityKey] ?? "STANDARD"}
                    </span>
                    {job.estimatedHours && (
                      <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                        <Clock size={10} />{job.estimatedHours}h est.
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight size={18} className="text-[var(--text-muted)] shrink-0" />
              </motion.button>
            );
          })
        )}
      </main>
    </div>
  );
}
```

---

## FILE: `src/app/job/[jobId]/page.tsx` — UI REBUILD

Keep ALL existing logic (GPS capture, handleClockIn/Out/Break/MarkComplete, handleFlagSubmit, compliance calculation). Replace the UI layer only.

**Critical fixes:**
1. Timer must tick every **1 second** — change `setInterval(60000)` to `setInterval(1000)`. Add `timeWorkedSeconds` state alongside minutes.
2. Replace `alert("Issue Flagged with Dispatch!")` with `toast.success("Issue flagged")` 
3. Replace loading spinner div with skeleton
4. No `alert()` or `window.confirm()` anywhere

**Timer state additions:**
```tsx
const [timeWorkedSeconds, setTimeWorkedSeconds] = useState(0);

// In the compliance useEffect, change interval to 1000ms:
const interval = setInterval(() => {
  const start = new Date(activeRecord.clockInTime).getTime();
  let now = Date.now();
  if (activeRecord.status === "on-break" && activeRecord.breakStart) {
    now = new Date(activeRecord.breakStart).getTime();
  }
  const totalSeconds = Math.floor((now - start) / 1000);
  const breakSeconds = (activeRecord.breakDurationMinutes || 0) * 60;
  const netSeconds = Math.max(0, totalSeconds - breakSeconds);
  setTimeWorkedSeconds(netSeconds);
  setTimeWorkedMinutes(Math.floor(netSeconds / 60));
}, 1000);
```

**Timer display helper:**
```tsx
function formatTimer(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
```

**Loading state — replace the spinner:**
```tsx
if (loading || !job) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-4 space-y-4">
      <div className="h-14 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl animate-pulse" />
      <div className="h-40 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl animate-pulse" />
      <div className="h-24 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl animate-pulse" />
      <div className="h-14 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl animate-pulse" />
    </div>
  );
}
```

**Timer section JSX (replace whatever is currently rendering the time):**
```tsx
{/* Timer Card */}
<div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 text-center">
  <div className="flex items-center justify-center gap-2 mb-3">
    <span className={`w-2 h-2 rounded-full ${
      activeRecord?.status === "active"   ? "bg-green-500 animate-pulse" :
      activeRecord?.status === "on-break" ? "bg-purple-500 animate-pulse" : "bg-gray-500"
    }`} />
    <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
      {activeRecord?.status === "active"   ? "Clocked In" :
       activeRecord?.status === "on-break" ? "On Break"   :
       activeRecord?.status === "complete" ? "Complete"   : "Not Started"}
    </span>
  </div>
  {activeRecord && activeRecord.status !== "complete" && (
    <motion.div key={timeWorkedSeconds} className="font-mono text-5xl font-bold text-[var(--text-primary)] tracking-tight"
      initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
      {formatTimer(timeWorkedSeconds)}
    </motion.div>
  )}
  {activeRecord && (
    <p className="text-xs text-[var(--text-muted)] mt-2">
      In: {new Date(activeRecord.clockInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      {(activeRecord.breakDurationMinutes ?? 0) > 0 && ` · Break: ${activeRecord.breakDurationMinutes}m`}
    </p>
  )}
</div>
```

**Compliance banners (replace existing yellow box):**
```tsx
{/* CA Compliance Banners */}
<AnimatePresence>
  {complianceWarnings.map((warn, i) => {
    const isCrit = warn.includes("second meal") || warn.includes("over 10");
    const isMeal = warn.includes("Meal break") || warn.includes("meal break");
    const colorClass = isCrit ? "bg-red-900/50 border-red-700 text-red-300"
      : isMeal ? "bg-amber-900/50 border-amber-700 text-amber-300 animate-pulse"
      : "bg-blue-900/50 border-blue-700 text-blue-300";
    return (
      <motion.div key={i} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className={`border rounded-xl p-3 text-xs font-medium flex gap-2 items-start ${colorClass}`}>
        <AlertCircle size={14} className="shrink-0 mt-0.5" />
        <span>{warn}</span>
      </motion.div>
    );
  })}
</AnimatePresence>
```

**Action buttons (replace existing):**
```tsx
{/* Action Buttons */}
<div className="space-y-3">
  {!activeRecord && (
    <button onClick={handleClockIn}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl py-4 text-base transition active:scale-[0.98]"
      onPointerDown={() => navigator.vibrate?.(10)}>
      Clock In
    </button>
  )}

  {activeRecord?.status === "active" && (
    <>
      <div className="flex gap-3">
        <button onClick={handleStartBreak}
          className="flex-1 bg-purple-600/20 border border-purple-500/40 text-purple-400 font-semibold rounded-2xl py-4 transition active:scale-[0.98]"
          onPointerDown={() => navigator.vibrate?.(10)}>
          Start Break
        </button>
        <button onClick={handleClockOut}
          className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold rounded-2xl py-4 transition active:scale-[0.98]"
          onPointerDown={() => navigator.vibrate?.(10)}>
          Clock Out
        </button>
      </div>
      <button onClick={handleMarkComplete}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl py-4 transition active:scale-[0.98]"
        onPointerDown={() => navigator.vibrate?.([50, 30, 50])}>
        Mark Complete
      </button>
    </>
  )}

  {activeRecord?.status === "on-break" && (
    <button onClick={handleEndBreak}
      className="w-full bg-purple-600 text-white font-bold rounded-2xl py-4 transition active:scale-[0.98]"
      onPointerDown={() => navigator.vibrate?.(10)}>
      End Break
    </button>
  )}

  {activeRecord?.status === "complete" && (
    <div className="w-full text-center py-4 rounded-2xl border border-green-500/30 text-green-400 text-sm font-bold bg-green-500/10">
      Job Complete
    </div>
  )}
</div>
```

**Job completion celebration — add overlay state:**
```tsx
const [showCelebration, setShowCelebration] = useState(false);
```

In `handleMarkComplete`, after `res.success`:
```tsx
if (res.success) {
  setJob({ ...job!, status: "Complete" });
  setActiveRecord({ ...activeRecord!, status: "complete", actualHoursWorked: res.actualHoursWorked });
  navigator.vibrate?.([50, 30, 50]);
  setShowCelebration(true);
  setTimeout(() => { setShowCelebration(false); router.push("/jobs"); }, 1800);
}
```

Overlay JSX (add above `return` at top level of return):
```tsx
<AnimatePresence>
  {showCelebration && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center gap-4">
      <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
        <CheckCircle size={48} className="text-green-400" />
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-white">Job Complete</motion.p>
    </motion.div>
  )}
</AnimatePresence>
```

**Flag Issue — replace `alert()` with toast:**
```tsx
// In handleFlagSubmit, replace:
alert("Issue Flagged with Dispatch!");
// With:
toast.success("Issue flagged — dispatch notified");
```

Add `const { toast } = useToast();` at the top of the component.

**Flag modal — replace alert-style flag button with bottom sheet:**
```tsx
{/* Flag Issue */}
<button onClick={() => setShowFlagModal(true)}
  className="w-full text-[var(--text-muted)] text-sm py-3 flex items-center justify-center gap-2 hover:text-[var(--text-primary)] transition">
  <Flag size={14} /> Flag Issue
</button>

<AnimatePresence>
  {showFlagModal && (
    <motion.div className="fixed inset-0 z-40 flex flex-col justify-end"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60" onClick={() => setShowFlagModal(false)} />
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-[var(--surface-raised)] rounded-t-3xl p-6 space-y-4 z-50">
        <p className="font-bold text-[var(--text-primary)]">Flag an Issue</p>
        <textarea
          value={flagNote} onChange={e => setFlagNote(e.target.value)}
          placeholder="Describe the issue..."
          className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-3 text-sm text-[var(--text-primary)] resize-none h-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button onClick={handleFlagSubmit} disabled={flagging || !flagNote.trim()}
          className="w-full bg-red-600 disabled:opacity-40 text-white font-bold rounded-2xl py-3">
          {flagging ? "Sending..." : "Submit Flag"}
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

---

## FILE: `src/app/login/page.tsx` — UI POLISH ONLY

Keep all existing logic (dual-path auth, API calls, session storage, routing). Only change the visual layer:

- Background: `className="min-h-screen bg-gradient-to-b from-[#0a0b0e] via-[#0d1117] to-[#0a0f1a]"`
- Center card: `border border-white/10 backdrop-blur-sm rounded-3xl bg-white/5 p-8`
- APT wordmark at top: `<div className="text-3xl font-black text-blue-500 tracking-tight">APT</div>`
- Subtitle: `<p className="text-xs text-[var(--text-muted)] mt-1">Field Operations</p>`
- Inputs: `bg-[var(--surface-raised)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 focus:border-blue-500 transition`
- PIN field: add eye icon toggle for visibility (`useState<boolean>` for `showPin`)
- Login button: `bg-blue-600 hover:bg-blue-700 rounded-xl py-3 w-full font-semibold`
- Error state: add `animate-[shake_0.3s_ease-in-out]` to the form/card on error
- Bottom: `<p className="text-[10px] text-[var(--text-muted)] mt-6">APT Maintenance Inc.</p>`

---

## WHAT TO KEEP UNCHANGED

- `src/lib/syncQueue.ts` — do not touch
- `src/lib/location.ts` — do not touch
- `src/lib/auth.ts` — do not touch
- `src/lib/dashboard-api.ts` — do not touch
- `src/lib/types.ts` — do not touch
- All dispatch dashboard components: `src/components/dashboard/*` — do not touch
- All dispatch routes: `/live`, `/schedule`, `/weekly-schedule`, `/hr`, `/team`, `/billing`, `/compliance`, `/intel`, `/track/[jobId]` — do not touch
- `/time-off` page — already built, do not touch
- `public/sw.js` — do not touch
- `src/app/api/push/*` — do not touch
- `CameraUpload.tsx` — existing logic correct; only add thumbnail display inside the photo tabs if not already present

---

## API REFERENCE (do not change call signatures)

All field tech calls use `apiCall(action, payload)` or `apiGet(action)` from `syncQueue.ts`:

| Action | Call | Key fields |
|---|---|---|
| login | apiCall | `{ employeeId, pin }` |
| getTechJobs | apiGet | returns `{ jobs: Job[] }` |
| getTechStatus | apiGet | returns `{ activeRecord, job }` |
| clockIn | apiCall | `{ jobId, lat?, lng? }` |
| clockOut | apiCall | `{ jobId, recordId, lat?, lng? }` |
| startBreak | apiCall | `{ recordId }` |
| endBreak | apiCall | `{ recordId }` |
| markComplete | apiCall | `{ jobId, recordId, notes, lat?, lng? }` |
| flagIssue | apiCall | `{ jobId, notes }` |
| uploadReceipt | apiCall | `{ jobId, photoBase64, photoType, mimeType }` |

CORS: POST uses `Content-Type: text/plain`. Do not change.

---

## VERIFICATION CHECKLIST

Before marking this sprint complete:

- [ ] `npx tsc --noEmit` — zero errors
- [ ] `/jobs` loads field tech jobs (NOT dispatch archive) — `TechJobs` header, job cards by priority, no `DashboardLayout`
- [ ] Timer on `/job/[jobId]` ticks every second (HH:MM:SS)
- [ ] Priority left-border accent renders on all 4 priority levels
- [ ] CA compliance banners appear — blue at 270min, amber (pulsing) at 300min, red at 570min
- [ ] Toast fires on: clock in, clock out, break start/end, mark complete, flag submit
- [ ] Job completion shows full-screen checkmark overlay → navigates to /jobs after 1.8s
- [ ] Flag issue uses bottom sheet modal (NOT alert())
- [ ] Offline banner shows when `navigator.onLine` is false
- [ ] Skeleton cards show during jobs list load
- [ ] Login: PIN visibility toggle works; shake animation on error
- [ ] Push subscription still registers on `/jobs` load
- [ ] No `alert()`, `window.confirm()`, or `console.error` in field tech routes

---

*Generated: April 25, 2026 | APT Central Command — Session 24*
