# Node Description Batch 78 of 412

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

- "job_state_service": "JobStateService" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts | neighbors=[EventBus Module, Work Order 6-State Machine]
- "job_status_concept": "Job Status Workflow" | kind=entity | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx | neighbors=[Job Detail Modal, Job Queue Table]
- "JobDetailModal": "Job Detail Modal" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx | neighbors=[Dashboard API Client, Job Status Workflow]
- "jobid_page_tenanttrackpage": "TenantTrackPage()" | kind=code-symbol | source=tech-pwa/src/app/track/[jobId]/page.tsx:L11 | neighbors=[page.tsx, page.tsx]
- "jobid_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/route.ts:L12 | neighbors=[route.ts, extractEmailAddress()]
- "jobid_route_parsemsgdate": "parseMsgDate()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/[jobId]/route.ts:L10 | neighbors=[route.ts, route.ts]
- "jobid_route_patch": "PATCH()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/route.ts:L35 | neighbors=[route.ts, [jobId].patch.test.ts]
- "JobQueueTable": "Job Queue Table" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx | neighbors=[Job Status Workflow, page.tsx]
- "lib_auth_setsession": "setSession()" | kind=code-symbol | source=tech-pwa/src/lib/auth.ts:L5 | neighbors=[auth.ts, page.tsx]
- "lib_compliance_shiftdetails": "ShiftDetails" | kind=code-symbol | source=tech-pwa/src/lib/compliance.ts:L9 | neighbors=[time-records.ts, compliance.ts]
- "lib_dashboard_api_buildmockweekschedule": "buildMockWeekSchedule()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L369 | neighbors=[dashboard-api.ts, returnMockData()]
- "lib_dashboard_api_calendarresponse": "CalendarResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L74 | neighbors=[page.tsx, dashboard-api.ts]
- "lib_dashboard_api_calendarteamentry": "CalendarTeamEntry" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L69 | neighbors=[page.tsx, dashboard-api.ts]
- "lib_dashboard_api_compliancealert": "ComplianceAlert" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L35 | neighbors=[dashboard-api.ts, page.tsx]
- "lib_dashboard_api_compliancealertsresponse": "ComplianceAlertsResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L109 | neighbors=[dashboard-api.ts, page.tsx]
- "lib_dashboard_api_feedbackitem": "FeedbackItem" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L48 | neighbors=[page.tsx, dashboard-api.ts]
- "lib_dashboard_api_genericresponse": "GenericResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L159 | neighbors=[JobDetailModal.tsx, dashboard-api.ts]
- "lib_dashboard_api_gettechavailability": "getTechAvailability()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L677 | neighbors=[dashboard-api.ts, dashboardRequest()]
- "lib_dashboard_api_jobcomment": "JobComment" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L114 | neighbors=[JobDetailModal.tsx, dashboard-api.ts]
- "lib_dashboard_api_maptech": "mapTech()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L273 | neighbors=[dashboard-api.ts, normalizeName()]
- "lib_dashboard_api_normalizelegacystatus": "normalizeLegacyStatus()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L170 | neighbors=[dashboard-api.ts, mapJob()]
- "lib_dashboard_api_notification": "Notification" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L82 | neighbors=[DashboardLayout.tsx, dashboard-api.ts]
- "lib_dashboard_api_notificationsresponse": "NotificationsResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L92 | neighbors=[DashboardLayout.tsx, dashboard-api.ts]
- "lib_dashboard_api_rawjob": "RawJob" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L181 | neighbors=[dashboard-api.ts, Job]
- "lib_dashboard_api_techavailabilityresponse": "TechAvailabilityResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L154 | neighbors=[JobDetailModal.tsx, dashboard-api.ts]
- "lib_dashboard_api_techsuggestionresponse": "TechSuggestionResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L131 | neighbors=[SchedulingDispatch.tsx, dashboard-api.ts]
- "lib_dashboard_api_updatejobresponse": "UpdateJobResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L148 | neighbors=[JobDetailModal.tsx, dashboard-api.ts]
- "lib_detectlaphamform_laphamparseresult": "LaphamParseResult" | kind=code-symbol | source=tech-pwa/src/lib/detectLaphamForm.ts:L22 | neighbors=[detectLaphamForm.ts, detectLaphamForm.test.ts]
- "lib_fieldauth_hashtoken": "hashToken()" | kind=code-symbol | source=tech-pwa/src/lib/fieldAuth.ts:L14 | neighbors=[fieldAuth.ts, verifyFieldSession()]
- "lib_fieldschemas_attestationsignschema": "AttestationSignSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L61 | neighbors=[fieldSchemas.ts, route.ts]
- "lib_fieldschemas_changepinschema": "ChangePinSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L10 | neighbors=[route.ts, fieldSchemas.ts]
- "lib_fieldschemas_clockinschema": "ClockInSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L16 | neighbors=[route.ts, fieldSchemas.ts]
- "lib_fieldschemas_clockoutschema": "ClockOutSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L23 | neighbors=[route.ts, fieldSchemas.ts]
- "lib_fieldschemas_jobcompleteschema": "JobCompleteSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L40 | neighbors=[route.ts, fieldSchemas.ts]
- "lib_fieldschemas_loginschema": "LoginSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L4 | neighbors=[fieldSchemas.ts, route.ts]
- "lib_fieldschemas_shiftstatusschema": "ShiftStatusSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L56 | neighbors=[fieldSchemas.ts, route.ts]
- "lib_git_cmd_isgitsubcommand": "isGitSubcommand()" | kind=code-symbol | source=.claude/hooks/lib/git-cmd.js:L102 | neighbors=[git-cmd.js, tokenize()]
- "lib_gmail_client_striphtml": "stripHtml()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L32 | neighbors=[gmail-client.ts, extractBody()]
- "lib_intake_schema_intakeformdata": "IntakeFormData" | kind=code-symbol | source=tech-pwa/src/lib/intake-schema.ts:L31 | neighbors=[intake-processor.ts, intake-schema.ts]
- "lib_job_transitions_transitioncontext": "TransitionContext" | kind=code-symbol | source=tech-pwa/src/lib/job-transitions.ts:L3 | neighbors=[job-transitions.ts, JobStatus]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-077.json

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
