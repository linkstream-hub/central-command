# Node Description Batch 163 of 412

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

- "archive_antigravity_test_mode_spec_1e_add_dev_login_button_to_tech_pwa_src_app_login_page_tsx": "1E — Add Dev Login button to `tech-pwa/src/app/login/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L561 | neighbors=[PART 1 — ENVIRONMENT SETUP]
- "archive_antigravity_test_mode_spec_1f_environment_verification_checklist_complete_before_any_testing": "1F — Environment verification checklist (complete before any testing)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L578 | neighbors=[PART 1 — ENVIRONMENT SETUP]
- "archive_antigravity_test_mode_spec_2_1_modal_opens_correctly": "2.1 Modal Opens Correctly" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L655 | neighbors=[TEST BLOCK 2 — Job Detail Modal]
- "archive_antigravity_test_mode_spec_2_2_gmail_thread_tab": "2.2 Gmail Thread Tab" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L663 | neighbors=[TEST BLOCK 2 — Job Detail Modal]
- "archive_antigravity_test_mode_spec_2_3_suggest_techs_tab": "2.3 Suggest Techs Tab" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L672 | neighbors=[TEST BLOCK 2 — Job Detail Modal]
- "archive_antigravity_test_mode_spec_2_4_job_comments_tab": "2.4 Job Comments Tab" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L679 | neighbors=[TEST BLOCK 2 — Job Detail Modal]
- "archive_antigravity_test_mode_spec_2_5_field_edits_for_a_different_job_open_apt_3007_awaiting_approval": "2.5 Field Edits (for a different job — open APT-3007, Awaiting Approval)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L685 | neighbors=[TEST BLOCK 2 — Job Detail Modal]
- "archive_antigravity_test_mode_spec_2_6_pte_email_open_apt_3005_or_apt_3006_pte_required": "2.6 PTE Email (open APT-3005 or APT-3006, PTE Required)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L693 | neighbors=[TEST BLOCK 2 — Job Detail Modal]
- "archive_antigravity_test_mode_spec_2_7_archive": "2.7 Archive" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L699 | neighbors=[TEST BLOCK 2 — Job Detail Modal]
- "archive_antigravity_test_mode_spec_3_1_schedulingdispatch_component_from_job_detail_modal": "3.1 SchedulingDispatch Component (from Job Detail Modal)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L714 | neighbors=[TEST BLOCK 3 — THE CRITICAL PATH: Sched…]
- "archive_antigravity_test_mode_spec_3_2_dnd_schedule_grid_schedule": "3.2 DnD Schedule Grid (`/schedule`)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L732 | neighbors=[TEST BLOCK 3 — THE CRITICAL PATH: Sched…]
- "archive_antigravity_test_mode_spec_3_3_schedule_view_consistency": "3.3 Schedule View Consistency" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L748 | neighbors=[TEST BLOCK 3 — THE CRITICAL PATH: Sched…]
- "archive_antigravity_test_mode_spec_part_3_test_report_format": "PART 3 — TEST REPORT FORMAT" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L919 | neighbors=[ANTIGRAVITY SPEC — Battle Test Mode + F…]
- "archive_antigravity_test_mode_spec_test_block_10_feedback_feedback": "TEST BLOCK 10 — Feedback (`/feedback`)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L826 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_test_block_11_tech_pwa_clock_flows": "TEST BLOCK 11 — Tech PWA Clock Flows" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L837 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_test_block_12_mobile_viewport": "TEST BLOCK 12 — Mobile Viewport" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L870 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_test_block_13_error_states_offline_behavior": "TEST BLOCK 13 — Error States & Offline Behavior" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L886 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_test_block_14_ag_attempts_to_break_it": "TEST BLOCK 14 — AG Attempts to Break It" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L900 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_test_block_4_live_field_status_live": "TEST BLOCK 4 — Live Field Status (`/live`)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L756 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_test_block_5_calendar_calendar": "TEST BLOCK 5 — Calendar (`/calendar`)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L768 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_test_block_6_team_page_team": "TEST BLOCK 6 — Team Page (`/team`)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L781 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_test_block_7_weekly_schedule_view_weekly_schedule": "TEST BLOCK 7 — Weekly Schedule View (`/weekly-schedule`)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L793 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_test_block_8_hr_module_hr": "TEST BLOCK 8 — HR Module (`/hr`)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L804 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_test_block_9_notifications_bell": "TEST BLOCK 9 — Notifications Bell" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L815 | neighbors=[PART 2 — BATTLE TEST PROTOCOL]
- "archive_antigravity_test_mode_spec_what_must_not_be_done": "WHAT MUST NOT BE DONE" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L956 | neighbors=[ANTIGRAVITY SPEC — Battle Test Mode + F…]
- "archive_antigravity_thread_cleanup_spec": "ANTIGRAVITY_THREAD_CLEANUP_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — Gmail Thread: iMessa…]
- "archive_antigravity_thread_cleanup_spec_add_saveattachmenttodrive_helper": "Add `saveAttachmentToDrive` helper" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L62 | neighbors=[FEATURE 1 — DashboardAPI.gs: Google Dri…]
- "archive_antigravity_thread_cleanup_spec_drive_folder_architecture": "Drive folder architecture" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L33 | neighbors=[FEATURE 1 — DashboardAPI.gs: Google Dri…]
- "archive_antigravity_thread_cleanup_spec_feature_2_tech_pwa_src_lib_types_ts_update_threadattachment": "FEATURE 2 — `tech-pwa/src/lib/types.ts`: Update `ThreadAttachment`" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L149 | neighbors=[ANTIGRAVITY SPEC — Gmail Thread: iMessa…]
- "archive_antigravity_thread_cleanup_spec_feature_3_tech_pwa_src_lib_dashboard_api_ts_pass_address_in_thread_request": "FEATURE 3 — `tech-pwa/src/lib/dashboard-api.ts`: Pass Address in Thread Request" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L166 | neighbors=[ANTIGRAVITY SPEC — Gmail Thread: iMessa…]
- "archive_antigravity_thread_cleanup_spec_files_to_touch": "FILES TO TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L21 | neighbors=[ANTIGRAVITY SPEC — Gmail Thread: iMessa…]
- "archive_antigravity_thread_cleanup_spec_imessage_bubble_render": "iMessage bubble render" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L266 | neighbors=[FEATURE 4 — `JobDetailModal.tsx`: iMess…]
- "archive_antigravity_thread_cleanup_spec_overview": "Overview" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L191 | neighbors=[FEATURE 4 — `JobDetailModal.tsx`: iMess…]
- "archive_antigravity_thread_cleanup_spec_thread_container_scroll_behavior": "Thread container scroll behavior" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L307 | neighbors=[FEATURE 4 — `JobDetailModal.tsx`: iMess…]
- "archive_antigravity_thread_cleanup_spec_update_the_attachment_block_in_getgmailthreadda": "Update the attachment block in `getGmailThreadDA`" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L111 | neighbors=[FEATURE 1 — DashboardAPI.gs: Google Dri…]
- "archive_antigravity_thread_cleanup_spec_updated_attachmentrow_component": "Updated `AttachmentRow` component" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L213 | neighbors=[FEATURE 4 — `JobDetailModal.tsx`: iMess…]
- "archive_antigravity_thread_cleanup_spec_updated_getgmailthreadda_signature": "Updated `getGmailThreadDA` signature" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L47 | neighbors=[FEATURE 1 — DashboardAPI.gs: Google Dri…]
- "archive_antigravity_thread_cleanup_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L317 | neighbors=[ANTIGRAVITY SPEC — Gmail Thread: iMessa…]
- "archive_antigravity_thread_cleanup_spec_what_not_to_change": "WHAT NOT TO CHANGE" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L339 | neighbors=[ANTIGRAVITY SPEC — Gmail Thread: iMessa…]
- "archive_antigravity_thread_cleanup_spec_what_this_builds": "WHAT THIS BUILDS" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md:L11 | neighbors=[ANTIGRAVITY SPEC — Gmail Thread: iMessa…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-162.json

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
