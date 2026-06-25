# Node Description Batch 151 of 412

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

- "archive_antigravity_i18n_spec_files_you_must_not_change": "Files You Must NOT Change" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L38 | neighbors=[ANTIGRAVITY_I18N_SPEC] | lang=en
- "archive_antigravity_i18n_spec_language_toggle": "Language Toggle" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L524 | neighbors=[Verification Steps] | lang=en
- "archive_antigravity_i18n_spec_pluralization_jobs_count": "Pluralization — jobs count" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L444 | neighbors=[Step 4 — Replace Strings in Each Page] | lang=en
- "archive_antigravity_i18n_spec_priority_label_mapping": "Priority label mapping" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L456 | neighbors=[Step 4 — Replace Strings in Each Page] | lang=en
- "archive_antigravity_i18n_spec_quality_gate": "Quality Gate" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L547 | neighbors=[Verification Steps] | lang=en
- "archive_antigravity_i18n_spec_step_5_cameraupload_component": "Step 5 — CameraUpload Component" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L482 | neighbors=[ANTIGRAVITY_I18N_SPEC] | lang=en
- "archive_antigravity_i18n_spec_string_coverage": "String Coverage" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L535 | neighbors=[Verification Steps] | lang=en
- "archive_antigravity_i18n_spec_typescript": "TypeScript" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L521 | neighbors=[Verification Steps] | lang=en
- "archive_antigravity_i18n_spec_what_this_changes": "What This Changes" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L7 | neighbors=[ANTIGRAVITY_I18N_SPEC] | lang=en
- "archive_antigravity_i18n_spec_what_to_keep_unchanged": "What to Keep Unchanged" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L508 | neighbors=[ANTIGRAVITY_I18N_SPEC] | lang=en
- "archive_antigravity_job_comments_spec": "ANTIGRAVITY_JOB_COMMENTS_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — Job Comments: Neon S…] | lang=en
- "archive_antigravity_job_comments_spec_b1_add_messagesquare_to_the_lucide_react_import": "B1 — Add `MessageSquare` to the lucide-react import" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L223 | neighbors=[CHANGE B — MODIFY: `tech-pwa/src/compon…] | lang=en
- "archive_antigravity_job_comments_spec_b2_add_jobcomment_to_the_dashboard_api_import": "B2 — Add `JobComment` to the dashboard-api import" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L266 | neighbors=[CHANGE B — MODIFY: `tech-pwa/src/compon…] | lang=en
- "archive_antigravity_job_comments_spec_b3_add_comments_state_after_existing_state_declarations": "B3 — Add comments state after existing state declarations" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L283 | neighbors=[CHANGE B — MODIFY: `tech-pwa/src/compon…] | lang=en
- "archive_antigravity_job_comments_spec_b4_add_comment_fetch_effect": "B4 — Add comment fetch effect" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L299 | neighbors=[CHANGE B — MODIFY: `tech-pwa/src/compon…] | lang=en
- "archive_antigravity_job_comments_spec_b5_add_handleaddcomment_function": "B5 — Add `handleAddComment` function" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L320 | neighbors=[CHANGE B — MODIFY: `tech-pwa/src/compon…] | lang=en
- "archive_antigravity_job_comments_spec_b6_expand_the_stakeholder_switcher_to_include_notes_tab": "B6 — Expand the stakeholder switcher to include NOTES tab" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L347 | neighbors=[CHANGE B — MODIFY: `tech-pwa/src/compon…] | lang=en
- "archive_antigravity_job_comments_spec_b7_add_notes_panel_content_in_the_comms_scroll_area": "B7 — Add NOTES panel content in the comms scroll area" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L359 | neighbors=[CHANGE B — MODIFY: `tech-pwa/src/compon…] | lang=en
- "archive_antigravity_job_comments_spec_change_a_new_file_tech_pwa_src_app_api_job_comments_jobid_route_ts": "CHANGE A — NEW FILE: `tech-pwa/src/app/api/job-comments/[jobId]/route.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L45 | neighbors=[ANTIGRAVITY SPEC — Job Comments: Neon S…] | lang=pt
- "archive_antigravity_job_comments_spec_change_c_modify_tech_pwa_src_components_dashboard_jobdetailmodal_tsx_contact_card": "CHANGE C — MODIFY: `tech-pwa/src/components/dashboard/JobDetailModal.tsx` (cont…" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L438 | neighbors=[ANTIGRAVITY SPEC — Job Comments: Neon S…] | lang=en
- "archive_antigravity_job_comments_spec_contradiction_detector_read_before_touching_code": "CONTRADICTION DETECTOR — READ BEFORE TOUCHING CODE" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L7 | neighbors=[ANTIGRAVITY SPEC — Job Comments: Neon S…] | lang=en
- "archive_antigravity_job_comments_spec_definition_of_done": "DEFINITION OF DONE" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L478 | neighbors=[ANTIGRAVITY SPEC — Job Comments: Neon S…] | lang=en
- "archive_antigravity_job_comments_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L463 | neighbors=[ANTIGRAVITY SPEC — Job Comments: Neon S…] | lang=en
- "archive_antigravity_job_comments_spec_verified_literals_pulled_from_live_files_by_claude_code": "VERIFIED LITERALS (pulled from live files by Claude Code)" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md:L27 | neighbors=[ANTIGRAVITY SPEC — Job Comments: Neon S…] | lang=en
- "archive_antigravity_kill_sync_spec": "ANTIGRAVITY_KILL_SYNC_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPRINT — Kill the Schedulin…] | lang=en
- "archive_antigravity_kill_sync_spec_change_1_kill_switch_in_scheduleminer_js": "CHANGE 1 — Kill switch in `ScheduleMiner.js`" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md:L24 | neighbors=[ANTIGRAVITY SPRINT — Kill the Schedulin…] | lang=en
- "archive_antigravity_kill_sync_spec_change_2_remove_scheduling_sheet_fallback_from_getweekschedule_in_dashboardapi_gs": "CHANGE 2 — Remove scheduling sheet fallback from `getWeekSchedule` in `Dashboar…" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md:L52 | neighbors=[ANTIGRAVITY SPRINT — Kill the Schedulin…] | lang=en
- "archive_antigravity_kill_sync_spec_context": "CONTEXT" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md:L10 | neighbors=[ANTIGRAVITY SPRINT — Kill the Schedulin…] | lang=en
- "archive_antigravity_kill_sync_spec_dashboardapi_gs_deploy_via_dashboard_api_clasp": "DashboardAPI.gs — deploy via dashboard-api clasp:" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md:L92 | neighbors=[DEPLOYMENT] | lang=en
- "archive_antigravity_kill_sync_spec_scheduleminer_js_deploy_via_root_clasp": "ScheduleMiner.js — deploy via root clasp:" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md:L86 | neighbors=[DEPLOYMENT] | lang=en
- "archive_antigravity_kill_sync_spec_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md:L113 | neighbors=[ANTIGRAVITY SPRINT — Kill the Schedulin…] | lang=en
- "archive_antigravity_kill_sync_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md:L101 | neighbors=[ANTIGRAVITY SPRINT — Kill the Schedulin…] | lang=en
- "archive_antigravity_live_tech_status_spec": "ANTIGRAVITY_LIVE_TECH_STATUS_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_LIVE_TECH_STATUS_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPRINT — Live Tech Availabi…] | lang=en
- "archive_antigravity_live_tech_status_spec_data_source": "DATA SOURCE" | kind=entity | source=specs/archive/ANTIGRAVITY_LIVE_TECH_STATUS_SPEC.md:L21 | neighbors=[ANTIGRAVITY SPRINT — Live Tech Availabi…] | lang=en
- "archive_antigravity_live_tech_status_spec_integration_into_live_page": "INTEGRATION INTO `/live` PAGE" | kind=entity | source=specs/archive/ANTIGRAVITY_LIVE_TECH_STATUS_SPEC.md:L242 | neighbors=[ANTIGRAVITY SPRINT — Live Tech Availabi…] | lang=en
- "archive_antigravity_live_tech_status_spec_new_file_src_components_dashboard_techavailabilitypanel_tsx": "NEW FILE: `src/components/dashboard/TechAvailabilityPanel.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_LIVE_TECH_STATUS_SPEC.md:L36 | neighbors=[ANTIGRAVITY SPRINT — Live Tech Availabi…] | lang=en
- "archive_antigravity_live_tech_status_spec_verification_checklist": "VERIFICATION CHECKLIST" | kind=entity | source=specs/archive/ANTIGRAVITY_LIVE_TECH_STATUS_SPEC.md:L270 | neighbors=[ANTIGRAVITY SPRINT — Live Tech Availabi…] | lang=en
- "archive_antigravity_live_tech_status_spec_what_this_sprint_builds": "WHAT THIS SPRINT BUILDS" | kind=entity | source=specs/archive/ANTIGRAVITY_LIVE_TECH_STATUS_SPEC.md:L9 | neighbors=[ANTIGRAVITY SPRINT — Live Tech Availabi…] | lang=en
- "archive_antigravity_live_tech_status_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_LIVE_TECH_STATUS_SPEC.md:L257 | neighbors=[ANTIGRAVITY SPRINT — Live Tech Availabi…] | lang=en
- "archive_antigravity_logo_spec_apt_logo_login_page_sidebar": "APT Logo — Login Page + Sidebar" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L2 | neighbors=[ANTIGRAVITY_LOGO_SPEC.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-150.json

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
