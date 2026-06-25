# Node Description Batch 336 of 412

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

- "jobs_page_priority_chip": "PRIORITY_CHIP" | kind=code-symbol | source=tech-pwa/src/app/jobs/page.tsx:L26 | neighbors=[page.tsx]
- "jobs_page_priority_top_border": "PRIORITY_TOP_BORDER" | kind=code-symbol | source=tech-pwa/src/app/jobs/page.tsx:L18 | neighbors=[page.tsx]
- "jobs_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/route.ts:L79 | neighbors=[route.ts]
- "kanban_view": "Kanban View" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md | neighbors=[Dispatch Excellence Spec]
- "lc_226": "LC 226 (Itemized Wage Statement)" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md | neighbors=[PAGA Compliance]
- "lib_access_codes_accessmergeresult": "AccessMergeResult" | kind=code-symbol | source=tech-pwa/src/lib/access-codes.ts:L19 | neighbors=[access-codes.ts]
- "lib_claude": "CLAUDE.md" | kind=entity | source=tech-pwa/src/lib/CLAUDE.md:L1 | neighbors=[Gate: Auth Split]
- "lib_claude_gate_auth_split": "Gate: Auth Split" | kind=entity | source=tech-pwa/src/lib/CLAUDE.md:L1 | neighbors=[CLAUDE.md]
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
- "lib_dashboard_api_rawtech": "RawTech" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L262 | neighbors=[dashboard-api.ts]
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
- "lib_intake_schema_workorderschema": "workOrderSchema" | kind=code-symbol | source=tech-pwa/src/lib/intake-schema.ts:L3 | neighbors=[intake-schema.ts]
- "lib_job_mapper_neonjob": "NeonJob" | kind=code-symbol | source=tech-pwa/src/lib/job-mapper.ts:L5 | neighbors=[job-mapper.ts]
- "lib_job_transitions_emailtrigger": "EmailTrigger" | kind=code-symbol | source=tech-pwa/src/lib/job-transitions.ts:L47 | neighbors=[job-transitions.ts]
- "lib_location_calculatedistance": "calculateDistance()" | kind=code-symbol | source=tech-pwa/src/lib/location.ts:L39 | neighbors=[location.ts]
- "lib_location_coords": "Coords" | kind=code-symbol | source=tech-pwa/src/lib/location.ts:L5 | neighbors=[location.ts]
- "lib_permissions_module_routes": "MODULE_ROUTES" | kind=code-symbol | source=tech-pwa/src/lib/permissions.ts:L12 | neighbors=[permissions.ts]
- "lib_ratelimit_ratelimitresult": "RateLimitResult" | kind=code-symbol | source=tech-pwa/src/lib/rateLimit.ts:L4 | neighbors=[rateLimit.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-335.json

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
