# Node Description Batch 335 of 412

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "hooks_gsd_workflow_guard_workflowguardenabled": "workflowGuardEnabled()" | kind=code-symbol | source=.claude/hooks/gsd-workflow-guard.js:L70 | neighbors=[gsd-workflow-guard.js]
- "hooks_gsd_worktree_path_guard_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L17 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_git": "git()" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L23 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_nearestexistingdir": "nearestExistingDir()" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L29 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L18 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_spawnopt": "SPAWNOPT" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L21 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_spawnsync": "{ spawnSync }" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L19 | neighbors=[gsd-worktree-path-guard.js]
- "hooks_gsd_worktree_path_guard_stdintimeout": "stdinTimeout" | kind=code-symbol | source=.claude/hooks/gsd-worktree-path-guard.js:L41 | neighbors=[gsd-worktree-path-guard.js]
- "hours_page_myhourspage": "MyHoursPage()" | kind=code-symbol | source=tech-pwa/src/app/hours/page.tsx:L28 | neighbors=[page.tsx]
- "hours_page_timerecord": "TimeRecord" | kind=code-symbol | source=tech-pwa/src/app/hours/page.tsx:L8 | neighbors=[page.tsx]
- "hr_page_status_styles": "STATUS_STYLES" | kind=code-symbol | source=tech-pwa/src/app/hr/page.tsx:L20 | neighbors=[page.tsx]
- "i18n_index_locale": "Locale" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L7 | neighbors=[index.tsx]
- "i18n_index_localecontext": "LocaleContext" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L17 | neighbors=[index.tsx]
- "i18n_index_messages": "messages" | kind=code-symbol | source=tech-pwa/src/lib/i18n/index.tsx:L9 | neighbors=[index.tsx]
- "icon_png_apt_maintenance_logo": "APT Maintenance Logo" | kind=entity | source=tech-pwa/src/app/icon.png | neighbors=[APT Maintenance]
- "inbound_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/inbound/route.ts:L6 | neighbors=[route.ts]
- "intake_actions_resend": "resend" | kind=code-symbol | source=tech-pwa/src/app/intake/actions.ts:L9 | neighbors=[actions.ts]
- "intake_page_intakepage": "IntakePage()" | kind=code-symbol | source=tech-pwa/src/app/intake/page.tsx:L7 | neighbors=[page.tsx]
- "intel_page_intelcomingsoonpage": "IntelComingSoonPage()" | kind=code-symbol | source=tech-pwa/src/app/intel/page.tsx:L7 | neighbors=[page.tsx]
- "iterative_retrieval_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L1 | neighbors=[Iterative Retrieval Pattern]
- "iterative_retrieval_skill_best_practices": "Best Practices" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L199 | neighbors=[Iterative Retrieval Pattern]
- "iterative_retrieval_skill_example_1_bug_fix_context": "Example 1: Bug Fix Context" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L145 | neighbors=[Practical Examples]
- "iterative_retrieval_skill_example_2_feature_implementation": "Example 2: Feature Implementation" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L163 | neighbors=[Practical Examples]
- "iterative_retrieval_skill_integration_with_agents": "Integration with Agents" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L186 | neighbors=[Iterative Retrieval Pattern]
- "iterative_retrieval_skill_phase_1_dispatch": "Phase 1: DISPATCH" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L51 | neighbors=[The Solution: Iterative Retrieval]
- "iterative_retrieval_skill_phase_2_evaluate": "Phase 2: EVALUATE" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L67 | neighbors=[The Solution: Iterative Retrieval]
- "iterative_retrieval_skill_phase_3_refine": "Phase 3: REFINE" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L88 | neighbors=[The Solution: Iterative Retrieval]
- "iterative_retrieval_skill_phase_4_loop": "Phase 4: LOOP" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L115 | neighbors=[The Solution: Iterative Retrieval]
- "iterative_retrieval_skill_related": "Related" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L207 | neighbors=[Iterative Retrieval Pattern]
- "iterative_retrieval_skill_the_problem": "The Problem" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L19 | neighbors=[Iterative Retrieval Pattern]
- "iterative_retrieval_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L11 | neighbors=[Iterative Retrieval Pattern]
- "job_detail_page": "Job Detail Page" | kind=code-symbol | source=tech-pwa/src/app/job/[jobId]/page.tsx | neighbors=[Clocked In Bar]
- "job_job_state_applyevent": "applyEvent()" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L494 | neighbors=[job-state.ts]
- "job_job_state_declaresideeffects": "declareSideEffects()" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L545 | neighbors=[job-state.ts]
- "jobber": "Jobber" | kind=entity | source=docs/PRODUCT_VISION.md | neighbors=[ServiceTitan]
- "jobid_job_update_jobupdatebody": "JobUpdateBody" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/job-update.ts:L21 | neighbors=[job-update.ts]
- "jobid_job_update_jobupdateerror": "JobUpdateError" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/job-update.ts:L12 | neighbors=[job-update.ts]
- "jobid_job_update_jobupdatesuccess": "JobUpdateSuccess" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/job-update.ts:L17 | neighbors=[job-update.ts]
- "jobid_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/job-comments/[jobId]/route.ts:L49 | neighbors=[route.ts]
- "jobs_page_getprioritylabel": "getPriorityLabel()" | kind=code-symbol | source=tech-pwa/src/app/jobs/page.tsx:L34 | neighbors=[page.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-334.json

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
