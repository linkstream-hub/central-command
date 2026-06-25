# Node Description Batch 201 of 412

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "docs_domain_architecture_5_workforce": "5. WORKFORCE" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L176 | neighbors=[BOUNDED CONTEXTS — THE NINE DOMAINS] | lang=en
- "docs_domain_architecture_6_compliance_paga": "6. COMPLIANCE / PAGA" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L204 | neighbors=[BOUNDED CONTEXTS — THE NINE DOMAINS] | lang=en
- "docs_domain_architecture_7_property_client_directory": "7. PROPERTY / CLIENT DIRECTORY" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L244 | neighbors=[BOUNDED CONTEXTS — THE NINE DOMAINS] | lang=en
- "docs_domain_architecture_8_financial": "8. FINANCIAL" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L271 | neighbors=[BOUNDED CONTEXTS — THE NINE DOMAINS] | lang=en
- "docs_domain_architecture_9_intelligence_analytics_future": "9. INTELLIGENCE / ANALYTICS (future)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L292 | neighbors=[BOUNDED CONTEXTS — THE NINE DOMAINS] | lang=en
- "docs_domain_architecture_channel_map_by_participant_and_pattern": "Channel Map by Participant and Pattern" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L161 | neighbors=[4. COMMUNICATIONS] | lang=en
- "docs_domain_architecture_cross_entity_data_flow_deliberate_handoffs_only": "Cross-Entity Data Flow (Deliberate Handoffs Only)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L387 | neighbors=[THE ECOSYSTEM — FEDERATED HOLDING MODEL] | lang=en
- "docs_domain_architecture_decisions_locked_by_this_architecture": "DECISIONS LOCKED BY THIS ARCHITECTURE" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L537 | neighbors=[Last updated: 2026-05-22] | lang=en
- "docs_domain_architecture_domain_architecture_apt_ecosystem": "DOMAIN ARCHITECTURE — APT ECOSYSTEM" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L1 | neighbors=[DOMAIN_ARCHITECTURE.md] | lang=en
- "docs_domain_architecture_domain_classification": "DOMAIN CLASSIFICATION" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L18 | neighbors=[Last updated: 2026-05-22] | lang=en
- "docs_domain_architecture_now_end_of_phase_2": "Now (end of Phase 2)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L421 | neighbors=[ARCHITECTURE GRADIENT] | lang=en
- "docs_domain_architecture_open_questions_to_be_decided_before_phase_3_migration_code_is_written": "OPEN QUESTIONS (to be decided before Phase 3 migration code is written)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L557 | neighbors=[Last updated: 2026-05-22] | lang=en
- "docs_domain_architecture_pattern_a_transactional_notifications_automated_one_way_event_triggered": "Pattern A: Transactional Notifications (automated, one-way, event-triggered)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L132 | neighbors=[4. COMMUNICATIONS] | lang=pt
- "docs_domain_architecture_pattern_b_operational_threads_bidirectional_job_linked_async": "Pattern B: Operational Threads (bidirectional, job-linked, async)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L143 | neighbors=[4. COMMUNICATIONS] | lang=en
- "docs_domain_architecture_pattern_c_internal_coordination_in_app_role_gated_synchronous_for_the_user": "Pattern C: Internal Coordination (in-app, role-gated, synchronous for the user)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L152 | neighbors=[4. COMMUNICATIONS] | lang=en
- "docs_domain_architecture_phase_3_target_the_rebuild_we_re_starting": "Phase 3 Target (the rebuild we're starting)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L431 | neighbors=[ARCHITECTURE GRADIENT] | lang=en
- "docs_domain_architecture_phase_4_target_event_driven": "Phase 4 Target (event-driven)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L442 | neighbors=[ARCHITECTURE GRADIENT] | lang=en
- "docs_domain_architecture_phase_5_target_ecosystem_ready": "Phase 5 Target (ecosystem ready)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L449 | neighbors=[ARCHITECTURE GRADIENT] | lang=en
- "docs_domain_architecture_role_hierarchy": "Role Hierarchy" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L370 | neighbors=[THE ECOSYSTEM — FEDERATED HOLDING MODEL] | lang=en
- "docs_domain_architecture_service_a_notification_engine": "Service A: Notification Engine" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L482 | neighbors=[THE COMMUNICATIONS ARCHITECTURE (EXPAND…] | lang=pt
- "docs_domain_architecture_service_b_conversation_threads": "Service B: Conversation Threads" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L491 | neighbors=[THE COMMUNICATIONS ARCHITECTURE (EXPAND…] | lang=en
- "docs_domain_architecture_service_c_internal_coordination": "Service C: Internal Coordination" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L501 | neighbors=[THE COMMUNICATIONS ARCHITECTURE (EXPAND…] | lang=en
- "docs_domain_architecture_systems_analysis_for_the_full_platform_written_as_a_professional_dev_systems_architect_would_approach_it": "Systems analysis for the full platform — written as a professional dev/systems …" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L2 | neighbors=[DOMAIN_ARCHITECTURE.md] | lang=en
- "docs_domain_architecture_the_business_model": "The Business Model" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L339 | neighbors=[THE ECOSYSTEM — FEDERATED HOLDING MODEL] | lang=en
- "docs_domain_architecture_the_event_topology": "THE EVENT TOPOLOGY" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L306 | neighbors=[Last updated: 2026-05-22] | lang=en
- "docs_domain_architecture_the_four_entities": "The Four Entities" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L378 | neighbors=[THE ECOSYSTEM — FEDERATED HOLDING MODEL] | lang=en
- "docs_domain_architecture_the_framework_domain_driven_design_ddd": "THE FRAMEWORK: DOMAIN-DRIVEN DESIGN (DDD)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L8 | neighbors=[Last updated: 2026-05-22] | lang=en
- "docs_domain_architecture_the_modular_monolith_pattern": "THE MODULAR MONOLITH PATTERN" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L460 | neighbors=[Last updated: 2026-05-22] | lang=en
- "docs_domain_architecture_the_org_hierarchy": "The Org Hierarchy" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L347 | neighbors=[THE ECOSYSTEM — FEDERATED HOLDING MODEL] | lang=en
- "docs_domain_architecture_the_saas_angle": "The SaaS Angle" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L402 | neighbors=[THE ECOSYSTEM — FEDERATED HOLDING MODEL] | lang=en
- "docs_domain_architecture_this_document_answers_how_does_all_of_this_fit_together_and_what_decisions_must_be_made_correctly_from_the_start": "This document answers: how does all of this fit together, and what decisions mu…" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L3 | neighbors=[DOMAIN_ARCHITECTURE.md] | lang=en
- "docs_domain_architecture_what_this_means_for_the_schema_connection_back_to_phase_3_design": "WHAT THIS MEANS FOR THE SCHEMA (connection back to Phase 3 design)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L513 | neighbors=[Last updated: 2026-05-22] | lang=en
- "docs_gas_migration_scope": "GAS_MIGRATION_SCOPE.md" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L1 | neighbors=[GAS Migration Scope] | lang=en
- "docs_gas_migration_scope_architectural_responsibility_map": "Architectural Responsibility Map" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L15 | neighbors=[GAS Migration Scope] | lang=en
- "docs_gas_migration_scope_assumptions_log": "Assumptions Log" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L447 | neighbors=[Assumptions and Open Questions] | lang=en
- "docs_gas_migration_scope_blocked_migrations": "Blocked Migrations" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L396 | neighbors=[GAS Migration Scope] | lang=en
- "docs_gas_migration_scope_code_js_functions": "Code.js Functions" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L46 | neighbors=[GAS Migration Scope] | lang=en
- "docs_gas_migration_scope_dashboardapi_gs_functions": "DashboardAPI.gs Functions" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L181 | neighbors=[GAS Migration Scope] | lang=en
- "docs_gas_migration_scope_migration_overview": "Migration Overview" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L4 | neighbors=[GAS Migration Scope] | lang=en
- "docs_gas_migration_scope_open_questions": "Open Questions" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L458 | neighbors=[Assumptions and Open Questions] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-200.json

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
