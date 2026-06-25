# Node Description Batch 31 of 49

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

- "job_job_state_clockinevent": "ClockInEvent" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L139 | neighbors=[index.ts, job-state.ts]
- "job_job_state_completeevent": "CompleteEvent" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L149 | neighbors=[index.ts, job-state.ts]
- "job_job_state_jobevent": "JobEvent" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L160 | neighbors=[index.ts, job-state.ts]
- "job_job_state_jobeventtype": "JobEventType" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L171 | neighbors=[index.ts, job-state.ts]
- "job_job_state_jobid": "JobId" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L17 | neighbors=[index.ts, job-state.ts]
- "job_job_state_jobstate": "JobState" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L34 | neighbors=[index.ts, job-state.ts]
- "job_job_state_jobstateerror": "JobStateError" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L181 | neighbors=[index.ts, job-state.ts]
- "job_job_state_jobstatemachine": "JobStateMachine" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L244 | neighbors=[index.ts, job-state.ts]
- "job_job_state_jobstateservice": "JobStateService" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L433 | neighbors=[index.ts, job-state.ts]
- "job_job_state_requesttenantschedulingevent": "RequestTenantSchedulingEvent" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L85 | neighbors=[index.ts, job-state.ts]
- "job_job_state_rescheduleevent": "RescheduleEvent" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L129 | neighbors=[index.ts, job-state.ts]
- "job_job_state_result": "Result" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L175 | neighbors=[index.ts, job-state.ts]
- "job_job_state_scheduleevent": "ScheduleEvent" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L115 | neighbors=[index.ts, job-state.ts]
- "job_job_state_sideeffect": "SideEffect" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L373 | neighbors=[index.ts, job-state.ts]
- "job_job_state_techid": "TechId" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L18 | neighbors=[index.ts, job-state.ts]
- "job_job_state_tenantlinkexpiredevent": "TenantLinkExpiredEvent" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L106 | neighbors=[index.ts, job-state.ts]
- "job_job_state_tenantsubmittedevent": "TenantSubmittedEvent" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L95 | neighbors=[index.ts, job-state.ts]
- "job_job_state_transitiondefinition": "TransitionDefinition" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L223 | neighbors=[index.ts, job-state.ts]
- "job_job_state_transitionresult": "TransitionResult" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L387 | neighbors=[index.ts, job-state.ts]
- "job_job_state_wotype": "WoType" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L58 | neighbors=[index.ts, job-state.ts]
- "jobid_route_derivestakeholder": "deriveStakeholder()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/[jobId]/route.ts:L22 | neighbors=[route.ts, extractEmailAddress()]
- "jobid_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/route.ts:L12 | neighbors=[route.ts, extractEmailAddress()]
- "jobid_route_patch": "PATCH()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/route.ts:L35 | neighbors=[route.ts, [jobId].patch.test.ts]
- "jobs_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/route.ts:L51 | neighbors=[route.ts, sendJobAssignedPush()]
- "jobs_route_sendjobassignedpush": "sendJobAssignedPush()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/route.ts:L20 | neighbors=[route.ts, POST()]
- "lib_auth_setsession": "setSession()" | kind=code-symbol | source=tech-pwa/src/lib/auth.ts:L5 | neighbors=[auth.ts, page.tsx]
- "lib_compliance_shiftdetails": "ShiftDetails" | kind=code-symbol | source=tech-pwa/src/lib/compliance.ts:L9 | neighbors=[time-records.ts, compliance.ts]
- "lib_dashboard_api_buildmockweekschedule": "buildMockWeekSchedule()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L369 | neighbors=[dashboard-api.ts, returnMockData()]
- "lib_dashboard_api_calendarresponse": "CalendarResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L74 | neighbors=[page.tsx, dashboard-api.ts]
- "lib_dashboard_api_calendarteamentry": "CalendarTeamEntry" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L69 | neighbors=[page.tsx, dashboard-api.ts]
- "lib_dashboard_api_compliancealert": "ComplianceAlert" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L35 | neighbors=[dashboard-api.ts, page.tsx]
- "lib_dashboard_api_compliancealertsresponse": "ComplianceAlertsResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L109 | neighbors=[dashboard-api.ts, page.tsx]
- "lib_dashboard_api_dispatchdataresponse": "DispatchDataResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L98 | neighbors=[dashboard-api.ts, page.tsx]
- "lib_dashboard_api_feedbackitem": "FeedbackItem" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L48 | neighbors=[page.tsx, dashboard-api.ts]
- "lib_dashboard_api_genericresponse": "GenericResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L159 | neighbors=[JobDetailModal.tsx, dashboard-api.ts]
- "lib_dashboard_api_gettechavailability": "getTechAvailability()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L677 | neighbors=[dashboard-api.ts, dashboardRequest()]
- "lib_dashboard_api_jobcomment": "JobComment" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L114 | neighbors=[JobDetailModal.tsx, dashboard-api.ts]
- "lib_dashboard_api_maptech": "mapTech()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L273 | neighbors=[dashboard-api.ts, normalizeName()]
- "lib_dashboard_api_normalizelegacystatus": "normalizeLegacyStatus()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L170 | neighbors=[dashboard-api.ts, mapJob()]
- "lib_dashboard_api_notification": "Notification" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L82 | neighbors=[DashboardLayout.tsx, dashboard-api.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-030.json

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
