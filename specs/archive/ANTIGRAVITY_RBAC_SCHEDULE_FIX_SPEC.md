# ANTIGRAVITY SPEC — RBAC Cleanup + Schedule Grid Fixes + Search Fix
**Author:** Claude Code
**Date:** April 29, 2026
**Priority:** HIGH — production bugs affecting daily operation

**Read every line. Do not freelance. Do not touch files not listed here.**

---

## WHAT THIS FIXES (6 issues)

1. **Time Off removed from nav** — dispatch/tech roles should not see it in CC2.0
2. **RBAC single source of truth** — AppSidebar and RouteGuard use separate ROUTE_PERMISSIONS maps that are out of sync; merge into one
3. **Schedule date window** — starts from yesterday instead of today (timezone bug)
4. **Month pill multi-select** — clicking a new month doesn't clear the previous active state
5. **Search button** — fires `metaKey` which doesn't work on Windows; needs `ctrlKey || metaKey`
6. **`/time-off` route** — redirect to `/hr`, add to RouteGuard

---

## FILES TO TOUCH

1. `tech-pwa/src/components/dashboard/AppSidebar.tsx`
2. `tech-pwa/src/components/dashboard/RouteGuard.tsx`
3. `tech-pwa/src/components/dashboard/DashboardLayout.tsx`
4. `tech-pwa/src/app/schedule/page.tsx` — date window + month pill fix
5. `tech-pwa/src/app/time-off/page.tsx` — replace with redirect

**Do not touch:** DashboardAPI.gs, TechPWA.gs, live/page.tsx, JobQueueTable.tsx, JobDetailModal.tsx, or any file not listed above.

---

## FIX 1 — Shared ROUTE_PERMISSIONS Constant

Currently `AppSidebar.tsx` and `RouteGuard.tsx` each define their own `ROUTE_PERMISSIONS` object. They are out of sync. Extract it to a shared constant.

### Create `tech-pwa/src/lib/routePermissions.ts` (NEW FILE)

```typescript
export const ROUTE_PERMISSIONS: Record<string, string[]> = {
  '/live':             ['dispatch', 'management', 'admin'],
  '/schedule':         ['dispatch', 'management', 'admin'],
  '/weekly-schedule':  ['dispatch', 'management', 'compliance', 'admin'],
  '/calendar':         ['dispatch', 'management', 'hr', 'compliance', 'admin'],
  '/jobs':             ['tech'],
  '/team':             ['dispatch', 'management', 'compliance', 'hr', 'admin'],
  '/compliance':       ['management', 'compliance', 'admin'],
  '/hr':               ['management', 'hr', 'admin'],
  '/billing':          ['management', 'admin'],
  '/intel':            ['management', 'admin'],
  '/feedback':         ['dispatch', 'management', 'admin'],
};

export const DEFAULT_ROUTE: Record<string, string> = {
  tech:        '/jobs',
  dispatch:    '/live',
  management:  '/live',
  compliance:  '/compliance',
  hr:          '/hr',
  admin:       '/live',
};
```

Key changes from the current maps:
- `/time-off` is **removed entirely** — it does not exist as a standalone CC2.0 route
- `/billing` restricted to `management` and `admin` only (HR removed — billing is finance, not HR)
- `/compliance` restricted to `management`, `compliance`, `admin` (HR removed)
- Single file, imported by both AppSidebar and RouteGuard

---

## FIX 2 — AppSidebar.tsx

### Step 1: Replace the local ROUTE_PERMISSIONS with the shared import

Delete lines 44–56 (the local `const ROUTE_PERMISSIONS` declaration) and add the import:

```typescript
import { ROUTE_PERMISSIONS } from '@/lib/routePermissions';
```

### Step 2: Remove Time Off from NAV_ITEMS

Find and delete this entry from the `NAV_ITEMS` array:
```typescript
{ id: 'time-off', label: 'Time Off', icon: CalendarDays, href: '/time-off' },
```

The updated `NAV_ITEMS` array must be exactly:
```typescript
const NAV_ITEMS = [
  { id: 'live',             label: 'Coordination',      icon: Zap,          href: '/live' },
  { id: 'ready-to-schedule',label: 'Ready to Schedule', icon: Calendar,     href: '/schedule' },
  { id: 'weekly-schedule',  label: 'Schedule',          icon: CalendarDays, href: '/weekly-schedule' },
  { id: 'calendar',         label: 'Calendar',          icon: CalendarDays, href: '/calendar' },
  { id: 'team',             label: 'Team',              icon: Users,        href: '/team' },
  { id: 'compliance',       label: 'Compliance',        icon: Scale,        href: '/compliance' },
  { id: 'hr',               label: 'HR',                icon: HeartHandshake, href: '/hr' },
  { id: 'billing',          label: 'Billing',           icon: Receipt,      href: '/billing' },
  { id: 'intel',            label: 'Intel',             icon: BarChart3,    href: '/intel', status: 'stub' },
  { id: 'feedback',         label: 'Feedback',          icon: MessageSquare, href: '/feedback' },
];
```

### Step 3: Remove the special-case time-off check in visibleItems

Find and delete this line in the `visibleItems` filter:
```typescript
if (item.href === '/time-off' && !session) return false;
```

Replace the entire `visibleItems` computation with:
```typescript
const visibleItems = NAV_ITEMS.filter(item =>
  (ROUTE_PERMISSIONS[item.href] ?? []).includes(role)
);
```

---

## FIX 3 — RouteGuard.tsx

Replace the entire file with:

```typescript
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ROUTE_PERMISSIONS, DEFAULT_ROUTE } from "@/lib/routePermissions";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session?.token) {
      router.push('/login');
      return;
    }

    const role    = session.role;
    const allowed = ROUTE_PERMISSIONS[pathname];

    if (allowed && role && !allowed.includes(role)) {
      router.push(DEFAULT_ROUTE[role] ?? '/login');
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (!authorized) return null;

  return <>{children}</>;
}
```

---

## FIX 4 — `/time-off` Page: Redirect to `/hr`

Replace the entire contents of `tech-pwa/src/app/time-off/page.tsx` with:

```typescript
import { redirect } from 'next/navigation';

export default function TimeOffPage() {
  redirect('/hr');
}
```

This ensures anyone who navigates directly to `/time-off` (bookmarks, old links) is sent to the HR page where time off management lives.

---

## FIX 5 — DashboardLayout.tsx: Search Button Cross-Platform Fix

Find the search button's `onClick` handler (currently line 71):

```typescript
onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true, cancelable: true }))}
```

Replace with:

```typescript
onClick={() => {
  const isMac = navigator.platform.toUpperCase().includes('MAC');
  document.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'k',
    metaKey: isMac,
    ctrlKey: !isMac,
    bubbles: true,
    cancelable: true
  }));
}}
```

This fires `Cmd+K` on Mac and `Ctrl+K` on Windows/Linux, matching whatever the command palette component listens for.

---

## FIX 6 — Schedule Page: Date Window + Month Pill

### File: `tech-pwa/src/app/schedule/page.tsx`

#### 6a — Today's date must use Pacific timezone

Find wherever "today" is calculated for the rolling window start. It will look something like:
```typescript
const today = new Date();
```
or similar date construction for the start of the 5-day window.

Replace with a Pacific-timezone-aware today:
```typescript
// Get today's date in Pacific time (avoids UTC midnight crossover bug)
const pacificToday = new Date(
  new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
);
pacificToday.setHours(0, 0, 0, 0);
```

Use `pacificToday` as the start of the rolling window. The window must start from today (Pacific), never from Monday of the week or yesterday.

Do NOT show any date column that is before `pacificToday`. If the start of the work week is in the past, advance to today.

#### 6b — Month pill: only one active at a time

Find the month pill click handler. Currently it likely does `setActiveMonth(month)` but the pill's active state check uses an array or doesn't clear the previous selection properly.

The active pill state must be a single string value (not an array). The state declaration must be:
```typescript
const [activeMonth, setActiveMonth] = useState<string>('');
```

Each pill's active class check:
```typescript
className={activeMonth === pill.label ? 'bg-[var(--accent)] text-white' : 'bg-white/5 text-[var(--text-muted)] hover:bg-white/10'}
```

The click handler:
```typescript
onClick={() => setActiveMonth(prev => prev === pill.label ? '' : pill.label)}
```

This ensures clicking a new month clears the previous one. Clicking the same month a second time deselects it.

---

## VERIFICATION STEPS

Run these in a browser at `dispatch.aptmaintenanceinc.com` before marking complete.

**RBAC:**
- [ ] Login as dispatch — Time Off is NOT in the sidebar
- [ ] Login as hr — HR page accessible, Coordination/Schedule NOT in sidebar
- [ ] Login as management — all management routes visible, /time-off NOT in sidebar
- [ ] Navigate to `dispatch.aptmaintenanceinc.com/time-off` directly — redirects to /hr
- [ ] Navigate to `dispatch.aptmaintenanceinc.com/compliance` as dispatch — redirects to /live
- [ ] Navigate to `dispatch.aptmaintenanceinc.com/billing` as hr — redirects to /hr

**Schedule page:**
- [ ] Ready to Schedule page shows today (Apr 29) as the first column, NOT yesterday (Apr 28)
- [ ] Clicking MAY pill: APR is no longer orange
- [ ] Clicking JUN pill: MAY is no longer orange
- [ ] Clicking the same pill twice deselects it (no pill orange)

**Search:**
- [ ] Clicking the Search button in the header opens the command palette on Windows (Ctrl+K)
- [ ] Clicking the Search button in the header opens the command palette on Mac (Cmd+K)

**General:**
- [ ] `tsc --noEmit` passes with 0 errors
- [ ] No console errors on page load for any role
- [ ] Dark mode: no light-mode bleed on any changed components
