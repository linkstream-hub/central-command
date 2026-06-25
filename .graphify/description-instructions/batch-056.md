# Node Description Batch 57 of 412

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

- "specs_spec_p2a_ci_hardening": "SPEC_P2A_CI_HARDENING.md" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L1 | neighbors=[Closes P2-1 (npm audit), P2-5 (nightly …, Owner: AG | Reviewer: Claude Code | Bra…, P2-2 (Dependabot) is already done — .gi…, SPEC: P2A — CI Hardening] | lang=pt
- "specs_spec_p2a_ci_hardening_owner_ag_reviewer_claude_code_branch_feat_p2a_ci_hardening": "Owner: AG | Reviewer: Claude Code | Branch: feat/p2a-ci-hardening" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L4 | neighbors=[SPEC_P2A_CI_HARDENING.md, CONTEXT, MERGE GATE, TASKS] | lang=en
- "specs_sprint_tier_2_5_security": "SPRINT_TIER_2_5_SECURITY.md" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L1 | neighbors=[Branch: feat/tier-2-5-security-hardening, Claude Code authoring date: 2026-05-27, SPRINT: Tier 2.5 — Security & Quality H…, Status: READY FOR EXECUTION] | lang=en
- "specs_tech_pwa_api_spec_data_models": "Data Models" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L81 | neighbors=[Job, TechSession (stored in localStorage), TimeRecord, For use with Google Antigravity to buil…] | lang=en
- "sync_gmail_history_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/cron/sync-gmail-history/route.ts:L9 | neighbors=[route.ts, getCurrentHistoryId(), getNewMessages(), getThreadMessageIds()] | lang=en
- "tdd_workflow_skill_3_test_types": "3. Test Types" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L30 | neighbors=[E2E Tests (Playwright), Integration Tests, Unit Tests, Core Principles] | lang=en
- "tdd_workflow_skill_continuous_testing": "Continuous Testing" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L416 | neighbors=[CI/CD Integration, Pre-Commit Hook, Watch Mode During Development, Test-Driven Development Workflow] | lang=en
- "tdd_workflow_skill_mocking_external_services": "Mocking External Services" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L308 | neighbors=[OpenAI Mock, Redis Mock, Supabase Mock, Test-Driven Development Workflow] | lang=en
- "tdd_workflow_skill_testing_patterns": "Testing Patterns" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L172 | neighbors=[Test-Driven Development Workflow, API Integration Test Pattern, E2E Test Pattern (Playwright), Unit Test Pattern (Jest/Vitest)] | lang=en
- "tech_pwa_drizzle_config": "drizzle.config.ts" | kind=code-symbol | source=tech-pwa/drizzle.config.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 807a465 fix(foundation-06): drizzle-kit…, c9b0478 Merge branch 'main' of https://…, d7eb645 feat(p3-1): schema foundation —…] | lang=en
- "tech_pwa_next_config": "next.config.ts" | kind=code-symbol | source=tech-pwa/next.config.ts:L1 | neighbors=[01bf641 Initial commit — clean history, nextConfig, sentryConfig, withPWA] | lang=en
- "tech_pwa_sentry_edge_config": "sentry.edge.config.ts" | kind=code-symbol | source=tech-pwa/sentry.edge.config.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 9ad6303 feat(p1): Professional Infrastr…, c94407e Merge remote-tracking branch 'o…, register()] | lang=en
- "tech_pwa_sentry_server_config": "sentry.server.config.ts" | kind=code-symbol | source=tech-pwa/sentry.server.config.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 9ad6303 feat(p1): Professional Infrastr…, c94407e Merge remote-tracking branch 'o…, register()] | lang=en
- "templates_ai_spec_5_evaluation_strategy": "5. Evaluation Strategy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L164 | neighbors=[Dimensions, Eval Tooling, Reference Dataset, AI-SPEC — Phase {N}: {phase_name}] | lang=en
- "templates_context_context_md_template_for_discuss_phase_write_context_step": "CONTEXT.md template — for discuss-phase write_context step" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/templates/context.md:L1 | neighbors=[context.md, Conditional sections, Template body, Variable substitutions] | lang=en
- "templates_retrospective_cross_milestone_trends": "Cross-Milestone Trends" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L37 | neighbors=[Cumulative Quality, Process Evolution, Top Lessons (Verified Across Milestones), Project Retrospective] | lang=en
- "templates_verification_report_verification_report_template": "Verification Report Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/verification-report.md:L1 | neighbors=[verification-report.md, Example, File Template, Guidelines] | lang=en
- "tests_globalsetup_applyschemaifneeded": "applySchemaIfNeeded()" | kind=code-symbol | source=tech-pwa/tests/globalSetup.ts:L25 | neighbors=[globalSetup.ts, pgCode(), pgMessage(), globalSetup()] | lang=en
- "tests_intake_schema_test": "intake-schema.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/intake-schema.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, bdabbf4 fix: correct dashboard stats se…, intake-schema.ts, intakeSchema] | lang=en
- "tests_normalizeaddresskey_test": "normalizeAddressKey.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/normalizeAddressKey.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 2ea94d6 feat(phase-25): Parsing & Intak…, normalizeAddressKey.ts, normalizeAddressKey()] | lang=en
- "tests_wc_codes_test": "wc-codes.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/wc-codes.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4d7ba4d feat(phase-12): Neon-only cutov…, wc-codes.ts, resolveWCCode()] | lang=en
- "time_off_page_timeoffpage": "TimeOffPage()" | kind=code-symbol | source=tech-pwa/src/app/time-off/page.tsx:L33 | neighbors=[page.tsx, useToast(), useTranslation(), getSession()] | lang=en
- "training_exemplars_sentinel_exemplars_pass_vs_fail": "SENTINEL EXEMPLARS — PASS vs FAIL" | kind=entity | source=Sentinels/Training/EXEMPLARS.md:L1 | neighbors=[EXEMPLARS.md, EXEMPLAR 1: SPEC GENERATION, EXEMPLAR 2: BACKEND SPEC, EXEMPLAR 3: HISTORICAL CORRECTIONS (wha…] | lang=en
- "windows_desktop_e2e_skill_per_step_trace_opt_in": "Per-Step Trace (opt-in)" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L369 | neighbors=[Caveats, Enable, Patch into BasePage, Windows Desktop E2E Testing] | lang=en
- "windows_desktop_e2e_skill_qt_specific": "Qt Specific" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L670 | neighbors=[Add Stable Identifiers to Qt Widgets, Enable UIA in Qt 5.x, Qt-Specific Quirks, Windows Desktop E2E Testing] | lang=en
- "workflows_analyze_dependencies_3_detect_dependency_relationships": "3. Detect Dependency Relationships" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/analyze-dependencies.md:L31 | neighbors=[analyze-dependencies.md, Data Flow Detection, File Overlap Detection, Semantic Dependency Detection] | lang=en
- "workflows_extract_learnings": "extract-learnings.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/extract-learnings.md:L1 | neighbors=[1. Decisions, 2. Lessons, 3. Patterns, 4. Surprises] | lang=en
- "workflows_import_path_a_mode_plan_from": "Path A: MODE=plan (--from)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/import.md:L67 | neighbors=[Import Workflow, BLOCKER checks (any one prevents import…, INFO checks (informational, no action n…, WARNING checks (user confirmation requi…] | lang=pt
- "workflows_reapply_patches_step_2_determine_baseline_for_three_way_comparison": "Step 2: Determine baseline for three-way comparison" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L119 | neighbors=[Reapply Local Patches Workflow, Option A: Pristine hash from backup-met…, Option B: Pristine snapshot directory, Option C: No baseline available (two-wa…] | lang=en
- "workflows_secure_phase_2_discovery": "2. Discovery" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/secure-phase.md:L47 | neighbors=[secure-phase.md, 2a. Read Phase Artifacts, 2b. Read Summary Threat Flags, 2c. Build Threat Register] | lang=en
- "03_gap_remediation_03_research_sources": "Sources" | kind=entity | source=.planning/phases/03-gap-remediation/03-RESEARCH.md:L540 | neighbors=[Phase 3: Gap Remediation — Research, Primary (HIGH confidence), Secondary (MEDIUM confidence)] | lang=en
- "06_drizzle_kit_migrate_fix_06_01_plan": "06-01-PLAN.md" | kind=entity | source=.planning/phases/06-drizzle-kit-migrate-fix/06-01-PLAN.md:L1 | neighbors=[Phase 6 Verification Criteria, Summary, Test plan] | lang=en
- "10_gas_migration_scope_10_research_security_domain": "Security Domain" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L549 | neighbors=[Phase 10: GAS Migration Scope — Research, Applicable ASVS Categories, Open Security Gap (documented, not fixe…] | lang=en
- "12_data_integrity_audit_12_03_summary_what_was_built": "What Was Built" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-03-SUMMARY.md:L3 | neighbors=[Phase 12 — Wave 3 Summary: neon_audit.p…, neon_audit.py — Stubs Implemented, tests/test_neon_audit.py — 9 Tests Impl…] | lang=en
- "12_data_integrity_audit_12_research_security_domain": "Security Domain" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L646 | neighbors=[Phase 12: Data Integrity Audit - Resear…, Applicable ASVS Categories, Known Threat Patterns for this stack] | lang=en
- "15_gas_migration_phase_a_dead_code_cleanup_15_02_plan": "15-02-PLAN.md" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-02-PLAN.md:L1 | neighbors=[Rollback if a live caller was missed, STRIDE Threat Register, Trust Boundaries] | lang=en
- "15_gas_migration_phase_a_dead_code_cleanup_15_03_plan": "15-03-PLAN.md" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-03-PLAN.md:L1 | neighbors=[Rollback if a live caller was missed, STRIDE Threat Register, Trust Boundaries] | lang=en
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_existing_code_insights": "Existing Code Insights" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L44 | neighbors=[Delete Candidates (from GAS_MIGRATION_S…, Integration Points, Phase 15: GAS Migration — Phase A: Dead…] | lang=en
- "17_gas_migration_phase_b_pure_js_utility_migration_17_research_phase_17_techpwa_cutover_validatetoken_clock_events_research": "Phase 17: TechPWA Cutover (validateToken & Clock Events) - Research" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-RESEARCH.md:L1 | neighbors=[17-RESEARCH.md, Canonical References, Context and Findings] | lang=en
- "18_gas_migration_phase_c_techpwa_cutover_18_01_plan_execution_steps": "Execution Steps" | kind=entity | source=.planning/phases/18-gas-migration-phase-c-techpwa-cutover/18-01-PLAN.md:L12 | neighbors=[Step 1: Fully Stub `doGet` and `doPost`…, Step 2: Deployment, Phase 18 Execution Plan: Full TechPWA C…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-056.json

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
