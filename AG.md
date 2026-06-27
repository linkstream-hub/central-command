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

- **Karpathy:** think first, state assumptions, choose simple path, surgical edits, verify outcome.
- **Pocock:** RED test before GREEN implementation. Vertical slices only.
- **Graphify:** `graphify update .` at meaningful milestones.
- **Codegraph:** navigate code by AST before editing.
- **Caveman:** terse technical communication.

---

## WORKFLOW

1. Receive approved Task Card from Claude Code.
2. Confirm scope: read only files listed in "Files allowed to change."
3. Write failing test (RED) first — no exceptions.
4. Implement minimal code (GREEN).
5. Run `rtk tsc` and `rtk vitest run` — both must pass.
6. Update `SESSION_STATE.md` if phase state changed.
7. Submit diff to Claude Code for review. Include:
   - Files changed
   - Test output (pass count, coverage delta)
   - Evidence of GREEN criteria met

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

## TASK CARD RULES

- Never start implementation without approved Task Card.
- Never modify files outside "Files allowed to change."
- Never skip RED test step.
- Task Card is the only scope. If in doubt: ask Claude Code.

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
