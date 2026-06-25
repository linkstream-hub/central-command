# Node Description Batch 25 of 49

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
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

- "commit:repo:github.com/linkstream-hub/central-command@72eab455c7c143e9da0afc6073db9563dd1520e7": "72eab45 fix(lint): type generateObject return as z.infer<typeof jobSchema>" | kind=Commit | source=git | neighbors=[6e48461 fix(techs): rewrite /api/techs/…, feature/phase-24-tech-roster, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@73e906cd462564b4b9df63df796827a7e2db46a0": "73e906c docs(phase-17): rewrite spec with current 6-state FSM design" | kind=Commit | source=git | neighbors=[feat/phase-17-job-state-machine, 7388cb3 feat(phase-17): ESLint boundary…, fd3727c chore: remove every-minute cron…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@79ca7b3f3c936ae4519b4713522d74c8423edb17": "79ca7b3 docs(03): research phase gap-remediation domain" | kind=Commit | source=git | neighbors=[chore/s117-session-close, 7044d01 docs(03): create phase 3 gap re…, 8133164 chore(s117): session close — Ph…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@7eece976240623ee4441440129d7cfe47002918e": "7eece97 docs(01): plan Phase 1 — POST /api/admin/archive-stale" | kind=Commit | source=git | neighbors=[54e61d1 docs(01): create Phase 1 plan —…, feat/s115-dispatch-flow, da39104 chore: add GSD skill permission…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@839709aeb26f5d140e9d61dca96588715379db91": "839709a feat(foundation-05): Gap 5 — adw_trigger_server.py FastAPI trigger serv…" | kind=Commit | source=git | neighbors=[1a045f7 feat(foundation-07): Gap 7 — do…, feat/foundation-milestone, 6fc10e0 feat(foundation-07): Gap 7 — Ph…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@87334beefaa192dbfc5c52e8e8f708d146faa540": "87334be chore: update diff artifact" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, d36fa0a chore: add codebase map to .pla…, cb90d57 fix(phase-19): replace googleGe…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@88bbb614a79054e4f7fd0c69f536b9192f1efd5e": "88bbb61 fix(phase-19): correct off-by-one in buildLaphamDb — n8n Sheets omits h…" | kind=Commit | source=git | neighbors=[64c8c30 chore: update diff artifact, feat/phase-19-code-js-email-migration, e1c991b chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@88daf1cec7b439a41ee77fd10645a1a97297466c": "88daf1c feat(foundation-01): Gap 8 — artifact dirs, hardlink compat (make_adw_i…" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 9e7d8c6 feat(foundation-01): Gap 1 — AD…, b3b27d2 chore(foundation-wave0): remove…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@8a8a0af981c9986af9fea359f1c20e2dea50ad1e": "8a8a0af fix(adw): scout.md model names" | kind=Commit | source=git | neighbors=[feat/adw-flag-gate-and-hooks, 1f414b3 chore: update diff artifact, c0a3abf chore: update diff artifact] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@8f544ff6d68f3d195cb994d5e842b07dd2572018": "8f544ff docs(02): revise Phase 2 context — split verification protocol" | kind=Commit | source=git | neighbors=[42ca9f4 docs(02): capture Phase 2 conte…, chore/s117-session-close, 0f4d6d9 chore(phase2): create verificat…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@93ac5aecdd4a6a9eedd5a313f03cdb9a800268c0": "93ac5ae chore: update ag_diff.txt — plan 03 (Gaps 2+6)" | kind=Commit | source=git | neighbors=[0bbc4ce feat(foundation-02/06): Gap 2+6…, feat/foundation-milestone, 1a045f7 feat(foundation-07): Gap 7 — do…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@9514d0545d3984fd4b1a7beb0bb45e5e777e62e3": "9514d05 fix(tests): remove dead discord.com passthrough from event-bus test" | kind=Commit | source=git | neighbors=[8694875 fix(phase-18): sql encoding, re…, feat/phase-18-event-publishing-seam, event-bus.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@95ae854cdebf86238838b5041dfdd9b7ee5e43d1": "95ae854 test(foundation-wave0): scaffold 9 test files for ADW orchestrator gaps…" | kind=Commit | source=git | neighbors=[544c2c6 docs(phase1): revision 1 — Wave…, feat/foundation-milestone, b3b27d2 chore(foundation-wave0): remove…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@9982767fb0c42889dd1f55f87aa898613a780ec2": "9982767 fix(phase-19): complete Lapham extraction, property enrichment, and fix…" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, 64c8c30 chore: update diff artifact, e31990e chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@9b7c4e84c8eb4a02660f2100e5baa0439be79cc6": "9b7c4e8 docs(03): plan Phase 3 Gap Remediation — 3 plans, 2 waves" | kind=Commit | source=git | neighbors=[7044d01 docs(03): create phase 3 gap re…, chore/s117-session-close, d7815ab chore(s117): finalize STATE.md …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@9e7d8c6a8cbdd10f8a9d2f2df6d33efda5fd6f48": "9e7d8c6 feat(foundation-01): Gap 1 — ADWState class, adw_id generation, skip fl…" | kind=Commit | source=git | neighbors=[88daf1c feat(foundation-01): Gap 8 — ar…, feat/foundation-milestone, 239232d chore: update ag_diff.txt — pla…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@a157981ea1cce6da35e8463fd8c7f5d80b321760": "a157981 docs(11-01): write header, executive summary, P0 items, and GAS module …" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, e4d35f3 docs(11-01): append Next.js rou…, ab7d33d docs(11): create phase plan] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@a167e586ad6ff070cbcecc01925525c695b4d5d2": "a167e58 docs(11): phase research" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, c460832 docs(11): create phase plan, bd3fa62 docs(11): capture phase context] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@a30bf2f88ad9df66ae9ada89610fc57add7ad79d": "a30bf2f chore(p3-5): regenerate diff artifact — single commit above main" | kind=Commit | source=git | neighbors=[feat/p3-5-gas-bridge-cleanup, 0d026cf chore(p3-5): regenerate diff ar…, b44b696 chore(p3-5): regenerate diff ar…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@a49ddb6ee3004167cf6e36a95e19f21ae021257a": "a49ddb6 chore(s113): task 8 test results artifact" | kind=Commit | source=git | neighbors=[feat/s113-remediation, d7970a0 test(s113): document browser ve…, f1c65b3 chore(s113): regenerate ag_diff…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@a6881a9e13a334ea0d18f7dc2755b4c1b4472d06": "a6881a9 docs(phase-18): update ADR-011 Discord→Resend, fix spec prereqs + TDD o…" | kind=Commit | source=git | neighbors=[1320e73 docs(phase-18): fix TDD order i…, feat/phase-18-event-publishing-seam, 958611a test(c1): RED tests for JobUpda…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@a79f3afffa5b673e82bdcfa9698a1e4b44fc5078": "a79f3af feat(foundation-04): nightly E2E cron — Playwright regression on schedu…" | kind=Commit | source=git | neighbors=[484f039 fix(foundation-03): npm audit —…, feat/foundation-milestone, 05e78c5 fix(foundation-01): touch diff …] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@ab7d33d500e7293e29421d5d6a003a549678ecd6": "ab7d33d docs(11): create phase plan" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, a157981 docs(11-01): write header, exec…, c460832 docs(11): create phase plan] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@b1606b168d4c5c319247ba0a2aafc5d01a5611a7": "b1606b1 chore(s104): session closeout — P3-5 complete, Tier 2.5 agenda queued" | kind=Commit | source=git | neighbors=[af72cae feat(p3-5): GAS bridge cleanup …, chore/s104-session-closeout, 029d955 chore(s104): allow gh pr comman…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@b1f174010ada720a82423dc207b4851ef95aba79": "b1f1740 docs(11-02): close plan — checkpoint deferred per strategic direction" | kind=Commit | source=git | neighbors=[6f9a972 docs(11-02): add Railway n8n ve…, feat/phase-19-code-js-email-migration, 261857b docs(12): add plans 04 and 05 —…] | lang=it
- "commit:repo:github.com/linkstream-hub/central-command@b30038ad795b46a640b1bd438926781bc21a3428": "b30038a fix(phase-19): update n8n credential types to googleOAuth2Api" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, 2873c89 chore: update diff artifact, dd2d2db chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@b3b27d21e7af8936a42c190186a70955fa54104b": "b3b27d2 chore(foundation-wave0): remove committed __pycache__, add to .gitignore" | kind=Commit | source=git | neighbors=[95ae854 test(foundation-wave0): scaffol…, feat/foundation-milestone, 88daf1c feat(foundation-01): Gap 8 — ar…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@b44b69605859ed81cfd64275e35399c01ce1a786": "b44b696 chore(p3-5): regenerate diff artifact — single commit above main" | kind=Commit | source=git | neighbors=[7aa872a feat(p3-5): GAS bridge cleanup, feat/p3-5-gas-bridge-cleanup, a30bf2f chore(p3-5): regenerate diff ar…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@b72755efac6a90299aed8740c3ac58f9f30d41c3": "b72755e chore(s112-closeout): SESSION_STATE handoff for S113 — system live, rem…" | kind=Commit | source=git | neighbors=[449f497 fix(ci): fix error-code check a…, feat/go-live-validation, 52a6a9c Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@bd3fa62c69b6dcd64f3f8452659b54c02e449f86": "bd3fa62 docs(11): capture phase context" | kind=Commit | source=git | neighbors=[462d3fc docs: remap codebase (7 docs vi…, feat/phase-19-code-js-email-migration, a167e58 docs(11): phase research] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c0a3abf871e519c56aadf18ddeebb441551b5339": "c0a3abf chore: update diff artifact" | kind=Commit | source=git | neighbors=[feat/adw-flag-gate-and-hooks, 8a8a0af fix(adw): scout.md model names, ff093f6 feat(adw): flag gate, hooks, an…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@c4608329e1a174eedf03c4aac742fd57bcdb8b02": "c460832 docs(11): create phase plan" | kind=Commit | source=git | neighbors=[a167e58 docs(11): phase research, feat/phase-19-code-js-email-migration, ab7d33d docs(11): create phase plan] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c4f6ee0992d94487e41bc5e5360d5e3b1958c92c": "c4f6ee0 docs(01): confirm Script Properties set — shadow-write is live" | kind=Commit | source=git | neighbors=[feat/s115-dispatch-flow, 54e61d1 docs(01): create Phase 1 plan —…, f33d302 docs(01): capture Phase 1 conte…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ca1117ea120952af3a25347ef94bc8ad573eff28": "ca1117e chore: test results for sr-01-03" | kind=Commit | source=git | neighbors=[4a4b8b2 chore: sr-01-03 diff artifact, feat/schedule-redesign, b52653d fix(ci): prefer-const phoneMap …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@cb90d57366dd4562b94c51435f7ef1aedcb81030": "cb90d57 fix(phase-19): replace googleGemini stub with httpRequest + parse nodes" | kind=Commit | source=git | neighbors=[2873c89 chore: update diff artifact, feat/phase-19-code-js-email-migration, 87334be chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@cbb71dad7b3777f9c3fc9dc831956b3d328ef1a0": "cbb71da chore: remove temporary scripts" | kind=Commit | source=git | neighbors=[46a2ab1 chore(s121): session close — sp…, feat/adw-flag-gate-and-hooks, ff5a2d5 fix(hooks): correct escape sequ…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@cf28a3de72e71ffc1a040cf38cc660aff3f9d65c": "cf28a3d feat(foundation-02): context_bundle_builder hook — session persistence …" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 1aef166 docs(planning): add Phase 1 con…, f0860f6 feat(foundation-03): Gap 3 — ad…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@d1440d977db4ae4edc72559deb9402448c09d90a": "d1440d9 fix(api): expose Postgres cause in jobs/sync error + exclude system col…" | kind=Commit | source=git | neighbors=[4ec6397 feat(phase-20): ESLint auth bou…, fix/jobs-sync-expose-cause, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d2e780d5dbc0fee741da390394c6698f242ff2b4": "d2e780d feat(phase-19): observability spec — n8n error workflow wired to PTOW E…" | kind=Commit | source=git | neighbors=[086dc4e feat(phase-18): event publishin…, feat/phase-19-observability, 99bb1ec fix(ci): remove path filter — r…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d36fa0a014d9aaefbd80d7924e1c232f2bafd839": "d36fa0a chore: add codebase map to .planning/codebase/ (7 docs via gsd-map-code…" | kind=Commit | source=git | neighbors=[87334be chore: update diff artifact, feat/phase-19-code-js-email-migration, 462d3fc docs: remap codebase (7 docs vi…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-024.json

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
