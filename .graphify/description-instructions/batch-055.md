# Node Description Batch 56 of 412

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

- "research_stack_recommended_stack": "Recommended Stack" | kind=entity | source=.planning/research/STACK.md:L13 | neighbors=[Core Technologies, Development Tools, Supporting Libraries, Stack Research]
- "rules": "RULES.md" | kind=entity | source=RULES.md:L1 | neighbors=[Last updated: 2026-05-21, Load this FIRST, before any other conte…, RULES.md — APT Central Command, Universal constraints for all agents on…]
- "sandbox_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/sandbox/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, sandbox-store.ts, sandboxAction(), POST()]
- "schedule_redesign_sr_01_01_summary_sr_01_01_summary": "sr-01-01 SUMMARY" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-01-SUMMARY.md:L1 | neighbors=[sr-01-01-SUMMARY.md, Objective Completed, Output, Verification & Tasks]
- "schedule_redesign_sr_01_04_summary_sr_01_04_summary": "SR-01-04 Summary" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-04-SUMMARY.md:L1 | neighbors=[sr-01-04-SUMMARY.md, Accomplishments, Code Changes, Verification]
- "schedule_redesign_sr_01_research_lock_and_send_backend_requirements": "Lock and Send — Backend Requirements" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L262 | neighbors=[DB Schema Status, n8n Webhook Integration Pattern, New API Route Spec: `POST /api/schedule…, Phase SR-01: Schedule Page Redesign - R…]
- "schedule_redesign_sr_01_research_playwright_coverage": "Playwright Coverage" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L456 | neighbors=[Phase SR-01: Schedule Page Redesign - R…, New Tests Required, Regression Risk Analysis, Tests Currently Covering `/schedule`]
- "schedule_redesign_sr_01_research_sources": "Sources" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L655 | neighbors=[Phase SR-01: Schedule Page Redesign - R…, Primary (HIGH confidence), Secondary (MEDIUM confidence), Tertiary (LOW confidence)]
- "schedule_redesign_sr_01_research_user_constraints_from_context_md": "User Constraints (from CONTEXT.md)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L10 | neighbors=[Phase SR-01: Schedule Page Redesign - R…, Claude's Discretion, Deferred Ideas (OUT OF SCOPE), Locked Decisions]
- "schedule_redesign_sr_01_research_validation_architecture": "Validation Architecture" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L603 | neighbors=[Phase SR-01: Schedule Page Redesign - R…, Phase Requirements → Test Map, Test Framework, Wave 0 Gaps (before implementation)]
- "scripts_check_job": "check-job.js" | kind=code-symbol | source=tech-pwa/scripts/check-job.js:L1 | neighbors=[01bf641 Initial commit — clean history, 4c39575 fix: DAL snake_case mapping, de…, 7dfecc5 fix(dal): map Drizzle ORM snake…, { Client }]
- "scripts_db_repair_journal": "db-repair-journal.ts" | kind=code-symbol | source=tech-pwa/scripts/db-repair-journal.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 807a465 fix(foundation-06): drizzle-kit…, c9b0478 Merge branch 'main' of https://…, main()]
- "scripts_migrate": "migrate.ts" | kind=code-symbol | source=tech-pwa/scripts/migrate.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 807a465 fix(foundation-06): drizzle-kit…, c9b0478 Merge branch 'main' of https://…, main()]
- "scripts_migrate_dispatch_queue": "migrate-dispatch-queue.ts" | kind=code-symbol | source=tech-pwa/scripts/migrate-dispatch-queue.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 67b602c feat(p3-3): dispatch queue + ma…, normalizeAddressKey(), run()]
- "scripts_migrate_master_directory": "migrate-master-directory.ts" | kind=code-symbol | source=tech-pwa/scripts/migrate-master-directory.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 67b602c feat(p3-3): dispatch queue + ma…, normalizeAddressKey(), run()]
- "scripts_migrate_time_records": "migrate-time-records.ts" | kind=code-symbol | source=tech-pwa/scripts/migrate-time-records.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 1bfef1d feat(p3-2): migration scripts —…, 24cd71e feat(p3-2): time records migrat…, run()]
- "scripts_run_migration": "run-migration.ts" | kind=code-symbol | source=tech-pwa/scripts/run-migration.ts:L1 | neighbors=[01bf641 Initial commit — clean history, d7eb645 feat(p3-1): schema foundation —…, MIGRATION, run()]
- "scripts_verify_hash_parity": "verify-hash-parity.mjs" | kind=code-symbol | source=scripts/verify-hash-parity.mjs:L1 | neighbors=[01bf641 Initial commit — clean history, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, nodeHash]
- "scripts_wipe_and_remigrate": "wipe-and-remigrate.ts" | kind=code-symbol | source=tech-pwa/scripts/wipe-and-remigrate.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4c39575 fix: DAL snake_case mapping, de…, 7dfecc5 fix(dal): map Drizzle ORM snake…, run()]
- "sentinel_spec_architect_index_createpr": "createPR()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L120 | neighbors=[index.js, ghGet(), ghPost(), ghPut()]
- "sentinel_spec_architect_index_ghget": "ghGet()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L37 | neighbors=[index.js, createPR(), fetchClaudeMd(), listExistingSpecs()]
- "sentinels_worker": "worker.js" | kind=code-symbol | source=Sentinels/worker.js:L1 | neighbors=[01bf641 Initial commit — clean history, ALLOWED_ORIGINS, corsHeaders(), fetch()]
- "services_event_bus_eventbus": "EventBus" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts:L20 | neighbors=[event-bus.ts, .publish(), event-bus-executor.ts, event-bus.test.ts]
- "side_effects_event_bus_executor_eventbussideeffectexecutor": "EventBusSideEffectExecutor" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/event-bus-executor.ts:L5 | neighbors=[route.ts, event-bus-executor.ts, .execute(), SideEffectExecutor]
- "side_effects_fake_executor_fakesideeffectexecutor": "FakeSideEffectExecutor" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/fake-executor.ts:L4 | neighbors=[fake-executor.ts, .execute(), SideEffectExecutor, job-update.test.ts]
- "specs_antigravity_s114_comms_fix_spec_context": "CONTEXT" | kind=entity | source=specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md:L19 | neighbors=[Claude Code review gate: required befor…, DashboardAPI bridge pattern (reference:…, P1 Root Cause (P0 regression — comms pa…, P2 Root Cause (comms thread rendering c…]
- "specs_antigravity_s115_dispatch_flow_spec_part_5_break_label_fix": "PART 5 — BREAK LABEL FIX" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L206 | neighbors=[ANTIGRAVITY SPEC — S115 DISPATCH FLOW L…, Task 5.1 — `src/components/ClockedInBar…, Task 5.2 — `src/lib/i18n/en.ts` line 27, Task 5.3 — `src/lib/i18n/en.ts` line 65]
- "specs_antigravity_s115_dispatch_flow_spec_terminal_tasks": "TERMINAL TASKS" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L245 | neighbors=[ANTIGRAVITY SPEC — S115 DISPATCH FLOW L…, Task N-1 — Test sprint (separate sessio…, Task N-2 — Compile + diff, Task N — Wait for clear-to-merge. Do no…]
- "specs_fix_dashboard_stats_spec_fix_dashboard_stats_semantics_dead_code_removal": "Fix: Dashboard Stats Semantics + Dead Code Removal" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L1 | neighbors=[FIX_DASHBOARD_STATS_SPEC.md, Objective, Out of Scope, Task List]
- "specs_legacy_migration_blueprint_2_source_of_truth_legacy_architecture": "2. Source of Truth: Legacy Architecture" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L8 | neighbors=[2.1 Core Scripts, 2.2 Data Layer (Google Sheets), 2.3 External Integrations, Master Legacy Migration Blueprint]
- "specs_phase3_p3_2_spec": "PHASE3_P3_2_SPEC.md" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L1 | neighbors=[Branch: feat/p3-2-time-records-migration, Depends on: P3-1 merged (PR #818), Last updated: 2026-05-26 (Session 99), P3-2: TIME RECORDS MIGRATION SPEC]
- "specs_phase3_p3_3_spec": "PHASE3_P3_3_SPEC.md" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L1 | neighbors=[Branch: feat/p3-3-dispatch-migration, Depends on: P3-2 merged (✅ PR #828), P3-3: DISPATCH QUEUE + MASTER DIRECTORY…, Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_4_spec": "PHASE3_P3_4_SPEC.md" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L1 | neighbors=[Branch: feat/p3-4-field-api-nextjs, Depends on: P3-3 merged (✅ PR #837), P3-4: TECHPWA.GS → NEXT.JS API ROUTES S…, Written: 2026-05-26 (Session 101)]
- "specs_phase3_schema_spec_domain_5_financial_placeholders_not_operational_yet": "DOMAIN 5: FINANCIAL (placeholders — not operational yet)" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L443 | neighbors=[`invoice_line_items` — Billing placehol…, `invoices` — Billing placeholder, `job_costs` — Job costing line items, NEW TABLES BY DOMAIN]
- "specs_phase3_schema_spec_migration_strategy": "MIGRATION STRATEGY" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L528 | neighbors=[Last updated: 2026-05-25 (Session 97 co…, Entity ID → Org ID, Existing data compatibility, Index strategy]
- "specs_phase3_sprint_plan": "PHASE3_SPRINT_PLAN.md" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L1 | neighbors=[Foundation rebuild: Google Sheets → Neo…, Last updated: 2026-05-21 (Session 97), PHASE 3 — SPRINT PLAN, Schema: specs/PHASE3_SCHEMA_SPEC.md]
- "specs_schedule_view_spec_change_3_tech_picker_redesign_in_schedulingdispatch_tsx": "CHANGE 3 — Tech picker redesign in `SchedulingDispatch.tsx`" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L75 | neighbors=[Behavior rules:, Dropdown structure (top to bottom):, Suggested Techs API call:, SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…]
- "specs_spec_p1_3_token_hash_verify_owner_ag_reviewer_claude_code_branch_feat_p1_3_token_hash_verify": "Owner: AG | Reviewer: Claude Code | Branch: feat/p1-3-token-hash-verify" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L3 | neighbors=[SPEC_P1_3_TOKEN_HASH_VERIFY.md, CONTEXT, MERGE GATE, TASKS]
- "specs_spec_p1_4_paga_unit_tests_owner_ag_reviewer_claude_code_branch_feat_p1_4_paga_unit_tests": "Owner: AG | Reviewer: Claude Code | Branch: feat/p1-4-paga-unit-tests" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L3 | neighbors=[SPEC_P1_4_PAGA_UNIT_TESTS.md, CONTEXT, MERGE GATE, TASKS]
- "specs_spec_p2_1_infra_hardening_owner_ag_reviewer_claude_code_branch_feat_p2_1_infra_hardening": "Owner: AG | Reviewer: Claude Code | Branch: feat/p2-1-infra-hardening" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L3 | neighbors=[SPEC_P2_1_INFRA_HARDENING.md, CONTEXT, MERGE GATE, TASKS]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-055.json

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
