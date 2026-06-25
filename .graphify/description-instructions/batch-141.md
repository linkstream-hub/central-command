# Node Description Batch 142 of 412

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

- "archive_antigravity_auth_serverside_passcodes_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L209 | neighbors=[Date: April 23, 2026] | lang=pt
- "archive_antigravity_auth_serverside_passcodes_file_dashboard_api_dashboardapi_gs": "File: `dashboard-api/DashboardAPI.gs`" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L18 | neighbors=[TASK 1 — Backend: add validatePasscode …] | lang=en
- "archive_antigravity_auth_serverside_passcodes_file_tech_pwa_src_app_login_page_tsx": "File: `tech-pwa/src/app/login/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L99 | neighbors=[TASK 3 — Frontend: update login/page.ts…] | lang=en
- "archive_antigravity_auth_serverside_passcodes_important_transition_safety": "IMPORTANT: TRANSITION SAFETY" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L181 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_auth_serverside_passcodes_owner_claude_code_executor_antigravity": "Owner: Claude Code | Executor: Antigravity" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L2 | neighbors=[ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md] | lang=en
- "archive_antigravity_auth_serverside_passcodes_step_1a_add_the_action_handler_in_dopost": "Step 1a — Add the action handler in doPost" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L20 | neighbors=[TASK 1 — Backend: add validatePasscode …] | lang=en
- "archive_antigravity_auth_serverside_passcodes_step_1b_add_the_validatepasscode_function": "Step 1b — Add the validatePasscode function" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L29 | neighbors=[TASK 1 — Backend: add validatePasscode …] | lang=en
- "archive_antigravity_auth_serverside_passcodes_step_1c_deploy": "Step 1c — Deploy" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L66 | neighbors=[TASK 1 — Backend: add validatePasscode …] | lang=en
- "archive_antigravity_auth_serverside_passcodes_step_3a_remove_the_hardcoded_passcode_map_and_replace_the_auth_block": "Step 3a — Remove the hardcoded passcode map and replace the auth block" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L101 | neighbors=[TASK 3 — Frontend: update login/page.ts…] | lang=en
- "archive_antigravity_auth_serverside_passcodes_step_3b_the_outer_else_block_is_now_async_ensure_the_function_signature_handles_it": "Step 3b — The outer else block is now async — ensure the function signature han…" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L164 | neighbors=[TASK 3 — Frontend: update login/page.ts…] | lang=en
- "archive_antigravity_auth_serverside_passcodes_step_3c_import_dashboardrequest_if_not_already_imported_at_the_top_of_login_page_tsx": "Step 3c — Import dashboardRequest if not already imported at the top of login/p…" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L171 | neighbors=[TASK 3 — Frontend: update login/page.ts…] | lang=en
- "archive_antigravity_auth_serverside_passcodes_task_2_set_script_properties_in_apps_script_console": "TASK 2 — Set Script Properties in Apps Script console" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L76 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_auth_serverside_passcodes_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L194 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_auth_serverside_passcodes_why": "WHY" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L7 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_backend_security_brief": "ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L1 | neighbors=[ANTIGRAVITY BACKEND SECURITY BRIEF] | lang=en
- "archive_antigravity_backend_security_brief_add_this_helper_function_add_once_near_top_of_techpwa_gs_alongside_other_helpers": "Add this helper function (add once, near top of TechPWA.gs alongside other help…" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L39 | neighbors=[CHANGE 1 — Session Token Hashing (TechP…] | lang=en
- "archive_antigravity_backend_security_brief_current_behavior_in_handlelogin": "Current behavior in `handleLogin`" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L14 | neighbors=[CHANGE 1 — Session Token Hashing (TechP…] | lang=en
- "archive_antigravity_backend_security_brief_current_behavior_in_validatetoken": "Current behavior in `validateToken`" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L47 | neighbors=[CHANGE 1 — Session Token Hashing (TechP…] | lang=en
- "archive_antigravity_backend_security_brief_deployment_instructions_antigravity_does_not_deploy_claude_code_verifies_first": "DEPLOYMENT INSTRUCTIONS (Antigravity does NOT deploy — Claude Code verifies fir…" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L174 | neighbors=[ANTIGRAVITY BACKEND SECURITY BRIEF] | lang=en
- "archive_antigravity_backend_security_brief_find_this_pattern_in_code_js_there_may_be_1_3_occurrences": "Find this pattern in Code.js (there may be 1–3 occurrences)" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L88 | neighbors=[CHANGE 2 — GEMINI_MODEL Script Property…] | lang=en
- "archive_antigravity_backend_security_brief_new_behavior_in_handlelogin": "New behavior in `handleLogin`" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L26 | neighbors=[CHANGE 1 — Session Token Hashing (TechP…] | lang=en
- "archive_antigravity_backend_security_brief_new_behavior_in_validatetoken": "New behavior in `validateToken`" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L63 | neighbors=[CHANGE 1 — Session Token Hashing (TechP…] | lang=en
- "archive_antigravity_backend_security_brief_pattern_to_apply": "Pattern to apply" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L114 | neighbors=[CHANGE 3 — Error Alerting at Entry Poin…] | lang=en
- "archive_antigravity_backend_security_brief_replace_with": "Replace with" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L96 | neighbors=[CHANGE 2 — GEMINI_MODEL Script Property…] | lang=en
- "archive_antigravity_backend_security_brief_verification_claude_code_checks_after_antigravity_commits": "VERIFICATION (Claude Code checks after Antigravity commits)" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L186 | neighbors=[ANTIGRAVITY BACKEND SECURITY BRIEF] | lang=en
- "archive_antigravity_backend_security_brief_why": "Why" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L11 | neighbors=[CHANGE 1 — Session Token Hashing (TechP…] | lang=en
- "archive_antigravity_backend_security_brief_why_111": "Why" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L111 | neighbors=[CHANGE 3 — Error Alerting at Entry Poin…] | lang=en
- "archive_antigravity_backend_security_brief_why_85": "Why" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L85 | neighbors=[CHANGE 2 — GEMINI_MODEL Script Property…] | lang=en
- "archive_antigravity_battletest_rerun_spec_antigravity_battle_test_re_run_spec": "ANTIGRAVITY BATTLE TEST — RE-RUN SPEC" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L1 | neighbors=[ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md] | lang=en
- "archive_antigravity_battletest_rerun_spec_b_1_status_change_in_job_detail_modal_was_spec_item_3_3": "B.1 — Status Change in Job Detail Modal (was spec item 3.3)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L53 | neighbors=[PART B — CORRECT INTERACTION ITEMS (Ses…] | lang=en
- "archive_antigravity_battletest_rerun_spec_b_2_schedule_via_hover_button_replaces_dnd_for_ag_testing": "B.2 — Schedule via Hover Button (replaces DnD for AG testing)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L63 | neighbors=[PART B — CORRECT INTERACTION ITEMS (Ses…] | lang=en
- "archive_antigravity_battletest_rerun_spec_b_3_command_palette_was_spec_item_7_1": "B.3 — Command Palette (was spec item 7.1)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L77 | neighbors=[PART B — CORRECT INTERACTION ITEMS (Ses…] | lang=en
- "archive_antigravity_battletest_rerun_spec_b_4_mark_complete_flow_was_spec_item_17_19": "B.4 — Mark Complete flow (was spec item 17–19)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L85 | neighbors=[PART B — CORRECT INTERACTION ITEMS (Ses…] | lang=en
- "archive_antigravity_battletest_rerun_spec_c_1_dnd_edge_cases_original_spec_block_6_adapted_for_no_drag": "C.1 — DnD Edge Cases (original spec Block 6, adapted for no-drag)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L108 | neighbors=[PART C — SKIPPED SPEC BLOCKS] | lang=en
- "archive_antigravity_battletest_rerun_spec_c_10_tech_pwa_break_attempts_original_spec_block_20_selected_items": "C.10 — Tech PWA: Break Attempts (original spec Block 20, selected items)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L206 | neighbors=[PART C — SKIPPED SPEC BLOCKS] | lang=en
- "archive_antigravity_battletest_rerun_spec_c_2_queue_and_modal_break_attempts_original_spec_block_7": "C.2 — Queue and Modal Break Attempts (original spec Block 7)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L116 | neighbors=[PART C — SKIPPED SPEC BLOCKS] | lang=en
- "archive_antigravity_battletest_rerun_spec_c_3_status_transitions_and_data_integrity_original_spec_block_8": "C.3 — Status Transitions and Data Integrity (original spec Block 8)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L134 | neighbors=[PART C — SKIPPED SPEC BLOCKS] | lang=en
- "archive_antigravity_battletest_rerun_spec_c_4_session_47_feature_verification_original_spec_block_9": "C.4 — Session 47 Feature Verification (original spec Block 9)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L144 | neighbors=[PART C — SKIPPED SPEC BLOCKS] | lang=en
- "archive_antigravity_battletest_rerun_spec_c_5_navigation_edge_cases_original_spec_block_10": "C.5 — Navigation Edge Cases (original spec Block 10)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L156 | neighbors=[PART C — SKIPPED SPEC BLOCKS] | lang=en
- "archive_antigravity_battletest_rerun_spec_c_6_mobile_viewport_original_spec_block_11": "C.6 — Mobile Viewport (original spec Block 11)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L168 | neighbors=[PART C — SKIPPED SPEC BLOCKS] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-141.json

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
