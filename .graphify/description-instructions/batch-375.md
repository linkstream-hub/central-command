# Node Description Batch 376 of 412

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

- "specs_sprint_cc_full_validation_flow_b_single_job_fetch": "Flow B — Single Job Fetch" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L92 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_c_tech_list": "Flow C — Tech List" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L97 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_d_today_s_schedule": "Flow D — Today's Schedule" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L102 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_e_week_schedule": "Flow E — Week Schedule" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L107 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_f_live_field_status": "Flow F — Live Field Status" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L112 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_g_assign_tech_to_job_wo_assignment": "Flow G — Assign Tech to Job (WO Assignment)" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L117 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_h_schedule_job_wo_scheduling": "Flow H — Schedule Job (WO Scheduling)" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L123 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_i_modify_assignment_change_date": "Flow I — Modify Assignment (Change Date)" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L130 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_j_modify_tech_assignment_change_tech": "Flow J — Modify Tech Assignment (Change Tech)" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L136 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_k_comms_thread_read_session_only": "Flow K — Comms Thread Read (session-only)" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L143 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_l_comms_reply_session_only": "Flow L — Comms Reply (session-only)" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L149 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_m_notifications": "Flow M — Notifications" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L154 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_flow_n_reset_test_job_for_tech_pwa": "Flow N — Reset Test Job for Tech PWA" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L159 | neighbors=[Automated Test Flows (AG runs via Playw…]
- "specs_sprint_cc_full_validation_goal": "Goal" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L8 | neighbors=[Author: Claude Code — Session 106]
- "specs_sprint_cc_full_validation_known_regression_document_remediation_sprint_required": "Known Regression — Document, Remediation Sprint Required" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L17 | neighbors=[Author: Claude Code — Session 106]
- "specs_sprint_cc_full_validation_manual_flow_1_dispatch_dashboard_login": "Manual Flow 1 — Dispatch Dashboard Login" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L171 | neighbors=[Manual Verification — Brandon Does This…]
- "specs_sprint_cc_full_validation_manual_flow_2_view_test_job_in_dispatch_ui": "Manual Flow 2 — View Test Job in Dispatch UI" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L176 | neighbors=[Manual Verification — Brandon Does This…]
- "specs_sprint_cc_full_validation_manual_flow_3_assign_schedule_in_ui_triggers_email": "Manual Flow 3 — Assign + Schedule in UI (triggers email)" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L180 | neighbors=[Manual Verification — Brandon Does This…]
- "specs_sprint_cc_full_validation_manual_flow_4_comms_thread_in_ui": "Manual Flow 4 — Comms Thread in UI" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L186 | neighbors=[Manual Verification — Brandon Does This…]
- "specs_sprint_cc_full_validation_manual_flow_5_reply_to_tenant_via_comms": "Manual Flow 5 — Reply to Tenant via Comms" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L191 | neighbors=[Manual Verification — Brandon Does This…]
- "specs_sprint_cc_full_validation_output_format_artifacts_cc_full_validation_txt": "Output Format — artifacts/cc_full_validation.txt" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L198 | neighbors=[Author: Claude Code — Session 106]
- "specs_sprint_cc_full_validation_prereq_1_add_env_vars_to_tech_pwa_vercel_project_preview_environment": "PREREQ-1: Add env vars to tech-pwa Vercel project (Preview environment)" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L30 | neighbors=[Prerequisites — Brandon must complete b…]
- "specs_sprint_cc_full_validation_prereq_2_confirm_dashboardapi_gs_is_deployed_and_live": "PREREQ-2: Confirm DashboardAPI.gs is deployed and live" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L47 | neighbors=[Prerequisites — Brandon must complete b…]
- "specs_sprint_cc_full_validation_spec_scope_files_ag_may_create_or_modify": "Spec Scope — files AG may create or modify" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L57 | neighbors=[Author: Claude Code — Session 106]
- "specs_sprint_cc_full_validation_sprint_cc_full_system_validation": "SPRINT: CC Full System Validation" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L1 | neighbors=[SPRINT_CC_FULL_VALIDATION.md]
- "specs_sprint_cc_full_validation_status_ready_for_execution": "Status: READY FOR EXECUTION" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L3 | neighbors=[SPRINT_CC_FULL_VALIDATION.md]
- "specs_sprint_cc_full_validation_task_1_verify_prerequisites": "Task 1 — Verify prerequisites" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L250 | neighbors=[AG Terminal Tasks]
- "specs_sprint_cc_full_validation_task_2_write_cc_full_spec_ts": "Task 2 — Write cc-full.spec.ts" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L255 | neighbors=[AG Terminal Tasks]
- "specs_sprint_cc_full_validation_task_3_run_automated_flows": "Task 3 — Run automated flows" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L266 | neighbors=[AG Terminal Tasks]
- "specs_sprint_cc_full_validation_task_4_write_artifacts_cc_full_validation_txt_automated_sections_only": "Task 4 — Write artifacts/cc_full_validation.txt (automated sections only)" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L274 | neighbors=[AG Terminal Tasks]
- "specs_sprint_cc_full_validation_task_5_commit_and_push": "Task 5 — Commit and push" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L277 | neighbors=[AG Terminal Tasks]
- "specs_sprint_go_live_validation_branch_feat_go_live_validation": "Branch: feat/go-live-validation" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L2 | neighbors=[SPRINT_GO_LIVE_VALIDATION.md]
- "specs_sprint_go_live_validation_critical_safety_constraints": "CRITICAL SAFETY CONSTRAINTS" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L16 | neighbors=[Claude Code authoring date: 2026-05-27]
- "specs_sprint_go_live_validation_goal": "Goal" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L8 | neighbors=[Claude Code authoring date: 2026-05-27]
- "specs_sprint_go_live_validation_prerequisites_verify_before_any_code": "Prerequisites — verify before any code" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L39 | neighbors=[Claude Code authoring date: 2026-05-27]
- "specs_sprint_go_live_validation_spec_scope_exact_files_ag_may_touch": "Spec Scope — exact files AG may touch" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L27 | neighbors=[Claude Code authoring date: 2026-05-27]
- "specs_sprint_go_live_validation_sprint_go_live_validation": "SPRINT: Go-Live Validation" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L1 | neighbors=[SPRINT_GO_LIVE_VALIDATION.md]
- "specs_sprint_go_live_validation_status_ready_for_execution": "Status: READY FOR EXECUTION" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L3 | neighbors=[SPRINT_GO_LIVE_VALIDATION.md]
- "specs_sprint_go_live_validation_task_1_branch_verify": "Task 1 — Branch verify" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L49 | neighbors=[Task List]
- "specs_sprint_go_live_validation_task_10_flow_6_job_complete_attestation": "Task 10 — Flow 6: Job Complete + Attestation" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md:L304 | neighbors=[Task List]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-375.json

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
