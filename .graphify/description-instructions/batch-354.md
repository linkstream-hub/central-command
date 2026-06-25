# Node Description Batch 355 of 412

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

- "references_workstream_flag_overview": "Overview" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/workstream-flag.md:L3 | neighbors=[Workstream Flag (`--ws`)] | lang=en
- "references_workstream_flag_pointer_lifecycle": "Pointer Lifecycle" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/workstream-flag.md:L46 | neighbors=[Workstream Flag (`--ws`)] | lang=en
- "references_workstream_flag_resolution_priority": "Resolution Priority" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/workstream-flag.md:L8 | neighbors=[Workstream Flag (`--ws`)] | lang=en
- "references_workstream_flag_routing_propagation": "Routing Propagation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/workstream-flag.md:L62 | neighbors=[Workstream Flag (`--ws`)] | lang=en
- "references_workstream_flag_session_identity_resolution": "Session Identity Resolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/workstream-flag.md:L27 | neighbors=[Workstream Flag (`--ws`)] | lang=en
- "references_workstream_flag_why_session_scoped_pointers_exist": "Why session-scoped pointers exist" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/workstream-flag.md:L16 | neighbors=[Workstream Flag (`--ws`)] | lang=en
- "references_worktree_path_safety": "worktree-path-safety.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/worktree-path-safety.md:L1 | neighbors=[Worktree Path Safety] | lang=en
- "references_worktree_path_safety_absolute_path_guard_step_0b_3099": "Absolute-path guard — step 0b (#3099)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/worktree-path-safety.md:L69 | neighbors=[Worktree Path Safety] | lang=en
- "references_worktree_path_safety_cwd_drift_sentinel_step_0a_3097": "cwd-drift sentinel — step 0a (#3097)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/worktree-path-safety.md:L39 | neighbors=[Worktree Path Safety] | lang=pt
- "references_worktree_path_safety_worktree_branch_check_run_once_at_spawn_time": "Worktree branch check (run once at spawn-time)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/worktree-path-safety.md:L8 | neighbors=[Worktree Path Safety] | lang=en
- "remember_archive": "archive.md" | kind=entity | source=.remember/archive.md:L1 | neighbors=[Archive] | lang=en
- "remember_archive_week_of_2026_06_09": "Week of 2026-06-09" | kind=entity | source=.remember/archive.md:L3 | neighbors=[Archive] | lang=en
- "remember_now": "now.md" | kind=entity | source=.remember/now.md:L1 | neighbors=[00:10 | main] | lang=en
- "remember_now_00_10_main": "00:10 | main" | kind=entity | source=.remember/now.md:L2 | neighbors=[now.md] | lang=en
- "remember_recent": "recent.md" | kind=entity | source=.remember/recent.md:L1 | neighbors=[Recent] | lang=en
- "remember_recent_recent": "Recent" | kind=entity | source=.remember/recent.md:L1 | neighbors=[recent.md] | lang=en
- "remember_today_2026_06_09_done": "today-2026-06-09.done.md" | kind=entity | source=.remember/today-2026-06-09.done.md:L1 | neighbors=[22:28 | feat/phase-19-code-js-email-mig…] | lang=en
- "remember_today_2026_06_09_done_22_28_feat_phase_19_code_js_email_migration": "22:28 | feat/phase-19-code-js-email-migration" | kind=entity | source=.remember/today-2026-06-09.done.md:L1 | neighbors=[today-2026-06-09.done.md] | lang=en
- "remember_today_2026_06_10_done_08_15_feat_phase_19_code_js_email_migration": "08:15 | feat/phase-19-code-js-email-migration" | kind=entity | source=.remember/today-2026-06-10.done.md:L4 | neighbors=[today-2026-06-10.done.md] | lang=en
- "remember_today_2026_06_10_done_08_37_feat_phase_12_neon_cutover": "08:37 | feat/phase-12-neon-cutover" | kind=entity | source=.remember/today-2026-06-10.done.md:L6 | neighbors=[today-2026-06-10.done.md] | lang=en
- "remember_today_2026_06_10_done_09_37_main": "09:37 | main" | kind=entity | source=.remember/today-2026-06-10.done.md:L9 | neighbors=[today-2026-06-10.done.md] | lang=en
- "remember_today_2026_06_10_done_18_42_main": "18:42 | main" | kind=entity | source=.remember/today-2026-06-10.done.md:L11 | neighbors=[today-2026-06-10.done.md] | lang=en
- "remember_today_2026_06_10_done_22_46_23_35_feat_phase_19_code_js_email_migration": "22:46-23:35 | feat/phase-19-code-js-email-migration" | kind=entity | source=.remember/today-2026-06-10.done.md:L1 | neighbors=[today-2026-06-10.done.md] | lang=en
- "remember_today_2026_06_10_done_23_20_feat_phase_25_parsing_intake": "23:20 | feat/phase-25-parsing-intake" | kind=entity | source=.remember/today-2026-06-10.done.md:L13 | neighbors=[today-2026-06-10.done.md] | lang=en
- "remember_today_2026_06_11_done_00_34_feat_phase_25_parsing_intake": "00:34 | feat/phase-25-parsing-intake" | kind=entity | source=.remember/today-2026-06-11.done.md:L1 | neighbors=[today-2026-06-11.done.md] | lang=en
- "remember_today_2026_06_11_done_01_58_main": "01:58 | main" | kind=entity | source=.remember/today-2026-06-11.done.md:L3 | neighbors=[today-2026-06-11.done.md] | lang=en
- "remember_today_2026_06_11_done_02_34_02_42_main": "02:34-02:42 | main" | kind=entity | source=.remember/today-2026-06-11.done.md:L5 | neighbors=[today-2026-06-11.done.md] | lang=en
- "remember_today_2026_06_11_done_02_50_02_58_main": "02:50-02:58 | main" | kind=entity | source=.remember/today-2026-06-11.done.md:L8 | neighbors=[today-2026-06-11.done.md] | lang=en
- "remember_today_2026_06_11_done_03_11_main": "03:11 | main" | kind=entity | source=.remember/today-2026-06-11.done.md:L10 | neighbors=[today-2026-06-11.done.md] | lang=en
- "remember_today_2026_06_11_done_07_08_main": "07:08 | main" | kind=entity | source=.remember/today-2026-06-11.done.md:L13 | neighbors=[today-2026-06-11.done.md] | lang=en
- "remember_today_2026_06_11_done_18_43_main": "18:43 | main" | kind=entity | source=.remember/today-2026-06-11.done.md:L15 | neighbors=[today-2026-06-11.done.md] | lang=en
- "remember_today_2026_06_11_done_19_39_main": "19:39 | main" | kind=entity | source=.remember/today-2026-06-11.done.md:L17 | neighbors=[today-2026-06-11.done.md] | lang=en
- "remember_today_2026_06_11_done_23_34_main": "23:34 | main" | kind=entity | source=.remember/today-2026-06-11.done.md:L20 | neighbors=[today-2026-06-11.done.md] | lang=en
- "remember_today_2026_06_12_done_03_45_feat_phase_28_sentinel_diet": "03:45 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-12.done.md:L1 | neighbors=[today-2026-06-12.done.md] | lang=en
- "remember_today_2026_06_12_done_06_45_feat_phase_28_sentinel_diet": "06:45 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-12.done.md:L4 | neighbors=[today-2026-06-12.done.md] | lang=en
- "remember_today_2026_06_12_done_08_07_feat_phase_28_sentinel_diet": "08:07 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-12.done.md:L6 | neighbors=[today-2026-06-12.done.md] | lang=en
- "remember_today_2026_06_12_done_08_31_08_35_feat_phase_28_sentinel_diet": "08:31-08:35 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-12.done.md:L8 | neighbors=[today-2026-06-12.done.md] | lang=en
- "remember_today_2026_06_12_done_08_51_feat_phase_28_sentinel_diet": "08:51 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-12.done.md:L11 | neighbors=[today-2026-06-12.done.md] | lang=en
- "remember_today_2026_06_12_done_08_57_feat_phase_28_sentinel_diet": "08:57 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-12.done.md:L14 | neighbors=[today-2026-06-12.done.md] | lang=en
- "remember_today_2026_06_12_done_17_31_feat_phase_28_sentinel_diet": "17:31 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-12.done.md:L17 | neighbors=[today-2026-06-12.done.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-354.json

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
