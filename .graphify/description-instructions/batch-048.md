# Node Description Batch 49 of 49

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

- "file_command_palette_tsx": "CommandPalette.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/CommandPalette.tsx
- "file_hr_page_tsx": "hr/page.tsx" | kind=code-symbol | source=tech-pwa/src/app/hr/page.tsx
- "file_job_detail_modal_tsx": "JobDetailModal.tsx" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx
- "file_job_page_tsx": "job/[jobId]/page.tsx" | kind=code-symbol | source=tech-pwa/src/app/job/[jobId]/page.tsx
- "file_spec_p2_2": "SPEC_P2_2_COMPLIANCE_ACTIVATION.md" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md
- "file_sprint_8_cf": "SPRINT_8_CF_WORKER_TECHPWA.md" | kind=entity | source=specs/SPRINT_8_CF_WORKER_TECHPWA.md
- "file_sprint_adw": "SPRINT_ADW_FLAG_GATE_AND_HOOKS.md" | kind=entity | source=specs/SPRINT_ADW_FLAG_GATE_AND_HOOKS.md
- "file_svg": "file.svg" | kind=entity | source=tech-pwa/public/file.svg
- "file_time_off_page_tsx": "time-off/page.tsx" | kind=code-symbol | source=tech-pwa/src/app/time-off/page.tsx
- "file_weekly_schedule_page_tsx": "weekly-schedule/page.tsx" | kind=code-symbol | source=tech-pwa/src/app/weekly-schedule/page.tsx
- "globe_icon": "Globe Icon (SVG)" | kind=entity | source=tech-pwa/public/globe.svg
- "icon_png_apt_maintenance_logo": "APT Maintenance Logo" | kind=entity | source=tech-pwa/src/app/icon.png
- "n8n_version_control": "n8n Version Control" | kind=entity | source=tools/n8n/README.md
- "next_svg": "Next.js Logo" | kind=entity | source=tech-pwa/public/next.svg
- "SchedulePageComponents": "Schedule Page Components" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx
- "sentinel_spec_architect": "Sentinel Spec Architect" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js
- "sprint_p3_5_gas_bridge_cleanup_md": "SPRINT P3-5 GAS Bridge Cleanup" | kind=entity | source=specs/SPRINT_P3_5_GAS_BRIDGE_CLEANUP.md
- "sprint_tier_2_5_security_md": "SPRINT TIER 2.5 Security" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md
- "tech_pwa_api_spec_md": "TECH PWA API Spec" | kind=entity | source=specs/TECH_PWA_API_SPEC.md
- "vercel_svg_vercel_logo": "Vercel Logo" | kind=entity | source=tech-pwa/public/vercel.svg
- "window_svg": "Window Icon" | kind=entity | source=public/window.svg

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-048.json

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
