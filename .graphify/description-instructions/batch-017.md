# Node Description Batch 18 of 49

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

- "commit:repo:github.com/linkstream-hub/central-command@683a8f988d28e0d1faee5a2301475900b7be46b4": "683a8f9 docs(phase-28): Sentinel Consolidation — Neon Compute Diet (definition …" | kind=Commit | source=git | neighbors=[feat/phase-28-sentinel-diet, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 8fbeeb2 feat(phase-28): sentinel diet —…, cc807d8 chore: gitignore .ops/ + add Ne…, 7846c4b fix(phase-27): scope amendment …] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@6e48461082b16eebe4a1070f2ce68b0bb46aa1e8": "6e48461 fix(techs): rewrite /api/techs/import — auth, PIN hash, skills, staff s…" | kind=Commit | source=git | neighbors=[1d7483a test(techs): phase 24 roster sh…, feature/phase-24-tech-roster, 72eab45 fix(lint): type generateObject …, route.ts, vitest.config.ts, import.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@70d0dfe011037cfe95c1170cd499f2af3e145b4a": "70d0dfe fix(intake): revert model to 1.5 flash" | kind=Commit | source=git | neighbors=[1ddb26d fix(intake): type fix in fallba…, feature/phase-23-lapham-integration, feature/phase-24-tech-roster, main, e5eae6e fix(intake): use gemini-2.5-fla…, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@8799e77755b5a0c761849f9eb5c5c7733d671a45": "8799e77 fix(intake): remove stale Gemini 2.5 comment — model is 1.5-flash" | kind=Commit | source=git | neighbors=[feature/phase-23-lapham-integration, feature/phase-24-tech-roster, main, 5c0e55f fix(n8n): rewire phase-19 workf…, route.ts, ac63333 fix(intake): change gemini mode…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@8da5bea228c7f89555786ca3cb1b4dd196422ce5": "8da5bea chore(scaffold): add design system files, properties API route, n8n pha…" | kind=Commit | source=git | neighbors=[feat/phase-28-sentinel-diet, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, ae595ff chore(tooling): add GSD platfor…, route.ts, e3e0863 chore(graphify): consolidate gr…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@959aeb88816df4057c34eecf051231ffe91e6c24": "959aeb8 fix(intake): resolve syntax error in route.ts fallback" | kind=Commit | source=git | neighbors=[555dc30 fix(intake): use gemini-2.0-fla…, feature/phase-23-lapham-integration, feature/phase-24-tech-roster, main, 1ddb26d fix(intake): type fix in fallba…, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@989514d78863d14e3cae4f77a5cc81272bc0df3c": "989514d fix(job-comments): add sheetsId dedup key — prevent lazy-backfill dupli…" | kind=Commit | source=git | neighbors=[feat/foundation-phases-9-11, 64760e1 fix(drizzle): commit _journal.j…, 0005_cloudy_nitro.sql, route.ts, schema.ts, ea82854 feat(foundation): phases 9-11 —…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ac633331d818a53f7c7bfa69a37620e7a8f33696": "ac63333 fix(intake): change gemini model to 1.5 flash and log errors" | kind=Commit | source=git | neighbors=[1ab58d4 fix(intake): rewire n8n workflo…, feature/phase-23-lapham-integration, feature/phase-24-tech-roster, main, 8799e77 fix(intake): remove stale Gemin…, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c8e6884e2b72060d921faefb26485facc1fc2b38": "c8e6884 Merge pull request #11 from linkstream-hub/feature/phase-23-lapham-inte…" | kind=Commit | source=git | neighbors=[43807eb feat(intake): phase 23 lapham +…, 5d0ae0d feat(ui): phase 22 surgical fix…, feature/phase-24-tech-roster, 1d7483a test(techs): phase 24 roster sh…, route.ts, gmail.webhook.post.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ce35b6642695bab71db35bb5db3e2d3e2368f692": "ce35b66 fix(phase-20): fix remaining TypeScript errors from type-narrowing chan…" | kind=Commit | source=git | neighbors=[10dfe41 fix(phase-20): resolve TypeScri…, feat/phase-20-auth-lint, 738a640 chore(ci): gate E2E to workflow…, DispatchTimelineBoard.tsx, JobAssignmentModal.tsx, job-update.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d38ff89c71a3df3341b664b92423407ac42d4bc8": "d38ff89 test: add integration tests and ci workflow for phase 17" | kind=Commit | source=git | neighbors=[c5c1cfd fix(api): prevent db.update emp…, feat/phase-17-job-state-machine, 702027a fix(ci): correct actions/checko…, vitest.config.ts, [jobId].patch.test.ts, route.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e5eae6ec1d29cbf009467e3d0d0e5c5dc853e711": "e5eae6e fix(intake): use gemini-2.5-flash — 2.0 deprecated, 1.5 not on v1beta" | kind=Commit | source=git | neighbors=[70d0dfe fix(intake): revert model to 1.…, feature/phase-23-lapham-integration, feature/phase-24-tech-roster, main, 4e0a127 chore: S163 close — B3 intake c…, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f5ce15f76aa4394f62cd2d7a27d6477be34e8add": "f5ce15f fix(design): remove side-stripe borders from JobChip + update GSD state" | kind=Commit | source=git | neighbors=[0057852 chore(docs): scaffold matt-poco…, feat/phase-28-sentinel-diet, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, cad5ef3 chore(graph): enable graphify +…, JobChip.tsx] | lang=en
- "context_toastcontext_usetoast": "useToast()" | kind=code-symbol | source=tech-pwa/src/context/ToastContext.tsx:L50 | neighbors=[ClockedInBar.tsx, Toast.tsx, ToastContext.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "design_extract_output_aptmaintenanceinc_com_theme": "aptmaintenanceinc-com-theme.js" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-theme.js:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, muiTheme, theme] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_theme": "dispatch-aptmaintenanceinc-com-theme.js" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-theme.js:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, muiTheme, theme] | lang=en
- "drizzle_0000_conscious_microchip": "0000_conscious_microchip.sql" | kind=code-symbol | source=tech-pwa/drizzle/0000_conscious_microchip.sql:L1 | neighbors=[01bf641 Initial commit — clean history, comms_messages, job_comments, jobs, techs, time_records] | lang=en
- "fixtures_auth_loginasadmin": "loginAsAdmin()" | kind=code-symbol | source=tech-pwa/tests/fixtures/auth.ts:L3 | neighbors=[accessibility.spec.ts, auth.spec.ts, dispatch.spec.ts, scheduling.spec.ts, tenant-loop.spec.ts, auth.ts] | lang=en
- "gas_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/gas/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 3dd68e5 fix: remove unauth dev routes, …, 4a2c613 docs(gas): complete GAS migrati…, e61f88a fix(security+team): server-side…, POST(), auth.ts] | lang=en
- "health_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/health/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4fa0199 Merge pull request #1003 from B…, e69b48a feat: tier-2.5 security hardeni…, GET(), db.ts, db] | lang=en
- "hooks_gsd_config_reload": "gsd-config-reload.js" | kind=code-symbol | source=.claude/hooks/gsd-config-reload.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, fs, path, stdinTimeout] | lang=en
- "hooks_gsd_cursor_session_start": "gsd-cursor-session-start.js" | kind=code-symbol | source=.claude/hooks/gsd-cursor-session-start.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, fs, path, stdinTimeout] | lang=en
- "hooks_gsd_read_guard": "gsd-read-guard.js" | kind=code-symbol | source=.claude/hooks/gsd-read-guard.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, fs, path, stdinTimeout] | lang=en
- "lib_normalizeaddresskey": "normalizeAddressKey.ts" | kind=code-symbol | source=tech-pwa/src/lib/normalizeAddressKey.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 2ea94d6 feat(phase-25): Parsing & Intak…, route.ts, detectLaphamForm.ts, normalizeAddressKey(), normalizeAddressKey.test.ts] | lang=en
- "lib_schema_properties": "properties" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L69 | neighbors=[route.ts, route.ts, schema.ts, route.ts, migrate-from-csv.ts, gmail.webhook.post.test.ts] | lang=en
- "scripts_test_jobs_dal": "test-jobs-dal.ts" | kind=code-symbol | source=tech-pwa/scripts/test-jobs-dal.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4c39575 fix: DAL snake_case mapping, de…, 7dfecc5 fix(dal): map Drizzle ORM snake…, bdabbf4 fix: correct dashboard stats se…, jobs.ts, main()] | lang=en
- "src_index": "index.js" | kind=code-symbol | source=workers/tech-pwa-proxy/src/index.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8d8aa10 feat(tech-pwa): add Cloudflare …, e8a1a01 Merge pull request #65 from BGB…, ALLOWED_ORIGINS, corsHeaders(), fetch()] | lang=en
- "tech_pwa_check_dupes": "check-dupes.js" | kind=code-symbol | source=tech-pwa/check-dupes.js:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, { neon }, sql] | lang=en
- "tech_pwa_check_jobs": "check-jobs.js" | kind=code-symbol | source=tech-pwa/check-jobs.js:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, { neon }, sql] | lang=en
- "tech_pwa_check_statuses": "check-statuses.js" | kind=code-symbol | source=tech-pwa/check-statuses.js:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, { neon }, sql] | lang=en
- "tech_pwa_check_time_records": "check-time-records.js" | kind=code-symbol | source=tech-pwa/check-time-records.js:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, { neon }, sql] | lang=en
- "tech_pwa_get_all_gids": "get-all-gids.js" | kind=code-symbol | source=tech-pwa/get-all-gids.js:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, fs, html] | lang=en
- "tech_pwa_get_gids": "get-gids.js" | kind=code-symbol | source=tech-pwa/get-gids.js:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, fs, html] | lang=en
- "tests_dispatchtimelineboard_test": "DispatchTimelineBoard.test.ts" | kind=code-symbol | source=tech-pwa/src/components/dashboard/__tests__/DispatchTimelineBoard.test.ts:L1 | neighbors=[5d0ae0d feat(ui): phase 22 surgical fix…, DispatchTimelineBoard.tsx, buildScheduledJobUpdate(), types.ts, Job, baseJob] | lang=en
- "tests_globalteardown": "globalTeardown.ts" | kind=code-symbol | source=tech-pwa/tests/globalTeardown.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 500f6b5 feat(sprint5): E2E test suite w…, dba30ac Merge pull request #53 from BGB…, seed.ts, teardownFixtures(), globalTeardown()] | lang=en
- "validate_token_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/gas/validate-token/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, fieldAuth.ts, verifyFieldSession(), POST()] | lang=en
- "code_parsewithgemini": "parseWithGemini()" | kind=code-symbol | source=Code.js:L357 | neighbors=[Code.js, checkNewLeadEmails(), buildSmartPropertyContext(), extractAddressFromSubject(), extractJson()] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@00578529a550a3f6a25dfa01ba630882f94b44f3": "0057852 chore(docs): scaffold matt-pocock agent skills config" | kind=Commit | source=git | neighbors=[feat/phase-28-sentinel-diet, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, f5ce15f fix(design): remove side-stripe…, b0bfd98 feat(tech-pwa): impeccable hard…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0d3aef2f5fd292e0f35b7451f07e0554b500f9ee": "0d3aef2 feat(phase-25): tighten Gmail polling to 5 min; backlog Gmail push trig…" | kind=Commit | source=git | neighbors=[feat/phase-28-sentinel-diet, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, bd6e5ba docs(phase-27): DashboardAPI Re…, f0c7865 docs(phase-25): cutover live — …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@111ab7254d8b74a22a8e0a17ed55f2ce1dc79746": "111ab72 feat: migrate email polling to n8n" | kind=Commit | source=git | neighbors=[chore/design-extract-artifacts, feat/phase-19-code-js-email-migration, Code.js, 22e0799 chore: remove design extract ar…, f64c4d3 feat(techpwa): stub doGet and d…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-017.json

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
