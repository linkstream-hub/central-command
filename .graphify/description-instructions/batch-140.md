# Node Description Batch 141 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
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

- "api_reference_post_api_schedule_lock_and_send": "POST `/api/schedule/lock-and-send`" | kind=entity | source=docs/api/reference.md:L653 | neighbors=[Schedule] | lang=en
- "api_reference_post_api_webhooks_n8n_gmail": "POST `/api/webhooks/n8n/gmail`" | kind=entity | source=docs/api/reference.md:L906 | neighbors=[Webhooks] | lang=en
- "api_reference_rate_limiting": "Rate Limiting" | kind=entity | source=docs/api/reference.md:L79 | neighbors=[APT Central Command — API Reference] | lang=en
- "api_reference_staff_auth_google_oauth": "Staff Auth (Google OAuth)" | kind=entity | source=docs/api/reference.md:L12 | neighbors=[Authentication] | lang=en
- "api_reference_standard_response_envelope": "Standard Response Envelope" | kind=entity | source=docs/api/reference.md:L68 | neighbors=[APT Central Command — API Reference] | lang=en
- "app_global_error_globalerror": "GlobalError()" | kind=code-symbol | source=tech-pwa/src/app/global-error.tsx:L6 | neighbors=[global-error.tsx] | lang=en
- "app_layout_metadata": "metadata" | kind=code-symbol | source=tech-pwa/src/app/layout.tsx:L13 | neighbors=[layout.tsx] | lang=en
- "app_layout_rootlayout": "RootLayout()" | kind=code-symbol | source=tech-pwa/src/app/layout.tsx:L23 | neighbors=[layout.tsx] | lang=en
- "app_layout_viewport": "viewport" | kind=code-symbol | source=tech-pwa/src/app/layout.tsx:L19 | neighbors=[layout.tsx] | lang=en
- "app_manifest_manifest": "manifest()" | kind=code-symbol | source=tech-pwa/src/app/manifest.ts:L3 | neighbors=[manifest.ts] | lang=en
- "aptmaintenanceinc_com_prompts_cursor": "cursor.md" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/cursor.md:L1 | neighbors=[Design brief] | lang=en
- "aptmaintenanceinc_com_prompts_cursor_sections": "Sections" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/cursor.md:L14 | neighbors=[Design brief] | lang=en
- "aptmaintenanceinc_com_prompts_cursor_tokens": "Tokens" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/cursor.md:L5 | neighbors=[Design brief] | lang=en
- "aptmaintenanceinc_com_prompts_recipe_button": "recipe-button.md" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/recipe-button.md:L1 | neighbors=[Recipe: button] | lang=en
- "aptmaintenanceinc_com_prompts_recipe_button_anatomy_detected": "Anatomy (detected)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/recipe-button.md:L7 | neighbors=[Recipe: button] | lang=en
- "aptmaintenanceinc_com_prompts_recipe_input": "recipe-input.md" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/recipe-input.md:L1 | neighbors=[Recipe: input] | lang=en
- "aptmaintenanceinc_com_prompts_recipe_input_anatomy_detected": "Anatomy (detected)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/recipe-input.md:L7 | neighbors=[Recipe: input] | lang=en
- "archive_antigravity_12mo_schedule_spec": "ANTIGRAVITY_12MO_SCHEDULE_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPRINT — 12-Month Schedulin…] | lang=en
- "archive_antigravity_12mo_schedule_spec_change_1_raise_the_week_navigation_ceiling_to_52_weeks": "Change 1 — Raise the week navigation ceiling to 52 weeks" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L264 | neighbors=[FRONTEND: `tech-pwa/src/app/schedule/pa…] | lang=en
- "archive_antigravity_12mo_schedule_spec_change_1_route_body_into_getweekschedule": "Change 1 — Route `body` into `getWeekSchedule`" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L33 | neighbors=[BACKEND: `dashboard-api/DashboardAPI.gs`] | lang=en
- "archive_antigravity_12mo_schedule_spec_change_2_add_month_jump_row_above_the_week_navigation": "Change 2 — Add month-jump row above the week navigation" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L278 | neighbors=[FRONTEND: `tech-pwa/src/app/schedule/pa…] | lang=en
- "archive_antigravity_12mo_schedule_spec_change_2_rewrite_getweekschedule_to_accept_and_use_weekstart": "Change 2 — Rewrite `getWeekSchedule` to accept and use `weekStart`" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L44 | neighbors=[BACKEND: `dashboard-api/DashboardAPI.gs`] | lang=en
- "archive_antigravity_12mo_schedule_spec_change_3_render_the_month_jump_row_in_jsx": "Change 3 — Render the month-jump row in JSX" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L326 | neighbors=[FRONTEND: `tech-pwa/src/app/schedule/pa…] | lang=en
- "archive_antigravity_12mo_schedule_spec_change_3_use_dq_col_18_as_primary_source_for_all_weeks": "Change 3 — Use DQ col 18 as primary source for ALL weeks" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L101 | neighbors=[BACKEND: `dashboard-api/DashboardAPI.gs`] | lang=en
- "archive_antigravity_12mo_schedule_spec_change_4_empty_state_for_future_weeks": "Change 4 — Empty state for future weeks" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L361 | neighbors=[FRONTEND: `tech-pwa/src/app/schedule/pa…] | lang=en
- "archive_antigravity_12mo_schedule_spec_the_root_cause_read_this_first": "THE ROOT CAUSE (read this first)" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L18 | neighbors=[ANTIGRAVITY SPRINT — 12-Month Schedulin…] | lang=en
- "archive_antigravity_12mo_schedule_spec_verification_checklist": "VERIFICATION CHECKLIST" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L397 | neighbors=[ANTIGRAVITY SPRINT — 12-Month Schedulin…] | lang=en
- "archive_antigravity_12mo_schedule_spec_what_this_sprint_builds": "WHAT THIS SPRINT BUILDS" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L8 | neighbors=[ANTIGRAVITY SPRINT — 12-Month Schedulin…] | lang=en
- "archive_antigravity_12mo_schedule_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_12MO_SCHEDULE_SPEC.md:L385 | neighbors=[ANTIGRAVITY SPRINT — 12-Month Schedulin…] | lang=en
- "archive_antigravity_activity_feed_spec_antigravity_sprint_live_feed_action_item_cleanup": "ANTIGRAVITY SPRINT — LIVE FEED ACTION ITEM CLEANUP" | kind=entity | source=specs/archive/ANTIGRAVITY_ACTIVITY_FEED_SPEC.md:L1 | neighbors=[ANTIGRAVITY_ACTIVITY_FEED_SPEC.md] | lang=en
- "archive_antigravity_activity_feed_spec_commit_message": "COMMIT MESSAGE" | kind=entity | source=specs/archive/ANTIGRAVITY_ACTIVITY_FEED_SPEC.md:L165 | neighbors=[File: tech-pwa/src/components/dashboard…] | lang=en
- "archive_antigravity_activity_feed_spec_date_april_23_2026": "Date: April 23, 2026" | kind=entity | source=specs/archive/ANTIGRAVITY_ACTIVITY_FEED_SPEC.md:L3 | neighbors=[ANTIGRAVITY_ACTIVITY_FEED_SPEC.md] | lang=en
- "archive_antigravity_activity_feed_spec_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_ACTIVITY_FEED_SPEC.md:L146 | neighbors=[File: tech-pwa/src/components/dashboard…] | lang=pt
- "archive_antigravity_activity_feed_spec_owner_claude_code_executor_antigravity": "Owner: Claude Code | Executor: Antigravity" | kind=entity | source=specs/archive/ANTIGRAVITY_ACTIVITY_FEED_SPEC.md:L2 | neighbors=[ANTIGRAVITY_ACTIVITY_FEED_SPEC.md] | lang=en
- "archive_antigravity_activity_feed_spec_problem": "PROBLEM" | kind=entity | source=specs/archive/ANTIGRAVITY_ACTIVITY_FEED_SPEC.md:L8 | neighbors=[File: tech-pwa/src/components/dashboard…] | lang=en
- "archive_antigravity_activity_feed_spec_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_ACTIVITY_FEED_SPEC.md:L156 | neighbors=[File: tech-pwa/src/components/dashboard…] | lang=en
- "archive_antigravity_activity_feed_spec_what_was_added": "What was added:" | kind=entity | source=specs/archive/ANTIGRAVITY_ACTIVITY_FEED_SPEC.md:L139 | neighbors=[TASK — Refocus ActivityFeed to action i…] | lang=en
- "archive_antigravity_activity_feed_spec_what_was_removed_and_why": "What was removed and why:" | kind=entity | source=specs/archive/ANTIGRAVITY_ACTIVITY_FEED_SPEC.md:L134 | neighbors=[TASK — Refocus ActivityFeed to action i…] | lang=en
- "archive_antigravity_auth_serverside_passcodes_antigravity_sprint_server_side_passcode_validation_auth_step_2": "ANTIGRAVITY SPRINT — SERVER-SIDE PASSCODE VALIDATION (Auth Step 2)" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L1 | neighbors=[ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md] | lang=en
- "archive_antigravity_auth_serverside_passcodes_commit_message": "COMMIT MESSAGE" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L203 | neighbors=[Date: April 23, 2026] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-140.json

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
