# Node Description Batch 222 of 412

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

- "github_skills_impeccable_reference_animate_md_reference_animate_entrance_animations": "Entrance Animations" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L51 | neighbors=[Implement Animations]
- "github_skills_impeccable_reference_animate_md_reference_animate_feedback_guidance": "Feedback & Guidance" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L83 | neighbors=[Implement Animations]
- "github_skills_impeccable_reference_animate_md_reference_animate_javascript_animation": "JavaScript Animation" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L133 | neighbors=[Technical Implementation]
- "github_skills_impeccable_reference_animate_md_reference_animate_micro_interactions": "Micro-interactions" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L58 | neighbors=[Implement Animations]
- "github_skills_impeccable_reference_animate_md_reference_animate_motion_materials": "Motion Materials" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L141 | neighbors=[Technical Implementation]
- "github_skills_impeccable_reference_animate_md_reference_animate_navigation_flow": "Navigation & Flow" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L77 | neighbors=[Implement Animations]
- "github_skills_impeccable_reference_animate_md_reference_animate_perceived_performance": "Perceived Performance" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L160 | neighbors=[Technical Implementation]
- "github_skills_impeccable_reference_animate_md_reference_animate_performance": "Performance" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L153 | neighbors=[Technical Implementation]
- "github_skills_impeccable_reference_animate_md_reference_animate_plan_animation_strategy": "Plan Animation Strategy" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L36 | neighbors=[animate.md]
- "github_skills_impeccable_reference_animate_md_reference_animate_register": "Register" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L7 | neighbors=[animate.md]
- "github_skills_impeccable_reference_animate_md_reference_animate_state_transitions": "State Transitions" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L70 | neighbors=[Implement Animations]
- "github_skills_impeccable_reference_animate_md_reference_animate_timing_easing": "Timing & Easing" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L99 | neighbors=[Technical Implementation]
- "github_skills_impeccable_reference_animate_md_reference_animate_verify_quality": "Verify Quality" | kind=entity | source=.github/skills/impeccable/reference/animate.md:L190 | neighbors=[animate.md]
- "github_skills_impeccable_reference_audit_md_reference_audit_1_accessibility_a11y": "1. Accessibility (A11y)" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L9 | neighbors=[Diagnostic Scan]
- "github_skills_impeccable_reference_audit_md_reference_audit_2_performance": "2. Performance" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L21 | neighbors=[Diagnostic Scan]
- "github_skills_impeccable_reference_audit_md_reference_audit_3_theming": "3. Theming" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L32 | neighbors=[Diagnostic Scan]
- "github_skills_impeccable_reference_audit_md_reference_audit_4_responsive_design": "4. Responsive Design" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L42 | neighbors=[Diagnostic Scan]
- "github_skills_impeccable_reference_audit_md_reference_audit_5_anti_patterns_critical": "5. Anti-Patterns (CRITICAL)" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L53 | neighbors=[Diagnostic Scan]
- "github_skills_impeccable_reference_audit_md_reference_audit_anti_patterns_verdict": "Anti-Patterns Verdict" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L74 | neighbors=[Generate Report]
- "github_skills_impeccable_reference_audit_md_reference_audit_audit_health_score": "Audit Health Score" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L61 | neighbors=[Generate Report]
- "github_skills_impeccable_reference_audit_md_reference_audit_detailed_findings_by_severity": "Detailed Findings by Severity" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L83 | neighbors=[Generate Report]
- "github_skills_impeccable_reference_audit_md_reference_audit_executive_summary": "Executive Summary" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L77 | neighbors=[Generate Report]
- "github_skills_impeccable_reference_audit_md_reference_audit_patterns_systemic_issues": "Patterns & Systemic Issues" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L100 | neighbors=[Generate Report]
- "github_skills_impeccable_reference_audit_md_reference_audit_positive_findings": "Positive Findings" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L106 | neighbors=[Generate Report]
- "github_skills_impeccable_reference_audit_md_reference_audit_recommended_actions": "Recommended Actions" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L110 | neighbors=[audit.md]
- "github_skills_impeccable_reference_bolder_md_reference_bolder_assess_current_state": "Assess Current State" | kind=entity | source=.github/skills/impeccable/reference/bolder.md:L13 | neighbors=[bolder.md]
- "github_skills_impeccable_reference_bolder_md_reference_bolder_color_intensification": "Color Intensification" | kind=entity | source=.github/skills/impeccable/reference/bolder.md:L58 | neighbors=[Amplify the Design]
- "github_skills_impeccable_reference_bolder_md_reference_bolder_composition_boldness": "Composition Boldness" | kind=entity | source=.github/skills/impeccable/reference/bolder.md:L86 | neighbors=[Amplify the Design]
- "github_skills_impeccable_reference_bolder_md_reference_bolder_motion_animation": "Motion & Animation" | kind=entity | source=.github/skills/impeccable/reference/bolder.md:L80 | neighbors=[Amplify the Design]
- "github_skills_impeccable_reference_bolder_md_reference_bolder_plan_amplification": "Plan Amplification" | kind=entity | source=.github/skills/impeccable/reference/bolder.md:L37 | neighbors=[bolder.md]
- "github_skills_impeccable_reference_bolder_md_reference_bolder_register": "Register" | kind=entity | source=.github/skills/impeccable/reference/bolder.md:L5 | neighbors=[bolder.md]
- "github_skills_impeccable_reference_bolder_md_reference_bolder_spatial_drama": "Spatial Drama" | kind=entity | source=.github/skills/impeccable/reference/bolder.md:L66 | neighbors=[Amplify the Design]
- "github_skills_impeccable_reference_bolder_md_reference_bolder_typography_amplification": "Typography Amplification" | kind=entity | source=.github/skills/impeccable/reference/bolder.md:L52 | neighbors=[Amplify the Design]
- "github_skills_impeccable_reference_bolder_md_reference_bolder_verify_quality": "Verify Quality" | kind=entity | source=.github/skills/impeccable/reference/bolder.md:L100 | neighbors=[bolder.md]
- "github_skills_impeccable_reference_bolder_md_reference_bolder_visual_effects": "Visual Effects" | kind=entity | source=.github/skills/impeccable/reference/bolder.md:L73 | neighbors=[Amplify the Design]
- "github_skills_impeccable_reference_brand_md_reference_brand": "brand.md" | kind=entity | source=.github/skills/impeccable/reference/brand.md:L1 | neighbors=[Brand register]
- "github_skills_impeccable_reference_brand_md_reference_brand_brand_bans_on_top_of_the_shared_absolute_bans": "Brand bans (on top of the shared absolute bans)" | kind=entity | source=.github/skills/impeccable/reference/brand.md:L90 | neighbors=[Brand register]
- "github_skills_impeccable_reference_brand_md_reference_brand_brand_permissions": "Brand permissions" | kind=entity | source=.github/skills/impeccable/reference/brand.md:L101 | neighbors=[Brand register]
- "github_skills_impeccable_reference_brand_md_reference_brand_color": "Color" | kind=entity | source=.github/skills/impeccable/reference/brand.md:L56 | neighbors=[Brand register]
- "github_skills_impeccable_reference_brand_md_reference_brand_font_selection_procedure": "Font selection procedure" | kind=entity | source=.github/skills/impeccable/reference/brand.md:L19 | neighbors=[Typography]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-221.json

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
