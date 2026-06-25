# Node Description Batch 43 of 49

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

- "jobid_job_update_jobupdateerror": "JobUpdateError" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/job-update.ts:L12 | neighbors=[job-update.ts]
- "jobid_job_update_jobupdatesuccess": "JobUpdateSuccess" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/job-update.ts:L17 | neighbors=[job-update.ts]
- "jobid_page_jobdetailpage": "JobDetailPage()" | kind=code-symbol | source=tech-pwa/src/app/job/[jobId]/page.tsx:L18 | neighbors=[page.tsx]
- "jobid_page_tenanttrackpage": "TenantTrackPage()" | kind=code-symbol | source=tech-pwa/src/app/track/[jobId]/page.tsx:L11 | neighbors=[page.tsx]
- "jobid_route_parsemsgdate": "parseMsgDate()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/[jobId]/route.ts:L10 | neighbors=[route.ts]
- "jobid_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/job-comments/[jobId]/route.ts:L49 | neighbors=[route.ts]
- "JobQueueTable": "Job Queue Table" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx | neighbors=[page.tsx]
- "jobs_page_getprioritylabel": "getPriorityLabel()" | kind=code-symbol | source=tech-pwa/src/app/jobs/page.tsx:L34 | neighbors=[page.tsx]
- "jobs_page_priority_chip": "PRIORITY_CHIP" | kind=code-symbol | source=tech-pwa/src/app/jobs/page.tsx:L26 | neighbors=[page.tsx]
- "jobs_page_priority_top_border": "PRIORITY_TOP_BORDER" | kind=code-symbol | source=tech-pwa/src/app/jobs/page.tsx:L18 | neighbors=[page.tsx]
- "jobs_page_techjobspage": "TechJobsPage()" | kind=code-symbol | source=tech-pwa/src/app/jobs/page.tsx:L41 | neighbors=[page.tsx]
- "jobs_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/route.ts:L79 | neighbors=[route.ts]
- "lib_access_codes_accessmergeresult": "AccessMergeResult" | kind=code-symbol | source=tech-pwa/src/lib/access-codes.ts:L19 | neighbors=[access-codes.ts]
- "lib_compliance_compliancestatus": "ComplianceStatus" | kind=code-symbol | source=tech-pwa/src/lib/compliance.ts:L17 | neighbors=[compliance.ts]
- "lib_dashboard_api_calendardispatchentry": "CalendarDispatchEntry" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L62 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_dev_blocked_writes": "DEV_BLOCKED_WRITES" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L464 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_fieldstatusresponse": "FieldStatusResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L104 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_jobcommentsresponse": "JobCommentsResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L136 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_mock_calendar_dispatch": "MOCK_CALENDAR_DISPATCH" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L400 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_mock_comments": "MOCK_COMMENTS" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L396 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_mock_compliance": "MOCK_COMPLIANCE" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L382 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_mock_feedback": "MOCK_FEEDBACK" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L404 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_mock_jobs": "MOCK_JOBS" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L338 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_mock_notifications": "MOCK_NOTIFICATIONS" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L392 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_mock_stats": "MOCK_STATS" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L312 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_mock_tech_roster": "MOCK_TECH_ROSTER" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L327 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_mock_tech_status": "MOCK_TECH_STATUS" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L320 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_rawjob": "RawJob" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L181 | neighbors=[dashboard-api.ts]
- "lib_dashboard_api_rawtech": "RawTech" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L262 | neighbors=[dashboard-api.ts]
- "lib_db_sql": "sql" | kind=code-symbol | source=tech-pwa/src/lib/db.ts:L5 | neighbors=[db.ts]
- "lib_email_requesterackvariant": "RequesterAckVariant" | kind=code-symbol | source=tech-pwa/src/lib/email.ts:L122 | neighbors=[email.ts]
- "lib_fieldauth_fieldsession": "FieldSession" | kind=code-symbol | source=tech-pwa/src/lib/fieldAuth.ts:L6 | neighbors=[fieldAuth.ts]
- "lib_git_cmd_argument_taking_flags": "ARGUMENT_TAKING_FLAGS" | kind=code-symbol | source=.claude/hooks/lib/git-cmd.js:L30 | neighbors=[git-cmd.js]
- "lib_git_cmd_boolean_flags": "BOOLEAN_FLAGS" | kind=code-symbol | source=.claude/hooks/lib/git-cmd.js:L46 | neighbors=[git-cmd.js]
- "lib_git_cmd_path": "path" | kind=code-symbol | source=.claude/hooks/lib/git-cmd.js:L24 | neighbors=[git-cmd.js]
- "lib_gmail_client_parsedgmailmessage": "ParsedGmailMessage" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L114 | neighbors=[gmail-client.ts]
- "lib_gmail_client_parsedgmailthread": "ParsedGmailThread" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L219 | neighbors=[gmail-client.ts]
- "lib_intake_processor_jobinsert": "JobInsert" | kind=code-symbol | source=tech-pwa/src/lib/intake-processor.ts:L4 | neighbors=[intake-processor.ts]
- "lib_intake_processor_leadinsert": "LeadInsert" | kind=code-symbol | source=tech-pwa/src/lib/intake-processor.ts:L5 | neighbors=[intake-processor.ts]
- "lib_intake_schema_leadschema": "leadSchema" | kind=code-symbol | source=tech-pwa/src/lib/intake-schema.ts:L22 | neighbors=[intake-schema.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-042.json

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
