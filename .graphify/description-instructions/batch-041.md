# Node Description Batch 42 of 49

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

- "hooks_gsd_statusline_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L7 | neighbors=[gsd-statusline.js]
- "hooks_gsd_statusline_runstatusline": "runStatusline()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L291 | neighbors=[gsd-statusline.js]
- "hooks_gsd_update_banner_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L15 | neighbors=[gsd-update-banner.js]
- "hooks_gsd_update_banner_os": "os" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L17 | neighbors=[gsd-update-banner.js]
- "hooks_gsd_update_banner_package_name_updatecachefilename": "{ PACKAGE_NAME, updateCacheFileName }" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L18 | neighbors=[gsd-update-banner.js]
- "hooks_gsd_update_banner_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L16 | neighbors=[gsd-update-banner.js]
- "hooks_gsd_workflow_guard_currentbranch": "currentBranch()" | kind=code-symbol | source=.claude/hooks/gsd-workflow-guard.js:L59 | neighbors=[gsd-workflow-guard.js]
- "hooks_gsd_workflow_guard_forcegitaddcwds": "forceGitAddCwds()" | kind=code-symbol | source=.claude/hooks/gsd-workflow-guard.js:L19 | neighbors=[gsd-workflow-guard.js]
- "hooks_gsd_workflow_guard_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-workflow-guard.js:L14 | neighbors=[gsd-workflow-guard.js]
- "hooks_gsd_workflow_guard_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-workflow-guard.js:L15 | neighbors=[gsd-workflow-guard.js]
- "hooks_gsd_workflow_guard_spawnsync": "{ spawnSync }" | kind=code-symbol | source=.claude/hooks/gsd-workflow-guard.js:L16 | neighbors=[gsd-workflow-guard.js]
- "hooks_gsd_workflow_guard_stdintimeout": "stdinTimeout" | kind=code-symbol | source=.claude/hooks/gsd-workflow-guard.js:L82 | neighbors=[gsd-workflow-guard.js]
- "hooks_gsd_workflow_guard_tokenize": "{ tokenize }" | kind=code-symbol | source=.claude/hooks/gsd-workflow-guard.js:L17 | neighbors=[gsd-workflow-guard.js]
- "hooks_gsd_workflow_guard_workflowguardenabled": "workflowGuardEnabled()" | kind=code-symbol | source=.claude/hooks/gsd-workflow-guard.js:L70 | neighbors=[gsd-workflow-guard.js]
- "hooks_gsd_worktree_path_guard_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L17 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_git": "git()" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L23 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_nearestexistingdir": "nearestExistingDir()" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L29 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L18 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_spawnopt": "SPAWNOPT" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L21 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_spawnsync": "{ spawnSync }" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L19 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_stdintimeout": "stdinTimeout" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L41 | neighbors=[gsd-worktree-path-guard.js]
- "hours_page_myhourspage": "MyHoursPage()" | kind=code-symbol | source=tech-pwa/src/app/hours/page.tsx:L28 | neighbors=[page.tsx]
- "hours_page_timerecord": "TimeRecord" | kind=code-symbol | source=tech-pwa/src/app/hours/page.tsx:L8 | neighbors=[page.tsx]
- "hours_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/field/hours/route.ts:L9 | neighbors=[route.ts]
- "hr_page_hrpage": "HRPage()" | kind=code-symbol | source=tech-pwa/src/app/hr/page.tsx:L26 | neighbors=[page.tsx]
- "hr_page_status_styles": "STATUS_STYLES" | kind=code-symbol | source=tech-pwa/src/app/hr/page.tsx:L20 | neighbors=[page.tsx]
- "i18n_index_locale": "Locale" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L7 | neighbors=[index.tsx]
- "i18n_index_localecontext": "LocaleContext" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L17 | neighbors=[index.tsx]
- "i18n_index_localecontexttype": "LocaleContextType" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L11 | neighbors=[index.tsx]
- "i18n_index_messages": "messages" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L9 | neighbors=[index.tsx]
- "import_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/techs/import/route.ts:L9 | neighbors=[route.ts]
- "inbound_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/inbound/route.ts:L6 | neighbors=[route.ts]
- "intake_page_intakepage": "IntakePage()" | kind=code-symbol | source=tech-pwa/src/app/intake/page.tsx:L7 | neighbors=[page.tsx]
- "intel_page_intelcomingsoonpage": "IntelComingSoonPage()" | kind=code-symbol | source=tech-pwa/src/app/intel/page.tsx:L7 | neighbors=[page.tsx]
- "job_detail_page": "Job Detail Page" | kind=code-symbol | source=tech-pwa/src/app/job/[jobId]/page.tsx | neighbors=[Clocked In Bar]
- "job_job_state_applyevent": "applyEvent()" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L494 | neighbors=[job-state.ts]
- "job_job_state_declaresideeffects": "declareSideEffects()" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L545 | neighbors=[job-state.ts]
- "job_state_service": "JobStateService" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts | neighbors=[EventBus Module]
- "JobDetailModal": "Job Detail Modal" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx | neighbors=[Dashboard API Client]
- "jobid_job_update_jobupdatebody": "JobUpdateBody" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/job-update.ts:L21 | neighbors=[job-update.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-041.json

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
