# Node Description Batch 365 of 412

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

- "specs_antigravity_reorganize_spec_create_docs_and_move_reference_documents": "Create `docs/` and move reference documents" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L29 | neighbors=[PART 1 — ROOT DIRECTORY] | lang=en
- "specs_antigravity_reorganize_spec_delete_empty_folders": "Delete empty folders" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L49 | neighbors=[PART 1 — ROOT DIRECTORY] | lang=en
- "specs_antigravity_reorganize_spec_delete_empty_stray_folder": "Delete empty stray folder" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L68 | neighbors=[PART 2 — TECH-PWA DIRECTORY] | lang=en
- "specs_antigravity_reorganize_spec_delete_stale_files": "Delete stale files" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L61 | neighbors=[PART 2 — TECH-PWA DIRECTORY] | lang=en
- "specs_antigravity_reorganize_spec_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L76 | neighbors=[ANTIGRAVITY SPEC — WORKSPACE REORGANIZA…] | lang=pt
- "specs_antigravity_reorganize_spec_move_old_html_prototypes_to_scratch": "Move old HTML prototypes to `scratch/`" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L42 | neighbors=[PART 1 — ROOT DIRECTORY] | lang=en
- "specs_antigravity_reorganize_spec_move_to_specs_folder_already_exists": "Move to `specs/` (folder already exists)" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L15 | neighbors=[PART 1 — ROOT DIRECTORY] | lang=en
- "specs_antigravity_reorganize_spec_objective": "OBJECTIVE" | kind=entity | source=specs/ANTIGRAVITY_REORGANIZE_SPEC.md:L7 | neighbors=[ANTIGRAVITY SPEC — WORKSPACE REORGANIZA…] | lang=en
- "specs_antigravity_rts_grid_spec": "ANTIGRAVITY_RTS_GRID_SPEC.md" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — RTS SCHEDULE GRID RE…] | lang=en
- "specs_antigravity_rts_grid_spec_behavior_after_this_sprint": "BEHAVIOR AFTER THIS SPRINT" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L361 | neighbors=[ANTIGRAVITY SPEC — RTS SCHEDULE GRID RE…] | lang=en
- "specs_antigravity_rts_grid_spec_change_a_remove_unused_imports": "Change A — Remove unused imports" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L47 | neighbors=[FILE 1: `tech-pwa/src/app/schedule/page…] | lang=pt
- "specs_antigravity_rts_grid_spec_change_b_remove_outdates_state_and_selectedtech_istechmodalopen_state": "Change B — Remove outDates state and selectedTech/isTechModalOpen state" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L75 | neighbors=[FILE 1: `tech-pwa/src/app/schedule/page…] | lang=en
- "specs_antigravity_rts_grid_spec_change_c_remove_gettechavailability_call_from_loaddata": "Change C — Remove getTechAvailability call from loadData" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L90 | neighbors=[FILE 1: `tech-pwa/src/app/schedule/page…] | lang=en
- "specs_antigravity_rts_grid_spec_change_d_fix_handledragend_guard_and_pendingdrop_techname": "Change D — Fix handleDragEnd guard and pendingDrop techName" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L118 | neighbors=[FILE 1: `tech-pwa/src/app/schedule/page…] | lang=en
- "specs_antigravity_rts_grid_spec_change_e_replace_the_grid_body_the_techs_map_loop": "Change E — Replace the grid body (the techs.map loop)" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L156 | neighbors=[FILE 1: `tech-pwa/src/app/schedule/page…] | lang=en
- "specs_antigravity_rts_grid_spec_change_f_fix_prefilltech_prop_on_durationselectormodal": "Change F — Fix prefillTech prop on DurationSelectorModal" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L275 | neighbors=[FILE 1: `tech-pwa/src/app/schedule/page…] | lang=en
- "specs_antigravity_rts_grid_spec_change_g_update_info_banner_text": "Change G — Update info banner text" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L289 | neighbors=[FILE 1: `tech-pwa/src/app/schedule/page…] | lang=en
- "specs_antigravity_rts_grid_spec_change_h_remove_techprofilemodal_jsx_block": "Change H — Remove TechProfileModal JSX block" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L303 | neighbors=[FILE 1: `tech-pwa/src/app/schedule/page…] | lang=en
- "specs_antigravity_rts_grid_spec_change_i_remove_unused_techstatus_import_if_it_becomes_unused": "Change I — Remove unused TechStatus import if it becomes unused" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L319 | neighbors=[FILE 1: `tech-pwa/src/app/schedule/page…] | lang=en
- "specs_antigravity_rts_grid_spec_completion_checklist": "COMPLETION CHECKLIST" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L343 | neighbors=[ANTIGRAVITY SPEC — RTS SCHEDULE GRID RE…] | lang=en
- "specs_antigravity_rts_grid_spec_file_2_tech_pwa_src_components_dashboard_schedulepagecomponents_tsx": "FILE 2: `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L325 | neighbors=[CHANGES — EXACT FILES] | lang=en
- "specs_antigravity_rts_grid_spec_objective": "OBJECTIVE" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L9 | neighbors=[ANTIGRAVITY SPEC — RTS SCHEDULE GRID RE…] | lang=en
- "specs_antigravity_rts_grid_spec_verified_literals_pulled_from_live_files": "VERIFIED LITERALS — pulled from live files" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L15 | neighbors=[ANTIGRAVITY SPEC — RTS SCHEDULE GRID RE…] | lang=en
- "specs_antigravity_rts_grid_spec_what_not_to_touch": "WHAT NOT TO TOUCH" | kind=entity | source=specs/ANTIGRAVITY_RTS_GRID_SPEC.md:L331 | neighbors=[ANTIGRAVITY SPEC — RTS SCHEDULE GRID RE…] | lang=en
- "specs_antigravity_s114_comms_fix_spec_cut_from_main_after_s113_pr_merges": "Cut from: main (after S113 PR merges)" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L3 | neighbors=[ANTIGRAVITY_S114_COMMS_FIX_SPEC.md] | lang=en
- "specs_antigravity_s114_comms_fix_spec_dashboardapi_bridge_pattern_reference_api_job_comments_jobid_route_ts_58_81": "DashboardAPI bridge pattern (reference: `api/job-comments/[jobId]/route.ts:58-8…" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L40 | neighbors=[CONTEXT] | lang=en
- "specs_antigravity_s114_comms_fix_spec_locked_decisions": "LOCKED DECISIONS" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L379 | neighbors=[Claude Code review gate: required befor…] | lang=en
- "specs_antigravity_s114_comms_fix_spec_owner_antigravity": "Owner: Antigravity" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L4 | neighbors=[ANTIGRAVITY_S114_COMMS_FIX_SPEC.md] | lang=en
- "specs_antigravity_s114_comms_fix_spec_p1_root_cause_p0_regression_comms_panel_blank": "P1 Root Cause (P0 regression — comms panel blank)" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L21 | neighbors=[CONTEXT] | lang=en
- "specs_antigravity_s114_comms_fix_spec_p2_root_cause_comms_thread_rendering_cosmetics": "P2 Root Cause (comms thread rendering cosmetics)" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L33 | neighbors=[CONTEXT] | lang=en
- "specs_antigravity_s114_comms_fix_spec_p3_tenant_info_backfill_brandon_no_code_changes": "P3 — Tenant info backfill (Brandon, no code changes)" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L362 | neighbors=[Claude Code review gate: required befor…] | lang=en
- "specs_antigravity_s114_comms_fix_spec_s114_comms_regression_fixes": "S114 — Comms Regression Fixes" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L1 | neighbors=[ANTIGRAVITY_S114_COMMS_FIX_SPEC.md] | lang=en
- "specs_antigravity_s114_comms_fix_spec_scope_lock_do_not_touch_any_file_not_listed_in_this_spec": "⛔ SCOPE LOCK — do not touch any file not listed in this spec" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L9 | neighbors=[Claude Code review gate: required befor…] | lang=en
- "specs_antigravity_s114_comms_fix_spec_sprint_feat_s114_ops_fixes": "Sprint: feat/s114-ops-fixes" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L2 | neighbors=[ANTIGRAVITY_S114_COMMS_FIX_SPEC.md] | lang=en
- "specs_antigravity_s114_comms_fix_spec_task_1_branch_setup": "Task 1 — Branch setup" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L77 | neighbors=[TASK LIST] | lang=en
- "specs_antigravity_s114_comms_fix_spec_task_2_p1_fix_comms_fallback_in_route_ts": "Task 2 — P1: Fix comms fallback in `route.ts`" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L88 | neighbors=[TASK LIST] | lang=en
- "specs_antigravity_s114_comms_fix_spec_task_3_p2_fix_timestamp_formatting_and_from_name_in_jobdetailmodal_tsx": "Task 3 — P2: Fix timestamp formatting and from-name in `JobDetailModal.tsx`" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L225 | neighbors=[TASK LIST] | lang=en
- "specs_antigravity_s114_comms_fix_spec_task_4_typescript_check_diff_artifact": "Task 4 — TypeScript check + diff artifact" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L282 | neighbors=[TASK LIST] | lang=en
- "specs_antigravity_s114_comms_fix_spec_task_5_test_sprint_separate_session_after_claude_code_pass_on_diff": "Task 5 — Test sprint (separate session, after Claude Code PASS on diff)" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L305 | neighbors=[TASK LIST] | lang=en
- "specs_antigravity_s114_comms_fix_spec_task_6_merge": "Task 6 — Merge" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L356 | neighbors=[TASK LIST] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-364.json

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
