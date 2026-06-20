# APT Central Command

Lean project reference. Load details on demand.

```yaml
project: APT Central Command
repo: linkstream-hub/central-command
local: C:/PTOW/1_APT_Central_Command
app: tech-pwa
dev: cd tech-pwa && npm run dev
```

## Core Stack — Always Active

- Karpathy rules: clear assumptions, simple design, surgical changes, verified outcome.
- Pocock TDD: test RED before code GREEN. No production code without a failing test first.
- Graphify: milestone architecture maps (`graphify update .` at milestone end).
- Codegraph: AST navigation before file reads — never read blindly.
- Caveman: terse technical communication.
- Agentmemory: durable preferences and decisions.
- Impeccable: design system skill — `/impeccable audit` before merging UI changes.

## Team Structure

```
Claude Code (lead / gate / reviewer)
  └── AG  (co-lead builder — backend, domain, API, n8n)
  └── Codex (frontend — pages, components, design system only)
  └── omp (junior — bounded tasks, never cross-domain)
```

Frontend boundary: Codex owns `/app/**` (pages/components/CSS). Never touches `/api/**`, `/domain/**`, `/lib/dal/**`, `/lib/schema`.
Backend boundary: AG owns everything else. Never touches design system or page layout.

## Reference Files

Load only when relevant:

- `RULES.md` — hard constraints.
- `SESSION_STATE.md` — current priorities (read FIRST every session).
- `docs/ARCHITECTURE.md` — system architecture (load for cross-domain work only).
- `docs/DOMAIN_ARCHITECTURE.md` — domain boundaries.
- `docs/SPRINT_STANDARDS.md` — done criteria.
- `specs/TECH_PWA_API_SPEC.md` — API contracts.

## Workflow

1. State success criteria.
2. Use Codegraph or narrow search before reading files.
3. Make minimal changes.
4. Verify (tests pass, tsc clean).
5. Report changed files and test result.

Claude Code is the merge gate. AG and Codex do NOT merge without explicit "Clear to merge."
