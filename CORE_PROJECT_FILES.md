# CORE_PROJECT_FILES.md — APT Central Command
# Master document index. All agents reference this.
# Last updated: 2026-06-26

---

## Governance (Root — always available)

| File | Purpose | Read When |
|---|---|---|
| `SESSION_STATE.md` | Phase, baselines, freeze status, open tasks, agent boundaries | EVERY SESSION — first |
| `CLAUDE.md` | Claude Code operating instructions + reference triggers | Every session |
| `AGENTS.md` | Team contract, Task Card format, boundaries | All agents at session start |
| `AG.md` | AG-specific playbook | AG at session start |
| `CODEX_FRONTEND_BRIEF.md` | Codex frontend implementation playbook | Codex at session start |
| `IMPLEMENTATION_PLAN.md` | Canonical plan for the 6-phase recovery program | When reviewing phases |
| `RULES.md` | Hard constraints — Karpathy/Pocock, never override | Any implementation task |
| `GATES.md` | Zero-trust PR merge checklist — 8 gates, CLEAR or BLOCK | Every PR review |
| `PRODUCT.md` | What to build / what NOT to build | Feature decisions |
| `DESIGN.md` | Visual design direction | UI/UX work |

## Architecture & Domain (load on demand)

| File | Purpose |
|---|---|
| `docs/ARCHITECTURE.md` | System boundaries, components, data ownership |
| `docs/DOMAIN_ARCHITECTURE.md` | DDD bounded contexts, event topology |
| `docs/adr/` | 14 Architecture Decision Records (ADR-001–014) |

## Operational Source of Truth (Phase 0 deliverables)

| File | Purpose |
|---|---|
| `docs/KNOWN_ISSUES.md` | Active bugs, risks, workarounds — live tracking |
| `docs/SYSTEM_OF_RECORD.md` | Authoritative data owner per domain |
| `docs/ENVIRONMENT_MAP.md` | All env vars, API keys, secrets inventory |
| `docs/AUTH_MODEL.md` | Canonical auth architecture (both auth systems) |
| `docs/ACTIVE_WORKFLOWS.md` | n8n and GAS workflow inventory |
| `docs/DEPLOYMENT.md` | Deploy, migration, rollback procedures |
| `docs/OWNER_MANUAL.md` | Plain-English ops guide for Brandon |
| `docs/RUNBOOK.md` | Incident response playbook |
| `docs/AGENT_PLAYBOOK.md` | Per-agent rules, Task Card workflow, merge gate |
| `docs/RISK_REGISTER.md` | Active risks with owner, likelihood, mitigation |
| `docs/ASSUMPTION_LEDGER.md` | Tracking unverified assumptions |
| `docs/EVIDENCE_REGISTER.md` | Evidence of green verification items |
| `docs/DATA_INTEGRITY_AUDIT.md` | Tracking data integrity states |
| `docs/PHASE_REPORTS/TEMPLATE.md` | Template for phase completion reports |

## Reference (load on demand)

| File | Purpose |
|---|---|
| `docs/ORTHOGONALITY.md` | Cross-domain boundary enforcement |
| `docs/TESTING.md` | Test standards and coverage targets |
| `docs/PROFESSIONAL_BASELINE.md` | Professional-grade definition for this project |
| `docs/ORG.md` | Org structure, staff roles |
| `docs/DISPATCH_GUIDE.md` | Dispatch operations reference |
| `docs/guides/` | Dev setup, deployment, testing, configuration |
| `docs/agents/` | Domain agent definitions |
| `docs/api/` | API reference |

## Design System

| File | Purpose |
|---|---|
| `.impeccable/design.json` | Machine-readable design system (Codex + impeccable skill only) |
| `DESIGN.md` | Visual direction + design principles |

## Obsolete — Deleted 2026-06-26 (do not recreate)

- `docs/APT_COMPLIANCE_HR_BLUEPRINT.md` — compliance → vendor (Phase 0)
- `docs/APT_STRATEGIC_INTEGRATION_ROADMAP.md` — superseded by recovery plan
- `docs/CAPABILITIES_REGISTER.md` — feature freeze; deferred to Phase 5
- `docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md` — expansion deferred until Phase 5
- `docs/CF_WORKER_DASHBOARDAPI_UPDATE.md` — CF worker obsolete
- `docs/GAS_MIGRATION_SCOPE.md` — GAS removal governed by Phase 4
- `docs/OPERATOR_GUIDE.md` — replaced by OWNER_MANUAL.md
- `docs/ROADMAP.md` — replaced by 6-phase recovery plan
- `docs/SESSION_GUIDE.md` — absorbed into AGENT_PLAYBOOK.md
- `docs/SHADOW_WRITES.md` — absorbed into ENVIRONMENT_MAP.md
- `docs/SHEETS_SCHEMA.md` — GAS being removed
- `docs/SPRINT_STANDARDS.md` — absorbed into AGENT_PLAYBOOK.md
- `docs/DESIGN_REFERENCE_ANCHORS.md` — absorbed into design system
- `CONTEXT.md` — absorbed into SESSION_STATE.md
- `WORKFLOW.md` — absorbed into AGENT_PLAYBOOK.md
- `CORE_PROJECT_FILES.txt` — replaced by this file
