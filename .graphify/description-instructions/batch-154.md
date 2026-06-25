# Node Description Batch 155 of 412

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

- "archive_antigravity_pwa_ui_prompt_ca_compliance_banner": "CA Compliance Banner" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L163 | neighbors=[3. Job Detail Screen (`/job/[jobId]`)] | lang=en
- "archive_antigravity_pwa_ui_prompt_color_tokens_add_to_tailwind_config_ts": "Color Tokens (add to `tailwind.config.ts`)" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L34 | neighbors=[Design System] | lang=en
- "archive_antigravity_pwa_ui_prompt_context": "Context" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L6 | neighbors=[Paste this entire file into Antigravity…] | lang=en
- "archive_antigravity_pwa_ui_prompt_elevation": "Elevation" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L73 | neighbors=[Design System] | lang=en
- "archive_antigravity_pwa_ui_prompt_file_map_do_not_create_new_routes_only_edit_existing": "File Map (do not create new routes — only edit existing)" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L315 | neighbors=[Paste this entire file into Antigravity…] | lang=pt
- "archive_antigravity_pwa_ui_prompt_flag_issue": "Flag Issue" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L204 | neighbors=[3. Job Detail Screen (`/job/[jobId]`)] | lang=en
- "archive_antigravity_pwa_ui_prompt_header": "Header" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L142 | neighbors=[3. Job Detail Screen (`/job/[jobId]`)] | lang=en
- "archive_antigravity_pwa_ui_prompt_job_info_accordion": "Job Info Accordion" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L190 | neighbors=[3. Job Detail Screen (`/job/[jobId]`)] | lang=en
- "archive_antigravity_pwa_ui_prompt_photo_section": "Photo Section" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L196 | neighbors=[3. Job Detail Screen (`/job/[jobId]`)] | lang=en
- "archive_antigravity_pwa_ui_prompt_tech_constraints": "Tech Constraints" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L21 | neighbors=[Paste this entire file into Antigravity…] | lang=en
- "archive_antigravity_pwa_ui_prompt_timer_section_most_important_element_on_screen_when_active": "Timer Section (most important element on screen when active)" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L147 | neighbors=[3. Job Detail Screen (`/job/[jobId]`)] | lang=en
- "archive_antigravity_pwa_ui_prompt_typography": "Typography" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L67 | neighbors=[Design System] | lang=en
- "archive_antigravity_queue_tab_spec_add_new_type_at_top_of_file_after_existing_imports": "ADD — new type at top of file (after existing imports):" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L85 | neighbors=[FILE 2: `src/components/dashboard/JobQu…] | lang=en
- "archive_antigravity_queue_tab_spec_add_pte_sub_state_indicator_on_job_rows": "ADD — PTE sub-state indicator on job rows:" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L212 | neighbors=[FILE 2: `src/components/dashboard/JobQu…] | lang=en
- "archive_antigravity_queue_tab_spec_change_line_127": "CHANGE — line 127:" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L70 | neighbors=[FILE 1: `src/app/live/page.tsx`] | lang=en
- "archive_antigravity_queue_tab_spec_change_state_declarations_inside_the_component": "CHANGE — state declarations inside the component:" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L91 | neighbors=[FILE 2: `src/components/dashboard/JobQu…] | lang=en
- "archive_antigravity_queue_tab_spec_delete_these_exactly": "DELETE these exactly:" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L41 | neighbors=[FILE 1: `src/app/live/page.tsx`] | lang=en
- "archive_antigravity_queue_tab_spec_queue_tab_structure_implementation_spec": "QUEUE TAB STRUCTURE — IMPLEMENTATION SPEC" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L1 | neighbors=[ANTIGRAVITY_QUEUE_TAB_SPEC.md] | lang=en
- "archive_antigravity_queue_tab_spec_remove_the_filteroptions_array": "REMOVE — the `filterOptions` array:" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L148 | neighbors=[FILE 2: `src/components/dashboard/JobQu…] | lang=en
- "archive_antigravity_queue_tab_spec_replace_the_category_filters_jsx_block": "REPLACE — the Category Filters JSX block:" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L155 | neighbors=[FILE 2: `src/components/dashboard/JobQu…] | lang=en
- "archive_antigravity_queue_tab_spec_replace_the_entire_filter_logic_block_in_filteredandsortedjobs_usememo": "REPLACE — the entire filter logic block in `filteredAndSortedJobs` useMemo:" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L102 | neighbors=[FILE 2: `src/components/dashboard/JobQu…] | lang=en
- "archive_antigravity_queue_tab_spec_replaces_the_current_two_layer_filter_system_on_the_live_page": "Replaces the current two-layer filter system on the Live page." | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L2 | neighbors=[ANTIGRAVITY_QUEUE_TAB_SPEC.md] | lang=en
- "archive_antigravity_queue_tab_spec_the_correct_model": "THE CORRECT MODEL" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L25 | neighbors=[Read every line. Do not freelance.] | lang=en
- "archive_antigravity_queue_tab_spec_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L255 | neighbors=[Read every line. Do not freelance.] | lang=en
- "archive_antigravity_queue_tab_spec_what_is_wrong_now_do_not_keep_any_of_this": "WHAT IS WRONG NOW (do not keep any of this)" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L7 | neighbors=[Read every line. Do not freelance.] | lang=en
- "archive_antigravity_queue_tab_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L243 | neighbors=[Read every line. Do not freelance.] | lang=en
- "archive_antigravity_railway_deploy_spec": "ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L1 | neighbors=[RAILWAY INFRASTRUCTURE DEPLOYMENT SPEC] | lang=en
- "archive_antigravity_railway_deploy_spec_1a_export_n8n_workflows": "1A. Export n8n Workflows" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L19 | neighbors=[PART 1 — BRANDON DOES FIRST (Before Ant…] | lang=pt
- "archive_antigravity_railway_deploy_spec_1b_export_flowise_flows": "1B. Export Flowise Flows" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L24 | neighbors=[PART 1 — BRANDON DOES FIRST (Before Ant…] | lang=en
- "archive_antigravity_railway_deploy_spec_1c_get_the_clasp_refresh_token": "1C. Get the clasp Refresh Token" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L29 | neighbors=[PART 1 — BRANDON DOES FIRST (Before Ant…] | lang=en
- "archive_antigravity_railway_deploy_spec_1d_create_railway_account_project": "1D. Create Railway Account / Project" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L33 | neighbors=[PART 1 — BRANDON DOES FIRST (Before Ant…] | lang=en
- "archive_antigravity_railway_deploy_spec_2a_directory_structure_to_create": "2A. Directory Structure to Create" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L42 | neighbors=[PART 2 — ANTIGRAVITY IMPLEMENTATION] | lang=en
- "archive_antigravity_railway_deploy_spec_2b_create_railway_n8n_railway_toml": "2B. Create `railway/n8n/railway.toml`" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L59 | neighbors=[PART 2 — ANTIGRAVITY IMPLEMENTATION] | lang=en
- "archive_antigravity_railway_deploy_spec_2c_create_railway_n8n_dockerfile": "2C. Create `railway/n8n/Dockerfile`" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L71 | neighbors=[PART 2 — ANTIGRAVITY IMPLEMENTATION] | lang=en
- "archive_antigravity_railway_deploy_spec_2d_create_railway_flowise_railway_toml": "2D. Create `railway/flowise/railway.toml`" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L80 | neighbors=[PART 2 — ANTIGRAVITY IMPLEMENTATION] | lang=en
- "archive_antigravity_railway_deploy_spec_2e_create_railway_flowise_dockerfile": "2E. Create `railway/flowise/Dockerfile`" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L92 | neighbors=[PART 2 — ANTIGRAVITY IMPLEMENTATION] | lang=en
- "archive_antigravity_railway_deploy_spec_2f_create_github_workflows_deploy_apps_script_yml": "2F. Create `.github/workflows/deploy-apps-script.yml`" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L98 | neighbors=[PART 2 — ANTIGRAVITY IMPLEMENTATION] | lang=en
- "archive_antigravity_railway_deploy_spec_2g_create_github_workflows_deploy_vercel_yml": "2G. Create `.github/workflows/deploy-vercel.yml`" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L157 | neighbors=[PART 2 — ANTIGRAVITY IMPLEMENTATION] | lang=en
- "archive_antigravity_railway_deploy_spec_2h_update_gitignore": "2H. Update `.gitignore`" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L172 | neighbors=[PART 2 — ANTIGRAVITY IMPLEMENTATION] | lang=en
- "archive_antigravity_railway_deploy_spec_2i_commit_everything": "2I. Commit everything" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L190 | neighbors=[PART 2 — ANTIGRAVITY IMPLEMENTATION] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-154.json

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
