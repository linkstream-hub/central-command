# Node Description Batch 77 of 412

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

- "hooks_gsd_statusline_isinstalledaheadoflatest": "isInstalledAheadOfLatest()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L497 | neighbors=[gsd-statusline.js, evaluateUpdateCache()]
- "hooks_gsd_statusline_parsestatemd": "parseStateMd()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L139 | neighbors=[gsd-statusline.js, readGsdState()]
- "hooks_gsd_statusline_readgsdconfig": "readGsdConfig()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L18 | neighbors=[gsd-statusline.js, renderStatusline()]
- "hooks_gsd_statusline_readlastslashcommand": "readLastSlashCommand()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L61 | neighbors=[gsd-statusline.js, renderStatusline()]
- "hooks_gsd_statusline_renderprogressbar": "renderProgressBar()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L219 | neighbors=[gsd-statusline.js, formatGsdState()]
- "hooks_gsd_update_banner_buildbanneroutput": "buildBannerOutput()" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L34 | neighbors=[gsd-update-banner.js, main()]
- "hooks_gsd_update_banner_readcache": "readCache()" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L58 | neighbors=[gsd-update-banner.js, main()]
- "hooks_gsd_update_banner_recordfailurewarning": "recordFailureWarning()" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L92 | neighbors=[gsd-update-banner.js, main()]
- "hooks_gsd_update_banner_shouldsuppressfailurewarning": "shouldSuppressFailureWarning()" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L81 | neighbors=[gsd-update-banner.js, main()]
- "hooks_gsd_workflow_guard_forcegitaddcwds": "forceGitAddCwds()" | kind=code-symbol | source=.claude/hooks/gsd-workflow-guard.js:L19 | neighbors=[gsd-workflow-guard.js, tokenize()]
- "hours_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/field/hours/route.ts:L9 | neighbors=[route.ts, verifyFieldSession()]
- "hr_page_hrpage": "HRPage()" | kind=code-symbol | source=tech-pwa/src/app/hr/page.tsx:L26 | neighbors=[page.tsx, useToast()]
- "i18n_en_en": "en" | kind=code-symbol | source=tech-pwa/src/lib/i18n/en.ts:L1 | neighbors=[en.ts, index.tsx]
- "i18n_es_es": "es" | kind=code-symbol | source=tech-pwa/src/lib/i18n/es.ts:L3 | neighbors=[es.ts, index.tsx]
- "i18n_index_localecontexttype": "LocaleContextType" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L11 | neighbors=[index.tsx, Messages]
- "i18n_index_localeprovider": "LocaleProvider()" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L23 | neighbors=[layout.tsx, index.tsx]
- "import_route_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/src/app/api/techs/import/route.ts:L8 | neighbors=[route.ts, POST()]
- "import_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/techs/import/route.ts:L23 | neighbors=[route.ts, normalizeName()]
- "job_job_state_advanceevent": "AdvanceEvent" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L70 | neighbors=[index.ts, job-state.ts]
- "job_job_state_arrivalwindow": "ArrivalWindow" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L62 | neighbors=[index.ts, job-state.ts]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-076.json

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
