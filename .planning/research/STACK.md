# Stack Research

**Domain:** Field operations platform — email ingestion, dispatch, mobile PWA, payroll-adjacent timekeeping
**Researched:** 2026-05-10
**Confidence:** HIGH — stack is locked by production constraints and prior key decisions

---

> **Note:** This stack is not hypothetical. APT Central Command is a live production system. The technologies listed here are already deployed and in use. This document captures the rationale and integration model, not options to choose from.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Google Apps Script (V8) | Latest | Backend API — email parsing, Sheets writes, job dispatch, tech PWA API | Already deployed. Required because the data store is Google Sheets and GmailApp/Calendar integration is native. No viable alternative without replacing the entire backend simultaneously. |
| Next.js | 16 | Frontend — CC2.0 dashboard + Tech PWA | React Server Components + App Router give SSR for the dispatch dashboard and static export capability for the PWA. Vercel auto-deploy is zero-config. |
| TypeScript | 5.x | Type safety across all frontend code | Drizzle ORM schema-as-code requires TypeScript. Prevents column-index bugs in the 30-col Dispatch Queue shape. |
| Tailwind CSS | 3.x | Utility-first styling | Dark-mode glassmorphism design system requires fine-grained token control. Tailwind + CSS variables is the right tool. |
| Framer Motion | 10.x | Animations — page transitions, modal opens, list entrances | Required by design standards. Every interaction has motion. Framer Motion is the only animation library with the layout animation and gesture APIs this UI depends on. |
| Neon Postgres | Serverless | Migration target database — `jobs`, `techs`, `time_records`, `job_comments`, `comms_messages` | Serverless Postgres with HTTP driver works in Vercel Edge/serverless functions without connection pooling complexity. Branch-based development matches git-branch workflow. |
| Drizzle ORM | 0.30+ | Type-safe Postgres queries | Schema-as-code. Migrations are plain SQL files. No runtime magic. Pairs cleanly with Next.js server components. Chosen over Prisma because Drizzle has no connection pool overhead for serverless. |
| Gemini 2.5 Flash | Latest | Email parsing — unstructured property maintenance emails → structured job records | Cost-effective at scale (15-min polling, M–F, 6:30am–7pm). Handles messy real-world property management emails better than structured parsers. Called via UrlFetchApp REST from Apps Script. |
| next-auth | v5 (beta) | Office staff authentication — Google OAuth, @aptmaintenanceinc.com domain restriction | Industry standard. v5 App Router integration is stable. Domain restriction via `signIn` callback guards all office routes. |
| Cloudflare Workers | Latest | API proxy — `api.aptmaintenanceinc.com` → DashboardAPI.gs | Rate limiting + auth enforcement at the edge. Keeps Apps Script deployment URLs private. Zero-latency routing for Bay Area users. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@neondatabase/serverless` | Latest | Neon HTTP driver for serverless environments | All Neon queries from Next.js API routes and server components. Never use `pg` directly in this environment. |
| `drizzle-kit` | Latest | Schema migrations CLI | Run `drizzle-kit generate` when schema changes, `drizzle-kit migrate` to apply. Never edit migration files by hand. |
| `clasp` | Latest | Google Apps Script deployment CLI | `clasp push --force` then `clasp deploy` per the deployment workflow. Three separate projects — never run from wrong directory. |
| `web-push` | Latest | Push notification delivery | Tech PWA push subscription stored in Tech Roster col R. Used server-side to fan out notifications. |
| `crypto` (Node built-in) | — | SHA-256 PIN hashing | Tech auth: badge + SHA-256(PIN) → UUID session token. Never store raw PINs. |
| `@dnd-kit/core` | Latest | Drag-and-drop scheduling grid | RtS day × time grid uses dnd-kit for job card dragging. |
| Playwright | Latest | E2E browser tests | `e2e.yml` — runs on push to `tech-pwa/` paths + weekly Monday 6am Pacific. Mock mode on port 3010. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Vercel | Frontend hosting + preview deploys | Root directory = `tech-pwa/`. AG branches auto-deploy preview URLs for Browser Subagent audits. |
| GitHub Actions | CI/CD | Auto-deploys DashboardAPI.gs + TechPWA.gs on push to `main`. `Code.js` is manual only — email triggers fire on deploy. |
| n8n (Railway) | Event bus | Orchestrates cross-system events. Sentinels (health, time-anomaly, wc-scanner, stale-job, spec-architect) run on Railway. |
| Flowise (Railway) | Compliance engine | Pinned at v1.8.2. Do not upgrade without testing — compliance logic is pinned to this version's behavior. |
| Docker + Browserbase | Hermes QA | Container runs Claude Haiku via OpenRouter. Targets Vercel preview URLs (not localhost). Dev bypass button for auth. |

---

## Installation

The stack is already installed. For reference when bootstrapping a new environment:

```bash
# Frontend (tech-pwa/)
cd tech-pwa
npm install  # .npmrc sets legacy-peer-deps=true — required

# Local dev
npm run dev  # → http://localhost:3000

# Apps Script
npm install -g @google/clasp

# Drizzle
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Neon Postgres | PlanetScale (MySQL) | If MySQL dialect is preferred; Neon chosen for Postgres type safety with Drizzle |
| Drizzle ORM | Prisma | Prisma is fine for long-lived servers; Drizzle wins in serverless because no connection pool daemon |
| Drizzle ORM | Raw SQL | Use raw SQL only for migrations and one-off scripts — never in application code paths |
| Google Apps Script | Firebase Functions | Firebase was explicitly replaced by Neon; GAS stays because Gmail/Calendar/Sheets integration is native |
| next-auth v5 | Clerk, Auth0 | Clerk/Auth0 add cost and complexity; next-auth v5 handles Google OAuth domain restriction cleanly at zero cost |
| Cloudflare Workers | AWS Lambda@Edge | Cloudflare is simpler to configure for this use case; no cold starts for the proxy layer |
| Gemini 2.5 Flash | GPT-4o-mini | Gemini chosen for cost at polling frequency; equivalent quality for property maintenance email parsing |
| Framer Motion | CSS transitions | CSS transitions cannot do layout animations or gesture-driven drag interactions — Framer Motion is required |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Firebase Realtime Database / Firestore | Explicitly replaced by Neon Postgres; any Firebase code is technical debt | Neon Postgres + Drizzle ORM |
| `pg` (node-postgres) directly | Requires persistent connection pool — crashes in serverless/edge functions | `@neondatabase/serverless` HTTP driver |
| Prisma | Connection pool overhead in serverless; Drizzle is already in use | Drizzle ORM |
| `window.confirm()` / `alert()` | Banned by design standards | Toast notifications via sonner or react-hot-toast |
| Hardcoded hex colors in components | Breaks theming and dark mode | Tailwind tokens or CSS variables only |
| `NEXT_PUBLIC_*` env vars for secrets | Exposed in client bundle | Server-only env vars; NEXT_PUBLIC_ only for truly public config |
| OpenPhone SMS (currently) | Deferred — cost decision pending ($15/month) | Not yet built; manual PTE workflow continues |

---

## Stack Patterns by Variant

**For office staff pages (`/live`, `/schedule`, `/hr`, etc.):**
- Use `useSession()` from `next-auth/react`
- Never use `getSession()` from `@/lib/auth` — that is the tech auth hook

**For tech PWA pages (`/jobs`, `/job/[jobId]`, etc.):**
- Use `getSession()` from `@/lib/auth`
- Never use `useSession()` — wrong hook causes redirect loops to Google OAuth

**For Apps Script API calls from the frontend:**
- All traffic through `api.aptmaintenanceinc.com` (Cloudflare Worker)
- Never call DashboardAPI.gs deployment URL directly
- POST requests use `Content-Type: text/plain` to bypass CORS preflight (body is still JSON)

**For Neon writes from Apps Script (shadow-writes):**
- Use `UrlFetchApp` with Neon's HTTP API or a thin REST wrapper
- Shadow-write order (lowest to highest risk): `job_comments` → `time_records` → `techs` → `jobs`
- Read from Sheets until shadow data is validated; only then cut over

**For schema changes:**
- Dispatch Queue column order is frozen — 30 columns, fixed indexes
- Any Neon schema change must update Drizzle schema file + run migration + update all downstream readers simultaneously

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next-auth v5 (beta) | Next.js 16 App Router | v5 is required for App Router; v4 does not support RSC correctly |
| Drizzle ORM 0.30+ | `@neondatabase/serverless` | Use Neon's HTTP driver adapter for Drizzle, not the standard `pg` adapter |
| Framer Motion 10.x | React 18 | `layout` animations require React 18 concurrent mode — Next.js 16 provides this |
| Flowise 1.8.2 | Railway | Pinned — do not upgrade without regression testing compliance logic |
| clasp | Apps Script V8 | V8 runtime must be set in `appsscript.json`; default is Rhino (legacy) |

---

## Sources

- CLAUDE.md — Production system state, locked stack decisions, auth patterns
- PROJECT.md — Key decisions table with rationale and outcome assessments
- `docs/ARCHITECTURE.md` — System briefing (six domains, component boundaries)
- `docs/SHEETS_SCHEMA.md` — Column reference (authoritative for Neon schema shapes)
- Session 51–54 git history — Neon Phase A/B provisioning, shadow-write strategy

---

*Stack research for: APT Central Command (CC2.0 → CC3.0)*
*Researched: 2026-05-10*
