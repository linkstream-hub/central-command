# Node Description Batch 48 of 49

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

- "tests_import_test_mock_csv": "MOCK_CSV" | kind=code-symbol | source=tech-pwa/src/app/api/techs/import/__tests__/import.test.ts:L11 | neighbors=[import.test.ts]
- "tests_import_test_mockfetch": "mockFetch()" | kind=code-symbol | source=tech-pwa/src/app/api/techs/import/__tests__/import.test.ts:L18 | neighbors=[import.test.ts]
- "tests_job_state_test_exitsfrom": "exitsFrom()" | kind=code-symbol | source=tech-pwa/src/domain/job/__tests__/job-state.test.ts:L48 | neighbors=[job-state.test.ts]
- "tests_job_state_test_job_id": "JOB_ID" | kind=code-symbol | source=tech-pwa/src/domain/job/__tests__/job-state.test.ts:L14 | neighbors=[job-state.test.ts]
- "tests_job_state_test_makedal": "makeDal()" | kind=code-symbol | source=tech-pwa/src/domain/job/__tests__/job-state.test.ts:L38 | neighbors=[job-state.test.ts]
- "tests_job_state_test_makejob": "makeJob()" | kind=code-symbol | source=tech-pwa/src/domain/job/__tests__/job-state.test.ts:L17 | neighbors=[job-state.test.ts]
- "tests_job_state_test_tech_id": "TECH_ID" | kind=code-symbol | source=tech-pwa/src/domain/job/__tests__/job-state.test.ts:L15 | neighbors=[job-state.test.ts]
- "time_off_page_balance": "Balance" | kind=code-symbol | source=tech-pwa/src/app/time-off/page.tsx:L17 | neighbors=[page.tsx]
- "time_off_page_requesttype": "RequestType" | kind=code-symbol | source=tech-pwa/src/app/time-off/page.tsx:L15 | neighbors=[page.tsx]
- "time_off_page_timeoffpage": "TimeOffPage()" | kind=code-symbol | source=tech-pwa/src/app/time-off/page.tsx:L33 | neighbors=[page.tsx]
- "time_off_page_timeoffrequest": "TimeOffRequest" | kind=code-symbol | source=tech-pwa/src/app/time-off/page.tsx:L23 | neighbors=[page.tsx]
- "today_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/schedule/today/route.ts:L10 | neighbors=[route.ts]
- "types_next_auth_d_jwt": "JWT" | kind=code-symbol | source=tech-pwa/src/types/next-auth.d.ts:L11 | neighbors=[next-auth.d.ts]
- "types_next_auth_d_session": "Session" | kind=code-symbol | source=tech-pwa/src/types/next-auth.d.ts:L4 | neighbors=[next-auth.d.ts]
- "unread_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/unread/route.ts:L8 | neighbors=[route.ts]
- "validate_token_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/gas/validate-token/route.ts:L6 | neighbors=[route.ts]
- "weather_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/weather/route.ts:L3 | neighbors=[route.ts]
- "weekly_schedule_page_gettodayiso": "getTodayISO()" | kind=code-symbol | source=tech-pwa/src/app/weekly-schedule/page.tsx:L36 | neighbors=[page.tsx]
- "weekly_schedule_page_getweekdates": "getWeekDates()" | kind=code-symbol | source=tech-pwa/src/app/weekly-schedule/page.tsx:L11 | neighbors=[page.tsx]
- "weekly_schedule_page_weeklyschedulepage": "WeeklySchedulePage()" | kind=code-symbol | source=tech-pwa/src/app/weekly-schedule/page.tsx:L42 | neighbors=[page.tsx]
- "adr_001": "ADR-001 (Dual Auth Architecture)" | kind=entity | source=docs/ARCHITECTURE.md
- "adr_002": "ADR-002 (Neon Postgres)" | kind=entity | source=docs/ARCHITECTURE.md
- "adr_004": "ADR-004 (Work Order Lifecycle)" | kind=entity | source=docs/ARCHITECTURE.md
- "adr_005": "ADR-005 (Multi-Tenancy)" | kind=entity | source=docs/ARCHITECTURE.md
- "antigravity_dispatch_battletest_spec_md": "Dispatch Battle Test Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md
- "antigravity_dispatch_excellence_spec_md": "Dispatch Excellence Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md
- "antigravity_dispatch_polish_spec_md": "Dispatch Polish Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md
- "antigravity_feedback_spec_md": "Dispatcher Feedback System Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md
- "antigravity_google_auth_spec_md": "Google Auth Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md
- "antigravity_hr_permissions_and_deploy_md": "HR Permissions and Deploy Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md
- "antigravity_i18n_spec_md": "Tech PWA I18n Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md
- "antigravity_job_comments_spec_md": "Job Comments Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_JOB_COMMENTS_SPEC.md
- "antigravity_kill_sync_spec_md": "Kill Sync Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md
- "AppSidebar": "App Sidebar" | kind=code-symbol | source=tech-pwa/src/components/dashboard/AppSidebar.tsx
- "compute_dashboard_stats": "computeDashboardStats" | kind=code-symbol | source=tech-pwa/src/lib/dal/mappers.ts
- "doc_ai_spec": "AI-SPEC.md" | kind=entity | source=agents/gsd-domain-researcher.md
- "doc_eval_review": "EVAL-REVIEW.md" | kind=entity | source=agents/gsd-eval-auditor.md
- "doc_patterns": "PATTERNS.md" | kind=entity | source=agents/gsd-pattern-mapper.md
- "doc_plan": "PLAN.md" | kind=entity | source=agents/gsd-planner.md
- "doc_research": "RESEARCH.md" | kind=entity | source=agents/gsd-phase-researcher.md

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-047.json

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
