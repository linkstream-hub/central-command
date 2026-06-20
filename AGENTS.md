# AGENTS.md — Core Stack for All Agents
# APT Central Command | linkstream-hub/central-command

## MANDATORY — READ BEFORE ANY WORK

All agents (Claude Code, AG, omp, Codex) operate under the same standard. No exceptions.

---

## 1. SESSION START PROTOCOL

Every session, in order:
1. Read `SESSION_STATE.md` — current branch, phase status, open tasks
2. Query agentmemory for relevant project context
3. Apply Karpathy + Pocock rules (below) to ALL work

---

## 2. KARPATHY GUIDELINES — ALWAYS ACTIVE

### Think Before Coding
- State assumptions explicitly before implementing
- If multiple interpretations exist, surface them — do not pick silently
- If simpler approach exists, say so
- If unclear, stop and name what's confusing

### Simplicity First
- Minimum code that solves the problem — nothing speculative
- No features beyond what was asked
- No abstractions for single-use code
- No error handling for impossible scenarios
- No "flexibility" or "configurability" not requested

### Surgical Changes
- Touch only files the task requires
- Do not "improve" adjacent code, comments, or formatting
- Match existing style
- Every changed line traces directly to the request

### Goal-Driven Execution
- Define verifiable success criteria before starting
- State a brief plan for multi-step tasks with verify checks
- Loop until criteria are met

---

## 3. POCOCK TDD — MANDATORY FOR ALL CODE CHANGES

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

**The cycle:**
1. **RED** — Write one failing test. Watch it fail. Confirm it fails for the right reason.
2. **GREEN** — Write minimum code to pass. Nothing extra.
3. **REFACTOR** — Clean up only after green.

**Non-negotiable:**
- Test must FAIL before you write implementation
- If test passes immediately — you're testing existing behavior, not new behavior
- Mocks only when unavoidable — test real behavior, not mock behavior
- Bug fix = write failing test reproducing the bug first

---

## 4. CODEGRAPH BEFORE FILE READS

Before editing any file:
- Query codegraph for AST dependencies: what calls this, what does this call
- Never read entire files blindly when codegraph can give you the relevant nodes

---

## 5. MEMORY PROTOCOL

- agentmemory MCP available — query before starting any feature work
- SESSION_STATE.md = source of truth for current state
- At milestone end: run `graphify update .`

---

## 6. SCOPE DISCIPLINE

- Each phase spec has a scope constraint section — read it, honor it
- Do not touch files not listed in the task
- Do not refactor adjacent code
- Do not add features not in the spec

---

## 7. STOPS AND GATES

Hard stops are non-negotiable:
- **Diff STOP** — post diff, wait for Claude Code review before continuing
- **Test STOP** — post test results, wait for Claude Code review before merge
- **"Clear to merge"** — only Claude Code issues this, no one else

---

## 8. NOTIFICATION CHANNELS

- n8n workflow events → `DISCORD_N8N_WEBHOOK` env var
- Ops alerts / agent errors → `DISCORD_OPS_WEBHOOK` env var
- Production incidents requiring action → Resend email to brandon@aptmaintenanceinc.com
- Never hardcode webhook URLs — always read from env

---

## 9. TEAM STRUCTURE

```
Claude Code (lead / gate / reviewer)
  └── AG    (co-lead builder — backend, domain, API routes, DB, n8n)
  └── Codex (frontend stream — pages, components, design system, CSS only)
  └── omp   (junior dev — bounded tasks only, never cross-domain)
```

**Boundaries (hard):**
- Codex: owns `/app/**` pages/components/CSS. Never touches `/api/**`, `/domain/**`, `/lib/dal/**`, schema.
- AG: owns `/api/**`, `/domain/**`, `/lib/**`, `/lib/dal/**`, n8n. Never touches design system or page layout.
- omp: assigned specific files per task. No cross-domain, no self-directed scope expansion.

Claude Code is the merge gate. No agent merges without explicit "Clear to merge."

---

## 10. CODEX DESIGN BRIEF

Codex owns all frontend. Before any UI work, read these in order:

```
1. .impeccable/design.json   — design system: navy palette, amber accent, 9 component specs, 4 rules
2. PRODUCT.md                — product north star ("The Dispatch Room"), voice, users
3. DESIGN.md                 — visual direction, layout principles
```

**Active rules from design.json (enforce these, no exceptions):**
- Alert Signal Rule: amber `#f5b900` only for actionable alerts (never decorative)
- Semantic Six Rule: 6 status colors map to WO states — no arbitrary color additions
- Mono-for-Data Rule: Geist Mono for job IDs, timestamps, badge numbers
- Flat-By-Default Rule: no box shadows on cards (navy overlapping planes create depth)

**Skills available (installed in .codex/skills/):**
- `taste-skill` — anti-slop frontend; read before any new component work
- `extract-design` — extract design language from reference sites when needed

**Anti-slop checklist (mandatory before any UI commit):**
- [ ] No default Tailwind card grids with uniform spacing
- [ ] No generic hero with centered headline + gradient blob
- [ ] No Inter + slate-900 default stack (use Geist Sans/Mono from design.json)
- [ ] Hover/focus/active states feel designed, not browser-default

---

## 11. NEVER

- No new GAS code — all new functionality goes to Next.js or n8n
- No Discord URLs hardcoded anywhere
- No API keys or secrets in chat, commits, or code
- No workarounds — correct fix only, always
- No shortcuts — one standard: professional grade
