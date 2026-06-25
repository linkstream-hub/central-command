# Node Description Batch 356 of 412

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "remember_today_2026_06_13_done_02_45_feat_phase_28_sentinel_diet": "02:45 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-13.done.md:L1 | neighbors=[today-2026-06-13.done.md]
- "remember_today_2026_06_13_done_08_16_feat_phase_28_sentinel_diet": "08:16 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-13.done.md:L4 | neighbors=[today-2026-06-13.done.md]
- "remember_today_2026_06_13_done_09_10_feat_phase_28_sentinel_diet": "09:10 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-13.done.md:L6 | neighbors=[today-2026-06-13.done.md]
- "remember_today_2026_06_13_done_20_34_feat_phase_28_sentinel_diet": "20:34 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-13.done.md:L9 | neighbors=[today-2026-06-13.done.md]
- "remember_today_2026_06_13_done_21_45_feat_phase_28_sentinel_diet": "21:45 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-13.done.md:L11 | neighbors=[today-2026-06-13.done.md]
- "remember_today_2026_06_14_done_03_00_10_56_feat_phase_28_sentinel_diet": "03:00-10:56 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-14.done.md:L1 | neighbors=[today-2026-06-14.done.md]
- "remember_today_2026_06_14_done_10_58_11_16_feat_phase_28_sentinel_diet": "10:58-11:16 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-14.done.md:L3 | neighbors=[today-2026-06-14.done.md]
- "remember_today_2026_06_14_done_19_59_feat_phase_28_sentinel_diet": "19:59 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-14.done.md:L6 | neighbors=[today-2026-06-14.done.md]
- "remember_today_2026_06_15_done_02_57_03_04_feat_phase_28_sentinel_diet": "02:57-03:04 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-15.done.md:L1 | neighbors=[today-2026-06-15.done.md]
- "remember_today_2026_06_15_done_07_02_feat_phase_28_sentinel_diet": "07:02 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-15.done.md:L4 | neighbors=[today-2026-06-15.done.md]
- "remember_today_2026_06_15_done_22_48_feat_phase_28_sentinel_diet": "22:48 | feat/phase-28-sentinel-diet" | kind=entity | source=.remember/today-2026-06-15.done.md:L6 | neighbors=[today-2026-06-15.done.md]
- "remember_today_2026_06_16_done_02_47_fix_phase_19_env_blocked": "02:47 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-16.done.md:L1 | neighbors=[today-2026-06-16.done.md]
- "remember_today_2026_06_16_done_02_49_03_25_fix_phase_19_env_blocked": "02:49-03:25 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-16.done.md:L4 | neighbors=[today-2026-06-16.done.md]
- "remember_today_2026_06_16_done_06_14_fix_phase_19_env_blocked": "06:14 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-16.done.md:L7 | neighbors=[today-2026-06-16.done.md]
- "remember_today_2026_06_16_done_08_22_fix_phase_19_env_blocked": "08:22 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-16.done.md:L9 | neighbors=[today-2026-06-16.done.md]
- "remember_today_2026_06_16_done_15_45_17_45_fix_phase_19_env_blocked": "15:45-17:45 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-16.done.md:L11 | neighbors=[today-2026-06-16.done.md]
- "remember_today_2026_06_16_done_18_57_20_03_fix_phase_19_env_blocked": "18:57-20:03 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-16.done.md:L16 | neighbors=[today-2026-06-16.done.md]
- "remember_today_2026_06_16_done_19_42_20_02_research_repo_ecosystem": "19:42-20:02 | research/repo-ecosystem" | kind=entity | source=.remember/today-2026-06-16.done.md:L19 | neighbors=[today-2026-06-16.done.md]
- "remember_today_2026_06_16_done_20_05_20_29_fix_phase_19_env_blocked": "20:05-20:29 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-16.done.md:L21 | neighbors=[today-2026-06-16.done.md]
- "remember_today_2026_06_16_done_2026_06_16_fix_phase_19_env_blocked": "2026-06-16 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-16.done.md:L13 | neighbors=[today-2026-06-16.done.md]
- "remember_today_2026_06_16_done_22_22_fix_phase_19_env_blocked": "22:22 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-16.done.md:L24 | neighbors=[today-2026-06-16.done.md]
- "remember_today_2026_06_17_01_16_01_21_fix_phase_19_env_blocked": "01:16-01:21 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.md:L1 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_01_42_fix_phase_19_env_blocked": "01:42 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.md:L4 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_02_15_fix_phase_19_env_blocked": "02:15 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.md:L7 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_03_32_03_47_fix_phase_19_env_blocked": "03:32-03:47 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.md:L10 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_07_06_fix_phase_19_env_blocked": "07:06 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.md:L12 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_14_09_fix_phase_19_env_blocked": "14:09 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.md:L14 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_14_31_fix_phase_19_env_blocked": "14:31 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.md:L16 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_14_41_fix_phase_19_env_blocked": "14:41 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.md:L19 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_15_28_fix_phase_19_env_blocked": "15:28 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.md:L22 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_16_52_fix_phase_19_env_blocked": "16:52 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.md:L24 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_17_28_17_38_fix_dashboard_stats_semantics": "17:28-17:38 | fix/dashboard-stats-semantics" | kind=entity | source=.remember/today-2026-06-17.md:L27 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_18_01_main": "18:01 | main" | kind=entity | source=.remember/today-2026-06-17.md:L30 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_18_17_23_40_main": "18:17-23:40 | main" | kind=entity | source=.remember/today-2026-06-17.md:L32 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_18_29_main": "18:29 | main" | kind=entity | source=.remember/today-2026-06-17.md:L35 | neighbors=[today-2026-06-17.md]
- "remember_today_2026_06_17_done_00_04_fix_phase_19_env_blocked": "00:04 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.done.md:L1 | neighbors=[today-2026-06-17.done.md]
- "remember_today_2026_06_17_done_00_35_01_14_fix_phase_19_env_blocked": "00:35-01:14 | fix/phase-19-env-blocked" | kind=entity | source=.remember/today-2026-06-17.done.md:L3 | neighbors=[today-2026-06-17.done.md]
- "research_architecture": "ARCHITECTURE.md" | kind=entity | source=.planning/research/ARCHITECTURE.md:L1 | neighbors=[Architecture Research]
- "research_architecture_anti_pattern_1_mixing_auth_hooks": "Anti-Pattern 1: Mixing Auth Hooks" | kind=entity | source=.planning/research/ARCHITECTURE.md:L345 | neighbors=[Anti-Patterns]
- "research_architecture_anti_pattern_2_mutating_the_dispatch_queue_column_order": "Anti-Pattern 2: Mutating the Dispatch Queue Column Order" | kind=entity | source=.planning/research/ARCHITECTURE.md:L353 | neighbors=[Anti-Patterns]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-355.json

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
