# Node Description Batch 22 of 49

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

- "components_skeleton": "Skeleton.tsx" | kind=code-symbol | source=tech-pwa/src/components/Skeleton.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, SkeletonBlock(), SkeletonCard(), page.tsx]
- "components_toast": "Toast.tsx" | kind=code-symbol | source=tech-pwa/src/components/Toast.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, ToastContext.tsx, useToast(), JobDetailModal.tsx]
- "dal_job_state_dal_makejobstatedal": "makeJobStateDAL()" | kind=code-symbol | source=tech-pwa/src/lib/dal/job-state-dal.ts:L52 | neighbors=[route.ts, route.ts, job-state-dal.ts, job-update.ts]
- "dal_job_state_dal_maptojobstaterecord": "mapToJobStateRecord()" | kind=code-symbol | source=tech-pwa/src/lib/dal/job-state-dal.ts:L32 | neighbors=[job-state-dal.ts, mapArrivalWindow(), mapPte(), mapWoType()]
- "dal_mappers_computedashboardstats": "computeDashboardStats()" | kind=code-symbol | source=tech-pwa/src/lib/dal/mappers.ts:L58 | neighbors=[jobs.ts, mappers.ts, route.ts, smoke.ts]
- "dal_sheets_client": "sheets-client.ts" | kind=code-symbol | source=tech-pwa/src/lib/dal/sheets-client.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4d7ba4d feat(phase-12): Neon-only cutov…, e61f88a fix(security+team): server-side…, sheetsRequest()]
- "dashboard_datenavigation": "DateNavigation.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DateNavigation.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, 93afc14 feat(schedule): Phase 2 schedul…, DateNavigation(), DateNavigationProps]
- "design_extract_output_aptmaintenanceinc_com_tailwind_config": "aptmaintenanceinc-com-tailwind.config.js" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-tailwind.config.js:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_tailwind_config": "dispatch-aptmaintenanceinc-com-tailwind.config.js" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-tailwind.config.js:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…]
- "drizzle_0005_cloudy_nitro": "0005_cloudy_nitro.sql" | kind=code-symbol | source=tech-pwa/drizzle/0005_cloudy_nitro.sql:L1 | neighbors=[01bf641 Initial commit — clean history, 1a2c4c7 Merge branch 'main' of https://…, 989514d fix(job-comments): add sheetsId…, dc75827 feat(foundation): phases 9-11 —…]
- "e2e_fsm_constraints_spec": "fsm-constraints.spec.ts" | kind=code-symbol | source=tech-pwa/tests/e2e/fsm-constraints.spec.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …]
- "e2e_parser_spec": "parser.spec.ts" | kind=code-symbol | source=tech-pwa/tests/e2e/parser.spec.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …]
- "fixtures_auth_loginastech": "loginAsTech()" | kind=code-symbol | source=tech-pwa/tests/fixtures/auth.ts:L11 | neighbors=[accessibility.spec.ts, auth.spec.ts, tech-pwa.spec.ts, auth.ts]
- "hooks_gsd_cursor_post_tool": "gsd-cursor-post-tool.js" | kind=code-symbol | source=.claude/hooks/gsd-cursor-post-tool.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, stdinTimeout]
- "i18n_en_messages": "Messages" | kind=code-symbol | source=tech-pwa/src/lib/i18n/en.ts:L152 | neighbors=[en.ts, es.ts, index.tsx, page.tsx]
- "intake_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/intake/page.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, actions.ts, submitIntakeForm(), IntakePage()]
- "lib_access_codes_extractcodes": "extractCodes()" | kind=code-symbol | source=tech-pwa/src/lib/access-codes.ts:L12 | neighbors=[route.ts, access-codes.ts, computeAccessMerge(), access-codes.test.ts]
- "lib_compliance_evaluatecacompliance": "evaluateCACompliance()" | kind=code-symbol | source=tech-pwa/src/lib/compliance.ts:L28 | neighbors=[time-records.ts, compliance.ts, route.ts, compliance.test.ts]
- "lib_dashboard_api_returnmockdata": "returnMockData()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L415 | neighbors=[dashboard-api.ts, dashboardRequest(), buildMockWeekSchedule(), computeStats()]
- "lib_email_sendptecoordinationemail": "sendPteCoordinationEmail()" | kind=code-symbol | source=tech-pwa/src/lib/email.ts:L66 | neighbors=[email.ts, escapeHtml(), getResend(), email-executor.ts]
- "lib_email_sendrequesterautoreply": "sendRequesterAutoReply()" | kind=code-symbol | source=tech-pwa/src/lib/email.ts:L140 | neighbors=[email.ts, escapeHtml(), getResend(), email-intake.test.ts]
- "lib_email_sendtenantcoordinationemail": "sendTenantCoordinationEmail()" | kind=code-symbol | source=tech-pwa/src/lib/email.ts:L191 | neighbors=[email.ts, escapeHtml(), getResend(), email-intake.test.ts]
- "lib_email_sendtenantscheduledemail": "sendTenantScheduledEmail()" | kind=code-symbol | source=tech-pwa/src/lib/email.ts:L14 | neighbors=[email.ts, escapeHtml(), getResend(), email-executor.ts]
- "lib_gmail_client_extractbody": "extractBody()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L76 | neighbors=[gmail-client.ts, stripHtml(), getNewMessages(), getThreadByMessageId()]
- "lib_job_mapper_mapneonjobtojob": "mapNeonJobToJob()" | kind=code-symbol | source=tech-pwa/src/lib/job-mapper.ts:L7 | neighbors=[route.ts, job-mapper.ts, route.ts, route.ts]
- "lib_job_transitions_resolveemailtrigger": "resolveEmailTrigger()" | kind=code-symbol | source=tech-pwa/src/lib/job-transitions.ts:L49 | neighbors=[job-update.ts, route.ts, job-transitions.ts, job-transitions.test.ts]
- "lib_job_transitions_resolvejobstatus": "resolveJobStatus()" | kind=code-symbol | source=tech-pwa/src/lib/job-transitions.ts:L22 | neighbors=[job-update.ts, route.ts, job-transitions.ts, job-transitions.test.ts]
- "lib_normalizeaddresskey_normalizeaddresskey": "normalizeAddressKey()" | kind=code-symbol | source=tech-pwa/src/lib/normalizeAddressKey.ts:L18 | neighbors=[route.ts, detectLaphamForm.ts, normalizeAddressKey.ts, normalizeAddressKey.test.ts]
- "lib_permissions_staffpermissions": "StaffPermissions" | kind=code-symbol | source=tech-pwa/src/lib/permissions.ts:L1 | neighbors=[AppSidebar.tsx, permissions.ts, auth.ts, next-auth.d.ts]
- "lib_sandbox_store_readstore": "readStore()" | kind=code-symbol | source=tech-pwa/src/lib/sandbox-store.ts:L115 | neighbors=[sandbox-store.ts, getDefaultData(), writeStore(), sandboxAction()]
- "lib_schema_newcontactqueue": "newContactQueue" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L104 | neighbors=[actions.ts, intake-processor.ts, schema.ts, migrate-from-csv.ts]
- "lib_syncqueue_apiget": "apiGet()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L151 | neighbors=[page.tsx, page.tsx, syncQueue.ts, page.tsx]
- "lib_syncqueue_dequeueevent": "dequeueEvent()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L53 | neighbors=[syncQueue.ts, getQueue(), saveQueue(), flushQueue()]
- "lib_syncqueue_enqueueevent": "enqueueEvent()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L34 | neighbors=[syncQueue.ts, apiCall(), getQueue(), saveQueue()]
- "lib_syncqueue_getqueue": "getQueue()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L20 | neighbors=[syncQueue.ts, dequeueEvent(), enqueueEvent(), flushQueue()]
- "lib_tech_session_setshiftsession": "setShiftSession()" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts:L33 | neighbors=[ClockedInBar.tsx, page.tsx, tech-session.ts, updateShiftBreak()]
- "lib_types_dashboardstats": "DashboardStats" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L173 | neighbors=[SummaryCards.tsx, dashboard-api.ts, types.ts, page.tsx]
- "login_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/login/route.ts:L23 | neighbors=[route.ts, generateSessionToken(), hashPin(), hashToken()]
- "n8n_import": "import.py" | kind=code-symbol | source=tools/n8n/import.py:L1 | neighbors=[01bf641 Initial commit — clean history, ac7e65d feat(infra): p2-1 infra hardeni…, api_post(), main()]
- "sandbox_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/sandbox/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, sandbox-store.ts, sandboxAction(), POST()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-021.json

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
