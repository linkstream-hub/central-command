# ANTIGRAVITY SPRINT — Navigation Restructure, RBAC, Full Schedule View, HR Page
# Priority: HIGH — Management-facing structural changes.
# Read every section before writing code. Many sections depend on each other.

---

## WHAT CLAUDE CODE ALREADY FIXED THIS SESSION

These are DONE. Do not re-do them:
- `schedule/page.tsx`: `weekDates` now computed as rolling 5 working days from today (Pacific time), not Mon–Fri of current calendar week
- `schedule/page.tsx`: `today` uses Pacific timezone via `Intl.DateTimeFormat`
- `schedule/page.tsx`: `Number(j.estimatedHours)` coercion applied — no more string concatenation bug
- `schedule/page.tsx`: `weekHours` computed across all 5 visible dates and passed to `TechLaneHeader`
- `SchedulePageComponents.tsx`: `TechLaneHeader` now accepts `weekHours?: number` and renders `{weekHours}/40.0 WK` below the daily bar. Turns red when `weekHours > 40`.
- `dashboard-api.ts`: `needsActionCount` = New + PTE Required + Awaiting Approval

---

## PART 1 — SIDEBAR NAVIGATION RESTRUCTURE

### File: `src/components/dashboard/AppSidebar.tsx`

**Current NAV_ITEMS:**
```typescript
{ id: 'live',       label: 'Coordination',  href: '/live' },
{ id: 'schedule',   label: 'Schedule',      href: '/schedule' },
{ id: 'jobs',       label: 'Jobs',          href: '/jobs' },
{ id: 'team',       label: 'Team',          href: '/team' },
{ id: 'compliance', label: 'Compliance',    href: '/compliance' },
{ id: 'intel',      label: 'Intel',         href: '/intel', status: 'stub' },
```

**Required NAV_ITEMS (replace entirely):**
```typescript
{ id: 'live',             label: 'Coordination',       href: '/live' },
{ id: 'ready-to-schedule',label: 'Ready to Schedule',  href: '/schedule' },      // renamed
{ id: 'weekly-schedule',  label: 'Schedule',            href: '/weekly-schedule' }, // NEW PAGE
{ id: 'jobs',             label: 'Jobs',               href: '/jobs' },
{ id: 'team',             label: 'Team',               href: '/team' },
{ id: 'compliance',       label: 'Compliance',         href: '/compliance' },
{ id: 'hr',               label: 'HR',                 href: '/hr' },             // NEW PAGE
{ id: 'intel',            label: 'Intel',              href: '/intel', status: 'stub' },
```

Icon suggestions:
- Ready to Schedule: keep Calendar
- Schedule (weekly): use `CalendarDays` from lucide-react
- HR: use `HeartHandshake` from lucide-react

---

## PART 2 — ROLE-BASED ACCESS CONTROL (RBAC)

### Overview

The current system uses a single passcode "APT2026!" for all dashboard users. We need to
differentiate roles so Dispatch cannot access Compliance or HR, and HR cannot access Intel or
Coordination dispatch queue.

### 2A — Role Definitions

```typescript
type UserRole = 'dispatch' | 'management' | 'compliance' | 'hr' | 'admin';
```

| Role | Who | Accessible Routes |
|---|---|---|
| `dispatch` | Robert | /live, /schedule, /weekly-schedule, /jobs, /team |
| `management` | Keith, Brandon, Tsegab, Bem | All routes |
| `compliance` | Ana (compliance view) | /compliance, /weekly-schedule (read-only), /team (read-only) |
| `hr` | Ana (HR view) | /hr, /team (read-only) |
| `admin` | Brandon | All routes + future /settings |

### 2B — Role Passcodes

Add these to the login page. Each passcode maps to a role:

```typescript
const ROLE_PASSCODES: Record<string, UserRole> = {
  'APT2026!':    'dispatch',
  'APT-MGT-26':  'management',
  'APT-HR-26':   'hr',
  'APT-COMP-26': 'compliance',
  'APT-ADM-26':  'admin',
};
```

These are internal codes — Robert gets `APT2026!`, Ana gets `APT-HR-26`, management gets
`APT-MGT-26`. Brandon (admin) gets `APT-ADM-26`.

> Note: In a future sprint, Claude Code will move these to a backend Script Property so they
> can be rotated without a code deploy. For now, frontend constants are acceptable.

### 2C — Auth Storage

After login, store both session and role in localStorage:

```typescript
// On successful login:
localStorage.setItem('apt_dashboard_session', passcode);
localStorage.setItem('apt_dashboard_role', ROLE_PASSCODES[passcode]);
```

### 2D — `getSession()` in `src/lib/auth.ts`

Extend or replace the existing `getSession` to also return role:

```typescript
export function getSession(): { valid: boolean; role: UserRole | null } {
  if (typeof window === 'undefined') return { valid: false, role: null };
  const role = localStorage.getItem('apt_dashboard_role') as UserRole | null;
  const session = localStorage.getItem('apt_dashboard_session');
  const validPasscodes = Object.keys(ROLE_PASSCODES);
  if (!session || !validPasscodes.includes(session)) return { valid: false, role: null };
  return { valid: true, role };
}
```

Export `UserRole` type from `auth.ts` so other files can import it.

### 2E — Role-Aware Sidebar

`AppSidebar.tsx` must read the role and filter nav items:

```typescript
const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  '/live':             ['dispatch', 'management', 'admin'],
  '/schedule':         ['dispatch', 'management', 'admin'],
  '/weekly-schedule':  ['dispatch', 'management', 'compliance', 'admin'],
  '/jobs':             ['dispatch', 'management', 'admin'],
  '/team':             ['dispatch', 'management', 'compliance', 'hr', 'admin'],
  '/compliance':       ['management', 'compliance', 'admin'],
  '/hr':               ['management', 'hr', 'admin'],
  '/intel':            ['management', 'admin'],
};
```

Inside `AppSidebar`:
```typescript
const { role } = getSession();
const visibleItems = NAV_ITEMS.filter(item =>
  (ROUTE_PERMISSIONS[item.href] || []).includes(role ?? 'dispatch')
);
// Render visibleItems instead of NAV_ITEMS
```

### 2F — Route Guard

Create `src/components/dashboard/RouteGuard.tsx`:

```typescript
"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSession } from "@/lib/auth";

const ROUTE_PERMISSIONS: Record<string, string[]> = {
  // same map as above
};

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { valid, role } = getSession();

  useEffect(() => {
    if (!valid) { router.push('/login'); return; }
    const allowed = ROUTE_PERMISSIONS[pathname];
    if (allowed && role && !allowed.includes(role)) {
      router.push('/live'); // redirect to first allowed page
    }
  }, [pathname, valid, role, router]);

  return <>{children}</>;
}
```

Wrap `DashboardLayout.tsx`'s children with `<RouteGuard>`.

### 2G — Login Page Update

In `src/app/login/page.tsx`, after passcode validation:
1. Look up role from `ROLE_PASSCODES`
2. Store both in localStorage
3. Redirect based on role: dispatch → `/live`, hr → `/hr`, compliance → `/compliance`, management/admin → `/live`

---

## PART 3 — FULL WEEKLY SCHEDULE VIEW

### New File: `src/app/weekly-schedule/page.tsx`

This is a **read-only** view showing all currently scheduled/assigned jobs for the week, grouped
by day. No drag and drop. Management and Dispatch use this to see the full committed schedule.

### Layout

```
WEEKLY SCHEDULE
Week of Apr 21 – Apr 25

[ MONDAY Apr 21 ]          [ TUESDAY Apr 22 ]     ...
  ┌─────────────────────┐    ┌──────────────────┐
  │ Salvador Cabrera     │    │ Jose Manuel A.   │
  │ 72 Vernon St. · 2H   │    │ 264 Lee St. · 4H │
  │ Electrical           │    │ Plumbing         │
  └─────────────────────┘    └──────────────────┘
  ┌─────────────────────┐
  │ Jaime Ruiz           │
  │ 2526 Durant Ave · 4H │
  │ Multi-Trade          │
  └─────────────────────┘

[ No assignments ]
```

Show Mon–Fri of the current calendar week (not rolling — this is the full-week overview).

### Data Source

Fetch `getDispatchData`. Filter jobs where:
```typescript
status === 'Scheduled' || status === 'In Progress'
```

Group by `scheduledDate`, then within each date by `assignedTech`. Show all 5 weekdays even if
some have no jobs (render "No assignments scheduled" for empty days).

### Metrics Bar at Top

Show aggregate stats across the week:
```
[ 28 TECHS ACTIVE ]  [ 47 JOBS SCHEDULED ]  [ 156 HRS COMMITTED ]  [ 71% CAPACITY ]
```
- "71% CAPACITY" = total committed hours / (28 techs × 8h/day × 5 days) × 100
- These are read-only KPI cards, no click interaction

### Job Card (simplified, read-only)

```tsx
<div className="p-3 rounded-xl border border-white/5 bg-[var(--bg-surface)] mb-2">
  <div className="flex items-center justify-between mb-1">
    <span className="text-[10px] font-black text-[var(--accent)] uppercase">{tech}</span>
    <span className="text-[9px] font-black text-[var(--text-muted)]">{estHours}H · {time || 'TBD'}</span>
  </div>
  <p className="text-xs font-bold text-[var(--text-primary)]">{address}</p>
  <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wide mt-0.5">{serviceCategory}</p>
</div>
```

Clicking a job card does nothing in this view — it's read-only. Add a subtle tooltip: "Open in Coordination to edit."

---

## PART 4 — DURATION ENFORCEMENT (0-HOUR PREVENTION)

### File: `src/components/dashboard/SchedulePageComponents.tsx`

The `DurationSelectorModal` currently allows Dispatch to confirm a schedule without selecting
a duration. Jobs are being saved with `estimatedHours: 0`. This must be blocked.

**Required changes to `DurationSelectorModal`:**

1. The confirm button must be **disabled** until duration > 0 is selected.
2. Add a validation message if the user tries to submit with 0 hours:
```tsx
{selectedHours === 0 && (
  <p className="text-[9px] text-urgent font-black uppercase tracking-widest text-center animate-pulse">
    Duration required — select hours to schedule
  </p>
)}
```
3. Default selection should be `4` hours (not 0). Initialize state:
```typescript
const [selectedHours, setSelectedHours] = useState(4);
```
4. The confirm button:
```tsx
<button
  onClick={() => selectedHours > 0 && onConfirm(selectedHours, selectedTime)}
  disabled={selectedHours === 0}
  className={`... ${selectedHours === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:brightness-110'}`}
>
  Confirm Schedule
</button>
```

---

## PART 5 — HR PAGE (MVP)

### New File: `src/app/hr/page.tsx`

Accessible only to `hr`, `management`, and `admin` roles.

This is an MVP — clean, functional, professional. It does NOT need to connect to a live data
source yet. Use structured placeholder sections that make it clear what will live here.

### Layout

```
HR COMMAND
Ana's workspace for employee relations and accommodations.

[ OPEN ACCOMMODATIONS ]  [ ACTIVE INCIDENTS ]  [ TIME OFF REQUESTS ]  [ EMPLOYEE RECORDS ]
        2                       0                      5                      28

--- ACTIVE ACCOMMODATIONS ---
  [List of cards — placeholder: "No active accommodations on file"]

--- INCIDENT LOG ---
  [List of cards — placeholder: "No open incidents"]

--- TIME OFF REQUESTS ---
  Link card → "Manage in AppSheet Time Off Manager"
  (href: https://www.appsheet.com — update once real URL obtained)

--- QUICK ACTIONS ---
  [ + Log New Accommodation ]  [ + File Incident Report ]  [ Export Records ]
  (these buttons open placeholder modals for now — no backend wired yet)
```

### Style

Same dark premium aesthetic as the rest of the dashboard. Use the same card classes, typography
scale, and color tokens. This page should feel like it belongs in the same system, not like it
was bolted on.

---

## PART 6 — SCHEDULE PAGE HEADER UPDATE

### File: `src/app/schedule/page.tsx`

**Update the page title and subtitle to reflect the rename:**

Find:
```tsx
<h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">
  Dispatch <span className="text-[var(--accent)]">Scheduler</span>
</h2>
<p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
  Operational Window: {weekRange || 'Loading...'}
</p>
```

Replace with:
```tsx
<h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">
  Ready to <span className="text-[var(--accent)]">Schedule</span>
</h2>
<p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
  Next 5 Working Days · {weekRange || 'Loading...'}
</p>
```

**Update the day headers** to show actual dates prominently. For each column:
```tsx
const isToday = dateStr === new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
// Apply to header div:
className={`... ${isToday ? 'bg-[var(--accent)]/8 border-b-2 border-b-[var(--accent)]' : ''}`}
```

The day header should render:
```
THU          FRI          MON
Apr 23       Apr 24       Apr 27
```
Use `weekday: 'short'` for the day abbreviation and `month: 'short', day: 'numeric'` for the date.

---

## DEPLOYMENT

After ALL sections above are complete:
```bash
cd tech-pwa
npx tsc --noEmit  # must be zero errors
npm run build     # must succeed
git add -A
git commit -m "feat: nav restructure, RBAC, weekly schedule view, HR page, 0-hour enforcement"
git push origin main
```

---

## WHAT NOT TO TOUCH

- `dashboard-api.ts` — Claude Code owns this
- `DashboardAPI.gs`, `Code.js`, `TechPWA.gs` — Claude Code owns all `.gs` files
- `JobQueueTable.tsx` — do not modify; status logic was just corrected by Claude Code
- `JobDetailModal.tsx` — do not modify; edit mode was just implemented
- Any `.gs`, `.js`, or `.html` files at the repo root — clasp requires them there; do not move

---

*Spec written by Claude Code (claude-sonnet-4-6) — April 23, 2026*
*Supersedes ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md for navigation and RBAC sections.*
*ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md time-slot spec still applies — implement that too.*
