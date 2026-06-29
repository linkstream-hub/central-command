# ANTIGRAVITY SPRINT — Live Tech Availability Panel
**Author**: Claude Code
**Priority**: Robert's #1 dispatch pain point — techs calling 5+ at once asking for more work
**Scope**: Dispatch-facing only. Do NOT touch field tech routes (/jobs, /job/[jobId], /login).
**Files to touch**: `tech-pwa/src/app/live/page.tsx`, `tech-pwa/src/components/dashboard/` (new component), `tech-pwa/src/lib/dashboard-api.ts` (read only — verify types)

---

## WHAT THIS SPRINT BUILDS

A real-time **Tech Status Panel** embedded in the `/live` dispatch page. Robert sees at a glance:
- Which techs are **Active** (clocked in, working)
- Which techs are **Just Completed** (marked job done — need reassignment)
- Which techs are **On Break**
- Which techs are **Unassigned** today (no active record)

When a tech marks complete in the PWA, Robert sees them flip to "Available" within 60 seconds — without a phone call.

---

## DATA SOURCE

`getLiveFieldStatus` action in DashboardAPI.gs already exists. Call it via:
```typescript
const res = await dashboardRequest('getLiveFieldStatus');
// returns res.techs: array of tech status objects
// returns res.complianceAlerts: array of alerts
```

`TechStatus` is exported from `src/lib/dashboard-api.ts`. Import from there — not from types.ts.

The response shape is: `{ techId, techName, status, minutesWorked?, jobAddress?, clockInTime? }`. Use those exact field names — the backend and mapTech are aligned to them.

---

## NEW FILE: `src/components/dashboard/TechAvailabilityPanel.tsx`

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dashboardRequest } from "@/lib/dashboard-api";
import { TechStatus } from "@/lib/dashboard-api";
import { CheckCircle, Clock, Coffee, UserX, RefreshCw } from "lucide-react";

const STATUS_CONFIG = {
  complete: {
    label: "Available",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    dot: "bg-green-500",
    icon: CheckCircle,
  },
  active: {
    label: "Active",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-500 animate-pulse",
    icon: Clock,
  },
  "on-break": {
    label: "On Break",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    dot: "bg-purple-500 animate-pulse",
    icon: Coffee,
  },
  unassigned: {
    label: "Unassigned",
    color: "text-[var(--text-muted)]",
    bg: "bg-[var(--bg-surface)] border-[var(--border-subtle)]",
    dot: "bg-gray-500",
    icon: UserX,
  },
};

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function TechAvailabilityPanel() {
  const [techs, setTechs] = useState<TechStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);

  async function load(isManual = false) {
    if (isManual) setRefreshing(true);
    try {
      const res = await dashboardRequest('getLiveFieldStatus');
      if (res.techs) setTechs(res.techs);
      setLastRefresh(new Date());
    } catch { /* silent fail — show stale data */ }
    finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(() => load(), 60000); // auto-refresh every 60s
    return () => clearInterval(interval);
  }, []);

  // Group techs by status priority: complete first, then active, break, unassigned
  const groups = {
    complete:   techs.filter(t => t.status === "complete"),
    active:     techs.filter(t => t.status === "active"),
    "on-break": techs.filter(t => t.status === "on-break"),
    unassigned: techs.filter(t => !t.status || t.status === "unassigned"),
  };

  const availableCount = groups.complete.length;

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">
            Field Status
          </h2>
          {availableCount > 0 && (
            <span className="text-[10px] font-black bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
              {availableCount} Available
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[var(--text-muted)]">
            {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={() => load(true)}
            className={`p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all ${refreshing ? "animate-spin" : ""}`}
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Tech List */}
      <div className="divide-y divide-[var(--border-subtle)] max-h-[480px] overflow-y-auto custom-scrollbar">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-5 py-3 flex items-center gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-[var(--border-subtle)]" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-[var(--border-subtle)] rounded w-1/3" />
                <div className="h-2.5 bg-[var(--border-subtle)] rounded w-1/2" />
              </div>
            </div>
          ))
        ) : techs.length === 0 ? (
          <div className="px-5 py-8 text-center text-[var(--text-muted)] text-xs">
            No field activity today
          </div>
        ) : (
          <>
            {/* Available (just completed) — shown first, most actionable */}
            <AnimatePresence>
              {groups.complete.map((tech, i) => (
                <TechRow key={tech.techId ?? tech.techName} tech={tech} statusKey="complete" index={i} />
              ))}
            </AnimatePresence>

            {/* Active */}
            {groups.active.map((tech, i) => (
              <TechRow key={tech.techId ?? tech.techName} tech={tech} statusKey="active" index={i} />
            ))}

            {/* On Break */}
            {groups["on-break"].map((tech, i) => (
              <TechRow key={tech.techId ?? tech.techName} tech={tech} statusKey="on-break" index={i} />
            ))}

            {/* Unassigned */}
            {groups.unassigned.map((tech, i) => (
              <TechRow key={tech.techId ?? tech.techName} tech={tech} statusKey="unassigned" index={i} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function TechRow({ tech, statusKey, index }: {
  tech: TechStatus;
  statusKey: keyof typeof STATUS_CONFIG;
  index: number;
}) {
  const cfg = STATUS_CONFIG[statusKey];
  const Icon = cfg.icon;
  const firstName = tech.techName?.split(" ")[0] ?? "Tech";
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`px-5 py-3 flex items-center gap-3 ${statusKey === "complete" ? "bg-green-500/5" : ""}`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-xs font-black text-[var(--text-secondary)]">
          {initial}
        </div>
        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-surface)] ${cfg.dot}`} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[var(--text-primary)] truncate">{tech.techName}</p>
        <p className="text-[10px] text-[var(--text-muted)] truncate">
          {tech.jobAddress ?? (statusKey === "unassigned" ? "No assignment today" : "—")}
        </p>
      </div>

      {/* Status + time */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className={`text-[9px] font-black uppercase tracking-widest ${cfg.color}`}>
          {cfg.label}
        </span>
        {tech.minutesWorked != null && tech.minutesWorked > 0 && (
          <span className="text-[9px] text-[var(--text-muted)]">
            {formatMinutes(tech.minutesWorked)}
          </span>
        )}
      </div>
    </motion.div>
  );
}
```

---

## INTEGRATION INTO `/live` PAGE

In `tech-pwa/src/app/live/page.tsx`:

1. Import the component:
```tsx
import TechAvailabilityPanel from "@/components/dashboard/TechAvailabilityPanel";
```

2. Add it to the right sidebar or below the KPI cards — wherever `LiveFieldStatus` or a similar panel currently lives. Replace or supplement the existing field status display. Do NOT remove the existing `ActivityFeed` or `JobQueueTable`.

3. The panel should be visible without scrolling on a 1280px+ screen. Place it in the right column if a two-column layout exists, or below KPI cards in a single-column layout.

---

## WHAT TO KEEP UNCHANGED

- `src/lib/syncQueue.ts` — do not touch
- `src/lib/types.ts` — do not touch
- `src/lib/dashboard-api.ts` — do not touch (TechStatus interface and mapTech are already updated)
- `src/lib/auth.ts` — do not touch
- All field tech routes — do not touch
- `JobQueueTable.tsx` — do not touch
- `ActivityFeed.tsx` — do not touch
- All `.gs` files — do not touch

---

## VERIFICATION CHECKLIST

Before marking complete:
- [ ] `npx tsc --noEmit` — zero errors
- [ ] Panel renders on `/live` page with real data from `getLiveFieldStatus`
- [ ] Techs with status "complete" appear at top with green "Available" badge
- [ ] Active techs show blue pulsing dot + time worked
- [ ] On-break techs show purple pulsing dot
- [ ] Panel auto-refreshes every 60 seconds (check Network tab — request fires)
- [ ] Manual refresh button works
- [ ] Skeleton shows during initial load
- [ ] Handles empty state (no field activity) gracefully
- [ ] No `alert()`, no `console.error`, no hardcoded hex colors
- [ ] Dark mode verified — no light bleed
- [ ] Mobile: panel readable at 375px width

---

*Generated: April 25, 2026 | APT Central Command — Session 24*
*Next spec after this: 12-month scheduling horizon architecture*
