# Node Description Batch 27 of 49

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

- "job_job_state_totechid": "toTechId()" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L27 | neighbors=[index.ts, job-state.ts, job-state.test.ts]
- "jobid_job_update_apply": "apply()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/job-update.ts:L31 | neighbors=[job-update.ts, route.ts, job-update.test.ts]
- "jobid_route_extractemailaddress": "extractEmailAddress()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/[jobId]/route.ts:L16 | neighbors=[route.ts, deriveStakeholder(), GET()]
- "lib_auth_clearsession": "clearSession()" | kind=code-symbol | source=tech-pwa/src/lib/auth.ts:L27 | neighbors=[page.tsx, auth.ts, getSession()]
- "lib_dashboard_api_approvetimecard": "approveTimecard()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L688 | neighbors=[page.tsx, dashboard-api.ts, dashboardRequest()]
- "lib_dashboard_api_computestats": "computeStats()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L286 | neighbors=[dashboard-api.ts, dashboardRequest(), returnMockData()]
- "lib_dashboard_api_disputetimecard": "disputeTimecard()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L692 | neighbors=[page.tsx, dashboard-api.ts, dashboardRequest()]
- "lib_dashboard_api_gettimecardapprovalqueue": "getTimecardApprovalQueue()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L684 | neighbors=[page.tsx, dashboard-api.ts, dashboardRequest()]
- "lib_dashboard_api_mapjob": "mapJob()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L228 | neighbors=[dashboard-api.ts, normalizeLegacyStatus(), normalizeName()]
- "lib_dashboard_api_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L216 | neighbors=[dashboard-api.ts, mapJob(), mapTech()]
- "lib_dashboard_api_techsuggestion": "TechSuggestion" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L123 | neighbors=[JobDetailModal.tsx, SchedulingDispatch.tsx, dashboard-api.ts]
- "lib_dashboard_api_weekscheduleresponse": "WeekScheduleResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L141 | neighbors=[JobDetailModal.tsx, dashboard-api.ts, page.tsx]
- "lib_detectlaphamform_detectlaphamform": "detectLaphamForm()" | kind=code-symbol | source=tech-pwa/src/lib/detectLaphamForm.ts:L52 | neighbors=[route.ts, detectLaphamForm.ts, detectLaphamForm.test.ts]
- "lib_git_cmd_tokenize": "tokenize()" | kind=code-symbol | source=.claude/hooks/lib/git-cmd.js:L63 | neighbors=[gsd-workflow-guard.js, git-cmd.js, isGitSubcommand()]
- "lib_gmail_client_cleanemailbody": "cleanEmailBody()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L64 | neighbors=[gmail-client.ts, getNewMessages(), getThreadByMessageId()]
- "lib_gmail_client_extractemail": "extractEmail()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L26 | neighbors=[gmail-client.ts, getNewMessages(), getThreadByMessageId()]
- "lib_gmail_client_getcurrenthistoryid": "getCurrentHistoryId()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L207 | neighbors=[gmail-client.ts, getGmailClient(), route.ts]
- "lib_gmail_client_getheader": "getHeader()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L21 | neighbors=[gmail-client.ts, getNewMessages(), getThreadByMessageId()]
- "lib_gmail_client_getthreadmessageids": "getThreadMessageIds()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L286 | neighbors=[gmail-client.ts, getGmailClient(), route.ts]
- "lib_intake_processor_processintakepayload": "processIntakePayload()" | kind=code-symbol | source=tech-pwa/src/lib/intake-processor.ts:L7 | neighbors=[actions.ts, intake-processor.ts, intake-processor.test.ts]
- "lib_intake_schema_intakeschema": "intakeSchema" | kind=code-symbol | source=tech-pwa/src/lib/intake-schema.ts:L30 | neighbors=[actions.ts, intake-schema.ts, intake-schema.test.ts]
- "lib_ratelimit_checkloginratelimit": "checkLoginRateLimit()" | kind=code-symbol | source=tech-pwa/src/lib/rateLimit.ts:L37 | neighbors=[rateLimit.ts, getRateLimiter(), route.ts]
- "lib_sandbox_store_writestore": "writeStore()" | kind=code-symbol | source=tech-pwa/src/lib/sandbox-store.ts:L128 | neighbors=[sandbox-store.ts, readStore(), sandboxAction()]
- "lib_schema_breaks": "breaks" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L256 | neighbors=[route.ts, schema.ts, route.ts]
- "lib_schema_jobperformancehistory": "jobPerformanceHistory" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L391 | neighbors=[route.ts, schema.ts, route.test.ts]
- "lib_schema_pushsubscriptions": "pushSubscriptions" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L161 | neighbors=[route.ts, schema.ts, route.ts]
- "lib_schema_workflowevents": "workflowEvents" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L488 | neighbors=[schema.ts, event-bus.ts, event-bus.test.ts]
- "lib_syncqueue_flushqueue": "flushQueue()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L59 | neighbors=[syncQueue.ts, dequeueEvent(), getQueue()]
- "lib_syncqueue_savequeue": "saveQueue()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L29 | neighbors=[syncQueue.ts, dequeueEvent(), enqueueEvent()]
- "lib_tech_session_updateshiftbreak": "updateShiftBreak()" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts:L50 | neighbors=[tech-session.ts, getShiftSession(), setShiftSession()]
- "lib_wc_codes_resolvewccode": "resolveWCCode()" | kind=code-symbol | source=tech-pwa/src/lib/wc-codes.ts:L53 | neighbors=[jobs.ts, wc-codes.ts, wc-codes.test.ts]
- "n8n_export_main": "main()" | kind=code-symbol | source=tools/n8n/export.py:L59 | neighbors=[export.py, api_get(), slugify()]
- "scripts_audit_authors": "audit-authors.ts" | kind=code-symbol | source=tech-pwa/scripts/audit-authors.ts:L1 | neighbors=[01bf641 Initial commit — clean history, schema.ts, audit()]
- "scripts_audit_dev_artifacts": "audit-dev-artifacts.ts" | kind=code-symbol | source=tech-pwa/scripts/audit-dev-artifacts.ts:L1 | neighbors=[01bf641 Initial commit — clean history, schema.ts, audit()]
- "scripts_check_neon_counts": "check-neon-counts.mjs" | kind=code-symbol | source=tech-pwa/scripts/check-neon-counts.mjs:L1 | neighbors=[01bf641 Initial commit — clean history, f8dac22 fix: robust date parsing in syn…, checkCounts()]
- "scripts_extract_legacy_data": "extract_legacy_data.py" | kind=code-symbol | source=scripts/extract_legacy_data.py:L1 | neighbors=[01bf641 Initial commit — clean history, fetch_data(), main()]
- "scripts_migrate_new_contacts": "migrate-new-contacts.ts" | kind=code-symbol | source=tech-pwa/scripts/migrate-new-contacts.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 67b602c feat(p3-3): dispatch queue + ma…, run()]
- "scripts_sanitize_dev_artifacts": "sanitize-dev-artifacts.ts" | kind=code-symbol | source=tech-pwa/scripts/sanitize-dev-artifacts.ts:L1 | neighbors=[01bf641 Initial commit — clean history, schema.ts, sanitize()]
- "scripts_seed_orgs": "seed-orgs.ts" | kind=code-symbol | source=tech-pwa/scripts/seed-orgs.ts:L1 | neighbors=[01bf641 Initial commit — clean history, d7eb645 feat(p3-1): schema foundation —…, run()]
- "scripts_seed_seed": "seed()" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L49 | neighbors=[seed.ts, pick(), sql]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-026.json

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
