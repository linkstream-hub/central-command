# Node Description Batch 185 of 412

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

- "code_tour_skill_narrative_shape": "Narrative Shape" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L167 | neighbors=[Code Tour]
- "code_tour_skill_pattern": "Pattern" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L141 | neighbors=[Step Types]
- "code_tour_skill_related_skills": "Related Skills" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L231 | neighbors=[Code Tour]
- "code_tour_skill_selection": "Selection" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L125 | neighbors=[Step Types]
- "code_tour_skill_uri": "URI" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L149 | neighbors=[Step Types]
- "code_tour_skill_when_not_to_use": "When NOT to Use" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L33 | neighbors=[Code Tour]
- "code_tour_skill_when_to_use": "When to Use" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L18 | neighbors=[Code Tour]
- "code_tour_skill_writing_rule_smig": "Writing Rule: SMIG" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L157 | neighbors=[Code Tour]
- "codebase_architecture": "architecture.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/architecture.md:L1 | neighbors=[Architecture Template]
- "codebase_architecture_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/architecture.md:L9 | neighbors=[Architecture Template]
- "codebase_concerns": "concerns.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/concerns.md:L1 | neighbors=[Codebase Concerns Template]
- "codebase_concerns_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/concerns.md:L9 | neighbors=[Codebase Concerns Template]
- "codebase_conventions": "conventions.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/conventions.md:L1 | neighbors=[Coding Conventions Template]
- "codebase_conventions_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/conventions.md:L9 | neighbors=[Coding Conventions Template]
- "codebase_integrations": "integrations.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/integrations.md:L1 | neighbors=[External Integrations Template]
- "codebase_integrations_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/integrations.md:L9 | neighbors=[External Integrations Template]
- "codebase_stack": "stack.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/stack.md:L1 | neighbors=[Technology Stack Template]
- "codebase_stack_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/stack.md:L9 | neighbors=[Technology Stack Template]
- "codebase_structure": "structure.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/structure.md:L1 | neighbors=[Structure Template]
- "codebase_structure_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/structure.md:L9 | neighbors=[Structure Template]
- "codebase_testing": "testing.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/testing.md:L1 | neighbors=[Testing Patterns Template]
- "codebase_testing_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/testing.md:L9 | neighbors=[Testing Patterns Template]
- "comms_route": "Comms Route" | kind=code-symbol | source=tech-pwa/src/app/api/comms/[jobId]/route.ts | neighbors=[Database Schema]
- "compliance_page_compliancedata": "ComplianceData" | kind=code-symbol | source=tech-pwa/src/app/compliance/page.tsx:L26 | neighbors=[page.tsx]
- "compliance_page_compliancepage": "CompliancePage()" | kind=code-symbol | source=tech-pwa/src/app/compliance/page.tsx:L37 | neighbors=[page.tsx]
- "compliance_page_timerecord": "TimeRecord" | kind=code-symbol | source=tech-pwa/src/app/compliance/page.tsx:L12 | neighbors=[page.tsx]
- "compliance_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/field/compliance/route.ts:L8 | neighbors=[route.ts]
- "compliance_status_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/dashboard/compliance-status/route.ts:L10 | neighbors=[route.ts]
- "components_bottomnav_bottomnavprops": "BottomNavProps" | kind=code-symbol | source=tech-pwa/src/components/BottomNav.tsx:L4 | neighbors=[BottomNav.tsx]
- "components_cameraupload_camerauploadprops": "CameraUploadProps" | kind=code-symbol | source=tech-pwa/src/components/CameraUpload.tsx:L9 | neighbors=[CameraUpload.tsx]
- "components_clockedinbar_clockedinbarprops": "ClockedInBarProps" | kind=code-symbol | source=tech-pwa/src/components/ClockedInBar.tsx:L12 | neighbors=[ClockedInBar.tsx]
- "components_installprompt_event": "Event" | kind=code-symbol | neighbors=[BeforeInstallPromptEvent]
- "components_installprompt_installprompt": "InstallPrompt()" | kind=code-symbol | source=tech-pwa/src/components/InstallPrompt.tsx:L11 | neighbors=[InstallPrompt.tsx]
- "components_skeleton_skeletonblock": "SkeletonBlock()" | kind=code-symbol | source=tech-pwa/src/components/Skeleton.tsx:L11 | neighbors=[Skeleton.tsx]
- "components_techloginview_techloginviewprops": "TechLoginViewProps" | kind=code-symbol | source=tech-pwa/src/components/TechLoginView.tsx:L5 | neighbors=[TechLoginView.tsx]
- "concept_apt_maintenance": "APT Maintenance" | kind=entity | source=tech-pwa/src/app/icon.png | neighbors=[APT Maintenance Logo]
- "concept_cf_worker_proxy": "TechPWA CF Worker Proxy" | kind=entity | neighbors=[SPRINT_8_CF_WORKER_TECHPWA.md]
- "concept_comms_regression": "Comms Original Email Regression" | kind=entity | neighbors=[SPRINT_CC_FULL_VALIDATION.md]
- "concept_event_bus": "Event Bus" | kind=entity | source=CONTEXT.md | neighbors=[Outbox]
- "concept_gmail_thread": "Gmail Thread UI" | kind=entity | source=specs/archive/ANTIGRAVITY_THREAD_CLEANUP_SPEC.md | neighbors=[JobDetailModal.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-184.json

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
