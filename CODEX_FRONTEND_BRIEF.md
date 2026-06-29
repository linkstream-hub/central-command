# Codex Frontend Brief
# Last updated: 2026-06-26

---

## FEATURE FREEZE — ACTIVE

No new UI redesigns, new components outside approved recovery scope, or speculative frontend work. Recovery work only, inside approved Task Cards from Claude Code.

---

## Purpose

Brief for Codex sessions on **APT Central Command frontend design and UI implementation**.

Not a brief for backend, automation, dispatch logic, email parsing, n8n, Apps Script, data migration, or production operations work.

## CORE STACK

- **agentmemory:** durable preferences and decisions.
- **Karpathy:** think first, state assumptions, choose simple path, surgical edits, verify outcome.
- **Caveman:** terse technical communication.
*(Note: No Codegraph or Graphify required for frontend tasks.)*

## DOMAIN BOUNDARIES

- **Allowed:** `/app/**` pages, components, CSS.
- **Forbidden:** `/api/**`, `/domain/**`, `/lib/dal/**`, `/lib/schema/**`, `n8n`. Never touch backend.

---

## SESSION START

1. Read `SESSION_STATE.md` — freeze status, current phase, open tasks.
2. Read `.impeccable/design.json`
3. Read `PRODUCT.md`
4. Read `DESIGN.md`
5. Receive Task Card from Claude Code before coding.

---

## SHADCN/UI STANDARD (Phase 0 mandate)

All **new** frontend components must use shadcn/ui. Do not roll custom Tailwind components for UI primitives.

- Install: `npx shadcn@latest add [component]` (from `tech-pwa/`)
- Existing components not required to migrate during Phase 0
- Customize shadcn components to match `.impeccable/design.json` tokens
- Do not bypass design tokens for shadcn defaults

---

## Required Context

Before any CC frontend work:

1. `.impeccable/design.json` — machine-readable design system
2. `PRODUCT.md` — what to build / what NOT to build
3. `DESIGN.md` — visual direction

Key summary:
- Product: APT Central Command, dispatch platform for APT Maintenance Inc.
- Users: desktop dispatchers and mobile field technicians.
- Design language: dense, tactical, trusted, dispatch-room energy.
- Palette: dark navy system, load-bearing amber `#f5b900`.
- No generic SaaS, Linear, Notion, Vercel, or marketing dashboard aesthetics.
- Rows, tables, status chips, dense scanning, operational hierarchy.
- Status never color-only — always text label + color.
- Tech PWA: mobile-first, glove/sunlight-friendly, touch targets ≥44px.

---

## Repo Separation Rule

Default posture:
- Production Central Command code in `C:\PTOW\1_APT_Central_Command` only.
- Exploratory / prototype frontend → separate repo or worktree.
- Do not make exploratory commits in production repo.

Separate repo when task involves: new visual direction, prototype UI, competing options, large layout/nav changes, design exploration needing screenshots.

Recommended branch prefix: `codex/`

---

## Frontend Working Rules

- Read existing code structure before editing.
- Surgical changes only — no broad rewrites.
- Preserve routing, data contracts, field names, analytics labels, operational flows.
- Use existing project patterns; use shadcn/ui for new components.
- Verify: responsive (desktop dispatcher + mobile tech), reduced-motion, keyboard focus, color contrast.
- No color-only status. No decorative gradients. No generic card grids.

---

## Design Acceptance Bar

Pass when:
- UI matches `.impeccable/design.json`, `PRODUCT.md`, `DESIGN.md`.
- Dispatcher: high information density, no visual mud.
- Mobile tech: clear in short, one-handed field interactions.
- Status/urgency/next action readable in < 1 second.
- Empty, loading, error, disabled, hover, active, focus states present.
- No production code touched accidentally.
- `/impeccable audit` run and passed before merging UI changes.

---

## Handoff Protocol

Report at end of every session:
- Repo/worktree used
- Branch used
- Files changed
- Whether production code was touched
- Verification performed
- Open design questions
- Exact next step for integration or review
- Task Card compliance (all gates met?)
