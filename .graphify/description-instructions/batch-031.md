# Node Description Batch 32 of 49

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

- "lib_dashboard_api_notificationsresponse": "NotificationsResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L92 | neighbors=[DashboardLayout.tsx, dashboard-api.ts]
- "lib_dashboard_api_techavailabilityresponse": "TechAvailabilityResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L154 | neighbors=[JobDetailModal.tsx, dashboard-api.ts]
- "lib_dashboard_api_techsuggestionresponse": "TechSuggestionResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L131 | neighbors=[SchedulingDispatch.tsx, dashboard-api.ts]
- "lib_dashboard_api_updatejobresponse": "UpdateJobResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L148 | neighbors=[JobDetailModal.tsx, dashboard-api.ts]
- "lib_detectlaphamform_laphamparseresult": "LaphamParseResult" | kind=code-symbol | source=tech-pwa/src/lib/detectLaphamForm.ts:L22 | neighbors=[detectLaphamForm.ts, detectLaphamForm.test.ts]
- "lib_fieldauth_hashtoken": "hashToken()" | kind=code-symbol | source=tech-pwa/src/lib/fieldAuth.ts:L14 | neighbors=[fieldAuth.ts, verifyFieldSession()]
- "lib_fieldschemas_attestationsignschema": "AttestationSignSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L61 | neighbors=[fieldSchemas.ts, route.ts]
- "lib_fieldschemas_breakendschema": "BreakEndSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L35 | neighbors=[route.ts, fieldSchemas.ts]
- "lib_fieldschemas_breakstartschema": "BreakStartSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L30 | neighbors=[fieldSchemas.ts, route.ts]
- "lib_fieldschemas_changepinschema": "ChangePinSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L10 | neighbors=[route.ts, fieldSchemas.ts]
- "lib_fieldschemas_clockinschema": "ClockInSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L16 | neighbors=[route.ts, fieldSchemas.ts]
- "lib_fieldschemas_clockoutschema": "ClockOutSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L23 | neighbors=[route.ts, fieldSchemas.ts]
- "lib_fieldschemas_jobcompleteschema": "JobCompleteSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L40 | neighbors=[route.ts, fieldSchemas.ts]
- "lib_fieldschemas_loginschema": "LoginSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L4 | neighbors=[fieldSchemas.ts, route.ts]
- "lib_fieldschemas_shiftendschema": "ShiftEndSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L51 | neighbors=[route.ts, fieldSchemas.ts]
- "lib_fieldschemas_shiftstartschema": "ShiftStartSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L46 | neighbors=[fieldSchemas.ts, route.ts]
- "lib_fieldschemas_shiftstatusschema": "ShiftStatusSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L56 | neighbors=[fieldSchemas.ts, route.ts]
- "lib_git_cmd_isgitsubcommand": "isGitSubcommand()" | kind=code-symbol | source=.claude/hooks/lib/git-cmd.js:L102 | neighbors=[git-cmd.js, tokenize()]
- "lib_gmail_client_striphtml": "stripHtml()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L32 | neighbors=[gmail-client.ts, extractBody()]
- "lib_intake_schema_intakeformdata": "IntakeFormData" | kind=code-symbol | source=tech-pwa/src/lib/intake-schema.ts:L31 | neighbors=[intake-processor.ts, intake-schema.ts]
- "lib_location_getcurrentposition": "getCurrentPosition()" | kind=code-symbol | source=tech-pwa/src/lib/location.ts:L10 | neighbors=[page.tsx, location.ts]
- "lib_permissions_defaultroute": "defaultRoute()" | kind=code-symbol | source=tech-pwa/src/lib/permissions.ts:L33 | neighbors=[RouteGuard.tsx, permissions.ts]
- "lib_permissions_hasaccess": "hasAccess()" | kind=code-symbol | source=tech-pwa/src/lib/permissions.ts:L25 | neighbors=[RouteGuard.tsx, permissions.ts]
- "lib_ratelimit_getratelimiter": "getRateLimiter()" | kind=code-symbol | source=tech-pwa/src/lib/rateLimit.ts:L13 | neighbors=[rateLimit.ts, checkLoginRateLimit()]
- "lib_sandbox_store_getdefaultdata": "getDefaultData()" | kind=code-symbol | source=tech-pwa/src/lib/sandbox-store.ts:L20 | neighbors=[sandbox-store.ts, readStore()]
- "lib_schema_attestations": "attestations" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L317 | neighbors=[schema.ts, route.ts]
- "lib_schema_compliancealerts": "complianceAlerts" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L301 | neighbors=[schema.ts, route.ts]
- "lib_schema_gmailsyncstate": "gmailSyncState" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L17 | neighbors=[schema.ts, route.ts]
- "lib_schema_jobcomments": "jobComments" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L377 | neighbors=[route.ts, schema.ts]
- "lib_schema_tenantcontacts": "tenantContacts" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L90 | neighbors=[schema.ts, migrate-from-csv.ts]
- "lib_tech_session_clearshiftsession": "clearShiftSession()" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts:L42 | neighbors=[ClockedInBar.tsx, tech-session.ts]
- "lib_tech_session_shiftsession": "ShiftSession" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts:L8 | neighbors=[ClockedInBar.tsx, tech-session.ts]
- "lib_types_fieldstatusentry": "FieldStatusEntry" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L162 | neighbors=[types.ts, page.tsx]
- "lib_types_syncevent": "SyncEvent" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L70 | neighbors=[syncQueue.ts, types.ts]
- "lib_types_techrosterentry": "TechRosterEntry" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L150 | neighbors=[types.ts, page.tsx]
- "lib_types_techsession": "TechSession" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L60 | neighbors=[auth.ts, types.ts]
- "lib_types_threadattachment": "ThreadAttachment" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L131 | neighbors=[JobDetailModal.tsx, types.ts]
- "lib_types_threadmessage": "ThreadMessage" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L138 | neighbors=[JobDetailModal.tsx, types.ts]
- "lib_types_timecardapprovalqueueresponse": "TimecardApprovalQueueResponse" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L123 | neighbors=[dashboard-api.ts, types.ts]
- "lib_types_timecardrecord": "TimecardRecord" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L101 | neighbors=[page.tsx, types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-031.json

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
