# APT CENTRAL COMMAND — CLAUDE.md
# Ops reference. Non-narrative. Load refs on demand. History in git log.

---

## SYSTEM

```yaml
project:    APT Central Command (CC2.0 → CC3.0)
live:       https://dispatch.aptmaintenanceinc.com
repo:       BGB-CRB-Holdings/central-command
local:      C:/PTOW/1_APT_Central_Command
test:       badge=1 PIN=1234
dev:        cd tech-pwa && npm run dev → localhost:3000
next-cache: C:/tmp/apt-cc-next
```

---

## STACK

```yaml
frontend:  Next.js 16 + TypeScript + Tailwind + Framer Motion
backend:   Google Apps Script V8 (migrating out — see GAS Migration Status)
database:  Neon Postgres + Drizzle ORM
infra:     Vercel (PWA) | n8n on Railway | Upstash Redis
auth:
  staff:   Google OAuth via next-auth v5 (@aptmaintenanceinc.com only)
  techs:   badge + SHA-256 PIN → UUID session token
```

---

## REFS (load on demand — do not pre-load)

| Need | File |
|------|------|
| Rules + gates (load first) | `RULES.md` |
| Session state + priorities | `SESSION_STATE.md` |
| System architecture | `docs/ARCHITECTURE.md` |
| Domain + bounded contexts | `docs/DOMAIN_ARCHITECTURE.md` |
| Sheets column maps | `docs/SHEETS_SCHEMA.md` |
| Sprint standards + DoD | `docs/SPRINT_STANDARDS.md` |
| Org + module assignments | `docs/ORG.md` |
| Ecosystem roadmap | `docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md` |
| Full API spec | `specs/TECH_PWA_API_SPEC.md` |
| Sprint gates + checklists | `GATES.md` |
| GAS migration catalog | `docs/GAS_MIGRATION_SCOPE.md` |
| AG execution playbook | `AG.md` (load for UI or shell work) |
| Workflow protocol | `WORKFLOW.md` |

---

## ROLES

```yaml
claude-code:
  status:    lead dev
  authority: auth | schema | column-indexes | cross-system writes | merge gate
  focus:     architecture · specs · plan gate · diff gate · test gate · never writes implementation

ag:
  status:    co-lead builder
  authority: plan + build + test + self-audit within sprint scope | delegates bounded tasks to omp
  gate:      post diff + test results → wait for claude-code clear before merge

omp:
  status:    jr dev (under ag)
  authority: bounded task execution only — scoped subtasks delegated by ag
  constraint: no auth/schema/cross-system writes without ag gate → claude-code gate
  invocation: omp --model anthropic/claude-sonnet-4-5
```

---

## SPRINT PROTOCOL (every sprint)

```
AG:           /gsd-discuss-phase → /gsd-plan-phase
AG:           post plan summary — flag auth/schema/columns/cross-system items
Claude Code:  PASS or BLOCK (ag-plan-reviewer gate)
AG:           implement (delegate bounded subtasks to omp; ag reviews omp output before passing up)
AG:           npx tsc --noEmit → git diff main...HEAD > artifacts/ag_diff.txt → push → STOP
Claude Code:  diff review → PASS or BLOCK
AG:           test sprint → artifacts/ag_test_results.txt → STOP
Claude Code:  test review → clear-to-merge XOR block
AG:           merge PR (never without explicit clear)
```

**PTOW flag categories — post to Claude Code before implementing:**
- Auth token patterns or session storage keys
- Neon schema changes
- Google Sheets column indexes
- Cross-system writes (Next.js + GAS + Neon in same action)
- New `/api/` routes replacing existing GAS action strings

---

## AG SPEC REQUIREMENTS

Every spec MUST include a numbered task list with fill-in-the-blank evidence (not activity descriptions).

**Terminal 3 tasks — always:**
- **Task N-2:** `npx tsc --noEmit` → zero errors → `git push` → `git diff main...HEAD > artifacts/ag_diff.txt` → commit diff → post to Claude Code → STOP
- **Task N-1:** Test sprint → `artifacts/ag_test_results.txt` with specific observed evidence per item → kill dev server → post to Claude Code → STOP
- **Task N:** Merge only after Claude Code "Clear to merge"

**Task 1 — branch gate (every spec):**
```
git branch --show-current                      # must match feat/[name-in-spec]
git ls-remote --heads origin feat/[name]       # must be non-empty
git log main..HEAD --oneline                   # if empty on pre-existing branch → rebase first
```

---

## DEPLOY

```yaml
gas-root:
  push:    clasp push --force
  deploy:  clasp deploy --deploymentId AKfycbyFgHHDrZm1NZBG2iQ3czdeRxSGuvjkqyLkx7OCjdkA5vRBCm3IQ1RAEyrbgVp-Y4xs1g --description "v##"
  rule:    MANUAL ONLY — never automate

gas-dashboard:
  dir:     dashboard-api/
  push:    cd dashboard-api && clasp push --force
  deploy:  clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v##"

tech-pwa:
  deploy:  git push → Vercel auto-deploys (PR #64 removed deploy-vercel.yml)
  npmrc:   legacy-peer-deps=true
```

---

## AUTH CONTEXT (never mix — wrong hook = redirect loop)

```yaml
staff pages (/live /schedule /jobs-admin):  useSession() from next-auth/react
tech pages  (/jobs /job/[jobId] /clock):    getSession() from @/lib/auth
```

---

## INVARIANTS

```yaml
neon-write-path:   WRITE_PATH_NEON_ONLY=true | Sheets dispatch queue = read-only archive
branch-rule:       feat/[name] only → never commit to main
dispatch-columns:  30-col map frozen — never reorder or insert
brandon-rule:      dashboard + web dashboards only | no terminal | no git | no merges
next-version:      Next.js 16 — read node_modules/next/dist/docs/ before writing routes
no-new-gas-code:   never add features to GAS — implement in Next.js or n8n
```

---

## NEVER RUN

```
catchUpMissedEmails()  resetBackfill()  setupBackfillTrigger()
archiveOldJobsConfirmed()  mineScheduleSheet()
```

---

## AG RESET (30 seconds)

```powershell
# 1. Close AG window (Task Manager — one process at a time, not by name)
git -C "C:/PTOW/1_APT_Central_Command" config --unset extensions.worktreeConfig
git -C "C:/PTOW/1_APT_Central_Command" worktree prune
# 3. Reopen AG
```

---

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`BGB-CRB-Holdings/central-command`), managed via `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo: `CONTEXT.md` at root + `docs/adr/` (14 ADRs). See `docs/agents/domain.md`.

---

## GAS MIGRATION STATUS

```yaml
goal:        full GAS exit
catalog:     docs/GAS_MIGRATION_SCOPE.md (accepted 2026-06-07)
next-phases:
  15: Phase A — dead code cleanup (zero risk, start here)
  16: Shadow-Writes Inventory (Phase 11 — never executed, blocks TechPWA cutover)
  17: Phase B — pure JS utility migration to Next.js
  18: Phase C — Neon-only write path cleanup
hard-blockers:
  - Gmail OAuth for workorder@ in Node context (Brandon GCP action — gates email polling migration)
  - Phase 16 must complete before TechPWA.gs auth cutover
tenant-contact: deferred — implement in n8n post Phase 18, not in GAS
```

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
