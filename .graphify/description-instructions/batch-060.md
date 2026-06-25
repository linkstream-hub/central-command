# Node Description Batch 61 of 412

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

- "claude_agents_gsd_nyquist_auditor_md_agents_gsd_nyquist_auditor": "gsd-nyquist-auditor.md" | kind=entity | source=.claude/agents/gsd-nyquist-auditor.md:L1 | neighbors=[ESCALATE, GAPS FILLED, PARTIAL] | lang=en
- "claude_agents_gsd_security_auditor_md_agents_gsd_security_auditor": "gsd-security-auditor.md" | kind=entity | source=.claude/agents/gsd-security-auditor.md:L1 | neighbors=[ESCALATE, OPEN_THREATS, SECURED] | lang=en
- "clock_in_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/clock-in/route.ts:L12 | neighbors=[route.ts, route.test.ts, verifyFieldSession()] | lang=en
- "ClockedInBar": "Clocked In Bar" | kind=code-symbol | source=tech-pwa/src/components/ClockedInBar.tsx | neighbors=[Tech Session, Job Detail Page, page.tsx] | lang=en
- "code_buildsmartpropertycontext": "buildSmartPropertyContext()" | kind=code-symbol | source=Code.js:L1707 | neighbors=[Code.js, extractEmail(), parseWithGemini()] | lang=en
- "code_checkformissingemail": "checkForMissingEmail()" | kind=code-symbol | source=Code.js:L671 | neighbors=[Code.js, getColumnValues(), checkNewLeadEmails()] | lang=en
- "code_extractemail": "extractEmail()" | kind=code-symbol | source=Code.js:L1133 | neighbors=[Code.js, buildSmartPropertyContext(), enrichFromLaphamDb()] | lang=en
- "code_extractjson": "extractJson()" | kind=code-symbol | source=Code.js:L460 | neighbors=[Code.js, getDraftReply(), parseWithGemini()] | lang=en
- "code_getapikey": "getApiKey()" | kind=code-symbol | source=Code.js:L1151 | neighbors=[Code.js, checkNewLeadEmails(), getDraftReply()] | lang=en
- "code_getcolumnvalues": "getColumnValues()" | kind=code-symbol | source=Code.js:L1115 | neighbors=[Code.js, checkForMissingEmail(), flagNewContactsForReview()] | lang=en
- "code_getdraftreply": "getDraftReply()" | kind=code-symbol | source=Code.js:L1328 | neighbors=[Code.js, extractJson(), getApiKey()] | lang=en
- "code_isduplicatejob": "isDuplicateJob()" | kind=code-symbol | source=Code.js:L1688 | neighbors=[Code.js, addToDispatchQueue(), normalizeAddressKey()] | lang=en
- "code_loadlaphamdatabase": "loadLaphamDatabase()" | kind=code-symbol | source=Code.js:L498 | neighbors=[Code.js, checkNewLeadEmails(), expandAddressRange()] | lang=en
- "code_lookupbyaddress": "lookupByAddress()" | kind=code-symbol | source=Code.js:L697 | neighbors=[Code.js, enrichFromLaphamDb(), normalizeAddressKey()] | lang=en
- "code_routelead": "routeLead()" | kind=code-symbol | source=Code.js:L752 | neighbors=[Code.js, checkNewLeadEmails(), sendInspectionSummary()] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@02684974862c28bab9d1910637c28aa4b1a9b7da": "0268497 docs(11-02): expand MANIFEST.json from 1 to 4 workflow entries" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, 6f9a972 docs(11-02): add Railway n8n ve…, f16595c docs(11-01): complete tech debt…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@05e78c5f1a34e628d424335fb896c52b25a8e60c": "05e78c5 fix(foundation-01): touch diff and test_results artifacts before linking" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, f0860f6 feat(foundation-03): Gap 3 — ad…, a79f3af feat(foundation-04): nightly E2…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@07a0a9c4f6fc362290460884f27d0a7461a9fa61": "07a0a9c docs(phase-14): formally mark dual-write era closed" | kind=Commit | source=git | neighbors=[feat/phase-14-archive, 1ba194e chore(phase-14): generate diff …, fb9c225 chore: remove stale TechPWA GAS…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@0bbc4ceb8d4de9162b49428de1cfe54a6f47750e": "0bbc4ce feat(foundation-02/06): Gap 2+6 — worktree lifecycle in main(), hard ph…" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 93ac5ae chore: update ag_diff.txt — pla…, da5964d chore: update ag_diff.txt — pla…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0bc0eb62c60190a27578d24976ec9cc63b2a7fcc": "0bc0eb6 fix(adw): scout.md model names and add manual n8n flag-gate workflow" | kind=Commit | source=git | neighbors=[feat/adw-flag-gate-and-hooks, 4851c79 chore: update diff artifact, 1f414b3 chore: update diff artifact] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0d026cf443cfc2de21764f37328d0c6877b15966": "0d026cf chore(p3-5): regenerate diff artifact — single commit above main" | kind=Commit | source=git | neighbors=[feat/p3-5-gas-bridge-cleanup, e0dd250 chore(p3-5): add test results, a30bf2f chore(p3-5): regenerate diff ar…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0f4d6d94c41694a08bc918c9fad25fb747cbc668": "0f4d6d9 chore(phase2): create verification artifact template + PLAN.md" | kind=Commit | source=git | neighbors=[chore/s117-session-close, 2572de2 docs(phase2): close verificatio…, 8f544ff docs(02): revise Phase 2 contex…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0f8c6ee6e9802c97e8525274161cbc38e2798bd7": "0f8c6ee feat(p2-2): add compliance webhook to handleClockOut + update trigger i…" | kind=Commit | source=git | neighbors=[feat/p2-2-compliance-activation, bc37b46 chore: update diff artifact, 6a24b51 chore: update diff artifact] | lang=en
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
- "commit:repo:github.com/linkstream-hub/central-command@3bec3c366645fac4f4f52da7896043a721cbc304": "3bec3c3 fix(tech-pwa): fix undefined totalBreak variable in handleClockOut" | kind=Commit | source=git | neighbors=[feat/p2-2-compliance-activation, f7bdc93 chore: update diff artifact, b5f8f44 test(p2-2): test sprint results…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@42ca9f4c2e60db9b9a87c9bfb2c5e62d06b32e0f": "42ca9f4 docs(02): capture Phase 2 context — Core Loop Verification" | kind=Commit | source=git | neighbors=[chore/s117-session-close, 8f544ff docs(02): revise Phase 2 contex…, 98768e5 chore(s117): session close — Ph…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@448bb95be6899473d8a027a07d34bcb702eb4bf0": "448bb95 chore: dispatch dashboard diff artifact" | kind=Commit | source=git | neighbors=[claude/plan-dispatch-dashboard-BX4AV, 1a1e686 chore: update settings allowlist, a5382b6 feat(live): rebuild /live as th…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@462d3fccbc3c92a270f60e8567eac11d911e71b2": "462d3fc docs: remap codebase (7 docs via gsd-map-codebase refresh 2026-06-09)" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, bd3fa62 docs(11): capture phase context, d36fa0a chore: add codebase map to .pla…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-060.json

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
