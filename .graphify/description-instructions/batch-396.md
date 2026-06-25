# Node Description Batch 397 of 412

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

- "workflows_new_project_2b_prior_spike_sketch_detection": "2b. Prior Spike/Sketch Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L286 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_3_deep_questioning": "3. Deep Questioning" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L316 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_4_write_project_md": "4. Write PROJECT.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L382 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_5_1_sub_repo_detection": "5.1. Sub-Repo Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L717 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_5_5_resolve_model_profile": "5.5. Resolve Model Profile" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L749 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_5_workflow_preferences": "5. Workflow Preferences" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L489 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_6_research_decision": "6. Research Decision" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L753 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_7_5_project_structure_mode": "7.5. Project Structure Mode" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L1165 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_7_define_requirements": "7. Define Requirements" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L1011 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_8_create_roadmap": "8. Create Roadmap" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L1180 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_9_done": "9. Done" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L1349 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_auto_mode_detection": "Auto Mode Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L18 | neighbors=[new-project.md] | lang=en
- "workflows_new_workspace_1_setup": "1. Setup" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-workspace.md:L11 | neighbors=[new-workspace.md] | lang=en
- "workflows_new_workspace_2_parse_arguments": "2. Parse Arguments" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-workspace.md:L22 | neighbors=[new-workspace.md] | lang=en
- "workflows_new_workspace_3_select_repos": "3. Select Repos" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-workspace.md:L41 | neighbors=[new-workspace.md] | lang=en
- "workflows_new_workspace_4_select_strategy": "4. Select Strategy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-workspace.md:L91 | neighbors=[new-workspace.md] | lang=en
- "workflows_new_workspace_5_validate": "5. Validate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-workspace.md:L106 | neighbors=[new-workspace.md] | lang=en
- "workflows_new_workspace_7_write_workspace_md": "7. Write WORKSPACE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-workspace.md:L165 | neighbors=[new-workspace.md] | lang=en
- "workflows_new_workspace_8_initialize_planning": "8. Initialize .planning/" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-workspace.md:L187 | neighbors=[new-workspace.md] | lang=en
- "workflows_new_workspace_9_report_and_next_steps": "9. Report and Next Steps" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-workspace.md:L193 | neighbors=[new-workspace.md] | lang=en
- "workflows_new_workspace_for_each_repo": "For each repo:" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-workspace.md:L140 | neighbors=[6. Create Workspace] | lang=en
- "workflows_pause_work": "pause-work.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/pause-work.md:L1 | neighbors=[Context Detection] | lang=en
- "workflows_pause_work_context_detection": "Context Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/pause-work.md:L12 | neighbors=[pause-work.md] | lang=en
- "workflows_plan_milestone_gaps_1_load_audit_results": "1. Load Audit Results" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L11 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_milestone_gaps_10_offer_next_steps": "10. Offer Next Steps" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L159 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_milestone_gaps_2_prioritize_gaps": "2. Prioritize Gaps" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L28 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_milestone_gaps_3_group_gaps_into_phases": "3. Group Gaps into Phases" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L40 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_milestone_gaps_4_determine_phase_numbers": "4. Determine Phase Numbers" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L63 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_milestone_gaps_5_present_gap_closure_plan": "5. Present Gap Closure Plan" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L74 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_milestone_gaps_6_update_roadmap_md": "6. Update ROADMAP.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L111 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_milestone_gaps_7_update_requirements_md_traceability_table_required": "7. Update REQUIREMENTS.md Traceability Table (REQUIRED)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L125 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_milestone_gaps_8_create_phase_directories": "8. Create Phase Directories" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L140 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_milestone_gaps_9_commit_roadmap_and_requirements_update": "9. Commit Roadmap and Requirements Update" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L153 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_milestone_gaps_how_gaps_become_tasks": "How Gaps Become Tasks" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-milestone-gaps.md:L195 | neighbors=[plan-milestone-gaps.md] | lang=en
- "workflows_plan_phase_0_git_branch_invariant": "0. Git Branch Invariant" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L25 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_1_5_closed_phase_gate_3569": "1.5. Closed-Phase Gate (#3569)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L56 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_1_initialize": "1. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L29 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_10_spawn_gsd_plan_checker_agent": "10. Spawn gsd-plan-checker Agent" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1195 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_11_handle_checker_return": "11. Handle Checker Return" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1246 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_11a_filesystem_fallback_checker": "11a. Filesystem Fallback (Checker)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1271 | neighbors=[plan-phase.md] | lang=pt

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-396.json

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
