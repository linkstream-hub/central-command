# Schedule Page Redesign — Phase Context

**Phase:** Schedule Page Redesign (SR-01)
**Date:** 2026-06-03
**Milestone:** Schedule Page Redesign (pre-CC3.0 Tier 1)
**Status:** Ready to plan

---

## Domain

Replace the Google Sheet daily dispatch workflow with a purpose-built CC schedule page. The sheet dies the day the "Lock and Send" button works. This is also the design system genesis — decisions made here define the visual language for the entire CC platform going forward.

---

## Decisions

### Visual Direction — LOCKED

**Palette:**
- Background: deep navy (`#0f172a` or similar — NOT pure `#000000`)
- Primary accent: amber (`#f59e0b`) — urgency, CTAs, action states
- Secondary accent: teal (`#10b981`) — active/in-progress, scheduled states
- Muted/inactive: slate grays (warm-tinted, single gray family — not mixed warm/cool)
- Text: white primary, muted gray secondary, tabular-nums for job codes and counts

**Typography:**
- Font: Geist or Outfit (not Inter — Inter is the AI default)
- Tabular figures (`font-variant-numeric: tabular-nums`) for all numeric data
- Sentence case headers (not Title Case)
- Weight range: 400 / 500 / 600 / 700 — no extremes

**Aesthetic target:** Linear meets field operations command center. Dense operational cockpit. Consumer-grade feel, not enterprise software. Specifically NOT: purple/blue AI gradient, three equal feature cards, glassmorphism without purpose.

**Reference images approved (saved in `A:\OneDrive\Documents\Professional Life\01_APT_PROFESSIONAL\Tech\`):**
- `f77efbe0` — Desktop dispatch dashboard (tech-row week view) — approved core layout, simplify right panel for Sprint 1
- `fd4ab59d` — Mobile job list — approved as-is, use as direct reference
- `f7c87c3d` — Mobile badge/PIN login — approved as-is, use as direct reference
- `3887df3e` — Full dispatch command center — FUTURE SCOPE (CC3.0 Tier 2), do not build now
- `c0ab2aab` — Lock and Send confirmation screen — INCLUDE in Sprint 1 scope

### Design System Architecture — LOCKED

**CSS token approach:** Semantic custom properties (`--color-surface`, `--color-text-primary`, `--color-accent` — NOT `--color-dark-navy`). Token names are semantic so light mode values can be added later by swapping token values without touching component code.

**Theme strategy:**
- Sprint 1: Dark theme only
- Theme switching: system preference detection (`prefers-color-scheme`) — no sun/moon toggle UI in Sprint 1
- Manual toggle: deferred to a follow-up sprint, integrate into settings (not a floating switch)
- Light mode token values: future sprint

**Quality enforcement:** `redesign-existing-projects` + `design-taste-frontend` taste-skill skills installed at `.agents/skills/` — active for AG and Claude Code. AG must use these as context during implementation.
- `design-taste-frontend` dials for the schedule page (dense operational dashboard): `VARIANCE: 3-4 / MOTION: 2-3 / DENSITY: 8-9`
- AG must check `AG.md` design tokens FIRST, taste-skill guidance second — do not override the existing design system

### Desktop Schedule Page — LOCKED

**Layout:**
- Left sidebar: existing navigation (keep)
- Top bar: date navigation (day/week toggle), "Lock and Send" amber CTA button top right
- Main content: tech-row grid (NOT time-slot calendar — this is the critical shape change)

**Tech-row grid:**
- Left column: tech avatar + name
- Row content: job chips spanning the selected day/week
- Job chip colors: amber = URGENT, teal = active/in-progress, slate = scheduled, muted = unassigned
- Job chips show: property address (truncated), job type icon
- Date navigation at top: day view default, week view toggle

**"Lock and Send" flow:**
1. Dispatcher reviews the day's grid
2. Clicks "Lock and Send" amber button
3. Confirmation screen appears (Image 5 pattern): shows tech count, job count, message preview, send timeline
4. One confirmation click fires n8n/Twilio texts to each tech with their day's assignments
5. Marks sent in DB — the "S" column is dead

**Data layer:** `/api/schedule/today` and `/api/schedule/week` endpoints already exist and are Neon-connected. The data layer is correct — only the UX shape and the Lock and Send action need to be built.

**Right panel (Sprint 1 scope):** Urgent Queue only (jobs needing attention). All other panels (Route Efficiency, Lockbox Status, Connected Feed, AI Dispatch Intelligence) are DEFERRED to future milestones.

### Mobile Tech PWA — LOCKED

**Badge/PIN login (Image `f7c87c3d`):**
- Dark navy background
- APT shield logo centered
- Badge number display (large, bold)
- Numeric keypad (1–9, 0) — clean rounded square keys
- Four PIN dot indicators
- Amber "Confirm" CTA
- Consumer-grade, minimal — feels like unlocking an iPhone

**Job list (Image `fd4ab59d`):**
- Dark navy, greeting header ("Good morning, [name]")
- Job cards: amber "URGENT" pill, teal "SCHEDULED" pill
- Card content: property address (bold), job description, time window, trade icon
- Subtle left border color-coding per urgency
- Bottom nav: Home, Jobs, Messages, Profile

**Auth pattern:** Badge/PIN uses `getSession()` from `@/lib/auth` — NOT `useSession()` from `next-auth/react`. Never mix auth hooks (existing constraint from CLAUDE.md).

### Interaction Standards — LOCKED

- Hover states on all interactive elements (background shift + subtle scale)
- Active/pressed feedback: `scale(0.98)` or `translateY(1px)`
- Transition duration: 200–300ms on all interactive elements
- Skeleton loaders for loading states (not spinners)
- Empty state: designed "no jobs scheduled" view — not blank
- All animations use `transform` + `opacity` (GPU-accelerated, not `top`/`left`)
- No modals for simple actions — inline editing or slide-over panels preferred
- Icons: NOT Lucide exclusively — use Phosphor or Heroicons for differentiation

---

## Build Order (Sprint 1 Scope)

1. CSS token architecture + design system foundation
2. Desktop: tech-row daily/week grid (replace current time-slot calendar)
3. Desktop: Lock and Send button + confirmation screen (Image 5 pattern)
4. Mobile: Badge/PIN login redesign (Image `f7c87c3d`)
5. Mobile: Job list redesign (Image `fd4ab59d`)
6. Playwright tests: 0 new failures vs baseline (43p/68s/0f)

---

## Deferred Ideas (future phases)

- Light mode token values + manual theme toggle in settings
- Full dispatch command center (Image `3887df3e`): Assignment Board, Dispatch Intelligence, AI scoring — CC3.0 Tier 2
- Route Efficiency panel, Lockbox Status panel, Connected Feed — post-Sprint 1
- CC3.0 Tier 1: meal premium auto-calc, QB invoice via n8n, ADP payroll export

---

## Canonical Refs

- `tech-pwa/src/app/schedule/` — existing schedule page (wrong shape — time-slot)
- `tech-pwa/src/app/api/schedule/` — existing API endpoints (Neon-connected, correct)
- `tech-pwa/src/app/jobs/` — existing job list (mobile reference point)
- `tech-pwa/src/lib/auth.ts` — badge/PIN auth (`getSession()`)
- `AG.md` — design tokens, typography system, CSS variables (check FIRST before taste-skill)
- `docs/ARCHITECTURE.md` — system architecture
- `.agents/skills/redesign-existing-projects/SKILL.md` — design audit skill (active)
- `.agents/skills/design-taste-frontend/SKILL.md` — design quality skill (active, use dials 3-4/2-3/8-9 for dashboard)
- `SESSION_STATE.md` — Playwright baseline state, Neon architecture facts

---

## PTOW Gate Pre-Check

Before AG plans or implements — flag to Claude Code if any task touches:
- Auth token patterns or session storage keys
- Neon schema changes (new columns, new tables)
- Cross-system writes (Next.js + GAS + Neon in same action)
- New `/api/` routes replacing existing GAS action strings

The Lock and Send action will invoke n8n via webhook — this is a cross-system write. Flag for Claude Code review before implementing.
