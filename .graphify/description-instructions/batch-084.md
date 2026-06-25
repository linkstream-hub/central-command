# Node Description Batch 85 of 412

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

- "03_gap_remediation_03_research_gap_09_contact_lookup_sam_cooney": "GAP-09: Contact lookup — Sam Cooney" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L278 | neighbors=[Gap Inventory — File Targets] | lang=en
- "03_gap_remediation_03_research_locked_decisions": "Locked Decisions" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L12 | neighbors=[User Constraints (from CONTEXT.md)] | lang=en
- "03_gap_remediation_03_research_metadata": "Metadata" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L556 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_open_questions_resolved_2026_05_30": "Open Questions (RESOLVED 2026-05-30)" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L526 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_pattern_gas_forwarded_block_extraction": "Pattern: GAS forwarded block extraction" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L355 | neighbors=[Architecture Patterns] | lang=en
- "03_gap_remediation_03_research_pattern_gas_keyword_inference": "Pattern: GAS keyword inference" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L344 | neighbors=[Architecture Patterns] | lang=en
- "03_gap_remediation_03_research_pattern_jobdetailmodal_section_structure": "Pattern: JobDetailModal section structure" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L369 | neighbors=[Architecture Patterns] | lang=en
- "03_gap_remediation_03_research_phase_requirements": "Phase Requirements" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L42 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_phase_requirements_test_map": "Phase Requirements → Test Map" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L480 | neighbors=[Validation Architecture] | lang=en
- "03_gap_remediation_03_research_pitfall_1_gas_regex_and_the_quote_prefix": "Pitfall 1: GAS regex and the `>` quote prefix" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L398 | neighbors=[Common Pitfalls] | lang=en
- "03_gap_remediation_03_research_pitfall_2_gas_es5_no_arrow_functions_no_template_literals_no_const_let": "Pitfall 2: GAS ES5 — no arrow functions, no template literals, no `const`/`let`" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L403 | neighbors=[Common Pitfalls] | lang=es
- "03_gap_remediation_03_research_pitfall_3_detectlaphamform_body_may_contain_both_the_form_content_and_a_quoted_forwarded_block": "Pitfall 3: detectLaphamForm() — body may contain BOTH the form content AND a qu…" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L408 | neighbors=[Common Pitfalls] | lang=en
- "03_gap_remediation_03_research_pitfall_4_keyword_inference_ac_substring_matches_in_non_hvac_words": "Pitfall 4: keyword inference — 'ac' substring matches in non-HVAC words" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L413 | neighbors=[Common Pitfalls] | lang=en
- "03_gap_remediation_03_research_pitfall_5_jobdetailmodal_tenant_section_renders_when_all_three_fields_are_null": "Pitfall 5: JobDetailModal — tenant section renders when all three fields are nu…" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L418 | neighbors=[Common Pitfalls] | lang=en
- "03_gap_remediation_03_research_pitfall_6_search_bar_commandpalette_fires_a_synthetic_keyboard_event": "Pitfall 6: Search bar — CommandPalette fires a synthetic keyboard event" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L423 | neighbors=[Common Pitfalls] | lang=pt
- "03_gap_remediation_03_research_pitfall_7_sidebar_label_change_affects_url_routing": "Pitfall 7: Sidebar label change affects URL routing" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L428 | neighbors=[Common Pitfalls] | lang=en
- "03_gap_remediation_03_research_primary_high_confidence": "Primary (HIGH confidence)" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L542 | neighbors=[Sources] | lang=en
- "03_gap_remediation_03_research_runtime_state_inventory": "Runtime State Inventory" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L435 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_secondary_medium_confidence": "Secondary (MEDIUM confidence)" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L551 | neighbors=[Sources] | lang=en
- "03_gap_remediation_03_research_security_domain": "Security Domain" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L502 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_standard_stack": "Standard Stack" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L305 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_summary": "Summary" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L52 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_test_framework": "Test Framework" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L471 | neighbors=[Validation Architecture] | lang=en
- "03_gap_remediation_03_research_wave_0_gaps": "Wave 0 Gaps" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L495 | neighbors=[Validation Architecture] | lang=en
- "03_gap_remediation_03_research_wave_structure_claude_s_discretion_recommendation": "Wave Structure (Claude's Discretion recommendation)" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L325 | neighbors=[Architecture Patterns] | lang=en
- "03_gap_remediation_03_validation": "03-VALIDATION.md" | kind=entity | source=.planning/phases/03-gap-remediation/03-VALIDATION.md:L1 | neighbors=[Phase 3: Gap Remediation — Validation S…] | lang=en
- "03_gap_remediation_03_validation_automated_gates_summary": "Automated Gates Summary" | kind=entity | source=.planning/phases/03-gap-remediation/03-VALIDATION.md:L35 | neighbors=[Phase 3: Gap Remediation — Validation S…] | lang=en
- "03_gap_remediation_03_validation_automation_constraints": "Automation Constraints" | kind=entity | source=.planning/phases/03-gap-remediation/03-VALIDATION.md:L9 | neighbors=[Phase 3: Gap Remediation — Validation S…] | lang=en
- "03_gap_remediation_03_validation_nyquist_sampling_note": "Nyquist Sampling Note" | kind=entity | source=.planning/phases/03-gap-remediation/03-VALIDATION.md:L47 | neighbors=[Phase 3: Gap Remediation — Validation S…] | lang=en
- "03_gap_remediation_03_validation_verification_architecture_by_gap": "Verification Architecture by Gap" | kind=entity | source=.planning/phases/03-gap-remediation/03-VALIDATION.md:L19 | neighbors=[Phase 3: Gap Remediation — Validation S…] | lang=en
- "06_drizzle_kit_migrate_fix_06_01_plan_phase_6_verification_criteria": "Phase 6 Verification Criteria" | kind=entity | source=.planning/phases/06-drizzle-kit-migrate-fix/06-01-PLAN.md:L286 | neighbors=[06-01-PLAN.md] | lang=en
- "06_drizzle_kit_migrate_fix_06_01_plan_summary": "Summary" | kind=entity | source=.planning/phases/06-drizzle-kit-migrate-fix/06-01-PLAN.md:L262 | neighbors=[06-01-PLAN.md] | lang=en
- "06_drizzle_kit_migrate_fix_06_01_plan_test_plan": "Test plan" | kind=entity | source=.planning/phases/06-drizzle-kit-migrate-fix/06-01-PLAN.md:L267 | neighbors=[06-01-PLAN.md] | lang=en
- "07_gcp_oauth_cleanup_07_01_plan": "07-01-PLAN.md" | kind=entity | source=.planning/phases/07-gcp-oauth-cleanup/07-01-PLAN.md:L1 | neighbors=[Phase 7 Verification Criteria] | lang=en
- "07_gcp_oauth_cleanup_07_01_plan_phase_7_verification_criteria": "Phase 7 Verification Criteria" | kind=entity | source=.planning/phases/07-gcp-oauth-cleanup/07-01-PLAN.md:L101 | neighbors=[07-01-PLAN.md] | lang=en
- "10_gas_migration_scope_10_01_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-01-PLAN.md:L134 | neighbors=[10-01-PLAN.md] | lang=en
- "10_gas_migration_scope_10_01_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-01-PLAN.md:L128 | neighbors=[10-01-PLAN.md] | lang=en
- "10_gas_migration_scope_10_02_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-02-PLAN.md:L101 | neighbors=[10-02-PLAN.md] | lang=en
- "10_gas_migration_scope_10_02_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-02-PLAN.md:L95 | neighbors=[10-02-PLAN.md] | lang=en
- "10_gas_migration_scope_10_02_summary": "10-02-SUMMARY.md" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-02-SUMMARY.md:L1 | neighbors=[Phase 10: GAS Migration Scope - Documen…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-084.json

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
