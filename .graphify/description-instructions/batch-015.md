# Node Description Batch 16 of 49

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

- "commit:repo:github.com/linkstream-hub/central-command@4484e419f32feaa39baa005bc0f00e91a823c89d": "4484e41 docs+fix(session63): session 64 handoff, DashboardAPI v37 timecard func…" | kind=Commit | source=git | neighbors=[03878ac fix(dispatch): update suggestTe…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@52a6a9cec94e648812d3289a9bb97e473551c79f": "52a6a9c Merge branch 'main' of https://github.com/BGB-CRB-Holdings/central-comm…" | kind=Commit | source=git | neighbors=[feat/go-live-validation, Code.js, route.ts, gmail-client.ts, route.ts, route.ts] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@5ad3849ae8c26592b5189d33995d03ffd8fe4012": "5ad3849 feat(c1): implement JobUpdate deep module — PATCH route shrinks to 15 l…" | kind=Commit | source=git | neighbors=[4e08c33 test(c1): RED tests for JobUpda…, refactor/c1-job-update-module, job-update.ts, route.ts, email-executor.ts, fake-executor.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6043914fca2745d25b1ff048b56c09d33ced8671": "6043914 ci: add Vercel CLI deploy workflow" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6c90df189e3eb764ecda2780e2c2a0030be7aa9a": "6c90df1 chore(ci): strip issue-creation noise, add lean PR check" | kind=Commit | source=git | neighbors=[45cd253 merge(feat/ui-issues-backlog): …, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6d55fde786a0f1417bc21be95d550987fef7cc5c": "6d55fde ci: add next build step to CI + tighten test sprint standards in CLAUDE…" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@7758dc25c4fbe371780ccb40e2724f357b59c058": "7758dc2 chore(ci): remove unused workflows, cut weekly E2E schedule" | kind=Commit | source=git | neighbors=[72a4316 feat(ui): implement UI backlog …, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@7b5002e1f9a55fc446aefe0e88ee7a067d414c08": "7b5002e cleanup: remove legacy FieldStatus component" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@8623ac4a7ebee54ffb5fa0c36a2bdca5157a042d": "8623ac4 docs: enforce professional grade workflow rules and artifact timing" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@937134949d8a3b15fc3d726af1094d24cd88b760": "9371349 chore(ci): make E2E manual-only — was burning free Actions minutes on e…" | kind=Commit | source=git | neighbors=[36249ad feat(sprint4): server-side RtS→…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@94e3ccdfae1a91e5b94c1a2755749b5f56cb9c57": "94e3ccd fix(dispatch): session 58 — comms lane routing + tech assignment crash" | kind=Commit | source=git | neighbors=[chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, 45da6f7 fix(dispatch): session 58 — DnD…, jobs.ts, SchedulingDispatch.tsx] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@98189a28a94849a881c47ae67388a916768aab6d": "98189a2 docs(claude): session 67 → 68 handoff" | kind=Commit | source=git | neighbors=[7b5002e cleanup: remove legacy FieldSta…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@a1a262d49a429cc319d8da2b087580dfa855e220": "a1a262d ci: add next build step to CI + tighten test sprint standards in CLAUDE…" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@bb3192a4c6576ada8338eeb763df75d53df78528": "bb3192a chore: update GitHub remote to BGB-CRB-Holdings org" | kind=Commit | source=git | neighbors=[a1a262d ci: add next build step to CI +…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@bf601b2f63fbcbc0b650b0041cd357a5c402c048": "bf601b2 docs(claude): session 68 → 69 handoff" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration, feat/p3-5-gas-bridge-cleanup] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@cd240efb3782bb9d63f08545681abcdddc6c45b7": "cd240ef chore(neon): remove accidental test route, keeping Phase 1 scope to SDK…" | kind=Commit | source=git | neighbors=[8d4fa7b feat(neon): implement Phase 1 m…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@de3ae2f5bfc55cb015d3569dcc78bc8ba84feca5": "de3ae2f chore(ci): make E2E manual-only — was burning free Actions minutes on e…" | kind=Commit | source=git | neighbors=[4431b41 feat(sprint4): type filter chip…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@fe2aac983a80a10024311e1c90709ea7e2826f8f": "fe2aac9 feat: implement Neon-first PAGA meal premium automation and audit trail" | kind=Commit | source=git | neighbors=[e61f88a fix(security+team): server-side…, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, 898c6bc fix(dispatch+docs): mailto clea…, sandbox-store.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@feb17e58e78a266183c3f20629dadabd42d866ba": "feb17e5 chore: update GitHub remote to BGB-CRB-Holdings org" | kind=Commit | source=git | neighbors=[18582c4 ci: add Vercel CLI deploy workf…, chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/hotfix-archive-neon, feat/p3-2-time-records-migration] | lang=en
- "compliance_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/compliance/page.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, c6162cc feat(sprint6b): tenant response…, ComplianceData, CompliancePage(), TimeRecord, DashboardLayout.tsx] | lang=en
- "components_bottomnav": "BottomNav.tsx" | kind=code-symbol | source=tech-pwa/src/components/BottomNav.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, 0d3dd7b chore: lean agent stack — remov…, 43c9034 fix(ui): BottomNav — remove dea…, 77b7505 feat(mobile): job list redesign…, 936c6ef Merge pull request #2083 from B…, BottomNav()] | lang=en
- "components_cameraupload": "CameraUpload.tsx" | kind=code-symbol | source=tech-pwa/src/components/CameraUpload.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, CameraUpload(), CameraUploadProps, index.tsx, useTranslation(), syncQueue.ts] | lang=en
- "dal_techs": "techs.ts" | kind=code-symbol | source=tech-pwa/src/lib/dal/techs.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4d7ba4d feat(phase-12): Neon-only cutov…, d7eb645 feat(p3-1): schema foundation —…, techsRepository, db.ts, db] | lang=en
- "design_extract_output_aptmaintenanceinc_com_anatomy": "aptmaintenanceinc-com-anatomy.tsx" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-anatomy.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, Button(), ButtonProps] | lang=en
- "e2e_accessibility_spec": "accessibility.spec.ts" | kind=code-symbol | source=tech-pwa/tests/e2e/accessibility.spec.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 9ad6303 feat(p1): Professional Infrastr…, c94407e Merge remote-tracking branch 'o…, PAGES_DISPATCH, PAGES_TECH_PWA, auth.ts] | lang=en
- "exec_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, GET(), guardProduction(), handleGet(), handlePost(), MOCK_JOBS] | lang=en
- "feedback_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/feedback/page.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, c6162cc feat(sprint6b): tenant response…, DashboardLayout.tsx, AdminControlPanel(), FeedbackPage(), dashboard-api.ts] | lang=en
- "hooks_gsd_context_monitor": "gsd-context-monitor.js" | kind=code-symbol | source=.claude/hooks/gsd-context-monitor.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, fs, os, path] | lang=en
- "i18n_index_usetranslation": "useTranslation()" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L76 | neighbors=[page.tsx, page.tsx, CameraUpload.tsx, ClockedInBar.tsx, index.tsx, page.tsx] | lang=en
- "lib_access_codes": "access-codes.ts" | kind=code-symbol | source=tech-pwa/src/lib/access-codes.ts:L1 | neighbors=[route.ts, 01bf641 Initial commit — clean history, 2ea94d6 feat(phase-25): Parsing & Intak…, route.ts, AccessMergeResult, computeAccessMerge()] | lang=en
- "lib_detectlaphamform": "detectLaphamForm.ts" | kind=code-symbol | source=tech-pwa/src/lib/detectLaphamForm.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 2ea94d6 feat(phase-25): Parsing & Intak…, route.ts, detectLaphamForm(), LaphamParseResult, normalizeAddressKey.ts] | lang=en
- "lib_git_cmd": "git-cmd.js" | kind=code-symbol | source=.claude/hooks/lib/git-cmd.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, ARGUMENT_TAKING_FLAGS, BOOLEAN_FLAGS, isGitSubcommand()] | lang=en
- "lib_intake_schema": "intake-schema.ts" | kind=code-symbol | source=tech-pwa/src/lib/intake-schema.ts:L1 | neighbors=[01bf641 Initial commit — clean history, actions.ts, intake-processor.ts, IntakeFormData, intakeSchema, leadSchema] | lang=en
- "lib_syncqueue_apicall": "apiCall()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L99 | neighbors=[page.tsx, CameraUpload.tsx, ClockedInBar.tsx, page.tsx, page.tsx, syncQueue.ts] | lang=en
- "properties_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/properties/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 8da5bea chore(scaffold): add design sys…, 8fbeeb2 feat(phase-28): sentinel diet —…, db.ts, db, schema.ts] | lang=en
- "scripts_query_neon": "query-neon.ts" | kind=code-symbol | source=tech-pwa/scripts/query-neon.ts:L1 | neighbors=[01bf641 Initial commit — clean history, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, db.ts, db, schema.ts] | lang=en
- "side_effects_index": "index.ts" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/index.ts:L1 | neighbors=[086dc4e feat(phase-18): event publishin…, 41b6a57 feat(job-update): Phase 18 even…, job-update.ts, email-executor.ts, event-bus-executor.ts, fake-executor.ts] | lang=en
- "tech_pwa_eslint_config": "eslint.config.mjs" | kind=code-symbol | source=tech-pwa/eslint.config.mjs:L1 | neighbors=[01bf641 Initial commit — clean history, 17fd617 fix(lint): resolve all 41 ESLin…, 3310fd7 Feat/phase 17 job state machine…, 464b853 Merge branch 'main' of https://…, 4ec6397 feat(phase-20): ESLint auth bou…, 7388cb3 feat(phase-17): ESLint boundary…] | lang=en
- "tech_pwa_smoke": "smoke.ts" | kind=code-symbol | source=tech-pwa/smoke.ts:L1 | neighbors=[01bf641 Initial commit — clean history, mappers.ts, computeDashboardStats(), db.ts, db, schema.ts] | lang=en
- "tests_compliance_test": "compliance.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/compliance.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4026492 feat: P1-3, P1-4, P1-6 completi…, c94407e Merge remote-tracking branch 'o…, compliance.ts, evaluateCACompliance(), hoursAfter()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-015.json

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
