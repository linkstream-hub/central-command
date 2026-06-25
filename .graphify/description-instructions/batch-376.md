# Node Description Batch 377 of 412

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

- "specs_sprint_go_live_validation_task_11_flow_7_clock_out": "Task 11 — Flow 7: Clock Out" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L320 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_12_flow_8_dashboard_live_status_dispatch_view": "Task 12 — Flow 8: Dashboard Live Status (dispatch view)" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L335 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_13_flow_9_archive_a_job_dispatch": "Task 13 — Flow 9: Archive a Job (dispatch)" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L352 | neighbors=[Task List] | lang=pt
- "specs_sprint_go_live_validation_task_14_compile_results_and_flag_failures": "Task 14 — Compile results and flag failures" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L367 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_15_commit_seed_script_results_push_post_to_claude_code": "Task 15 — Commit seed script + results, push, post to Claude Code" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L397 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_2_get_the_preview_deployment_url": "Task 2 — Get the Preview deployment URL" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L66 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_3_create_tech_pwa_scripts_seed_test_data_ts": "Task 3 — Create `tech-pwa/scripts/seed-test-data.ts`" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L82 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_4_run_the_seed_script": "Task 4 — Run the seed script" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L197 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_5_flow_1_tech_login_mobile_browser_or_chrome_devtools_mobile_emulation": "Task 5 — Flow 1: Tech Login (mobile browser or Chrome DevTools mobile emulation)" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L219 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_6_flow_2_job_queue": "Task 6 — Flow 2: Job Queue" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L242 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_7_flow_3_clock_in": "Task 7 — Flow 3: Clock In" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L257 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_8_flow_4_break_start": "Task 8 — Flow 4: Break Start" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L272 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_task_9_flow_5_break_end_attestation": "Task 9 — Flow 5: Break End + Attestation" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L287 | neighbors=[Task List] | lang=en
- "specs_sprint_go_live_validation_what_claude_code_does_with_this_report": "What Claude Code does with this report" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L416 | neighbors=[Claude Code authoring date: 2026-05-27] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup": "SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L1 | neighbors=[SPRINT P3-5 GAS Bridge Cleanup] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_auth_architecture_fix_field_live_and_field_compliance": "Auth architecture fix (field/live and field/compliance)" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L16 | neighbors=[WHAT THIS SPRINT DOES] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_claude_code_review_checklist_do_not_post_spec_to_ag_until_this_block_is_read": "CLAUDE CODE REVIEW CHECKLIST (do not post spec to AG until this block is read)" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L646 | neighbors=[SPRINT P3-5 GAS Bridge Cleanup] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_dead_code_removal_dashboard_api_ts": "Dead code removal (dashboard-api.ts)" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L27 | neighbors=[WHAT THIS SPRINT DOES] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_deletions": "Deletions" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L11 | neighbors=[WHAT THIS SPRINT DOES] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_dev_mode_flag_fix_location_ts": "Dev mode flag fix (location.ts)" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L30 | neighbors=[WHAT THIS SPRINT DOES] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_dual_auth_rule_applies_to_the_two_new_api_dashboard_routes": "DUAL AUTH RULE (applies to the two new `/api/dashboard/` routes)" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L52 | neighbors=[SPRINT P3-5 GAS Bridge Cleanup] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_files_exact_scope_no_changes_outside_this_list": "FILES — EXACT SCOPE (no changes outside this list)" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L35 | neighbors=[SPRINT P3-5 GAS Bridge Cleanup] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_gas_fallback_removal_syncqueue_ts": "GAS fallback removal (syncQueue.ts)" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L21 | neighbors=[WHAT THIS SPRINT DOES] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_post_merge_actions_brandon_after_pr_merges": "POST-MERGE ACTIONS (Brandon, after PR merges)" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L638 | neighbors=[SPRINT P3-5 GAS Bridge Cleanup] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_0_orchestrator_setup": "Task 0 — Orchestrator Setup" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L65 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_1_branch_verify_non_negotiable": "Task 1 — Branch Verify (non-negotiable)" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L68 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_10_create_api_dashboard_compliance_status_route_ts": "Task 10 — Create `/api/dashboard/compliance-status/route.ts`" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L399 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_11_final_gas_reference_sweep": "Task 11 — Final GAS reference sweep" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L442 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_12_typescript_compile_check": "Task 12 — TypeScript compile check" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L459 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_13_ptow_adw_py_diff_gate_first_pass_before_claude_code_review": "Task 13 — `ptow_adw.py` diff gate (first-pass before Claude Code review)" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L467 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_14_separate_session_test_sprint": "Task 14 (SEPARATE SESSION) — Test Sprint" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L492 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_15_merge_after_claude_code_issues_clear_to_merge": "Task 15 — Merge (after Claude Code issues \"Clear to merge\")" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L608 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_2_grep_verification_before_any_code_changes": "Task 2 — Grep verification before any code changes" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L83 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_3_delete_api_exec_route_ts": "Task 3 — Delete `/api/exec/route.ts`" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L106 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_4_rewrite_syncqueue_ts": "Task 4 — Rewrite `syncQueue.ts`" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L116 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_5_fix_dashboard_api_ts": "Task 5 — Fix `dashboard-api.ts`" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L263 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_6_fix_location_ts": "Task 6 — Fix `location.ts`" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L290 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_7_fix_field_live_route_ts": "Task 7 — Fix `field/live/route.ts`" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L312 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_8_fix_field_compliance_route_ts": "Task 8 — Fix `field/compliance/route.ts`" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L334 | neighbors=[NUMBERED TASK LIST] | lang=en
- "specs_sprint_p3_5_gas_bridge_cleanup_task_9_create_api_dashboard_live_status_route_ts": "Task 9 — Create `/api/dashboard/live-status/route.ts`" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md:L355 | neighbors=[NUMBERED TASK LIST] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-376.json

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
