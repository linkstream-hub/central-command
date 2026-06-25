# Node Description Batch 34 of 49

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

- "sentinel_time_anomaly_index_raisegithubissue": "raiseGitHubIssue()" | kind=code-symbol | source=railway/sentinel-time-anomaly/index.js:L76 | neighbors=[index.js, runAudit()]
- "sentinel_wc_scanner_index_apirequest": "apiRequest()" | kind=code-symbol | source=railway/sentinel-wc-scanner/index.js:L28 | neighbors=[index.js, runWcScan()]
- "sentinel_wc_scanner_index_raisegithubissue": "raiseGitHubIssue()" | kind=code-symbol | source=railway/sentinel-wc-scanner/index.js:L75 | neighbors=[index.js, runWcScan()]
- "sentinels_worker_corsheaders": "corsHeaders()" | kind=code-symbol | source=Sentinels/worker.js:L10 | neighbors=[worker.js, fetch()]
- "sentinels_worker_fetch": "fetch()" | kind=code-symbol | source=Sentinels/worker.js:L21 | neighbors=[worker.js, corsHeaders()]
- "services_event_bus_eventbus_publish": ".publish()" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts:L21 | neighbors=[EventBus, getResend()]
- "services_event_bus_getresend": "getResend()" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts:L7 | neighbors=[event-bus.ts, .publish()]
- "services_event_bus_workorderevent": "WorkOrderEvent" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts:L9 | neighbors=[event-bus.ts, event-bus.test.ts]
- "src_index_corsheaders": "corsHeaders()" | kind=code-symbol | source=workers/tech-pwa-proxy/src/index.js:L90 | neighbors=[index.js, fetch()]
- "src_index_fetch": "fetch()" | kind=code-symbol | source=workers/tech-pwa-proxy/src/index.js:L10 | neighbors=[index.js, corsHeaders()]
- "src_instrumentation": "instrumentation.ts" | kind=code-symbol | source=tech-pwa/src/instrumentation.ts:L1 | neighbors=[01bf641 Initial commit — clean history, register()]
- "suggesttechs_getinactivetechnames": "getInactiveTechNames()" | kind=code-symbol | source=SuggestTechs.js:L297 | neighbors=[SuggestTechs.js, suggestTechsForJob()]
- "suggesttechs_gettechavailability": "getTechAvailability()" | kind=code-symbol | source=SuggestTechs.js:L307 | neighbors=[SuggestTechs.js, suggestTechsForJob()]
- "suggesttechs_gettodaystr": "getTodayStr()" | kind=code-symbol | source=SuggestTechs.js:L337 | neighbors=[SuggestTechs.js, suggestTechsForJob()]
- "suggesttechs_loaddurationdefaults": "loadDurationDefaults()" | kind=code-symbol | source=SuggestTechs.js:L172 | neighbors=[SuggestTechs.js, suggestTechsForJob()]
- "suggesttechs_loadskillratings": "loadSkillRatings()" | kind=code-symbol | source=SuggestTechs.js:L254 | neighbors=[SuggestTechs.js, buildTechScores()]
- "suggesttechs_loadtechassignments": "loadTechAssignments()" | kind=code-symbol | source=SuggestTechs.js:L189 | neighbors=[SuggestTechs.js, suggestTechsForJob()]
- "tech_pwa_postcss_config": "postcss.config.mjs" | kind=code-symbol | source=tech-pwa/postcss.config.mjs:L1 | neighbors=[01bf641 Initial commit — clean history, config]
- "tech_pwa_vitest_setup": "vitest.setup.ts" | kind=code-symbol | source=tech-pwa/vitest.setup.ts:L1 | neighbors=[086dc4e feat(phase-18): event publishin…, 41b6a57 feat(job-update): Phase 18 even…]
- "tech_session_ts": "Tech Session" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts | neighbors=[Clocked In Bar, page.tsx]
- "techs_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/techs/route.ts:L6 | neighbors=[route.ts, route.test.ts]
- "tests_globalsetup_globalsetup": "globalSetup()" | kind=code-symbol | source=tech-pwa/tests/globalSetup.ts:L67 | neighbors=[globalSetup.ts, applySchemaIfNeeded()]
- "tests_globalsetup_pgcode": "pgCode()" | kind=code-symbol | source=tech-pwa/tests/globalSetup.ts:L16 | neighbors=[globalSetup.ts, applySchemaIfNeeded()]
- "tests_globalsetup_pgmessage": "pgMessage()" | kind=code-symbol | source=tech-pwa/tests/globalSetup.ts:L21 | neighbors=[globalSetup.ts, applySchemaIfNeeded()]
- "week_route_buildweekdates": "buildWeekDates()" | kind=code-symbol | source=tech-pwa/src/app/api/schedule/week/route.ts:L10 | neighbors=[route.ts, GET()]
- "week_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/schedule/week/route.ts:L26 | neighbors=[route.ts, buildWeekDates()]
- "access_sync_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/intake/access-sync/route.ts:L25 | neighbors=[route.ts]
- "app_global_error_globalerror": "GlobalError()" | kind=code-symbol | source=tech-pwa/src/app/global-error.tsx:L6 | neighbors=[global-error.tsx]
- "app_layout_metadata": "metadata" | kind=code-symbol | source=tech-pwa/src/app/layout.tsx:L13 | neighbors=[layout.tsx]
- "app_layout_rootlayout": "RootLayout()" | kind=code-symbol | source=tech-pwa/src/app/layout.tsx:L23 | neighbors=[layout.tsx]
- "app_layout_viewport": "viewport" | kind=code-symbol | source=tech-pwa/src/app/layout.tsx:L19 | neighbors=[layout.tsx]
- "app_manifest_manifest": "manifest()" | kind=code-symbol | source=tech-pwa/src/app/manifest.ts:L3 | neighbors=[manifest.ts]
- "app_page_indexpage": "IndexPage()" | kind=code-symbol | source=tech-pwa/src/app/page.tsx:L14 | neighbors=[page.tsx]
- "app_providers_providers": "Providers()" | kind=code-symbol | source=tech-pwa/src/app/Providers.tsx:L4 | neighbors=[Providers.tsx]
- "archive_stale_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/admin/archive-stale/route.ts:L9 | neighbors=[route.ts]
- "billing_page_billingpage": "BillingPage()" | kind=code-symbol | source=tech-pwa/src/app/billing/page.tsx:L6 | neighbors=[page.tsx]
- "calendar_page_calendarpage": "CalendarPage()" | kind=code-symbol | source=tech-pwa/src/app/calendar/page.tsx:L18 | neighbors=[page.tsx]
- "calendar_page_calendarskeleton": "CalendarSkeleton()" | kind=code-symbol | source=tech-pwa/src/app/calendar/page.tsx:L312 | neighbors=[page.tsx]
- "calendar_page_daydetailpanel": "DayDetailPanel()" | kind=code-symbol | source=tech-pwa/src/app/calendar/page.tsx:L256 | neighbors=[page.tsx]
- "calendar_page_monthgrid": "MonthGrid()" | kind=code-symbol | source=tech-pwa/src/app/calendar/page.tsx:L146 | neighbors=[page.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-033.json

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
