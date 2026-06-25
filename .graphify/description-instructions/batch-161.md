# Node Description Batch 162 of 412

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

- "archive_antigravity_tenant_scheduling_spec_job_type_update_in_tech_pwa_src_lib_types_ts": "Job type update in `tech-pwa/src/lib/types.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L69 | neighbors=[SCHEMA CHANGES]
- "archive_antigravity_tenant_scheduling_spec_jsx_add_in_the_dispatcher_actions_section_after_email_tenant_if_present": "JSX (add in the dispatcher actions section, after \"Email Tenant\" if present):" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L669 | neighbors=["SEND SCHEDULING LINK" BUTTON IN JOB DE…]
- "archive_antigravity_tenant_scheduling_spec_new_next_js_page_tech_pwa_src_app_schedule_token_page_tsx": "NEW NEXT.JS PAGE — `tech-pwa/src/app/schedule/[token]/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L334 | neighbors=[Sprint 30 | Spec author: Claude Code | …]
- "archive_antigravity_tenant_scheduling_spec_overview": "OVERVIEW" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L7 | neighbors=[Sprint 30 | Spec author: Claude Code | …]
- "archive_antigravity_tenant_scheduling_spec_rowtojob_update": "rowToJob() update" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L60 | neighbors=[SCHEMA CHANGES]
- "archive_antigravity_tenant_scheduling_spec_state": "State:" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L647 | neighbors=["SEND SCHEDULING LINK" BUTTON IN JOB DE…]
- "archive_antigravity_tenant_scheduling_spec_tenant_self_scheduling_full_flow": "Tenant Self-Scheduling — Full Flow" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L2 | neighbors=[ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md]
- "archive_antigravity_tenant_scheduling_spec_tenantselfscheduleda_params": "`tenantSelfScheduleDA(params)`" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L201 | neighbors=[NEW DASHBOARD API ENDPOINTS — `dashboar…]
- "archive_antigravity_tenant_scheduling_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L700 | neighbors=[Sprint 30 | Spec author: Claude Code | …]
- "archive_antigravity_tenant_scheduling_spec_what_not_to_touch": "WHAT NOT TO TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L691 | neighbors=[Sprint 30 | Spec author: Claude Code | …]
- "archive_antigravity_tenant_scheduling_spec_wire_in_dopost_add_after_getjobcomments_line": "Wire in doPost (add after `getJobComments` line):" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L82 | neighbors=[NEW DASHBOARD API ENDPOINTS — `dashboar…]
- "archive_antigravity_test_fixes_spec": "ANTIGRAVITY_TEST_FIXES_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — Battle Test Fix Pass]
- "archive_antigravity_test_fixes_spec_after_all_fixes_run_typescript_check": "After All Fixes — Run TypeScript Check" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L632 | neighbors=[ANTIGRAVITY SPEC — Battle Test Fix Pass]
- "archive_antigravity_test_fixes_spec_delete_the_entire_current_content": "Delete the entire current content:" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L147 | neighbors=[Fix 4 — Tech PWA /time-off page doesn't…]
- "archive_antigravity_test_fixes_spec_file_to_replace": "File to replace" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L144 | neighbors=[Fix 4 — Tech PWA /time-off page doesn't…]
- "archive_antigravity_test_fixes_spec_find_these_two_lines_in_the_nav_items_array_lines_32_33": "Find these two lines in the NAV_ITEMS array (lines ~32–33):" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L523 | neighbors=[Fix 6 — Sidebar navigation labels are w…]
- "archive_antigravity_test_fixes_spec_find_this_block_coordination_tab_array_lines_242_245": "Find this block (coordination tab array, lines ~242–245):" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L18 | neighbors=[Fix 1 — "Ready to Schedule" tab missing…]
- "archive_antigravity_test_fixes_spec_find_this_block_inside_handlemarkcomplete": "Find this block inside `handleMarkComplete`:" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L93 | neighbors=[Fix 3 — Attestation modal stale closure…]
- "archive_antigravity_test_fixes_spec_find_this_line_inside_loadjobs_after_if_res_success": "Find this line (inside `loadJobs`, after `if (res.success)`):" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L58 | neighbors=[Fix 2 — URGENT jobs not sorted first in…]
- "archive_antigravity_test_fixes_spec_if_assignedtech_is_full_format_e_g_salvador_cabrera_101": "If assignedTech is full format (e.g. `\"Salvador Cabrera #101\"`):" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L573 | neighbors=[Fix 7 — DnD scheduling does not propaga…]
- "archive_antigravity_test_fixes_spec_if_assignedtech_is_name_only_e_g_salvador_cabrera": "If assignedTech is name-only (e.g. `\"Salvador Cabrera\"`):" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L568 | neighbors=[Fix 7 — DnD scheduling does not propaga…]
- "archive_antigravity_test_fixes_spec_replace_with_this_complete_page": "Replace with this complete page:" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L156 | neighbors=[Fix 4 — Tech PWA /time-off page doesn't…]
- "archive_antigravity_test_fixes_spec_step_1_add_clockingin_state_variable": "Step 1 — Add clockingIn state variable" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L418 | neighbors=[Fix 5 — Clock In button allows double-t…]
- "archive_antigravity_test_fixes_spec_step_2_gate_handleclockin": "Step 2 — Gate handleClockIn" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L431 | neighbors=[Fix 5 — Clock In button allows double-t…]
- "archive_antigravity_test_fixes_spec_step_3_disable_the_button": "Step 3 — Disable the button" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L481 | neighbors=[Fix 5 — Clock In button allows double-t…]
- "archive_antigravity_test_fixes_spec_the_actual_fix": "The actual fix" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L576 | neighbors=[Fix 7 — DnD scheduling does not propaga…]
- "archive_antigravity_test_fixes_spec_verification_checklist_must_confirm_all_before_marking_pass": "Verification checklist (must confirm ALL before marking PASS)" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L616 | neighbors=[Fix 7 — DnD scheduling does not propaga…]
- "archive_antigravity_test_fixes_spec_what_must_happen_end_to_end": "What must happen end-to-end:" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L550 | neighbors=[Fix 7 — DnD scheduling does not propaga…]
- "archive_antigravity_test_fixes_spec_what_must_not_be_changed": "What Must NOT Be Changed" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L625 | neighbors=[ANTIGRAVITY SPEC — Battle Test Fix Pass]
- "archive_antigravity_test_fixes_spec_what_to_keep_unchanged": "What to keep unchanged" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L392 | neighbors=[Fix 4 — Tech PWA /time-off page doesn't…]
- "archive_antigravity_test_fixes_spec_what_to_verify_before_touching_any_code": "What to verify BEFORE touching any code" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L563 | neighbors=[Fix 7 — DnD scheduling does not propaga…]
- "archive_antigravity_test_mode_spec": "ANTIGRAVITY_TEST_MODE_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — Battle Test Mode + F…]
- "archive_antigravity_test_mode_spec_1_1_stat_cards": "1.1 Stat Cards" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L609 | neighbors=[TEST BLOCK 1 — Dashboard & Job Queue]
- "archive_antigravity_test_mode_spec_1_2_status_tabs": "1.2 Status Tabs" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L619 | neighbors=[TEST BLOCK 1 — Dashboard & Job Queue]
- "archive_antigravity_test_mode_spec_1_3_job_card_content": "1.3 Job Card Content" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L630 | neighbors=[TEST BLOCK 1 — Dashboard & Job Queue]
- "archive_antigravity_test_mode_spec_1_4_search": "1.4 Search" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L640 | neighbors=[TEST BLOCK 1 — Dashboard & Job Queue]
- "archive_antigravity_test_mode_spec_1a_strip_production_api_urls_from_env_local": "1A — Strip production API URLs from `.env.local`" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L13 | neighbors=[PART 1 — ENVIRONMENT SETUP]
- "archive_antigravity_test_mode_spec_1b_replace_mock_data_in_tech_pwa_src_lib_dashboard_api_ts": "1B — Replace mock data in `tech-pwa/src/lib/dashboard-api.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L41 | neighbors=[PART 1 — ENVIRONMENT SETUP]
- "archive_antigravity_test_mode_spec_1c_create_tech_pwa_src_app_api_mock_exec_route_ts": "1C — Create `tech-pwa/src/app/api/mock/exec/route.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L375 | neighbors=[PART 1 — ENVIRONMENT SETUP]
- "archive_antigravity_test_mode_spec_1d_add_dev_credentials_provider_to_tech_pwa_src_auth_ts": "1D — Add dev Credentials provider to `tech-pwa/src/auth.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L512 | neighbors=[PART 1 — ENVIRONMENT SETUP]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-161.json

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
