# Node Description Batch 15 of 49

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

- "commit:repo:github.com/linkstream-hub/central-command@7388cb332faaefae6f6a823c7175a998fbd209ea": "7388cb3 feat(phase-17): ESLint boundary, index.ts, DAL adapter, wire 3 routes t…" | kind=Commit | source=git | neighbors=[feat/phase-17-job-state-machine, route.ts, 1a3868e chore: post phase-17 diff for C…, route.ts, job-state-dal.ts, index.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@83553e319f577c610ed4f466caa12dfdb3b424b1": "83553e3 fix: complete Dispatch rebranding and enable tech comms in modal" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@85b437bb8f5c09138164732fec8723c19415663e": "85b437b fix(comms+views): Draft AI stakeholder-aware, sent message lane fix, te…" | kind=Commit | source=git | neighbors=[chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, a6b4fe7 docs(claude): session 60 → 61 h…, JobDetailModal.tsx, sandbox-store.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@9dbd74520786e7db75423357d3f0358a4a2de79a": "9dbd745 chore: remove unstable workflows to stop email noise" | kind=Commit | source=git | neighbors=[7758dc2 chore(ci): remove unused workfl…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@b0bfd9882ecb56103afa71092253b29f9c00e5a0": "b0bfd98 feat(tech-pwa): impeccable harden+polish pass on jobs surface" | kind=Commit | source=git | neighbors=[feat/phase-28-sentinel-diet, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 0057852 chore(docs): scaffold matt-poco…, JobQueueTable.tsx, en.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@b68e0b278e4129f39c34dd830cc7c50993de12ed": "b68e0b2 docs(claude): add permanent rules for AG task lists and SuperGravity/GS…" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@bc024ea14c5045dcc933a8effea8819f7b5e8295": "bc024ea fix(tests): resolve Playwright baseline — DISP-03/P3-4 mobile login fai…" | kind=Commit | source=git | neighbors=[7015339 chore: session close S124/S125 …, chore/s123-session-close, 1fe925e chore: session close S127 — Pla…, auth.spec.ts, phase2-verification.spec.ts, tech-pwa.spec.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c0f1a3e8e247d446d21a60c65bacc16ca0d30037": "c0f1a3e fix(email): revert replyTo to workorder@ — dispatch@ does not exist" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c3a55af7677888efb64625412e7aecf5e076c66d": "c3a55af fix(dispatch): semicolon delimiter for multi-tech + TechPWA compat" | kind=Commit | source=git | neighbors=[45da6f7 fix(dispatch): session 58 — DnD…, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, d68dc5f fix(dispatch): tech roster filt…, JobDetailModal.tsx] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d0b4b2f9fec104b74692cd5305e9387094e86670": "d0b4b2f fix(email): add dev guard to block Resend sends in local dev environment" | kind=Commit | source=git | neighbors=[18ddcf8 feat: implement Resend email se…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d0bf03fc1da492198343fd699126da8a762e45d4": "d0bf03f test(sprint4): Sprint 4 verification results" | kind=Commit | source=git | neighbors=[bf601b2 docs(claude): session 68 → 69 h…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d26a265c59468a4f5c0b8f9151e01c83a91a3708": "d26a265 feat(work-queue): unify status lifecycle, modernize triage UI, and rena…" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d70b43d4dc9c889a02e5fa21ede2558a5789e5ec": "d70b43d fix(dispatch): resolve remaining tsc errors for status normalization" | kind=Commit | source=git | neighbors=[4de928d fix(sandbox): remove unused var…, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, 94e3ccd fix(dispatch): session 58 — com…, JobDetailModal.tsx] | lang=en
- "dal_time_records": "time-records.ts" | kind=code-symbol | source=tech-pwa/src/lib/dal/time-records.ts:L1 | neighbors=[01bf641 Initial commit — clean history, timeRecordsRepository, compliance.ts, evaluateCACompliance(), ShiftDetails, db.ts] | lang=en
- "dashboard_commandpalette": "CommandPalette.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/CommandPalette.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, CommandPalette(), CommandPaletteProps, PRIORITY_COLOR, dashboard-api.ts, dashboardRequest()] | lang=en
- "dashboard_manualschedulemodal": "ManualScheduleModal.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualScheduleModal.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, DURATION_OPTIONS, ManualScheduleModal(), ManualScheduleModalProps, TIME_OPTIONS, dashboard-api.ts] | lang=en
- "dashboard_routeguard": "RouteGuard.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/RouteGuard.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, 11e9454 fix(auth): use user.email fallb…, e88aa19 Merge pull request #1167 from B…, DashboardLayout.tsx, RouteGuard(), TECH_ROUTES] | lang=en
- "dashboard_urgentqueuepanel": "UrgentQueuePanel.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/UrgentQueuePanel.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, 93afc14 feat(schedule): Phase 2 schedul…, a5382b6 feat(live): rebuild /live as th…, JobChip.tsx, JobChip(), UrgentQueuePanel()] | lang=en
- "e2e_tech_pwa_spec": "tech-pwa.spec.ts" | kind=code-symbol | source=tech-pwa/tests/e2e/tech-pwa.spec.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 9ad6303 feat(p1): Professional Infrastr…, a4dd6f5 Merge pull request #883 from BG…, bc024ea fix(tests): resolve Playwright …, c94407e Merge remote-tracking branch 'o…, d951fd6 chore: Playwright baseline — S1…] | lang=en
- "inbound_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/comms/inbound/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 1db6df5 feat(sprint6a): inbound reply a…, 6e3dab4 fix(ci): run Vercel CLI from ro…, 77a25b3 ci: touch inbound route to trig…, POST(), db.ts] | lang=en
- "lib_auth_getsession": "getSession()" | kind=code-symbol | source=tech-pwa/src/lib/auth.ts:L11 | neighbors=[page.tsx, page.tsx, page.tsx, page.tsx, page.tsx, auth.ts] | lang=en
- "lib_compliance": "compliance.ts" | kind=code-symbol | source=tech-pwa/src/lib/compliance.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4026492 feat: P1-3, P1-4, P1-6 completi…, c94407e Merge remote-tracking branch 'o…, time-records.ts, ComplianceStatus, evaluateCACompliance()] | lang=en
- "lib_dashboard_api_techstatus": "TechStatus" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L12 | neighbors=[ActivityFeed.tsx, JobDetailModal.tsx, ManualScheduleModal.tsx, SchedulePageComponents.tsx, TechCard.tsx, dashboard-api.ts] | lang=en
- "lib_permissions": "permissions.ts" | kind=code-symbol | source=tech-pwa/src/lib/permissions.ts:L1 | neighbors=[01bf641 Initial commit — clean history, AppSidebar.tsx, RouteGuard.tsx, defaultRoute(), hasAccess(), MODULE_ROUTES] | lang=en
- "list_employees_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/list-employees/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, db.ts, db] | lang=en
- "scripts_check_latest_jobs": "check-latest-jobs.ts" | kind=code-symbol | source=tech-pwa/scripts/check-latest-jobs.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, db.ts, db] | lang=en
- "scripts_cleanup_test_data": "cleanup-test-data.ts" | kind=code-symbol | source=tech-pwa/scripts/cleanup-test-data.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, db.ts, db] | lang=en
- "scripts_inspect_jane": "inspect-jane.ts" | kind=code-symbol | source=tech-pwa/scripts/inspect-jane.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, db.ts, db] | lang=en
- "scripts_list_employees": "list-employees.ts" | kind=code-symbol | source=tech-pwa/scripts/list-employees.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, db.ts, db] | lang=en
- "side_effects_event_bus_executor": "event-bus-executor.ts" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/event-bus-executor.ts:L1 | neighbors=[086dc4e feat(phase-18): event publishin…, 41b6a57 feat(job-update): Phase 18 even…, route.ts, index.ts, event-bus.ts, EventBus] | lang=en
- "side_effects_fake_executor": "fake-executor.ts" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/fake-executor.ts:L1 | neighbors=[086dc4e feat(phase-18): event publishin…, 1f387bc refactor(c1): extract JobUpdate…, 41b6a57 feat(job-update): Phase 18 even…, 5ad3849 feat(c1): implement JobUpdate d…, index.ts, FakeSideEffectExecutor] | lang=en
- "tests_detectlaphamform_test": "detectLaphamForm.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 2ea94d6 feat(phase-25): Parsing & Intak…, detectLaphamForm.ts, detectLaphamForm(), LaphamParseResult, fixtureDir] | lang=en
- "branch:repo:github.com/linkstream-hub/central-command#chore/lean-agent-stack": "chore/lean-agent-stack" | kind=Branch | source=git | neighbors=[01bf641 Initial commit — clean history, 3310fd7 Feat/phase 17 job state machine…, 43c9034 fix(ui): BottomNav — remove dea…, 515ed6c fix: remove every-minute Vercel…, 5d5026b chore: remove GSD from agent st…, 9c89835 chore: remove every-minute cron…] | lang=en
- "code_flagnewcontactsforreview": "flagNewContactsForReview()" | kind=code-symbol | source=Code.js:L973 | neighbors=[Code.js, checkNewLeadEmails(), getColumnValues(), isOfficeEmail(), isPropertyLevelAccessInfo(), normalizeAddressKey()] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1146671c625684e89982261d77b59fd81225151d": "1146671 chore(gas): cosmetic reformat DashboardAPI.gs — no functional changes" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@18582c448b36365eb458b442238c4c6ee393c952": "18582c4 ci: add Vercel CLI deploy workflow" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@2a9e7b5af4256602b79c1a16d0c06797d46dd785": "2a9e7b5 chore: resolve SESSION_STATE merge conflict — take remote" | kind=Commit | source=git | neighbors=[chore/phase-12-merge-sync, chore/v1.1-milestone-init, feat/phase-12-data-integrity-audit, fix/flag-gate-workflow-node, afebef9 docs(12): capture phase context…, d0db600 docs: start milestone v1.1 Neon…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@40a496b0c53a1b7fdd0ea88368e00e52ab8d5a10": "40a496b docs(claude): session 66 → 67 handoff" | kind=Commit | source=git | neighbors=[3e3f6ee merge(feat/neon-migration-phase…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@40eb7cf5c19bebcbdc5d37e175ff8e0789e1a451": "40eb7cf fix(api): expose Postgres cause in jobs/sync error + exclude system col…" | kind=Commit | source=git | neighbors=[docs/phase-a-intake-plan, feature/phase-23-lapham-integration, feature/phase-24-tech-roster, fix/email-intake-parse, main, 464b853 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@43f69fce9f72e2e61c2806f0dec0417784cbfcc4": "43f69fc test(sprint5): Sprint 5 verification results and branch diff" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-014.json

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
