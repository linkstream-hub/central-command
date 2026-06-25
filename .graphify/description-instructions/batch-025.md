# Node Description Batch 26 of 49

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/linkstream-hub/central-command@da39104db736e0097c719742e8dfe04c348448f6": "da39104 chore: add GSD skill permissions to settings.local.json" | kind=Commit | source=git | neighbors=[7eece97 docs(01): plan Phase 1 — POST /…, feat/s115-dispatch-flow, 143a13a chore(s117): session close — Ph…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@da5964dfb1781309b8e67e53358061acf41a89a6": "da5964d chore: update ag_diff.txt — plan 02 (Gaps 3+4)" | kind=Commit | source=git | neighbors=[6ead9d4 feat(foundation-04): Gap 4 — lo…, feat/foundation-milestone, 0bbc4ce feat(foundation-02/06): Gap 2+6…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@dc4e9f1b536b7f188ffb329103f210110bed3b27": "dc4e9f1 chore(hotfix): add diff artifact" | kind=Commit | source=git | neighbors=[b0ed930 chore(s104): session closeout —…, feat/hotfix-archive-neon, d492a0c fix(dashboard-api): add archive…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@dd2d2db47e8c6b9764252eab9d1790b4b576219c": "dd2d2db chore: update diff artifact" | kind=Commit | source=git | neighbors=[19ec6a8 fix(phase-19): remove id from n…, feat/phase-19-code-js-email-migration, b30038a fix(phase-19): update n8n crede…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e0dd2501066fa88264da7fc9f716e9f6a9500d23": "e0dd250 chore(p3-5): add test results" | kind=Commit | source=git | neighbors=[0d026cf chore(p3-5): regenerate diff ar…, feat/p3-5-gas-bridge-cleanup, 2abacbf test(p3-5): add passing playwri…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e1c991b42f387a3b21209dc82530c088ce23a206": "e1c991b chore: update diff artifact" | kind=Commit | source=git | neighbors=[88bbb61 fix(phase-19): correct off-by-o…, feat/phase-19-code-js-email-migration, 19ec6a8 fix(phase-19): remove id from n…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e2b75b6e5dd01ad4621bcac5ac57fed3f6594928": "e2b75b6 docs(11-01): append shadow-write gaps, production triage flow, security…" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, f16595c docs(11-01): complete tech debt…, e4d35f3 docs(11-01): append Next.js rou…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e31990e1f47fb8176668bf41f207a2c6c7e075c8": "e31990e chore: update diff artifact" | kind=Commit | source=git | neighbors=[664130b fix: n8n IF node and data source, feat/phase-19-code-js-email-migration, 9982767 fix(phase-19): complete Lapham …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e4d35f341f10da36d8800109212e927ee3717d7f": "e4d35f3 docs(11-01): append Next.js routes, Drizzle/Neon, n8n, and frontend tab…" | kind=Commit | source=git | neighbors=[a157981 docs(11-01): write header, exec…, feat/phase-19-code-js-email-migration, e2b75b6 docs(11-01): append shadow-writ…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ea64d3418e2ddf7575c32da2bc467e06fc4bb39f": "ea64d34 chore: session close — Phase 1 finding: dispatch queue reads Sheets not…" | kind=Commit | source=git | neighbors=[6184db5 chore(s116): session state — S1…, feat/s115-dispatch-flow, f33d302 docs(01): capture Phase 1 conte…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ea82854cc0f683225c3a390f9f8be22047c05ac5": "ea82854 feat(foundation): phases 9-11 — n8n error handling, GAS migration scope…" | kind=Commit | source=git | neighbors=[86de1f9 Merge branch 'main' of https://…, feat/foundation-phases-9-11, 989514d fix(job-comments): add sheetsId…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@eea6dcecaac871c50907368aa4cabdf46701037b": "eea6dce feat(gas): sendTenantContact() — PTE coordination email, wired in route…" | kind=Commit | source=git | neighbors=[feat/send-tenant-contact, Code.js, f86e858 chore: gitignore — exclude Clau…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f0860f67f182680cb52762f4bf9ac9fc46eda08a": "f0860f6 feat(foundation-03): Gap 3 — add implement/test/commit/pull_request/cla…" | kind=Commit | source=git | neighbors=[05e78c5 fix(foundation-01): touch diff …, feat/foundation-milestone, cf28a3d feat(foundation-02): context_bu…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f16595c22131d6c20c31336c596c35ec1c0a6275": "f16595c docs(11-01): complete tech debt map plan — SUMMARY, STATE, ROADMAP" | kind=Commit | source=git | neighbors=[e2b75b6 docs(11-01): append shadow-writ…, feat/phase-19-code-js-email-migration, 0268497 docs(11-02): expand MANIFEST.js…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f1c65b349f663ea67dd1e279104150ebe294cadd": "f1c65b3 chore(s113): regenerate ag_diff with S113 code changes" | kind=Commit | source=git | neighbors=[7780b6c feat(s113): gap 2+4+5+6 — needs…, feat/s113-remediation, a49ddb6 chore(s113): task 8 test result…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f33d302aaadee3873802f90a0e5be60fc2382f3d": "f33d302 docs(01): capture Phase 1 context — Dispatch Neon Cutover" | kind=Commit | source=git | neighbors=[ea64d34 chore: session close — Phase 1 …, feat/s115-dispatch-flow, c4f6ee0 docs(01): confirm Script Proper…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f5c63dc09c6480da6e4a477845383931180af35c": "f5c63dc docs(agents): add Codex design brief — design.json, anti-slop rules, sk…" | kind=Commit | source=git | neighbors=[43c9034 fix(ui): BottomNav — remove dea…, chore/lean-agent-stack, dea1c75 chore: update SESSION_STATE to …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f8c2c967c5b711f3c41c225e5ea009fbc9b82393": "f8c2c96 fix(vercel): skip preview builds for non-PR branch pushes" | kind=Commit | source=git | neighbors=[10ebf48 chore: merge origin/main — reso…, chore/phase-12-merge-sync, ee7129d chore: wire context_bundle.ps1 …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@fd3727c3b31b05e017953cab117100a751b67187": "fd3727c chore: remove every-minute cron — n8n owns gmail sync (Hobby plan compa…" | kind=Commit | source=git | neighbors=[1e45239 feat(domain): add JobStateServi…, feat/phase-17-job-state-machine, 73e906c docs(phase-17): rewrite spec wi…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ff093f603c9c5d478c4e427321a5080af1f70188": "ff093f6 feat(adw): flag gate, hooks, and agents" | kind=Commit | source=git | neighbors=[3e87d74 chore(s121): Foundation Milesto…, feat/adw-flag-gate-and-hooks, c0a3abf chore: update diff artifact] | lang=en
- "dal_jobs_jobsrepository": "jobsRepository" | kind=code-symbol | source=tech-pwa/src/lib/dal/jobs.ts:L34 | neighbors=[jobs.ts, route.ts, route.ts] | lang=en
- "dal_mappers_mapjob": "mapJob()" | kind=code-symbol | source=tech-pwa/src/lib/dal/mappers.ts:L21 | neighbors=[jobs.ts, mappers.ts, normalizeLegacyStatus()] | lang=en
- "dashboard_jobchip_jobchip": "JobChip()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobChip.tsx:L8 | neighbors=[JobChip.tsx, TechRow.tsx, UrgentQueuePanel.tsx] | lang=en
- "dashboard_techrow_techrow": "TechRow()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechRow.tsx:L19 | neighbors=[ScheduleGrid.tsx, TechRow.tsx, getInitials()] | lang=en
- "drizzle_0002_noisy_shinko_yamashiro": "0002_noisy_shinko_yamashiro.sql" | kind=code-symbol | source=tech-pwa/drizzle/0002_noisy_shinko_yamashiro.sql:L1 | neighbors=[01bf641 Initial commit — clean history, c6162cc feat(sprint6b): tenant response…, compliance_alerts] | lang=en
- "drizzle_0004_normalize_job_status_names": "0004_normalize_job_status_names.sql" | kind=code-symbol | source=tech-pwa/drizzle/0004_normalize_job_status_names.sql:L1 | neighbors=[01bf641 Initial commit — clean history, 37a172f feat(s115): dispatch flow lockd…, bfb635a Merge pull request #1304 from B…] | lang=en
- "drizzle_0006_glossy_puck": "0006_glossy_puck.sql" | kind=code-symbol | source=tech-pwa/drizzle/0006_glossy_puck.sql:L1 | neighbors=[01bf641 Initial commit — clean history, 48540a0 feat(schedule): lock-and-send A…, 7c1b6fa feat(schedule): Wave 2b Lock an…] | lang=en
- "exec_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L114 | neighbors=[route.ts, guardProduction(), handleGet()] | lang=en
- "exec_route_guardproduction": "guardProduction()" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L3 | neighbors=[route.ts, GET(), POST()] | lang=en
- "exec_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L122 | neighbors=[route.ts, guardProduction(), handlePost()] | lang=en
- "fixtures_seed_seedfixtures": "seedFixtures()" | kind=code-symbol | source=tech-pwa/tests/fixtures/seed.ts:L107 | neighbors=[dispatch.spec.ts, seed.ts, globalSetup.ts] | lang=en
- "hooks_gsd_statusline_formatgsdstate": "formatGsdState()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L244 | neighbors=[gsd-statusline.js, renderProgressBar(), renderStatusline()] | lang=en
- "hooks_gsd_statusline_readgsdstate": "readGsdState()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L104 | neighbors=[gsd-statusline.js, parseStateMd(), renderStatusline()] | lang=en
- "intel_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/intel/page.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, DashboardLayout.tsx, IntelComingSoonPage()] | lang=en
- "job_job_state_createjobstateservice": "createJobStateService()" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L603 | neighbors=[index.ts, job-state.ts, job-state.test.ts] | lang=en
- "job_job_state_job_state_machine": "JOB_STATE_MACHINE" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L256 | neighbors=[index.ts, job-state.ts, job-state.test.ts] | lang=en
- "job_job_state_jobstatedal": "JobStateDAL" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L405 | neighbors=[index.ts, job-state.ts, job-state.test.ts] | lang=en
- "job_job_state_jobstaterecord": "JobStateRecord" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L198 | neighbors=[index.ts, job-state.ts, job-state.test.ts] | lang=en
- "job_job_state_schedulingtoken": "SchedulingToken" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L19 | neighbors=[index.ts, job-state.ts, job-state.test.ts] | lang=en
- "job_job_state_tojobid": "toJobId()" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L22 | neighbors=[index.ts, job-state.ts, job-state.test.ts] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-025.json

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
