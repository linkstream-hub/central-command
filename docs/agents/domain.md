# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root
- **`docs/adr/`** — read ADRs that touch the area you're about to work in

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront.

## File structure

Single-context repo:

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── ADR-001-dual-auth-architecture.md
│   ├── ADR-002-neon-postgres-as-primary-database.md
│   ├── ADR-003-gas-as-google-workspace-bridge.md
│   ├── ADR-004-work-order-status-lifecycle.md
│   ├── ADR-005-org-id-multi-tenancy.md
│   ├── ADR-006-dal-pattern-neon-first.md
│   ├── ADR-007-n8n-as-event-bus.md
│   ├── ADR-008-modular-monolith-architecture.md
│   ├── ADR-009-wc-code-fix-at-source-not-sentinel.md
│   ├── ADR-010-job-state-machine-seam.md
│   ├── ADR-011-event-publishing-seam.md
│   ├── ADR-012-dal-cleanup-dead-code.md
│   ├── ADR-013-dashboard-stats-canonical-computation.md
│   └── ADR-014-domain-layer-boundary.md
└── src/
```

Note: `.planning/phases/21-neon-migration/CONTEXT.md` is phase-specific, not a second domain context.

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/grill-with-docs`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-XXX — but worth reopening because…_
