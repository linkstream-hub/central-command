# Node Description Batch 88 of 412

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

- "12_data_integrity_audit_12_04_summary_verification": "Verification" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-04-SUMMARY.md:L34 | neighbors=[Phase 12 — Plan 04 Summary: Cut Sheets …]
- "12_data_integrity_audit_12_05_summary": "12-05-SUMMARY.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-05-SUMMARY.md:L1 | neighbors=[Phase 12 — Plan 05 Summary: Sever Sheet…]
- "12_data_integrity_audit_12_05_summary_addendum_2026_06_10_merge_gate_review": "Addendum (2026-06-10 merge-gate review)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-05-SUMMARY.md:L34 | neighbors=[Phase 12 — Plan 05 Summary: Sever Sheet…]
- "12_data_integrity_audit_12_05_summary_commit": "Commit" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-05-SUMMARY.md:L31 | neighbors=[Phase 12 — Plan 05 Summary: Sever Sheet…]
- "12_data_integrity_audit_12_05_summary_deviations_from_plan": "Deviations from Plan" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-05-SUMMARY.md:L24 | neighbors=[Phase 12 — Plan 05 Summary: Sever Sheet…]
- "12_data_integrity_audit_12_05_summary_get_handler": "GET Handler" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-05-SUMMARY.md:L7 | neighbors=[What Was Built]
- "12_data_integrity_audit_12_05_summary_post_handler": "POST Handler" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-05-SUMMARY.md:L12 | neighbors=[What Was Built]
- "12_data_integrity_audit_12_05_summary_removed": "Removed" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-05-SUMMARY.md:L19 | neighbors=[What Was Built]
- "12_data_integrity_audit_12_05_summary_verification": "Verification" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-05-SUMMARY.md:L27 | neighbors=[Phase 12 — Plan 05 Summary: Sever Sheet…]
- "12_data_integrity_audit_12_context": "12-CONTEXT.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L1 | neighbors=[Phase 12: Data Integrity Audit - Context]
- "12_data_integrity_audit_12_context_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L66 | neighbors=[Implementation Decisions]
- "12_data_integrity_audit_12_context_comparison_strategy": "Comparison Strategy" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L27 | neighbors=[Implementation Decisions]
- "12_data_integrity_audit_12_context_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L129 | neighbors=[Phase 12: Data Integrity Audit - Context]
- "12_data_integrity_audit_12_context_established_patterns": "Established Patterns" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L107 | neighbors=[Existing Code Insights]
- "12_data_integrity_audit_12_context_existing_orchestrator_pattern": "Existing Orchestrator Pattern" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L95 | neighbors=[Canonical References]
- "12_data_integrity_audit_12_context_gas_migration_scope_context_only": "GAS Migration Scope (context only)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L92 | neighbors=[Canonical References]
- "12_data_integrity_audit_12_context_integration_points": "Integration Points" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L112 | neighbors=[Existing Code Insights]
- "12_data_integrity_audit_12_context_neon_access": "Neon Access" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L22 | neighbors=[Implementation Decisions]
- "12_data_integrity_audit_12_context_output_gate_mechanism": "Output + Gate Mechanism" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L36 | neighbors=[Implementation Decisions]
- "12_data_integrity_audit_12_context_phase_boundary": "Phase Boundary" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L7 | neighbors=[Phase 12: Data Integrity Audit - Context]
- "12_data_integrity_audit_12_context_requirements": "Requirements" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L85 | neighbors=[Canonical References]
- "12_data_integrity_audit_12_context_reusable_assets": "Reusable Assets" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L103 | neighbors=[Existing Code Insights]
- "12_data_integrity_audit_12_context_schema": "Schema" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L82 | neighbors=[Canonical References]
- "12_data_integrity_audit_12_context_script_design": "Script Design" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L60 | neighbors=[Implementation Decisions]
- "12_data_integrity_audit_12_context_shadow_write_state_gaps": "Shadow-Write State + Gaps" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L79 | neighbors=[Canonical References]
- "12_data_integrity_audit_12_context_sheets_access": "Sheets Access" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L16 | neighbors=[Implementation Decisions]
- "12_data_integrity_audit_12_context_sheets_schema": "Sheets Schema" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L89 | neighbors=[Canonical References]
- "12_data_integrity_audit_12_context_specific_ideas": "Specific Ideas" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-CONTEXT.md:L120 | neighbors=[Phase 12: Data Integrity Audit - Context]
- "12_data_integrity_audit_12_discussion_log": "12-DISCUSSION-LOG.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-DISCUSSION-LOG.md:L1 | neighbors=[Phase 12: Data Integrity Audit - Discus…]
- "12_data_integrity_audit_12_discussion_log_all_gray_areas": "All Gray Areas" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-DISCUSSION-LOG.md:L12 | neighbors=[Phase 12: Data Integrity Audit - Discus…]
- "12_data_integrity_audit_12_discussion_log_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-DISCUSSION-LOG.md:L24 | neighbors=[Phase 12: Data Integrity Audit - Discus…]
- "12_data_integrity_audit_12_discussion_log_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-DISCUSSION-LOG.md:L36 | neighbors=[Phase 12: Data Integrity Audit - Discus…]
- "12_data_integrity_audit_12_research": "12-RESEARCH.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L1 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_alternatives_considered": "Alternatives Considered" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L103 | neighbors=[Standard Stack]
- "12_data_integrity_audit_12_research_anti_patterns_to_avoid": "Anti-Patterns to Avoid" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L304 | neighbors=[Architecture Patterns]
- "12_data_integrity_audit_12_research_applicable_asvs_categories": "Applicable ASVS Categories" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L650 | neighbors=[Security Domain]
- "12_data_integrity_audit_12_research_architectural_responsibility_map": "Architectural Responsibility Map" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L68 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_assumptions_log": "Assumptions Log" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L564 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L33 | neighbors=[User Constraints (from CONTEXT.md)]
- "12_data_integrity_audit_12_research_core": "Core" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L84 | neighbors=[Standard Stack]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-087.json

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
