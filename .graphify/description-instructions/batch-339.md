# Node Description Batch 340 of 412

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

- "planning_project_out_of_scope": "Out of Scope" | kind=entity | source=.planning/PROJECT.md:L49 | neighbors=[Requirements]
- "planning_project_previous_milestone_v1_0_cc_core_operational": "Previous Milestone: v1.0 CC Core Operational ✅" | kind=entity | source=.planning/PROJECT.md:L20 | neighbors=[APT Central Command (CC2.0 → CC3.0)]
- "planning_project_validated": "Validated" | kind=entity | source=.planning/PROJECT.md:L26 | neighbors=[Requirements]
- "planning_project_what_this_is": "What This Is" | kind=entity | source=.planning/PROJECT.md:L3 | neighbors=[APT Central Command (CC2.0 → CC3.0)]
- "planning_requirements": "REQUIREMENTS.md" | kind=entity | source=.planning/REQUIREMENTS.md:L1 | neighbors=[Requirements: APT Central Command]
- "planning_requirements_future_requirements_phases_22_24": "Future Requirements (Phases 22–24)" | kind=entity | source=.planning/REQUIREMENTS.md:L64 | neighbors=[Requirements: APT Central Command]
- "planning_requirements_gas_migration_requirements_active": "GAS Migration Requirements — ACTIVE" | kind=entity | source=.planning/REQUIREMENTS.md:L55 | neighbors=[Requirements: APT Central Command]
- "planning_requirements_out_of_scope": "Out of Scope" | kind=entity | source=.planning/REQUIREMENTS.md:L106 | neighbors=[Requirements: APT Central Command]
- "planning_requirements_parsing_intake_requirements_phase_25_coo_directive_2026_06_10": "Parsing & Intake Requirements — Phase 25 (COO directive 2026-06-10)" | kind=entity | source=.planning/REQUIREMENTS.md:L79 | neighbors=[Requirements: APT Central Command]
- "planning_requirements_retired_alias_ids_do_not_use_in_new_plans": "Retired alias IDs (do not use in new plans)" | kind=entity | source=.planning/REQUIREMENTS.md:L43 | neighbors=[Neon Cutover Requirements — COMPLETE (P…]
- "planning_requirements_schedule_redesign_requirements_sr_01_paused": "Schedule Redesign Requirements (sr-01) — PAUSED" | kind=entity | source=.planning/REQUIREMENTS.md:L91 | neighbors=[Requirements: APT Central Command]
- "planning_requirements_traceability": "Traceability" | kind=entity | source=.planning/REQUIREMENTS.md:L117 | neighbors=[Requirements: APT Central Command]
- "planning_requirements_triage_requirements_complete_phase_11": "Triage Requirements — COMPLETE (Phase 11)" | kind=entity | source=.planning/REQUIREMENTS.md:L30 | neighbors=[Requirements: APT Central Command]
- "planning_requirements_v1_0_requirements_closed_2026_05_30": "v1.0 Requirements — CLOSED 2026-05-30" | kind=entity | source=.planning/REQUIREMENTS.md:L12 | neighbors=[Requirements: APT Central Command]
- "planning_roadmap": "ROADMAP.md" | kind=entity | source=.planning/ROADMAP.md:L1 | neighbors=[ROADMAP — APT Central Command]
- "planning_roadmap_foundation_milestone_own_f_numbering_predates_phase_dirs": "Foundation Milestone (own F-numbering — predates phase dirs)" | kind=entity | source=.planning/ROADMAP.md:L24 | neighbors=[ROADMAP — APT Central Command]
- "planning_roadmap_milestone_index": "Milestone Index" | kind=entity | source=.planning/ROADMAP.md:L11 | neighbors=[ROADMAP — APT Central Command]
- "planning_roadmap_phase_19_blockers_carry_forward": "Phase 19 blockers (carry-forward)" | kind=entity | source=.planning/ROADMAP.md:L64 | neighbors=[Executed Phase Arc (directory numbering…]
- "planning_roadmap_phase_25_parsing_intake_quality": "Phase 25: Parsing & Intake Quality" | kind=entity | source=.planning/ROADMAP.md:L87 | neighbors=[Future Phases (renumbered 2026-06-10 — …]
- "planning_roadmap_phase_26_direct_wo_intake_form_website_remediation": "Phase 26: Direct WO Intake Form + Website Remediation" | kind=entity | source=.planning/ROADMAP.md:L98 | neighbors=[Future Phases (renumbered 2026-06-10 — …]
- "planning_roadmap_phase_27_dashboardapi_remainder_migration": "Phase 27: DashboardAPI Remainder Migration" | kind=entity | source=.planning/ROADMAP.md:L114 | neighbors=[Future Phases (renumbered 2026-06-10 — …]
- "planning_roadmap_phase_28_sentinel_consolidation_neon_compute_diet": "Phase 28: Sentinel Consolidation — Neon Compute Diet" | kind=entity | source=.planning/ROADMAP.md:L132 | neighbors=[Future Phases (renumbered 2026-06-10 — …]
- "planning_roadmap_schedule_redesign_sr_01_paused": "Schedule Redesign (sr-01) — PAUSED" | kind=entity | source=.planning/ROADMAP.md:L147 | neighbors=[ROADMAP — APT Central Command]
- "planning_state_future_phases_renumbered_2026_06_10_13_14_15_numbers_already_consumed_by_executed_dirs": "Future Phases (renumbered 2026-06-10 — 13/14/15 numbers already consumed by exe…" | kind=entity | source=.planning/STATE.md:L81 | neighbors=[STATE.md]
- "planning_state_key_decisions_reconciliation_2026_06_10": "Key decisions (reconciliation, 2026-06-10)" | kind=entity | source=.planning/STATE.md:L87 | neighbors=[STATE.md]
- "planning_state_open_work": "Open Work" | kind=entity | source=.planning/STATE.md:L21 | neighbors=[STATE.md]
- "planning_state_phase_11_production_triage_system_audit_complete": "Phase 11: Production Triage & System Audit — COMPLETE" | kind=entity | source=.planning/STATE.md:L54 | neighbors=[STATE.md]
- "planning_state_phase_12_unified_neon_database_cutover_complete_merge_pending": "Phase 12: Unified Neon Database Cutover — COMPLETE (merge pending)" | kind=entity | source=.planning/STATE.md:L59 | neighbors=[STATE.md]
- "planning_state_phase_19_code_js_email_polling_n8n_in_progress": "Phase 19: Code.js Email Polling → n8n — IN PROGRESS" | kind=entity | source=.planning/STATE.md:L77 | neighbors=[STATE.md]
- "planning_state_phases_15_18_gas_migration_complete": "Phases 15–18: GAS Migration — COMPLETE" | kind=entity | source=.planning/STATE.md:L70 | neighbors=[STATE.md]
- "planning_state_session_continuity": "Session Continuity" | kind=entity | source=.planning/STATE.md:L95 | neighbors=[STATE.md]
- "product": "PRODUCT.md" | kind=entity | source=PRODUCT.md:L1 | neighbors=[Product]
- "product_accessibility_inclusion": "Accessibility & Inclusion" | kind=entity | source=PRODUCT.md:L36 | neighbors=[Product]
- "product_anti_references": "Anti-references" | kind=entity | source=PRODUCT.md:L23 | neighbors=[Product]
- "product_brand_personality": "Brand Personality" | kind=entity | source=PRODUCT.md:L17 | neighbors=[Product]
- "product_design_principles": "Design Principles" | kind=entity | source=PRODUCT.md:L28 | neighbors=[Product]
- "product_product_purpose": "Product Purpose" | kind=entity | source=PRODUCT.md:L13 | neighbors=[Product]
- "product_register": "Register" | kind=entity | source=PRODUCT.md:L3 | neighbors=[Product]
- "product_users": "Users" | kind=entity | source=PRODUCT.md:L7 | neighbors=[Product]
- "production_audit_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/production-audit/SKILL.md:L1 | neighbors=[Production Audit]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-339.json

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
