# SESSION STATE
# Overwrite completely at session close. Never append. This is the handoff.

---

## SESSION: S164 (2026-06-24)

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
branch:  main (Phase 24 + PR #14 merged + deployed)
head:    PR #14 squash merge

commits-this-session:
  924eadc: feat(ui): phase 22 surgical fixes (Codex — merged PR #12)
  43807eb: feat(intake): phase 23 lapham + access merge (PR #11 merged)
  PR #13:  Phase 24 — /api/techs/import rewrite + 178 tests + fileParallelism fix
  PR #14:  fix/intake-parse-and-comms — 4 intake bugs + n8n comms refs + C4 mapper dedup

production:
  deployed: 2026-06-24 via vercel deploy --prod from repo root
  includes: Phase 22 + 23 + 24 + PR #14 all LIVE
  backfill: 32 techs pin_hash + skills confirmed
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

n8n flow:
  Gmail → Code: Skip Filter → IF: Skip?
  [false] → HTTP: POST Vercel Webhook (dispatch.aptmaintenanceinc.com/api/webhooks/n8n/gmail)
  [success] → IF: Comms Enabled? (dormant — INTAKE_COMMS_ENABLED=false)
  [error]   → Execute Workflow (NUH0krzQiSrBmyfv error handler)

route.ts (PR #14 — MERGED):
  detectLaphamForm() wired — Lapham emails skip Gemini
  computeAccessMerge() wired — new access codes update properties table
  pte column written (Lapham pteGranted + Gemini pteGranted)
  rmEmail captured from sender header when property not matched
  parsed metadata returned: { isLaphamForm, senderType, senderEmail }

n8n wif9XlVbK3M6a1C8 (PR #14 — MERGED, JSON in repo):
  9 orphaned nodes removed
  comms refs updated: Code: Merge Property Data => job.* / parsed.*
  !! PENDING: JSON not yet re-imported to Railway — live instance still has old code

INTAKE_COMMS_ENABLED:
  current:  false (safe)
  unblock:  re-import tools/n8n/workflows/phase-19-email-polling.json to Railway n8n
  then:     set INTAKE_COMMS_ENABLED=true in Vercel env
```

---

## PHASE SEQUENCE

```yaml
Phase 22: MERGED PR #12 — 5d0ae0d (LockSendButton, date nav, Kanban, modal fixes)
Phase 23: MERGED PR #11 — Lapham Form + Access Code Merge
Phase 24: MERGED PR #13 + DEPLOYED 2026-06-24
          /api/techs/import rewritten (POST, auth, pin_hash, 7 skills, staff-safe)
          32 techs backfilled in prod Neon — pin_hash + skills LIVE
          Tech PWA login: UNBLOCKED

PR #14:   MERGED 2026-06-24 — fix/intake-parse-and-comms
          4 intake parse bugs fixed
          n8n comms chain refs fixed (all job.*/parsed.* — was orphaned node refs)
          C4 mapper dedup: lib/job-mapper.ts deleted, 3 call sites => mapJob
          194/194 tests GREEN

Graphify:  DONE 2026-06-24 — 1941 nodes, 13931 edges, 125 communities

Phase B:  Schema migration (ADR-004 columns) — deferred
Phase C:  DB cleanup SQL — after 3+ confirmed real email parses
PR #15:   MERGED 2026-06-24 — fix/phase-25-grilling-cleanup
          lock-and-send/route.ts DELETED (130L, Snapshot-and-Send deprecated)
          dispatchSentAt removed from schema.ts
          migration 0008 — PENDING APPLY to prod Neon
          KanbanBoard priority sort LIVE

NEXT ACTIONS (priority order):
  1. Brandon: apply migration 0008 to prod Neon
             SQL: ALTER TABLE "jobs" DROP COLUMN "dispatch_sent_at";
  2. Brandon: import tools/n8n/workflows/phase-19-email-polling.json to Railway n8n
  3. Brandon: set INTAKE_COMMS_ENABLED=true in Vercel env
  4. Deploy: vercel deploy --prod from C:\PTOW\1_APT_Central_Command

Phase C1: Resolve dual-seam in job-update.ts (own branch, next sprint)
          — route all status changes through JobStateService, remove resolveJobStatus fork
Phase C2: Delete lib/job-transitions.ts — after C1
Phase 21: GAS Cutover — complex, later
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
            workaround: use Bash sed for string replacements then git add then git commit
            affected: tech-pwa/src/app/api/webhooks/n8n/gmail/route.ts confirmed

vercel-mcp: runtime logs -> always 403 Forbidden — surface errors in API response body
lsp:        TypeScript LSP broken on Windows (uv_spawn .cmd wrapper) — ignore
n8n-key:    N8N_API_KEY expires ~2026-07-10 — rotate before then
n8n-import: phase-19-email-polling.json has fixed comms refs but NOT yet imported to Railway
            INTAKE_COMMS_ENABLED must stay false until import done
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
dal-injection:   domain/ accepts DAL interface — unit-testable
result-type:     Result<T,E> — no throws in domain logic
branded-ids:     JobId, TechId, PropertyId
discriminated-u: JobState discriminated union
zod-boundaries:  all API route inputs validated with Zod schemas
tdd-standard:    every phase from 17 onward ships tests-first — non-negotiable
fsm:             JOB_STATE_MACHINE (8 arcs) + createJobStateService factory
event-bus:       EventBus.publish() => workflow_events outbox => n8n router
auth-tech:       badge + SHA-256 PIN => UUID session_token in Neon (tech routes)
auth-staff:      Google OAuth next-auth v5 (office routes)
eslint-boundary: no-restricted-imports in eslint.config.mjs (ADR-001)
                 blocks useSession/getSession outside /app/ (staff-only hooks)
mapper:          single source of truth => lib/dal/mappers.ts:mapJob (job-mapper.ts DELETED)
```

---

## KEY ARCHITECTURAL FACTS

```yaml
neon-prod:       ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream)
neon-dev-branch: br-muddy-flower-ak85a9jc | compute: ep-holy-waterfall-akwxx49b
gh-cli:          authenticated as linkstream-hub (member of org)
                 GITHUB_TOKEN cleared — always run unset GITHUB_TOKEN before gh commands
playwright:      globalSetup uses DATABASE_URL (not DATABASE_URL_TEST)
team:            Brandon (manager) => Claude Code (lead/gate) => AG (builder, Gemini) => Codex (frontend)
graphify:        graphify update . => pipx binary (0.8.38) => graphify-out/
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
phase-23:  MERGED PR #11 — Lapham Form + Access Code Merge
phase-24:  MERGED PR #13 — /api/techs/import rewrite + 178 tests + prod backfill (32 techs)
fix-pr8:   MERGED PR #8 — jobs/sync error surface + upsert fix
fix-pr10:  MERGED PR #10 — email intake 4 bugs + tests
fix-pr14:  MERGED PR #14 — intake parse quality + n8n comms refs + C4 mapper dedup (194 tests)
```
