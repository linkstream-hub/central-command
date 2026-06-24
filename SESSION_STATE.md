# SESSION STATE
# Overwrite completely at session close. Never append. This is the handoff.

---

## SESSION: S163 START (2026-06-24)

---

## SYSTEM STATE

```yaml
status:     LIVE
url:        https://dispatch.aptmaintenanceinc.com
test-creds: badge=1 PIN=1234
sandbox:    http://localhost:4141 (Docker — dev Neon branch)
```

---

## GIT STATE

```yaml
branch:  main (clean — PR #8 + PR #9 merged and deleted)

merged-this-session:
  PR #9: feat/phase-20-auth-lint
         ESLint no-restricted-imports auth boundary rule
         Fixed 41 lint errors, vitest ESM (next-auth inline), tsc cross-file mismatches
         E2E trigger changed to workflow_dispatch only

  PR #8: fix/jobs-sync-expose-cause
         Exposed error.cause.message in /api/jobs/sync 500 response
         Cleaned Drizzle upsert SET clause (removed id/createdAt auto-managed cols)
         Rebased onto main to pick up Phase 20 CI fixes

production:
  deployed: 2026-06-23 via vercel deploy --prod from repo root
  includes: Phase 17 + Phase 18 + Phase 19 + Phase 20 + PR #8 fix
  WOs visible in dispatch (confirmed by Brandon)
```

---

## APT PORTAL (separate repo)

```yaml
repo:    linkstream-hub/apt-portal
local:   C:\PTOW\apt-portal
status:  DRAFT PROTOTYPE — mock data only, no backend
stack:   Next.js 15 App Router, JavaScript (not TS), Tailwind, shadcn/ui
built-by: Emergent (AI builder) — reviewed + stripped 2026-06-23
pages:   / (login) · /dashboard · /wo/[jobId]
auth:    localStorage portal_user — mock only
data:    lib/mock-data.js — 12 WOs, 2 PMs
         sarah.kim@laphamcompany.com (8 WOs, 4 Oakland addresses)
         mark.torres@laphamcompany.com (4 WOs, 2 addresses)

next-steps (AG — post operational-core gate):
  1. Migrate JS → TypeScript
  2. Add /api/portal/wo route scoped by rmEmail → Neon
  3. Replace mock auth with magic link or PM token
  4. Add notification_contacts to clients table (schema migration needed)
```

---

## INFRA STATE

```yaml
neon-prod:  ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream account)
migration-0007:  APPLIED (workflow_events table created)

vercel:
  account:    Linkstream Hub (team_om3dVTnIzZPcYUgDnCiIh7C3)
  project:    central-command (prj_VEXiuqZgEKIU1OJZ4Fen0q55zcQL)
  domains:    dispatch.aptmaintenanceinc.com — LIVE, Valid Configuration Production
              clock.aptmaintenanceinc.com — added, DNS change authorized (2026-06-23)
              central-command-rho.vercel.app — alias, Valid Configuration Production
  github:     linkstream-hub/central-command connected (Connected Jun 19)
  auto-deploy: should work via GitHub App — VERIFY next push to main triggers build
  cli-deploy: vercel deploy --prod from C:\PTOW\1_APT_Central_Command (REPO ROOT, not tech-pwa/)
              answer NO to env pull prompt — wipes .env.local
  old-project: aptmaintenanceincs-projects/central-command (prj_2R8XCDwt1GDCXk6RZ2pEdqIesR5B)
               domains migrated away — abandon

railway:   n8n-production-4f36b.up.railway.app — v2.59.2 (latest)
```

---

## S163 VERIFICATION RESULTS (2026-06-24)

```yaml
V1 auth:        CONFIRMED — /live redirects to /login → Google OAuth button
V2 B3 intake:   CONFIRMED — exec 1171 (01:00 UTC) processed real web form email
                            "[Web Form] General Repair — 121 Main Unit 121"
                            succeeded after PR #8 deploy; pipeline LIVE
                            errors in exec 1136+1147 were pre-deploy (expected)
V3 auto-deploy: TESTING — this commit to main is the test; watch Vercel dashboard
V4 clock DNS:   NOT YET CHECKED
```

---

## PHASE SEQUENCE

```yaml
Phase 22: UI Surgical Fixes (Codex) — spec at docs/PHASE22_UI_SPEC.md
          LockSendButton removal, date nav, Kanban scope, WO card 6 fixes
          can start now

Phase 23: n8n Stub Node Porting (AG) — Lapham extraction + property merge
          BLOCKED until B3 email intake confirmed working

Phase 24: Tech Roster Seed (AG)
          after Phase 23

Phase 21: GAS Cutover — complex, later
C2 (deferred): delete lib/job-transitions.ts — blocked until Phase 21
```

---

## N8N WORKFLOW REGISTRY

```yaml
active:
  fpwZXWR9u7nOmiDa: CC Event Bus Router
  wif9XlVbK3M6a1C8: Phase 19 — Email Polling & WO Intake
  NUH0krzQiSrBmyfv: PTOW Error Handler (error workflow for all)
  0V9YLwpiTBJ84InU: FLAG Gate Notification
  Wiuvox8VOZNtVoDN: CA Break Compliance Monitor
  dshTB3lODDYy0FTP: CC Event Bus Outbox Poller (active)
```

---

## CI / WORKFLOW GATES

```yaml
ci-check:   "TypeScript + Lint + Build" — required pass before merge
e2e:        workflow_dispatch only — run manually before major merges
            saves ~22 min per push (no longer auto-triggers on PR)
tsc-rule:   always run tsc from C:\PTOW\1_APT_Central_Command (REPO ROOT)
            not from tech-pwa/ — subdirectory misses cross-file errors
```

---

## VPN — OPERATIONAL RULE

```yaml
rule:     VPN OFF before any CLI session (git, vercel, gh, node, claude, AG, Codex)
reason:   Paris IP caused GitHub account flag + Vercel block
```

---

## ARCHITECTURE LOCKED — S153

```yaml
domain-layer:    tech-pwa/src/domain/ — pure business logic, no Next.js imports
dal-injection:   domain/ accepts DAL interface → unit-testable
result-type:     Result<T,E> — no throws in domain logic
branded-ids:     JobId, TechId, PropertyId
discriminated-u: JobState discriminated union
zod-boundaries:  all API route inputs validated with Zod schemas
tdd-standard:    every phase from 17 onward ships tests-first — non-negotiable
fsm:             JOB_STATE_MACHINE (8 arcs) + createJobStateService factory
event-bus:       EventBus.publish() → workflow_events outbox → n8n router
auth-tech:       badge + SHA-256 PIN → UUID session_token in Neon (tech routes)
auth-staff:      Google OAuth next-auth v5 (office routes)
eslint-boundary: no-restricted-imports in eslint.config.mjs (ADR-001)
                 blocks useSession/getSession outside /app/ (staff-only hooks)
```

---

## KEY ARCHITECTURAL FACTS

```yaml
neon-prod:       ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream)
neon-dev-branch: br-muddy-flower-ak85a9jc | compute: ep-holy-waterfall-akwxx49b
gh-cli:          authenticated as linkstream-hub (member of org)
                 GITHUB_TOKEN cleared — always run unset GITHUB_TOKEN before gh commands
playwright:      globalSetup uses DATABASE_URL (not DATABASE_URL_TEST)
team:            Brandon (manager) → Claude Code (lead/gate) → AG (builder, Gemini) → Codex (frontend)
graphify:        graphify update . → pipx binary (0.8.38) → graphify-out/
vercel-logs:     MCP returns 403 Forbidden — surface errors in API response body
```

---

## GAS STATE

```yaml
migration:
  phase-15: MERGED
  phase-16: MERGED — prod LIVE
  phase-17: MERGED
catalog:   docs/GAS_MIGRATION_SCOPE.md
```

---

## MERGED PHASES (complete)

```yaml
phase-17:  MERGED PR #2
phase-18:  MERGED PR #6 — EventBus outbox
phase-19:  MERGED PR #7 — Observability + CI fix
phase-20:  MERGED PR #9 — ESLint auth boundary rule
fix-pr8:   MERGED PR #8 — jobs/sync error surface + upsert fix
```
