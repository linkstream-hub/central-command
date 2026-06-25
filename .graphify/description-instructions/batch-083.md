# Node Description Batch 84 of 412

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

- "03_gap_remediation_03_01_summary_gap_01_servicecategory_keyword_inference": "GAP-01: serviceCategory Keyword Inference" | kind=entity | source=.planning/phases/03-gap-remediation/03-01-SUMMARY.md:L8 | neighbors=[Phase 03 Plan 01 Summary] | lang=en
- "03_gap_remediation_03_01_summary_gap_02_forwarded_block_pre_processing_mailto_stripping": "GAP-02: Forwarded-Block Pre-processing & mailto: Stripping" | kind=entity | source=.planning/phases/03-gap-remediation/03-01-SUMMARY.md:L13 | neighbors=[Phase 03 Plan 01 Summary] | lang=en
- "03_gap_remediation_03_02_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/03-gap-remediation/03-02-PLAN.md:L500 | neighbors=[03-02-PLAN.md] | lang=en
- "03_gap_remediation_03_02_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/03-gap-remediation/03-02-PLAN.md:L493 | neighbors=[03-02-PLAN.md] | lang=en
- "03_gap_remediation_03_03_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/03-gap-remediation/03-03-PLAN.md:L217 | neighbors=[03-03-PLAN.md] | lang=en
- "03_gap_remediation_03_03_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/03-gap-remediation/03-03-PLAN.md:L210 | neighbors=[03-03-PLAN.md] | lang=en
- "03_gap_remediation_03_context": "03-CONTEXT.md" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L1 | neighbors=[Phase 3: Gap Remediation — Context] | lang=en
- "03_gap_remediation_03_context_architecture": "Architecture" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L97 | neighbors=[Canonical References] | lang=en
- "03_gap_remediation_03_context_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L72 | neighbors=[Implementation Decisions] | lang=en
- "03_gap_remediation_03_context_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L113 | neighbors=[Phase 3: Gap Remediation — Context] | lang=en
- "03_gap_remediation_03_context_gap_01_code_js_servicecategory_inference_highest_priority": "GAP-01 — Code.js serviceCategory inference (HIGHEST PRIORITY)" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L22 | neighbors=[Implementation Decisions] | lang=en
- "03_gap_remediation_03_context_gap_01b_wo_card_tenant_rendering": "GAP-01b — WO card tenant rendering" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L27 | neighbors=[Implementation Decisions] | lang=en
- "03_gap_remediation_03_context_gap_02_code_js_forwarded_email_field_extraction_highest_priority": "GAP-02 — Code.js forwarded email field extraction (HIGHEST PRIORITY)" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L31 | neighbors=[Implementation Decisions] | lang=en
- "03_gap_remediation_03_context_gap_03_coord_03_comms_reply_re_test_blocked_re_test_only": "GAP-03 — COORD-03 comms reply re-test (blocked, re-test only)" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L38 | neighbors=[Implementation Decisions] | lang=en
- "03_gap_remediation_03_context_gap_04_data_cleanup_apt_seed_0001_brandon_runs_in_neon_console": "GAP-04 — Data cleanup: APT-SEED-0001 (Brandon runs in Neon console)" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L42 | neighbors=[Implementation Decisions] | lang=en
- "03_gap_remediation_03_context_gap_05_tech_pwa_wo_card_tenant_contact_fields": "GAP-05 — Tech PWA WO card tenant contact fields" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L47 | neighbors=[Implementation Decisions] | lang=en
- "03_gap_remediation_03_context_gap_06_tech_pwa_search_priority_duplicate_search_bar": "GAP-06 — Tech PWA search priority + duplicate search bar" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L52 | neighbors=[Implementation Decisions] | lang=en
- "03_gap_remediation_03_context_gap_07_tech_pwa_sidebar_labels": "GAP-07 — Tech PWA sidebar labels" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L58 | neighbors=[Implementation Decisions] | lang=en
- "03_gap_remediation_03_context_gap_08_tech_pwa_comms_tab_message_contrast": "GAP-08 — Tech PWA Comms tab message contrast" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L63 | neighbors=[Implementation Decisions] | lang=en
- "03_gap_remediation_03_context_gap_09_contact_lookup_sam_cooney_cooneysam_gmail_com": "GAP-09 — Contact lookup: Sam Cooney (cooneysam@gmail.com)" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L67 | neighbors=[Implementation Decisions] | lang=pt
- "03_gap_remediation_03_context_gas_code_js": "GAS (Code.js)" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L84 | neighbors=[Canonical References] | lang=en
- "03_gap_remediation_03_context_phase_2_evidence": "Phase 2 Evidence" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L94 | neighbors=[Canonical References] | lang=en
- "03_gap_remediation_03_context_phase_boundary": "Phase Boundary" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L8 | neighbors=[Phase 3: Gap Remediation — Context] | lang=en
- "03_gap_remediation_03_context_specific_evidence_from_phase_2": "Specific Evidence from Phase 2" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L104 | neighbors=[Phase 3: Gap Remediation — Context] | lang=en
- "03_gap_remediation_03_context_tech_pwa": "Tech PWA" | kind=entity | source=.planning/phases/03-gap-remediation/03-CONTEXT.md:L89 | neighbors=[Canonical References] | lang=en
- "03_gap_remediation_03_research": "03-RESEARCH.md" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L1 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_architectural_responsibility_map": "Architectural Responsibility Map" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L64 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_assumptions_log": "Assumptions Log" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L516 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L28 | neighbors=[User Constraints (from CONTEXT.md)] | lang=en
- "03_gap_remediation_03_research_deferred_ideas_out_of_scope": "Deferred Ideas (OUT OF SCOPE)" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L34 | neighbors=[User Constraints (from CONTEXT.md)] | lang=en
- "03_gap_remediation_03_research_don_t_hand_roll": "Don't Hand-Roll" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L385 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_environment_availability": "Environment Availability" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L452 | neighbors=[Phase 3: Gap Remediation — Research] | lang=en
- "03_gap_remediation_03_research_gap_01_servicecategory_inference_in_detectlaphamform": "GAP-01: serviceCategory inference in detectLaphamForm()" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L82 | neighbors=[Gap Inventory — File Targets] | lang=en
- "03_gap_remediation_03_research_gap_01b_gap_05_wo_card_tenant_contact_display": "GAP-01b / GAP-05: WO card tenant contact display" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L119 | neighbors=[Gap Inventory — File Targets] | lang=en
- "03_gap_remediation_03_research_gap_02_forwarded_email_field_extraction_mailto_stripping": "GAP-02: Forwarded email field extraction + mailto: stripping" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L137 | neighbors=[Gap Inventory — File Targets] | lang=en
- "03_gap_remediation_03_research_gap_03_coord_03_re_test_no_code_fix": "GAP-03: COORD-03 re-test (no code fix)" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L172 | neighbors=[Gap Inventory — File Targets] | lang=en
- "03_gap_remediation_03_research_gap_04_neon_test_record_cleanup": "GAP-04: Neon test record cleanup" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L181 | neighbors=[Gap Inventory — File Targets] | lang=en
- "03_gap_remediation_03_research_gap_06_search_ranking_duplicate_bar": "GAP-06: Search — ranking + duplicate bar" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L190 | neighbors=[Gap Inventory — File Targets] | lang=en
- "03_gap_remediation_03_research_gap_07_sidebar_nav_labels": "GAP-07: Sidebar nav labels" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L233 | neighbors=[Gap Inventory — File Targets] | lang=en
- "03_gap_remediation_03_research_gap_08_comms_tab_message_contrast": "GAP-08: Comms tab message contrast" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L256 | neighbors=[Gap Inventory — File Targets] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-083.json

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
