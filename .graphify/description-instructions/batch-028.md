# Node Description Batch 29 of 49

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

- "commit:repo:github.com/linkstream-hub/central-command@1a1e686df1ced8e9ffbb1465654793f4385f6c5d": "1a1e686 chore: update settings allowlist" | kind=Commit | source=git | neighbors=[claude/plan-dispatch-dashboard-BX4AV, 448bb95 chore: dispatch dashboard diff …] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@1ba194ebb0435e288e8f9a85698bc7c2e68b97a3": "1ba194e chore(phase-14): generate diff artifact" | kind=Commit | source=git | neighbors=[07a0a9c docs(phase-14): formally mark d…, feat/phase-14-archive] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@261857b6f2e2b59e60d6b6078952eeb2c50b1100": "261857b docs(12): add plans 04 and 05 — NEON-02 read cutover and NEON-03 write …" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, b1f1740 docs(11-02): close plan — check…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@2abacbf3d12325bd35d394ba67b15b8b03fbbb30": "2abacbf test(p3-5): add passing playwright test results for gate 16" | kind=Commit | source=git | neighbors=[feat/p3-5-gas-bridge-cleanup, e0dd250 chore(p3-5): add test results] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4209061302408b94fbeb8a7576c549e19c10d54f": "4209061 docs(s119): session close — Foundation Phases 1-4 complete, STATE + ROA…" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 6c76106 chore: update ag_diff.txt — pla…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@51b349c6b9516781d4d78aca41a593769f997c8e": "51b349c chore(p3-2): add test results artifact" | kind=Commit | source=git | neighbors=[feat/p3-2-time-records-migration, 658624f chore(p3-2): regenerate diff ar…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@54c3520d741b9484d54d2cd9db5eb12b9f804cff": "54c3520 chore: close session S143 — Phase 16 execution complete, team structure…" | kind=Commit | source=git | neighbors=[feat/phase-16-execution, 59d38ba chore: stub handleLogin (Phase …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@57c59e66ee9969c9682478595d01805d64f6b369": "57c59e6 docs: Phase A email intake hotfix spec + SESSION_STATE phase sequence" | kind=Commit | source=git | neighbors=[464b853 Merge branch 'main' of https://…, docs/phase-a-intake-plan] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@702027aee255523d97963fc1541b3cac5abeb1a7": "702027a fix(ci): correct actions/checkout and setup-node to v4 (v6 does not exi…" | kind=Commit | source=git | neighbors=[feat/phase-17-job-state-machine, d38ff89 test: add integration tests and…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@738a640aa3796f6af9e38f42a232ddbedd8722aa": "738a640 chore(ci): gate E2E to workflow_dispatch only" | kind=Commit | source=git | neighbors=[feat/phase-20-auth-lint, ce35b66 fix(phase-20): fix remaining Ty…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@74bdd2f9c0288ae7927c56346fdbe1195f05f778": "74bdd2f chore: trigger production deploy" | kind=Commit | source=git | neighbors=[2cc8791 ci: add workflow_dispatch to ve…, chore/trigger-prod-deploy] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@7db2a9cac88754b4112adfec50cb813d8d0f37fa": "7db2a9c wip: phase-16 paused at inventory complete — 3 cutover blockers documen…" | kind=Commit | source=git | neighbors=[1fe925e chore: session close S127 — Pla…, chore/s123-session-close] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@83b12776a9ed8ae1f2cd3e797a9a53e64f0eb0bb": "83b1277 chore: session close S132 — Wave 2b merged, sentinel-health deleted" | kind=Commit | source=git | neighbors=[feat/schedule-redesign, b52653d fix(ci): prefer-const phoneMap …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@886ad6e1e652591ed045a43d6bc060dfc8e2223c": "886ad6e chore: trigger production deploy" | kind=Commit | source=git | neighbors=[179a7de feat(16): TechPWA.gs auth cutov…, chore/trigger-prod-deploy-2] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@99bb1ec98e9bedc9f21bbe98c19f4946ca929a42": "99bb1ec fix(ci): remove path filter — run on all PRs to main" | kind=Commit | source=git | neighbors=[feat/phase-19-observability, d2e780d feat(phase-19): observability s…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ad6f8766f319e5d2727d486543bedf1bb4b3e78d": "ad6f876 chore(hotfix): add archive test results" | kind=Commit | source=git | neighbors=[feat/hotfix-archive-neon, d492a0c fix(dashboard-api): add archive…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@babaa64573d5a61b25b9395befcac68abdbd1204": "babaa64 chore: S99 session closeout — P3-1 complete, SESSION_STATE ready for S1…" | kind=Commit | source=git | neighbors=[chore/s99-closeout, d7eb645 feat(p3-1): schema foundation —…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@bc843511783581653d4f1823e2d8937d90b07bfd": "bc84351 chore(deps): bump the all-dependencies group across 1 directory with 21…" | kind=Commit | source=git | neighbors=[dependabot/npm_and_yarn/tech-pwa/all-de…, e75bd29 chore: trigger production deplo…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d0db6002e901230c89383a02ce3b455a1640761c": "d0db600 docs: start milestone v1.1 Neon Cut-Over (3 phases, 9 requirements)" | kind=Commit | source=git | neighbors=[2a9e7b5 chore: resolve SESSION_STATE me…, chore/v1.1-milestone-init] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d7815ab5bce06f017143cafd2d18ea77a95acb19": "d7815ab chore(s117): finalize STATE.md — Phase 3 execution order documented" | kind=Commit | source=git | neighbors=[9b7c4e8 docs(03): plan Phase 3 Gap Reme…, chore/s117-session-close] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d7970a0095f1e3250343d89857a007e42efdd7b6": "d7970a0 test(s113): document browser verification evidence" | kind=Commit | source=git | neighbors=[a49ddb6 chore(s113): task 8 test result…, feat/s113-remediation] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@dea1c75eb0b31969f601ef0e6c56ea12a83fec20": "dea1c75 chore: update SESSION_STATE to S157 — PR #4 open, lean stack complete" | kind=Commit | source=git | neighbors=[chore/lean-agent-stack, f5c63dc docs(agents): add Codex design …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ecdcb490cc1a6685bf605366a176a995f4236343": "ecdcb49 trigger: test vercel deploy after config update" | kind=Commit | source=git | neighbors=[fix/pipeline-deploy-v2, fa1376c Merge pull request #2405 from B…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@edbcee7935921bfe75616588f156a58691b504c3": "edbcee7 chore(foundation-05): export n8n workflows to version control — CA Brea…" | kind=Commit | source=git | neighbors=[3a41c48 chore: resolve ROADMAP merge co…, feat/foundation-phase5-n8n-export] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ee7129d8b99539e7ac43cc3beb9ffe3ba36f0ac0": "ee7129d chore: wire context_bundle.ps1 UserPromptSubmit hook + sync phase-12 st…" | kind=Commit | source=git | neighbors=[chore/phase-12-merge-sync, f8c2c96 fix(vercel): skip preview build…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f930d3b1da7e83c3eeb8ae532d82192361861590": "f930d3b docs(13): capture Phase 13 Write Path Flip context" | kind=Commit | source=git | neighbors=[6403f69 chore: wire context_bundle.ps1 …, docs/phase-13-context] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@fe0e4e12e09a5da7c801c002c53e1de6c18d2a54": "fe0e4e1 chore: add db assignment test scripts" | kind=Commit | source=git | neighbors=[b135e46 fix(pipeline): un-archive June …, fix-pipeline-and-ui] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ff5a2d554bcceb30dc3fdf8d67bfa5edbb379f8e": "ff5a2d5 fix(hooks): correct escape sequence in dangerous_command_blocker" | kind=Commit | source=git | neighbors=[cbb71da chore: remove temporary scripts, feat/adw-flag-gate-and-hooks] | lang=en
- "complete_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/job/complete/route.ts:L12 | neighbors=[route.ts, route.test.ts] | lang=en
- "components_installprompt_beforeinstallpromptevent": "BeforeInstallPromptEvent" | kind=code-symbol | source=tech-pwa/src/components/InstallPrompt.tsx:L6 | neighbors=[InstallPrompt.tsx, Event] | lang=en
- "components_skeleton_skeletoncard": "SkeletonCard()" | kind=code-symbol | source=tech-pwa/src/components/Skeleton.tsx:L1 | neighbors=[Skeleton.tsx, page.tsx] | lang=en
- "components_techloginview_techloginview": "TechLoginView()" | kind=code-symbol | source=tech-pwa/src/components/TechLoginView.tsx:L15 | neighbors=[TechLoginView.tsx, page.tsx] | lang=en
- "context_toastcontext_toastprovider": "ToastProvider()" | kind=code-symbol | source=tech-pwa/src/context/ToastContext.tsx:L11 | neighbors=[layout.tsx, ToastContext.tsx] | lang=en
- "dal_job_state_dal_maparrivalwindow": "mapArrivalWindow()" | kind=code-symbol | source=tech-pwa/src/lib/dal/job-state-dal.ts:L27 | neighbors=[job-state-dal.ts, mapToJobStateRecord()] | lang=en
- "dal_job_state_dal_mappte": "mapPte()" | kind=code-symbol | source=tech-pwa/src/lib/dal/job-state-dal.ts:L14 | neighbors=[job-state-dal.ts, mapToJobStateRecord()] | lang=en
- "dal_job_state_dal_mapwotype": "mapWoType()" | kind=code-symbol | source=tech-pwa/src/lib/dal/job-state-dal.ts:L20 | neighbors=[job-state-dal.ts, mapToJobStateRecord()] | lang=en
- "dal_jobs_manualjobpayload": "ManualJobPayload" | kind=code-symbol | source=tech-pwa/src/lib/dal/jobs.ts:L10 | neighbors=[jobs.ts, route.ts] | lang=en
- "dal_mappers_normalizelegacystatus": "normalizeLegacyStatus()" | kind=code-symbol | source=tech-pwa/src/lib/dal/mappers.ts:L7 | neighbors=[mappers.ts, mapJob()] | lang=en
- "dashboard_api_ts": "Dashboard API Client" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts | neighbors=[Job Detail Modal, page.tsx] | lang=en
- "dashboard_appsidebar_appsidebar": "AppSidebar()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/AppSidebar.tsx:L37 | neighbors=[AppSidebar.tsx, cn()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-028.json

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
