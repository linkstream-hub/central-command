# Node Description Batch 349 of 412

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

- "references_planner_revision_step_6_commit": "Step 6: Commit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-revision.md:L55 | neighbors=[Revision Mode — Planner Reference]
- "references_planner_revision_step_7_return_revision_summary": "Step 7: Return Revision Summary" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-revision.md:L61 | neighbors=[Revision Mode — Planner Reference]
- "references_planner_source_audit": "planner-source-audit.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-source-audit.md:L1 | neighbors=[Planner Source Audit & Authority Limits]
- "references_planner_source_audit_authority_limits_constraint_examples": "Authority Limits — Constraint Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-source-audit.md:L59 | neighbors=[Planner Source Audit & Authority Limits]
- "references_planner_source_audit_four_source_types": "Four Source Types" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-source-audit.md:L21 | neighbors=[Multi-Source Coverage Audit Format]
- "references_planner_source_audit_handling_missing_items": "Handling MISSING Items" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-source-audit.md:L35 | neighbors=[Multi-Source Coverage Audit Format]
- "references_planner_source_audit_what_is_not_a_gap": "What is NOT a Gap" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-source-audit.md:L28 | neighbors=[Multi-Source Coverage Audit Format]
- "references_planning_config_advanced_fields": "Advanced Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L348 | neighbors=[Complete Field Reference]
- "references_planning_config_core_fields": "Core Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L225 | neighbors=[Complete Field Reference]
- "references_planning_config_features_fields": "Features Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L305 | neighbors=[Complete Field Reference]
- "references_planning_config_field_interactions": "Field Interactions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L368 | neighbors=[planning-config.md]
- "references_planning_config_git_fields": "Git Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L282 | neighbors=[Complete Field Reference]
- "references_planning_config_hook_fields": "Hook Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L314 | neighbors=[Complete Field Reference]
- "references_planning_config_intel_fields": "Intel Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L330 | neighbors=[Complete Field Reference]
- "references_planning_config_large_codebase_1m_context_with_extended_timeouts": "Large Codebase -- 1M Context with Extended Timeouts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L438 | neighbors=[Example Configurations]
- "references_planning_config_learnings_fields": "Learnings Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L322 | neighbors=[Complete Field Reference]
- "references_planning_config_manager_fields": "Manager Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L338 | neighbors=[Complete Field Reference]
- "references_planning_config_minimal_solo_developer": "Minimal -- Solo Developer" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L392 | neighbors=[Example Configurations]
- "references_planning_config_planning_fields": "Planning Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L357 | neighbors=[Complete Field Reference]
- "references_planning_config_search_api_fields": "Search & API Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L295 | neighbors=[Complete Field Reference]
- "references_planning_config_ship_fields": "Ship Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L274 | neighbors=[Complete Field Reference]
- "references_planning_config_team_project_with_branching": "Team Project with Branching" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L407 | neighbors=[Example Configurations]
- "references_planning_config_workflow_fields": "Workflow Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L242 | neighbors=[Complete Field Reference]
- "references_project_skills_discovery": "project-skills-discovery.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/project-skills-discovery.md:L1 | neighbors=[Project Skills Discovery]
- "references_project_skills_discovery_project_skills_discovery": "Project Skills Discovery" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/project-skills-discovery.md:L1 | neighbors=[project-skills-discovery.md]
- "references_query": "query.md" | kind=entity | source=.github/skills/graphify/references/query.md:L1 | neighbors=[graphify reference: query, path, explain]
- "references_query_for_graphify_explain": "For /graphify explain" | kind=entity | source=.github/skills/graphify/references/query.md:L198 | neighbors=[graphify reference: query, path, explain]
- "references_query_for_graphify_path": "For /graphify path" | kind=entity | source=.github/skills/graphify/references/query.md:L136 | neighbors=[graphify reference: query, path, explain]
- "references_revision_loop": "revision-loop.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/revision-loop.md:L1 | neighbors=[Revision Loop Pattern]
- "references_revision_loop_after_3_iterations": "After 3 Iterations" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/revision-loop.md:L68 | neighbors=[Pattern: Check-Revise-Escalate (max 3 i…]
- "references_revision_loop_flow": "Flow" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/revision-loop.md:L14 | neighbors=[Pattern: Check-Revise-Escalate (max 3 i…]
- "references_revision_loop_important_notes": "Important Notes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/revision-loop.md:L92 | neighbors=[Revision Loop Pattern]
- "references_revision_loop_issue_count_tracking": "Issue Count Tracking" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/revision-loop.md:L37 | neighbors=[Pattern: Check-Revise-Escalate (max 3 i…]
- "references_revision_loop_re_spawn_prompt_structure": "Re-spawn Prompt Structure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/revision-loop.md:L44 | neighbors=[Pattern: Check-Revise-Escalate (max 3 i…]
- "references_revision_loop_workflow_specific_variations": "Workflow-Specific Variations" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/revision-loop.md:L82 | neighbors=[Pattern: Check-Revise-Escalate (max 3 i…]
- "references_scout_codebase": "scout-codebase.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/scout-codebase.md:L1 | neighbors=[Codebase scout — map selection table]
- "references_scout_codebase_no_maps_fallback": "No-maps fallback" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/scout-codebase.md:L32 | neighbors=[Codebase scout — map selection table]
- "references_scout_codebase_output_internal_codebase_context": "Output (internal `<codebase_context>`)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/scout-codebase.md:L42 | neighbors=[Codebase scout — map selection table]
- "references_scout_codebase_phase_type_recommended_maps": "Phase-type → recommended maps" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/scout-codebase.md:L8 | neighbors=[Codebase scout — map selection table]
- "references_scout_codebase_single_read_rule": "Single-read rule" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/scout-codebase.md:L26 | neighbors=[Codebase scout — map selection table]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-348.json

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
