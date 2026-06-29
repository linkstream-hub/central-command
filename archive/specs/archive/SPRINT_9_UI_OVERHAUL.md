# SPRINT 9 — CC UI Overhaul
**Branch:** `feat/sprint9-ui-overhaul`
**Author:** Claude Code
**Goal:** Replace the current "dark hacker" aesthetic with a professional, SaaS-grade operations dashboard that matches APT's website color scheme. This is a design systems sprint, not a feature sprint. The test bar is simple: it should look like a real software product, not a hackathon project.

---

## What This Sprint Is and Is Not

**IS:** Color system update, typography normalization, component-level polish, dead code removal.
**IS NOT:** Layout architecture changes, new features, animation overhaul, mobile responsiveness, light mode work.

The page structure, routing, data fetching, and business logic all stay exactly the same. Only visual presentation changes.

---

## Design Principles (non-negotiable)

1. **Color from brand, not from vibe.** All color tokens must trace back to aptmaintenanceinc.com's palette. Nothing invented.
2. **Typography communicates hierarchy, not style.** Size and weight should tell you what's important. All-caps with wide tracking is a badge style, not a default text style.
3. **Decorative noise is not polish.** Glows, ambient blurs, and shadow rings that are invisible on flat dark backgrounds are deleted, not kept.
4. **Information density stays.** This is an ops tool. Don't trade readability for whitespace.

---

## Typography Target

The current default is `text-[10px] font-black uppercase tracking-[0.2em]` for almost everything. That is one style, not a system. Replace with:

| Role | Size | Weight | Case | Tracking |
|---|---|---|---|---|
| Page title (H1) | `text-lg` (18px) | `font-semibold` | Sentence | `tracking-tight` |
| Section heading | `text-[13px]` | `font-bold` | UPPERCASE | `tracking-wide` |
| Table column header | `text-[10px]` | `font-medium` | UPPERCASE | `tracking-widest` |
| Row / body text | `text-[13px]` | `font-normal` | Sentence | `tracking-normal` |
| Secondary / metadata | `text-[11px]` | `font-normal` | Sentence | `tracking-normal` |
| Badge / status pill | `text-[9px]` | `font-bold` | UPPERCASE | `tracking-widest` |

---

## Numbered Task List

---

### Task 1 — Extract website color palette (AG research — flag before proceeding)

Fetch `https://aptmaintenanceinc.com`. Extract:
- Primary brand/accent color (buttons, CTAs, links, highlights)
- Any secondary accent color
- Font family used (check `<link>` tags for Google Fonts or `@font-face`)
- Background color from the site (for reference — not for copying verbatim into a dark ops tool)

Produce a proposed CSS token update:
```
--accent:       <extracted CTA hex>
--accent-hover: <CTA hex darkened ~10% for hover states>
--font-sans:    <font family name if different from Inter/system-ui>
```

**STOP. Flag this proposal to Claude Code before writing any CSS.** Color tokens are global — every component inherits them. Claude Code approves the palette before Task 2 begins.

---

### Task 2 — Update `globals.css` with approved palette

After Claude Code approves:

1. Update `--accent` and add `--accent-hover` to the `:root` block.
2. If the website uses a non-system font: add the Google Fonts `@import` and update the Tailwind theme `fontFamily` in `globals.css` or `tailwind.config.ts`. Flag to Claude Code if this requires a config file change.
3. Remove the ambient glow decoration in `DashboardLayout.tsx` (line 141):
   ```tsx
   // DELETE this entire div — invisible on flat dark backgrounds
   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none -z-10" />
   ```
4. Update the `light-mode` block: set `--accent-hover` there too (darken the light-mode accent the same way).

---

### Task 3 — DashboardLayout header: page title + debug cleanup

File: `tech-pwa/src/components/dashboard/DashboardLayout.tsx`

**3a. Remove debug console.log** (lines 37–39):
```tsx
// DELETE:
useEffect(() => {
  console.log('[DashboardLayout] Status:', status, 'Path:', pathname);
}, [status, pathname]);
```

**3b. Replace brand text in header with current page name.**

Current header left side:
```tsx
<span className="text-[#f97316] font-black text-xl italic tracking-tighter leading-none">APT</span>
<span className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] border-l border-[var(--border-subtle)] pl-3">Central Command</span>
```

Replace with a page title derived from `pathname`. Add this lookup above the `return`:
```tsx
const PAGE_TITLES: Record<string, string> = {
  '/live':            'Work Queue',
  '/schedule':        'Schedule',
  '/weekly-schedule': 'Work Schedule',
  '/calendar':        'Time Off Calendar',
  '/team':            'Team',
  '/compliance':      'Compliance',
  '/hr':              'HR',
  '/billing':         'Billing',
  '/intel':           'Intel',
  '/feedback':        'Feedback',
};
const pageTitle = PAGE_TITLES[pathname] ?? 'Central Command';
```

Replace the header left-side markup with:
```tsx
<h1 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight leading-none">
  {pageTitle}
</h1>
```

The APT brand stays in the sidebar (AppSidebar already renders the logo). The header is navigation context, not branding.

---

### Task 4 — Schedule page: remove TechAvailabilityPanel

File: `tech-pwa/src/app/schedule/page.tsx`

Brandon confirmed: field status (who is clocked in right now) is the wrong signal for scheduling. The weekly grid already shows booking conflicts.

**4a.** Remove the `TechAvailabilityPanel` import at the top.

**4b.** Remove `FieldStatusResponse` from the dashboard-api import.

**4c.** Remove `activeTechs` state declaration and setter.

**4d.** In `loadData()`, remove `fieldRes` from the `Promise.all` call:
```tsx
// Before:
const [weekRes, jobsRes, fieldRes] = await Promise.all([
  dashboardRequest<WeekScheduleResponse>("getWeekSchedule", { weekStart: weekDates[0] }),
  dashboardRequest<DispatchDataResponse>("getDispatchData"),
  dashboardRequest<FieldStatusResponse>("getLiveFieldStatus"),
]);

// After:
const [weekRes, jobsRes] = await Promise.all([
  dashboardRequest<WeekScheduleResponse>("getWeekSchedule", { weekStart: weekDates[0] }),
  dashboardRequest<DispatchDataResponse>("getDispatchData"),
]);
```

**4e.** Remove `fieldRes` result handling (the `if (fieldRes.success)` block).

**4f.** In the JSX, remove the entire left-column wrapper:
```tsx
// DELETE this block:
{/* Left Column: Tech Availability */}
<div className="w-64 flex flex-col overflow-hidden">
  <TechAvailabilityPanel techStatuses={activeTechs} />
</div>
```

**4g.** The RtS backlog column (currently `flex-1` inside the 600px sidebar) now stands alone. Remove the fixed `w-[600px]` wrapper constraint and let the backlog take its natural width:
```tsx
// Before:
<div className="w-[600px] flex gap-4 overflow-hidden shrink-0">

// After:
<div className="w-72 flex flex-col overflow-hidden shrink-0">
```
(The RtS backlog is a narrow sidebar tool, not a full-width panel. 288px is the right size for drag cards next to the grid.)

---

### Task 5 — Live page: remove dead state

File: `tech-pwa/src/app/live/page.tsx`

`activeTechs` is declared as `useState<TechStatus[]>([])` but is never populated — there is no `getLiveFieldStatus` fetch on this page. It gets passed to `ActivityFeed` but is always empty.

**5a.** Remove the `activeTechs` state declaration.
**5b.** Change the `ActivityFeed` call to pass an empty array directly:
```tsx
// Before:
<ActivityFeed jobs={jobs} techs={activeTechs} />
// After:
<ActivityFeed jobs={jobs} techs={[]} />
```

**5c.** Remove the `TechStatus` import from `@/lib/dashboard-api` in this file (only if it's no longer used after 5a — check before removing).

---

### Task 6 — Live page: section heading cleanup

File: `tech-pwa/src/app/live/page.tsx`

The "Work Queue Feed" heading is:
```tsx
<h2 className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.2em] bg-[var(--accent)]/10 px-4 py-1.5 rounded-lg border border-[var(--accent)]/20 shadow-lg shadow-[var(--accent)]/5">
  Work Queue Feed
</h2>
```

Replace with a clean section label that matches the typography system from the spec header above (section heading role):
```tsx
<h2 className="text-[13px] font-bold text-[var(--text-primary)] uppercase tracking-wide">
  Work Queue
</h2>
```

The Mode toggle (Table/Kanban) currently uses a `|` pipe character as a divider. Replace with a proper toggle button group — two buttons in a rounded container, active state uses `bg-[var(--accent)]/15 text-[var(--accent)]`, inactive uses `text-[var(--text-muted)] hover:text-[var(--text-primary)]`. No pipe separator.

---

### Task 7 — JobQueueTable: typography pass

File: `tech-pwa/src/components/dashboard/JobQueueTable.tsx`

Apply the typography system to the table column headers (currently all `text-[10px] font-black uppercase tracking-[0.2em]`):
- Column headers → `text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]` (medium weight, not black)
- Status section dividers (e.g., "NEEDS REVIEW", "READY TO SCHEDULE") → `text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]` (already close, but ensure weight is bold not black)
- Row address/description text → `text-[13px] font-normal` (currently likely 10-11px)
- Priority badge and status labels remain `text-[9px] font-bold uppercase tracking-widest` — these are intentionally badge-styled

---

### Task 8 — AppSidebar: label cleanup

File: `tech-pwa/src/components/dashboard/AppSidebar.tsx`

Nav label review — some labels are verbose for a narrow sidebar:
| Current | Replace with |
|---|---|
| `Ready To Schedule` | `Schedule Queue` |
| `Workorder Schedule` | `Work Schedule` |
| `Time Off Calendar` | `Time Off` |

Nav label text style: currently `text-[10px] font-black tracking-widest uppercase`. Change to `text-[11px] font-semibold tracking-wide uppercase` — slightly larger, less aggressive weight.

---

### Task 9 — TypeScript check and diff

```
cd tech-pwa && npx tsc --noEmit
git diff main...HEAD > artifacts/ag_diff.txt
```

Zero tsc errors required. Report one line, stop.

---

## Flags to Claude Code

**Flag 1 (Task 1 gate) — Color palette proposal**
AG produces the palette proposal from aptmaintenanceinc.com. Claude Code approves before any CSS is written. This is a hard gate — do not proceed to Task 2 without approval.

**Flag 2 (Task 2) — Font family change**
If aptmaintenanceinc.com uses a Google Font that's not already in the project, AG flags the specific font name and the import change. Font swaps can affect layout metrics.

---

## What Does NOT Change

- Page routing and layout structure
- Data fetching logic (except removing the `getLiveFieldStatus` call from schedule page per Task 4)
- Business logic in all components
- JobDetailModal internals
- KanbanBoard
- Auth flows
- Any GAS or Neon code

---

## Test Sprint Evidence Required

- Screenshot: Live page (Work Queue) before and after
- Screenshot: Schedule page before and after (TechAvailabilityPanel gone)
- Screenshot: Header showing page title instead of brand text
- Confirm `npx tsc --noEmit` passes
- Confirm no visual regressions on the Schedule grid (DnD still works, RtS backlog still populates)
