# Node Description Batch 17 of 49

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

- "tests_import_test": "import.test.ts" | kind=code-symbol | source=tech-pwa/src/app/api/techs/import/__tests__/import.test.ts:L1 | neighbors=[6e48461 fix(techs): rewrite /api/techs/…, route.ts, db.ts, db, schema.ts, employees] | lang=en
- "unread_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/comms/unread/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, c6162cc feat(sprint6b): tenant response…, db.ts, db, schema.ts, commsMessages] | lang=en
- "branch:repo:github.com/linkstream-hub/central-command#fix/remove-leaked-html-file": "fix/remove-leaked-html-file" | kind=Branch | source=git | neighbors=[01bf641 Initial commit — clean history, 0d3dd7b chore: lean agent stack — remov…, 13bcd0e security: remove html.txt expor…, 1f387bc refactor(c1): extract JobUpdate…, 3310fd7 Feat/phase 17 job state machine…, 515ed6c fix: remove every-minute Vercel…] | lang=en
- "change_pin_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/change-pin/page.tsx:L1 | neighbors=[ChangePinPage(), auth.ts, getSession(), syncQueue.ts, apiCall(), 01bf641 Initial commit — clean history] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0c796f36f913ca987623b332ef889ec62d30f780": "0c796f3 fix(email-intake): fix 4 parse bugs, add tests (#10)" | kind=Commit | source=git | neighbors=[feature/phase-23-lapham-integration, feature/phase-24-tech-roster, main, 1ab58d4 fix(intake): rewire n8n workflo…, route.ts, gmail.webhook.post.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@200e8e1a5ebba9edfd605c6e07d4a0a8c4994a32": "200e8e1 fix(modal+weekly-schedule): null guard on comms fetch, fallback key for…" | kind=Commit | source=git | neighbors=[chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, 042746d docs(session62): Operations/Sch…, JobDetailModal.tsx, page.tsx] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@66e82833c1df527643d927af3154462d6fd67a31": "66e8283 fix(modal+sandbox): remove Draft AI, fix tech name mapping, fix sandbox…" | kind=Commit | source=git | neighbors=[chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, 200e8e1 fix(modal+weekly-schedule): nul…, JobDetailModal.tsx, sandbox-store.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@7780b6c25702b3f301aab31b35270aaee9e1e066": "7780b6c feat(s113): gap 2+4+5+6 — needs-review default, tech names, comms backf…" | kind=Commit | source=git | neighbors=[27ba28b chore(s113): ag_diff artifact, feat/s113-remediation, Code.js, f1c65b3 chore(s113): regenerate ag_diff…, JobDetailModal.tsx, page.tsx] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@811ec93aaa3c08713e2ddac54fa8b7079114dc47": "811ec93 fix(security): Remove dev-reset-pin route" | kind=Commit | source=git | neighbors=[chore/design-extract-artifacts, feat/phase-17-techpwa-cutover, feat/phase-18-techpwa-cutover-2, feat/phase-19-code-js-email-migration, f64c4d3 feat(techpwa): stub doGet and d…, test-sprint.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@898c6bcb93b09b8ee48040c205990793cfd0e195": "898c6bc fix(dispatch+docs): mailto cleanup, estimateNeeded rules, Date Received…" | kind=Commit | source=git | neighbors=[chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, Code.js, 85b437b fix(comms+views): Draft AI stak…, JobQueueTable.tsx] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d68dc5f72105f037dd76c10773a427c8a41b834c": "d68dc5f fix(dispatch): tech roster filter, grid dedup, selector label" | kind=Commit | source=git | neighbors=[c3a55af fix(dispatch): semicolon delimi…, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, c24ad4b docs(claude): session 58 → 59 h…, JobDetailModal.tsx] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@fd5f5b5881d85f92de164bd95e1e5736eed836b9": "fd5f5b5 chore: S163 verification results — auth+B3 confirmed, auto-deploy test" | kind=Commit | source=git | neighbors=[085b137 feat(phase-19): observability s…, docs/phase-a-intake-plan, feature/phase-23-lapham-integration, feature/phase-24-tech-roster, fix/email-intake-parse, main] | lang=en
- "compliance_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/field/compliance/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 154e47e feat(p3): DashboardAPI migratio…, 19786db chore(deps): bump lucide-react …, 7aa872a feat(p3-5): GAS bridge cleanup, 8aed599 feat(p3): DashboardAPI migratio…, af72cae feat(p3-5): GAS bridge cleanup …] | lang=en
- "dashboard_manualjobcreatemodal": "ManualJobCreateModal.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, ManualJobCreateModal(), ManualJobCreateModalProps, PRIORITIES, SERVICE_CATEGORIES, dashboard-api.ts] | lang=en
- "e2e_phase2_verification_spec": "phase2-verification.spec.ts" | kind=code-symbol | source=tech-pwa/tests/e2e/phase2-verification.spec.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 8133164 chore(s117): session close — Ph…, 93afc14 feat(schedule): Phase 2 schedul…, ba78a3a fix(pwa): GAP-05/01b/06/07/08 —…, bc024ea fix(tests): resolve Playwright …, d951fd6 chore: Playwright baseline — S1…] | lang=en
- "hooks_gsd_prompt_guard": "gsd-prompt-guard.js" | kind=code-symbol | source=.claude/hooks/gsd-prompt-guard.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, fs, INJECTION_PATTERNS, path] | lang=en
- "hooks_gsd_statusline_renderstatusline": "renderStatusline()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L540 | neighbors=[gsd-statusline.js, composeStatusline(), formatGsdState(), getConfigValue(), readGsdConfig(), readGsdState()] | lang=en
- "i18n_es": "es.ts" | kind=code-symbol | source=tech-pwa/src/lib/i18n/es.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, b0bfd98 feat(tech-pwa): impeccable hard…, en.ts, Messages, es] | lang=en
- "lib_gmail_client_getnewmessages": "getNewMessages()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L125 | neighbors=[gmail-client.ts, cleanEmailBody(), extractBody(), extractEmail(), getGmailClient(), getHeader()] | lang=en
- "lib_gmail_client_getthreadbymessageid": "getThreadByMessageId()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L224 | neighbors=[gmail-client.ts, cleanEmailBody(), extractBody(), extractEmail(), getGmailClient(), getHeader()] | lang=en
- "lib_location": "location.ts" | kind=code-symbol | source=tech-pwa/src/lib/location.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 7aa872a feat(p3-5): GAS bridge cleanup, af72cae feat(p3-5): GAS bridge cleanup …, page.tsx, calculateDistance(), Coords] | lang=en
- "lib_schema_commsmessages": "commsMessages" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L25 | neighbors=[seed.ts, route.ts, route.ts, schema.ts, analyze-wos.ts, route.ts] | lang=en
- "lib_types_jobstatus": "JobStatus" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L1 | neighbors=[DispatchTimelineBoard.tsx, KanbanBoard.tsx, job-update.ts, job-transitions.ts, types.ts, page.tsx] | lang=en
- "lib_wc_codes": "wc-codes.ts" | kind=code-symbol | source=tech-pwa/src/lib/wc-codes.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 4d7ba4d feat(phase-12): Neon-only cutov…, jobs.ts, resolveWCCode(), WC_CODES, WCTier] | lang=en
- "scripts_backfill_gmail_threads": "backfill-gmail-threads.ts" | kind=code-symbol | source=tech-pwa/scripts/backfill-gmail-threads.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, gmail-client.ts, getThreadByMessageId()] | lang=en
- "scripts_db_fix": "db-fix.ts" | kind=code-symbol | source=tech-pwa/scripts/db-fix.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, db, main()] | lang=en
- "suggesttechs_suggesttechsforjob": "suggestTechsForJob()" | kind=code-symbol | source=SuggestTechs.js:L44 | neighbors=[SuggestTechs.js, buildTechScores(), getInactiveTechNames(), getTechAvailability(), getTodayStr(), loadDurationDefaults()] | lang=en
- "app_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/page.tsx:L1 | neighbors=[IndexPage(), index.tsx, useTranslation(), auth.ts, getSession(), 01bf641 Initial commit — clean history] | lang=en
- "branch:repo:github.com/linkstream-hub/central-command#refactor/c1-job-update-module": "refactor/c1-job-update-module" | kind=Branch | source=git | neighbors=[01bf641 Initial commit — clean history, 3310fd7 Feat/phase 17 job state machine…, 4e08c33 test(c1): RED tests for JobUpda…, 515ed6c fix: remove every-minute Vercel…, 5ad3849 feat(c1): implement JobUpdate d…, 9c89835 chore: remove every-minute cron…] | lang=en
- "code_enrichfromlaphamdb": "enrichFromLaphamDb()" | kind=code-symbol | source=Code.js:L582 | neighbors=[Code.js, checkNewLeadEmails(), extractCodes(), extractEmail(), lookupByAddress(), normalizeAccessInfo()] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@042746d9ffbfe77c8cc37bc1a7849634414e865e": "042746d docs(session62): Operations/Schedule view specs + session 62 handoff" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, 1cce207 feat(operations): implement ope…, 200e8e1 fix(modal+weekly-schedule): nul…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@10dfe4103cbdf68f441315154f39233e8c169558": "10dfe41 fix(phase-20): resolve TypeScript errors blocking CI" | kind=Commit | source=git | neighbors=[feat/phase-20-auth-lint, ce35b66 fix(phase-20): fix remaining Ty…, DispatchTimelineBoard.tsx, actions.ts, job-update.ts, 17fd617 fix(lint): resolve all 41 ESLin…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1ab58d476f2cb772f57736cf26586824e059b679": "1ab58d4 fix(intake): rewire n8n workflow and fix auth header check" | kind=Commit | source=git | neighbors=[0c796f3 fix(email-intake): fix 4 parse …, feature/phase-23-lapham-integration, feature/phase-24-tech-roster, main, ac63333 fix(intake): change gemini mode…, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1ddb26d3b8df446032e4ad274507edaf183123b9": "1ddb26d fix(intake): type fix in fallback" | kind=Commit | source=git | neighbors=[feature/phase-23-lapham-integration, feature/phase-24-tech-roster, main, 70d0dfe fix(intake): revert model to 1.…, route.ts, 959aeb8 fix(intake): resolve syntax err…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@2e5166503ba7af2be94725ceba0de2b5feb0eb56": "2e51665 feat(28-02): corrected sentinel workflow + send-role push endpoint" | kind=Commit | source=git | neighbors=[feat/phase-28-sentinel-diet, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 2ec913a fix(28-02): use n8n Header Auth…, route.ts, e5978c8 docs(28-02): Wave 1 SUMMARY — c…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@43807eb2987e8c992d75245ac32730e1efc69049": "43807eb feat(intake): phase 23 lapham + access merge" | kind=Commit | source=git | neighbors=[feature/phase-23-lapham-integration, feature/phase-24-tech-roster, c8e6884 Merge pull request #11 from lin…, route.ts, gmail.webhook.post.test.ts, 4e0a127 chore: S163 close — B3 intake c…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@48540a0d0035837bea557b13041eabd78b66b08b": "48540a0 feat(schedule): lock-and-send API + schema migration + confirmation scr…" | kind=Commit | source=git | neighbors=[feat/schedule-redesign, 4a4b8b2 chore: sr-01-03 diff artifact, 0006_glossy_puck.sql, schema.ts, route.ts, 93afc14 feat(schedule): Phase 2 schedul…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@4de928d8831c2b01e4c589849cf5dfe7b711f736": "4de928d fix(sandbox): remove unused variable _a in updateJob" | kind=Commit | source=git | neighbors=[3fa40c1 docs(claude): complete session …, chore/s97-phase3-architecture-design, chore/s99-closeout, feat/p3-2-time-records-migration, d70b43d fix(dispatch): resolve remainin…, sandbox-store.ts] | lang=nl
- "commit:repo:github.com/linkstream-hub/central-command@4e0a1278ff39c6141b2aba53bf69a9969203a133": "4e0a127 chore: S163 close — B3 intake confirmed, n8n rewired, gemini-2.5-flash …" | kind=Commit | source=git | neighbors=[feature/phase-23-lapham-integration, feature/phase-24-tech-roster, main, 43807eb feat(intake): phase 23 lapham +…, 5d0ae0d feat(ui): phase 22 surgical fix…, e5eae6e fix(intake): use gemini-2.5-fla…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@555dc3050f4324e54bc281bb3b5ed4978a6c2986": "555dc30 fix(intake): use gemini-2.0-flash — 1.5-flash not found on v1beta with …" | kind=Commit | source=git | neighbors=[feature/phase-23-lapham-integration, feature/phase-24-tech-roster, main, 959aeb8 fix(intake): resolve syntax err…, route.ts, 5c0e55f fix(n8n): rewire phase-19 workf…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-016.json

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
