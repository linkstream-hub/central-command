# Node Description Batch 149 of 412

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

- "archive_antigravity_dispatch_excellence_spec_search_input_element_currently_lines_101_108": "Search `<input>` element (currently lines 101–108):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L58 | neighbors=[1A. Changes to `live/page.tsx`]
- "archive_antigravity_dispatch_excellence_spec_typescript": "TypeScript" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L785 | neighbors=[Verification Steps]
- "archive_antigravity_dispatch_excellence_spec_updated_file_list": "Updated File List" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1276 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC]
- "archive_antigravity_dispatch_excellence_spec_what_this_changes": "What This Changes" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L7 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC]
- "archive_antigravity_dispatch_excellence_spec_wire_the_dead_mode_toggle_buttons_currently_lines_110_115": "Wire the dead Mode toggle buttons (currently lines 110–115):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L197 | neighbors=[2A. Changes to `live/page.tsx`]
- "archive_antigravity_dispatch_polish_spec": "ANTIGRAVITY_DISPATCH_POLISH_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPRINT — Dispatch Polish]
- "archive_antigravity_dispatch_polish_spec_data_available": "Data available" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L15 | neighbors=[FEATURE 1 — Job Staleness Badges on Que…]
- "archive_antigravity_dispatch_polish_spec_logic": "Logic" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L65 | neighbors=[FEATURE 2 — Trainee Solo-Assignment War…]
- "archive_antigravity_dispatch_polish_spec_logic_add_this_helper_near_the_top_of_jobqueuetable_tsx": "Logic (add this helper near the top of `JobQueueTable.tsx`):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L19 | neighbors=[FEATURE 1 — Job Staleness Badges on Que…]
- "archive_antigravity_dispatch_polish_spec_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L158 | neighbors=[ANTIGRAVITY SPRINT — Dispatch Polish]
- "archive_antigravity_dispatch_polish_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L148 | neighbors=[ANTIGRAVITY SPRINT — Dispatch Polish]
- "archive_antigravity_dispatch_polish_spec_where_the_rank_data_lives": "Where the rank data lives" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L61 | neighbors=[FEATURE 2 — Trainee Solo-Assignment War…]
- "archive_antigravity_dispatch_polish_spec_where_to_add_it": "Where to add it" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L99 | neighbors=[FEATURE 3 — "Mark Ready" Quick Action o…]
- "archive_antigravity_dispatch_polish_spec_where_to_render": "Where to render" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L30 | neighbors=[FEATURE 1 — Job Staleness Badges on Que…]
- "archive_antigravity_feedback_spec": "ANTIGRAVITY_FEEDBACK_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPRINT — Dispatcher Feedbac…]
- "archive_antigravity_feedback_spec_action_getfeedback": "Action: `getFeedback`" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L79 | neighbors=[BACKEND — DashboardAPI.gs]
- "archive_antigravity_feedback_spec_action_submitfeedback": "Action: `submitFeedback`" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L43 | neighbors=[BACKEND — DashboardAPI.gs]
- "archive_antigravity_feedback_spec_action_updatefeedbackstatus": "Action: `updateFeedbackStatus`" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L122 | neighbors=[BACKEND — DashboardAPI.gs]
- "archive_antigravity_feedback_spec_animations": "ANIMATIONS" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L311 | neighbors=[ANTIGRAVITY SPRINT — Dispatcher Feedbac…]
- "archive_antigravity_feedback_spec_dashboardapi_gs_deploy_via_dashboard_api_clasp": "DashboardAPI.gs — deploy via dashboard-api clasp:" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L334 | neighbors=[DEPLOYMENT]
- "archive_antigravity_feedback_spec_empty_state": "Empty State" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L267 | neighbors=[FRONTEND — `/feedback` page]
- "archive_antigravity_feedback_spec_frontend_types_dashboard_api_ts": "FRONTEND TYPES — dashboard-api.ts" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L148 | neighbors=[ANTIGRAVITY SPRINT — Dispatcher Feedbac…]
- "archive_antigravity_feedback_spec_layout": "Layout" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L176 | neighbors=[FRONTEND — `/feedback` page]
- "archive_antigravity_feedback_spec_new_tab_dispatcher_feedback": "New tab: \"Dispatcher Feedback\"" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L20 | neighbors=[SHEET SETUP]
- "archive_antigravity_feedback_spec_page_header": "PAGE HEADER" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L298 | neighbors=[ANTIGRAVITY SPRINT — Dispatcher Feedbac…]
- "archive_antigravity_feedback_spec_sidebar_nav": "SIDEBAR NAV" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L286 | neighbors=[ANTIGRAVITY SPRINT — Dispatcher Feedbac…]
- "archive_antigravity_feedback_spec_skeleton_loader": "Skeleton Loader" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L280 | neighbors=[FRONTEND — `/feedback` page]
- "archive_antigravity_feedback_spec_submission_history": "Submission History" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L218 | neighbors=[FRONTEND — `/feedback` page]
- "archive_antigravity_feedback_spec_submit_form": "Submit Form" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L185 | neighbors=[FRONTEND — `/feedback` page]
- "archive_antigravity_feedback_spec_tech_pwa_vercel_auto_deploys_on_push_to_main": "Tech PWA — Vercel auto-deploys on push to main." | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L341 | neighbors=[DEPLOYMENT]
- "archive_antigravity_feedback_spec_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L345 | neighbors=[ANTIGRAVITY SPRINT — Dispatcher Feedbac…]
- "archive_antigravity_feedback_spec_what_this_builds": "WHAT THIS BUILDS" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L9 | neighbors=[ANTIGRAVITY SPRINT — Dispatcher Feedbac…]
- "archive_antigravity_feedback_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L320 | neighbors=[ANTIGRAVITY SPRINT — Dispatcher Feedbac…]
- "archive_antigravity_google_auth_spec": "ANTIGRAVITY_GOOGLE_AUTH_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…]
- "archive_antigravity_google_auth_spec_delete_after_shipping": "DELETE AFTER SHIPPING" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L702 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…]
- "archive_antigravity_google_auth_spec_files_to_touch": "FILES TO TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L62 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…]
- "archive_antigravity_google_auth_spec_modified_file_tech_pwa_package_json": "MODIFIED FILE — `tech-pwa/package.json`" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L659 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…]
- "archive_antigravity_google_auth_spec_modified_file_tech_pwa_src_app_login_page_tsx": "MODIFIED FILE — `tech-pwa/src/app/login/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L266 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…]
- "archive_antigravity_google_auth_spec_modified_file_tech_pwa_src_components_dashboard_routeguard_tsx": "MODIFIED FILE — `tech-pwa/src/components/dashboard/RouteGuard.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L466 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…]
- "archive_antigravity_google_auth_spec_module_route_mapping": "MODULE → ROUTE MAPPING" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L50 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-148.json

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
