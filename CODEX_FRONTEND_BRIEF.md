# Codex Frontend Brief

## Purpose

This brief is for Codex sessions working on **APT Central Command frontend design and UI implementation**.

It is not a task brief for backend, automation, dispatch logic, email parsing, n8n, Apps Script, data migration, or production operations work. Keep frontend exploration separate from the actual Central Command product unless the user explicitly asks to apply a specific approved change.

## Required Context

Before starting any CC frontend work, read these files in this order:

1. `.impeccable/design.json`
2. `PRODUCT.md`
3. `DESIGN.md`

Treat them as the design source of truth.

Key summary:

- Product: APT Central Command, an operations dispatch platform for APT Maintenance Inc.
- Users: desktop dispatchers and mobile field technicians.
- Design language: dense, tactical, trusted, dispatch-room energy.
- Palette: dark navy system with one load-bearing amber signal color, `#f5b900`.
- Do not make it look like generic SaaS, Linear, Notion, Vercel, or a marketing dashboard.
- Rows, tables, status chips, dense scanning, and operational hierarchy beat decorative cards.
- Status must never be color-only. Use text labels plus color.
- Keep the tech PWA mobile-first, glove/sunlight friendly, and touch targets at least 44px.

## Repo Separation Rule

Do not mix frontend experiments with Central Command production work.

Default posture:

- Use `C:\PTOW\1_APT_Central_Command` only as the coordination and source-of-truth repo.
- Do not make exploratory frontend implementation commits directly in this repo.
- Do not modify production Central Command code while shaping UI concepts unless the user explicitly says to implement in-place.

If the work is exploratory, visual, prototype-heavy, or uncertain, create a separate repo or separate worktree, the same way the website/contact page work was isolated.

Recommended names:

- `cc-frontend-prototype`
- `cc-frontend-redesign`
- `apt-central-command-frontend`

Recommended branch prefix:

- `codex/`

Example branch names:

- `codex/cc-frontend-brief`
- `codex/dispatcher-dashboard-redesign`
- `codex/tech-pwa-ui-prototype`

## When To Create A Separate Repo

Create a separate repo when the task involves:

- A new visual direction.
- A prototype, throwaway UI, or multiple competing interface options.
- Large changes to CSS, layout, navigation, or component hierarchy.
- Frontend work that may conflict with active Central Command backend/ops work.
- Any design exploration that needs screenshots, Playwright checks, or design iteration before production integration.

Use the production repo only after the user selects an approach and asks to integrate it.

## Frontend Working Rules

Assumptions:

- Dispatcher dashboard is dense desktop software.
- Tech PWA is a separate mobile interaction model, not a smaller dashboard.
- The system is dark-mode only unless the user explicitly changes that.
- `#f5b900` is signal/action amber, not decoration.

Implementation rules:

- Read existing code structure before editing.
- Prefer surgical changes over broad rewrites.
- Preserve routing, data contracts, field names, analytics-relevant labels, and operational flows.
- Use existing project patterns and dependencies.
- Verify responsive behavior for desktop dispatcher and mobile tech views.
- Verify reduced-motion behavior.
- Verify keyboard focus and color contrast.
- Do not rely on color alone for status.
- Do not add decorative gradients, generic card grids, or marketing-page hero patterns.

## Design Acceptance Bar

A CC frontend pass is not done until:

- The UI matches `.impeccable/design.json`, `PRODUCT.md`, and `DESIGN.md`.
- Dispatcher views show high information density without visual mud.
- Mobile tech views are clear in short, one-handed field interactions.
- Status, urgency, and next action are readable in under a second.
- Primary actions are obvious and unambiguous.
- Empty, loading, error, disabled, hover, active, and focus states exist where relevant.
- No Central Command production code was touched by accident.

## Handoff Protocol

At the end of any CC frontend session, report:

- Repo/worktree used.
- Branch used.
- Files changed.
- Whether Central Command production code was touched.
- Verification performed.
- Open design questions.
- Exact next step for integration or review.

If work was done in a separate repo, include the absolute path and commit hash.

