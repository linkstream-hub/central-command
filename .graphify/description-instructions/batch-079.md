# Node Description Batch 80 of 412

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

- "remember_today_2026_06_17_done": "today-2026-06-17.done.md" | kind=entity | source=.remember/today-2026-06-17.done.md:L1 | neighbors=[00:04 | fix/phase-19-env-blocked, 00:35-01:14 | fix/phase-19-env-blocked]
- "research_architecture_recommended_project_structure": "Recommended Project Structure" | kind=entity | source=.planning/research/ARCHITECTURE.md:L93 | neighbors=[Architecture Research, Structure Rationale]
- "research_features_feature_dependencies": "Feature Dependencies" | kind=entity | source=.planning/research/FEATURES.md:L66 | neighbors=[Dependency Notes, Feature Research]
- "research_summary_confidence_assessment": "Confidence Assessment" | kind=entity | source=.planning/research/SUMMARY.md:L167 | neighbors=[Gaps to Address, Project Research Summary]
- "robert_dispatcher": "Robert (Dispatcher)" | kind=entity | source=docs/ORG.md | neighbors=[Lock and Send, Suggest Techs Tool]
- "sandbox_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/sandbox/route.ts:L4 | neighbors=[route.ts, sandboxAction()]
- "schedule_redesign_sr_01_01_plan": "sr-01-01-PLAN.md" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-01-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "schedule_redesign_sr_01_02_plan": "sr-01-02-PLAN.md" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-02-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "schedule_redesign_sr_01_03_plan": "sr-01-03-PLAN.md" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-03-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "schedule_redesign_sr_01_04_plan": "sr-01-04-PLAN.md" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-04-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "schedule_redesign_sr_01_05_plan": "sr-01-05-PLAN.md" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-05-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "schedule_redesign_sr_01_06_plan": "sr-01-06-PLAN.md" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-06-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "scripts_backfill_gmail_threads_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/backfill-gmail-threads.ts:L6 | neighbors=[backfill-gmail-threads.ts, getThreadByMessageId()]
- "scripts_changeset_readme_md_changeset_readme_changeset_release_notes_tooling": "changeset/ — release-notes tooling" | kind=entity | source=scripts/changeset/README.md:L1 | neighbors=[README.md, `cli.cjs extract`]
- "scripts_db_fix_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/db-fix.ts:L9 | neighbors=[db-fix.ts, sql]
- "scripts_db_fix_sql": "sql" | kind=code-symbol | source=tech-pwa/scripts/db-fix.ts:L6 | neighbors=[db-fix.ts, main()]
- "scripts_extract_legacy_data_fetch_data": "fetch_data()" | kind=code-symbol | source=scripts/extract_legacy_data.py:L19 | neighbors=[extract_legacy_data.py, main()]
- "scripts_extract_legacy_data_main": "main()" | kind=code-symbol | source=scripts/extract_legacy_data.py:L32 | neighbors=[extract_legacy_data.py, fetch_data()]
- "scripts_fix_tech_roster_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/fix-tech-roster.ts:L35 | neighbors=[fix-tech-roster.ts, normalizeName()]
- "scripts_fix_tech_roster_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/scripts/fix-tech-roster.ts:L8 | neighbors=[fix-tech-roster.ts, main()]
- "scripts_import_real_roster_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/import-real-roster.ts:L25 | neighbors=[import-real-roster.ts, normalizeName()]
- "scripts_import_real_roster_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/scripts/import-real-roster.ts:L10 | neighbors=[import-real-roster.ts, main()]
- "scripts_migrate_dispatch_queue_normalizeaddresskey": "normalizeAddressKey()" | kind=code-symbol | source=tech-pwa/scripts/migrate-dispatch-queue.ts:L9 | neighbors=[migrate-dispatch-queue.ts, run()]
- "scripts_migrate_dispatch_queue_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/migrate-dispatch-queue.ts:L24 | neighbors=[migrate-dispatch-queue.ts, normalizeAddressKey()]
- "scripts_migrate_master_directory_normalizeaddresskey": "normalizeAddressKey()" | kind=code-symbol | source=tech-pwa/scripts/migrate-master-directory.ts:L9 | neighbors=[migrate-master-directory.ts, run()]
- "scripts_migrate_master_directory_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/migrate-master-directory.ts:L24 | neighbors=[migrate-master-directory.ts, normalizeAddressKey()]
- "scripts_query_neon_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/query-neon.ts:L5 | neighbors=[query-neon.ts, sql]
- "scripts_seed_pick": "pick()" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L47 | neighbors=[seed.ts, seed()]
- "scripts_seed_sql": "sql" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L15 | neighbors=[seed.ts, seed()]
- "scripts_seed_test_data_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/seed-test-data.ts:L17 | neighbors=[seed-test-data.ts, seed-test-data.ts]
- "scripts_test_jobs_dal_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/test-jobs-dal.ts:L5 | neighbors=[test-jobs-dal.ts, jobs.ts]
- "scripts_verify_schema": "verify-schema.ts" | kind=code-symbol | source=tech-pwa/scripts/verify-schema.ts:L1 | neighbors=[01bf641 Initial commit — clean history, d7eb645 feat(p3-1): schema foundation —…]
- "send_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/push/send/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, POST()]
- "sentinel_health_index_pingdashboard": "pingDashboard()" | kind=code-symbol | source=railway/sentinel-health/index.js:L32 | neighbors=[index.js, raiseAlert()]
- "sentinel_health_index_raisealert": "raiseAlert()" | kind=code-symbol | source=railway/sentinel-health/index.js:L58 | neighbors=[index.js, pingDashboard()]
- "sentinel_spec_architect_index_fetchclaudemd": "fetchClaudeMd()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L64 | neighbors=[index.js, ghGet()]
- "sentinel_spec_architect_index_ghpost": "ghPost()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L44 | neighbors=[index.js, createPR()]
- "sentinel_spec_architect_index_ghput": "ghPut()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L53 | neighbors=[index.js, createPR()]
- "sentinel_spec_architect_index_listexistingspecs": "listExistingSpecs()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L70 | neighbors=[index.js, ghGet()]
- "sentinel_stale_job_index_apirequest": "apiRequest()" | kind=code-symbol | source=railway/sentinel-stale-job/index.js:L33 | neighbors=[index.js, runStaleJobScan()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-079.json

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
