# Node Description Batch 198 of 412

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

- "docs_architecture_data_layer_adr_002_adr_006": "Data Layer (ADR-002, ADR-006)" | kind=entity | source=docs/ARCHITECTURE.md:L118 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_directory_structure": "Directory Structure" | kind=entity | source=docs/ARCHITECTURE.md:L44 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_domain_classification": "Domain Classification" | kind=entity | source=docs/ARCHITECTURE.md:L179 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_domain_to_table_map": "Domain to Table Map" | kind=entity | source=docs/ARCHITECTURE.md:L254 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_event_topology_adr_007": "Event Topology (ADR-007)" | kind=entity | source=docs/ARCHITECTURE.md:L157 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_gas_migration_status_adr_003": "GAS Migration Status (ADR-003)" | kind=entity | source=docs/ARCHITECTURE.md:L314 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_key_abstractions": "Key Abstractions" | kind=entity | source=docs/ARCHITECTURE.md:L296 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_key_constraints": "Key Constraints" | kind=entity | source=docs/ARCHITECTURE.md:L369 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_multi_tenancy_adr_005": "Multi-Tenancy (ADR-005)" | kind=entity | source=docs/ARCHITECTURE.md:L270 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_system_overview": "System Overview" | kind=entity | source=docs/ARCHITECTURE.md:L10 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_work_order_status_lifecycle_adr_004": "Work Order Status Lifecycle (ADR-004)" | kind=entity | source=docs/ARCHITECTURE.md:L132 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_capabilities_register_abandoned_system_apt_fsm_supabase_lzzdefdohazlpdbgwptt": "ABANDONED SYSTEM — APT FSM (Supabase lzzdefdohazlpdbgwptt)" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L128 | neighbors=[READ THIS BEFORE EVERY SESSION THAT TOU…] | lang=en
- "docs_capabilities_register_auto_reply_gas_code_js_partial": "Auto-Reply (GAS — Code.js) ✅ (partial)" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L54 | neighbors=[WHAT ACTUALLY WORKS TODAY] | lang=en
- "docs_capabilities_register_cc_capabilities_register": "CC CAPABILITIES REGISTER" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L1 | neighbors=[CAPABILITIES_REGISTER.md] | lang=en
- "docs_capabilities_register_email_intake_gas_code_js": "Email Intake (GAS — Code.js) ✅" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L35 | neighbors=[WHAT ACTUALLY WORKS TODAY] | lang=en
- "docs_capabilities_register_gap_1_tenant_coordination_critical_blocks_operational_use": "GAP 1 — Tenant Coordination [CRITICAL — BLOCKS OPERATIONAL USE]" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L90 | neighbors=[GAPS — IN PRIORITY ORDER] | lang=en
- "docs_capabilities_register_gap_2_lock_and_send_sms_high_blocks_tech_receiving_assignments": "GAP 2 — Lock and Send SMS [HIGH — BLOCKS TECH RECEIVING ASSIGNMENTS]" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L96 | neighbors=[GAPS — IN PRIORITY ORDER] | lang=en
- "docs_capabilities_register_gap_3_follow_up_logic_high": "GAP 3 — Follow-up Logic [HIGH]" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L101 | neighbors=[GAPS — IN PRIORITY ORDER] | lang=en
- "docs_capabilities_register_gap_4_status_transition_audit_trail_medium": "GAP 4 — Status Transition Audit Trail [MEDIUM]" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L106 | neighbors=[GAPS — IN PRIORITY ORDER] | lang=en
- "docs_capabilities_register_gap_5_operational_pilot_must_do_before_more_feature_work": "GAP 5 — Operational Pilot [MUST DO BEFORE MORE FEATURE WORK]" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L110 | neighbors=[GAPS — IN PRIORITY ORDER] | lang=pt
- "docs_capabilities_register_ground_truth_what_the_system_actually_does_today": "Ground truth — what the system actually does today." | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L2 | neighbors=[CAPABILITIES_REGISTER.md] | lang=en
- "docs_capabilities_register_job_status_lifecycle_9_states": "Job Status Lifecycle (9 states)" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L77 | neighbors=[WHAT ACTUALLY WORKS TODAY] | lang=en
- "docs_capabilities_register_key_architectural_facts_do_not_re_derive": "KEY ARCHITECTURAL FACTS (do not re-derive)" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L117 | neighbors=[READ THIS BEFORE EVERY SESSION THAT TOU…] | lang=pt
- "docs_capabilities_register_lapham_special_handling": "Lapham Special Handling ✅" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L61 | neighbors=[WHAT ACTUALLY WORKS TODAY] | lang=en
- "docs_capabilities_register_schedule_grid_next_js_schedule": "Schedule Grid (Next.js — /schedule) ✅" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L65 | neighbors=[WHAT ACTUALLY WORKS TODAY] | lang=en
- "docs_capabilities_register_strategic_context": "STRATEGIC CONTEXT" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L137 | neighbors=[READ THIS BEFORE EVERY SESSION THAT TOU…] | lang=en
- "docs_capabilities_register_tech_mobile_next_js_jobs_login": "Tech Mobile (Next.js — /jobs, /login) ✅" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L71 | neighbors=[WHAT ACTUALLY WORKS TODAY] | lang=en
- "docs_capabilities_register_the_target_loop_not_yet_proven_end_to_end": "THE TARGET LOOP (not yet proven end-to-end)" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L17 | neighbors=[READ THIS BEFORE EVERY SESSION THAT TOU…] | lang=en
- "docs_capabilities_register_updated_s136_2026_06_04_update_after_every_sprint_that_changes_behavior": "Updated: S136 (2026-06-04). Update after every sprint that changes behavior." | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L3 | neighbors=[CAPABILITIES_REGISTER.md] | lang=en
- "docs_capabilities_register_what_this_system_is": "WHAT THIS SYSTEM IS" | kind=entity | source=docs/CAPABILITIES_REGISTER.md:L8 | neighbors=[READ THIS BEFORE EVERY SESSION THAT TOU…] | lang=en
- "docs_central_command_expansion_roadmap": "CENTRAL_COMMAND_EXPANSION_ROADMAP.md" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L1 | neighbors=[APT ECOSYSTEM — MASTER STRATEGIC ROADMAP] | lang=en
- "docs_central_command_expansion_roadmap_1_quality_is_the_floor_not_the_ceiling": "1. Quality Is the Floor, Not the Ceiling" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L12 | neighbors=[GOVERNING PRINCIPLES — ALL BUILDS, ALL …] | lang=en
- "docs_central_command_expansion_roadmap_2_automation_first": "2. Automation-First" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L27 | neighbors=[GOVERNING PRINCIPLES — ALL BUILDS, ALL …] | lang=en
- "docs_central_command_expansion_roadmap_3_security_first": "3. Security-First" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L30 | neighbors=[GOVERNING PRINCIPLES — ALL BUILDS, ALL …] | lang=en
- "docs_central_command_expansion_roadmap_4_professional_execution": "4. Professional Execution" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L38 | neighbors=[GOVERNING PRINCIPLES — ALL BUILDS, ALL …] | lang=en
- "docs_central_command_expansion_roadmap_apps_script_migration_strategy_the_honest_long_term_view": "Apps Script Migration Strategy — The Honest Long-Term View" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L221 | neighbors=[BACKEND SECURITY & INFRASTRUCTURE STAND…] | lang=en
- "docs_central_command_expansion_roadmap_apps_script_node_js_railway_migration_architecture": "Apps Script → Node.js/Railway — Migration Architecture" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L468 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en
- "docs_central_command_expansion_roadmap_apps_script_scalability_limits_know_when_you_ll_hit_them": "Apps Script Scalability Limits — Know When You'll Hit Them" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L211 | neighbors=[BACKEND SECURITY & INFRASTRUCTURE STAND…] | lang=en
- "docs_central_command_expansion_roadmap_current_architecture_honest_gap_assessment": "Current Architecture — Honest Gap Assessment" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L168 | neighbors=[BACKEND SECURITY & INFRASTRUCTURE STAND…] | lang=en
- "docs_central_command_expansion_roadmap_data_layer_neon_postgres_vercel_marketplace_drizzle_orm": "Data Layer: Neon Postgres (Vercel Marketplace) + Drizzle ORM" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L284 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-197.json

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
