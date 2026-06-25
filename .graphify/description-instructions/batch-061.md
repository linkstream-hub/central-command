# Node Description Batch 62 of 412

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

- "commit:repo:github.com/linkstream-hub/central-command@46a2ab1db1edf5cb4b81ec3eb506882925e53faa": "46a2ab1 chore(s121): session close — sprint in progress, BLOCK on scout.md" | kind=Commit | source=git | neighbors=[feat/adw-flag-gate-and-hooks, cbb71da chore: remove temporary scripts, 4851c79 chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@484f039e454ae0bba3f7209b1956fa3b2b676af4": "484f039 fix(foundation-03): npm audit — pin serialize-javascript@7.0.5 via over…" | kind=Commit | source=git | neighbors=[239232d chore: update ag_diff.txt — pla…, feat/foundation-milestone, a79f3af feat(foundation-04): nightly E2…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4851c793123db5f6dffb869ee96e0a8e091d955e": "4851c79 chore: update diff artifact" | kind=Commit | source=git | neighbors=[0bc0eb6 fix(adw): scout.md model names …, feat/adw-flag-gate-and-hooks, 46a2ab1 chore(s121): session close — sp…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4a4b8b24d646a8a84145ba663b3e3dd4c0a01561": "4a4b8b2 chore: sr-01-03 diff artifact" | kind=Commit | source=git | neighbors=[48540a0 feat(schedule): lock-and-send A…, feat/schedule-redesign, ca1117e chore: test results for sr-01-03] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@4f26742f46804c788f85ad06e69b06152609971f": "4f26742 chore: close session S143 — Phase 16 branch ready, SESSION_STATE updated" | kind=Commit | source=git | neighbors=[feat/phase-16-execution, 59d38ba chore: stub handleLogin (Phase …, 7cd80e2 fix(15): GAS Phase A dead code …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@54e61d1b6ff1477a90431d965f9f0f75f467a685": "54e61d1 docs(01): create Phase 1 plan — archive-stale endpoint (QUEUE-01)" | kind=Commit | source=git | neighbors=[feat/s115-dispatch-flow, 7eece97 docs(01): plan Phase 1 — POST /…, c4f6ee0 docs(01): confirm Script Proper…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@564f49b06fc20693637753fc64e9956ebbda66a4": "564f49b chore(phase-18): add n8n event bus router and outbox poller workflows" | kind=Commit | source=git | neighbors=[feat/phase-18-event-publishing-seam, 1320e73 docs(phase-18): fix TDD order i…, 76c1b72 docs: add Codex frontend brief …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@58a2a3d394db1e21a3508f723b500dc55759afde": "58a2a3d docs(phase-18): update ADR-011 Discord→Resend, fix spec prereqs + TDD o…" | kind=Commit | source=git | neighbors=[feat/phase-18-event-publishing-seam, 143028e Merge branch 'refactor/c1-job-u…, 9fedb53 docs(phase-18): fix TDD order i…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@59d38bafdbaf1ab8a06d643b0bd40a6a7d93e84d": "59d38ba chore: stub handleLogin (Phase 16) | GAS v102" | kind=Commit | source=git | neighbors=[4f26742 chore: close session S143 — Pha…, feat/phase-16-execution, 54c3520 chore: close session S143 — Pha…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@5c547b5994b96235530007937f4d92815680d65e": "5c547b5 chore: ag_diff artifact for P2-3 review" | kind=Commit | source=git | neighbors=[feat/p2-3-meal-premium-calc, d1b04cc chore: resolve merge conflict, 744f294 feat(compliance): p2-3 meal pre…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@5d5026b8c4fc2e0cbdc1dff2bb2b2403b64485a6": "5d5026b chore: remove GSD from agent stack, purge archived skills, update docs" | kind=Commit | source=git | neighbors=[3310fd7 Feat/phase 17 job state machine…, chore/lean-agent-stack, 43c9034 fix(ui): BottomNav — remove dea…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6184db586e5c203e940ed0aba86960db0d41f93c": "6184db5 chore(s116): session state — S115 shipped, milestone v1.0 active, Code.…" | kind=Commit | source=git | neighbors=[5bddbe3 chore: remove e2e daily schedul…, feat/s115-dispatch-flow, ea64d34 chore: session close — Phase 1 …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@64760e1c8651077a27b7c48502e0c1abc63307b1": "64760e1 fix(drizzle): commit _journal.json alongside 0005_cloudy_nitro migration" | kind=Commit | source=git | neighbors=[feat/foundation-phases-9-11, 65edec3 Merge branch 'main' into feat/f…, 989514d fix(job-comments): add sheetsId…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@64c8c30851257acd3fbcff849279cf40fb9df038": "64c8c30 chore: update diff artifact" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, 88bbb61 fix(phase-19): correct off-by-o…, 9982767 fix(phase-19): complete Lapham …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@658624f4769c9064b4e7c720731f58a510c19854": "658624f chore(p3-2): regenerate diff artifact — include migration scripts" | kind=Commit | source=git | neighbors=[1bfef1d feat(p3-2): migration scripts —…, feat/p3-2-time-records-migration, 51b349c chore(p3-2): add test results a…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@65edec3173eb1387a5f7f380c571cf1620e6e5b8": "65edec3 Merge branch 'main' into feat/foundation-phase6-drizzle-fix" | kind=Commit | source=git | neighbors=[47a1530 chore: mark Phases 7+8 complete…, 64760e1 fix(drizzle): commit _journal.j…, feat/foundation-phases-9-11] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@664130ba194fa33c2a3370761ec15363f420b643": "664130b fix: n8n IF node and data source" | kind=Commit | source=git | neighbors=[22e0799 chore: remove design extract ar…, feat/phase-19-code-js-email-migration, e31990e chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6a24b518f00724e2ccf3bff4816158ac15eea6df": "6a24b51 chore: update diff artifact" | kind=Commit | source=git | neighbors=[feat/p2-2-compliance-activation, 0f8c6ee feat(p2-2): add compliance webh…, dfed67e chore: export n8n workflows - C…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@6c76106b5e3aa5b0f9cb02432fe51bd449b8f75a": "6c76106 chore: update ag_diff.txt — plan 04 (Gaps 5+7)" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 4209061 docs(s119): session close — Fou…, 6fc10e0 feat(foundation-07): Gap 7 — Ph…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6ead9d45977c41c03681c7ba2e0484b1eb248c8c": "6ead9d4 feat(foundation-04): Gap 4 — load_command(), model routing, --heavy fla…" | kind=Commit | source=git | neighbors=[1aef166 docs(planning): add Phase 1 con…, feat/foundation-milestone, da5964d chore: update ag_diff.txt — pla…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6f9a9726df735683f876c85864049d78d78075c6": "6f9a972 docs(11-02): add Railway n8n verification checklist for Phase 19 deploy…" | kind=Commit | source=git | neighbors=[0268497 docs(11-02): expand MANIFEST.js…, feat/phase-19-code-js-email-migration, b1f1740 docs(11-02): close plan — check…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6fc10e038a06772fdf2128b756af42241120656d": "6fc10e0 feat(foundation-07): Gap 7 — Phase 3.5 document sprint inserted into pt…" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 6c76106 chore: update ag_diff.txt — pla…, 839709a feat(foundation-05): Gap 5 — ad…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@7044d011742375f43a0976a6984afeb4b6c5d9a3": "7044d01 docs(03): create phase 3 gap remediation plans — 3 plans, 2 waves" | kind=Commit | source=git | neighbors=[chore/s117-session-close, 9b7c4e8 docs(03): plan Phase 3 Gap Reme…, 79ca7b3 docs(03): research phase gap-re…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@73e906cd462564b4b9df63df796827a7e2db46a0": "73e906c docs(phase-17): rewrite spec with current 6-state FSM design" | kind=Commit | source=git | neighbors=[feat/phase-17-job-state-machine, 7388cb3 feat(phase-17): ESLint boundary…, fd3727c chore: remove every-minute cron…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@744f294f9773597b927d191d19f2428e787dec7b": "744f294 feat(compliance): p2-3 meal premium calculation" | kind=Commit | source=git | neighbors=[feat/p2-3-meal-premium-calc, 5c547b5 chore: ag_diff artifact for P2-…, c0ff9a5 chore: S95 session closeout — S…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@79ca7b3f3c936ae4519b4713522d74c8423edb17": "79ca7b3 docs(03): research phase gap-remediation domain" | kind=Commit | source=git | neighbors=[chore/s117-session-close, 7044d01 docs(03): create phase 3 gap re…, 8133164 chore(s117): session close — Ph…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@7eece976240623ee4441440129d7cfe47002918e": "7eece97 docs(01): plan Phase 1 — POST /api/admin/archive-stale" | kind=Commit | source=git | neighbors=[54e61d1 docs(01): create Phase 1 plan —…, feat/s115-dispatch-flow, da39104 chore: add GSD skill permission…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@839709aeb26f5d140e9d61dca96588715379db91": "839709a feat(foundation-05): Gap 5 — adw_trigger_server.py FastAPI trigger serv…" | kind=Commit | source=git | neighbors=[1a045f7 feat(foundation-07): Gap 7 — do…, feat/foundation-milestone, 6fc10e0 feat(foundation-07): Gap 7 — Ph…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@87334beefaa192dbfc5c52e8e8f708d146faa540": "87334be chore: update diff artifact" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, d36fa0a chore: add codebase map to .pla…, cb90d57 fix(phase-19): replace googleGe…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@88bbb614a79054e4f7fd0c69f536b9192f1efd5e": "88bbb61 fix(phase-19): correct off-by-one in buildLaphamDb — n8n Sheets omits h…" | kind=Commit | source=git | neighbors=[64c8c30 chore: update diff artifact, feat/phase-19-code-js-email-migration, e1c991b chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@88daf1cec7b439a41ee77fd10645a1a97297466c": "88daf1c feat(foundation-01): Gap 8 — artifact dirs, hardlink compat (make_adw_i…" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 9e7d8c6 feat(foundation-01): Gap 1 — AD…, b3b27d2 chore(foundation-wave0): remove…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@8a5ced47aaf17acd822d0a1fe6e297398dde46d7": "8a5ced4 test(p2-2): manual webhook verification" | kind=Commit | source=git | neighbors=[feat/p2-2-compliance-activation, 929f690 test(p2-2): re-run playwright p…, f7bdc93 chore: update diff artifact] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@8a8a0af981c9986af9fea359f1c20e2dea50ad1e": "8a8a0af fix(adw): scout.md model names" | kind=Commit | source=git | neighbors=[feat/adw-flag-gate-and-hooks, 1f414b3 chore: update diff artifact, c0a3abf chore: update diff artifact] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@8f544ff6d68f3d195cb994d5e842b07dd2572018": "8f544ff docs(02): revise Phase 2 context — split verification protocol" | kind=Commit | source=git | neighbors=[42ca9f4 docs(02): capture Phase 2 conte…, chore/s117-session-close, 0f4d6d9 chore(phase2): create verificat…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@93ac5aecdd4a6a9eedd5a313f03cdb9a800268c0": "93ac5ae chore: update ag_diff.txt — plan 03 (Gaps 2+6)" | kind=Commit | source=git | neighbors=[0bbc4ce feat(foundation-02/06): Gap 2+6…, feat/foundation-milestone, 1a045f7 feat(foundation-07): Gap 7 — do…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@9514d0545d3984fd4b1a7beb0bb45e5e777e62e3": "9514d05 fix(tests): remove dead discord.com passthrough from event-bus test" | kind=Commit | source=git | neighbors=[8694875 fix(phase-18): sql encoding, re…, feat/phase-18-event-publishing-seam, event-bus.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@95ae854cdebf86238838b5041dfdd9b7ee5e43d1": "95ae854 test(foundation-wave0): scaffold 9 test files for ADW orchestrator gaps…" | kind=Commit | source=git | neighbors=[544c2c6 docs(phase1): revision 1 — Wave…, feat/foundation-milestone, b3b27d2 chore(foundation-wave0): remove…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@9982767fb0c42889dd1f55f87aa898613a780ec2": "9982767 fix(phase-19): complete Lapham extraction, property enrichment, and fix…" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, 64c8c30 chore: update diff artifact, e31990e chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@9b7c4e84c8eb4a02660f2100e5baa0439be79cc6": "9b7c4e8 docs(03): plan Phase 3 Gap Remediation — 3 plans, 2 waves" | kind=Commit | source=git | neighbors=[7044d01 docs(03): create phase 3 gap re…, chore/s117-session-close, d7815ab chore(s117): finalize STATE.md …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@9e7d8c6a8cbdd10f8a9d2f2df6d33efda5fd6f48": "9e7d8c6 feat(foundation-01): Gap 1 — ADWState class, adw_id generation, skip fl…" | kind=Commit | source=git | neighbors=[88daf1c feat(foundation-01): Gap 8 — ar…, feat/foundation-milestone, 239232d chore: update ag_diff.txt — pla…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-061.json

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
