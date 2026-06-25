# Node Description Batch 21 of 49

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

- "commit:repo:github.com/linkstream-hub/central-command@0a622e8df8afeac20669ca9dfab66970ea35900f": "0a622e8 chore(tests): remove console.log" | kind=Commit | source=git | neighbors=[feat/phase-18-event-publishing-seam, 8694875 fix(phase-18): sql encoding, re…, event-bus.test.ts, 41b6a57 feat(job-update): Phase 18 even…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@0bb75e960c306d4c29a0a02ccabde2a1e5169983": "0bb75e9 docs(12): fix plan-checker blockers — add DINT requirements, validation…" | kind=Commit | source=git | neighbors=[chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, 5a92c81 docs(12): fix plan-checker warn…, c4feefb docs(phase-12): plan data integ…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@10ebf48b541d0db076d630df92c16dadda6ec693": "10ebf48 chore: merge origin/main — resolve Foundation→v1.1 state transition con…" | kind=Commit | source=git | neighbors=[chore/phase-12-merge-sync, f8c2c96 fix(vercel): skip preview build…, 96ce5d5 chore(s122): session close — AD…, e06848a feat: merge phase-12 — data int…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@119ce9aec883241be7daee686c323aa0b6cd7abe": "119ce9a fix(phase-19): remove Gmail label node (required field blocks publish)" | kind=Commit | source=git | neighbors=[fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 4a7254c fix: resolve n8n credential nam…, d60478d fix(phase-19): replace all \$en…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@149f1e3063a44e551b28942c75218159cda9a9e1": "149f1e3 fix(phase-19): remove record.prop_id from node-11 + sync live workflow …" | kind=Commit | source=git | neighbors=[fix/dashboard-stats-semantics, fix/phase-19-env-blocked, f4a23e8 chore: delete one-shot n8n upda…, 3c77c50 fix(phase-19): remove prop_id f…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1ca22d960c831d6b8485b74f43da94f6546b1106": "1ca22d9 feat(arch): ADR-010 job state machine seam + Phase 17 spec" | kind=Commit | source=git | neighbors=[fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 98cbec2 feat(arch): ADR-011 event publi…, f4a23e8 chore: delete one-shot n8n upda…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1d7483a777f194817eb7903a3fff95928f6b9053": "1d7483a test(techs): phase 24 roster shape contract — 3 integration tests" | kind=Commit | source=git | neighbors=[feature/phase-24-tech-roster, 6e48461 fix(techs): rewrite /api/techs/…, route.test.ts, c8e6884 Merge pull request #11 from lin…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@3c77c5067cf13269d13f0055e2f11b90193cdcdb": "3c77c50 fix(phase-19): remove prop_id from property lookup + fix jobs/sync body…" | kind=Commit | source=git | neighbors=[fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 149f1e3 fix(phase-19): remove record.pr…, 4a7254c fix: resolve n8n credential nam…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@43c9034ce089128dbe67b48b6287a0c66930646b": "43c9034 fix(ui): BottomNav — remove dead tabs, wire real routes only" | kind=Commit | source=git | neighbors=[chore/lean-agent-stack, f5c63dc docs(agents): add Codex design …, BottomNav.tsx, 5d5026b chore: remove GSD from agent st…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4a7254cd4b45716dbbbb79ef3886ef3e183b820c": "4a7254c fix: resolve n8n credential names to actual stored names" | kind=Commit | source=git | neighbors=[119ce9a fix(phase-19): remove Gmail lab…, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 3c77c50 fix(phase-19): remove prop_id f…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4b11a57045620a689a62b1998773b6b4940e6e33": "4b11a57 fix(e2e): lazy-init Resend client to prevent module-load crash" | kind=Commit | source=git | neighbors=[feat/phase-20-auth-lint, 17fd617 fix(lint): resolve all 41 ESLin…, actions.ts, 622a6c0 fix(ci): resolve next-auth ESM …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4b464d4150bbaecee28216b7d3651457541b844e": "4b464d4 docs(phase-12): wave 3 summary" | kind=Commit | source=git | neighbors=[chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, 7509ccf fix(phase-12): replace utcnow()…, f98fa25 chore(phase-12): add diff artif…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4e08c33ebc3d9099c0e307d4ccc31e097024d96e": "4e08c33 test(c1): RED tests for JobUpdate.apply() — module deepening" | kind=Commit | source=git | neighbors=[3310fd7 Feat/phase 17 job state machine…, refactor/c1-job-update-module, 5ad3849 feat(c1): implement JobUpdate d…, job-update.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@62cb048d9b7c7e83df25ce0ae895c1061177f907": "62cb048 docs(arch): ADR-012/013, fix Phase 17 spec, add dashboard stats fix spec" | kind=Commit | source=git | neighbors=[fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 1491bd8 chore: merge main into fix/phas…, 98cbec2 feat(arch): ADR-011 event publi…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@7509ccfecb66d99c9d0af77ad3743c92277f9409": "7509ccf fix(phase-12): replace utcnow() with timezone-aware datetime.now(UTC)" | kind=Commit | source=git | neighbors=[4b464d4 docs(phase-12): wave 3 summary, chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, ed07390 chore(phase-12): refresh diff a…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@77c65eeb5b3b366f69b472edf685fadd8e5c2d85": "77c65ee feat(phase-12): neon_audit.py data integrity audit script — DINT-01/02/…" | kind=Commit | source=git | neighbors=[5a92c81 docs(12): fix plan-checker warn…, chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, f98fa25 chore(phase-12): add diff artif…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@81331644ce4660ec401a3047f2a914886c89f531": "8133164 chore(s117): session close — Phase 2 complete, Phase 3 gap inventory re…" | kind=Commit | source=git | neighbors=[2572de2 docs(phase2): close verificatio…, chore/s117-session-close, 79ca7b3 docs(03): research phase gap-re…, phase2-verification.spec.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@8859c9f47359b0ebac7d4c094de723940f0aa538": "8859c9f feat(phase-20): add eslint rule to enforce auth boundaries" | kind=Commit | source=git | neighbors=[085b137 feat(phase-19): observability s…, feat/phase-20-auth-lint, 622a6c0 fix(ci): resolve next-auth ESM …, eslint.config.mjs] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@8a3caa51a86520e41d18d35071258c28d2cfc8dc": "8a3caa5 fix(sync): explicitly map time record fields and handle invalid dates i…" | kind=Commit | source=git | neighbors=[chore/s97-phase3-architecture-design, e9290d4 chore: update Apps Script migra…, route.ts, fe10b9c fix: resolve linting errors in …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@935dd1d5713501556c4226ea3e6dd07282ae77c1": "935dd1d docs(claude): session 56 → 57 handoff — shadow-writes complete, arch de…" | kind=Commit | source=git | neighbors=[chore/s97-phase3-architecture-design, chore/s99-closeout, c26b09b docs(arch): session 57 handoff …, e9290d4 chore: update Apps Script migra…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@958611af884fd998369aa0b91b2a7a5b43910c0e": "958611a test(c1): RED tests for JobUpdate.apply() — module deepening" | kind=Commit | source=git | neighbors=[feat/phase-18-event-publishing-seam, e9be60d feat(c1): implement JobUpdate d…, job-update.test.ts, a6881a9 docs(phase-18): update ADR-011 …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@98cbec203f7e0df6879d235d1e89069e90152370": "98cbec2 feat(arch): ADR-011 event publishing seam + Phase 18 spec" | kind=Commit | source=git | neighbors=[1ca22d9 feat(arch): ADR-010 job state m…, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 62cb048 docs(arch): ADR-012/013, fix Ph…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@afebef986e88d561744347db702b4fc7bae1fa7e": "afebef9 docs(12): capture phase context — Data Integrity Audit" | kind=Commit | source=git | neighbors=[2a9e7b5 chore: resolve SESSION_STATE me…, chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, c4feefb docs(phase-12): plan data integ…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c26b09b3bc03f7e4a6bf5802409e1ce1589603ee": "c26b09b docs(arch): session 57 handoff — shadow-writes complete, Phase B next" | kind=Commit | source=git | neighbors=[935dd1d docs(claude): session 56 → 57 h…, chore/s97-phase3-architecture-design, chore/s99-closeout, 70fab33 fix(dispatch): session 57 — cor…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c4feefb2039387f91e5241381c319e924f1727cd": "c4feefb docs(phase-12): plan data integrity audit — DINT-01/02/03" | kind=Commit | source=git | neighbors=[afebef9 docs(12): capture phase context…, chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, 0bb75e9 docs(12): fix plan-checker bloc…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c5c1cfdebdf3999d7c567cb7e3af35e0cbefc89b": "c5c1cfd fix(api): prevent db.update empty object error in patch route" | kind=Commit | source=git | neighbors=[1a3868e chore: post phase-17 diff for C…, feat/phase-17-job-state-machine, d38ff89 test: add integration tests and…, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d492a0cf393fcb1deeed6e83a27b3a5e05f4cf46": "d492a0c fix(dashboard-api): add archiveJob special case for Neon" | kind=Commit | source=git | neighbors=[feat/hotfix-archive-neon, ad6f876 chore(hotfix): add archive test…, dashboard-api.ts, dc4e9f1 chore(hotfix): add diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d60478ddbebe96f062c4953e79546740e24dac3e": "d60478d fix(phase-19): replace all \\$env refs with n8n credentials (free plan)" | kind=Commit | source=git | neighbors=[2ec913a fix(28-02): use n8n Header Auth…, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 119ce9a fix(phase-19): remove Gmail lab…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d770ab81e305c3fb71889dfc99182d666c28c1dc": "d770ab8 fix(phase-12): handle missing sheets_id on job_comments + mark phase co…" | kind=Commit | source=git | neighbors=[chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, e06848a feat: merge phase-12 — data int…, ed07390 chore(phase-12): refresh diff a…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e06848aaa2ca5a1a22e455ad2b2c090c05ffc624": "e06848a feat: merge phase-12 — data integrity audit (DINT-01/02/03)" | kind=Commit | source=git | neighbors=[5a92c81 docs(12): fix plan-checker warn…, d770ab8 fix(phase-12): handle missing s…, chore/phase-12-merge-sync, 10ebf48 chore: merge origin/main — reso…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@e1b9be503499cc4a1b3f2433ef608b53b3608432": "e1b9be5 fix(email-intake): fix 4 parse bugs, add tests" | kind=Commit | source=git | neighbors=[464b853 Merge branch 'main' of https://…, fix/email-intake-parse, route.ts, gmail.webhook.post.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e9290d48b0ec12a426cf4039067cdc3b232ee5e3": "e9290d4 chore: update Apps Script migration utility with safeIsoDate and improv…" | kind=Commit | source=git | neighbors=[8a3caa5 fix(sync): explicitly map time …, chore/s97-phase3-architecture-design, chore/s99-closeout, 935dd1d docs(claude): session 56 → 57 h…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e9be60dfbd6537e79e24bdad588c643e9230daef": "e9be60d feat(c1): implement JobUpdate deep module — PATCH route shrinks to 15 l…" | kind=Commit | source=git | neighbors=[958611a test(c1): RED tests for JobUpda…, feat/phase-18-event-publishing-seam, 41b6a57 feat(job-update): Phase 18 even…, job-update.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@ed073908398794e604aadca97eefa376a6ff02fa": "ed07390 chore(phase-12): refresh diff artifact" | kind=Commit | source=git | neighbors=[7509ccf fix(phase-12): replace utcnow()…, chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, d770ab8 fix(phase-12): handle missing s…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@edff8b68bb9a94c0d7a361b686b3969b65572d2c": "edff8b6 docs(claude): add open issues from session 57 testing to session 58 han…" | kind=Commit | source=git | neighbors=[70fab33 fix(dispatch): session 57 — cor…, chore/s97-phase3-architecture-design, chore/s99-closeout, 3fa40c1 docs(claude): complete session …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f4a23e8216e7876650d9a82fd3b5ecb34402bb6b": "f4a23e8 chore: delete one-shot n8n update_p2_3.py (already executed)" | kind=Commit | source=git | neighbors=[149f1e3 fix(phase-19): remove record.pr…, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 1ca22d9 feat(arch): ADR-010 job state m…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@f8dac22e41a163c91be807c5d5063391f150bdd3": "f8dac22 fix: robust date parsing in sync API routes to handle Google Sheets dat…" | kind=Commit | source=git | neighbors=[chore/s97-phase3-architecture-design, fe10b9c fix: resolve linting errors in …, check-neon-counts.mjs, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@f98fa25e09d95ed22dd05d7da4e24198136b575f": "f98fa25 chore(phase-12): add diff artifact" | kind=Commit | source=git | neighbors=[77c65ee feat(phase-12): neon_audit.py d…, chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, 4b464d4 docs(phase-12): wave 3 summary] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@fe10b9c7777e38de1cc3004c879980305d286180": "fe10b9c fix: resolve linting errors in sync routes (unused imports, 'any' types)" | kind=Commit | source=git | neighbors=[f8dac22 fix: robust date parsing in syn…, chore/s97-phase3-architecture-design, 8a3caa5 fix(sync): explicitly map time …, route.ts] | lang=en
- "components_installprompt": "InstallPrompt.tsx" | kind=code-symbol | source=tech-pwa/src/components/InstallPrompt.tsx:L1 | neighbors=[layout.tsx, 01bf641 Initial commit — clean history, BeforeInstallPromptEvent, InstallPrompt()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-020.json

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
