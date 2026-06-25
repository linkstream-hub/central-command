# Node Description Batch 81 of 412

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

- "sentinel_stale_job_index_raisegithubissue": "raiseGitHubIssue()" | kind=code-symbol | source=railway/sentinel-stale-job/index.js:L97 | neighbors=[index.js, runStaleJobScan()]
- "sentinel_time_anomaly_index_apirequest": "apiRequest()" | kind=code-symbol | source=railway/sentinel-time-anomaly/index.js:L28 | neighbors=[index.js, runAudit()]
- "sentinel_time_anomaly_index_raisegithubissue": "raiseGitHubIssue()" | kind=code-symbol | source=railway/sentinel-time-anomaly/index.js:L76 | neighbors=[index.js, runAudit()]
- "sentinel_wc_scanner_index_apirequest": "apiRequest()" | kind=code-symbol | source=railway/sentinel-wc-scanner/index.js:L28 | neighbors=[index.js, runWcScan()]
- "sentinel_wc_scanner_index_raisegithubissue": "raiseGitHubIssue()" | kind=code-symbol | source=railway/sentinel-wc-scanner/index.js:L75 | neighbors=[index.js, runWcScan()]
- "sentinels_worker_corsheaders": "corsHeaders()" | kind=code-symbol | source=Sentinels/worker.js:L10 | neighbors=[worker.js, fetch()]
- "sentinels_worker_fetch": "fetch()" | kind=code-symbol | source=Sentinels/worker.js:L21 | neighbors=[worker.js, corsHeaders()]
- "service_n8n": "n8n Automation" | kind=entity | neighbors=[ADW FLAG Gate, CA Break Compliance Monitor]
- "services_event_bus_eventbus_publish": ".publish()" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts:L21 | neighbors=[EventBus, getResend()]
- "services_event_bus_getresend": "getResend()" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts:L7 | neighbors=[event-bus.ts, .publish()]
- "services_event_bus_workorderevent": "WorkOrderEvent" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts:L9 | neighbors=[event-bus.ts, event-bus.test.ts]
- "servicetitan": "ServiceTitan" | kind=entity | source=docs/PRODUCT_VISION.md | neighbors=[AI-native FSM, Jobber]
- "session_state": "SESSION_STATE.md" | kind=entity | source=SESSION_STATE.md:L1 | neighbors=[Overwrite completely at session close. …, SESSION STATE]
- "sign_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/attestation/sign/route.ts:L10 | neighbors=[route.ts, verifyFieldSession()]
- "skill_stocktake_skill_scope": "Scope" | kind=entity | source=.github/skills/ecc/skill-stocktake/SKILL.md:L11 | neighbors=[Targeting a specific project, skill-stocktake]
- "specs_antigravity_s115_dispatch_flow_spec_what": "What" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L53 | neighbors=[PART 1 — STATUS NORMALIZATION (one-time…, PART 4 — MY HOURS PAGE]
- "specs_phase3_schema_spec_domain_4_compliance_paga": "DOMAIN 4: COMPLIANCE / PAGA" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L360 | neighbors=[`attestations` — Separate attestation a…, NEW TABLES BY DOMAIN]
- "specs_schedule_view_spec_change_4_canonical_sna_write_format_critical": "CHANGE 4 — Canonical SnA write format (CRITICAL)" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L117 | neighbors=[Downstream read normalization:, SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…]
- "specs_spec_p1_4_paga_unit_tests_context": "CONTEXT" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L7 | neighbors=[Two implementations exist — both must b…, Owner: AG | Reviewer: Claude Code | Bra…]
- "specs_tech_pwa_api_spec": "TECH_PWA_API_SPEC.md" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L1 | neighbors=[APT Tech PWA — API Specification, For use with Google Antigravity to buil…]
- "src_index_corsheaders": "corsHeaders()" | kind=code-symbol | source=workers/tech-pwa-proxy/src/index.js:L90 | neighbors=[index.js, fetch()]
- "src_index_fetch": "fetch()" | kind=code-symbol | source=workers/tech-pwa-proxy/src/index.js:L10 | neighbors=[index.js, corsHeaders()]
- "src_instrumentation": "instrumentation.ts" | kind=code-symbol | source=tech-pwa/src/instrumentation.ts:L1 | neighbors=[01bf641 Initial commit — clean history, register()]
- "staff_auth_next_auth": "Staff Auth (next-auth v5)" | kind=entity | source=docs/api/reference.md | neighbors=[Dual Auth Architecture, Tech PWA API]
- "status_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/shift/status/route.ts:L10 | neighbors=[route.ts, verifyFieldSession()]
- "suggesttechs_getinactivetechnames": "getInactiveTechNames()" | kind=code-symbol | source=SuggestTechs.js:L297 | neighbors=[SuggestTechs.js, suggestTechsForJob()]
- "suggesttechs_gettechavailability": "getTechAvailability()" | kind=code-symbol | source=SuggestTechs.js:L307 | neighbors=[SuggestTechs.js, suggestTechsForJob()]
- "suggesttechs_gettodaystr": "getTodayStr()" | kind=code-symbol | source=SuggestTechs.js:L337 | neighbors=[SuggestTechs.js, suggestTechsForJob()]
- "suggesttechs_loaddurationdefaults": "loadDurationDefaults()" | kind=code-symbol | source=SuggestTechs.js:L172 | neighbors=[SuggestTechs.js, suggestTechsForJob()]
- "suggesttechs_loadskillratings": "loadSkillRatings()" | kind=code-symbol | source=SuggestTechs.js:L254 | neighbors=[SuggestTechs.js, buildTechScores()]
- "suggesttechs_loadtechassignments": "loadTechAssignments()" | kind=code-symbol | source=SuggestTechs.js:L189 | neighbors=[SuggestTechs.js, suggestTechsForJob()]
- "sync_route_jobinsert": "JobInsert" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/sync/route.ts:L6 | neighbors=[route.ts, route.ts]
- "sync_route_techinsert": "TechInsert" | kind=code-symbol | source=tech-pwa/src/app/api/techs/sync/route.ts:L6 | neighbors=[route.ts, route.ts]
- "sync_route_timerecordinsert": "TimeRecordInsert" | kind=code-symbol | source=tech-pwa/src/app/api/time-records/sync/route.ts:L7 | neighbors=[route.ts, route.ts]
- "tech_pwa_api": "Tech PWA API" | kind=entity | source=docs/api/reference.md | neighbors=[Staff Auth (next-auth v5), Tech Auth (Bearer Token)]
- "tech_pwa_postcss_config": "postcss.config.mjs" | kind=code-symbol | source=tech-pwa/postcss.config.mjs:L1 | neighbors=[01bf641 Initial commit — clean history, config]
- "tech_pwa_smoke_main": "main()" | kind=code-symbol | source=tech-pwa/smoke.ts:L8 | neighbors=[smoke.ts, computeDashboardStats]
- "tech_pwa_src_app_api_comms_jobid_route_ts_jobid_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/[jobId]/route.ts:L33 | neighbors=[route.ts, extractEmailAddress()]
- "tech_pwa_src_app_api_field_break_end_route_ts_end_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/break/end/route.ts:L10 | neighbors=[route.ts, verifyFieldSession()]
- "tech_pwa_src_app_api_field_break_start_route_ts_start_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/break/start/route.ts:L10 | neighbors=[route.ts, verifyFieldSession()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-080.json

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
