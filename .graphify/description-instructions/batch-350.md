# Node Description Batch 351 of 412

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

- "references_tdd_fail_fast_rules": "Fail-Fast Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L263 | neighbors=[Gate Enforcement Rules]
- "references_tdd_gate_definitions": "Gate Definitions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L255 | neighbors=[Gate Enforcement Rules]
- "references_tdd_good_tests_vs_bad_tests": "Good Tests vs Bad Tests" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L116 | neighbors=[tdd.md]
- "references_tdd_red_green_refactor_cycle": "Red-Green-Refactor Cycle" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L92 | neighbors=[tdd.md]
- "references_tdd_review_checkpoint_format": "Review Checkpoint Format" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L289 | neighbors=[End-of-Phase TDD Review Checkpoint]
- "references_tdd_tdd_plan_structure": "TDD Plan Structure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L35 | neighbors=[tdd.md]
- "references_tdd_test_framework_setup_if_none_exists": "Test Framework Setup (If None Exists)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L137 | neighbors=[tdd.md]
- "references_tdd_what_the_review_checks": "What the Review Checks" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L307 | neighbors=[End-of-Phase TDD Review Checkpoint]
- "references_tdd_when_tdd_improves_quality": "When TDD Improves Quality" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L10 | neighbors=[tdd.md]
- "references_thinking_models_debug": "thinking-models-debug.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-debug.md:L1 | neighbors=[Thinking Models: Debug Cluster]
- "references_thinking_models_debug_1_fault_tree_analysis": "1. Fault Tree Analysis" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-debug.md:L11 | neighbors=[Thinking Models: Debug Cluster]
- "references_thinking_models_debug_2_hypothesis_driven_investigation": "2. Hypothesis-Driven Investigation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-debug.md:L17 | neighbors=[Thinking Models: Debug Cluster]
- "references_thinking_models_debug_3_occam_s_razor": "3. Occam's Razor" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-debug.md:L23 | neighbors=[Thinking Models: Debug Cluster]
- "references_thinking_models_debug_4_counterfactual_thinking": "4. Counterfactual Thinking" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-debug.md:L29 | neighbors=[Thinking Models: Debug Cluster]
- "references_thinking_models_debug_conflict_resolution": "Conflict Resolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-debug.md:L7 | neighbors=[Thinking Models: Debug Cluster]
- "references_thinking_models_debug_when_not_to_think": "When NOT to Think" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-debug.md:L37 | neighbors=[Thinking Models: Debug Cluster]
- "references_thinking_models_execution": "thinking-models-execution.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-execution.md:L1 | neighbors=[Thinking Models: Execution Cluster]
- "references_thinking_models_execution_1_circle_of_concern_vs_circle_of_control": "1. Circle of Concern vs Circle of Control" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-execution.md:L11 | neighbors=[Thinking Models: Execution Cluster]
- "references_thinking_models_execution_2_forcing_function": "2. Forcing Function" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-execution.md:L17 | neighbors=[Thinking Models: Execution Cluster]
- "references_thinking_models_execution_3_first_principles_thinking": "3. First Principles Thinking" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-execution.md:L23 | neighbors=[Thinking Models: Execution Cluster]
- "references_thinking_models_execution_4_occam_s_razor": "4. Occam's Razor" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-execution.md:L29 | neighbors=[Thinking Models: Execution Cluster]
- "references_thinking_models_execution_5_chesterton_s_fence": "5. Chesterton's Fence" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-execution.md:L35 | neighbors=[Thinking Models: Execution Cluster]
- "references_thinking_models_execution_conflict_resolution": "Conflict Resolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-execution.md:L7 | neighbors=[Thinking Models: Execution Cluster]
- "references_thinking_models_execution_when_not_to_think": "When NOT to Think" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-execution.md:L43 | neighbors=[Thinking Models: Execution Cluster]
- "references_thinking_models_planning": "thinking-models-planning.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-planning.md:L1 | neighbors=[Thinking Models: Planning Cluster]
- "references_thinking_models_planning_1_pre_mortem_analysis": "1. Pre-Mortem Analysis" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-planning.md:L11 | neighbors=[Thinking Models: Planning Cluster]
- "references_thinking_models_planning_2_mece_decomposition": "2. MECE Decomposition" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-planning.md:L17 | neighbors=[Thinking Models: Planning Cluster]
- "references_thinking_models_planning_3_constraint_analysis": "3. Constraint Analysis" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-planning.md:L23 | neighbors=[Thinking Models: Planning Cluster]
- "references_thinking_models_planning_4_reversibility_test": "4. Reversibility Test" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-planning.md:L29 | neighbors=[Thinking Models: Planning Cluster]
- "references_thinking_models_planning_5_curse_of_knowledge_counter": "5. Curse of Knowledge Counter" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-planning.md:L35 | neighbors=[Thinking Models: Planning Cluster]
- "references_thinking_models_planning_6_base_rate_neglect_counter": "6. Base Rate Neglect Counter" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-planning.md:L41 | neighbors=[Thinking Models: Planning Cluster]
- "references_thinking_models_planning_conflict_resolution": "Conflict Resolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-planning.md:L7 | neighbors=[Thinking Models: Planning Cluster]
- "references_thinking_models_planning_gap_closure_mode_root_cause_check": "Gap Closure Mode: Root-Cause Check" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-planning.md:L47 | neighbors=[Thinking Models: Planning Cluster]
- "references_thinking_models_planning_when_not_to_think": "When NOT to Think" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-planning.md:L55 | neighbors=[Thinking Models: Planning Cluster]
- "references_thinking_models_research": "thinking-models-research.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-research.md:L1 | neighbors=[Thinking Models: Research Cluster]
- "references_thinking_models_research_1_first_principles_thinking": "1. First Principles Thinking" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-research.md:L11 | neighbors=[Thinking Models: Research Cluster]
- "references_thinking_models_research_2_simpson_s_paradox_awareness": "2. Simpson's Paradox Awareness" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-research.md:L17 | neighbors=[Thinking Models: Research Cluster]
- "references_thinking_models_research_3_survivorship_bias": "3. Survivorship Bias" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-research.md:L23 | neighbors=[Thinking Models: Research Cluster]
- "references_thinking_models_research_4_confirmation_bias_counter": "4. Confirmation Bias Counter" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-research.md:L29 | neighbors=[Thinking Models: Research Cluster]
- "references_thinking_models_research_5_steel_man": "5. Steel Man" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-models-research.md:L35 | neighbors=[Thinking Models: Research Cluster]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-350.json

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
