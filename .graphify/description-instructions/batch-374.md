# Node Description Batch 375 of 412

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

- "specs_spec_p2a_ci_hardening_task_4_update_professional_baseline_md": "Task 4 — Update `PROFESSIONAL_BASELINE.md`" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L151 | neighbors=[TASKS] | lang=en
- "specs_spec_p2a_ci_hardening_task_5_tsc_diff": "Task 5 — tsc + diff" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L180 | neighbors=[TASKS] | lang=en
- "specs_spec_p2a_ci_hardening_task_6_separate_session_test_sprint": "Task 6 (separate session) — Test sprint" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L193 | neighbors=[TASKS] | lang=en
- "specs_spec_p2a_ci_hardening_task_7_merge_after_clear_to_merge": "Task 7 — Merge after \"Clear to merge\"" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L228 | neighbors=[TASKS] | lang=en
- "specs_sprint_8_cf_worker_techpwa_after_this_sprint_remaining_security_gaps": "After This Sprint — Remaining Security Gaps" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md:L314 | neighbors=[SPRINT 8 — Cloudflare Worker: TechPWA.g…] | lang=en
- "specs_sprint_8_cf_worker_techpwa_architecture": "Architecture" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md:L16 | neighbors=[SPRINT 8 — Cloudflare Worker: TechPWA.g…] | lang=en
- "specs_sprint_8_cf_worker_techpwa_brandon_s_setup_dashboard_only_no_terminal": "Brandon's Setup (dashboard-only — no terminal)" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md:L56 | neighbors=[SPRINT 8 — Cloudflare Worker: TechPWA.g…] | lang=en
- "specs_sprint_8_cf_worker_techpwa_cors_note": "CORS note" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md:L50 | neighbors=[SPRINT 8 — Cloudflare Worker: TechPWA.g…] | lang=en
- "specs_sprint_8_cf_worker_techpwa_flags_to_claude_code_before_deploy": "Flags to Claude Code Before Deploy" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md:L280 | neighbors=[SPRINT 8 — Cloudflare Worker: TechPWA.g…] | lang=en
- "specs_sprint_8_cf_worker_techpwa_numbered_task_list": "Numbered Task List" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md:L102 | neighbors=[SPRINT 8 — Cloudflare Worker: TechPWA.g…] | lang=en
- "specs_sprint_8_cf_worker_techpwa_rollback": "Rollback" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md:L304 | neighbors=[SPRINT 8 — Cloudflare Worker: TechPWA.g…] | lang=en
- "specs_sprint_8_cf_worker_techpwa_security_gap_being_closed": "Security Gap Being Closed" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md:L8 | neighbors=[SPRINT 8 — Cloudflare Worker: TechPWA.g…] | lang=en
- "specs_sprint_8_cf_worker_techpwa_what_does_not_change": "What Does NOT Change" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md:L295 | neighbors=[SPRINT 8 — Cloudflare Worker: TechPWA.g…] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_contradiction_detector_run_before_task_1": "CONTRADICTION DETECTOR — RUN BEFORE TASK 1" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L47 | neighbors=[SPRINT: ADW FLAG Gate + Hook Suite] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_goal": "GOAL" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L7 | neighbors=[SPRINT: ADW FLAG Gate + Hook Suite] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_scope_exact_file_list": "SCOPE — EXACT FILE LIST" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L17 | neighbors=[SPRINT: ADW FLAG Gate + Hook Suite] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_1_branch_setup": "Task 1 — Branch setup" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L55 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_10_claude_settings_json_add_new_hook_registrations": "Task 10 — `.claude/settings.json`: add new hook registrations" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L313 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_11_claude_agents_diff_reviewer_md": "Task 11 — `.claude/agents/diff-reviewer.md`" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L416 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_12_claude_agents_ag_plan_reviewer_md": "Task 12 — `.claude/agents/ag-plan-reviewer.md`" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L452 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_13_claude_agents_meta_agent_md": "Task 13 — `.claude/agents/meta-agent.md`" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L498 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_14_claude_commands_load_bundle_md": "Task 14 — `.claude/commands/load_bundle.md`" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L518 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_15_claude_commands_background_md": "Task 15 — `.claude/commands/background.md`" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L527 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_16_claude_commands_scout_md": "Task 16 — `.claude/commands/scout.md`" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L536 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_17_gitignore_add_new_ignored_directories": "Task 17 — `.gitignore`: add new ignored directories" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L568 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_18_compile_push_diff_wait_for_pass": "Task 18 — Compile + push + diff (WAIT FOR PASS)" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L580 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_19_test_sprint_separate_session_wait_for_clear_to_merge": "Task 19 — Test sprint (separate session, WAIT FOR CLEAR-TO-MERGE)" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L599 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_2_ptow_adw_py_add_notify_flag_gate_function": "Task 2 — ptow_adw.py: add `_notify_flag_gate()` function" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L66 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_20_merge": "Task 20 — Merge" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L665 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_3_ptow_adw_py_override_flag_arg_flag_branch_update": "Task 3 — ptow_adw.py: `--override-flag` arg + FLAG branch update" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L110 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_4_n8n_flag_gate_workflow_build_in_n8n_ui": "Task 4 — n8n FLAG Gate workflow (build in n8n UI)" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L165 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_5_export_flag_gate_workflow": "Task 5 — Export FLAG gate workflow" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L227 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_6_claude_hooks_dangerous_command_blocker_py": "Task 6 — `.claude/hooks/dangerous_command_blocker.py`" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L242 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_7_claude_hooks_universal_hook_logger_py": "Task 7 — `.claude/hooks/universal_hook_logger.py`" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L274 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_8_claude_hooks_pre_compact_py": "Task 8 — `.claude/hooks/pre_compact.py`" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L285 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_adw_flag_gate_and_hooks_task_9_claude_hooks_subagent_stop_py": "Task 9 — `.claude/hooks/subagent_stop.py`" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md:L298 | neighbors=[TASK LIST] | lang=en
- "specs_sprint_cc_full_validation_auth_model_critical": "Auth Model — Critical" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L66 | neighbors=[Author: Claude Code — Session 106] | lang=en
- "specs_sprint_cc_full_validation_branch_feat_go_live_validation": "Branch: feat/go-live-validation" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L2 | neighbors=[SPRINT_CC_FULL_VALIDATION.md] | lang=en
- "specs_sprint_cc_full_validation_execution_order": "Execution Order" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L289 | neighbors=[Author: Claude Code — Session 106] | lang=en
- "specs_sprint_cc_full_validation_flow_a_job_list_dispatch_queue": "Flow A — Job List (Dispatch Queue)" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L87 | neighbors=[Automated Test Flows (AG runs via Playw…] | lang=pt

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-374.json

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
