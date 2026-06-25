# Node Description Batch 169 of 412

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

- "archive_spec_p3_dashboardapi_migration_what_s_already_built_do_not_rebuild": "WHAT'S ALREADY BUILT (do not rebuild)" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L15 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…] | lang=pt
- "archive_spec_p3_dashboardapi_migration_what_stays_in_gas_do_not_migrate_in_this_sprint": "WHAT STAYS IN GAS (do NOT migrate in this sprint)" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L27 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…] | lang=en
- "archive_sprint_6a_inbound_reply": "SPRINT_6A_INBOUND_REPLY.md" | kind=entity | source=specs/archive/SPRINT_6A_INBOUND_REPLY.md:L1 | neighbors=[Sprint 6A — Code.js Inbound Reply Detec…] | lang=pt
- "archive_sprint_6a_inbound_reply_flags_to_claude_code_required_raise_before_any_deploy": "Flags to Claude Code (REQUIRED — raise before any deploy)" | kind=entity | source=specs/archive/SPRINT_6A_INBOUND_REPLY.md:L170 | neighbors=[Sprint 6A — Code.js Inbound Reply Detec…] | lang=en
- "archive_sprint_6a_inbound_reply_task_1_new_next_js_route_post_api_comms_inbound": "Task 1 — New Next.js route: `POST /api/comms/inbound`" | kind=entity | source=specs/archive/SPRINT_6A_INBOUND_REPLY.md:L12 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_6a_inbound_reply_task_2_code_js_helper_getjobidforthread_dispatchsheet_messages": "Task 2 — Code.js helper: `getJobIdForThread(dispatchSheet, messages)`" | kind=entity | source=specs/archive/SPRINT_6A_INBOUND_REPLY.md:L47 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_6a_inbound_reply_task_3_code_js_function_writeinboundreplytoneon_jobid_message": "Task 3 — Code.js function: `writeInboundReplyToNeon(jobId, message)`" | kind=entity | source=specs/archive/SPRINT_6A_INBOUND_REPLY.md:L69 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_6a_inbound_reply_task_4_code_js_hook_into_threadalreadylogged_branch": "Task 4 — Code.js: hook into `threadAlreadyLogged` branch" | kind=entity | source=specs/archive/SPRINT_6A_INBOUND_REPLY.md:L115 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_6a_inbound_reply_task_5_typescript_check_artifacts": "Task 5 — TypeScript check + artifacts" | kind=entity | source=specs/archive/SPRINT_6A_INBOUND_REPLY.md:L151 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_6a_inbound_reply_what_claude_code_reviews_next_session": "What Claude Code reviews next session" | kind=entity | source=specs/archive/SPRINT_6A_INBOUND_REPLY.md:L179 | neighbors=[Sprint 6A — Code.js Inbound Reply Detec…] | lang=en
- "archive_sprint_7_gmail_pubsub": "SPRINT_7_GMAIL_PUBSUB.md" | kind=entity | source=specs/archive/SPRINT_7_GMAIL_PUBSUB.md:L1 | neighbors=[SPRINT 7 — Gmail Cron Inbound Relay] | lang=en
- "archive_sprint_7_gmail_pubsub_architecture": "Architecture" | kind=entity | source=specs/archive/SPRINT_7_GMAIL_PUBSUB.md:L24 | neighbors=[SPRINT 7 — Gmail Cron Inbound Relay] | lang=en
- "archive_sprint_7_gmail_pubsub_brandon_s_credential_setup_complete": "Brandon's Credential Setup — COMPLETE ✅" | kind=entity | source=specs/archive/SPRINT_7_GMAIL_PUBSUB.md:L51 | neighbors=[SPRINT 7 — Gmail Cron Inbound Relay] | lang=en
- "archive_sprint_7_gmail_pubsub_flags_to_claude_code_before_any_deploy_pre_cleared_session_72": "Flags to Claude Code Before Any Deploy — PRE-CLEARED (Session 72)" | kind=entity | source=specs/archive/SPRINT_7_GMAIL_PUBSUB.md:L186 | neighbors=[SPRINT 7 — Gmail Cron Inbound Relay] | lang=en
- "archive_sprint_7_gmail_pubsub_integration_test_after_ag_deploys": "Integration Test (after AG deploys)" | kind=entity | source=specs/archive/SPRINT_7_GMAIL_PUBSUB.md:L202 | neighbors=[SPRINT 7 — Gmail Cron Inbound Relay] | lang=en
- "archive_sprint_7_gmail_pubsub_numbered_task_list": "Numbered Task List" | kind=entity | source=specs/archive/SPRINT_7_GMAIL_PUBSUB.md:L91 | neighbors=[SPRINT 7 — Gmail Cron Inbound Relay] | lang=en
- "archive_sprint_7_gmail_pubsub_schema_change_flag_to_claude_code_before_migration": "Schema Change — FLAG TO CLAUDE CODE BEFORE MIGRATION" | kind=entity | source=specs/archive/SPRINT_7_GMAIL_PUBSUB.md:L72 | neighbors=[SPRINT 7 — Gmail Cron Inbound Relay] | lang=en
- "archive_sprint_7_gmail_pubsub_what_code_js_v81_does_after_this_sprint": "What Code.js v81 Does After This Sprint" | kind=entity | source=specs/archive/SPRINT_7_GMAIL_PUBSUB.md:L196 | neighbors=[SPRINT 7 — Gmail Cron Inbound Relay] | lang=en
- "archive_sprint_7_gmail_pubsub_why_not_pub_sub": "Why Not Pub/Sub" | kind=entity | source=specs/archive/SPRINT_7_GMAIL_PUBSUB.md:L8 | neighbors=[SPRINT 7 — Gmail Cron Inbound Relay] | lang=en
- "archive_sprint_7_gmail_pubsub_why_oauth2_refresh_token_not_service_account_json_key": "Why OAuth2 Refresh Token (not service account JSON key)" | kind=entity | source=specs/archive/SPRINT_7_GMAIL_PUBSUB.md:L16 | neighbors=[SPRINT 7 — Gmail Cron Inbound Relay] | lang=en
- "archive_sprint_9_ui_overhaul": "SPRINT_9_UI_OVERHAUL.md" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L1 | neighbors=[SPRINT 9 — CC UI Overhaul] | lang=en
- "archive_sprint_9_ui_overhaul_design_principles_non_negotiable": "Design Principles (non-negotiable)" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L17 | neighbors=[SPRINT 9 — CC UI Overhaul] | lang=en
- "archive_sprint_9_ui_overhaul_flags_to_claude_code": "Flags to Claude Code" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L257 | neighbors=[SPRINT 9 — CC UI Overhaul] | lang=en
- "archive_sprint_9_ui_overhaul_task_1_extract_website_color_palette_ag_research_flag_before_proceeding": "Task 1 — Extract website color palette (AG research — flag before proceeding)" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L45 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_9_ui_overhaul_task_2_update_globals_css_with_approved_palette": "Task 2 — Update `globals.css` with approved palette" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L64 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_9_ui_overhaul_task_3_dashboardlayout_header_page_title_debug_cleanup": "Task 3 — DashboardLayout header: page title + debug cleanup" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L79 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_9_ui_overhaul_task_4_schedule_page_remove_techavailabilitypanel": "Task 4 — Schedule page: remove TechAvailabilityPanel" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L127 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_9_ui_overhaul_task_5_live_page_remove_dead_state": "Task 5 — Live page: remove dead state" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L178 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_9_ui_overhaul_task_6_live_page_section_heading_cleanup": "Task 6 — Live page: section heading cleanup" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L197 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_9_ui_overhaul_task_7_jobqueuetable_typography_pass": "Task 7 — JobQueueTable: typography pass" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L219 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_9_ui_overhaul_task_8_appsidebar_label_cleanup": "Task 8 — AppSidebar: label cleanup" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L231 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_9_ui_overhaul_task_9_typescript_check_and_diff": "Task 9 — TypeScript check and diff" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L246 | neighbors=[Numbered Task List] | lang=en
- "archive_sprint_9_ui_overhaul_test_sprint_evidence_required": "Test Sprint Evidence Required" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L279 | neighbors=[SPRINT 9 — CC UI Overhaul] | lang=en
- "archive_sprint_9_ui_overhaul_typography_target": "Typography Target" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L26 | neighbors=[SPRINT 9 — CC UI Overhaul] | lang=en
- "archive_sprint_9_ui_overhaul_what_does_not_change": "What Does NOT Change" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L267 | neighbors=[SPRINT 9 — CC UI Overhaul] | lang=en
- "archive_sprint_9_ui_overhaul_what_this_sprint_is_and_is_not": "What This Sprint Is and Is Not" | kind=entity | source=specs/archive/SPRINT_9_UI_OVERHAUL.md:L8 | neighbors=[SPRINT 9 — CC UI Overhaul] | lang=en
- "archive_sprint_p1_professional_infrastructure": "SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L1 | neighbors=[SPRINT P1 — Professional Infrastructure…] | lang=en
- "archive_sprint_p1_professional_infrastructure_ag_prereqs_complete_before_implementation_tasks": "AG Prereqs — Complete Before Implementation Tasks" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L8 | neighbors=[SPRINT P1 — Professional Infrastructure…] | lang=en
- "archive_sprint_p1_professional_infrastructure_flags_to_claude_code": "Flags to Claude Code" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L267 | neighbors=[SPRINT P1 — Professional Infrastructure…] | lang=en
- "archive_sprint_p1_professional_infrastructure_task_1_audit_sentry_current_state": "Task 1 — Audit Sentry current state" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L39 | neighbors=[AG Implementation Tasks] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-168.json

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
