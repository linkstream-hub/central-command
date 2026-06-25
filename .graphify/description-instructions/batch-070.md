# Node Description Batch 71 of 412

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_loading_states": "Loading States" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L111 | neighbors=[Improve Copy Systematically, UX Writing]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_reference_material": "Reference Material" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L178 | neighbors=[clarify.md, UX Writing]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_reference_material": "Reference Material" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L156 | neighbors=[colorize.md, Color & Contrast]
- "agents_skills_archive_impeccable_reference_craft_md_reference_craft_step_4_build_to_production_quality": "Step 4: Build to Production Quality" | kind=entity | source=.agents/skills_archive/impeccable/reference/craft.md:L77 | neighbors=[Craft Flow, Production bar]
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_recommended_actions": "Recommended Actions" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L233 | neighbors=[critique.md, Action Summary]
- "agents_skills_archive_impeccable_reference_live_md_reference_live_handle_accept": "Handle `accept`" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L460 | neighbors=[live.md, Required after accept (carbonize)]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_implementation_patterns": "Implementation Patterns" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L194 | neighbors=[onboard.md, Technical approaches:]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_phase_2_design_brief": "Phase 2: Design Brief" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L112 | neighbors=[shape.md, Brief Structure]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_reference_material": "Reference Material" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L128 | neighbors=[typeset.md, Typography]
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_commands": "Commands" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L106 | neighbors=[SKILL.md, Routing rules]
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_new_projects_only_when_no_prior_work_exists": "New projects only (when no prior work exists)" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L62 | neighbors=[Design guidance, Color & Theme]
- "api_reference_admin": "Admin" | kind=entity | source=docs/api/reference.md:L870 | neighbors=[POST `/api/admin/archive-stale`, Domain Details]
- "api_reference_cron": "Cron" | kind=entity | source=docs/api/reference.md:L883 | neighbors=[GET `/api/cron/sync-gmail-history`, Domain Details]
- "api_reference_intake": "Intake" | kind=entity | source=docs/api/reference.md:L993 | neighbors=[Domain Details, POST `/api/intake/access-sync`]
- "api_reference_notifications": "Notifications" | kind=entity | source=docs/api/reference.md:L808 | neighbors=[Domain Details, GET `/api/notifications`]
- "api_reference_properties": "Properties" | kind=entity | source=docs/api/reference.md:L967 | neighbors=[Domain Details, GET `/api/properties`]
- "api_reference_techs": "Techs" | kind=entity | source=docs/api/reference.md:L596 | neighbors=[Domain Details, GET `/api/techs`]
- "api_reference_webhooks": "Webhooks" | kind=entity | source=docs/api/reference.md:L904 | neighbors=[Domain Details, POST `/api/webhooks/n8n/gmail`]
- "app_global_error": "global-error.tsx" | kind=code-symbol | source=tech-pwa/src/app/global-error.tsx:L1 | neighbors=[GlobalError(), 01bf641 Initial commit — clean history]
- "app_page_indexpage": "IndexPage()" | kind=code-symbol | source=tech-pwa/src/app/page.tsx:L14 | neighbors=[page.tsx, useTranslation()]
- "app_providers_providers": "Providers()" | kind=code-symbol | source=tech-pwa/src/app/Providers.tsx:L4 | neighbors=[Providers.tsx, layout.tsx]
- "aptmaintenanceinc_com_prompts_recipe_button_recipe_button": "Recipe: button" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/recipe-button.md:L1 | neighbors=[recipe-button.md, Anatomy (detected)]
- "aptmaintenanceinc_com_prompts_recipe_input_recipe_input": "Recipe: input" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/recipe-input.md:L1 | neighbors=[recipe-input.md, Anatomy (detected)]
- "archive_antigravity_calendar_spec": "ANTIGRAVITY_CALENDAR_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L1 | neighbors=[/calendar — Unified Team Calendar View, Sprint owner: Antigravity | Spec author…]
- "archive_antigravity_claw_army_phase2_spec": "ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L1 | neighbors=[Claw Army Phase 2 — Railway Sentinels +…, Sprint 30 | Spec author: Claude Code | …]
- "archive_antigravity_comms_spec": "ANTIGRAVITY_COMMS_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L1 | neighbors=[Internal Communications Phase 1 — Job C…, Sprint owner: Antigravity | Spec author…]
- "archive_antigravity_crew_scheduling_spec": "ANTIGRAVITY_CREW_SCHEDULING_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L1 | neighbors=[Crew / Multi-Tech Scheduling — Backend …, Sprint 33 | Spec author: Claude Code | …]
- "archive_antigravity_crew_scheduling_spec_file_dashboard_api_dashboardapi_gs": "File: `dashboard-api/DashboardAPI.gs`" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L24 | neighbors=[SPEC 1 — DashboardAPI.gs: getWeekSchedu…, SPEC 2 — DashboardAPI.gs: getTodaySched…]
- "archive_antigravity_dispatch_excellence_spec_feature_3_inline_status_change": "Feature 3 — Inline Status Change" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L556 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC, 3A. Changes to `JobQueueTable.tsx`]
- "archive_antigravity_dispatch_excellence_spec_feature_4_actionable_row_enhancements": "Feature 4 — Actionable Row Enhancements" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L720 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC, 4A. Changes to `JobQueueTable.tsx`]
- "archive_antigravity_dispatch_excellence_spec_feature_5_schedule_page_sidebar_search": "Feature 5 — Schedule Page Sidebar Search" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L820 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC, 5A. Changes to `tech-pwa/src/app/schedu…]
- "archive_antigravity_dispatch_excellence_spec_feature_7_job_detail_visibility_in_schedule_grid_cells": "Feature 7 — Job Detail Visibility in Schedule Grid Cells" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1225 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC, 7A. Changes to `tech-pwa/src/components…]
- "archive_antigravity_feedback_spec_sheet_setup": "SHEET SETUP" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L18 | neighbors=[ANTIGRAVITY SPRINT — Dispatcher Feedbac…, New tab: "Dispatcher Feedback"]
- "archive_antigravity_hr_permissions_and_deploy_verification": "Verification:" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L25 | neighbors=[TASK 1 — HR role gets Compliance + Bill…, TASK 2 — Deploy pending backend fixes (…]
- "archive_antigravity_i18n_spec_step_2_wrap_root_layout": "Step 2 — Wrap Root Layout" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L371 | neighbors=[ANTIGRAVITY_I18N_SPEC, 2A. Changes to `src/app/layout.tsx`]
- "archive_antigravity_i18n_spec_step_3_language_toggle_component": "Step 3 — Language Toggle Component" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L393 | neighbors=[ANTIGRAVITY_I18N_SPEC, 3A. Changes to `src/app/jobs/page.tsx`]
- "archive_antigravity_logo_spec": "ANTIGRAVITY_LOGO_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L1 | neighbors=[APT Logo — Login Page + Sidebar, Sprint 32.2 | Spec author: Claude Code …]
- "archive_antigravity_middleware_spec": "ANTIGRAVITY_MIDDLEWARE_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_MIDDLEWARE_SPEC.md:L1 | neighbors=[Sprint 32.1 | Spec author: Claude Code …, Subdomain Routing via Next.js Middleware]
- "archive_antigravity_middleware_spec_implementation": "Implementation" | kind=entity | source=specs/archive/ANTIGRAVITY_MIDDLEWARE_SPEC.md:L23 | neighbors=[File to CREATE: `tech-pwa/src/middlewar…, Sprint 32.1 | Spec author: Claude Code …]
- "archive_antigravity_modal_visibility_spec_task_1_fix_stakeholder_tab_name_phone_visibility": "TASK 1 — Fix stakeholder tab name + phone visibility" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L17 | neighbors=[File: tech-pwa/src/components/dashboard…, Location: lines ~350–383 in JobDetailMo…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-070.json

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
