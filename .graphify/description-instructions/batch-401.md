# Node Description Batch 402 of 412

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

- "workflows_sync_skills_limitations": "Limitations" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sync-skills.md:L178 | neighbors=[sync-skills — Cross-Runtime GSD Skill S…] | lang=en
- "workflows_sync_skills_safety_rules": "Safety Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sync-skills.md:L169 | neighbors=[sync-skills — Cross-Runtime GSD Skill S…] | lang=en
- "workflows_sync_skills_step_1_parse_arguments": "Step 1: Parse Arguments" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sync-skills.md:L24 | neighbors=[sync-skills — Cross-Runtime GSD Skill S…] | lang=en
- "workflows_sync_skills_step_2_resolve_skills_roots": "Step 2: Resolve Skills Roots" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sync-skills.md:L56 | neighbors=[sync-skills — Cross-Runtime GSD Skill S…] | lang=en
- "workflows_sync_skills_step_3_compute_diff_per_destination": "Step 3: Compute Diff Per Destination" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sync-skills.md:L85 | neighbors=[sync-skills — Cross-Runtime GSD Skill S…] | lang=it
- "workflows_sync_skills_step_4_print_diff_report": "Step 4: Print Diff Report" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sync-skills.md:L107 | neighbors=[sync-skills — Cross-Runtime GSD Skill S…] | lang=en
- "workflows_sync_skills_step_5_execute_only_when_apply": "Step 5: Execute (only when --apply)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sync-skills.md:L138 | neighbors=[sync-skills — Cross-Runtime GSD Skill S…] | lang=en
- "workflows_thread": "thread.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/thread.md:L1 | neighbors=[Thread Workflow] | lang=en
- "workflows_thread_thread_workflow": "Thread Workflow" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/thread.md:L1 | neighbors=[thread.md] | lang=en
- "workflows_ui_phase_1_initialize": "1. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L19 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_10_present_final_status": "10. Present Final Status" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L266 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_11_commit_if_configured": "11. Commit (if configured)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L298 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_12_update_state": "12. Update State" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L304 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_2_parse_and_validate_phase": "2. Parse and Validate Phase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L58 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_3_check_prerequisites": "3. Check Prerequisites" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L68 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_4_check_existing_ui_spec": "4. Check Existing UI-SPEC" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L92 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_5_spawn_gsd_ui_researcher": "5. Spawn gsd-ui-researcher" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L112 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_6_handle_researcher_return": "6. Handle Researcher Return" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L169 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_7_spawn_gsd_ui_checker": "7. Spawn gsd-ui-checker" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L177 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_8_handle_checker_return": "8. Handle Checker Return" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L222 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_phase_9_revision_loop_max_2_iterations": "9. Revision Loop (Max 2 Iterations)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-phase.md:L230 | neighbors=[ui-phase.md] | lang=en
- "workflows_ui_review_0_initialize": "0. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-review.md:L16 | neighbors=[ui-review.md] | lang=en
- "workflows_ui_review_1_detect_input_state": "1. Detect Input State" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-review.md:L37 | neighbors=[ui-review.md] | lang=en
- "workflows_ui_review_2_gather_context_paths": "2. Gather Context Paths" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-review.md:L59 | neighbors=[ui-review.md] | lang=en
- "workflows_ui_review_3_spawn_gsd_ui_auditor": "3. Spawn gsd-ui-auditor" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-review.md:L67 | neighbors=[ui-review.md] | lang=en
- "workflows_ui_review_4_handle_return": "4. Handle Return" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-review.md:L112 | neighbors=[ui-review.md] | lang=en
- "workflows_ui_review_5_commit_if_configured": "5. Commit (if configured)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-review.md:L176 | neighbors=[ui-review.md] | lang=en
- "workflows_ui_review_automated_ui_verification_when_playwright_mcp_is_available": "Automated UI Verification (when Playwright-MCP is available)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ui-review.md:L156 | neighbors=[ui-review.md] | lang=en
- "workflows_ultraplan_phase": "ultraplan-phase.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ultraplan-phase.md:L1 | neighbors=[Ultraplan Phase Workflow [BETA]] | lang=en
- "workflows_ultraplan_phase_ultraplan_phase_workflow_beta": "Ultraplan Phase Workflow [BETA]" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ultraplan-phase.md:L1 | neighbors=[ultraplan-phase.md] | lang=en
- "workflows_validate_phase_0_initialize": "0. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L16 | neighbors=[validate-phase.md] | lang=en
- "workflows_validate_phase_1_detect_input_state": "1. Detect Input State" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L35 | neighbors=[validate-phase.md] | lang=en
- "workflows_validate_phase_2a_read_phase_artifacts": "2a. Read Phase Artifacts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L48 | neighbors=[2. Discovery] | lang=pt
- "workflows_validate_phase_2b_build_requirement_to_task_map": "2b. Build Requirement-to-Task Map" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L52 | neighbors=[2. Discovery] | lang=en
- "workflows_validate_phase_2c_detect_test_infrastructure": "2c. Detect Test Infrastructure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L56 | neighbors=[2. Discovery] | lang=en
- "workflows_validate_phase_2d_cross_reference": "2d. Cross-Reference" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L66 | neighbors=[2. Discovery] | lang=en
- "workflows_validate_phase_3_gap_analysis": "3. Gap Analysis" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L70 | neighbors=[validate-phase.md] | lang=en
- "workflows_validate_phase_4_present_gap_plan": "4. Present Gap Plan" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L84 | neighbors=[validate-phase.md] | lang=en
- "workflows_validate_phase_5_spawn_gsd_nyquist_auditor": "5. Spawn gsd-nyquist-auditor" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L93 | neighbors=[validate-phase.md] | lang=en
- "workflows_validate_phase_6_generate_update_validation_md": "6. Generate/Update VALIDATION.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/validate-phase.md:L116 | neighbors=[validate-phase.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-401.json

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
