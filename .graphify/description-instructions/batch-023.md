# Node Description Batch 24 of 49

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

- "commit:repo:github.com/linkstream-hub/central-command@0bbc4ceb8d4de9162b49428de1cfe54a6f47750e": "0bbc4ce feat(foundation-02/06): Gap 2+6 — worktree lifecycle in main(), hard ph…" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 93ac5ae chore: update ag_diff.txt — pla…, da5964d chore: update ag_diff.txt — pla…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0bc0eb62c60190a27578d24976ec9cc63b2a7fcc": "0bc0eb6 fix(adw): scout.md model names and add manual n8n flag-gate workflow" | kind=Commit | source=git | neighbors=[feat/adw-flag-gate-and-hooks, 4851c79 chore: update diff artifact, 1f414b3 chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0d026cf443cfc2de21764f37328d0c6877b15966": "0d026cf chore(p3-5): regenerate diff artifact — single commit above main" | kind=Commit | source=git | neighbors=[feat/p3-5-gas-bridge-cleanup, e0dd250 chore(p3-5): add test results, a30bf2f chore(p3-5): regenerate diff ar…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0f4d6d94c41694a08bc918c9fad25fb747cbc668": "0f4d6d9 chore(phase2): create verification artifact template + PLAN.md" | kind=Commit | source=git | neighbors=[chore/s117-session-close, 2572de2 docs(phase2): close verificatio…, 8f544ff docs(02): revise Phase 2 contex…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1320e732a843d8fa222c7d40b6c397eb8219f36c": "1320e73 docs(phase-18): fix TDD order in spec, mark n8n workflows pre-built" | kind=Commit | source=git | neighbors=[feat/phase-18-event-publishing-seam, a6881a9 docs(phase-18): update ADR-011 …, 564f49b chore(phase-18): add n8n event …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@19de58c7d349d7a72e9510fc12914e952ed69496": "19de58c chore(p3-2): add P3-2 execution spec — time records migration" | kind=Commit | source=git | neighbors=[feat/p3-2-time-records-migration, 336c3c3 chore(p3-2): add diff artifact …, 4cca515 chore: S99 session closeout — P…] | lang=nl
- "commit:repo:github.com/linkstream-hub/central-command@19ec6a8f41643142d3014509c7e9de225bac2c55": "19ec6a8 fix(phase-19): remove id from n8n credentials" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, dd2d2db chore: update diff artifact, e1c991b chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1a045f74605777e6ba607797c8dc94ddcf427a96": "1a045f7 feat(foundation-07): Gap 7 — document.md command, adw_document_iso.py s…" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 839709a feat(foundation-05): Gap 5 — ad…, 93ac5ae chore: update ag_diff.txt — pla…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@1a3868e6a0dfd7870f6a8abca22dc5016be42cae": "1a3868e chore: post phase-17 diff for Claude Code review" | kind=Commit | source=git | neighbors=[feat/phase-17-job-state-machine, c5c1cfd fix(api): prevent db.update emp…, 7388cb3 feat(phase-17): ESLint boundary…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1aef166a6ed4fa0f87cb67f4cc6f48f06c228fcc": "1aef166 docs(planning): add Phase 1 context, Wave 0 summary, archive v1.0 miles…" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 6ead9d4 feat(foundation-04): Gap 4 — lo…, cf28a3d feat(foundation-02): context_bu…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1f414b30982c7ba3ab2d6bf00d1049bd349c4fe9": "1f414b3 chore: update diff artifact" | kind=Commit | source=git | neighbors=[feat/adw-flag-gate-and-hooks, 0bc0eb6 fix(adw): scout.md model names …, 8a8a0af fix(adw): scout.md model names] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1fe925e8e85da775c437edaf16a768e951ce8379": "1fe925e chore: session close S127 — Playwright baseline complete, drive migrati…" | kind=Commit | source=git | neighbors=[chore/s123-session-close, 7db2a9c wip: phase-16 paused at invento…, bc024ea fix(tests): resolve Playwright …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@239232d7962208a8a15800da1a3b40bf2018076a": "239232d chore: update ag_diff.txt — plan 01 (Gaps 1+8)" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 484f039 fix(foundation-03): npm audit —…, 9e7d8c6 feat(foundation-01): Gap 1 — AD…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@2572de22f83fa4e062af095aa9727f3ce23420ed": "2572de2 docs(phase2): close verification — 3 pass, 4 fail/blocked, 9 gaps" | kind=Commit | source=git | neighbors=[0f4d6d9 chore(phase2): create verificat…, chore/s117-session-close, 8133164 chore(s117): session close — Ph…] | lang=nl
- "commit:repo:github.com/linkstream-hub/central-command@27ba28bc1e5d60a282816e3993e85c9e45adeb8e": "27ba28b chore(s113): ag_diff artifact" | kind=Commit | source=git | neighbors=[feat/s113-remediation, 7780b6c feat(s113): gap 2+4+5+6 — needs…, e88aa19 Merge pull request #1167 from B…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@2873c8924b94d4818d3e76b9f3bd040d8b6924f6": "2873c89 chore: update diff artifact" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, cb90d57 fix(phase-19): replace googleGe…, b30038a fix(phase-19): update n8n crede…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@336c3c336c65d815a6cb47e5769dcc4486c886b9": "336c3c3 chore(p3-2): add diff artifact for review" | kind=Commit | source=git | neighbors=[19de58c chore(p3-2): add P3-2 execution…, feat/p3-2-time-records-migration, 1bfef1d feat(p3-2): migration scripts —…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@42ca9f4c2e60db9b9a87c9bfb2c5e62d06b32e0f": "42ca9f4 docs(02): capture Phase 2 context — Core Loop Verification" | kind=Commit | source=git | neighbors=[chore/s117-session-close, 8f544ff docs(02): revise Phase 2 contex…, 98768e5 chore(s117): session close — Ph…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@448bb95be6899473d8a027a07d34bcb702eb4bf0": "448bb95 chore: dispatch dashboard diff artifact" | kind=Commit | source=git | neighbors=[claude/plan-dispatch-dashboard-BX4AV, 1a1e686 chore: update settings allowlist, a5382b6 feat(live): rebuild /live as th…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@462d3fccbc3c92a270f60e8567eac11d911e71b2": "462d3fc docs: remap codebase (7 docs via gsd-map-codebase refresh 2026-06-09)" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, bd3fa62 docs(11): capture phase context, d36fa0a chore: add codebase map to .pla…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@46a2ab1db1edf5cb4b81ec3eb506882925e53faa": "46a2ab1 chore(s121): session close — sprint in progress, BLOCK on scout.md" | kind=Commit | source=git | neighbors=[feat/adw-flag-gate-and-hooks, cbb71da chore: remove temporary scripts, 4851c79 chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@484f039e454ae0bba3f7209b1956fa3b2b676af4": "484f039 fix(foundation-03): npm audit — pin serialize-javascript@7.0.5 via over…" | kind=Commit | source=git | neighbors=[239232d chore: update ag_diff.txt — pla…, feat/foundation-milestone, a79f3af feat(foundation-04): nightly E2…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4851c793123db5f6dffb869ee96e0a8e091d955e": "4851c79 chore: update diff artifact" | kind=Commit | source=git | neighbors=[0bc0eb6 fix(adw): scout.md model names …, feat/adw-flag-gate-and-hooks, 46a2ab1 chore(s121): session close — sp…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4a4b8b24d646a8a84145ba663b3e3dd4c0a01561": "4a4b8b2 chore: sr-01-03 diff artifact" | kind=Commit | source=git | neighbors=[48540a0 feat(schedule): lock-and-send A…, feat/schedule-redesign, ca1117e chore: test results for sr-01-03] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@4f26742f46804c788f85ad06e69b06152609971f": "4f26742 chore: close session S143 — Phase 16 branch ready, SESSION_STATE updated" | kind=Commit | source=git | neighbors=[feat/phase-16-execution, 59d38ba chore: stub handleLogin (Phase …, 7cd80e2 fix(15): GAS Phase A dead code …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@54e61d1b6ff1477a90431d965f9f0f75f467a685": "54e61d1 docs(01): create Phase 1 plan — archive-stale endpoint (QUEUE-01)" | kind=Commit | source=git | neighbors=[feat/s115-dispatch-flow, 7eece97 docs(01): plan Phase 1 — POST /…, c4f6ee0 docs(01): confirm Script Proper…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@564f49b06fc20693637753fc64e9956ebbda66a4": "564f49b chore(phase-18): add n8n event bus router and outbox poller workflows" | kind=Commit | source=git | neighbors=[feat/phase-18-event-publishing-seam, 1320e73 docs(phase-18): fix TDD order i…, 76c1b72 docs: add Codex frontend brief …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@59d38bafdbaf1ab8a06d643b0bd40a6a7d93e84d": "59d38ba chore: stub handleLogin (Phase 16) | GAS v102" | kind=Commit | source=git | neighbors=[4f26742 chore: close session S143 — Pha…, feat/phase-16-execution, 54c3520 chore: close session S143 — Pha…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@5d5026b8c4fc2e0cbdc1dff2bb2b2403b64485a6": "5d5026b chore: remove GSD from agent stack, purge archived skills, update docs" | kind=Commit | source=git | neighbors=[3310fd7 Feat/phase 17 job state machine…, chore/lean-agent-stack, 43c9034 fix(ui): BottomNav — remove dea…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6184db586e5c203e940ed0aba86960db0d41f93c": "6184db5 chore(s116): session state — S115 shipped, milestone v1.0 active, Code.…" | kind=Commit | source=git | neighbors=[5bddbe3 chore: remove e2e daily schedul…, feat/s115-dispatch-flow, ea64d34 chore: session close — Phase 1 …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@64760e1c8651077a27b7c48502e0c1abc63307b1": "64760e1 fix(drizzle): commit _journal.json alongside 0005_cloudy_nitro migration" | kind=Commit | source=git | neighbors=[feat/foundation-phases-9-11, 65edec3 Merge branch 'main' into feat/f…, 989514d fix(job-comments): add sheetsId…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@64c8c30851257acd3fbcff849279cf40fb9df038": "64c8c30 chore: update diff artifact" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, 88bbb61 fix(phase-19): correct off-by-o…, 9982767 fix(phase-19): complete Lapham …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@658624f4769c9064b4e7c720731f58a510c19854": "658624f chore(p3-2): regenerate diff artifact — include migration scripts" | kind=Commit | source=git | neighbors=[1bfef1d feat(p3-2): migration scripts —…, feat/p3-2-time-records-migration, 51b349c chore(p3-2): add test results a…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@65edec3173eb1387a5f7f380c571cf1620e6e5b8": "65edec3 Merge branch 'main' into feat/foundation-phase6-drizzle-fix" | kind=Commit | source=git | neighbors=[47a1530 chore: mark Phases 7+8 complete…, 64760e1 fix(drizzle): commit _journal.j…, feat/foundation-phases-9-11] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@664130ba194fa33c2a3370761ec15363f420b643": "664130b fix: n8n IF node and data source" | kind=Commit | source=git | neighbors=[22e0799 chore: remove design extract ar…, feat/phase-19-code-js-email-migration, e31990e chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6c76106b5e3aa5b0f9cb02432fe51bd449b8f75a": "6c76106 chore: update ag_diff.txt — plan 04 (Gaps 5+7)" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 4209061 docs(s119): session close — Fou…, 6fc10e0 feat(foundation-07): Gap 7 — Ph…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6ead9d45977c41c03681c7ba2e0484b1eb248c8c": "6ead9d4 feat(foundation-04): Gap 4 — load_command(), model routing, --heavy fla…" | kind=Commit | source=git | neighbors=[1aef166 docs(planning): add Phase 1 con…, feat/foundation-milestone, da5964d chore: update ag_diff.txt — pla…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6f9a9726df735683f876c85864049d78d78075c6": "6f9a972 docs(11-02): add Railway n8n verification checklist for Phase 19 deploy…" | kind=Commit | source=git | neighbors=[0268497 docs(11-02): expand MANIFEST.js…, feat/phase-19-code-js-email-migration, b1f1740 docs(11-02): close plan — check…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@6fc10e038a06772fdf2128b756af42241120656d": "6fc10e0 feat(foundation-07): Gap 7 — Phase 3.5 document sprint inserted into pt…" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 6c76106 chore: update ag_diff.txt — pla…, 839709a feat(foundation-05): Gap 5 — ad…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@7044d011742375f43a0976a6984afeb4b6c5d9a3": "7044d01 docs(03): create phase 3 gap remediation plans — 3 plans, 2 waves" | kind=Commit | source=git | neighbors=[chore/s117-session-close, 9b7c4e8 docs(03): plan Phase 3 Gap Reme…, 79ca7b3 docs(03): research phase gap-re…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-023.json

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
