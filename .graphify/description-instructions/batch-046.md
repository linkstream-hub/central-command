# Node Description Batch 47 of 49

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "status_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/shift/status/route.ts:L10 | neighbors=[route.ts]
- "subscribe_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/push/subscribe/route.ts:L3 | neighbors=[route.ts]
- "SummaryCards": "Summary Cards" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SummaryCards.tsx | neighbors=[page.tsx]
- "sync_gmail_history_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/cron/sync-gmail-history/route.ts:L9 | neighbors=[route.ts]
- "sync_route_jobinsert": "JobInsert" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/sync/route.ts:L6 | neighbors=[route.ts]
- "sync_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/time-records/sync/route.ts:L9 | neighbors=[route.ts]
- "sync_route_techinsert": "TechInsert" | kind=code-symbol | source=tech-pwa/src/app/api/techs/sync/route.ts:L6 | neighbors=[route.ts]
- "sync_route_timerecordinsert": "TimeRecordInsert" | kind=code-symbol | source=tech-pwa/src/app/api/time-records/sync/route.ts:L7 | neighbors=[route.ts]
- "team_page_dayschedule": "DaySchedule" | kind=code-symbol | source=tech-pwa/src/app/team/page.tsx:L12 | neighbors=[page.tsx]
- "team_page_teampage": "TeamPage()" | kind=code-symbol | source=tech-pwa/src/app/team/page.tsx:L23 | neighbors=[page.tsx]
- "tech_pwa_check_dupes_neon": "{ neon }" | kind=code-symbol | source=tech-pwa/check-dupes.js:L2 | neighbors=[check-dupes.js]
- "tech_pwa_check_dupes_sql": "sql" | kind=code-symbol | source=tech-pwa/check-dupes.js:L3 | neighbors=[check-dupes.js]
- "tech_pwa_check_jobs_neon": "{ neon }" | kind=code-symbol | source=tech-pwa/check-jobs.js:L2 | neighbors=[check-jobs.js]
- "tech_pwa_check_jobs_sql": "sql" | kind=code-symbol | source=tech-pwa/check-jobs.js:L3 | neighbors=[check-jobs.js]
- "tech_pwa_check_statuses_neon": "{ neon }" | kind=code-symbol | source=tech-pwa/check-statuses.js:L2 | neighbors=[check-statuses.js]
- "tech_pwa_check_statuses_sql": "sql" | kind=code-symbol | source=tech-pwa/check-statuses.js:L3 | neighbors=[check-statuses.js]
- "tech_pwa_check_time_records_neon": "{ neon }" | kind=code-symbol | source=tech-pwa/check-time-records.js:L2 | neighbors=[check-time-records.js]
- "tech_pwa_check_time_records_sql": "sql" | kind=code-symbol | source=tech-pwa/check-time-records.js:L3 | neighbors=[check-time-records.js]
- "tech_pwa_eslint_config_eslintconfig": "eslintConfig" | kind=code-symbol | source=tech-pwa/eslint.config.mjs:L5 | neighbors=[eslint.config.mjs]
- "tech_pwa_get_all_gids_fs": "fs" | kind=code-symbol | source=tech-pwa/get-all-gids.js:L1 | neighbors=[get-all-gids.js]
- "tech_pwa_get_all_gids_html": "html" | kind=code-symbol | source=tech-pwa/get-all-gids.js:L2 | neighbors=[get-all-gids.js]
- "tech_pwa_get_gids_fs": "fs" | kind=code-symbol | source=tech-pwa/get-gids.js:L1 | neighbors=[get-gids.js]
- "tech_pwa_get_gids_html": "html" | kind=code-symbol | source=tech-pwa/get-gids.js:L2 | neighbors=[get-gids.js]
- "tech_pwa_next_config_nextconfig": "nextConfig" | kind=code-symbol | source=tech-pwa/next.config.ts:L13 | neighbors=[next.config.ts]
- "tech_pwa_next_config_sentryconfig": "sentryConfig" | kind=code-symbol | source=tech-pwa/next.config.ts:L76 | neighbors=[next.config.ts]
- "tech_pwa_next_config_withpwa": "withPWA" | kind=code-symbol | source=tech-pwa/next.config.ts:L5 | neighbors=[next.config.ts]
- "tech_pwa_postcss_config_config": "config" | kind=code-symbol | source=tech-pwa/postcss.config.mjs:L1 | neighbors=[postcss.config.mjs]
- "tech_pwa_smoke_main": "main()" | kind=code-symbol | source=tech-pwa/smoke.ts:L8 | neighbors=[smoke.ts]
- "tests_compliance_test_hoursafter": "hoursAfter()" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/compliance.test.ts:L6 | neighbors=[compliance.test.ts]
- "tests_compliance_test_minsafter": "minsAfter()" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/compliance.test.ts:L7 | neighbors=[compliance.test.ts]
- "tests_compliance_test_t0": "T0" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/compliance.test.ts:L5 | neighbors=[compliance.test.ts]
- "tests_detectlaphamform_test_fixturedir": "fixtureDir" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts:L9 | neighbors=[detectLaphamForm.test.ts]
- "tests_detectlaphamform_test_forwarded": "forwarded" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts:L11 | neighbors=[detectLaphamForm.test.ts]
- "tests_detectlaphamform_test_sameline": "sameline" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts:L10 | neighbors=[detectLaphamForm.test.ts]
- "tests_detectlaphamform_test_turnover": "turnover" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts:L12 | neighbors=[detectLaphamForm.test.ts]
- "tests_dispatchtimelineboard_test_basejob": "baseJob" | kind=code-symbol | source=tech-pwa/src/components/dashboard/__tests__/DispatchTimelineBoard.test.ts:L6 | neighbors=[DispatchTimelineBoard.test.ts]
- "tests_event_bus_test_mockemailsend": "mockEmailSend" | kind=code-symbol | source=tech-pwa/src/lib/services/__tests__/event-bus.test.ts:L9 | neighbors=[event-bus.test.ts]
- "tests_globalsetup_skip_codes": "SKIP_CODES" | kind=code-symbol | source=tech-pwa/tests/globalSetup.ts:L14 | neighbors=[globalSetup.ts]
- "tests_globalteardown_globalteardown": "globalTeardown()" | kind=code-symbol | source=tech-pwa/tests/globalTeardown.ts:L6 | neighbors=[globalTeardown.ts]
- "tests_gmail_webhook_post_test_makerequest": "makeRequest()" | kind=code-symbol | source=tech-pwa/src/app/api/webhooks/n8n/gmail/__tests__/gmail.webhook.post.test.ts:L54 | neighbors=[gmail.webhook.post.test.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-046.json

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
