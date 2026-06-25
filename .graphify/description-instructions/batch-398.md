# Node Description Batch 399 of 412

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

- "workflows_plan_review_convergence_2_initialize": "2. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-review-convergence.md:L62 | neighbors=[plan-review-convergence.md] | lang=en
- "workflows_plan_review_convergence_3_validate_phase_pre_flight_gate": "3. Validate Phase + Pre-flight Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-review-convergence.md:L75 | neighbors=[plan-review-convergence.md] | lang=en
- "workflows_plan_review_convergence_4_initial_planning_if_no_plans_exist": "4. Initial Planning (if no plans exist)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-review-convergence.md:L94 | neighbors=[plan-review-convergence.md] | lang=en
- "workflows_plan_review_convergence_5a_review_spawn_agent": "5a. Review (Spawn Agent)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-review-convergence.md:L132 | neighbors=[5. Convergence Loop] | lang=pt
- "workflows_plan_review_convergence_5b_extract_high_count_from_cycle_summary_contract": "5b. Extract HIGH Count from CYCLE_SUMMARY Contract" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-review-convergence.md:L185 | neighbors=[5. Convergence Loop] | lang=en
- "workflows_plan_review_convergence_5c_stall_detection_escalation_check": "5c. Stall Detection + Escalation Check" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-review-convergence.md:L236 | neighbors=[5. Convergence Loop] | lang=en
- "workflows_plan_review_convergence_5d_replan_spawn_agent": "5d. Replan (Spawn Agent)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-review-convergence.md:L288 | neighbors=[5. Convergence Loop] | lang=en
- "workflows_profile_user_1_initialize": "1. Initialize" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L18 | neighbors=[profile-user.md] | lang=en
- "workflows_profile_user_10_summary_refresh_diff": "10. Summary & Refresh Diff" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L378 | neighbors=[profile-user.md] | lang=en
- "workflows_profile_user_2_consent_gate_actv_06": "2. Consent Gate (ACTV-06)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L61 | neighbors=[profile-user.md] | lang=en
- "workflows_profile_user_3_session_scan": "3. Session Scan" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L127 | neighbors=[profile-user.md] | lang=en
- "workflows_profile_user_4a_session_analysis_path": "4a. Session Analysis Path" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L147 | neighbors=[profile-user.md] | lang=pt
- "workflows_profile_user_4b_questionnaire_path": "4b. Questionnaire Path" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L198 | neighbors=[profile-user.md] | lang=en
- "workflows_profile_user_5_split_resolution": "5. Split Resolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L243 | neighbors=[profile-user.md] | lang=en
- "workflows_profile_user_6_profile_write": "6. Profile Write" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L269 | neighbors=[profile-user.md] | lang=en
- "workflows_profile_user_7_result_display": "7. Result Display" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L281 | neighbors=[profile-user.md] | lang=en
- "workflows_profile_user_8_artifact_selection_actv_05": "8. Artifact Selection (ACTV-05)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L332 | neighbors=[profile-user.md] | lang=en
- "workflows_profile_user_9_artifact_generation": "9. Artifact Generation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/profile-user.md:L346 | neighbors=[profile-user.md] | lang=en
- "workflows_progress": "progress.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/progress.md:L1 | neighbors=[Forensic Integrity Audit] | lang=en
- "workflows_progress_forensic_integrity_audit": "Forensic Integrity Audit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/progress.md:L536 | neighbors=[progress.md] | lang=en
- "workflows_reapply_patches": "reapply-patches.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L1 | neighbors=[Reapply Local Patches Workflow] | lang=en
- "workflows_reapply_patches_5a_deterministic_verifier_binding_gate_2969": "5a: Deterministic verifier (binding gate, #2969)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L274 | neighbors=[Step 5: Hunk Verification Gate] | lang=pt
- "workflows_reapply_patches_5b_hunk_verification_table_review_advisory_gate_1999": "5b: Hunk Verification Table review (advisory gate, #1999)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L327 | neighbors=[Step 5: Hunk Verification Gate] | lang=en
- "workflows_reapply_patches_git_enhanced_two_way_merge": "Git-enhanced two-way merge" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L226 | neighbors=[Step 4: Merge each file] | lang=en
- "workflows_reapply_patches_option_a_pristine_hash_from_backup_meta_json_git_history_most_reliable": "Option A: Pristine hash from backup-meta.json + git history (most reliable)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L128 | neighbors=[Step 2: Determine baseline for three-wa…] | lang=en
- "workflows_reapply_patches_option_b_pristine_snapshot_directory": "Option B: Pristine snapshot directory" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L165 | neighbors=[Step 2: Determine baseline for three-wa…] | lang=en
- "workflows_reapply_patches_option_c_no_baseline_available_two_way_fallback": "Option C: No baseline available (two-way fallback)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L172 | neighbors=[Step 2: Determine baseline for three-wa…] | lang=en
- "workflows_reapply_patches_post_merge_verification": "Post-merge verification" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L237 | neighbors=[Step 4: Merge each file] | lang=en
- "workflows_reapply_patches_step_1_detect_backed_up_patches": "Step 1: Detect backed-up patches" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L11 | neighbors=[Reapply Local Patches Workflow] | lang=en
- "workflows_reapply_patches_step_3_show_patch_summary": "Step 3: Show patch summary" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L175 | neighbors=[Reapply Local Patches Workflow] | lang=en
- "workflows_reapply_patches_step_6_cleanup_option": "Step 6: Cleanup option" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L360 | neighbors=[Reapply Local Patches Workflow] | lang=en
- "workflows_reapply_patches_step_7_report": "Step 7: Report" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L366 | neighbors=[Reapply Local Patches Workflow] | lang=en
- "workflows_reapply_patches_three_way_merge_when_baseline_is_available": "Three-way merge (when baseline is available)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L199 | neighbors=[Step 4: Merge each file] | lang=en
- "workflows_reapply_patches_two_way_merge_fallback_when_no_baseline": "Two-way merge (fallback when no baseline)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L211 | neighbors=[Step 4: Merge each file] | lang=en
- "workflows_remove_workspace_1_setup": "1. Setup" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/remove-workspace.md:L11 | neighbors=[remove-workspace.md] | lang=en
- "workflows_remove_workspace_2_safety_checks": "2. Safety Checks" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/remove-workspace.md:L35 | neighbors=[remove-workspace.md] | lang=en
- "workflows_remove_workspace_3_confirm_removal": "3. Confirm Removal" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/remove-workspace.md:L52 | neighbors=[remove-workspace.md] | lang=en
- "workflows_remove_workspace_4_clean_up_worktrees": "4. Clean Up Worktrees" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/remove-workspace.md:L61 | neighbors=[remove-workspace.md] | lang=en
- "workflows_remove_workspace_5_delete_workspace_directory": "5. Delete Workspace Directory" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/remove-workspace.md:L87 | neighbors=[remove-workspace.md] | lang=en
- "workflows_remove_workspace_6_report": "6. Report" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/remove-workspace.md:L98 | neighbors=[remove-workspace.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-398.json

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
