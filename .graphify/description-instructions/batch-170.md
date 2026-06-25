# Node Description Batch 171 of 412

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
Write every description in Portuguese (pt). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "artifacts_15_caller_graph_caller_graph_context": "Caller Graph Context" | kind=entity | source=artifacts/15_caller_graph.md:L64 | neighbors=[Phase 15-01 Caller Graph & Dead Code An…]
- "artifacts_15_caller_graph_code_js": "Code.js" | kind=entity | source=artifacts/15_caller_graph.md:L19 | neighbors=[Wave 2 Deletion Candidates]
- "artifacts_15_caller_graph_dashboardapi_gs": "DashboardAPI.gs" | kind=entity | source=artifacts/15_caller_graph.md:L42 | neighbors=[Wave 2 Deletion Candidates]
- "artifacts_15_caller_graph_exclude_list_do_not_delete": "EXCLUDE List (DO NOT DELETE)" | kind=entity | source=artifacts/15_caller_graph.md:L6 | neighbors=[Phase 15-01 Caller Graph & Dead Code An…]
- "artifacts_15_caller_graph_overview": "Overview" | kind=entity | source=artifacts/15_caller_graph.md:L3 | neighbors=[Phase 15-01 Caller Graph & Dead Code An…]
- "artifacts_15_caller_graph_suggesttechs_js": "SuggestTechs.js" | kind=entity | source=artifacts/15_caller_graph.md:L37 | neighbors=[Wave 2 Deletion Candidates]
- "artifacts_phase2_verification_results": "phase2-verification-results.md" | kind=entity | source=artifacts/phase2-verification-results.md:L1 | neighbors=[Phase 2: Core Loop Verification Results]
- "artifacts_phase2_verification_results_bootstrapjobstoneon_output": "bootstrapJobsToNeon() Output" | kind=entity | source=artifacts/phase2-verification-results.md:L18 | neighbors=[Phase 2: Core Loop Verification Results]
- "artifacts_phase2_verification_results_gap_inventory": "Gap Inventory" | kind=entity | source=artifacts/phase2-verification-results.md:L22 | neighbors=[Phase 2: Core Loop Verification Results]
- "artifacts_phase3_verification_results": "phase3-verification-results.md" | kind=entity | source=artifacts/phase3-verification-results.md:L1 | neighbors=[Phase 3 Verification Results]
- "artifacts_phase3_verification_results_1_requirements_status_v1_0_core_loop": "1. Requirements Status (v1.0 Core Loop)" | kind=entity | source=artifacts/phase3-verification-results.md:L6 | neighbors=[Phase 3 Verification Results]
- "artifacts_phase3_verification_results_2_gap_remediation_status": "2. Gap Remediation Status" | kind=entity | source=artifacts/phase3-verification-results.md:L20 | neighbors=[Phase 3 Verification Results]
- "artifacts_phase3_verification_results_3_data_cleanup": "3. Data Cleanup" | kind=entity | source=artifacts/phase3-verification-results.md:L34 | neighbors=[Phase 3 Verification Results]
- "artifacts_phase3_verification_results_4_coord_03_re_test": "4. COORD-03 Re-Test" | kind=entity | source=artifacts/phase3-verification-results.md:L39 | neighbors=[Phase 3 Verification Results]
- "auth_block_1_auth_login_1_1_root_redirects_to_login_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login-1-1-root-redirects-to-login-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "auth_block_1_auth_login_1_1_root_redirects_to_login_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login-1-1-root-redirects-to-login-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "auth_block_1_auth_login_1_1_root_redirects_to_login_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login-1-1-root-redirects-to-login-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "auth_block_1_auth_login_6924a_ed_route_redirects_to_login_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--6924a-ed-route-redirects-to-login-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "auth_block_1_auth_login_6924a_ed_route_redirects_to_login_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--6924a-ed-route-redirects-to-login-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "auth_block_1_auth_login_6924a_ed_route_redirects_to_login_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--6924a-ed-route-redirects-to-login-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "auth_block_1_auth_login_aff9d_n_session_and_lands_on_live_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--aff9d-n-session-and-lands-on-live-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "auth_block_1_auth_login_aff9d_n_session_and_lands_on_live_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--aff9d-n-session-and-lands-on-live-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "auth_block_1_auth_login_aff9d_n_session_and_lands_on_live_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--aff9d-n-session-and-lands-on-live-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "auth_block_1_auth_login_aff9d_n_session_and_lands_on_live_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--aff9d-n-session-and-lands-on-live-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "auth_block_1_auth_login_aff9d_n_session_and_lands_on_live_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--aff9d-n-session-and-lands-on-live-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "auth_block_1_auth_login_aff9d_n_session_and_lands_on_live_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--aff9d-n-session-and-lands-on-live-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "auth_block_1_auth_login_aff9d_n_session_and_lands_on_live_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--aff9d-n-session-and-lands-on-live-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "auth_block_1_auth_login_aff9d_n_session_and_lands_on_live_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--aff9d-n-session-and-lands-on-live-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bab25_ith_invalid_pin_shows_error_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bab25-ith-invalid-PIN-shows-error-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bab25_ith_invalid_pin_shows_error_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bab25-ith-invalid-PIN-shows-error-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bab25_ith_invalid_pin_shows_error_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bab25-ith-invalid-PIN-shows-error-chromium/error-context.md:L30 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bab25_ith_invalid_pin_shows_error_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bab25-ith-invalid-PIN-shows-error-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bab25_ith_invalid_pin_shows_error_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bab25-ith-invalid-PIN-shows-error-chromium/error-context.md:L62 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bab25_ith_invalid_pin_shows_error_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bab25-ith-invalid-PIN-shows-error-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bab25_ith_invalid_pin_shows_error_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bab25-ith-invalid-PIN-shows-error-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bab25_ith_invalid_pin_shows_error_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bab25-ith-invalid-PIN-shows-error-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bb41b_alid_badge_pin_reaches_jobs_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bb41b-alid-badge-PIN-reaches-jobs-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bb41b_alid_badge_pin_reaches_jobs_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bb41b-alid-badge-PIN-reaches-jobs-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bb41b_alid_badge_pin_reaches_jobs_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bb41b-alid-badge-PIN-reaches-jobs-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "auth_block_1_auth_login_bb41b_alid_badge_pin_reaches_jobs_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bb41b-alid-badge-PIN-reaches-jobs-chromium/error-context.md:L7 | neighbors=[error-context.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-170.json

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
