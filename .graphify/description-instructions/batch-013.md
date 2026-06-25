# Node Description Batch 14 of 49

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

- "hooks_gsd_check_update_worker": "gsd-check-update-worker.js" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, { checkLatestVersion }, fs, { isSemverNewer }] | lang=en
- "lib_intake_processor": "intake-processor.ts" | kind=code-symbol | source=tech-pwa/src/lib/intake-processor.ts:L1 | neighbors=[01bf641 Initial commit — clean history, actions.ts, JobInsert, LeadInsert, processIntakePayload(), intake-schema.ts] | lang=en
- "lib_schema_timerecords": "timeRecords" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L216 | neighbors=[route.ts, route.ts, route.ts, time-records.ts, route.ts, route.ts] | lang=en
- "lib_tech_session": "tech-session.ts" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts:L1 | neighbors=[01bf641 Initial commit — clean history, e88aa19 Merge pull request #1167 from B…, f9ad92d fix(break): ShiftSession.record…, ClockedInBar.tsx, page.tsx, page.tsx] | lang=en
- "scripts_fix_tech_roster": "fix-tech-roster.ts" | kind=code-symbol | source=tech-pwa/scripts/fix-tech-roster.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, db.ts, db] | lang=en
- "scripts_test_sprint": "test-sprint.ts" | kind=code-symbol | source=tech-pwa/scripts/test-sprint.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 811ec93 fix(security): Remove dev-reset…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, db.ts, db] | lang=en
- "send_role_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/push/send-role/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 2e51665 feat(28-02): corrected sentinel…, 8fbeeb2 feat(phase-28): sentinel diet —…, db.ts, db, schema.ts] | lang=en
- "side_effects_email_executor": "email-executor.ts" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/email-executor.ts:L1 | neighbors=[086dc4e feat(phase-18): event publishin…, 1f387bc refactor(c1): extract JobUpdate…, 41b6a57 feat(job-update): Phase 18 even…, 5ad3849 feat(c1): implement JobUpdate d…, index.ts, email.ts] | lang=en
- "tests_job_transitions_test": "job-transitions.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/job-transitions.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 154e47e feat(p3): DashboardAPI migratio…, 19786db chore(deps): bump lucide-react …, 3f3710c feat(p2b): job transition unit …, 8aed599 feat(p3): DashboardAPI migratio…, c94407e Merge remote-tracking branch 'o…] | lang=en
- "access_sync_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/intake/access-sync/route.ts:L1 | neighbors=[POST(), access-codes.ts, computeAccessMerge(), extractCodes(), db.ts, db] | lang=en
- "archive_stale_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/admin/archive-stale/route.ts:L1 | neighbors=[POST(), db.ts, db, schema.ts, jobs, auth.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@18ddcf833fa6ee343357a50654b40e7bbb8b53fe": "18ddcf8 feat: implement Resend email sends for job status transitions" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@30f468fc8a232ead11ba07e5d40c98fef54734a4": "30f468f feat: implement Neon write routes for jobs (Phase 2 Sprint 1)" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@36249ad0a0cf254dbf6a3dd6a37f84a4301230f8": "36249ad feat(sprint4): server-side RtS→Scheduled auto-transition + targeted PAT…" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@7aa872a62f85123970b76d9487e25b127fa35f08": "7aa872a feat(p3-5): GAS bridge cleanup" | kind=Commit | source=git | neighbors=[feat/p3-5-gas-bridge-cleanup, b44b696 chore(p3-5): regenerate diff ar…, route.ts, route.ts, dashboard-api.ts, location.ts] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@83bb9650be0cb99bc9819a1b412b65f713b5e2be": "83bb965 feat(comms): Phase B - complete Comms Read Cutover with jobId intercept" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@93ca8ed01c0238b873e5f98a193de3d6aee1d5a6": "93ca8ed Merge branch 'main' of https://github.com/BGB-CRB-Holdings/central-comm…" | kind=Commit | source=git | neighbors=[0a1b1bc chore(foundation-05): export n8…, 3a41c48 chore: resolve ROADMAP merge co…, chore/phase-12-merge-sync, chore/s121-state-and-spec, chore/v1.1-milestone-init, feat/adw-flag-gate-and-hooks] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c11bef47439ce145e69b936840b8a7c12dda5a9b": "c11bef4 feat: implement professional HTML email templates and integrate automat…" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c9515b3179f7f450e871c88214156284c3a69eaa": "c9515b3 Merge branch 'feat/sprint4-workqueue-display'" | kind=Commit | source=git | neighbors=[9371349 chore(ci): make E2E manual-only…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f2302193b5d6e3b09092829e103d0a8fb657b40d": "f230219 fix(dispatch): status box click + PATCH API-key auth + Neon backfill sc…" | kind=Commit | source=git | neighbors=[46027b1 fix(dispatch): add jobId to all…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "dashboard_jobchip": "JobChip.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobChip.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, 93afc14 feat(schedule): Phase 2 schedul…, f5ce15f fix(design): remove side-stripe…, JobChip(), JobChipProps] | lang=en
- "dashboard_techrow": "TechRow.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechRow.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, 93afc14 feat(schedule): Phase 2 schedul…, ScheduleGrid.tsx, JobChip.tsx, JobChip(), getInitials()] | lang=en
- "design_extract_output_aptmaintenanceinc_com_motion_framer": "aptmaintenanceinc-com-motion.framer.js" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.framer.js:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, durations, easings] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_framer": "dispatch-aptmaintenanceinc-com-motion.framer.js" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.framer.js:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, durations, easings] | lang=en
- "e2e_scheduling_spec": "scheduling.spec.ts" | kind=code-symbol | source=tech-pwa/tests/e2e/scheduling.spec.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 304e1ae Merge pull request #99 from BGB…, 7b54d08 test(p3): Task 22 test sprint —…, 8731c27 Merge origin/main into feat/wor…, 93afc14 feat(schedule): Phase 2 schedul…, 9ad6303 feat(p1): Professional Infrastr…] | lang=en
- "history_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/history/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 154e47e feat(p3): DashboardAPI migratio…, 19786db chore(deps): bump lucide-react …, 8aed599 feat(p3): DashboardAPI migratio…, GET(), db.ts] | lang=en
- "hooks_gsd_read_injection_scanner": "gsd-read-injection-scanner.js" | kind=code-symbol | source=.claude/hooks/gsd-read-injection-scanner.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, ALL_PATTERNS, INJECTION_PATTERNS, isExcludedPath()] | lang=en
- "hooks_gsd_worktree_path_guard": "gsd-worktree-path-guard.js" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, fs, git(), nearestExistingDir()] | lang=en
- "hours_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/field/hours/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, bfb635a Merge pull request #1304 from B…, e40b17c feat(s115): complete remaining …, GET(), db.ts, db] | lang=en
- "i18n_en": "en.ts" | kind=code-symbol | source=tech-pwa/src/lib/i18n/en.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, b0bfd98 feat(tech-pwa): impeccable hard…, bfb635a Merge pull request #1304 from B…, e40b17c feat(s115): complete remaining …, en] | lang=en
- "lib_ratelimit": "rateLimit.ts" | kind=code-symbol | source=tech-pwa/src/lib/rateLimit.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4fa0199 Merge pull request #1003 from B…, 93afc14 feat(schedule): Phase 2 schedul…, bc024ea fix(tests): resolve Playwright …, d951fd6 chore: Playwright baseline — S1…, e69b48a feat: tier-2.5 security hardeni…] | lang=en
- "suggesttechs": "SuggestTechs.js" | kind=code-symbol | source=SuggestTechs.js:L1 | neighbors=[01bf641 Initial commit — clean history, 7cd80e2 fix(15): GAS Phase A dead code …, buildTechScores(), getInactiveTechNames(), getTechAvailability(), getTodayStr()] | lang=en
- "branch:repo:github.com/linkstream-hub/central-command#feat/phase-17-job-state-machine": "feat/phase-17-job-state-machine" | kind=Branch | source=git | neighbors=[01bf641 Initial commit — clean history, 1a3868e chore: post phase-17 diff for C…, 1e45239 feat(domain): add JobStateServi…, 702027a fix(ci): correct actions/checko…, 7388cb3 feat(phase-17): ESLint boundary…, 73e906c docs(phase-17): rewrite spec wi…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@03878ac86581a83e4ac235c54f845df5f9425bfc": "03878ac fix(dispatch): update suggestTechs payload signature to match backend" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@3e87d7480e3fa68cc29683c4544b238b4277d439": "3e87d74 chore(s121): Foundation Milestone closed — update state, add FLAG gate …" | kind=Commit | source=git | neighbors=[1a2c4c7 Merge branch 'main' of https://…, chore/phase-12-merge-sync, chore/s121-state-and-spec, chore/v1.1-milestone-init, feat/adw-flag-gate-and-hooks, feat/phase-12-data-integrity-audit] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4431b41fe0756f627c270dfc161a596ebd1e1cb7": "4431b41 feat(sprint4): type filter chips + assigned tech in work queue rows" | kind=Commit | source=git | neighbors=[36249ad feat(sprint4): server-side RtS→…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@44a3b590a053e9e95ed09f63fad936551a808aed": "44a3b59 fix(backfill): full-field PATCH coverage + comprehensive backfill script" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@45487d997add804609d1850950eb39b5aaaaee33": "45487d9 feat(dev): add dev write guard and amber mode banner" | kind=Commit | source=git | neighbors=[1cce207 feat(operations): implement ope…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@45da6f7efd70fc58e8864370df943906754cc1e2": "45da6f7 fix(dispatch): session 58 — DnD sourceType, multi-tech UI, draft AI, nu…" | kind=Commit | source=git | neighbors=[chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, c3a55af fix(dispatch): semicolon delimi…, JobDetailModal.tsx, JobQueueTable.tsx] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@706a717bbe47f834fd99a9150ae668f5c94d04d0": "706a717 refactor(ui): resolve JobDetailModal React warnings and unused variables" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-013.json

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
