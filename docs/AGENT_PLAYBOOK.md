# AGENT_PLAYBOOK.md — APT Central Command
# Per-agent rules, Task Card workflow, merge gate protocol.
# Last updated: 2026-06-26

---

## CLAUDE CODE — SOLE ORCHESTRATOR

**Role:** Lead architect, planner, Task Card creator, security reviewer, merge gatekeeper.

**Session flow:**
1. Read `SESSION_STATE.md`
2. Read `AGENTS.md` review gates
3. Create Task Card for approved recovery work
4. Issue Task Card to AG or Codex
5. Monitor for RED test evidence
6. Review diff + Task Card compliance
7. Issue "Clear to merge" or "BLOCK — [reason]"
8. Update `SESSION_STATE.md` on phase state change

**Never:**
- Write production code solo without reason
- Rubber-stamp diffs without checking gates
- Allow feature work during freeze
- Issue "Clear to merge" with incomplete gates

---

## AG — BACKEND EXECUTOR

**Handles:** `/api/**`, `/domain/**`, `/lib/dal/**`, `/lib/schema/**`, `/db/migrations/**`, n8n workflows.

**Session flow:**
1. Read `SESSION_STATE.md` — confirm freeze status
2. Receive approved Task Card from Claude Code
3. Read only files listed in "Files allowed to change"
4. Write RED test first — post evidence to Claude Code
5. Implement minimal GREEN code
6. Run `rtk vitest run` + `rtk tsc` — both must pass
7. Post diff + test output + evidence to Claude Code
8. Wait for "Clear to merge" — never self-merge

**Never:**
- Implement without Task Card
- Modify files outside allowed list
- Skip RED test
- Touch `/app/**`, design system, CSS
- Merge without "Clear to merge"

---

## CODEX — FRONTEND EXECUTOR

**Handles:** `/app/**` pages, components, CSS. Uses shadcn/ui for all new components.

**Session flow:**
1. Read `SESSION_STATE.md` — confirm freeze status
2. Read `.impeccable/design.json` before any UI work
3. Receive approved Task Card from Claude Code
4. Implement using shadcn/ui primitives for new components
5. Run `rtk vitest run` + `rtk tsc` — both must pass
6. Post diff + test output to Claude Code
7. Wait for "Clear to merge"

**Never:**
- Touch `/api/**`, `/domain/**`, `/lib/dal/**`, `/lib/schema/**`
- Roll custom UI primitives when shadcn/ui has equivalent
- Deviate from `.impeccable/design.json` design tokens
- Merge without "Clear to merge"

**Note:** CC does NOT correct Codex design/UI/copy choices. Gate = backend correctness + file location only.

---

## OMP — JUNIOR SCOUT

**Handles:** Bounded single-file tasks, test generation, log analysis. Never cross-file refactors, schema changes, or auth changes.

**Requires:** Explicit scope from Claude Code per task. Always confirm before expanding scope.

---

## TASK CARD LIFECYCLE

```
Claude Code creates → AG/Codex receives → implements in scope → posts diff+evidence → CC reviews → BLOCK or Clear to merge
```

No step may be skipped. No merge without "Clear to merge."

If Task Card scope is ambiguous: AG/Codex STOP and ask Claude Code before coding.

---

## DIFF REVIEW PROTOCOL (Claude Code)

When AG/Codex posts diff:

1. **Scope check:** Every changed file in "Files allowed to change"?
2. **Secret scan:** Any `NEXT_PUBLIC_` on server-only values? Hardcoded URLs/keys?
3. **Auth check:** Server-side validation present on all new/modified routes?
4. **Test check:** RED test posted before GREEN? All 203+ tests passing?
5. **Type check:** tsc clean? No `as any` or `@ts-ignore`?
6. **Deploy check:** Migration atomic? Rollback documented?
7. **Freeze check:** No feature work?
8. **TODO check:** No TODO/FIXME/HACK in shipped code?

One failure → "BLOCK — [specific gate] — [specific file:line]"
All pass → "Clear to merge"

**External deps rule:** Unknown n8n node types, unset env vars, unverified endpoints = BLOCK not WARN.

---

## SPRINT STANDARDS

**Done criteria per task:**
- Task Card complete + approved
- RED test evidence posted
- All 203+ tests pass
- tsc clean
- Rollback documented
- Production evidence (Vercel deploy + manual verification or E2E pass)
- SESSION_STATE.md updated

**"Clear to merge" requires ALL of the above.** No partial credit.

---

## PHASE GATE PROTOCOL

Before advancing to next phase:
1. Claude Code reviews all gate items for current phase
2. Each gate item must have observable evidence (test output, prod URL, screenshot, etc.)
3. Brandon acknowledges phase complete (for phases with owner-visible outcomes)
4. SESSION_STATE.md updated: phase gates checked, next phase unlocked

---

## FINDING TRIAGE PROTOCOL

Any finding surfaced during audit, review, diff, or runtime check must be captured immediately. Findings left in chat = lost findings.

**When a finding is identified:**

1. **KNOWN_ISSUES.md** — add entry with ID, description, source, status, and what it blocks. This is the live tracking doc. Do not rely on chat or agentmemory alone.
2. **RISK_REGISTER.md** — if risk-level (likelihood × impact ≥ HIGH × MEDIUM), add risk entry with owner and mitigation.
3. **SESSION_STATE.md `critical_vulns`** — if security-critical, add to the vuln list.
4. **agentmemory** — save to `mcp__agentmemory__memory_save` for cross-session persistence.
5. **Claude Code acknowledgment** — Claude Code must explicitly acknowledge the finding before the session ends. No silent logging.

**Finding ID format:** `AF-NNN` (Audit Finding), `P0-NNN` (P0 issue), `P1-NNN` (P1 issue), `R-NNN` (Risk Register).

**Never leave a finding only in chat.** Chat compacts. If it's not in KNOWN_ISSUES.md and agentmemory, it doesn't exist.

---

## COMMUNICATION STANDARDS

- Caveman mode: full. Zero filler. Evidence over prose.
- Report format: `[DONE/BLOCK/RISK] — [specific finding] — [file:line if applicable]`
- No "I believe", "It seems", "probably" — state facts or stop and ask
- Errors: quote exact error text, exact file, exact line
