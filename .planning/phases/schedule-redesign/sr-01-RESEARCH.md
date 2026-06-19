# Phase SR-01: Schedule Page Redesign - Research

**Researched:** 2026-06-03
**Domain:** Next.js 16 + Tailwind v4 + Drizzle/Neon — UI redesign + new API route
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Visual Direction:**
- Background: deep navy (`#0f172a` or similar, NOT `#000000`)
- Primary accent: amber (`#f59e0b`) — urgency, CTAs, action states
- Secondary accent: teal (`#10b981`) — active/in-progress, scheduled states
- Muted/inactive: slate grays (warm-tinted, single gray family)
- Text: white primary, muted gray secondary, tabular-nums for numeric data
- Font: Geist or Outfit (NOT Inter — Inter is the current font / AI default)
- Aesthetic target: "Linear meets field operations command center. Dense operational cockpit."

**Design System Architecture:**
- Semantic CSS custom properties: `--color-surface`, `--color-text-primary`, `--color-accent`
- Dark theme only in Sprint 1; `prefers-color-scheme` detection, no toggle UI
- taste-skill dials for schedule page: VARIANCE: 3-4 / MOTION: 2-3 / DENSITY: 8-9

**Desktop Schedule Page:**
- Tech-row grid (NOT time-slot calendar)
- Lock and Send amber CTA + confirmation screen (Image `c0ab2aab`)
- Right panel: Urgent Queue only in Sprint 1

**Mobile Tech PWA:**
- Badge/PIN login redesign (Image `f7c87c3d`)
- Job list redesign (Image `fd4ab59d`)
- Auth: `getSession()` from `@/lib/auth` — NEVER mix with `useSession()`

**Interaction Standards:**
- Hover states, scale(0.98) active feedback, 200-300ms transitions
- Skeleton loaders (not spinners)
- Icons: NOT Lucide exclusively — use Phosphor or Heroicons

### Claude's Discretion
_(None specified — all visual and technical decisions locked above)_

### Deferred Ideas (OUT OF SCOPE)
- Light mode tokens + manual theme toggle
- Full dispatch command center (Image `3887df3e`) — CC3.0 Tier 2
- Route Efficiency, Lockbox Status, Connected Feed, AI Dispatch Intelligence panels
- CC3.0 Tier 1: meal premium auto-calc, QB invoice via n8n, ADP payroll export
</user_constraints>

---

## Summary

The existing `/schedule` page is a **time-slot calendar** — rows are 8AM–5PM time slots, columns are dates (Mon–Fri), with a sidebar of "Ready to Schedule" backlog jobs and drag-and-drop scheduling. This is the wrong UX shape for APT: the mental model is "what is Salvador doing today?" not "what's happening at 9AM?" The data layer (`/api/schedule/today` and `/api/schedule/week`) is Neon-connected and correct — only the rendering shape needs to change.

The redesign replaces the time-slot grid with a **tech-row grid** (techs as rows, job chips as content), adds a **Lock and Send** action (webhook to n8n/Twilio), and redesigns the **mobile Badge/PIN login** and **mobile job list** pages to match the dark navy command-center aesthetic defined in CONTEXT.md.

The primary technical challenge is the **CSS token migration**: the live system uses `--accent: #3b6cd4` (blue) and `Raleway` font. Both must change system-wide. The token replacement will propagate to all pages using `var(--accent)` — this is intentional (design system genesis) but requires careful scoping to avoid visual regressions on `/live`, `/team`, and other pages.

**Primary recommendation:** Build in CONTEXT.md order: tokens first, then desktop grid, then Lock and Send (which requires a Neon schema migration for `dispatch_sent_at`), then mobile pages.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Tech-row grid rendering | Browser / Client | — | `"use client"` page, React state, DnD context |
| Schedule data fetching | API / Backend | Database | `/api/schedule/today` + `/week` read from Neon |
| Lock and Send action | API / Backend | n8n webhook | New POST route; fires n8n, writes `dispatch_sent_at` to Neon |
| n8n SMS dispatch | n8n / External | Twilio | n8n workflow reads payload, fires Twilio per tech |
| Badge/PIN login | Browser / Client | API / Backend | Client renders keypad; `/api/field/auth/login` validates |
| Tech job list | Browser / Client | API / Backend | `getSession()` auth guard; calls `apiGet("getJobs")` |
| CSS token system | Frontend Server | — | `globals.css` and `layout.tsx` affect all pages |
| Font loading | Frontend Server | CDN | `next/font/google` in `layout.tsx` — affects all pages |

---

## Current Codebase State

### Existing Schedule Page — `tech-pwa/src/app/schedule/page.tsx`

**What exists (all to be replaced or restructured):**
- `"use client"` component, 769 lines
- Imports: `@dnd-kit/core`, `DashboardLayout`, `dashboardRequest` (GAS wrapper — NOT the Neon API route directly), Lucide icons only
- **Data source: `dashboardRequest("getWeekSchedule", ...)` and `dashboardRequest("getDispatchData")`** — these call the GAS DashboardAPI, NOT `/api/schedule/week` directly. This is an important finding: the schedule page bypasses the Neon API routes entirely and reads through GAS.
- Time-slot grid: rows = `TIME_SLOTS` (8AM–5PM, 10 slots), columns = week dates, `DroppableTimeSlot` cells
- Left sidebar: "Ready to Schedule" backlog with drag source cards
- No auth check directly in the component — delegated to `DashboardLayout` → `RouteGuard`
- `RouteGuard` uses `useSession()` from `next-auth/react` — confirmed office staff auth pattern
- Active state: `weekOffset`, `techs: TechStatus[]`, `jobs: Job[]`, `scheduledJobs: Job[]`, `gridData`
- `gridData` structure: `Record<techName, Record<date, Job[]>>` — already the right shape for the tech-row grid
- No framer-motion usage (schedule page is all Tailwind + inline transforms)
- No Lock and Send button, no confirmation screen

**Components used that will be deprecated:**
- `DraggableJobCard` — time-slot drag card (new job chip replaces this)
- `DroppableTimeSlot` — time-slot drop target (entire paradigm removed)
- `DurationSelectorModal` — post-drop confirmation (no longer needed in tech-row view)
- `DateDetailModal` — click-to-expand a date (removed from scope)

**Components to keep:**
- `DashboardLayout` — left sidebar navigation, session auth
- `ManualScheduleModal` — manual scheduling flow (keep)
- `ManualJobCreateModal` — manual job creation (keep)
- `JobDetailModal` — job detail on click (keep)

### Current CSS Token State — `tech-pwa/src/app/globals.css`

**Actual live tokens (what's deployed today):**

```css
:root {
  --bg-primary:   #0d0f14;
  --bg-surface:   #13161e;
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.7);
  --text-muted:   rgba(255,255,255,0.35);
  --border-subtle: rgba(255,255,255,0.08);
  --accent:       #3b6cd4;   /* CURRENT: Blue. Must change to amber #f59e0b */
  --accent-hover: #4d7ce0;   /* Must change to amber hover */
  --accent-gold:  #ECD541;   /* Keep or remove — not used in redesign palette */
  --surface-card: #13151a;
  --surface-raised: #1c1f27;
}
```

**Note: AG.md documents `--accent: #f97316` (orange) as canonical, but `globals.css` shows `#3b6cd4` (blue) is the LIVE value.** The `globals.css` file is the source of truth — AG.md is outdated documentation. Plan must update `globals.css`.

**Status colors (DO NOT CHANGE — system-wide):**
```css
--color-urgent:   #ff3b3b
--color-turnover: #f97316
--color-standard: #10b981
--color-pte:      #8b5cf6
/* + all --color-status-* and --color-compliance-* */
```

**Tailwind v4 @theme block** maps CSS vars to Tailwind tokens. New token additions must also be registered here.

**`.light-mode` class exists** — light mode is partially scaffolded but not used yet. Safe to leave in place.

**Global utility classes that must survive the migration:**
- `.glass-panel`, `.premium-card`, `.premium-card:hover` — use `var(--accent)` internally
- `.custom-scrollbar`, `.no-scrollbar`
- `body` transition: `background-color 0.3s ease, color 0.3s ease`

### Current Font — `layout.tsx`

```tsx
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans", weight: ["400","500","600","700"] });
```

**Raleway** is the live font. CONTEXT.md requires **Geist or Outfit**. Font swap affects all pages.

**Migration path:** Replace `Raleway` import with `Geist` or `Outfit` from `next/font/google` in `layout.tsx`. Both are available via `next/font/google`. The `--font-sans` CSS variable stays the same — only the `font-family` value changes. Low blast radius.

**AG.md token table** references `Raleway` in a console verification example but that's a documentation artifact from a prior sprint. The font variable approach means no component-level changes needed.

### Icon Library

- **Currently installed: `lucide-react@^1.16.0`** — this is the only icon library
- **No `@phosphor-icons/react` or `@heroicons/react` in `package.json`**
- The schedule page and jobs page use only Lucide icons
- CONTEXT.md requires Phosphor or Heroicons for the redesigned pages
- **Action required:** Install `@phosphor-icons/react` (recommended — broader icon set, well-maintained, clean weight variants). Lucide stays for existing pages; Phosphor used in new components.

### Auth Patterns — Confirmed

| Page | Auth Hook | Confirmed By |
|------|-----------|-------------|
| `/schedule` | `useSession()` via `DashboardLayout` → `RouteGuard` | DashboardLayout.tsx line 9, 44 |
| `/login` (Google OAuth) | `signIn()` from `next-auth/react` | login/page.tsx |
| `/jobs` (tech job list) | `getSession()` from `@/lib/auth` | jobs/page.tsx line 13 |
| `/login` (badge/PIN) | POST to `/api/field/auth/login`, then `setSession()` | login/page.tsx line 49 |
| `/api/schedule/today` | `auth()` from `@/auth` + x-api-key header | today/route.ts line 12-16 |
| `/api/schedule/week` | `auth()` from `@/auth` + x-api-key header | week/route.ts line 29-33 |

**The new `/api/schedule/lock-and-send` route MUST follow the same dual-auth pattern as today/week routes: `auth()` session check OR `x-api-key` header.**

---

## API Data Shape

### `/api/schedule/today` Response

```typescript
{
  success: true,
  source: 'neon',
  date: 'YYYY-MM-DD',        // Pacific time today
  byTech: {
    'Salvador': [Job, Job],  // tech name as string key
    'Rafael':   [Job],
  },
  unassigned: [Job, Job]     // no tech assigned
}
```

### `/api/schedule/week` Response

```typescript
{
  success: true,
  source: 'neon',
  week: { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' },
  byTech: {
    'Salvador': {
      '2026-06-03': [Job, Job],
      '2026-06-04': [Job],
    }
  },
  unassigned: [Job],
  techs: [
    {
      techId: '7',             // badge or string(id)
      techName: 'Salvador',
      jobsRemaining: 0,
      badge: '7',
      rank: 'Lead',
      skills: {
        Carpentry: 4, Plumbing: 3, Electrical: 2,
        'Finish Carpentry': 0, Structural: 0,
        Landscaping: 0, Janitorial: 0
      }
    }
  ]
}
```

### Field Mapping to Tech-Row Grid

| Grid Element | Source Field | Notes |
|---|---|---|
| Tech avatar/name | `techs[].techName` | Week API returns all active techs seeded |
| Tech rank badge | `techs[].rank` | Optional display |
| Job chip address | `job.address` | Truncate to ~30 chars |
| Job chip category | `job.serviceCategory` | Trade icon lookup |
| Job chip color | `job.priority` | `1-URGENT`→amber, `4-STANDARD`→teal, `Scheduled`→slate |
| Date columns (week) | `byTech[name][date]` | Week API nested structure |
| Single day row content | `byTech[techName]` | Today API flat structure |
| Phone for Lock and Send | `employees.phone` | NOT in Job type — need JOIN or separate employees fetch |

### Critical Gap: Tech Phone Numbers

The `Job` type does NOT include the tech's phone number. The `employees` table has `phone` field. The `/api/schedule/week` route already queries `employees` to build `techList`, but `phone` is NOT included in the `techList` returned. The Lock and Send route will need either:
- (a) Add `phone` to the `techList` in `/api/schedule/week`, OR
- (b) Have the lock-and-send route query employees independently

**Recommended: option (b) — the lock-and-send route fetches employees with phone numbers internally.** This keeps the week route unchanged and makes the lock-and-send route self-contained.

### Important: Current Schedule Page Uses GAS, Not the Neon API Route

**The current `schedule/page.tsx` calls `dashboardRequest("getWeekSchedule")` which routes through the GAS DashboardAPI**, not the Neon `/api/schedule/week` route directly. The redesigned page should call the Neon route directly via `fetch('/api/schedule/week?weekStart=...')` or a typed fetch wrapper — NOT `dashboardRequest`. This is a clean break from the GAS layer for this page.

---

## Lock and Send — Backend Requirements

### DB Schema Status

The `jobs` table has NO `dispatch_sent_at`, `text_sent_at`, or `locked_at` column. The `commsMessages` table has `sentAt` but that's for email threads, not dispatch texts.

**A new column is required on the `jobs` table.**

**Required schema addition:**
```typescript
// In jobs table definition in schema.ts
dispatchSentAt: timestamp('dispatch_sent_at'),
```

This single nullable timestamp field records when the job was included in a "Lock and Send" dispatch. Presence of a value = text was sent. Null = not yet sent. The UI uses this to show/hide a "sent" indicator on job chips.

**Drizzle migration path:**
1. Add `dispatchSentAt: timestamp('dispatch_sent_at'),` to `jobs` table in `schema.ts`
2. Run `npm run db:generate` → generates SQL migration in `drizzle/`
3. Run `npm run db:migrate` → applies to Neon dev branch
4. Production deploys on merge — Neon migrations apply automatically via migrate script

**Migration is FLAG-TO-CLAUDE-CODE level.** Per CLAUDE.md/AG.md: any Neon schema change must be flagged to Claude Code before implementing.

### n8n Webhook Integration Pattern

**Established pattern from `attestation/sign/route.ts`:**

```typescript
// Fire-and-forget pattern (do NOT await — return 200 quickly)
const webhookUrl = process.env.N8N_LOCK_SEND_WEBHOOK_URL;
if (!webhookUrl) {
  console.warn('[lock-and-send] N8N_LOCK_SEND_WEBHOOK_URL undefined, skipping');
} else {
  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(err => console.error('[lock-and-send] webhook failed:', err));
}
```

**The webhook payload the n8n workflow needs:**
```typescript
{
  date: 'YYYY-MM-DD',           // which day's assignments
  techs: [
    {
      techName: string,
      phone: string,             // employees.phone — for Twilio
      jobs: [
        {
          jobId: string,
          address: string,
          unit: string,
          serviceCategory: string,
          scheduledTime: string | null,
          estimatedHours: number,
          priority: string,
        }
      ]
    }
  ],
  sentBy: string,               // session.user.name — dispatcher name
  sentAt: string,               // ISO timestamp
}
```

**New env var required:** `N8N_LOCK_SEND_WEBHOOK_URL` — must be added to `.env.local` (Brandon types value) and Vercel Production + Preview environments.

### New API Route Spec: `POST /api/schedule/lock-and-send`

```typescript
// tech-pwa/src/app/api/schedule/lock-and-send/route.ts
// Auth: auth() from @/auth + x-api-key — dual auth (same as today/week routes)
// Body: { date: string } — which day to lock and send
// Actions:
//   1. Query all jobs for date (status Scheduled, has tech assigned)
//   2. Query employees for each unique tech name to get phone numbers
//   3. Build payload per tech (name, phone, jobs list)
//   4. Fire n8n webhook (fire-and-forget)
//   5. UPDATE jobs SET dispatch_sent_at = now() WHERE scheduled_date = date
//      AND tech IS NOT NULL AND status != 'Archived'
//   6. Return { success: true, techCount: N, jobCount: N }
```

---

## Mobile Pages

### Current `/jobs` Page — `tech-pwa/src/app/jobs/page.tsx`

**What exists:**
- 283 lines, `"use client"` 
- Auth: `getSession()` from `@/lib/auth` — correct pattern, must keep
- Data: `apiGet("getJobs")` via `syncQueue.ts` — calls GAS DashboardAPI (same as schedule page)
- State: `jobs: Job[]`, loading, refreshing, offline/online detection
- Animations: `framer-motion` (`motion`, `AnimatePresence`) already imported and used
- Job card: `border-l-4` priority color coding, `PRIORITY_BORDER` + `PRIORITY_CHIP` maps
- Priority colors: red=URGENT, orange=TURNOVER, yellow=PTE, blue=STANDARD
- **Gap vs reference image:** CONTEXT.md reference image (`fd4ab59d`) shows amber "URGENT" pill, teal "SCHEDULED" pill, left border color-coding — current implementation uses `blue-500` for STANDARD which conflicts with the new amber/teal accent palette

**PRIORITY_BORDER/CHIP maps need update** to match CONTEXT.md palette (amber=URGENT, teal=SCHEDULED). Note: this changes appearance of existing cards — a deliberate part of the redesign.

**Bottom nav** not currently implemented. CONTEXT.md reference image shows "Home, Jobs, Messages, Profile" bottom nav. This is likely Sprint 1 scope for the mobile view.

**Greeting logic** exists and is correct: `good_morning/afternoon/evening` based on hour, uses i18n.

**Shift banner** exists and is branded but uses amber currently — will align with redesign.

### Current Badge/PIN Login — `tech-pwa/src/app/login/page.tsx`

**What exists:**
- Single page handles both office staff (Google OAuth) and field staff (badge+PIN)
- Mode detection via hostname: `dispatch.*` = dispatch mode, `clock.*` = tech mode, else = both
- Badge/PIN form: standard `<input>` fields, not a numeric keypad
- No APT shield logo centered — uses Image from `aptmaintenanceinc.com/wp-content/...`
- No large badge number display
- No PIN dot indicators
- No numeric keypad grid (1-9, 0)
- No amber "Confirm" CTA with proper styling

**Gap vs reference image `f7c87c3d`:** Almost everything needs to change for the tech/clock mode view. The redesign should detect `clock.*` hostname (or `mode === 'tech'`) and render a completely different layout — the Apple-style badge/PIN interface. The Google OAuth section stays unchanged for dispatch mode.

**Strategy:** Add a dedicated `TechLoginView` component rendered when `mode === 'tech'`. The existing form state and `handleTechLogin` function are kept; only the UI changes.

---

## Design System Migration Plan

### Token Changes Required

| Token | Current Value | Required Value | Risk |
|-------|---------------|----------------|------|
| `--accent` | `#3b6cd4` (blue) | `#f59e0b` (amber) | HIGH — used on every page via `var(--accent)` |
| `--accent-hover` | `#4d7ce0` (blue) | `#d97706` (amber hover) | HIGH — same scope |
| `--bg-primary` | `#0d0f14` | `#0f172a` (or keep `#0d0f14`) | LOW — CONTEXT.md says "similar" |
| `--font-sans` value | Raleway | Geist or Outfit | MEDIUM — layout.tsx change affects all pages |
| `--accent-gold` | `#ECD541` | Not needed in new palette | LOW — can keep, unused by redesigned pages |

**New tokens to add (semantic, per CONTEXT.md):**
```css
--color-surface:       var(--bg-surface);      /* alias for planner compatibility */
--color-text-primary:  var(--text-primary);    /* alias */
--color-accent:        var(--accent);          /* alias */
--color-accent-amber:  #f59e0b;               /* explicit amber */
--color-teal:          #10b981;               /* already --color-standard, alias for dispatch context */
```

Note: `--color-standard: #10b981` already exists and is `teal` — it can be reused as the teal accent. No new value needed, only semantic aliasing.

### Cross-Page Token Impact Assessment

Pages that render `var(--accent)` directly and will change appearance when `--accent` changes from blue to amber:

- `/live` — job queue buttons and accent elements
- `/schedule` — (being redesigned) — expected change
- `/team` — staff management page
- `/hr` — HR page
- `/login` — Google sign-in button ring, form focus state

**This is intentional** — CONTEXT.md states "this is the design system genesis — decisions made here define the visual language for the entire CC platform going forward." The accent change is a deliberate platform-wide decision.

**Risk mitigation:** Playwright baseline will catch any broken UI states from the token change. Review screenshots during the test sprint for `/live`, `/team`, etc.

### Font Migration Path

Replace in `layout.tsx`:
```tsx
// Remove:
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans", weight: ["400","500","600","700"] });

// Add:
import { Geist } from "next/font/google";
const geist = Geist({ subsets: ["latin"], variable: "--font-sans", weight: ["400","500","600","700"] });
```

`Geist` is available via `next/font/google` as of mid-2024. [ASSUMED — verify `Geist` availability in `next/font/google` vs `next/font/local` or `geist` npm package before implementation.]

**Alternative:** `Outfit` from `next/font/google` — definitely available, similar geometric sans character.

**Safer verified path:** `npm install geist` and use `import { GeistSans } from 'geist/font/sans'`. The `geist` npm package is maintained by Vercel specifically for this use case.

**AG verification step required:** Run `document.fonts.check("1em Geist")` in browser console after font swap to confirm load.

### Tailwind v4 Implications

This project uses **Tailwind v4** (confirmed: `"tailwindcss": "^4"` in `package.json`). The `@theme {}` block in `globals.css` registers CSS vars as Tailwind tokens. New tokens added to `:root` must also be registered in `@theme {}` to be usable as Tailwind utilities. 

For amber accent: add `--color-accent: var(--accent);` to `@theme {}` block (already exists in a different alias form — verify exact token names).

---

## Playwright Coverage

### Tests Currently Covering `/schedule`

**`tests/e2e/scheduling.spec.ts`:**
- `5.1` — loads `/schedule`, expects `text=100 Test St` in sidebar ← **tests sidebar job list** (will break if sidebar is removed)
- `5.2` — expects `text=Drag jobs to schedule` and `text=Next 5 Working Days` ← **both strings will be REMOVED** in redesign
- `7.1` and `7.2` — test `/weekly-schedule` page (different page, unaffected)
- `7.3` — tests `/live` (unaffected)

**Tests that WILL BREAK with the redesign:**
- `5.1` — if backlog sidebar is removed from tech-row view
- `5.2` — both text strings are from the old time-slot design and will not exist in the new design

**Tests currently covering `/jobs` and `/login`:**
- `auth.spec.ts` `1.5`: `loginAsTech` → `/jobs` (currently `fixme`, blocked on CF Worker)
- `auth.spec.ts` `1.6`: Badge/PIN invalid PIN error — tests `text=Invalid badge number or PIN` and form inputs
- `tech-pwa.spec.ts` Block 11: all `fixme` — blocked on CF Worker
- `tech-pwa.spec.ts` P3-4: API-level tests, no UI, unaffected by redesign

### Regression Risk Analysis

| Test | Impact | Action |
|------|--------|--------|
| `5.1 sidebar job count` | BREAKS — sidebar may be removed or restructured | Rewrite for new layout |
| `5.2 "Drag jobs to schedule"` | BREAKS — string removed | Rewrite for tech-row header text |
| `5.2 "Next 5 Working Days"` | BREAKS — string removed or changed | Rewrite |
| `1.6 badge/PIN error message` | SURVIVES — form logic unchanged | Keep as-is |
| `1.2 Dev Login button` | SURVIVES — dispatch login section unchanged | Keep |
| `1.3 Dev Login lands on /live` | SURVIVES — unaffected | Keep |
| All Phase 2 verification tests | SURVIVES — test `/live` and API routes | Keep |

### New Tests Required

```
tests/e2e/scheduling.spec.ts — rewrite existing 5.x tests:
  5.1-new: /schedule loads tech-row grid, at least one tech row visible
  5.2-new: Lock and Send button visible in header (text=Lock and Send)
  5.3-new: Lock and Send confirmation screen appears on click
  5.4-new: Day/week toggle present and functional

tests/e2e/tech-pwa.spec.ts — new tests for mobile redesign:
  (note: Block 11 is all fixme, so new tests must also use request-based or
   mock approach until CF Worker is available — OR test with badge='1' local auth)
```

**Playwright ceiling constraint:** 0 new failures vs baseline (44 passed, 68 skipped, 0 failed). The two breaking `5.x` tests count as existing failures if not rewritten before the Playwright run — they must be rewritten as part of this phase, not left as `test.fixme`.

---

## Implementation Risks

### Risk 1: Token Scope — `--accent` Change is Platform-Wide (HIGH)

Changing `--accent` from blue to amber will visually change EVERY page that uses `var(--accent)`. This is intentional but creates a larger test surface. The Playwright tests do not screenshot `/team`, `/hr`, or other dispatch pages, so visual regressions there would only be caught in the browser test sprint.

**Mitigation:** AG's test sprint must explicitly open and screenshot `/live`, `/team`, `/hr`, and `/login` after the token change. These screenshots go in `artifacts/` alongside the schedule-specific ones.

### Risk 2: Neon Schema Migration (HIGH — requires Claude Code gate)

Adding `dispatch_sent_at` to `jobs` requires:
1. Schema edit in `schema.ts`
2. `npm run db:generate` to create SQL migration
3. `npm run db:migrate` to apply on dev branch
4. Production applies on merge

This is a Neon schema change. Per CLAUDE.md: **flag to Claude Code before implementing.** The migration SQL is `ALTER TABLE jobs ADD COLUMN dispatch_sent_at TIMESTAMP;` — non-destructive, no data loss, nullable by default.

### Risk 3: GAS Dependency in Schedule Page (MEDIUM)

The current page uses `dashboardRequest("getWeekSchedule")` not `fetch('/api/schedule/week')`. The redesign switches to the Neon route. This is correct behavior (GAS is being phased out) but it's a data source change, not purely a UI change. The week API route is confirmed correct and Neon-connected, so this is low actual risk but must be explicitly documented in the spec.

### Risk 4: Font Loading — Geist npm Package vs next/font (LOW)

`Geist` may need to be installed as the `geist` npm package rather than loaded via `next/font/google`. The Vercel `geist` package is the canonical approach. This requires `npm install geist` (one package add, no config changes). If `Outfit` is chosen instead, it's directly available via `next/font/google` with zero new packages.

**Recommended safe choice:** Use `Outfit` from `next/font/google` to avoid any package installation friction. Outfit has the "geometric sans with character" quality required by CONTEXT.md and is unambiguously available in `next/font/google`.

### Risk 5: DnD Kit on Tech-Row Grid (LOW)

The existing schedule page uses `@dnd-kit/core` for drag-and-drop. The redesigned tech-row grid in Sprint 1 does NOT need drag-and-drop — jobs are already assigned to techs. The DnD kit can be removed from the schedule page imports, reducing bundle size. However, it should remain in `package.json` as it may be needed for future features.

### Risk 6: Lock and Send Webhook URL Not Yet Configured (MEDIUM)

`N8N_LOCK_SEND_WEBHOOK_URL` does not exist in the codebase or env config. Brandon must create the n8n workflow and type the webhook URL into `.env.local` and Vercel env vars before the Lock and Send feature can be tested end-to-end. The spec must include a task that gates on this env var being set — the API route must return a clear error if the var is missing (following the `attestation/sign/route.ts` pattern: warn, skip, return success anyway so the UI doesn't break on missing webhook).

---

## Recommended Build Order

Confirmed and refined from CONTEXT.md. Dependencies justify this exact order:

**Wave 1 — Foundation (no app code changes yet)**
1. **CSS tokens + font** — update `globals.css` (--accent, --accent-hover, new tokens), update `layout.tsx` (Raleway → Outfit). Verify with console checks. Playwright run to confirm 0 regressions.

**Wave 2 — Desktop Grid**
2. **Tech-row grid** — replace schedule/page.tsx. New components: `TechRow`, `JobChip`, `ScheduleGrid`. Switch data source from `dashboardRequest` to `fetch('/api/schedule/week')`. Day/week toggle. Rewrite 5.x Playwright tests.
3. **Lock and Send** — schema migration (`dispatch_sent_at`) → FLAG TO CLAUDE CODE. New `/api/schedule/lock-and-send` POST route. LockSendButton + ConfirmationScreen components. Requires `N8N_LOCK_SEND_WEBHOOK_URL` env var (Brandon adds).

**Wave 3 — Mobile**
4. **Mobile Badge/PIN login redesign** — add `TechLoginView` component to login/page.tsx. Numeric keypad, PIN dots, APT shield, amber CTA. Keeps existing form logic unchanged.
5. **Mobile job list redesign** — update jobs/page.tsx. Update PRIORITY_BORDER/CHIP maps to amber/teal. Update header/greeting style. Add bottom nav. Align to reference image `fd4ab59d`.

**Wave 4 — Tests**
6. **Playwright tests** — rewrite 5.x, add new schedule tests, verify full suite is 0 failures vs baseline.

---

## Package Legitimacy Audit

> Only one new package is required: Phosphor icons. Geist font is a well-known Vercel package if chosen.

| Package | Registry | Age | Downloads | Source Repo | Disposition |
|---------|----------|-----|-----------|-------------|-------------|
| `@phosphor-icons/react` | npm | 4+ yrs | [ASSUMED ~2M/wk] | github.com/phosphor-icons/web | Pending slopcheck before install |
| `geist` (if chosen over Outfit) | npm | 2+ yrs | [ASSUMED ~500K/wk] | github.com/vercel/geist-font | Pending slopcheck before install |

**Note:** slopcheck was not run during research (not installed). AG must run slopcheck before installing these packages per Package Legitimacy Gate protocol.

Alternatively: `Outfit` requires NO new package (already available via `next/font/google`). If `Outfit` is chosen, only `@phosphor-icons/react` needs installation.

---

## Open Questions

1. **Geist vs Outfit font choice**
   - What we know: Both are geometric sans fonts with character. Geist is Vercel's own font; Outfit is a Google Font. Both meet CONTEXT.md requirements.
   - What's unclear: Brandon's preference between the two reference images' aesthetic
   - Recommendation: Outfit from `next/font/google` (zero install friction). Document choice in plan.

2. **Day view as default vs week view**
   - What we know: CONTEXT.md says "day view default, week view toggle"
   - What's unclear: The existing `/api/schedule/today` route returns byTech keyed by tech name only (no date nesting), while `/api/schedule/week` returns byTech[tech][date]. The redesign UI needs to decide whether to use `/today` for day view or filter `/week` results
   - Recommendation: Use `/api/schedule/week?weekStart=today` for both views, filter client-side to the selected date for day view. Avoids two separate fetch calls.

3. **N8N_LOCK_SEND_WEBHOOK_URL availability timing**
   - What we know: This env var does not exist yet
   - What's unclear: Whether Brandon will create the n8n workflow before or after the front-end work
   - Recommendation: Build the route with graceful degradation (missing webhook = log warning, skip webhook, still mark dispatch_sent_at). The UI can show a "webhook not configured" state in development.

4. **Backlog sidebar in new tech-row view**
   - What we know: The current schedule page has a prominent "Ready to Schedule" sidebar. The reference image (`f77efbe0`) shows the right panel as Urgent Queue only in Sprint 1.
   - What's unclear: Whether the backlog sidebar (left panel) is retained in Sprint 1
   - Recommendation: Retain a collapsed/simplified backlog panel in Sprint 1 — removing it completely would lose an existing Playwright test anchor (`5.1`). The right panel becomes Urgent Queue.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Playwright |
| Config file | `tech-pwa/playwright.config.ts` |
| Quick run command | `cd tech-pwa && npx playwright test tests/e2e/scheduling.spec.ts` |
| Full suite command | `cd tech-pwa && npx playwright test` |

### Phase Requirements → Test Map

| Req | Behavior | Test Type | Command | Exists? |
|-----|----------|-----------|---------|---------|
| SR-01 | Tech-row grid loads with techs | E2E smoke | `scheduling.spec.ts 5.1-new` | No — rewrite |
| SR-02 | Lock and Send button visible | E2E smoke | `scheduling.spec.ts 5.2-new` | No — new |
| SR-03 | Confirmation screen on LnS click | E2E smoke | `scheduling.spec.ts 5.3-new` | No — new |
| SR-04 | Token change does not break /live | E2E regression | `dispatch.spec.ts` (existing) | Yes |
| SR-05 | Badge/PIN login renders keypad | E2E smoke | `auth.spec.ts 1.6` (keep + extend) | Partial |
| SR-06 | Full Playwright suite 0 failures | Regression ceiling | `npx playwright test` | N/A |

### Wave 0 Gaps (before implementation)

- [ ] `tests/e2e/scheduling.spec.ts` tests `5.1` and `5.2` — MUST be rewritten before implementation begins (they currently pass; they will fail after Wave 2)
- [ ] `N8N_LOCK_SEND_WEBHOOK_URL` env var must be documented in SESSION_STATE.md template before Lock and Send testing

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | yes | `auth()` from `@/auth` + x-api-key dual-auth on all new API routes |
| V3 Session Management | no (no new session changes) | Existing auth architecture unchanged |
| V4 Access Control | yes | Lock and Send is office-staff only — `auth()` check must confirm authenticated session |
| V5 Input Validation | yes | Zod validation on `date` param in lock-and-send route body |
| V6 Cryptography | no | No new crypto operations |

### Threat Patterns for This Phase

| Pattern | STRIDE | Mitigation |
|---------|--------|-----------|
| Unauthenticated Lock and Send trigger | Elevation of Privilege | Dual auth: `auth()` + x-api-key required |
| Repeated Lock and Send on same date | Denial of Service (Twilio costs) | Rate-limit route; check `dispatch_sent_at` — if already set, return 409 Conflict |
| Tech phone number exposure in client bundle | Information Disclosure | Phone numbers fetched server-side only, never returned to client |
| n8n webhook URL exposure | Information Disclosure | Server-only env var (`N8N_LOCK_SEND_WEBHOOK_URL` — not `NEXT_PUBLIC_`) |

---

## Sources

### Primary (HIGH confidence)
- `tech-pwa/src/app/schedule/page.tsx` — direct code read, all findings verified
- `tech-pwa/src/app/api/schedule/today/route.ts` — API response shape confirmed
- `tech-pwa/src/app/api/schedule/week/route.ts` — API response shape, tech list fields confirmed
- `tech-pwa/src/lib/schema.ts` — jobs table structure confirmed, no dispatch_sent_at
- `tech-pwa/src/app/globals.css` — live CSS tokens confirmed (`#3b6cd4` blue, not orange)
- `tech-pwa/src/app/layout.tsx` — Raleway font confirmed live
- `tech-pwa/package.json` — lucide-react only icon lib, no Phosphor; Next.js 16.2.6, Tailwind v4
- `tech-pwa/tests/e2e/scheduling.spec.ts` — breaking tests identified
- `tech-pwa/src/app/jobs/page.tsx` — mobile auth pattern, animation usage confirmed
- `tech-pwa/src/app/login/page.tsx` — badge/PIN form structure confirmed
- `tech-pwa/src/components/dashboard/DashboardLayout.tsx` — `useSession()` auth confirmed
- `.planning/phases/schedule-redesign/sr-01-CONTEXT.md` — locked decisions
- `SESSION_STATE.md` — Playwright baseline state (43p/68s/0f)

### Secondary (MEDIUM confidence)
- `AG.md` — design token documentation (WARNING: `--accent` value in AG.md `#f97316` differs from live `globals.css` `#3b6cd4`. `globals.css` is authoritative.)
- `tech-pwa/src/app/api/field/attestation/sign/route.ts` — n8n webhook pattern confirmed

### Tertiary (LOW confidence)
- Geist availability via `next/font/google` vs `geist` npm package [ASSUMED — verify before installing]
- `@phosphor-icons/react` download stats [ASSUMED — verify with slopcheck before installing]

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `Geist` is available via `next/font/google` | Font Migration | If wrong, install `geist` npm package instead — low impact |
| A2 | `@phosphor-icons/react` is a legitimate, well-maintained package | Icon Library | If flagged by slopcheck, use `@heroicons/react` instead |
| A3 | `Outfit` is available via `next/font/google` | Font Migration | Near-certain — Google Fonts. If wrong, use `DM Sans` as fallback |
| A4 | n8n Twilio workflow will be created by Brandon before Lock and Send end-to-end testing | Lock and Send | If not created, test with mock webhook — implementation unblocked |

---

## Metadata

**Confidence breakdown:**
- Codebase state: HIGH — all files read directly
- API data shape: HIGH — route code read, response shape documented
- Lock and Send backend: HIGH — schema absence confirmed, migration path clear
- CSS token migration: HIGH — live values confirmed from globals.css
- Font migration: MEDIUM — next/font/google availability for Geist is assumed
- Playwright impact: HIGH — breaking tests identified by line

**Research date:** 2026-06-03
**Valid until:** 2026-07-03 (stable stack — Next.js 16 + Tailwind v4)
