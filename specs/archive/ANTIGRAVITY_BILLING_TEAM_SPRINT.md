# ANTIGRAVITY SPRINT — BILLING PAGE + TEAM PAGE FIX
# Owner: Claude Code | Executor: Antigravity
# Date: April 23, 2026

---

## OVERVIEW

Three frontend tasks. Do them exactly as specified. No freelancing on structure, naming, or data sources.

---

## TASK 1 — Rename "Jobs" → "Billing" in Sidebar + Create /billing Route

### 1a. AppSidebar.tsx — `tech-pwa/src/components/dashboard/AppSidebar.tsx`

**Change the import line** — swap `ClipboardList` for `Receipt`:
```ts
// REMOVE:
import { ..., ClipboardList, ... } from "lucide-react";
// ADD Receipt in its place:
import { ..., Receipt, ... } from "lucide-react";
```

**Change the NAV_ITEMS entry** — find the jobs entry and replace it:
```ts
// REMOVE:
{ id: 'jobs', label: 'Jobs', icon: ClipboardList, href: '/jobs' },
// ADD:
{ id: 'billing', label: 'Billing', icon: Receipt, href: '/billing' },
```

**Change ROUTE_PERMISSIONS** — replace the `/jobs` key:
```ts
// REMOVE:
'/jobs': ['dispatch', 'management', 'admin'],
// ADD:
'/billing': ['management', 'compliance', 'admin'],
```

Note: Billing is not a dispatch-role view — it's for management/accounting. Dispatch does not see it.

### 1b. Create `tech-pwa/src/app/billing/page.tsx`

Create this file. Do not create any other files. No sub-components.

```tsx
"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Receipt, TrendingUp, Clock, CheckCircle } from "lucide-react";

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">
            BILLING <span className="text-[var(--accent)]">& AR</span>
          </h2>
          <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
            Completed workorders · Invoicing · QuickBooks integration
          </p>
        </div>

        {/* Stub KPIs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Pending Invoice', value: '—', icon: Clock },
            { label: 'Invoiced This Month', value: '—', icon: Receipt },
            { label: 'Collected This Month', value: '—', icon: TrendingUp },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-[var(--bg-surface)]/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between glass-panel">
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-[var(--accent)] opacity-60" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">{label}</span>
              </div>
              <span className="text-xl font-black text-[var(--text-muted)] opacity-30">{value}</span>
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div className="bg-[var(--bg-surface)]/20 border border-white/5 rounded-3xl p-16 flex flex-col items-center justify-center gap-4 glass-panel">
          <CheckCircle size={40} className="text-[var(--accent)] opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-40 text-center">
            QuickBooks integration · Phase 3
          </p>
          <p className="text-[9px] text-[var(--text-muted)] opacity-25 uppercase tracking-widest text-center max-w-xs">
            Job close-out → QB invoice auto-creation ships in Phase 3 Finance module
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
```

---

## TASK 2 — Fix Team Page: Weekly Job Counts Per Tech

### File: `tech-pwa/src/app/team/page.tsx`

**Problem:** `weekJobMap` is built from `getWeekSchedule` which reads the legacy scheduling sheet via fuzzy matching. This is unreliable — it returns 0 jobs for all techs. 

**Fix:** Build `weekJobMap` from `getDispatchData` jobs directly. Dispatch Queue jobs have `scheduledDate` (YYYY-MM-DD) and `assignedTech` (string) already on them. Filter to Scheduled/In Progress jobs whose `scheduledDate` falls within the current Mon–Fri week.

### Exact changes to `team/page.tsx`:

**Step 1 — Remove the `getWeekSchedule` call from the parallel load.** Change the `Promise.all` from three calls to two:

```ts
// REMOVE this line from the Promise.all array:
dashboardRequest('getWeekSchedule')

// The Promise.all becomes:
const [resTechs, resField, resDispatch] = await Promise.all([
  dashboardRequest('getTechList'),
  dashboardRequest('getLiveFieldStatus'),
  dashboardRequest('getDispatchData')
]);
```

**Step 2 — Replace the weekJobMap construction block.** Find the existing block that reads from `resWeek` and replace it entirely:

```ts
// REMOVE (the entire resWeek block):
const weekJobMap: Record<string, number> = {};
if (resWeek.success && resWeek.byTech) {
  Object.entries(resWeek.byTech as Record<string, Record<string, any[]>>).forEach(([techName, byDate]) => {
    weekJobMap[techName] = Object.values(byDate).reduce((sum, dayJobs) => sum + dayJobs.length, 0);
  });
}

// ADD this replacement:
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
if (resDispatch.success) {
  (resDispatch.jobs as any[])
    .filter(j => (j.status === 'Scheduled' || j.status === 'In Progress') && j.scheduledDate && _weekDates.has(j.scheduledDate))
    .forEach(j => {
      const names = String(j.assignedTech || '').split(',').map((s: string) => s.trim()).filter(Boolean);
      names.forEach(n => { weekJobMap[n] = (weekJobMap[n] || 0) + 1; });
    });
}
```

**Step 3 — Remove the `openTechDetails` second `getWeekSchedule` call.** The detail panel calls `getWeekSchedule` again to get per-tech day breakdown. Replace it with the same dispatch-data approach:

Find `openTechDetails` and replace the body:

```ts
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

    const res = await dashboardRequest('getDispatchData');
    const jobsByDate: Record<string, typeof res.jobs> = {};
    allDates.forEach(d => { jobsByDate[d] = []; });

    if (res.success) {
      (res.jobs as any[])
        .filter(j =>
          (j.status === 'Scheduled' || j.status === 'In Progress') &&
          j.scheduledDate &&
          jobsByDate[j.scheduledDate] !== undefined &&
          String(j.assignedTech || '').split(',').map((s: string) => s.trim()).includes(tech.techName)
        )
        .forEach(j => jobsByDate[j.scheduledDate].push(j));
    }

    const grouped: DaySchedule[] = allDates.map(d => ({
      date: d,
      dayLabel: new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      jobs: (jobsByDate[d] || []).map((j: any) => ({
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
```

**What to keep unchanged:**
- The entire JSX render tree (cards, side panel, animations)
- The `activeMap` logic built from `getLiveFieldStatus`
- The `TechStatus` mapping in `mapped`
- All imports except removing the now-unused `resWeek` variable

---

## VERIFICATION

After implementing:

1. `npx tsc --noEmit` — must pass with zero errors
2. `/billing` route loads with the stub KPI cards and "Phase 3" message
3. Sidebar shows "Billing" (not "Jobs") for management/admin roles; Dispatch role should NOT see Billing
4. `/team` page: tech cards show non-zero job counts for techs who have Scheduled jobs this week
5. Clicking a tech card opens the detail panel with correct day-by-day schedule from Dispatch Queue

---

## DO NOT TOUCH

- `tech-pwa/src/app/jobs/page.tsx` — this is the tech-facing PWA view, leave it alone
- Any `.gs` files at repo root or in `dashboard-api/`
- `SchedulePageComponents.tsx` — not in scope
- `schedule/page.tsx` (Ready to Schedule DnD grid) — not in scope

---

## COMMIT MESSAGE

`feat: billing page stub, sidebar rename Jobs→Billing, team page weekly job counts from dispatch data`
