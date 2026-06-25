# Node Description Batch 396 of 412

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

- "workflows_manager_exit_manager": "Exit Manager" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/manager.md:L215 | neighbors=[4. Handle Action] | lang=en
- "workflows_manager_plan_phase_n": "Plan Phase N" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/manager.md:L242 | neighbors=[4. Handle Action] | lang=en
- "workflows_manager_refresh_dashboard": "Refresh Dashboard" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/manager.md:L211 | neighbors=[4. Handle Action] | lang=en
- "workflows_milestone_summary": "milestone-summary.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/milestone-summary.md:L1 | neighbors=[Milestone Summary Workflow] | lang=en
- "workflows_milestone_summary_step_1_resolve_version": "Step 1: Resolve Version" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/milestone-summary.md:L8 | neighbors=[Milestone Summary Workflow] | lang=en
- "workflows_milestone_summary_step_2_locate_artifacts": "Step 2: Locate Artifacts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/milestone-summary.md:L22 | neighbors=[Milestone Summary Workflow] | lang=en
- "workflows_milestone_summary_step_3_discover_phase_artifacts": "Step 3: Discover Phase Artifacts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/milestone-summary.md:L51 | neighbors=[Milestone Summary Workflow] | lang=en
- "workflows_milestone_summary_step_4_gather_git_statistics": "Step 4: Gather Git Statistics" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/milestone-summary.md:L70 | neighbors=[Milestone Summary Workflow] | lang=en
- "workflows_milestone_summary_step_5_generate_summary_document": "Step 5: Generate Summary Document" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/milestone-summary.md:L106 | neighbors=[Milestone Summary Workflow] | lang=en
- "workflows_milestone_summary_step_6_write_and_commit": "Step 6: Write and Commit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/milestone-summary.md:L179 | neighbors=[Milestone Summary Workflow] | lang=en
- "workflows_milestone_summary_step_7_present_summary": "Step 7: Present Summary" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/milestone-summary.md:L196 | neighbors=[Milestone Summary Workflow] | lang=en
- "workflows_milestone_summary_step_8_offer_interactive_mode": "Step 8: Offer Interactive Mode" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/milestone-summary.md:L200 | neighbors=[Milestone Summary Workflow] | lang=en
- "workflows_milestone_summary_step_9_update_state_md": "Step 9: Update STATE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/milestone-summary.md:L217 | neighbors=[Milestone Summary Workflow] | lang=en
- "workflows_mvp_phase_1_parse_and_validate_phase_argument": "1. Parse and validate phase argument" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/mvp-phase.md:L19 | neighbors=[mvp-phase.md] | lang=en
- "workflows_mvp_phase_2_validate_phase_exists_and_check_status": "2. Validate phase exists and check status" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/mvp-phase.md:L34 | neighbors=[mvp-phase.md] | lang=en
- "workflows_mvp_phase_3_user_story_prompts": "3. User story prompts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/mvp-phase.md:L74 | neighbors=[mvp-phase.md] | lang=en
- "workflows_mvp_phase_4_spidr_splitting_check": "4. SPIDR splitting check" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/mvp-phase.md:L113 | neighbors=[mvp-phase.md] | lang=en
- "workflows_mvp_phase_5_update_roadmap_md": "5. Update ROADMAP.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/mvp-phase.md:L161 | neighbors=[mvp-phase.md] | lang=en
- "workflows_mvp_phase_6_verify_the_write": "6. Verify the write" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/mvp-phase.md:L183 | neighbors=[mvp-phase.md] | lang=en
- "workflows_mvp_phase_7_delegate_to_gsd_plan_phase": "7. Delegate to /gsd plan-phase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/mvp-phase.md:L196 | neighbors=[mvp-phase.md] | lang=en
- "workflows_mvp_phase_8_surface_deferred_phase_splits_if_any": "8. Surface deferred phase splits (if any)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/mvp-phase.md:L202 | neighbors=[mvp-phase.md] | lang=en
- "workflows_mvp_phase_9_exit": "9. Exit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/mvp-phase.md:L217 | neighbors=[mvp-phase.md] | lang=en
- "workflows_new_milestone_1_load_context": "1. Load Context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L22 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_10_5_link_pending_todos_to_roadmap_phases": "10.5. Link Pending Todos to Roadmap Phases" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L536 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_10_create_roadmap": "10. Create Roadmap" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L450 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_11_done": "11. Done" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L586 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_2_5_scan_planted_seeds": "2.5. Scan Planted Seeds" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L49 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_2_gather_milestone_goals": "2. Gather Milestone Goals" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L35 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_3_5_verify_milestone_understanding": "3.5. Verify Milestone Understanding" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L104 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_3_determine_milestone_version": "3. Determine Milestone Version" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L98 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_4_update_project_md": "4. Update PROJECT.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L136 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_5_update_state_md": "5. Update STATE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L174 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_6_cleanup_and_commit": "6. Cleanup and Commit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L204 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_7_5_reset_phase_safety_only_when_reset_phase_numbers": "7.5 Reset-phase safety (only when `--reset-phase-numbers`)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L244 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_7_load_context_and_resolve_models": "7. Load Context and Resolve Models" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L218 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_8_research_decision": "8. Research Decision" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L264 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_milestone_9_define_requirements": "9. Define Requirements" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-milestone.md:L377 | neighbors=[new-milestone.md] | lang=en
- "workflows_new_project_1_setup": "1. Setup" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L55 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_2_brownfield_offer": "2. Brownfield Offer" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L126 | neighbors=[new-project.md] | lang=en
- "workflows_new_project_2a_auto_mode_config_auto_mode_only": "2a. Auto Mode Config (auto mode only)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-project.md:L152 | neighbors=[new-project.md] | lang=pt

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-395.json

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
