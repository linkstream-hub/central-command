# Node Description Batch 353 of 412

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

- "references_update_for_update_incremental_re_extraction": "For --update (incremental re-extraction)" | kind=entity | source=.github/skills/graphify/references/update.md:L5 | neighbors=[graphify reference: incremental update …]
- "references_user_profiling": "user-profiling.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L1 | neighbors=[User Profiling: Detection Heuristics Re…]
- "references_user_profiling_1_communication_style": "1. Communication Style" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L18 | neighbors=[Dimensions]
- "references_user_profiling_2_decision_speed": "2. Decision Speed" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L69 | neighbors=[Dimensions]
- "references_user_profiling_3_explanation_depth": "3. Explanation Depth" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L120 | neighbors=[Dimensions]
- "references_user_profiling_4_debugging_approach": "4. Debugging Approach" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L170 | neighbors=[Dimensions]
- "references_user_profiling_5_ux_philosophy": "5. UX Philosophy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L220 | neighbors=[Dimensions]
- "references_user_profiling_6_vendor_philosophy": "6. Vendor Philosophy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L270 | neighbors=[Dimensions]
- "references_user_profiling_7_frustration_triggers": "7. Frustration Triggers" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L320 | neighbors=[Dimensions]
- "references_user_profiling_8_learning_style": "8. Learning Style" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L370 | neighbors=[Dimensions]
- "references_user_profiling_application": "Application" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L495 | neighbors=[Recency Weighting]
- "references_user_profiling_assessment": "Assessment" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L657 | neighbors=[Cross-Project Consistency]
- "references_user_profiling_edge_cases": "Edge Cases" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L502 | neighbors=[Recency Weighting]
- "references_user_profiling_evidence_format": "Evidence Format" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L422 | neighbors=[Evidence Curation]
- "references_user_profiling_evidence_targets": "Evidence Targets" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L428 | neighbors=[Evidence Curation]
- "references_user_profiling_guideline": "Guideline" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L487 | neighbors=[Recency Weighting]
- "references_user_profiling_handling_insufficient_dimensions": "Handling Insufficient Dimensions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L520 | neighbors=[Thin Data Handling]
- "references_user_profiling_how_to_use_this_document": "How to Use This Document" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L5 | neighbors=[User Profiling: Detection Heuristics Re…]
- "references_user_profiling_message_thresholds": "Message Thresholds" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L512 | neighbors=[Thin Data Handling]
- "references_user_profiling_natural_language_priority": "Natural Language Priority" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L474 | neighbors=[Evidence Curation]
- "references_user_profiling_phase_3_resolution": "Phase 3 Resolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L673 | neighbors=[Cross-Project Consistency]
- "references_user_profiling_project_attribution": "Project Attribution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L443 | neighbors=[Evidence Curation]
- "references_user_profiling_questionnaire_supplement": "Questionnaire Supplement" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L530 | neighbors=[Thin Data Handling]
- "references_user_profiling_quote_truncation": "Quote Truncation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L435 | neighbors=[Evidence Curation]
- "references_user_profiling_rationale": "Rationale" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L491 | neighbors=[Recency Weighting]
- "references_user_profiling_reporting_splits": "Reporting Splits" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L664 | neighbors=[Cross-Project Consistency]
- "references_user_profiling_schema_notes": "Schema Notes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L638 | neighbors=[Output Schema]
- "references_user_profiling_sensitive_content_exclusion_layer_1": "Sensitive Content Exclusion (Layer 1)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L449 | neighbors=[Evidence Curation]
- "references_user_story_template": "user-story-template.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-story-template.md:L1 | neighbors=[User Story Template (MVP Mode)]
- "references_user_story_template_canonical_format": "Canonical format" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-story-template.md:L5 | neighbors=[User Story Template (MVP Mode)]
- "references_user_story_template_how_it_lands_in_plan_md": "How it lands in PLAN.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-story-template.md:L42 | neighbors=[User Story Template (MVP Mode)]
- "references_user_story_template_how_it_lands_in_roadmap_md": "How it lands in ROADMAP.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-story-template.md:L21 | neighbors=[User Story Template (MVP Mode)]
- "references_verification_overrides": "verification-overrides.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L1 | neighbors=[Verification Overrides]
- "references_verification_overrides_ambiguity_resolution": "Ambiguity Resolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L83 | neighbors=[Matching Rules]
- "references_verification_overrides_at_milestone_completion": "At Milestone Completion" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L184 | neighbors=[Override Lifecycle]
- "references_verification_overrides_check_order": "Check Order" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L93 | neighbors=[Verifier Behavior with Overrides]
- "references_verification_overrides_cleanup": "Cleanup" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L198 | neighbors=[Override Lifecycle]
- "references_verification_overrides_during_re_verification": "During Re-verification" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L177 | neighbors=[Override Lifecycle]
- "references_verification_overrides_example_verification_md": "Example VERIFICATION.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L204 | neighbors=[Verification Overrides]
- "references_verification_overrides_examples": "Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L74 | neighbors=[Matching Rules]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-352.json

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
