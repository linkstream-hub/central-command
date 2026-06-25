# Node Description Batch 69 of 412

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

- "specs_phase3_schema_spec_infrastructure": "INFRASTRUCTURE" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L80 | neighbors=[`orgs` — Federated entity registry, `sentinel_log` — Railway Sentinel write…, NEW TABLES BY DOMAIN]
- "specs_spec_p1_3_token_hash_verify": "SPEC_P1_3_TOKEN_HASH_VERIFY.md" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L1 | neighbors=[One-sprint audit. No code changes expec…, Owner: AG | Reviewer: Claude Code | Bra…, SPEC: P1-3 — Session Token Hash Verific…]
- "specs_spec_p1_4_paga_unit_tests": "SPEC_P1_4_PAGA_UNIT_TESTS.md" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L1 | neighbors=[Closes the highest CA legal exposure ga…, Owner: AG | Reviewer: Claude Code | Bra…, SPEC: P1-4 — PAGA Unit Tests (Vitest)]
- "specs_spec_p2_1_infra_hardening": "SPEC_P2_1_INFRA_HARDENING.md" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L1 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…, Phase 2 opener. CI dependency security …, SPEC: P2-1 — Infrastructure Hardening]
- "specs_sprint_cc_full_validation_prerequisites_brandon_must_complete_before_ag_runs": "Prerequisites — Brandon must complete before AG runs" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md:L28 | neighbors=[Author: Claude Code — Session 106, PREREQ-1: Add env vars to tech-pwa Verc…, PREREQ-2: Confirm DashboardAPI.gs is de…]
- "specs_tech_pwa_api_spec_authentication": "Authentication" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L38 | neighbors=[Flow, Token format, For use with Google Antigravity to buil…]
- "specs_tech_pwa_api_spec_new_google_sheets_tabs_required_backend_will_create_these": "New Google Sheets Tabs Required (backend will create these)" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L536 | neighbors=[For use with Google Antigravity to buil…, Job Performance History, Time Records]
- "src_instrumentation_register": "register()" | kind=code-symbol | source=tech-pwa/src/instrumentation.ts:L3 | neighbors=[instrumentation.ts, sentry.edge.config.ts, sentry.server.config.ts]
- "src_proxy": "proxy.ts" | kind=code-symbol | source=tech-pwa/src/proxy.ts:L1 | neighbors=[01bf641 Initial commit — clean history, config, proxy()]
- "subscribe_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/push/subscribe/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, e61f88a fix(security+team): server-side…, POST()]
- "suggesttechs_buildtechscores": "buildTechScores()" | kind=code-symbol | source=SuggestTechs.js:L93 | neighbors=[SuggestTechs.js, loadSkillRatings(), suggestTechsForJob()]
- "tdd_workflow_skill_test_coverage_verification": "Test Coverage Verification" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L345 | neighbors=[Coverage Thresholds, Run Coverage Report, Test-Driven Development Workflow]
- "tech_auth_bearer": "Tech Auth (Bearer Token)" | kind=entity | source=docs/api/reference.md | neighbors=[Authentication, Dual Auth Architecture, Tech PWA API]
- "tech_pwa_block_11_tech_p_4fd4e_ete_shows_attestation_modal_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-4fd4e-ete-shows-attestation-modal-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "tech_pwa_block_11_tech_p_54d94_on_clock_in_fires_only_once_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-54d94-on-Clock-In-fires-only-once-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "tech_pwa_block_11_tech_p_60bd6_job_navigates_to_job_detail_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-60bd6-job-navigates-to-job-detail-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "tech_pwa_block_11_tech_p_6bc05_ob_sorts_above_standard_job_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-6bc05-ob-sorts-above-STANDARD-job-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "tech_pwa_block_11_tech_p_7ac9c_list_renders_assigned_jobs_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-7ac9c--list-renders-assigned-jobs-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "tech_pwa_block_11_tech_p_c003a_d_shifts_ui_to_active_state_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c003a-d-shifts-UI-to-active-state-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "tech_pwa_block_11_tech_p_c5c2f_exists_and_is_not_disabled_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c5c2f--exists-and-is-not-disabled-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "tech_pwa_block_11_tech_p_e4c3f_page_renders_balance_cards_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-e4c3f--page-renders-balance-cards-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "tech_pwa_block_11_tech_p_f9eae_testation_redirects_to_jobs_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-f9eae-testation-redirects-to-jobs-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "tech_pwa_readme": "README.md" | kind=entity | source=tech-pwa/README.md:L1 | neighbors=[Deploy on Vercel, Getting Started, Learn More]
- "tech_pwa_sentry_client_config": "sentry.client.config.ts" | kind=code-symbol | source=tech-pwa/sentry.client.config.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 9ad6303 feat(p1): Professional Infrastr…, c94407e Merge remote-tracking branch 'o…]
- "tech_pwa_src_app_track_jobid_page_tsx_jobid_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/track/[jobId]/page.tsx:L1 | neighbors=[TenantTrackPage(), types.ts, Job]
- "tech_pwa_vitest_setup": "vitest.setup.ts" | kind=code-symbol | source=tech-pwa/vitest.setup.ts:L1 | neighbors=[086dc4e feat(phase-18): event publishin…, 41b6a57 feat(job-update): Phase 18 even…, 04dc491 feat(job-update): Phase 18 even…]
- "tech_session_ts": "Tech Session" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts | neighbors=[Clocked In Bar, page.tsx, Shift Session Concept]
- "templates_ai_spec_6_guardrails": "6. Guardrails" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L198 | neighbors=[Offline (Flywheel), Online (Real-Time), AI-SPEC — Phase {N}: {phase_name}]
- "templates_dev_preferences_developer_preferences": "Developer Preferences" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/dev-preferences.md:L5 | neighbors=[dev-preferences.md, Behavioral Directives, Stack Preferences]
- "templates_discovery_key_findings": "Key Findings" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L88 | neighbors=[[Category 1], [Category 2], [Topic] Discovery]
- "templates_discussion_log_discussion_log_md_template_for_discuss_phase_git_commit_step": "DISCUSSION-LOG.md template — for discuss-phase git_commit step" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/templates/discussion-log.md:L1 | neighbors=[discussion-log.md, Purpose, Template body]
- "templates_discussion_log_discussion_log_template": "Discussion Log Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discussion-log.md:L1 | neighbors=[discussion-log.md, Format, Rules]
- "templates_milestone_archive_phases": "Phases" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone-archive.md:L19 | neighbors=[Milestone v{{VERSION}}: {{MILESTONE_NAM…, Phase 2.1: Critical Security Patch (INS…, Phase {{PHASE_NUM}}: {{PHASE_NAME}}]
- "templates_research_or": "or" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research.md:L89 | neighbors=[research.md, Good Example, Guidelines]
- "templates_retrospective_project_retrospective": "Project Retrospective" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L1 | neighbors=[retrospective.md, Cross-Milestone Trends, Milestone: v{version} — {name}]
- "templates_roadmap_roadmap_template": "Roadmap Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/roadmap.md:L1 | neighbors=[roadmap.md, Initial Roadmap (v1.0 Greenfield), Milestone-Grouped Roadmap (After v1.0 S…]
- "tests_globalsetup_globalsetup": "globalSetup()" | kind=code-symbol | source=tech-pwa/tests/globalSetup.ts:L67 | neighbors=[globalSetup.ts, applySchemaIfNeeded(), seedFixtures()]
- "tests_intake_processor_test": "intake-processor.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/intake-processor.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, intake-processor.ts, processIntakePayload()]
- "training_exemplars_exemplar_1_spec_generation": "EXEMPLAR 1: SPEC GENERATION" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L6 | neighbors=[❌ FAIL — Vague, prose-only, no code, ✅ PASS — Correct level of detail (based…, SENTINEL EXEMPLARS — PASS vs FAIL]
- "training_exemplars_exemplar_2_backend_spec": "EXEMPLAR 2: BACKEND SPEC" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L55 | neighbors=[❌ FAIL — Uses getActiveSpreadsheet, no …, ✅ PASS — Correct DashboardAPI.gs spec, SENTINEL EXEMPLARS — PASS vs FAIL]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-068.json

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
