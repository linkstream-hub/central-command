# Node Description Batch 23 of 49

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

- "scripts_check_job": "check-job.js" | kind=code-symbol | source=tech-pwa/scripts/check-job.js:L1 | neighbors=[01bf641 Initial commit — clean history, 4c39575 fix: DAL snake_case mapping, de…, 7dfecc5 fix(dal): map Drizzle ORM snake…, { Client }] | lang=en
- "scripts_db_repair_journal": "db-repair-journal.ts" | kind=code-symbol | source=tech-pwa/scripts/db-repair-journal.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 807a465 fix(foundation-06): drizzle-kit…, c9b0478 Merge branch 'main' of https://…, main()] | lang=en
- "scripts_migrate": "migrate.ts" | kind=code-symbol | source=tech-pwa/scripts/migrate.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 807a465 fix(foundation-06): drizzle-kit…, c9b0478 Merge branch 'main' of https://…, main()] | lang=en
- "scripts_migrate_dispatch_queue": "migrate-dispatch-queue.ts" | kind=code-symbol | source=tech-pwa/scripts/migrate-dispatch-queue.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 67b602c feat(p3-3): dispatch queue + ma…, normalizeAddressKey(), run()] | lang=en
- "scripts_migrate_master_directory": "migrate-master-directory.ts" | kind=code-symbol | source=tech-pwa/scripts/migrate-master-directory.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 67b602c feat(p3-3): dispatch queue + ma…, normalizeAddressKey(), run()] | lang=en
- "scripts_migrate_time_records": "migrate-time-records.ts" | kind=code-symbol | source=tech-pwa/scripts/migrate-time-records.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 1bfef1d feat(p3-2): migration scripts —…, 24cd71e feat(p3-2): time records migrat…, run()] | lang=en
- "scripts_run_migration": "run-migration.ts" | kind=code-symbol | source=tech-pwa/scripts/run-migration.ts:L1 | neighbors=[01bf641 Initial commit — clean history, d7eb645 feat(p3-1): schema foundation —…, MIGRATION, run()] | lang=en
- "scripts_verify_hash_parity": "verify-hash-parity.mjs" | kind=code-symbol | source=scripts/verify-hash-parity.mjs:L1 | neighbors=[01bf641 Initial commit — clean history, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, nodeHash] | lang=en
- "scripts_wipe_and_remigrate": "wipe-and-remigrate.ts" | kind=code-symbol | source=tech-pwa/scripts/wipe-and-remigrate.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4c39575 fix: DAL snake_case mapping, de…, 7dfecc5 fix(dal): map Drizzle ORM snake…, run()] | lang=en
- "sentinel_spec_architect_index_createpr": "createPR()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L120 | neighbors=[index.js, ghGet(), ghPost(), ghPut()] | lang=en
- "sentinel_spec_architect_index_ghget": "ghGet()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L37 | neighbors=[index.js, createPR(), fetchClaudeMd(), listExistingSpecs()] | lang=en
- "sentinels_worker": "worker.js" | kind=code-symbol | source=Sentinels/worker.js:L1 | neighbors=[01bf641 Initial commit — clean history, ALLOWED_ORIGINS, corsHeaders(), fetch()] | lang=en
- "services_event_bus_eventbus": "EventBus" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts:L20 | neighbors=[event-bus.ts, .publish(), event-bus-executor.ts, event-bus.test.ts] | lang=en
- "side_effects_event_bus_executor_eventbussideeffectexecutor": "EventBusSideEffectExecutor" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/event-bus-executor.ts:L5 | neighbors=[route.ts, event-bus-executor.ts, .execute(), SideEffectExecutor] | lang=en
- "side_effects_fake_executor_fakesideeffectexecutor": "FakeSideEffectExecutor" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/fake-executor.ts:L4 | neighbors=[fake-executor.ts, .execute(), SideEffectExecutor, job-update.test.ts] | lang=en
- "tech_pwa_drizzle_config": "drizzle.config.ts" | kind=code-symbol | source=tech-pwa/drizzle.config.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 807a465 fix(foundation-06): drizzle-kit…, c9b0478 Merge branch 'main' of https://…, d7eb645 feat(p3-1): schema foundation —…] | lang=en
- "tech_pwa_next_config": "next.config.ts" | kind=code-symbol | source=tech-pwa/next.config.ts:L1 | neighbors=[01bf641 Initial commit — clean history, nextConfig, sentryConfig, withPWA] | lang=en
- "tests_globalsetup_applyschemaifneeded": "applySchemaIfNeeded()" | kind=code-symbol | source=tech-pwa/tests/globalSetup.ts:L25 | neighbors=[globalSetup.ts, pgCode(), pgMessage(), globalSetup()] | lang=en
- "tests_intake_schema_test": "intake-schema.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/intake-schema.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, bdabbf4 fix: correct dashboard stats se…, intake-schema.ts, intakeSchema] | lang=en
- "tests_jobdetailmodal_test": "JobDetailModal.test.ts" | kind=code-symbol | source=tech-pwa/src/components/dashboard/__tests__/JobDetailModal.test.ts:L1 | neighbors=[5d0ae0d feat(ui): phase 22 surgical fix…, JobDetailModal.tsx, COMM_STAKEHOLDER_TABS, STATUS_OPTIONS] | lang=en
- "tests_normalizeaddresskey_test": "normalizeAddressKey.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/normalizeAddressKey.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 2ea94d6 feat(phase-25): Parsing & Intak…, normalizeAddressKey.ts, normalizeAddressKey()] | lang=en
- "tests_page_test": "page.test.ts" | kind=code-symbol | source=tech-pwa/src/app/live/__tests__/page.test.ts:L1 | neighbors=[5d0ae0d feat(ui): phase 22 surgical fix…, page.tsx, getAdjacentIsoDate(), getTodayIsoDate()] | lang=en
- "tests_wc_codes_test": "wc-codes.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/wc-codes.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4d7ba4d feat(phase-12): Neon-only cutov…, wc-codes.ts, resolveWCCode()] | lang=en
- "app_providers": "Providers.tsx" | kind=code-symbol | source=tech-pwa/src/app/Providers.tsx:L1 | neighbors=[layout.tsx, Providers(), 01bf641 Initial commit — clean history] | lang=en
- "billing_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/billing/page.tsx:L1 | neighbors=[BillingPage(), DashboardLayout.tsx, 01bf641 Initial commit — clean history] | lang=en
- "ClockedInBar": "Clocked In Bar" | kind=code-symbol | source=tech-pwa/src/components/ClockedInBar.tsx | neighbors=[Tech Session, Job Detail Page, page.tsx] | lang=en
- "code_buildsmartpropertycontext": "buildSmartPropertyContext()" | kind=code-symbol | source=Code.js:L1707 | neighbors=[Code.js, extractEmail(), parseWithGemini()] | lang=en
- "code_checkformissingemail": "checkForMissingEmail()" | kind=code-symbol | source=Code.js:L671 | neighbors=[Code.js, getColumnValues(), checkNewLeadEmails()] | lang=en
- "code_extractemail": "extractEmail()" | kind=code-symbol | source=Code.js:L1133 | neighbors=[Code.js, buildSmartPropertyContext(), enrichFromLaphamDb()] | lang=en
- "code_extractjson": "extractJson()" | kind=code-symbol | source=Code.js:L460 | neighbors=[Code.js, getDraftReply(), parseWithGemini()] | lang=en
- "code_getapikey": "getApiKey()" | kind=code-symbol | source=Code.js:L1151 | neighbors=[Code.js, checkNewLeadEmails(), getDraftReply()] | lang=en
- "code_getcolumnvalues": "getColumnValues()" | kind=code-symbol | source=Code.js:L1115 | neighbors=[Code.js, checkForMissingEmail(), flagNewContactsForReview()] | lang=en
- "code_getdraftreply": "getDraftReply()" | kind=code-symbol | source=Code.js:L1328 | neighbors=[Code.js, extractJson(), getApiKey()] | lang=en
- "code_isduplicatejob": "isDuplicateJob()" | kind=code-symbol | source=Code.js:L1688 | neighbors=[Code.js, addToDispatchQueue(), normalizeAddressKey()] | lang=en
- "code_loadlaphamdatabase": "loadLaphamDatabase()" | kind=code-symbol | source=Code.js:L498 | neighbors=[Code.js, checkNewLeadEmails(), expandAddressRange()] | lang=en
- "code_lookupbyaddress": "lookupByAddress()" | kind=code-symbol | source=Code.js:L697 | neighbors=[Code.js, enrichFromLaphamDb(), normalizeAddressKey()] | lang=en
- "code_routelead": "routeLead()" | kind=code-symbol | source=Code.js:L752 | neighbors=[Code.js, checkNewLeadEmails(), sendInspectionSummary()] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@02684974862c28bab9d1910637c28aa4b1a9b7da": "0268497 docs(11-02): expand MANIFEST.json from 1 to 4 workflow entries" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, 6f9a972 docs(11-02): add Railway n8n ve…, f16595c docs(11-01): complete tech debt…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@05e78c5f1a34e628d424335fb896c52b25a8e60c": "05e78c5 fix(foundation-01): touch diff and test_results artifacts before linking" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, f0860f6 feat(foundation-03): Gap 3 — ad…, a79f3af feat(foundation-04): nightly E2…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@07a0a9c4f6fc362290460884f27d0a7461a9fa61": "07a0a9c docs(phase-14): formally mark dual-write era closed" | kind=Commit | source=git | neighbors=[feat/phase-14-archive, 1ba194e chore(phase-14): generate diff …, fb9c225 chore: remove stale TechPWA GAS…] | lang=pt

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-022.json

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
