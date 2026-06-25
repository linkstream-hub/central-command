# Node Description Batch 394 of 412

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

- "workflows_forensics_2a_git_history": "2a. Git History" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L28 | neighbors=[Step 2: Gather Evidence] | lang=pt
- "workflows_forensics_2b_planning_state": "2b. Planning State" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L50 | neighbors=[Step 2: Gather Evidence] | lang=en
- "workflows_forensics_2c_phase_artifacts": "2c. Phase Artifacts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L62 | neighbors=[Step 2: Gather Evidence] | lang=en
- "workflows_forensics_2d_session_reports": "2d. Session Reports" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L79 | neighbors=[Step 2: Gather Evidence] | lang=en
- "workflows_forensics_2e_git_worktree_state": "2e. Git Worktree State" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L84 | neighbors=[Step 2: Gather Evidence] | lang=en
- "workflows_forensics_abandoned_work_detection": "Abandoned Work Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L130 | neighbors=[Step 3: Detect Anomalies] | lang=en
- "workflows_forensics_crash_interruption_detection": "Crash/Interruption Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L142 | neighbors=[Step 3: Detect Anomalies] | lang=en
- "workflows_forensics_missing_artifact_detection": "Missing Artifact Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L109 | neighbors=[Step 3: Detect Anomalies] | lang=en
- "workflows_forensics_partial_plan_drift_detection": "Partial-plan Drift Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L118 | neighbors=[Step 3: Detect Anomalies] | lang=en
- "workflows_forensics_scope_drift_detection": "Scope Drift Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L151 | neighbors=[Step 3: Detect Anomalies] | lang=en
- "workflows_forensics_step_1_get_problem_description": "Step 1: Get Problem Description" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L12 | neighbors=[Forensics Workflow] | lang=en
- "workflows_forensics_step_4_generate_report": "Step 4: Generate Report" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L167 | neighbors=[Forensics Workflow] | lang=en
- "workflows_forensics_step_5_present_report": "Step 5: Present Report" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L234 | neighbors=[Forensics Workflow] | lang=en
- "workflows_forensics_step_6_offer_interactive_investigation": "Step 6: Offer Interactive Investigation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L238 | neighbors=[Forensics Workflow] | lang=en
- "workflows_forensics_step_7_offer_issue_creation": "Step 7: Offer Issue Creation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L250 | neighbors=[Forensics Workflow] | lang=en
- "workflows_forensics_step_8_update_state_md": "Step 8: Update STATE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L272 | neighbors=[Forensics Workflow] | lang=en
- "workflows_forensics_stuck_loop_detection": "Stuck Loop Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L96 | neighbors=[Step 3: Detect Anomalies] | lang=en
- "workflows_forensics_test_regression_detection": "Test Regression Detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/forensics.md:L159 | neighbors=[Step 3: Detect Anomalies] | lang=en
- "workflows_graduation": "graduation.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L1 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graduation_configuration": "Configuration" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L9 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graduation_first_run_behaviour": "First-Run Behaviour" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L184 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graduation_no_op_conditions_silent_skip": "No-Op Conditions (silent skip)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L190 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graduation_step_1_guard_checks": "Step 1: Guard Checks" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L21 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graduation_step_2_collect_learnings_md_files": "Step 2: Collect LEARNINGS.md Files" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L37 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graduation_step_3_cluster_by_lexical_similarity": "Step 3: Cluster by Lexical Similarity" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L52 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graduation_step_4_check_graduation_backlog_in_state_md": "Step 4: Check graduation_backlog in STATE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L66 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graduation_step_5_surface_promotion_candidates": "Step 5: Surface Promotion Candidates" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L84 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graduation_step_6_hitl_process_each_cluster": "Step 6: HITL — Process Each Cluster" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L114 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graduation_step_7_completion_report": "Step 7: Completion Report" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/graduation.md:L169 | neighbors=[graduation.md — LEARNINGS.md Cross-Phas…] | lang=en
- "workflows_graphify": "graphify.md" | kind=entity | source=.agents/workflows/graphify.md:L1 | neighbors=[Workflow: graphify] | lang=en
- "workflows_graphify_workflow_graphify": "Workflow: graphify" | kind=entity | source=.agents/workflows/graphify.md:L6 | neighbors=[graphify.md] | lang=en
- "workflows_help": "help.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L1 | neighbors=[GSD Command Reference] | lang=en
- "workflows_help_capturing_ideas_notes_and_todos": "Capturing Ideas, Notes, and Todos" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L368 | neighbors=[Core Workflow] | lang=en
- "workflows_help_common_workflows": "Common Workflows" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L723 | neighbors=[GSD Command Reference] | lang=en
- "workflows_help_configuration": "Configuration" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L500 | neighbors=[Core Workflow] | lang=en
- "workflows_help_debugging": "Debugging" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L301 | neighbors=[Core Workflow] | lang=en
- "workflows_help_diagnostics_maintenance": "Diagnostics & Maintenance" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L596 | neighbors=[Additional Commands] | lang=en
- "workflows_help_discovery_specification": "Discovery & Specification" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L571 | neighbors=[Additional Commands] | lang=en
- "workflows_help_execution": "Execution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L124 | neighbors=[Core Workflow] | lang=en
- "workflows_help_files_structure": "Files & Structure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/help.md:L634 | neighbors=[GSD Command Reference] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-393.json

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
