# Node Description Batch 187 of 412

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

- "contexts_review_output_style": "Output Style" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/review.md:L5 | neighbors=[Review Context Profile]
- "contexts_review_verbosity": "Verbosity" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/review.md:L21 | neighbors=[Review Context Profile]
- "continuous_learning_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L1 | neighbors=[Continuous Learning Skill - DEPRECATED]
- "continuous_learning_skill_configuration": "Configuration" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L39 | neighbors=[Continuous Learning Skill - DEPRECATED]
- "continuous_learning_skill_hook_setup": "Hook Setup" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L74 | neighbors=[Continuous Learning Skill - DEPRECATED]
- "continuous_learning_skill_how_it_works": "How It Works" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L31 | neighbors=[Continuous Learning Skill - DEPRECATED]
- "continuous_learning_skill_original_v1_documentation_archival": "Original v1 Documentation (archival)" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L15 | neighbors=[Continuous Learning Skill - DEPRECATED]
- "continuous_learning_skill_pattern_types": "Pattern Types" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L64 | neighbors=[Continuous Learning Skill - DEPRECATED]
- "continuous_learning_skill_potential_v2_enhancements": "Potential v2 Enhancements" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L123 | neighbors=[Comparison Notes (Research: Jan 2025)]
- "continuous_learning_skill_related": "Related" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L98 | neighbors=[Continuous Learning Skill - DEPRECATED]
- "continuous_learning_skill_status": "Status" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L27 | neighbors=[Continuous Learning Skill - DEPRECATED]
- "continuous_learning_skill_vs_homunculus": "vs Homunculus" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L107 | neighbors=[Comparison Notes (Research: Jan 2025)]
- "continuous_learning_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L19 | neighbors=[Continuous Learning Skill - DEPRECATED]
- "continuous_learning_skill_why_stop_hook": "Why Stop Hook?" | kind=entity | source=.github/skills/ecc/continuous-learning/SKILL.md:L92 | neighbors=[Continuous Learning Skill - DEPRECATED]
- "continuous_learning_v2_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L1 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_1_enable_observation_hooks": "1. Enable Observation Hooks" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L153 | neighbors=[Quick Start]
- "continuous_learning_v2_skill_2_initialize_directory_structure": "2. Initialize Directory Structure" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L184 | neighbors=[Quick Start]
- "continuous_learning_v2_skill_3_use_the_instinct_commands": "3. Use the Instinct Commands" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L195 | neighbors=[Quick Start]
- "continuous_learning_v2_skill_backward_compatibility": "Backward Compatibility" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L336 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_commands": "Commands" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L206 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_confidence_scoring": "Confidence Scoring" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L306 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_configuration": "Configuration" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L217 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_data_directory": "Data Directory" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L137 | neighbors=[Project Detection]
- "continuous_learning_v2_skill_file_structure": "File Structure" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L240 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_how_it_works": "How It Works" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L80 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_instinct_promotion_project_global": "Instinct Promotion (Project -> Global)" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L283 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_privacy": "Privacy" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L344 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_related": "Related" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L352 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_scope_decision_guide": "Scope Decision Guide" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L270 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_the_instinct_model": "The Instinct Model" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L47 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_what_s_new_in_v2_1": "What's New in v2.1" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L25 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_what_s_new_in_v2_vs_v1": "What's New in v2 (vs v1)" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L36 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L15 | neighbors=[Continuous Learning v2.1 - Instinct]
- "continuous_learning_v2_skill_why_hooks_vs_skills_for_observation": "Why Hooks vs Skills for Observation?" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/SKILL.md:L327 | neighbors=[Continuous Learning v2.1 - Instinct]
- "council_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L1 | neighbors=[Council]
- "council_skill_1_extract_the_real_question": "1. Extract the real question" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L56 | neighbors=[Workflow]
- "council_skill_2_gather_only_the_necessary_context": "2. Gather only the necessary context" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L65 | neighbors=[Workflow]
- "council_skill_3_form_the_architect_position_first": "3. Form the Architect position first" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L75 | neighbors=[Workflow]
- "council_skill_4_launch_three_independent_voices_in_parallel": "4. Launch three independent voices in parallel" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L84 | neighbors=[Workflow]
- "council_skill_5_synthesize_with_bias_guardrails": "5. Synthesize with bias guardrails" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L117 | neighbors=[Workflow]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-186.json

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
