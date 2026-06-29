# ANTIGRAVITY SESSION 50 SPEC — HARDENED BY CLAUDE CODE
# Status: APPROVED FOR AG IMPLEMENTATION

---

## CRITICAL PREFLIGHT — READ BEFORE TOUCHING ANY FILE

The PG draft spec had incorrect file paths, wrong priority enum values, and a completely wrong data model for the trainee check. **Do not use the PG spec.** Use this file only.

### VERIFIED LITERALS (pulled from live codebase)

| Symbol | Verified Value | Source File |
|---|---|---|
| `StatusTab` type | `'ALL' \| 'NEW' \| 'READY_TO_SCHEDULE' \| 'PTE_REQUIRED' \| 'AWAITING_APPROVAL' \| 'SCHEDULED' \| 'COMPLETE'` | `src/components/dashboard/JobQueueTable.tsx:34` |
| `statusTab` state variable | `useState<StatusTab>('ALL')` | `src/app/live/page.tsx:30` |
| `setStatusTab` setter | `(s: StatusTab) => void` | `src/app/live/page.tsx:30` |
| `Job.priority` values | `'1-URGENT' \| '2-TURNOVER' \| '3-PTE-PENDING' \| '4-STANDARD'` | `src/lib/types.ts:14` |
| `Job.assignedTech` type | `string` (comma-separated names, e.g., `"John Smith, Jane Doe"`) | `src/lib/types.ts:29` |
| Tech rank type | `TechEntry.badge?: string` — values: `"C"`, `"L"`, `"L1"`, `"L2"`, `"T"` | `src/components/dashboard/SchedulingDispatch.tsx:14` |
| `techRoster` state in JobDetailModal | `useState<TechEntry[]>([])` | `src/components/dashboard/JobDetailModal.tsx:103` |
| Existing trainee warning text | `"Trainee — must be paired with a Captain or Lieutenant. Verify a senior tech is on-site."` | `src/components/dashboard/SchedulingDispatch.tsx:530` |
| Existing trainee warning classes | `flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20` | `src/components/dashboard/SchedulingDispatch.tsx:526` |
| `phase` variable in JobDetailModal | `'COORDINATION' \| 'DISPATCH' \| 'EXECUTION' \| 'POST-JOB'` | `src/components/dashboard/JobDetailModal.tsx:136` |
| Toast (dispatch components) | `const { toast } = useToast()` from `@/context/ToastContext` | `src/components/dashboard/JobDetailModal.tsx:99` |
| Toast (tech PWA pages) | `import { toast } from 'sonner'` | `src/app/jobs/page.tsx:14` |
| `AlertTriangle` icon | Already imported in `JobDetailModal.tsx` | `src/components/dashboard/JobDetailModal.tsx:17` |
| `framer-motion` version | `^12.38.0` (whileHover/whileTap/variants all supported) | `package.json` |
| Tailwind version | v4 (`@import "tailwindcss"`) — `backdrop-blur-md`, `backdrop-blur-xl` built-in | `src/app/globals.css:1` |
| Priority URGENT in jobs/page.tsx | `border-l-red-500`, chip: `bg-red-500/20 text-red-400` | `src/app/jobs/page.tsx:17-27` |
| Priority TURNOVER in jobs/page.tsx | `border-l-orange-500`, chip: `bg-orange-500/20 text-orange-400` | `src/app/jobs/page.tsx:18-22` |
| Priority STANDARD in jobs/page.tsx | `border-l-blue-500`, chip: `bg-blue-500/20 text-blue-400` | `src/app/jobs/page.tsx:20-25` |
| i18n for new trainee text | Not required — dispatch-side warning, no Spanish translation needed | SchedulingDispatch.tsx has no i18n either |

---

## FILE INVENTORY — CORRECTED PATHS

### Files to Touch

| Path | Purpose | Changes |
|---|---|---|
| `tech-pwa/src/app/live/page.tsx` | Dispatch queue main page | Fix 1: URL tab deep-linking via Suspense + TabSync pattern |
| `tech-pwa/src/components/dashboard/JobDetailModal.tsx` | Job detail modal (dispatch) | Fix 2: Trainee warning; UI: section glassmorphism polish |
| `tech-pwa/src/components/dashboard/JobQueueTable.tsx` | Job queue table rows | UI: Priority left border (replace age-based ageColor bar) |
| `tech-pwa/src/components/dashboard/SchedulingDispatch.tsx` | Scheduling grid + tech selection | UI: Minor job chip styling polish only |
| `tech-pwa/src/components/dashboard/AppSidebar.tsx` | Left nav | MINOR: Already has correct Linear active state — no changes required |
| `tech-pwa/src/app/jobs/page.tsx` | Tech job list (mobile) | UI: Glassmorphism card enhancement |
| `tech-pwa/src/app/job/[jobId]/page.tsx` | Tech job detail page | UI: Section cards glassmorphism; celebration animation polish |
| `tech-pwa/src/components/ClockedInBar.tsx` | Clocked-in shift bar | UI: Green gradient background enhancement |

### Files NOT to Touch

- Any `.gs`, `.js`, `.html` file at repo root
- `src/lib/dashboard-api.ts`
- `src/lib/types.ts`
- `src/auth.ts`
- `src/app/api/push/subscribe/route.ts`
- `dashboard-api/DashboardAPI.gs`
- `src/components/MarkCompleteFlow.tsx` — DOES NOT EXIST, do not create
- `src/components/WorkOrderModal.tsx` — DOES NOT EXIST, do not create
- `src/components/DispatchQueue.tsx` — DOES NOT EXIST, do not create
- `src/components/Sidebar.tsx` — DOES NOT EXIST, do not create

---

## FIX 1 — URL TAB DEEP-LINKING

**File:** `tech-pwa/src/app/live/page.tsx`

### Context
Current state: `statusTab` is initialized to `'ALL'` with no URL awareness. `useSearchParams` is not imported.

### Implementation

**Step 1**: Add imports at top of file (after existing imports):

```tsx
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
```

**Step 2**: Add the constant and sub-component OUTSIDE the `LivePage` function (at module level, before `export default function LivePage`):

```tsx
const TAB_PARAM_MAP: Record<string, StatusTab> = {
  'review':    'NEW',
  'ready':     'READY_TO_SCHEDULE',
  'pte':       'PTE_REQUIRED',
  'approval':  'AWAITING_APPROVAL',
  'scheduled': 'SCHEDULED',
  'complete':  'COMPLETE',
};

function TabSync({ onTab }: { onTab: (t: StatusTab) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const tabParam = searchParams?.get('tab');
    if (tabParam && TAB_PARAM_MAP[tabParam]) {
      onTab(TAB_PARAM_MAP[tabParam]);
    }
  }, [searchParams, onTab]);
  return null;
}
```

**Step 3**: Inside the `LivePage` JSX, add this as the **first child** inside the `<DashboardLayout>`:

```tsx
<DashboardLayout>
  <Suspense fallback={null}>
    <TabSync onTab={setStatusTab} />
  </Suspense>
  {/* ... rest of existing JSX unchanged ... */}
```

**Step 4**: Verify `useEffect` is already imported (it is, line 3). No other changes.

### Behavior
- `/live?tab=pte` → sets `statusTab` to `'PTE_REQUIRED'`
- `/live?tab=review` → sets `statusTab` to `'NEW'`
- `/live?tab=ready` → sets `statusTab` to `'READY_TO_SCHEDULE'`
- `/live?tab=scheduled` → sets `statusTab` to `'SCHEDULED'`
- `/live?tab=complete` → sets `statusTab` to `'COMPLETE'`
- `/live?tab=approval` → sets `statusTab` to `'AWAITING_APPROVAL'` (state changes but no tab button highlights — this is correct; it filters the table without a matching tab)
- `/live?tab=invalid` → no change, default `'ALL'` tab remains
- `/live` (no param) → no change, default `'ALL'` tab remains

---

## FIX 2 — TRAINEE WARNING IN JobDetailModal

**File:** `tech-pwa/src/components/dashboard/JobDetailModal.tsx`

### Context
- `activeJob.assignedTech` is a string: comma-separated tech names, e.g., `"John Smith, Jane Doe"` (may include badge suffix like `" #123"`)
- `techRoster` state (`TechEntry[]`) is already loaded at component level (line 103)
- `TechEntry.badge` holds rank string: `"C"`, `"L"`, `"L1"`, `"L2"`, `"T"` (or numeric badge ID)
- `AlertTriangle` is already imported (line 17)
- No additional imports required

### Implementation

**Step 1**: Add `useMemo` import. Current line 3: `import { useState, useEffect, useCallback, useRef } from "react";` — add `useMemo`:

```tsx
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
```

**Step 2**: Add the trainee warning derived state inside `JobDetailModal` component body, after the `phase` variable declaration (after line ~143):

```tsx
const traineeWarning = useMemo(() => {
  if (!activeJob?.assignedTech || !techRoster.length) return null;
  const names = activeJob.assignedTech
    .split(',')
    .map(s => s.trim().split(' #')[0].trim().toLowerCase())
    .filter(Boolean);
  if (!names.length) return null;
  const assigned = techRoster.filter(t =>
    names.some(n => t.name.toLowerCase() === n)
  );
  if (!assigned.length) return null;
  const hasTrainee = assigned.some(t => (t.badge || '').toUpperCase() === 'T');
  const hasSupervisor = assigned.some(t =>
    ['C', 'L', 'L1', 'L2'].includes((t.badge || '').toUpperCase())
  );
  return hasTrainee && !hasSupervisor
    ? 'Trainee — must be paired with a Captain or Lieutenant. Verify a senior tech is on-site.'
    : null;
}, [activeJob?.assignedTech, techRoster]);
```

**Step 3**: Add the warning render inside the right panel. Place it at the end of the `{phase === 'DISPATCH' && ...}` block, AFTER the `<SchedulingDispatch>` component and tenant self-scheduling section, but STILL inside the outer `<>` fragment:

```tsx
{/* Trainee warning — shown when trainee is solo-assigned */}
{traineeWarning && (
  <motion.div
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
  >
    <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
    <p className="text-[10px] font-bold text-amber-400 leading-snug">
      {traineeWarning}
    </p>
  </motion.div>
)}
```

Also add a secondary render outside the `phase === 'DISPATCH'` block (for EXECUTION phase and others). Place it after the `{phase === 'POST-JOB' && ...}` block, before `{/* ── WORK ORDER CONTEXT ── */}`:

```tsx
{/* Trainee warning — persists across phases */}
{traineeWarning && phase !== 'DISPATCH' && (
  <motion.div
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
  >
    <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
    <p className="text-[10px] font-bold text-amber-400 leading-snug">
      {traineeWarning}
    </p>
  </motion.div>
)}
```

**Warning text matches SchedulingDispatch.tsx exactly** (line 529–530). Do NOT block save. Warning is advisory only — the save button remains enabled.

---

## UI REDESIGN — JobQueueTable.tsx (Priority Left Border)

**File:** `tech-pwa/src/components/dashboard/JobQueueTable.tsx`

### Context
The left 4px border at line 404 currently shows job AGE color (green/yellow/orange/red based on how old the job is). The spec requests priority-based colors instead.

The `ageColor` variable is used in one place: the `<div className={\`absolute left-0 top-0 bottom-0 w-[4px] shadow-[2px_0_10px_rgba(0,0,0,0.5)] ${ageColor}\`}`.

### Implementation

**Step 1**: Add a `priorityBorderColor` lookup inside the `.map((job, i) => {` callback, after the existing `pInfo`, `tInfo`, `ageColor` declarations:

```tsx
const priorityBorderColor = (() => {
  const p = (job.priority || '').toUpperCase();
  if (p.includes('URGENT'))   return 'bg-red-500';
  if (p.includes('TURNOVER')) return 'bg-orange-500';
  if (p.includes('PTE'))      return 'bg-yellow-500';
  return 'bg-blue-500';
})();
```

**Step 2**: Replace `${ageColor}` with `${priorityBorderColor}` in the age bar div:

OLD:
```tsx
<div className={`absolute left-0 top-0 bottom-0 w-[4px] shadow-[2px_0_10px_rgba(0,0,0,0.5)] ${ageColor}`} />
```

NEW:
```tsx
<div className={`absolute left-0 top-0 bottom-0 w-[4px] shadow-[2px_0_10px_rgba(0,0,0,0.5)] ${priorityBorderColor}`} />
```

**Step 3**: The `getAgeColor` function and `ageColor` constant can remain — they are still used elsewhere or can be kept for reference. Do NOT delete them if `ageColor` is referenced anywhere else in the file (verify with grep before removing).

### Result
- URGENT jobs (1-URGENT): red left bar
- TURNOVER jobs (2-TURNOVER): orange left bar
- PTE-PENDING jobs (3-PTE-PENDING): yellow left bar
- STANDARD jobs (4-STANDARD): blue left bar

---

## UI REDESIGN — JobDetailModal.tsx Section Glassmorphism

**File:** `tech-pwa/src/components/dashboard/JobDetailModal.tsx`

### Context
Section cards currently use `bg-[var(--bg-surface)] rounded-2xl border border-white/5`. The spec requests consistent glassmorphism across modal sections. Apply to the following section containers:

1. Job Details section card (line ~552): `className="bg-[var(--bg-surface)] rounded-2xl border border-white/5 p-5 space-y-3"` 
2. Work Order Context section card (line ~843): `className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-white/5"`
3. Property Access section card (line ~883): `className="p-5 bg-orange-400/5 border-l-4 border-orange-400 rounded-r-2xl"` — **DO NOT CHANGE** (the orange accent border is intentional for access info)

### Implementation

For Job Details and Work Order Context section cards, update `border-white/5` to `border-white/10` and add `backdrop-blur-sm`:

Job Details (line ~552):
```tsx
// OLD
className="bg-[var(--bg-surface)] rounded-2xl border border-white/5 p-5 space-y-3"
// NEW
className="bg-[var(--bg-surface)] rounded-2xl border border-white/10 backdrop-blur-sm p-5 space-y-3"
```

Work Order Context (line ~843):
```tsx
// OLD
className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-white/5"
// NEW
className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-white/10 backdrop-blur-sm"
```

**Do not change** the Job Status section card classes (the Scheduled/In Progress/etc. display cards use intentional status-specific colors).

---

## UI REDESIGN — Tech Job List (jobs/page.tsx)

**File:** `tech-pwa/src/app/jobs/page.tsx`

### Context
Job cards already use `border-l-4` priority borders and `bg-[var(--bg-surface)]`. Enhancement: add backdrop blur and subtle glassmorphism.

### Implementation

**Step 1**: Update the job card `className` in the `jobs.map()` render (line ~238):

OLD:
```tsx
className={`w-full text-left bg-[var(--bg-surface)] border border-[var(--border-subtle)] border-l-4 ${PRIORITY_BORDER[priorityKey] ?? "border-l-blue-500"} rounded-2xl p-5 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform`}
```

NEW:
```tsx
className={`w-full text-left bg-[var(--bg-surface)]/80 border border-white/10 border-l-4 ${PRIORITY_BORDER[priorityKey] ?? "border-l-blue-500"} rounded-2xl p-5 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform backdrop-blur-sm`}
```

Changes: `bg-[var(--bg-surface)]` → `bg-[var(--bg-surface)]/80`, `border-[var(--border-subtle)]` → `border-white/10`, add `backdrop-blur-sm`.

**Step 2**: Add `whileHover` to the `<motion.button>` (it currently has `initial`, `animate`, `transition` but no hover):

Add after existing `transition` prop:
```tsx
whileHover={{ scale: 1.01 }}
whileTap={{ scale: 0.98 }}
```

No other changes to this file.

---

## UI REDESIGN — Tech Job Detail (job/[jobId]/page.tsx)

**File:** `tech-pwa/src/app/job/[jobId]/page.tsx`

### Context
Section cards use `bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl`. Enhancement: glassmorphism. The celebration overlay already exists (`showCelebration`) — do not rebuild it.

### Implementation

**Step 1**: Update Timer Card (line ~181):

OLD:
```tsx
className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 text-center shadow-xl"
```

NEW:
```tsx
className="bg-[var(--bg-surface)]/80 border border-white/10 rounded-3xl p-6 text-center shadow-xl backdrop-blur-sm"
```

**Step 2**: Update Access & Tenant section (line ~234):

OLD:
```tsx
className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-5 space-y-4"
```

NEW:
```tsx
className="bg-[var(--bg-surface)]/80 border border-white/10 rounded-3xl p-5 space-y-4 backdrop-blur-sm"
```

**Step 3**: Update Task Description section (line ~255):

OLD:
```tsx
className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-5 space-y-3"
```

NEW:
```tsx
className="bg-[var(--bg-surface)]/80 border border-white/10 rounded-3xl p-5 space-y-3 backdrop-blur-sm"
```

**Step 4**: Enhance celebration overlay scale animation (line ~154–155). The scale animation is already `[0, 1.2, 1]`. Add a green glow shadow:

OLD:
```tsx
className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
```

NEW:
```tsx
className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.4)]"
```

No other changes to this file.

---

## UI REDESIGN — ClockedInBar.tsx

**File:** `tech-pwa/src/components/ClockedInBar.tsx`

### Context
Current bar: `bg-slate-900/95 backdrop-blur-md`. Enhancement: green-tinted glassmorphism to signal active shift state.

### Implementation

Update the `motion.div` className (line ~127–131):

OLD:
```tsx
className="fixed bottom-0 left-0 right-0 z-50
  bg-slate-900/95 backdrop-blur-md
  border-t border-white/10
  px-4 py-3 pb-safe
  flex items-center justify-between gap-4"
```

NEW:
```tsx
className="fixed bottom-0 left-0 right-0 z-50
  bg-gradient-to-r from-green-500/15 to-emerald-500/15 backdrop-blur-xl
  border-t border-white/10
  px-4 py-3 pb-safe
  flex items-center justify-between gap-4"
```

When `shift.status === 'on-break'`, the gradient should be purple-tinted. Change the className to be conditional:

```tsx
className={`fixed bottom-0 left-0 right-0 z-50
  ${shift.status === 'on-break'
    ? 'bg-gradient-to-r from-purple-500/15 to-violet-500/15'
    : 'bg-gradient-to-r from-green-500/15 to-emerald-500/15'
  } backdrop-blur-xl
  border-t border-white/10
  px-4 py-3 pb-safe
  flex items-center justify-between gap-4`}
```

No other changes to this file.

---

## UI REDESIGN — AppSidebar.tsx

**File:** `tech-pwa/src/components/dashboard/AppSidebar.tsx`

### Status: NO CHANGES REQUIRED

The sidebar already has a correct Linear-style active state:
- Active: `bg-[var(--accent)]/10` with `text-[var(--accent)]`
- Left indicator: `w-1 bg-[var(--accent)] rounded-r-full` animated via `layoutId="sidebar-active"`
- Hover: spring `x: 4` animation
- All Framer Motion patterns already in place

The PG spec proposed `blue-500/20` active color, but the APT design system uses `var(--accent)` (orange) as the brand color. Do NOT change to blue — that would break visual coherence with priority badges and the rest of the dashboard.

**AG: skip this file entirely.**

---

## UI REDESIGN — SchedulingDispatch.tsx (Minor)

**File:** `tech-pwa/src/components/dashboard/SchedulingDispatch.tsx`

### Context
Job chips in the schedule grid. Currently minimal. Only apply if the existing chips look inconsistent after other changes.

### Implementation
No mandatory changes for this sprint. The existing chip styling uses `bg-[var(--accent)]/10 border-[var(--accent)]/20` patterns already aligned with the glassmorphism theme.

**AG: skip this file entirely for this sprint.**

---

## TYPESCRIPT REQUIREMENTS

After all changes:
- `useMemo` added to JobDetailModal imports — verify no TS errors
- `Suspense` added to live/page.tsx imports — verify no TS errors
- `TabSync` component in live/page.tsx uses `StatusTab` (already exported from JobQueueTable) — ensure it's in scope
- `traineeWarning` in JobDetailModal: `activeJob?.assignedTech` is `string | undefined` — the null guard is correct
- All Tailwind classes used are standard v4 classes (backdrop-blur-sm, backdrop-blur-xl, from-green-500/15 etc.)

Run `npx tsc --noEmit` from `tech-pwa/` before reporting complete. Zero errors required.

---

## ERROR HANDLING

| Scenario | Expected Behavior |
|---|---|
| `?tab=invalid` URL param | `TAB_PARAM_MAP[tabParam]` returns `undefined`; `useEffect` guard `if (tabParam && TAB_PARAM_MAP[tabParam])` skips; default `'ALL'` tab stays |
| No `?tab` param | `searchParams?.get('tab')` returns `null`; guard skips; default tab stays |
| `assignedTech` is empty string | `split(',').filter(Boolean)` returns `[]`; `traineeWarning` returns `null`; no warning shown |
| `techRoster` not yet loaded (loading state) | `techRoster.length === 0`; `traineeWarning` returns `null`; no warning shown during load |
| Tech name not found in roster | `assigned` array is empty; `traineeWarning` returns `null`; silent fail |
| ClockedInBar when `shift === null` | Component returns `null` (line 56 guard); no render at all |

---

## VERIFICATION CHECKLIST

### Fix 1: URL Tab Deep-Linking
- [ ] Navigate to `/live?tab=pte` — PTE Required tab activates on load (no manual click)
- [ ] Navigate to `/live?tab=review` — Needs Review tab activates
- [ ] Navigate to `/live?tab=ready` — Ready to Schedule tab activates
- [ ] Navigate to `/live?tab=scheduled` — Scheduled tab activates
- [ ] Navigate to `/live?tab=complete` — Complete tab activates
- [ ] Navigate to `/live?tab=invalid` — defaults to All tab, no error
- [ ] Navigate to `/live` (no param) — defaults to All tab, page loads normally
- [ ] Reload with `?tab=pte` still in URL — tab re-activates (useEffect fires again)

### Fix 2: Trainee Warning
- [ ] Open any job in JobDetailModal
- [ ] In SchedulingDispatch (DISPATCH phase), assign only a trainee (badge `T`) — warning appears inside SchedulingDispatch (existing behavior preserved)
- [ ] Save job with trainee solo → re-open job — warning now appears in the right panel (new behavior via `traineeWarning` useMemo)
- [ ] Warning text reads exactly: "Trainee — must be paired with a Captain or Lieutenant. Verify a senior tech is on-site."
- [ ] Warning uses amber styling (matching SchedulingDispatch.tsx:526 classes)
- [ ] Save button is NOT disabled when warning is shown
- [ ] Assign trainee + supervisor (badge `C`, `L`, `L1`, or `L2`) — warning disappears
- [ ] No warning when no techs assigned
- [ ] No warning when only supervisors assigned

### UI: JobQueueTable Priority Left Border
- [ ] Load dispatch queue — URGENT jobs show red left bar
- [ ] TURNOVER jobs show orange left bar
- [ ] PTE-PENDING jobs show yellow left bar
- [ ] STANDARD jobs show blue left bar
- [ ] Age badge (aging/stale) still shows in status column (unaffected)

### UI: Tech Job List (jobs/page.tsx)
- [ ] Job cards have subtle glassmorphism (backdrop-blur visible at 375px)
- [ ] Border is `border-white/10` (slightly more visible than before)
- [ ] Priority left border colors unchanged
- [ ] `whileHover` scale animation fires on hover/tap
- [ ] Skeleton loaders still show during load

### UI: Tech Job Detail (job/[jobId]/page.tsx)
- [ ] Timer card, access section, task description all have `backdrop-blur-sm`
- [ ] Celebration overlay has green glow shadow on the CheckCircle circle
- [ ] All existing functionality preserved (mark complete, flag issue, photo upload)

### UI: ClockedInBar
- [ ] Active shift shows green gradient (from-green-500/15 to-emerald-500/15)
- [ ] Break state shows purple gradient (from-purple-500/15 to-violet-500/15)
- [ ] Timer still runs, dot still pulses
- [ ] Clock out / rest period buttons unchanged
- [ ] `pb-safe` padding preserved (do not remove)

### TypeScript
- [ ] `npx tsc --noEmit` from `tech-pwa/` reports zero errors

---

## WHAT NOT TO DO

- **DO NOT** create `MarkCompleteFlow.tsx` — celebration is inline in `job/[jobId]/page.tsx`
- **DO NOT** create `WorkOrderModal.tsx` — work order UI is inside `JobDetailModal.tsx`
- **DO NOT** create `DispatchQueue.tsx` — job queue is `JobQueueTable.tsx` (table, not cards)
- **DO NOT** create `Sidebar.tsx` — sidebar is `AppSidebar.tsx` and needs no changes
- **DO NOT** restructure `JobQueueTable.tsx` from table rows to cards — that's a major UX change not approved for this sprint
- **DO NOT** change sidebar active color from `var(--accent)` (orange) to `blue-500` — APT brand uses orange
- **DO NOT** use `Job.priority === 'URGENT'` — the actual values are `'1-URGENT'`, `'2-TURNOVER'`, `'3-PTE-PENDING'`, `'4-STANDARD'`
- **DO NOT** use `Tech` interface — use `TechEntry` from `@/components/dashboard/SchedulingDispatch`
- **DO NOT** treat `assignedTech` as a `Tech[]` array — it is a `string` (comma-separated names)
- **DO NOT** add `AlertCircle` import — use `AlertTriangle` which is already imported in JobDetailModal
- **DO NOT** add `toast.warning()` — use the amber inline warning div, no toast needed
- **DO NOT** block save when trainee warning is shown — advisory only

---

## IMPLEMENTATION ORDER

1. `live/page.tsx` — Fix 1 (URL tabs) — minimal, 3 additions
2. `dashboard/JobDetailModal.tsx` — Fix 2 (trainee warning) + section glassmorphism
3. `dashboard/JobQueueTable.tsx` — priority left border replacement
4. `app/jobs/page.tsx` — Tech job list enhancement
5. `app/job/[jobId]/page.tsx` — Tech job detail enhancement
6. `components/ClockedInBar.tsx` — Shift bar gradient

After all changes: `npx tsc --noEmit` from `tech-pwa/` → zero errors → write diff to `artifacts/ag_diff.txt`.
