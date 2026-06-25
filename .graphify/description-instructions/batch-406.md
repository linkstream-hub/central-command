# Node Description Batch 407 of 412

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

- "gsd_pause_work_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-pause-work/SKILL.md:L1
- "gsd_phase": "phase.md" | kind=entity | source=.claude/commands/gsd/phase.md:L1
- "gsd_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-phase/SKILL.md:L1
- "gsd_plan_phase": "plan-phase.md" | kind=entity | source=.claude/commands/gsd/plan-phase.md:L1
- "gsd_plan_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-plan-phase/SKILL.md:L1
- "gsd_plan_review_convergence": "plan-review-convergence.md" | kind=entity | source=.claude/commands/gsd/plan-review-convergence.md:L1
- "gsd_plan_review_convergence_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-plan-review-convergence/SKILL.md:L1
- "gsd_pr_branch": "pr-branch.md" | kind=entity | source=.claude/commands/gsd/pr-branch.md:L1
- "gsd_pr_branch_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-pr-branch/SKILL.md:L1
- "gsd_profile_user": "profile-user.md" | kind=entity | source=.claude/commands/gsd/profile-user.md:L1
- "gsd_profile_user_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-profile-user/SKILL.md:L1
- "gsd_progress": "progress.md" | kind=entity | source=.claude/commands/gsd/progress.md:L1
- "gsd_progress_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-progress/SKILL.md:L1
- "gsd_resume_work": "resume-work.md" | kind=entity | source=.claude/commands/gsd/resume-work.md:L1
- "gsd_resume_work_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-resume-work/SKILL.md:L1
- "gsd_review": "review.md" | kind=entity | source=.claude/commands/gsd/review.md:L1
- "gsd_review_backlog": "review-backlog.md" | kind=entity | source=.claude/commands/gsd/review-backlog.md:L1
- "gsd_review_backlog_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-review-backlog/SKILL.md:L1
- "gsd_review_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-review/SKILL.md:L1
- "gsd_secure_phase": "secure-phase.md" | kind=entity | source=.claude/commands/gsd/secure-phase.md:L1
- "gsd_secure_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-secure-phase/SKILL.md:L1
- "gsd_settings": "settings.md" | kind=entity | source=.claude/commands/gsd/settings.md:L1
- "gsd_settings_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-settings/SKILL.md:L1
- "gsd_ship": "ship.md" | kind=entity | source=.claude/commands/gsd/ship.md:L1
- "gsd_ship_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ship/SKILL.md:L1
- "gsd_sketch": "sketch.md" | kind=entity | source=.claude/commands/gsd/sketch.md:L1
- "gsd_sketch_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-sketch/SKILL.md:L1
- "gsd_spec_phase": "spec-phase.md" | kind=entity | source=.claude/commands/gsd/spec-phase.md:L1
- "gsd_spec_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-spec-phase/SKILL.md:L1
- "gsd_spike": "spike.md" | kind=entity | source=.claude/commands/gsd/spike.md:L1
- "gsd_spike_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-spike/SKILL.md:L1
- "gsd_stats": "stats.md" | kind=entity | source=.claude/commands/gsd/stats.md:L1
- "gsd_stats_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-stats/SKILL.md:L1
- "gsd_thread": "thread.md" | kind=entity | source=.claude/commands/gsd/thread.md:L1
- "gsd_thread_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-thread/SKILL.md:L1
- "gsd_ui_phase": "ui-phase.md" | kind=entity | source=.claude/commands/gsd/ui-phase.md:L1
- "gsd_ui_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ui-phase/SKILL.md:L1
- "gsd_ui_review": "ui-review.md" | kind=entity | source=.claude/commands/gsd/ui-review.md:L1
- "gsd_ui_review_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ui-review/SKILL.md:L1
- "gsd_ultraplan_phase": "ultraplan-phase.md" | kind=entity | source=.claude/commands/gsd/ultraplan-phase.md:L1

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-406.json

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
