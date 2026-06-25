# Node Description Batch 389 of 412

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

- "tests_event_bus_test_mockemailsend": "mockEmailSend" | kind=code-symbol | source=tech-pwa/src/lib/services/__tests__/event-bus.test.ts:L9 | neighbors=[event-bus.test.ts]
- "tests_globalsetup_skip_codes": "SKIP_CODES" | kind=code-symbol | source=tech-pwa/tests/globalSetup.ts:L14 | neighbors=[globalSetup.ts]
- "tests_gmail_webhook_post_test_makerequest": "makeRequest()" | kind=code-symbol | source=tech-pwa/src/app/api/webhooks/n8n/gmail/__tests__/gmail.webhook.post.test.ts:L54 | neighbors=[gmail.webhook.post.test.ts]
- "tests_job_state_test_exitsfrom": "exitsFrom()" | kind=code-symbol | source=tech-pwa/src/domain/job/__tests__/job-state.test.ts:L48 | neighbors=[job-state.test.ts]
- "tests_job_state_test_job_id": "JOB_ID" | kind=code-symbol | source=tech-pwa/src/domain/job/__tests__/job-state.test.ts:L14 | neighbors=[job-state.test.ts]
- "tests_job_state_test_makedal": "makeDal()" | kind=code-symbol | source=tech-pwa/src/domain/job/__tests__/job-state.test.ts:L38 | neighbors=[job-state.test.ts]
- "tests_job_state_test_makejob": "makeJob()" | kind=code-symbol | source=tech-pwa/src/domain/job/__tests__/job-state.test.ts:L17 | neighbors=[job-state.test.ts]
- "tests_job_state_test_tech_id": "TECH_ID" | kind=code-symbol | source=tech-pwa/src/domain/job/__tests__/job-state.test.ts:L15 | neighbors=[job-state.test.ts]
- "time_off_page_balance": "Balance" | kind=code-symbol | source=tech-pwa/src/app/time-off/page.tsx:L17 | neighbors=[page.tsx]
- "time_off_page_requesttype": "RequestType" | kind=code-symbol | source=tech-pwa/src/app/time-off/page.tsx:L15 | neighbors=[page.tsx]
- "time_off_page_timeoffrequest": "TimeOffRequest" | kind=code-symbol | source=tech-pwa/src/app/time-off/page.tsx:L23 | neighbors=[page.tsx]
- "today_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/schedule/today/route.ts:L10 | neighbors=[route.ts]
- "training_exemplars": "EXEMPLARS.md" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L1 | neighbors=[SENTINEL EXEMPLARS — PASS vs FAIL]
- "training_exemplars_fail_antigravity_freelanced_on_status_values_session_14_april_21_2026": "❌ FAIL — Antigravity freelanced on status values (Session 14, April 21 2026)" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L106 | neighbors=[EXEMPLAR 3: HISTORICAL CORRECTIONS (wha…]
- "training_exemplars_fail_antigravity_moved_gs_files_session_7_april_18_2026": "❌ FAIL — Antigravity moved .gs files (Session 7, April 18 2026)" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L101 | neighbors=[EXEMPLAR 3: HISTORICAL CORRECTIONS (wha…]
- "training_exemplars_fail_claude_code_implemented_instead_of_speccing_session_20_april_23_2026": "❌ FAIL — Claude Code implemented instead of speccing (Session 20, April 23 2026)" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L111 | neighbors=[EXEMPLAR 3: HISTORICAL CORRECTIONS (wha…]
- "training_exemplars_fail_spec_had_no_what_not_to_change_section_multiple_sessions": "❌ FAIL — Spec had no \"what NOT to change\" section (multiple sessions)" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L116 | neighbors=[EXEMPLAR 3: HISTORICAL CORRECTIONS (wha…]
- "training_exemplars_fail_uses_getactivespreadsheet_no_error_handling_magic_indices": "❌ FAIL — Uses getActiveSpreadsheet, no error handling, magic indices" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L85 | neighbors=[EXEMPLAR 2: BACKEND SPEC]
- "training_exemplars_fail_vague_prose_only_no_code": "❌ FAIL — Vague, prose-only, no code" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L44 | neighbors=[EXEMPLAR 1: SPEC GENERATION]
- "training_exemplars_pass_correct_dashboardapi_gs_spec": "✅ PASS — Correct DashboardAPI.gs spec" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L57 | neighbors=[EXEMPLAR 2: BACKEND SPEC]
- "training_exemplars_pass_correct_level_of_detail_based_on_antigravity_queue_tab_spec_md": "✅ PASS — Correct level of detail (based on ANTIGRAVITY_QUEUE_TAB_SPEC.md)" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L8 | neighbors=[EXEMPLAR 1: SPEC GENERATION]
- "training_identity_primary": "IDENTITY_PRIMARY.md" | kind=entity | source=Sentinels/Training/IDENTITY_PRIMARY.md:L1 | neighbors=[SENTINEL IDENTITY — APT CENTRAL COMMAND…]
- "training_identity_primary_ai_division_of_labor_i_enforce": "AI Division of Labor I Enforce" | kind=entity | source=Sentinels/Training/IDENTITY_PRIMARY.md:L63 | neighbors=[SENTINEL IDENTITY — APT CENTRAL COMMAND…]
- "training_identity_primary_column_maps_i_enforce_never_get_wrong": "Column Maps I Enforce (Never Get Wrong)" | kind=entity | source=Sentinels/Training/IDENTITY_PRIMARY.md:L26 | neighbors=[SENTINEL IDENTITY — APT CENTRAL COMMAND…]
- "training_identity_primary_my_output_standard": "My Output Standard" | kind=entity | source=Sentinels/Training/IDENTITY_PRIMARY.md:L73 | neighbors=[SENTINEL IDENTITY — APT CENTRAL COMMAND…]
- "training_identity_primary_rbac_roles": "RBAC Roles" | kind=entity | source=Sentinels/Training/IDENTITY_PRIMARY.md:L53 | neighbors=[SENTINEL IDENTITY — APT CENTRAL COMMAND…]
- "training_identity_primary_status_values_i_enforce": "Status Values I Enforce" | kind=entity | source=Sentinels/Training/IDENTITY_PRIMARY.md:L45 | neighbors=[SENTINEL IDENTITY — APT CENTRAL COMMAND…]
- "training_identity_primary_the_system_i_protect": "The System I Protect" | kind=entity | source=Sentinels/Training/IDENTITY_PRIMARY.md:L9 | neighbors=[SENTINEL IDENTITY — APT CENTRAL COMMAND…]
- "training_rules_of_engagement": "RULES_OF_ENGAGEMENT.md" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L1 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "training_rules_of_engagement_1_files_never_to_touch_antigravity_hard_ban": "1. FILES NEVER TO TOUCH (Antigravity hard ban)" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L3 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "training_rules_of_engagement_10_antigravity_must_not_freelance": "10. ANTIGRAVITY MUST NOT FREELANCE" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L50 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "training_rules_of_engagement_2_column_maps_are_frozen": "2. COLUMN MAPS ARE FROZEN" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L9 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "training_rules_of_engagement_3_status_values_are_frozen": "3. STATUS VALUES ARE FROZEN" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L12 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "training_rules_of_engagement_4_design_standards_are_non_negotiable": "4. DESIGN STANDARDS ARE NON-NEGOTIABLE" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L15 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "training_rules_of_engagement_5_rbac_is_always_required": "5. RBAC IS ALWAYS REQUIRED" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L24 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "training_rules_of_engagement_6_backend_spec_requirements": "6. BACKEND SPEC REQUIREMENTS" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L27 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "training_rules_of_engagement_7_deployment_sequence_is_fixed": "7. DEPLOYMENT SEQUENCE IS FIXED" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L34 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "training_rules_of_engagement_8_no_mock_data_in_production_specs": "8. NO MOCK DATA IN PRODUCTION SPECS" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L39 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "training_rules_of_engagement_9_ca_compliance_logic_is_never_simplified": "9. CA COMPLIANCE LOGIC IS NEVER SIMPLIFIED" | kind=entity | source=Sentinels/Training/RULES_OF_ENGAGEMENT.md:L42 | neighbors=[RULES OF ENGAGEMENT — APT CENTRAL COMMA…]
- "unread_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/unread/route.ts:L8 | neighbors=[route.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-388.json

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
