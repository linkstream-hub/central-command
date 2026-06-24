# SESSION STATE
# Overwrite completely at session close. Never append. This is the handoff.

---

## SESSION: S163 CLOSED (2026-06-24)

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
branch:  main (clean)
head:    e5eae6e fix(intake): use gemini-2.5-flash — 2.0 deprecated, 1.5 not on v1beta

commits-this-session:
  8799e77: fix(intake): remove stale Gemini 2.5 comment
  5c0e55f: fix(n8n): rewire phase-19 workflow — bypass old Gemini path, route email directly to Vercel webhook
  555dc30: fix(intake): use gemini-2.0-flash (intermediate, superseded)
  e5eae6e: fix(intake): use gemini-2.5-flash (FINAL — working)

production:
  deployed: 2026-06-24 via vercel deploy --prod from repo root
  includes: all commits through e5eae6e
  WOs visible in dispatch (confirmed)
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
  domains:    dispatch.aptmaintenanceinc.com — LIVE
              clock.aptmaintenanceinc.com — LIVE
  auto-deploy: BROKEN — always use `vercel deploy --prod` from C:\PTOW\1_APT_Central_Command
  env-pull:   ALWAYS answer NO — wipes .env.local

railway:   n8n-production-4f36b.up.railway.app — v2.59.2
```

---

## B3 EMAIL INTAKE — CONFIRMED LIVE

```yaml
status:  LIVE — end-to-end verified 2026-06-24
model:   gemini-2.5-flash (@ai-sdk/google v3.0.80)
         gemini-1.5-flash = not found on v1beta
         gemini-2.0-flash = deprecated "no longer available"
         gemini-2.5-flash = WORKING

n8n flow:
  Gmail → Code: Skip Filter → IF: Skip?
  [false] → HTTP: POST Vercel Webhook (dispatcch.aptmaintenanceinc.com/api/webhooks/n8n/gmail)
  [success] → IF: Comms Enabled? (dormant — INTAKE_COMMS_ENABLED off)
  [error]   → Execute Workflow (NUH0krzQiSrBmyfv error handler)

orphaned nodes (cleanup Phase 23):
  IF: Lapham Form?, Code: Build Gemini Payload, HTTP Request: Gemini API,
  Code: Parse Gemini Response, Code: Normalize Address Key, Neon: Property Lookup,
  Code: Merge Property Data, IF: Access Info Changed?, HTTP: POST access-sync

comms issue: IF: Send Auto-Reply? refs $('Code: Merge Property Data') — stale
  safe: INTAKE_COMMS_ENABLED=false until Phase 23 fixes refs
```

---

## PHASE SEQUENCE

```yaml
Phase 22: UI Surgical Fixes (Codex) — READY NOW
          spec: docs/PHASE22_UI_SPEC.md
          LockSendButton removal, date nav, Kanban scope, WO card 6 fixes

Phase 23: n8n Stub Porting (AG) — UNBLOCKED (B3 confirmed)
          Port Lapham extraction + property merge INTO Vercel webhook route.ts
          Clean orphaned nodes from wif9XlVbK3M6a1C8 via n8n REST API
          Fix comms node data refs ($('Code: Merge Property Data') → webhook response)

Phase 24: Tech Roster Seed (AG) — after Phase 23

Phase B:  Schema migration (ADR-004 columns) — deferred
Phase C:  DB cleanup SQL — after 3+ confirmed real email parses
          SELECT COUNT(*) FROM jobs WHERE gmail_msg_id IS NOT NULL AND description IS NULL;
          DELETE + CREATE UNIQUE INDEX after cleanup

Phase 21: GAS Cutover — complex, later
C2 (deferred): delete lib/job-transitions.ts — blocked until Phase 21
```

---

## N8N WORKFLOW REGISTRY

```yaml
active:
  wif9XlVbK3M6a1C8: Phase 19 — Email Polling & WO Intake (REWIRED S163)
  fpwZXWR9u7nOmiDa: CC Event Bus Router
  NUH0krzQiSrBmyfv: PTOW Error Handler (error workflow for all)
  0V9YLwpiTBJ84InU: FLAG Gate Notification
  Wiuvox8VOZNtVoDN: CA Break Compliance Monitor
  dshTB3lODDYy0FTP: CC Event Bus Outbox Poller
```

---

## CI / WORKFLOW GATES

```yaml
ci-check:   "TypeScript + Lint + Build" — required pass before merge
e2e:        workflow_dispatch only — run manually before major merges
tsc-rule:   always run tsc from C:\PTOW\1_APT_Central_Command (REPO ROOT)
ag-process: AG must use PR branches — direct push to main happened twice S163 (violation)
```

---

## KNOWN ISSUES

```yaml
hook-bug:   continuous-learning-v2/hooks/observe.sh PostToolUse reverts Edit tool changes
            workaround: use Bash sed for string replacements → git add → git commit
            affected: tech-pwa/src/app/api/webhooks/n8n/gmail/route.ts confirmed

vercel-mcp: runtime logs → always 403 Forbidden — surface errors in API response body
lsp:        TypeScript LSP broken on Windows (uv_spawn .cmd wrapper) — ignore
n8n-key:    N8N_API_KEY expires ~2026-07-10
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
webhook-auth:    DASHBOARD_API_KEY header OR Authorization: Bearer <key>
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
fix-pr10:  MERGED PR #10 — email intake 4 bugs + tests
```
