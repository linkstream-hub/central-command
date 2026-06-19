# APT Central Command (CC2.0 → CC3.0)

## What This Is

Operations platform for APT Maintenance Inc., a Bay Area property maintenance company. The system handles inbound work order emails, parses them into a dispatch queue, lets dispatchers assign jobs to field technicians, and gives techs a mobile PWA for clocking in/out, completing jobs, and requesting time off. The backend is migrating from Google Sheets to Neon Postgres (Drizzle ORM) without disrupting the live system.

## Core Value

A dispatcher can receive a work order, assign a tech, and schedule the job — start to finish — without leaving the dashboard.

## Current Milestone: v1.1 Neon Cut-Over

**Goal:** Make Neon Postgres the sole write path for the active 21-day window; retire Sheets as a write target.

**Target features:**
- Audit — verify Neon row counts match Sheets for jobs, time_records, job_comments in the 21-day window
- Flip — Code.js stops dual-writing to Sheets; writes Neon only
- Archive — Sheets Dispatch Queue locked read-only; Neon confirmed source of truth

## Previous Milestone: v1.0 CC Core Operational ✅

**Goal:** Prove that the full lead→coordinate→assign/schedule loop works reliably on real production data before any other work proceeds.

## Requirements

### Validated

- ✓ Email ingestion — Gemini 2.5 Flash parses inbound leads into Dispatch Queue — Phase A
- ✓ Dispatch queue UI — tabbed live grid (Needs Review / Ready to Schedule / PTE Required / Scheduled / Complete) — Session 47–53
- ✓ Ready to Schedule grid — day × time grid, drag-and-drop scheduling — Session 53
- ✓ Tech PWA — badge + PIN auth, clock-in/out, shift tracking, job completion — Phase 1
- ✓ Google OAuth — office staff auth via next-auth v5 (@aptmaintenanceinc.com only) — Phase 1
- ✓ Job comments — internal threaded notes per job — Session 54 spec
- ✓ Neon Phase A — `comms_messages` live with shadow-write — Session 51
- ✓ Neon Phase B schema — `jobs`, `techs`, `time_records`, `job_comments` provisioned — Session 54
- ✓ Cloudflare Worker proxy — all API traffic through `api.aptmaintenanceinc.com` — Phase 1
- ✓ Push notifications — tech PWA push subscription infra wired — Session 53

### Active

- [ ] `job_comments` shadow-write — mirror `addJobCommentDA` writes to Neon (lowest risk, no historical data)
- [ ] `time_records` shadow-write — mirror clock-in/out events to Neon
- [ ] `techs` shadow-write — mirror roster changes to Neon
- [ ] `jobs` shadow-write — mirror dispatch queue writes to Neon (highest risk, done last)
- [ ] Tech Roster migration — 4 new techs (Cervantes, Cabrera Jesus, Contreras, Uqbagabir) need badge # from Keith before `setupNewTechPin()` can run
- [ ] `APT_HR_CALENDAR_ID` Script Property — Brandon must set in DashboardAPI for calendar blocking
- [ ] NEXT_PUBLIC_DASHBOARD_API_KEY security fix — `push/subscribe/route.ts` should use server-only env var

### Out of Scope

- Auto-reply to tenants/RMs (`AUTO_REPLY_ENABLED = false`) — Brandon enables only after Robert is confidently using dashboard in supervised trial
- OpenPhone SMS integration — solves PTE bottleneck; deferred to Tier 6 of roadmap (cost decision)
- `calibrateDurationDefaults()` — needs ~20+ PWA completions before the data is meaningful; deferred until organic use builds up
- Firebase — replaced by Neon Postgres; not being built
- Conflicting job detection — never built; needs spec before any work
- Code.js auto-routing (turnover → RtS, adhoc → PTE Required) — needs spec; not in active scope
- Status transition guardrails (block New → Scheduled without assignment) — needs spec
- Auto-archive jobs >10 days old — needs Apps Script backend function; not specced

## Context

- **Live production system** — touches real emails, real scheduling, real payroll. Every change needs a spec before AG touches it.
- **Google Sheets is the source of truth today.** Neon is being introduced via shadow-writes (write to both, read from Sheets) to de-risk the migration. No cutover until shadow data is validated.
- **Dispatch Queue is 30 columns, fixed order.** Column index is an invariant — never reorder or insert.
- **Three separate clasp projects:** Lead Parsing (repo root), Dashboard API (`dashboard-api/`), Time Manager (`time-manager/` — not yet set up).
- **AG workflow:** Claude Code writes specs → Kilo Code/AG implements → Browser Subagent audits → Claude Code reviews evidence → merge. AG never decides data shapes or column indexes.
- **Robert (dispatcher) is hourly non-exempt** — uses Tech PWA for his own timekeeping; salaried staff use CC2.0 HR page.
- **Hermes QA** — Docker container + Browserbase targeting Vercel preview URLs (not localhost) for browser audit.

## Constraints

- **Tech stack (locked):** Next.js 16 + TypeScript + Tailwind + Framer Motion frontend; Google Apps Script V8 backend; Neon Postgres + Drizzle ORM for migration target. No runtime changes without explicit decision.
- **Auth (locked):** Google OAuth (next-auth v5) for office staff; badge + SHA-256 PIN → UUID token for techs. The two auth systems must never be mixed — wrong hook causes redirect loops.
- **Sheets column order (frozen):** Dispatch Queue 30-col map is immutable. Any schema change requires updating every downstream reader simultaneously.
- **Security:** No API keys in code. All secrets via env vars or Script Properties. Every write audit-logged with actor + timestamp.
- **AG branch rule:** AG always commits to a feature branch named in the spec. Never to `main`. Vercel preview deploys the branch; Browser Subagent audits the preview.
- **Deployment:** `Code.js` deploys are manual only — it has email triggers that fire on deploy. All other Apps Script files auto-deploy via GitHub Actions on push to `main`.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Shadow-write migration strategy | Zero-downtime migration; Sheets stays source of truth until Neon data is validated | — Pending |
| Neon Phase B order: job_comments → time_records → techs → jobs | Risk-ordered by data volume and historical data exposure | — Pending |
| Drizzle ORM over raw SQL | Type-safe queries, schema-as-code, pairs well with Next.js | — Pending |
| Cloudflare Worker as API proxy | Rate limiting + auth enforcement at the edge, keeps Apps Script URLs private | ✓ Good |
| next-auth v5 Google OAuth for office staff | Industry standard, restricts to @aptmaintenanceinc.com domain | ✓ Good |
| Badge + PIN for techs (not Google OAuth) | Techs don't have Google Workspace accounts; PIN is fast on mobile | ✓ Good |
| Gemini 2.5 Flash for email parsing | Cost-effective, handles unstructured property maintenance emails well | ✓ Good |
| Single Dispatch Queue tab structure (workflow-state only) | Email type as badge on rows, not as tabs — prevents tab proliferation | ✓ Good |
| Three separate clasp projects | Dashboard API has different auth and deployment cadence from Lead Parsing | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:** Requirements invalidated → Out of Scope. Requirements validated → Validated with phase ref. New requirements emerged → Active. Decisions to log → Key Decisions.

**After each milestone:** Full review. Core Value check. Out of Scope audit. Context update.

---
*Last updated: 2026-05-29 — Milestone v1.0 CC Core Operational started*
