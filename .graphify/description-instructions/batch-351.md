# Node Description Batch 352 of 412

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

- "references_thinking_models_research_conflict_resolution": "Conflict Resolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-research.md:L7 | neighbors=[Thinking Models: Research Cluster]
- "references_thinking_models_research_when_not_to_think": "When NOT to Think" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-research.md:L43 | neighbors=[Thinking Models: Research Cluster]
- "references_thinking_models_verification": "thinking-models-verification.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-verification.md:L1 | neighbors=[Thinking Models: Verification Cluster]
- "references_thinking_models_verification_1_inversion": "1. Inversion" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-verification.md:L16 | neighbors=[Thinking Models: Verification Cluster]
- "references_thinking_models_verification_2_chesterton_s_fence": "2. Chesterton's Fence" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-verification.md:L22 | neighbors=[Thinking Models: Verification Cluster]
- "references_thinking_models_verification_3_confirmation_bias_counter": "3. Confirmation Bias Counter" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-verification.md:L28 | neighbors=[Thinking Models: Verification Cluster]
- "references_thinking_models_verification_4_planning_fallacy_calibration": "4. Planning Fallacy Calibration" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-verification.md:L34 | neighbors=[Thinking Models: Verification Cluster]
- "references_thinking_models_verification_5_counterfactual_thinking": "5. Counterfactual Thinking" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-verification.md:L40 | neighbors=[Thinking Models: Verification Cluster]
- "references_thinking_models_verification_conflict_resolution": "Conflict Resolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-verification.md:L7 | neighbors=[Thinking Models: Verification Cluster]
- "references_thinking_models_verification_when_not_to_think": "When NOT to Think" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-verification.md:L48 | neighbors=[Thinking Models: Verification Cluster]
- "references_thinking_partner": "thinking-partner.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-partner.md:L1 | neighbors=[Thinking Partner Integration]
- "references_thinking_partner_1_discuss_phase_tradeoff_deep_dive": "1. Discuss Phase — Tradeoff Deep-Dive" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-partner.md:L33 | neighbors=[Integration Points]
- "references_thinking_partner_2_plan_phase_architectural_decision_analysis": "2. Plan Phase — Architectural Decision Analysis" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-partner.md:L53 | neighbors=[Integration Points]
- "references_thinking_partner_3_explore_approach_comparison_requires_1729": "3. Explore — Approach Comparison (requires #1729)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-partner.md:L69 | neighbors=[Integration Points]
- "references_thinking_partner_configuration": "Configuration" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-partner.md:L76 | neighbors=[Thinking Partner Integration]
- "references_thinking_partner_design_principles": "Design Principles" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-partner.md:L90 | neighbors=[Thinking Partner Integration]
- "references_thinking_partner_tradeoff_detection_signals": "Tradeoff Detection Signals" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-partner.md:L7 | neighbors=[Thinking Partner Integration]
- "references_transcribe": "transcribe.md" | kind=entity | source=.github/skills/graphify/references/transcribe.md:L1 | neighbors=[graphify reference: transcribe video an…]
- "references_transcribe_step_2_5_transcribe_video_audio_files_only_if_video_files_detected": "Step 2.5 - Transcribe video / audio files (only if video files detected)" | kind=entity | source=.github/skills/graphify/references/transcribe.md:L5 | neighbors=[graphify reference: transcribe video an…]
- "references_ui_brand_anti_patterns": "Anti-Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ui-brand.md:L152 | neighbors=[ui-brand.md]
- "references_ui_brand_checkpoint_boxes": "Checkpoint Boxes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ui-brand.md:L28 | neighbors=[ui-brand.md]
- "references_ui_brand_error_box": "Error Box" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ui-brand.md:L126 | neighbors=[ui-brand.md]
- "references_ui_brand_next_up_block": "Next Up Block" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ui-brand.md:L100 | neighbors=[ui-brand.md]
- "references_ui_brand_progress_display": "Progress Display" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ui-brand.md:L65 | neighbors=[ui-brand.md]
- "references_ui_brand_spawning_indicators": "Spawning Indicators" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ui-brand.md:L84 | neighbors=[ui-brand.md]
- "references_ui_brand_stage_banners": "Stage Banners" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ui-brand.md:L5 | neighbors=[ui-brand.md]
- "references_ui_brand_status_symbols": "Status Symbols" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ui-brand.md:L51 | neighbors=[ui-brand.md]
- "references_ui_brand_tables": "Tables" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ui-brand.md:L140 | neighbors=[ui-brand.md]
- "references_universal_anti_patterns": "universal-anti-patterns.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/universal-anti-patterns.md:L1 | neighbors=[Universal Anti-Patterns]
- "references_universal_anti_patterns_behavioral_rules": "Behavioral Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/universal-anti-patterns.md:L39 | neighbors=[Universal Anti-Patterns]
- "references_universal_anti_patterns_context_budget_rules": "Context Budget Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/universal-anti-patterns.md:L7 | neighbors=[Universal Anti-Patterns]
- "references_universal_anti_patterns_error_recovery_rules": "Error Recovery Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/universal-anti-patterns.md:L47 | neighbors=[Universal Anti-Patterns]
- "references_universal_anti_patterns_file_reading_rules": "File Reading Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/universal-anti-patterns.md:L15 | neighbors=[Universal Anti-Patterns]
- "references_universal_anti_patterns_gsd_specific_rules": "GSD-Specific Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/universal-anti-patterns.md:L53 | neighbors=[Universal Anti-Patterns]
- "references_universal_anti_patterns_ios_apple_platform_rules": "iOS / Apple Platform Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/universal-anti-patterns.md:L60 | neighbors=[Universal Anti-Patterns]
- "references_universal_anti_patterns_questioning_anti_patterns": "Questioning Anti-Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/universal-anti-patterns.md:L27 | neighbors=[Universal Anti-Patterns]
- "references_universal_anti_patterns_state_management_anti_patterns": "State Management Anti-Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/universal-anti-patterns.md:L35 | neighbors=[Universal Anti-Patterns]
- "references_universal_anti_patterns_subagent_rules": "Subagent Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/universal-anti-patterns.md:L22 | neighbors=[Universal Anti-Patterns]
- "references_update": "update.md" | kind=entity | source=.github/skills/graphify/references/update.md:L1 | neighbors=[graphify reference: incremental update …]
- "references_update_for_cluster_only": "For --cluster-only" | kind=entity | source=.github/skills/graphify/references/update.md:L171 | neighbors=[graphify reference: incremental update …]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-351.json

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
