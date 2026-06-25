# Node Description Batch 390 of 412

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

- "v1_0_cc_core_operational_roadmap": "ROADMAP.md" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/ROADMAP.md:L1 | neighbors=[Roadmap: APT Central Command — v1.0 CC …]
- "v1_0_cc_core_operational_roadmap_coverage": "Coverage" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/ROADMAP.md:L62 | neighbors=[Roadmap: APT Central Command — v1.0 CC …]
- "v1_0_cc_core_operational_roadmap_progress": "Progress" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/ROADMAP.md:L82 | neighbors=[Roadmap: APT Central Command — v1.0 CC …]
- "v1_0_cc_core_operational_state": "STATE.md" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/STATE.md:L1 | neighbors=[State — APT Central Command]
- "v1_0_cc_core_operational_state_blockers": "Blockers" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/STATE.md:L31 | neighbors=[State — APT Central Command]
- "v1_0_cc_core_operational_state_current_position": "Current Position" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/STATE.md:L18 | neighbors=[State — APT Central Command]
- "v1_0_cc_core_operational_state_key_decisions": "Key Decisions" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/STATE.md:L24 | neighbors=[State — APT Central Command]
- "v1_0_cc_core_operational_state_phase_history": "Phase History" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/STATE.md:L35 | neighbors=[State — APT Central Command]
- "verification_loop_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L1 | neighbors=[Verification Loop Skill]
- "verification_loop_skill_continuous_mode": "Continuous Mode" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L110 | neighbors=[Verification Loop Skill]
- "verification_loop_skill_integration_with_hooks": "Integration with Hooks" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L123 | neighbors=[Verification Loop Skill]
- "verification_loop_skill_output_format": "Output Format" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L88 | neighbors=[Verification Loop Skill]
- "verification_loop_skill_phase_1_build_verification": "Phase 1: Build Verification" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L21 | neighbors=[Verification Phases]
- "verification_loop_skill_phase_2_type_check": "Phase 2: Type Check" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L31 | neighbors=[Verification Phases]
- "verification_loop_skill_phase_3_lint_check": "Phase 3: Lint Check" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L42 | neighbors=[Verification Phases]
- "verification_loop_skill_phase_4_test_suite": "Phase 4: Test Suite" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L51 | neighbors=[Verification Phases]
- "verification_loop_skill_phase_5_security_scan": "Phase 5: Security Scan" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L66 | neighbors=[Verification Phases]
- "verification_loop_skill_phase_6_diff_review": "Phase 6: Diff Review" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L76 | neighbors=[Verification Phases]
- "verification_loop_skill_when_to_use": "When to Use" | kind=entity | source=.github/skills/ecc/verification-loop/SKILL.md:L11 | neighbors=[Verification Loop Skill]
- "weather_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/weather/route.ts:L3 | neighbors=[route.ts]
- "weekly_schedule_page_gettodayiso": "getTodayISO()" | kind=code-symbol | source=tech-pwa/src/app/weekly-schedule/page.tsx:L36 | neighbors=[page.tsx]
- "weekly_schedule_page_getweekdates": "getWeekDates()" | kind=code-symbol | source=tech-pwa/src/app/weekly-schedule/page.tsx:L11 | neighbors=[page.tsx]
- "weekly_schedule_page_weeklyschedulepage": "WeeklySchedulePage()" | kind=code-symbol | source=tech-pwa/src/app/weekly-schedule/page.tsx:L42 | neighbors=[page.tsx]
- "windows_desktop_e2e_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L1 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_add_stable_identifiers_to_qt_widgets": "Add Stable Identifiers to Qt Widgets" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L689 | neighbors=[Qt Specific]
- "windows_desktop_e2e_skill_anti_patterns": "Anti-Patterns" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L824 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_artifact_management": "Artifact Management" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L346 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_base_page_py": "base_page.py" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L123 | neighbors=[Page Object Model]
- "windows_desktop_e2e_skill_caveats": "Caveats" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L420 | neighbors=[Per-Step Trace (opt-in)]
- "windows_desktop_e2e_skill_ci_cd_integration": "CI/CD Integration" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L633 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_config_py": "config.py" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L290 | neighbors=[Page Object Model]
- "windows_desktop_e2e_skill_conftest_py": "conftest.py" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L248 | neighbors=[Page Object Model]
- "windows_desktop_e2e_skill_core_concepts": "Core Concepts" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L26 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_debugging_match_confidence": "Debugging Match Confidence" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L793 | neighbors=[Fallback: Screenshot Mode]
- "windows_desktop_e2e_skill_dpi_scaling_rules_screenshot_mode_only": "DPI / Scaling Rules (screenshot mode only)" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L783 | neighbors=[Fallback: Screenshot Mode]
- "windows_desktop_e2e_skill_enable": "Enable" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L373 | neighbors=[Per-Step Trace (opt-in)]
- "windows_desktop_e2e_skill_enable_uia_in_qt_5_x": "Enable UIA in Qt 5.x" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L672 | neighbors=[Qt Specific]
- "windows_desktop_e2e_skill_flaky_test_handling": "Flaky Test Handling" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L428 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_locator_strategy": "Locator Strategy" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L312 | neighbors=[Windows Desktop E2E Testing]
- "windows_desktop_e2e_skill_login_page_py": "login_page.py" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L215 | neighbors=[Page Object Model]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-389.json

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
