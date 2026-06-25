# Node Description Batch 41 of 49

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "hooks_gsd_check_update_updatecachefilename": "{ updateCacheFileName }" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L11 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_worker_checklatestversion": "{ checkLatestVersion }" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L21 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L12 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_issemvernewer": "{ isSemverNewer }" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L14 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_managed_hooks": "MANAGED_HOOKS" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L29 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_package_name": "{ PACKAGE_NAME }" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L22 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L13 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_result": "result" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L97 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_stalehooks": "staleHooks" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L61 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_workerpath": "workerPath" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L53 | neighbors=[gsd-check-update.js]
- "hooks_gsd_config_reload_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-config-reload.js:L21 | neighbors=[gsd-config-reload.js]
- "hooks_gsd_config_reload_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-config-reload.js:L22 | neighbors=[gsd-config-reload.js]
- "hooks_gsd_config_reload_stdintimeout": "stdinTimeout" | kind=code-symbol | source=.claude/hooks/gsd-config-reload.js:L27 | neighbors=[gsd-config-reload.js]
- "hooks_gsd_context_monitor_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-context-monitor.js:L21 | neighbors=[gsd-context-monitor.js]
- "hooks_gsd_context_monitor_os": "os" | kind=code-symbol | source=.claude/hooks/gsd-context-monitor.js:L22 | neighbors=[gsd-context-monitor.js]
- "hooks_gsd_context_monitor_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-context-monitor.js:L23 | neighbors=[gsd-context-monitor.js]
- "hooks_gsd_context_monitor_spawn": "{ spawn }" | kind=code-symbol | source=.claude/hooks/gsd-context-monitor.js:L24 | neighbors=[gsd-context-monitor.js]
- "hooks_gsd_context_monitor_stdintimeout": "stdinTimeout" | kind=code-symbol | source=.claude/hooks/gsd-context-monitor.js:L36 | neighbors=[gsd-context-monitor.js]
- "hooks_gsd_cursor_post_tool_stdintimeout": "stdinTimeout" | kind=code-symbol | source=.claude/hooks/gsd-cursor-post-tool.js:L30 | neighbors=[gsd-cursor-post-tool.js]
- "hooks_gsd_cursor_session_start_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-cursor-session-start.js:L25 | neighbors=[gsd-cursor-session-start.js]
- "hooks_gsd_cursor_session_start_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-cursor-session-start.js:L26 | neighbors=[gsd-cursor-session-start.js]
- "hooks_gsd_cursor_session_start_stdintimeout": "stdinTimeout" | kind=code-symbol | source=.claude/hooks/gsd-cursor-session-start.js:L34 | neighbors=[gsd-cursor-session-start.js]
- "hooks_gsd_prompt_guard_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-prompt-guard.js:L14 | neighbors=[gsd-prompt-guard.js]
- "hooks_gsd_prompt_guard_injection_patterns": "INJECTION_PATTERNS" | kind=code-symbol | source=.claude/hooks/gsd-prompt-guard.js:L18 | neighbors=[gsd-prompt-guard.js]
- "hooks_gsd_prompt_guard_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-prompt-guard.js:L15 | neighbors=[gsd-prompt-guard.js]
- "hooks_gsd_prompt_guard_stdintimeout": "stdinTimeout" | kind=code-symbol | source=.claude/hooks/gsd-prompt-guard.js:L36 | neighbors=[gsd-prompt-guard.js]
- "hooks_gsd_read_guard_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-read-guard.js:L21 | neighbors=[gsd-read-guard.js]
- "hooks_gsd_read_guard_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-read-guard.js:L22 | neighbors=[gsd-read-guard.js]
- "hooks_gsd_read_guard_stdintimeout": "stdinTimeout" | kind=code-symbol | source=.claude/hooks/gsd-read-guard.js:L25 | neighbors=[gsd-read-guard.js]
- "hooks_gsd_read_injection_scanner_all_patterns": "ALL_PATTERNS" | kind=code-symbol | source=.claude/hooks/gsd-read-injection-scanner.js:L87 | neighbors=[gsd-read-injection-scanner.js]
- "hooks_gsd_read_injection_scanner_injection_patterns": "INJECTION_PATTERNS" | kind=code-symbol | source=.claude/hooks/gsd-read-injection-scanner.js:L70 | neighbors=[gsd-read-injection-scanner.js]
- "hooks_gsd_read_injection_scanner_isexcludedpath": "isExcludedPath()" | kind=code-symbol | source=.claude/hooks/gsd-read-injection-scanner.js:L89 | neighbors=[gsd-read-injection-scanner.js]
- "hooks_gsd_read_injection_scanner_markdown_link_patterns": "MARKDOWN_LINK_PATTERNS" | kind=code-symbol | source=.claude/hooks/gsd-read-injection-scanner.js:L45 | neighbors=[gsd-read-injection-scanner.js]
- "hooks_gsd_read_injection_scanner_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-read-injection-scanner.js:L19 | neighbors=[gsd-read-injection-scanner.js]
- "hooks_gsd_read_injection_scanner_stdintimeout": "stdinTimeout" | kind=code-symbol | source=.claude/hooks/gsd-read-injection-scanner.js:L103 | neighbors=[gsd-read-injection-scanner.js]
- "hooks_gsd_read_injection_scanner_summarisation_patterns": "SUMMARISATION_PATTERNS" | kind=code-symbol | source=.claude/hooks/gsd-read-injection-scanner.js:L23 | neighbors=[gsd-read-injection-scanner.js]
- "hooks_gsd_statusline_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L6 | neighbors=[gsd-statusline.js]
- "hooks_gsd_statusline_issemvernewer": "{ isSemverNewer }" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L9 | neighbors=[gsd-statusline.js]
- "hooks_gsd_statusline_os": "os" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L8 | neighbors=[gsd-statusline.js]
- "hooks_gsd_statusline_package_name_updatecachefilename": "{ PACKAGE_NAME, updateCacheFileName }" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L10 | neighbors=[gsd-statusline.js]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-040.json

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
