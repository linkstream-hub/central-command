# Node Description Batch 51 of 412

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

- "claude_agents_gsd_advisor_researcher_md_agents_gsd_advisor_researcher": "gsd-advisor-researcher.md" | kind=entity | source=.claude/agents/gsd-advisor-researcher.md:L1 | neighbors=[full_maturity, minimal_decisive, standard, Tool Priority] | lang=en
- "claude_agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_5_verify_e2e_flows": "Step 5: Verify E2E Flows" | kind=entity | source=.claude/agents/gsd-integration-checker.md:L239 | neighbors=[gsd-integration-checker.md, Flow: Data Display, Flow: Form Submission, Flow: User Authentication] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_package_legitimacy_gate": "Package Legitimacy Gate" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L193 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…, Step 1 — Run legitimacy check via seam, Step 2 — Ecosystem-specific registry ve…, Step 3 — Check for suspicious postinsta…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_4_validation_architecture_research_if_nyquist_validation_enabled": "Step 4: Validation Architecture Research (if nyquist_validation enabled)" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L709 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…, Detect Test Infrastructure, Identify Wave 0 Gaps, Map Requirements to Tests] | lang=en
- "code_addtodispatchqueue": "addToDispatchQueue()" | kind=code-symbol | source=Code.js:L776 | neighbors=[Code.js, isDuplicateJob(), sanitizeAddress(), checkNewLeadEmails()] | lang=en
- "code_logtosheet": "logToSheet()" | kind=code-symbol | source=Code.js:L899 | neighbors=[Code.js, checkNewLeadEmails(), getNextLeadId(), sanitizeAddress()] | lang=en
- "code_normalizeaddresskey": "normalizeAddressKey()" | kind=code-symbol | source=Code.js:L1742 | neighbors=[Code.js, flagNewContactsForReview(), isDuplicateJob(), lookupByAddress()] | lang=en
- "code_sanitizeaddress": "sanitizeAddress()" | kind=code-symbol | source=Code.js:L1138 | neighbors=[Code.js, addToDispatchQueue(), flagNewContactsForReview(), logToSheet()] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0a622e8df8afeac20669ca9dfab66970ea35900f": "0a622e8 chore(tests): remove console.log" | kind=Commit | source=git | neighbors=[feat/phase-18-event-publishing-seam, 8694875 fix(phase-18): sql encoding, re…, event-bus.test.ts, 41b6a57 feat(job-update): Phase 18 even…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@0bb75e960c306d4c29a0a02ccabde2a1e5169983": "0bb75e9 docs(12): fix plan-checker blockers — add DINT requirements, validation…" | kind=Commit | source=git | neighbors=[chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, 5a92c81 docs(12): fix plan-checker warn…, c4feefb docs(phase-12): plan data integ…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@10ebf48b541d0db076d630df92c16dadda6ec693": "10ebf48 chore: merge origin/main — resolve Foundation→v1.1 state transition con…" | kind=Commit | source=git | neighbors=[chore/phase-12-merge-sync, f8c2c96 fix(vercel): skip preview build…, 96ce5d5 chore(s122): session close — AD…, e06848a feat: merge phase-12 — data int…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@119ce9aec883241be7daee686c323aa0b6cd7abe": "119ce9a fix(phase-19): remove Gmail label node (required field blocks publish)" | kind=Commit | source=git | neighbors=[fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 4a7254c fix: resolve n8n credential nam…, d60478d fix(phase-19): replace all \$en…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@149f1e3063a44e551b28942c75218159cda9a9e1": "149f1e3 fix(phase-19): remove record.prop_id from node-11 + sync live workflow …" | kind=Commit | source=git | neighbors=[fix/dashboard-stats-semantics, fix/phase-19-env-blocked, f4a23e8 chore: delete one-shot n8n upda…, 3c77c50 fix(phase-19): remove prop_id f…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@1ca22d960c831d6b8485b74f43da94f6546b1106": "1ca22d9 feat(arch): ADR-010 job state machine seam + Phase 17 spec" | kind=Commit | source=git | neighbors=[fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 98cbec2 feat(arch): ADR-011 event publi…, f4a23e8 chore: delete one-shot n8n upda…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@3c77c5067cf13269d13f0055e2f11b90193cdcdb": "3c77c50 fix(phase-19): remove prop_id from property lookup + fix jobs/sync body…" | kind=Commit | source=git | neighbors=[fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 149f1e3 fix(phase-19): remove record.pr…, 4a7254c fix: resolve n8n credential nam…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@43807eb2987e8c992d75245ac32730e1efc69049": "43807eb feat(intake): phase 23 lapham + access merge" | kind=Commit | source=git | neighbors=[feature/phase-23-lapham-integration, route.ts, gmail.webhook.post.test.ts, 4e0a127 chore: S163 close — B3 intake c…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@43c9034ce089128dbe67b48b6287a0c66930646b": "43c9034 fix(ui): BottomNav — remove dead tabs, wire real routes only" | kind=Commit | source=git | neighbors=[chore/lean-agent-stack, f5c63dc docs(agents): add Codex design …, BottomNav.tsx, 5d5026b chore: remove GSD from agent st…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4a7254cd4b45716dbbbb79ef3886ef3e183b820c": "4a7254c fix: resolve n8n credential names to actual stored names" | kind=Commit | source=git | neighbors=[119ce9a fix(phase-19): remove Gmail lab…, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 3c77c50 fix(phase-19): remove prop_id f…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4b11a57045620a689a62b1998773b6b4940e6e33": "4b11a57 fix(e2e): lazy-init Resend client to prevent module-load crash" | kind=Commit | source=git | neighbors=[feat/phase-20-auth-lint, 17fd617 fix(lint): resolve all 41 ESLin…, actions.ts, 622a6c0 fix(ci): resolve next-auth ESM …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4b464d4150bbaecee28216b7d3651457541b844e": "4b464d4 docs(phase-12): wave 3 summary" | kind=Commit | source=git | neighbors=[chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, 7509ccf fix(phase-12): replace utcnow()…, f98fa25 chore(phase-12): add diff artif…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@5c0e55f4b3bb8c1081ab3f6dc62db076173502b5": "5c0e55f fix(n8n): rewire phase-19 workflow — bypass old Gemini path, route emai…" | kind=Commit | source=git | neighbors=[feature/phase-23-lapham-integration, main, 555dc30 fix(intake): use gemini-2.0-fla…, 8799e77 fix(intake): remove stale Gemin…] | lang=en
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
- "commit:repo:github.com/linkstream-hub/central-command@c0ff9a5afb97085755172269db1688cc9e248279": "c0ff9a5 chore: S95 session closeout — SESSION_STATE ready for S96" | kind=Commit | source=git | neighbors=[chore/s95-closeout, feat/p2-3-meal-premium-calc, 744f294 feat(compliance): p2-3 meal pre…, e1db499 Merge branch 'main' of https://…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c4feefb2039387f91e5241381c319e924f1727cd": "c4feefb docs(phase-12): plan data integrity audit — DINT-01/02/03" | kind=Commit | source=git | neighbors=[afebef9 docs(12): capture phase context…, chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, 0bb75e9 docs(12): fix plan-checker bloc…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@c5c1cfdebdf3999d7c567cb7e3af35e0cbefc89b": "c5c1cfd fix(api): prevent db.update empty object error in patch route" | kind=Commit | source=git | neighbors=[1a3868e chore: post phase-17 diff for C…, feat/phase-17-job-state-machine, d38ff89 test: add integration tests and…, route.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d492a0cf393fcb1deeed6e83a27b3a5e05f4cf46": "d492a0c fix(dashboard-api): add archiveJob special case for Neon" | kind=Commit | source=git | neighbors=[feat/hotfix-archive-neon, ad6f876 chore(hotfix): add archive test…, dashboard-api.ts, dc4e9f1 chore(hotfix): add diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d60478ddbebe96f062c4953e79546740e24dac3e": "d60478d fix(phase-19): replace all \\$env refs with n8n credentials (free plan)" | kind=Commit | source=git | neighbors=[2ec913a fix(28-02): use n8n Header Auth…, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 119ce9a fix(phase-19): remove Gmail lab…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@d770ab81e305c3fb71889dfc99182d666c28c1dc": "d770ab8 fix(phase-12): handle missing sheets_id on job_comments + mark phase co…" | kind=Commit | source=git | neighbors=[chore/phase-12-merge-sync, feat/phase-12-data-integrity-audit, e06848a feat: merge phase-12 — data int…, ed07390 chore(phase-12): refresh diff a…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e06848aaa2ca5a1a22e455ad2b2c090c05ffc624": "e06848a feat: merge phase-12 — data integrity audit (DINT-01/02/03)" | kind=Commit | source=git | neighbors=[5a92c81 docs(12): fix plan-checker warn…, d770ab8 fix(phase-12): handle missing s…, chore/phase-12-merge-sync, 10ebf48 chore: merge origin/main — reso…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@e1b9be503499cc4a1b3f2433ef608b53b3608432": "e1b9be5 fix(email-intake): fix 4 parse bugs, add tests" | kind=Commit | source=git | neighbors=[464b853 Merge branch 'main' of https://…, fix/email-intake-parse, route.ts, gmail.webhook.post.test.ts] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@e9290d48b0ec12a426cf4039067cdc3b232ee5e3": "e9290d4 chore: update Apps Script migration utility with safeIsoDate and improv…" | kind=Commit | source=git | neighbors=[8a3caa5 fix(sync): explicitly map time …, chore/s97-phase3-architecture-design, chore/s99-closeout, 935dd1d docs(claude): session 56 → 57 h…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-050.json

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
