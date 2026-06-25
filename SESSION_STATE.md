# SESSION STATE
# Overwrite completely at session close. Never append. This is the handoff.

---

## SESSION: S168 (2026-06-25)

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
branch:  main
head:    bad848e3

open-prs: none

production:
  deployed: bad848e3 — PRs #17+#18+#19 LIVE
  status:   CURRENT — no pending deploy
```

---

## INFRA STATE

```yaml
neon-prod:  ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream account)
migration:  0008 APPLIED — dispatch_sent_at dropped
n8n:        wif9XlVbK3M6a1C8 — 16 nodes, live
n8n-key:    rotated 2026-06-25 (new expiry unknown — check n8n dashboard)
vercel-mcp: linkstream-hub ✓ (re-authed 2026-06-25)
INTAKE_COMMS_ENABLED: false — dormant until CC actively used by dispatch
```

---

## PRIORITY ORDER (next session)

```yaml
1. INTAKE_COMMS_ENABLED flip — DEFERRED
   → No action until dispatch team actively uses CC
   → When ready: reimport phase-19-email-polling.json to Railway
   → Then: vercel env add INTAKE_COMMS_ENABLED true production + deploy

2. Impeccable design sprint (optional)
   → Branch: feat/phase-28-sentinel-diet (UNMERGED, orphaned)
   → Verify state, cherry-pick if usable
   → /impeccable harden jobs
```

---

## KNOWN ISSUES / DO NOT TOUCH

```yaml
hook-bug:      continuous-learning-v2 PostToolUse hook reverts Edit changes — use Bash sed instead
vercel-deploy: AUTO-DEPLOY FIXED (PR #21). Merge to main → READY in ~90s. CLI only needed for forced deploys.
vercel-env:    ALWAYS answer NO to env pull — wipes .env.local
github-token:  unset GITHUB_TOKEN before any gh command
vpn:           VPN OFF before any CLI session
tsc:           Always run from C:\PTOW\1_APT_Central_Command (repo root)
no-ai-attr:    No Co-Authored-By, no PR footer, no AI attribution anywhere
```

---

## N8N WORKFLOW REGISTRY

```yaml
active:
  wif9XlVbK3M6a1C8: Phase 19 — Email Polling & WO Intake
  fpwZXWR9u7nOmiDa: CC Event Bus Router
  NUH0krzQiSrBmyfv: PTOW Error Handler
  0V9YLwpiTBJ84InU: FLAG Gate Notification
  Wiuvox8VOZNtVoDN: CA Break Compliance Monitor
  dshTB3lODDYy0FTP: CC Event Bus Outbox Poller
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
eslint-ignore:   argsIgnorePattern/varsIgnorePattern/destructuredArrayIgnorePattern: ^_ (added PR #19)
mapper:          single source of truth => lib/dal/mappers.ts:mapJob
job-update:      all status changes via JobStateService.transition (SCHEDULE) or direct write
                 resolveJobStatus DELETED (C1 PR #17)
                 job-transitions.ts DELETED (C2 PR #18)
```

---

## KEY ARCHITECTURAL FACTS

```yaml
neon-prod:       ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream)
neon-dev-branch: br-muddy-flower-ak85a9jc | compute: ep-holy-waterfall-akwxx49b
gh-cli:          authenticated as linkstream-hub — unset GITHUB_TOKEN before gh commands
playwright:      globalSetup uses DATABASE_URL (not DATABASE_URL_TEST)
team:            Brandon (manager) => Claude Code (lead/gate) => AG (builder) => Codex (frontend)
vercel-logs:     MCP returns 403 Forbidden — surface errors in API response body
webhook-auth:    DASHBOARD_API_KEY header OR Authorization: Bearer <key>
```

---

## MERGED PHASES (complete)

```yaml
phase-17:  MERGED PR #2
phase-18:  MERGED PR #6 — EventBus outbox
phase-19:  MERGED PR #7 — Observability + CI fix
phase-20:  MERGED PR #9 — ESLint auth boundary rule
phase-23:  MERGED PR #11 — Lapham Form + Access Code Merge
phase-24:  MERGED PR #13 — /api/techs/import rewrite + prod backfill (32 techs)
fix-pr8:   MERGED PR #8 — jobs/sync error surface + upsert fix
fix-pr10:  MERGED PR #10 — email intake 4 bugs + tests
fix-pr14:  MERGED PR #14 — intake parse quality + n8n comms refs + C4 mapper dedup (194 tests)
fix-pr15:  MERGED PR #15 — lock-and-send deleted + migration 0008 + Kanban sort
fix-pr16:  MERGED PR #16 — normalizeLegacyStatus in GET /api/jobs (199 tests)
fix-pr17:  MERGED PR #17 — C1 dual-seam eliminated, resolveJobStatus deleted (202 tests)
fix-pr18:  MERGED PR #18 — C2 job-transitions.ts deleted (188 tests)
fix-pr19:  MERGED PR #19 — lint sprint, 0 warnings (202 tests)
phase-22:  MERGED PR #12 — UI fixes: dead artifacts deleted, triage default, date nav, kanban scope, modal fixes (10 tests)
```
