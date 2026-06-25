# Node Description Batch 76 of 412

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

- "exec_route_handleget": "handleGet()" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L59 | neighbors=[route.ts, GET()]
- "exec_route_handlepost": "handlePost()" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L76 | neighbors=[route.ts, POST()]
- "file_hr_page_tsx": "hr/page.tsx" | kind=code-symbol | source=tech-pwa/src/app/hr/page.tsx | neighbors=[Time Off Manager, Supervisor Timecard Approval]
- "file_sprint_8_cf": "SPRINT_8_CF_WORKER_TECHPWA.md" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md | neighbors=[TechPWA CF Worker Proxy, SPRINT 8 — Cloudflare Worker: TechPWA.g…]
- "fix_techs_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/fix-techs/route.ts:L43 | neighbors=[route.ts, normalizeName()]
- "fix_techs_route_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/src/app/api/fix-techs/route.ts:L6 | neighbors=[route.ts, GET()]
- "github_scripts_changeset_readme_md_changeset_readme_changeset_release_notes_tooling": "changeset/ — release-notes tooling" | kind=entity | source=.github/scripts/changeset/README.md:L1 | neighbors=[README.md, `cli.cjs extract`]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_reference_material": "Reference Material" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L194 | neighbors=[adapt.md, Responsive Design]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_loading_states": "Loading States" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L111 | neighbors=[Improve Copy Systematically, UX Writing]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_reference_material": "Reference Material" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L178 | neighbors=[clarify.md, UX Writing]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_reference_material": "Reference Material" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L156 | neighbors=[colorize.md, Color & Contrast]
- "github_skills_archive_impeccable_reference_craft_md_reference_craft_step_4_build_to_production_quality": "Step 4: Build to Production Quality" | kind=entity | source=.github/skills_archive/impeccable/reference/craft.md:L77 | neighbors=[Craft Flow, Production bar]
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_recommended_actions": "Recommended Actions" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L210 | neighbors=[critique.md, Action Summary]
- "github_skills_archive_impeccable_reference_live_md_reference_live_handle_accept": "Handle `accept`" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L458 | neighbors=[live.md, Required after accept (carbonize)]
- "github_skills_archive_impeccable_reference_onboard_md_reference_onboard_implementation_patterns": "Implementation Patterns" | kind=entity | source=.github/skills_archive/impeccable/reference/onboard.md:L194 | neighbors=[onboard.md, Technical approaches:]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_phase_2_design_brief": "Phase 2: Design Brief" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L112 | neighbors=[shape.md, Brief Structure]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_reference_material": "Reference Material" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L128 | neighbors=[typeset.md, Typography]
- "github_skills_archive_impeccable_skill_md_impeccable_skill_commands": "Commands" | kind=entity | source=.github/skills_archive/impeccable/SKILL.md:L99 | neighbors=[SKILL.md, Routing rules]
- "github_skills_archive_impeccable_skill_md_impeccable_skill_new_projects_only_when_no_prior_work_exists": "New projects only (when no prior work exists)" | kind=entity | source=.github/skills_archive/impeccable/SKILL.md:L63 | neighbors=[Design guidance, Color & Theme]
- "github_skills_impeccable_reference_adapt_md_reference_adapt_reference_material": "Reference Material" | kind=entity | source=.github/skills/impeccable/reference/adapt.md:L194 | neighbors=[adapt.md, Responsive Design]
- "github_skills_impeccable_reference_clarify_md_reference_clarify_loading_states": "Loading States" | kind=entity | source=.github/skills/impeccable/reference/clarify.md:L111 | neighbors=[Improve Copy Systematically, UX Writing]
- "github_skills_impeccable_reference_clarify_md_reference_clarify_reference_material": "Reference Material" | kind=entity | source=.github/skills/impeccable/reference/clarify.md:L178 | neighbors=[clarify.md, UX Writing]
- "github_skills_impeccable_reference_colorize_md_reference_colorize_reference_material": "Reference Material" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L156 | neighbors=[colorize.md, Color & Contrast]
- "github_skills_impeccable_reference_craft_md_reference_craft_step_4_build_to_production_quality": "Step 4: Build to Production Quality" | kind=entity | source=.github/skills/impeccable/reference/craft.md:L77 | neighbors=[Craft Flow, Production bar]
- "github_skills_impeccable_reference_critique_md_reference_critique_recommended_actions": "Recommended Actions" | kind=entity | source=.github/skills/impeccable/reference/critique.md:L210 | neighbors=[critique.md, Action Summary]
- "github_skills_impeccable_reference_live_md_reference_live_handle_accept": "Handle `accept`" | kind=entity | source=.github/skills/impeccable/reference/live.md:L458 | neighbors=[live.md, Required after accept (carbonize)]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_implementation_patterns": "Implementation Patterns" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L194 | neighbors=[onboard.md, Technical approaches:]
- "github_skills_impeccable_reference_shape_md_reference_shape_phase_2_design_brief": "Phase 2: Design Brief" | kind=entity | source=.github/skills/impeccable/reference/shape.md:L112 | neighbors=[shape.md, Brief Structure]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_reference_material": "Reference Material" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L128 | neighbors=[typeset.md, Typography]
- "github_skills_impeccable_skill_md_impeccable_skill_commands": "Commands" | kind=entity | source=.github/skills/impeccable/SKILL.md:L99 | neighbors=[SKILL.md, Routing rules]
- "github_skills_impeccable_skill_md_impeccable_skill_new_projects_only_when_no_prior_work_exists": "New projects only (when no prior work exists)" | kind=entity | source=.github/skills/impeccable/SKILL.md:L63 | neighbors=[Design guidance, Color & Theme]
- "gmail_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/webhooks/n8n/gmail/route.ts:L27 | neighbors=[route.ts, gmail.webhook.post.test.ts]
- "graphify_skill_troubleshooting": "Troubleshooting" | kind=entity | source=.github/skills/graphify/SKILL.md:L631 | neighbors=[/graphify, PowerShell 5.1: Vertical scrolling stop…]
- "gsd_workstreams_skill_usage": "Usage" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L12 | neighbors=[/gsd-workstreams, Subcommands]
- "gsd_workstreams_usage": "Usage" | kind=entity | source=.claude/commands/gsd/workstreams.md:L14 | neighbors=[/gsd-workstreams, Subcommands]
- "guides_deployment_gas_root_project_lead_parsing": "GAS — Root Project (Lead Parsing)" | kind=entity | source=docs/guides/deployment.md:L79 | neighbors=[Deployment, Rollback]
- "health_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/health/route.ts:L7 | neighbors=[route.ts, sql]
- "hooks_gsd_statusline_composestatusline": "composeStatusline()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L474 | neighbors=[gsd-statusline.js, renderStatusline()]
- "hooks_gsd_statusline_evaluateupdatecache": "evaluateUpdateCache()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L508 | neighbors=[gsd-statusline.js, isInstalledAheadOfLatest()]
- "hooks_gsd_statusline_getconfigvalue": "getConfigValue()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L41 | neighbors=[gsd-statusline.js, renderStatusline()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-075.json

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
