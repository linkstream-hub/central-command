# Node Description Batch 30 of 49

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

- "dashboard_appsidebar_cn": "cn()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/AppSidebar.tsx:L27 | neighbors=[AppSidebar.tsx, AppSidebar()]
- "dashboard_dispatchtimelineboard_buildscheduledjobupdate": "buildScheduledJobUpdate()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L25 | neighbors=[DispatchTimelineBoard.tsx, DispatchTimelineBoard.test.ts]
- "dashboard_jobdetailmodal_comm_stakeholder_tabs": "COMM_STAKEHOLDER_TABS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L48 | neighbors=[JobDetailModal.tsx, JobDetailModal.test.ts]
- "dashboard_jobdetailmodal_formattechname": "formatTechName()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L92 | neighbors=[JobDetailModal.tsx, JobDetailModal()]
- "dashboard_jobdetailmodal_jobdetailmodal": "JobDetailModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L175 | neighbors=[JobDetailModal.tsx, formatTechName()]
- "dashboard_jobdetailmodal_status_options": "STATUS_OPTIONS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L57 | neighbors=[JobDetailModal.tsx, JobDetailModal.test.ts]
- "dashboard_jobqueuetable_statustab": "StatusTab" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L34 | neighbors=[JobQueueTable.tsx, page.tsx]
- "dashboard_kanbanboard_kanban_columns": "KANBAN_COLUMNS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L31 | neighbors=[KanbanBoard.tsx, KanbanBoard.test.ts]
- "dashboard_schedulegrid_getweekdates": "getWeekDates()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ScheduleGrid.tsx:L19 | neighbors=[ScheduleGrid.tsx, ScheduleGrid()]
- "dashboard_schedulegrid_schedulegrid": "ScheduleGrid()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ScheduleGrid.tsx:L34 | neighbors=[ScheduleGrid.tsx, getWeekDates()]
- "dashboard_schedulepagecomponents_datedetailmodal": "DateDetailModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L679 | neighbors=[SchedulePageComponents.tsx, page.tsx]
- "dashboard_schedulingdispatch_techentry": "TechEntry" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L15 | neighbors=[JobDetailModal.tsx, SchedulingDispatch.tsx]
- "dashboard_summarycards_statfilter": "StatFilter" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SummaryCards.tsx:L7 | neighbors=[JobQueueTable.tsx, SummaryCards.tsx]
- "dashboard_techrow_getinitials": "getInitials()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechRow.tsx:L11 | neighbors=[TechRow.tsx, TechRow()]
- "drizzle_0007_curly_kree": "0007_curly_kree.sql" | kind=code-symbol | source=tech-pwa/drizzle/0007_curly_kree.sql:L1 | neighbors=[086dc4e feat(phase-18): event publishin…, workflow_events]
- "exec_route_handleget": "handleGet()" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L59 | neighbors=[route.ts, GET()]
- "exec_route_handlepost": "handlePost()" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L76 | neighbors=[route.ts, POST()]
- "file_sprint_go_live": "SPRINT_GO_LIVE_VALIDATION.md" | kind=entity | source=specs/SPRINT_GO_LIVE_VALIDATION.md | neighbors=[SPRINT_CC_FULL_VALIDATION.md, seed-test-data.ts]
- "fix_techs_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/fix-techs/route.ts:L43 | neighbors=[route.ts, normalizeName()]
- "fix_techs_route_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/src/app/api/fix-techs/route.ts:L6 | neighbors=[route.ts, GET()]
- "fixtures_seed_teardownfixtures": "teardownFixtures()" | kind=code-symbol | source=tech-pwa/tests/fixtures/seed.ts:L174 | neighbors=[seed.ts, globalTeardown.ts]
- "gmail_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/webhooks/n8n/gmail/route.ts:L27 | neighbors=[route.ts, gmail.webhook.post.test.ts]
- "hooks_gsd_statusline_composestatusline": "composeStatusline()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L474 | neighbors=[gsd-statusline.js, renderStatusline()]
- "hooks_gsd_statusline_evaluateupdatecache": "evaluateUpdateCache()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L508 | neighbors=[gsd-statusline.js, isInstalledAheadOfLatest()]
- "hooks_gsd_statusline_getconfigvalue": "getConfigValue()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L41 | neighbors=[gsd-statusline.js, renderStatusline()]
- "hooks_gsd_statusline_isinstalledaheadoflatest": "isInstalledAheadOfLatest()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L497 | neighbors=[gsd-statusline.js, evaluateUpdateCache()]
- "hooks_gsd_statusline_parsestatemd": "parseStateMd()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L139 | neighbors=[gsd-statusline.js, readGsdState()]
- "hooks_gsd_statusline_readgsdconfig": "readGsdConfig()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L18 | neighbors=[gsd-statusline.js, renderStatusline()]
- "hooks_gsd_statusline_readlastslashcommand": "readLastSlashCommand()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L61 | neighbors=[gsd-statusline.js, renderStatusline()]
- "hooks_gsd_statusline_renderprogressbar": "renderProgressBar()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L219 | neighbors=[gsd-statusline.js, formatGsdState()]
- "hooks_gsd_update_banner_buildbanneroutput": "buildBannerOutput()" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L34 | neighbors=[gsd-update-banner.js, main()]
- "hooks_gsd_update_banner_readcache": "readCache()" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L58 | neighbors=[gsd-update-banner.js, main()]
- "hooks_gsd_update_banner_recordfailurewarning": "recordFailureWarning()" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L92 | neighbors=[gsd-update-banner.js, main()]
- "hooks_gsd_update_banner_shouldsuppressfailurewarning": "shouldSuppressFailureWarning()" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L81 | neighbors=[gsd-update-banner.js, main()]
- "i18n_en_en": "en" | kind=code-symbol | source=tech-pwa/src/lib/i18n/en.ts:L1 | neighbors=[en.ts, index.tsx]
- "i18n_es_es": "es" | kind=code-symbol | source=tech-pwa/src/lib/i18n/es.ts:L3 | neighbors=[es.ts, index.tsx]
- "i18n_index_localeprovider": "LocaleProvider()" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L23 | neighbors=[layout.tsx, index.tsx]
- "intake_actions_submitintakeform": "submitIntakeForm()" | kind=code-symbol | source=tech-pwa/src/app/intake/actions.ts:L9 | neighbors=[actions.ts, page.tsx]
- "job_job_state_advanceevent": "AdvanceEvent" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L70 | neighbors=[index.ts, job-state.ts]
- "job_job_state_arrivalwindow": "ArrivalWindow" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L62 | neighbors=[index.ts, job-state.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-029.json

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
