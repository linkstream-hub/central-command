# AG Operational Playbook
# Last updated: 2026-06-26

---

## SESSION START

1. Read `SESSION_STATE.md` — phase, freeze status, open tasks.
2. Read `AGENTS.md` — team contract, Task Card format.
3. Load specific docs on demand, never by default.

---

## FEATURE FREEZE — ACTIVE

No new features, UI redesigns, new n8n workflows, schema changes, or speculative refactors. Recovery work only, inside approved Task Cards.

---

## CORE STACK

- **agentmemory:** durable preferences and decisions.
- **Karpathy:** think first, state assumptions, choose simple path, surgical edits, verify outcome.
- **Pocock:** RED test before GREEN implementation. Vertical slices only.
- **Graphify:** `graphify update .` at meaningful milestones.
- **Codegraph:** navigate code by AST before editing.
- **Caveman:** terse technical communication.

---

## WORKFLOW

1. Read `SESSION_STATE.md` — confirm freeze status
2. Receive approved Task Card from Claude Code
3. Read only files listed in "Files allowed to change."
4. Write failing test (RED) first — post evidence to Claude Code
5. Implement minimal GREEN code
6. Run `rtk vitest run` + `rtk tsc` — both must pass
7. Post diff + test output + evidence to Claude Code
8. Wait for "Clear to merge" — never self-merge

---

## BOUNDARIES

```yaml
owns:
  - /api/**
  - /domain/**
  - /lib/dal/**
  - /lib/schema/**
  - /db/migrations/**
  - n8n workflows
  - tech-pwa/src/lib/** (non-auth)

forbidden:
  - /app/** (design, layout, pages) — Codex only
  - design system (.impeccable/)
  - merging without "Clear to merge" from Claude Code
  - implementing outside approved Task Card scope
```

---

## TASK CARD RULES (NEVER LIST)

- Never implement without Task Card
- Never modify files outside allowed list
- Never skip RED test
- Never touch `/app/**`, design system, CSS
- Never merge without "Clear to merge"

## MANDATES

- **Evidence Package:** Every PR requires an evidence package per AGENT_PLAYBOOK.md (CI link, query results, video, etc.).
- **ag-plan-reviewer:** Integrated via Claude Code before implementation begins for auth, schema, outbox changes.

---

## ENVIRONMENT & SECURITY RULES

```yaml
secrets:
  - Never use NEXT_PUBLIC_ prefix for server-only values
  - Never log API keys
  - Never hardcode URLs, keys, or endpoints
  - Read all values from process.env

gas:
  - No new GAS code. No new GAS features.
  - GAS exit governed by Phase 4 plan.

sessions:
  - No localStorage for auth tokens
  - HttpOnly Secure SameSite cookies only (after Phase 1)

migrations:
  - Production: prod DB only
  - Preview/staging: isolated branch or skip
  - Failed migration MUST block deploy
```

---

## SHIFT-LEFT INTEGRATIONS (Phase 0 — AG implements)

```yaml
auth: Clerk or Lucia SDK — rip out localStorage tech session, GAS staff auth
file_uploads: UploadThing SDK — replace broken S3 wrappers + camera upload route
email_intake: Postmark Inbound Parse webhook — replace GAS email polling
timekeeping: Deputy/Gusto/QuickBooks API — clock events only; vendor owns compliance
```

AG implements these. CC reviews. Timekeeping vendor = Brandon's business decision first (record in SYSTEM_OF_RECORD.md before any code).

---

## FORBIDDEN BY DEFAULT

- GSD commands and workflows
- SuperClaude/SuperGravity suite activation
- Multi-agent orchestration unless requested
- Broad doc loading before narrow context established
- Feedback loops after task completion
- Any work outside approved Task Card
