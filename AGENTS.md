# AGENTS.md — APT Central Command
# Team operating contract. All agents follow this. No exceptions.
# Last updated: 2026-06-26

---

## SESSION START PROTOCOL

Every session, every agent, in order:
1. Read `SESSION_STATE.md` — phase, freeze status, baselines, open tasks.
2. Apply Karpathy + Pocock to all work.
3. Load `docs/AGENT_PLAYBOOK.md` for task-specific rules.

---

## FEATURE FREEZE — ACTIVE

No new features, UI redesigns, new n8n workflows, schema changes, or speculative refactors.
Recovery work only, inside approved Task Cards.

---

## TEAM STRUCTURE

```
Claude Code (lead / reviewer / sole Task Card creator / sole merge authority)
  └── AG (backend executor — API, domain, DB, n8n)
  └── Codex (frontend expert — /app/** only; shadcn/ui for all new components)
  └── omp (junior — bounded single-file scout tasks only)
```

**No agent approves own work.**
**No merge without explicit "Clear to merge" from Claude Code.**
**No implementation begins without an approved Task Card.**

---

## DOMAIN BOUNDARIES

```yaml
Claude Code:
  owns: planning, architecture decisions, merge gate, Task Card creation, security review
  forbidden: implementing tasks solo without reason; merging own code

AG:
  owns: /api/**, /domain/**, /lib/dal/**, /lib/schema/**, /db/migrations/**, n8n workflows
  forbidden: /app/** design/layout, design system changes, merging without CC approval

Codex:
  owns: /app/** pages, components, CSS; uses shadcn/ui for all new components
  forbidden: /api/**, /domain/**, /lib/dal/**, /lib/schema/**, n8n; never merge without CC approval

omp:
  owns: bounded single-file tasks, test generation, log analysis
  forbidden: cross-file refactors, schema changes, auth changes, anything requiring Task Card
```

---

## TASK CARD FORMAT (Required for every AG/Codex task)

Claude Code creates. AG/Codex executes only inside approved scope.

```markdown
## Task Card

**Task:** [one sentence]
**Business reason:** [why this matters operationally]
**User-visible outcome:** [what Brandon/dispatcher/tech sees change]
**Phase:** [Phase 0 / 1 / 2 / 3 / 4 / 5]

**Files allowed to change:**
- [explicit list]

**Files forbidden to change:**
- [explicit list]

**Database changes:** [none | migration file name + schema delta]
**API changes:** [none | endpoint + request/response delta]
**Auth changes:** [none | what changes in auth flow]
**n8n/GAS changes:** [none | what workflow affected]
**New dependency:** [none | package name + version + reason]

**RED test criteria:**
- [ ] [failing test description]

**GREEN verification:**
- [ ] [passing test description]
- [ ] tsc clean
- [ ] All 203+ tests pass

**Rollback plan:** [exact steps to revert if production breaks]
**Definition of done:** [observable production evidence]
**Assumptions:** [explicit list]
**Evidence required:** [what CC needs to see to approve merge]
```

Incomplete Task Card = BLOCKED. Claude Code does not review incomplete cards.

---

## REVIEW GATES (before "Clear to merge")

One failure = Reject PR.

| Gate | Check |
|---|---|
| Scope | Only explicitly allowed files changed |
| Secrets | Zero hardcoded secrets, API keys, webhooks |
| Auth | Server-side validation present; no GAS in permission path |
| Tests | RED test observed first; full suite GREEN |
| Types | Build clean; no unjustified `as any` or `@ts-ignore` |
| Deploy | Migrations atomic; rollback documented |
| Freeze | No feature work during active freeze |
| Task Card | Complete Task Card present; no fields incomplete |
| TODO | No TODO/FIXME/HACK comments in shipped code |

---

## KARPATHY + POCOCK (Always Active)

**Karpathy:**
- State root cause before any fix. Cannot state root cause = stop, investigate.
- State exact files containing the fix. No file = not a fix.
- Make one minimal correct change. No future-proofing.
- Run once. Wait for result. No retry with operational adjustments.

**Pocock TDD:**
- RED → GREEN → REFACTOR. No production code without failing test first.
- Bug fix = write failing test reproducing bug first.
- Vertical slices: one test → one impl → repeat.

---

## PERMANENT CONSTRAINTS

```yaml
forbidden_always:
  - New GAS code or features (GAS exit in progress)
  - Client-side secrets or NEXT_PUBLIC_ for server-only values
  - JavaScript-readable session tokens (localStorage auth)
  - Schema changes without migration
  - Merging without CC "Clear to merge"
  - AI attribution in commits/PRs
  - Operational shortcuts (restarting servers, clearing caches to work around config)
  - Feature work during active freeze
  - TODO/FIXME/HACK in shipped code

required_always:
  - Task Card for all AG/Codex implementation
  - Failing test before implementation (RED first)
  - tsc clean before PR
  - SESSION_STATE.md updated on phase state change
  - RTK prefix for all shell commands
  - DOC ROT COMPLIANCE: If code changes system reality (schema, env, webhooks, ops, deploy), update the mapped doc in the same PR to accurately reflect new state. Include Task ID or Branch Name in added lines so CI can verify. Inaccurate formatting fails CI content checks. No Task ID = No Merge.
```

---

## SHIFT-LEFT INTEGRATIONS (Phase 0 mandate)

These replace broken custom code. Do NOT fix custom versions:

```yaml
auth: Clerk or Lucia (replaces localStorage tech session + GAS staff auth)
timekeeping: Deputy, Gusto, or QuickBooks (Brandon decides — record in SYSTEM_OF_RECORD.md first)
file_uploads: UploadThing (replaces broken S3 wrappers + camera upload route)
email_intake: Postmark Inbound Parse (replaces GAS email polling)
frontend_components: shadcn/ui for all NEW Codex components
```

---

## MANDATORY REFERENCE TRIGGERS

| Condition | Read |
|---|---|
| Every session start | `SESSION_STATE.md` |
| Reviewing PR / merging | Review Gates above |
| Auth, sessions, roles | `docs/AUTH_MODEL.md` |
| DB schema, Neon, data models | `docs/SYSTEM_OF_RECORD.md` |
| Cross-domain / infra | `docs/ARCHITECTURE.md` |
| UI, components, CSS | `.impeccable/design.json` |
| New feature proposed | `PRODUCT.md` |
| Deploy, migration, rollback | `docs/DEPLOYMENT.md` |
| Bug investigation | `docs/KNOWN_ISSUES.md` |
| System broken / down | `docs/RUNBOOK.md` |
| Owner tasks | `docs/OWNER_MANUAL.md` |
| Any implementation task | `RULES.md` |

---

## TOOL DISCIPLINE

- **Codegraph:** AST dependencies before reading full files.
- **agentmemory:** durable decisions, learned patterns.
- **Graphify:** `graphify update .` at every major milestone.
- **RTK prefix:** all shell commands.
- **Caveman mode:** terse communication, full technical substance.
