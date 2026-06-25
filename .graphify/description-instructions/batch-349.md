# Node Description Batch 350 of 412

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

- "references_skeleton_template": "skeleton-template.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/skeleton-template.md:L1 | neighbors=[SKELETON.md Template]
- "references_skeleton_template_skeleton_md_template": "SKELETON.md Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/skeleton-template.md:L1 | neighbors=[skeleton-template.md]
- "references_sketch_interactivity": "sketch-interactivity.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-interactivity.md:L1 | neighbors=[Making Sketches Feel Alive]
- "references_sketch_interactivity_fake_the_backend": "Fake the Backend" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-interactivity.md:L22 | neighbors=[Making Sketches Feel Alive]
- "references_sketch_interactivity_implementation": "Implementation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-interactivity.md:L30 | neighbors=[Making Sketches Feel Alive]
- "references_sketch_interactivity_required_interactivity": "Required Interactivity" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-interactivity.md:L5 | neighbors=[Making Sketches Feel Alive]
- "references_sketch_interactivity_state_cycling": "State Cycling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-interactivity.md:L26 | neighbors=[Making Sketches Feel Alive]
- "references_sketch_interactivity_transitions": "Transitions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-interactivity.md:L18 | neighbors=[Making Sketches Feel Alive]
- "references_sketch_theme_system": "sketch-theme-system.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-theme-system.md:L1 | neighbors=[Shared Theme System]
- "references_sketch_theme_system_creating_new_themes": "Creating New Themes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-theme-system.md:L78 | neighbors=[Shared Theme System]
- "references_sketch_theme_system_linking": "Linking" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-theme-system.md:L70 | neighbors=[Shared Theme System]
- "references_sketch_theme_system_setup": "Setup" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-theme-system.md:L5 | neighbors=[Shared Theme System]
- "references_sketch_theme_system_theme_file_structure": "Theme File Structure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-theme-system.md:L17 | neighbors=[Shared Theme System]
- "references_sketch_theme_system_theme_switcher": "Theme Switcher" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-theme-system.md:L84 | neighbors=[Shared Theme System]
- "references_sketch_tooling": "sketch-tooling.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-tooling.md:L1 | neighbors=[Sketch Toolbar]
- "references_sketch_tooling_annotation_mode": "Annotation Mode" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-tooling.md:L39 | neighbors=[Components]
- "references_sketch_tooling_implementation": "Implementation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-tooling.md:L5 | neighbors=[Sketch Toolbar]
- "references_sketch_tooling_styling": "Styling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-tooling.md:L43 | neighbors=[Sketch Toolbar]
- "references_sketch_tooling_theme_switcher": "Theme Switcher" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-tooling.md:L19 | neighbors=[Components]
- "references_sketch_tooling_viewport_preview": "Viewport Preview" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-tooling.md:L29 | neighbors=[Components]
- "references_sketch_variant_patterns": "sketch-variant-patterns.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-variant-patterns.md:L1 | neighbors=[Multi-Variant HTML Patterns]
- "references_sketch_variant_patterns_marking_the_winner": "Marking the Winner" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-variant-patterns.md:L38 | neighbors=[Multi-Variant HTML Patterns]
- "references_sketch_variant_patterns_side_by_side_for_small_variants": "Side-by-Side (for small variants)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-variant-patterns.md:L48 | neighbors=[Multi-Variant HTML Patterns]
- "references_sketch_variant_patterns_synthesis_variants": "Synthesis Variants" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-variant-patterns.md:L75 | neighbors=[Multi-Variant HTML Patterns]
- "references_sketch_variant_patterns_tab_based_variants": "Tab-Based Variants" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-variant-patterns.md:L5 | neighbors=[Multi-Variant HTML Patterns]
- "references_sketch_variant_patterns_variant_count": "Variant Count" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-variant-patterns.md:L69 | neighbors=[Multi-Variant HTML Patterns]
- "references_spidr_splitting": "spidr-splitting.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/spidr-splitting.md:L1 | neighbors=[SPIDR Story Splitting Rules]
- "references_spidr_splitting_anti_patterns_to_reject": "Anti-patterns to reject" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/spidr-splitting.md:L61 | neighbors=[SPIDR Story Splitting Rules]
- "references_spidr_splitting_data": "Data" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/spidr-splitting.md:L38 | neighbors=[The five SPIDR axes]
- "references_spidr_splitting_interfaces": "Interfaces" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/spidr-splitting.md:L32 | neighbors=[The five SPIDR axes]
- "references_spidr_splitting_paths": "Paths" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/spidr-splitting.md:L26 | neighbors=[The five SPIDR axes]
- "references_spidr_splitting_reference": "Reference" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/spidr-splitting.md:L67 | neighbors=[SPIDR Story Splitting Rules]
- "references_spidr_splitting_rules": "Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/spidr-splitting.md:L44 | neighbors=[The five SPIDR axes]
- "references_spidr_splitting_spike": "Spike" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/spidr-splitting.md:L20 | neighbors=[The five SPIDR axes]
- "references_spidr_splitting_when_spidr_triggers": "When SPIDR triggers" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/spidr-splitting.md:L5 | neighbors=[SPIDR Story Splitting Rules]
- "references_spidr_splitting_workflow": "Workflow" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/spidr-splitting.md:L50 | neighbors=[SPIDR Story Splitting Rules]
- "references_tdd_commit_pattern_for_tdd_plans": "Commit Pattern for TDD Plans" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L213 | neighbors=[tdd.md]
- "references_tdd_context_budget": "Context Budget" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L318 | neighbors=[tdd.md]
- "references_tdd_error_handling": "Error Handling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L189 | neighbors=[tdd.md]
- "references_tdd_executor_gate_validation": "Executor Gate Validation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L269 | neighbors=[Gate Enforcement Rules]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-349.json

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
