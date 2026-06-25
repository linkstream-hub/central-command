# Node Description Batch 103 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "adr_adr_003_gas_as_google_workspace_bridge": "ADR-003-gas-as-google-workspace-bridge.md" | kind=entity | source=docs/adr/ADR-003-gas-as-google-workspace-bridge.md:L1 | neighbors=[ADR-003: Google Apps Script as Google W…]
- "adr_adr_003_gas_as_google_workspace_bridge_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-003-gas-as-google-workspace-bridge.md:L57 | neighbors=[ADR-003: Google Apps Script as Google W…]
- "adr_adr_003_gas_as_google_workspace_bridge_context": "Context" | kind=entity | source=docs/adr/ADR-003-gas-as-google-workspace-bridge.md:L9 | neighbors=[ADR-003: Google Apps Script as Google W…]
- "adr_adr_003_gas_as_google_workspace_bridge_decision": "Decision" | kind=entity | source=docs/adr/ADR-003-gas-as-google-workspace-bridge.md:L29 | neighbors=[ADR-003: Google Apps Script as Google W…]
- "adr_adr_003_gas_as_google_workspace_bridge_migration_target": "Migration Target" | kind=entity | source=docs/adr/ADR-003-gas-as-google-workspace-bridge.md:L51 | neighbors=[ADR-003: Google Apps Script as Google W…]
- "adr_adr_004_work_order_status_lifecycle": "ADR-004-work-order-status-lifecycle.md" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md:L1 | neighbors=[ADR-004: Work Order Status Lifecycle (8…]
- "adr_adr_004_work_order_status_lifecycle_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md:L59 | neighbors=[ADR-004: Work Order Status Lifecycle (8…]
- "adr_adr_004_work_order_status_lifecycle_context": "Context" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md:L9 | neighbors=[ADR-004: Work Order Status Lifecycle (8…]
- "adr_adr_004_work_order_status_lifecycle_decision": "Decision" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md:L20 | neighbors=[ADR-004: Work Order Status Lifecycle (8…]
- "adr_adr_004_work_order_status_lifecycle_what_awaiting_approval_is_not": "What \"Awaiting Approval\" Is NOT" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md:L53 | neighbors=[ADR-004: Work Order Status Lifecycle (8…]
- "adr_adr_005_org_id_multi_tenancy": "ADR-005-org-id-multi-tenancy.md" | kind=entity | source=docs/adr/ADR-005-org-id-multi-tenancy.md:L1 | neighbors=[ADR-005: org_id Multi-Tenancy on Every …]
- "adr_adr_005_org_id_multi_tenancy_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-005-org-id-multi-tenancy.md:L47 | neighbors=[ADR-005: org_id Multi-Tenancy on Every …]
- "adr_adr_005_org_id_multi_tenancy_context": "Context" | kind=entity | source=docs/adr/ADR-005-org-id-multi-tenancy.md:L9 | neighbors=[ADR-005: org_id Multi-Tenancy on Every …]
- "adr_adr_005_org_id_multi_tenancy_decision": "Decision" | kind=entity | source=docs/adr/ADR-005-org-id-multi-tenancy.md:L19 | neighbors=[ADR-005: org_id Multi-Tenancy on Every …]
- "adr_adr_006_dal_pattern_neon_first": "ADR-006-dal-pattern-neon-first.md" | kind=entity | source=docs/adr/ADR-006-dal-pattern-neon-first.md:L1 | neighbors=[ADR-006: DAL Pattern — Neon-First with …]
- "adr_adr_006_dal_pattern_neon_first_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-006-dal-pattern-neon-first.md:L53 | neighbors=[ADR-006: DAL Pattern — Neon-First with …]
- "adr_adr_006_dal_pattern_neon_first_context": "Context" | kind=entity | source=docs/adr/ADR-006-dal-pattern-neon-first.md:L9 | neighbors=[ADR-006: DAL Pattern — Neon-First with …]
- "adr_adr_006_dal_pattern_neon_first_decision_original_phase_2_migration": "Decision (Original — Phase 2 Migration)" | kind=entity | source=docs/adr/ADR-006-dal-pattern-neon-first.md:L17 | neighbors=[ADR-006: DAL Pattern — Neon-First with …]
- "adr_adr_006_dal_pattern_neon_first_superseded_state_post_phase_3_cut_over": "Superseded State (Post Phase 3 Cut-Over)" | kind=entity | source=docs/adr/ADR-006-dal-pattern-neon-first.md:L36 | neighbors=[ADR-006: DAL Pattern — Neon-First with …]
- "adr_adr_007_n8n_as_event_bus": "ADR-007-n8n-as-event-bus.md" | kind=entity | source=docs/adr/ADR-007-n8n-as-event-bus.md:L1 | neighbors=[ADR-007: n8n as Event Bus and Workflow …]
- "adr_adr_007_n8n_as_event_bus_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-007-n8n-as-event-bus.md:L55 | neighbors=[ADR-007: n8n as Event Bus and Workflow …]
- "adr_adr_007_n8n_as_event_bus_context": "Context" | kind=entity | source=docs/adr/ADR-007-n8n-as-event-bus.md:L9 | neighbors=[ADR-007: n8n as Event Bus and Workflow …]
- "adr_adr_007_n8n_as_event_bus_decision": "Decision" | kind=entity | source=docs/adr/ADR-007-n8n-as-event-bus.md:L21 | neighbors=[ADR-007: n8n as Event Bus and Workflow …]
- "adr_adr_007_n8n_as_event_bus_event_topology_target_phase_4": "Event Topology (Target — Phase 4)" | kind=entity | source=docs/adr/ADR-007-n8n-as-event-bus.md:L39 | neighbors=[ADR-007: n8n as Event Bus and Workflow …]
- "adr_adr_008_modular_monolith_architecture": "ADR-008-modular-monolith-architecture.md" | kind=entity | source=docs/adr/ADR-008-modular-monolith-architecture.md:L1 | neighbors=[ADR-008: Modular Monolith Over Microser…]
- "adr_adr_008_modular_monolith_architecture_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-008-modular-monolith-architecture.md:L50 | neighbors=[ADR-008: Modular Monolith Over Microser…]
- "adr_adr_008_modular_monolith_architecture_context": "Context" | kind=entity | source=docs/adr/ADR-008-modular-monolith-architecture.md:L9 | neighbors=[ADR-008: Modular Monolith Over Microser…]
- "adr_adr_008_modular_monolith_architecture_decision": "Decision" | kind=entity | source=docs/adr/ADR-008-modular-monolith-architecture.md:L24 | neighbors=[ADR-008: Modular Monolith Over Microser…]
- "adr_adr_009_wc_code_fix_at_source_not_sentinel": "ADR-009-wc-code-fix-at-source-not-sentinel.md" | kind=entity | source=docs/adr/ADR-009-wc-code-fix-at-source-not-sentinel.md:L1 | neighbors=[WC Code populated at tech-assignment, n…]
- "adr_adr_009_wc_code_fix_at_source_not_sentinel_wc_code_populated_at_tech_assignment_not_caught_by_sentinel": "WC Code populated at tech-assignment, not caught by sentinel" | kind=entity | source=docs/adr/ADR-009-wc-code-fix-at-source-not-sentinel.md:L1 | neighbors=[ADR-009-wc-code-fix-at-source-not-senti…]
- "adr_adr_010_job_state_machine_seam": "ADR-010-job-state-machine-seam.md" | kind=entity | source=docs/adr/ADR-010-job-state-machine-seam.md:L1 | neighbors=[ADR-010: Job State Machine Seam — Unifi…]
- "adr_adr_010_job_state_machine_seam_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-010-job-state-machine-seam.md:L98 | neighbors=[ADR-010: Job State Machine Seam — Unifi…]
- "adr_adr_010_job_state_machine_seam_context": "Context" | kind=entity | source=docs/adr/ADR-010-job-state-machine-seam.md:L9 | neighbors=[ADR-010: Job State Machine Seam — Unifi…]
- "adr_adr_010_job_state_machine_seam_decision": "Decision" | kind=entity | source=docs/adr/ADR-010-job-state-machine-seam.md:L28 | neighbors=[ADR-010: Job State Machine Seam — Unifi…]
- "adr_adr_010_job_state_machine_seam_what_this_adr_does_not_change": "What This ADR Does Not Change" | kind=entity | source=docs/adr/ADR-010-job-state-machine-seam.md:L89 | neighbors=[ADR-010: Job State Machine Seam — Unifi…]
- "adr_adr_011_event_publishing_seam": "ADR-011-event-publishing-seam.md" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L1 | neighbors=[ADR-011: Event Publishing Seam — Outbox…]
- "adr_adr_011_event_publishing_seam_consequences": "Consequences" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L155 | neighbors=[ADR-011: Event Publishing Seam — Outbox…]
- "adr_adr_011_event_publishing_seam_context": "Context" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L10 | neighbors=[ADR-011: Event Publishing Seam — Outbox…]
- "adr_adr_011_event_publishing_seam_eventbus_module": "EventBus Module" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L29 | neighbors=[Decision]
- "adr_adr_011_event_publishing_seam_future_upgrade_path": "Future Upgrade Path" | kind=entity | source=docs/adr/ADR-011-event-publishing-seam.md:L149 | neighbors=[ADR-011: Event Publishing Seam — Outbox…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-102.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
