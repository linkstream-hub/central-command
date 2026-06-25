# Node Description Batch 401 of 412

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

- "workflows_sketch_wrap_up_curate_sketches_one_at_a_time": "Curate Sketches One-at-a-Time" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch-wrap-up.md:L45 | neighbors=[sketch-wrap-up.md]
- "workflows_sketch_wrap_up_determine_output_skill_name": "Determine Output Skill Name" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch-wrap-up.md:L94 | neighbors=[sketch-wrap-up.md]
- "workflows_sketch_wrap_up_gather_sketch_inventory": "Gather Sketch Inventory" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch-wrap-up.md:L23 | neighbors=[sketch-wrap-up.md]
- "workflows_sketch_wrap_up_next_up": "▶ Next Up" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch-wrap-up.md:L256 | neighbors=[sketch-wrap-up.md]
- "workflows_sketch_wrap_up_synthesize_reference_files": "Synthesize Reference Files" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch-wrap-up.md:L112 | neighbors=[sketch-wrap-up.md]
- "workflows_sketch_wrap_up_update_project_claude_md": "Update Project CLAUDE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch-wrap-up.md:L220 | neighbors=[sketch-wrap-up.md]
- "workflows_sketch_wrap_up_write_planning_summary": "Write Planning Summary" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch-wrap-up.md:L191 | neighbors=[sketch-wrap-up.md]
- "workflows_sketch_wrap_up_write_skill_md": "Write SKILL.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch-wrap-up.md:L138 | neighbors=[sketch-wrap-up.md]
- "workflows_spec_phase_step_1_initialize": "Step 1: Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spec-phase.md:L56 | neighbors=[spec-phase.md]
- "workflows_spec_phase_step_2_scout_codebase": "Step 2: Scout Codebase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spec-phase.md:L95 | neighbors=[spec-phase.md]
- "workflows_spec_phase_step_3_first_ambiguity_assessment": "Step 3: First Ambiguity Assessment" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spec-phase.md:L115 | neighbors=[spec-phase.md]
- "workflows_spec_phase_step_4_socratic_interview_loop": "Step 4: Socratic Interview Loop" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spec-phase.md:L132 | neighbors=[spec-phase.md]
- "workflows_spec_phase_step_5_covered_inline_ambiguity_scoring_is_per_round": "Step 5: (covered inline — ambiguity scoring is per-round)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spec-phase.md:L187 | neighbors=[spec-phase.md]
- "workflows_spec_phase_step_6_generate_spec_md": "Step 6: Generate SPEC.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spec-phase.md:L189 | neighbors=[spec-phase.md]
- "workflows_spec_phase_step_7_commit": "Step 7: Commit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spec-phase.md:L217 | neighbors=[spec-phase.md]
- "workflows_spec_phase_step_8_wrap_up": "Step 8: Wrap Up" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spec-phase.md:L226 | neighbors=[spec-phase.md]
- "workflows_spike_analyze_for_frontier_spikes": "Analyze for Frontier Spikes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L68 | neighbors=[Frontier Mode — Propose What to Spike N…]
- "workflows_spike_analyze_for_integration_spikes": "Analyze for Integration Spikes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L57 | neighbors=[Frontier Mode — Propose What to Spike N…]
- "workflows_spike_for_each_spike": "For Each Spike:" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L244 | neighbors=[Build Each Spike Sequentially]
- "workflows_spike_get_alignment_and_execute": "Get Alignment and Execute" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L80 | neighbors=[Frontier Mode — Propose What to Spike N…]
- "workflows_spike_load_the_spike_landscape": "Load the Spike Landscape" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L43 | neighbors=[Frontier Mode — Propose What to Spike N…]
- "workflows_spike_next_up": "▶ Next Up" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L420 | neighbors=[spike.md]
- "workflows_spike_re_ground_before_each_spike": "Re-Ground Before Each Spike" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L232 | neighbors=[spike.md]
- "workflows_spike_research_and_briefing_before_each_spike": "Research and Briefing Before Each Spike" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L181 | neighbors=[spike.md]
- "workflows_spike_routing": "Routing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L34 | neighbors=[spike.md]
- "workflows_spike_update_conventions": "Update Conventions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L365 | neighbors=[spike.md]
- "workflows_spike_wrap_up_auto_group_by_feature_area": "Auto-Group by Feature Area" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L63 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_auto_include_all_spikes": "Auto-Include All Spikes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L45 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_copy_source_files": "Copy Source Files" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L82 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_determine_output_skill_name": "Determine Output Skill Name" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L71 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_gather_spike_inventory": "Gather Spike Inventory" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L23 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_generate_or_update_conventions_md": "Generate or Update CONVENTIONS.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L210 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_next_up": "▶ Next Up" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L277 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_synthesize_reference_files": "Synthesize Reference Files" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L94 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_update_project_claude_md": "Update Project CLAUDE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L198 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_what_s_next": "What's Next" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L271 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_write_planning_summary": "Write Planning Summary" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L176 | neighbors=[spike-wrap-up.md]
- "workflows_spike_wrap_up_write_skill_md": "Write SKILL.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike-wrap-up.md:L125 | neighbors=[spike-wrap-up.md]
- "workflows_sync_skills": "sync-skills.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sync-skills.md:L1 | neighbors=[sync-skills — Cross-Runtime GSD Skill S…]
- "workflows_sync_skills_arguments": "Arguments" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sync-skills.md:L9 | neighbors=[sync-skills — Cross-Runtime GSD Skill S…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-400.json

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
