# Node Description Batch 152 of 412

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

- "archive_antigravity_logo_spec_file_tech_pwa_src_app_login_page_tsx": "File: `tech-pwa/src/app/login/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L19 | neighbors=[CHANGE 1 — Login Page] | lang=en
- "archive_antigravity_logo_spec_file_tech_pwa_src_components_dashboard_appsidebar_tsx": "File: `tech-pwa/src/components/dashboard/AppSidebar.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L43 | neighbors=[CHANGE 2 — Sidebar (Expanded State)] | lang=en
- "archive_antigravity_logo_spec_find_and_replace": "Find and REPLACE:" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L21 | neighbors=[CHANGE 1 — Login Page] | lang=en
- "archive_antigravity_logo_spec_find_and_replace_the_collapsed_logo_block": "Find and REPLACE the collapsed logo block:" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L63 | neighbors=[CHANGE 2 — Sidebar (Expanded State)] | lang=en
- "archive_antigravity_logo_spec_find_and_replace_the_expanded_logo_block": "Find and REPLACE the expanded logo block:" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L45 | neighbors=[CHANGE 2 — Sidebar (Expanded State)] | lang=en
- "archive_antigravity_logo_spec_overview": "Overview" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L7 | neighbors=[Sprint 32.2 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_logo_spec_typescript_check": "TypeScript Check" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L104 | neighbors=[Sprint 32.2 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_logo_spec_verification": "Verification" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L110 | neighbors=[Sprint 32.2 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_logo_spec_what_must_not_change": "What Must NOT Change" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L96 | neighbors=[Sprint 32.2 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_middleware_spec_file_to_create_tech_pwa_src_middleware_ts": "File to CREATE: `tech-pwa/src/middleware.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_MIDDLEWARE_SPEC.md:L25 | neighbors=[Implementation] | lang=en
- "archive_antigravity_middleware_spec_goal": "Goal" | kind=entity | source=specs/archive/ANTIGRAVITY_MIDDLEWARE_SPEC.md:L13 | neighbors=[Sprint 32.1 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_middleware_spec_problem": "Problem" | kind=entity | source=specs/archive/ANTIGRAVITY_MIDDLEWARE_SPEC.md:L7 | neighbors=[Sprint 32.1 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_middleware_spec_subdomain_routing_via_next_js_middleware": "Subdomain Routing via Next.js Middleware" | kind=entity | source=specs/archive/ANTIGRAVITY_MIDDLEWARE_SPEC.md:L2 | neighbors=[ANTIGRAVITY_MIDDLEWARE_SPEC.md] | lang=en
- "archive_antigravity_middleware_spec_verification": "Verification" | kind=entity | source=specs/archive/ANTIGRAVITY_MIDDLEWARE_SPEC.md:L63 | neighbors=[Sprint 32.1 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_middleware_spec_what_must_not_change": "What Must NOT Change" | kind=entity | source=specs/archive/ANTIGRAVITY_MIDDLEWARE_SPEC.md:L56 | neighbors=[Sprint 32.1 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_modal_spec_delete": "DELETE" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L251 | neighbors=[this is complete and correct.] | lang=en
- "archive_antigravity_modal_spec_footer_right_panel_pinned_to_bottom": "FOOTER (right panel, pinned to bottom)" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L204 | neighbors=[this is complete and correct.] | lang=en
- "archive_antigravity_modal_spec_header": "HEADER" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L37 | neighbors=[this is complete and correct.] | lang=en
- "archive_antigravity_modal_spec_job_detail_modal_complete_rebuild_spec": "JOB DETAIL MODAL — COMPLETE REBUILD SPEC" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L1 | neighbors=[ANTIGRAVITY_MODAL_SPEC.md] | lang=en
- "archive_antigravity_modal_spec_jobdetailmodal_tsx_this_is_the_entire_product_get_this_right": "JobDetailModal.tsx — This is the entire product. Get this right." | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L2 | neighbors=[ANTIGRAVITY_MODAL_SPEC.md] | lang=en
- "archive_antigravity_modal_spec_layout_overview": "LAYOUT OVERVIEW" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L11 | neighbors=[this is complete and correct.] | lang=en
- "archive_antigravity_modal_spec_live_page_job_table_add_type_column": "LIVE PAGE JOB TABLE — ADD TYPE COLUMN" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L236 | neighbors=[this is complete and correct.] | lang=en
- "archive_antigravity_modal_spec_reply_composer_pinned_to_bottom_of_left_panel": "Reply composer (pinned to bottom of left panel)" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L91 | neighbors=[LEFT PANEL — EMAIL THREAD (40% width)] | lang=en
- "archive_antigravity_modal_spec_section_1_work_order": "SECTION 1: WORK ORDER" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L110 | neighbors=[RIGHT PANEL — WORK ORDER + DISPATCH (60…] | lang=en
- "archive_antigravity_modal_spec_section_2_access_info": "SECTION 2: ACCESS INFO" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L122 | neighbors=[RIGHT PANEL — WORK ORDER + DISPATCH (60…] | lang=en
- "archive_antigravity_modal_spec_section_3_contacts": "SECTION 3: CONTACTS" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L133 | neighbors=[RIGHT PANEL — WORK ORDER + DISPATCH (60…] | lang=en
- "archive_antigravity_modal_spec_section_4_dispatch_controls": "SECTION 4: DISPATCH CONTROLS" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L166 | neighbors=[RIGHT PANEL — WORK ORDER + DISPATCH (60…] | lang=en
- "archive_antigravity_modal_spec_section_5_dispatcher_notes": "SECTION 5: DISPATCHER NOTES" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L195 | neighbors=[RIGHT PANEL — WORK ORDER + DISPATCH (60…] | lang=en
- "archive_antigravity_modal_spec_sub_header": "Sub-header" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L66 | neighbors=[LEFT PANEL — EMAIL THREAD (40% width)] | lang=en
- "archive_antigravity_modal_spec_takes_reading_the_work_order_contacting_rm_or_tenant_assigning_a_tech": "takes — reading the work order, contacting RM or tenant, assigning a tech," | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L5 | neighbors=[ANTIGRAVITY_MODAL_SPEC.md] | lang=en
- "archive_antigravity_modal_spec_the_modal_is_the_dispatcher_s_primary_work_surface_every_action_a_dispatcher": "The modal is the dispatcher's primary work surface. Every action a dispatcher" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L4 | neighbors=[ANTIGRAVITY_MODAL_SPEC.md] | lang=en
- "archive_antigravity_modal_spec_thread_body_scrollable_newest_message_at_bottom": "Thread body (scrollable, newest message at bottom)" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L70 | neighbors=[LEFT PANEL — EMAIL THREAD (40% width)] | lang=en
- "archive_antigravity_modal_spec_updating_status_replying_to_email_happens_here_nothing_else_matters_until": "updating status, replying to email — happens here. Nothing else matters until" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L6 | neighbors=[ANTIGRAVITY_MODAL_SPEC.md] | lang=en
- "archive_antigravity_modal_spec_what_to_keep_already_working": "WHAT TO KEEP (already working)" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L226 | neighbors=[this is complete and correct.] | lang=en
- "archive_antigravity_modal_spec_what_to_remove": "WHAT TO REMOVE" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L219 | neighbors=[this is complete and correct.] | lang=en
- "archive_antigravity_modal_visibility_spec_antigravity_sprint_modal_stakeholder_visibility_light_mode_fix": "ANTIGRAVITY SPRINT — MODAL STAKEHOLDER VISIBILITY + LIGHT MODE FIX" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L1 | neighbors=[ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md] | lang=en
- "archive_antigravity_modal_visibility_spec_commit_message": "COMMIT MESSAGE" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L139 | neighbors=[File: tech-pwa/src/components/dashboard…] | lang=en
- "archive_antigravity_modal_visibility_spec_date_april_23_2026": "Date: April 23, 2026" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L3 | neighbors=[ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md] | lang=en
- "archive_antigravity_modal_visibility_spec_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L118 | neighbors=[File: tech-pwa/src/components/dashboard…] | lang=pt
- "archive_antigravity_modal_visibility_spec_location_lines_350_383_in_jobdetailmodal_tsx": "Location: lines ~350–383 in JobDetailModal.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L19 | neighbors=[TASK 1 — Fix stakeholder tab name + pho…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-151.json

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
