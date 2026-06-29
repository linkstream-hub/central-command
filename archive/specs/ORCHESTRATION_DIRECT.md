# SPEC: Direct Agent Orchestration (No-Relay Workflow)
# Status: READY — no code required, workflow change only
# Author: Claude Code — Session 106

---

## Problem

The current AG ↔ Claude Code workflow routes all communication through Brandon:

```
Claude Code → [Brandon copy-pastes] → AG → [Brandon copy-pastes] → Claude Code
```

Brandon is the message bus. This adds friction, delays, and context loss on every handoff.

## Solution

Claude Code already has an `Agent` tool that spawns sub-agents with full filesystem access. Sub-agent output returns directly to Claude Code — no relay. Brandon drops out of the loop for implementation work.

```
Claude Code → Agent(task) → [sub-agent works] → result → Claude Code
```

Brandon's touchpoints reduce to: secrets into dashboards, PR approval in GitHub.

---

## When to Use Direct Orchestration

| Sprint type | Use direct orchestration? | Why |
|---|---|---|
| Code implementation (write, tsc, commit, diff) | ✅ Yes | Fully automatable |
| Playwright E2E test run | ✅ Yes | Fully automatable |
| Seed script execution | ✅ Yes | Fully automatable |
| Schema migrations | ✅ Yes | Fully automatable |
| Browser-based manual testing (DevTools, network tab) | ❌ No | Requires human with browser |
| Secret injection (Vercel, Railway dashboards) | ❌ No | Brandon is account holder |
| High-level decisions ("should we pivot?") | ❌ No | Brandon is Mission Commander |

---

## How Claude Code Invokes a Sub-Agent

### Implement sprint
```
Agent(
  subagent_type: "general-purpose",
  description: "Implement [sprint name]",
  prompt: """
    Working directory: A:/PTOW/1_APT_Central_Command
    Branch: feat/[name] (verify with git branch --show-current before any work)

    Spec: [paste full task list from spec]

    REQUIRED DELIVERABLES — return all of these in your final message:
    1. git log main..HEAD --oneline output (must show commits)
    2. npx tsc --noEmit output (must be empty / zero errors)
    3. Absolute path to artifacts/ag_diff.txt
    4. wc -l artifacts/ag_diff.txt output (must be non-zero)
    5. Any flagged items per CLAUDE.md gates (auth patterns, schema changes, cross-system writes)

    STOP RULES — stop immediately and return 'BLOCKED: [reason]' if:
    - tsc has errors
    - You need to touch a file not listed in the spec scope
    - You encounter an auth pattern, schema change, or cross-system write
    - git branch --show-current does not match the spec branch
  """
)
```

### Test sprint
```
Agent(
  subagent_type: "general-purpose",
  description: "Test sprint [name]",
  prompt: """
    Working directory: A:/PTOW/1_APT_Central_Command
    Branch: feat/[name]

    Run the test sprint for [sprint name]. The implementation is already merged/committed.

    REQUIRED DELIVERABLES:
    1. npx playwright test summary line (e.g. '42 passed (31s)') — literal output
    2. artifacts/ag_test_results.txt written with specific observed values:
       - HTTP status codes and response body excerpts for every new API endpoint
       - Specific IDs, job numbers, timestamps — not generic 'PASS'
    3. Dev server killed after testing

    STOP RULES — stop immediately and return 'BLOCKED: [reason]' if:
    - Any new test failure (regression) appears
    - An API returns unexpected status
    - DATABASE_URL is pointing to anything other than real Neon dev branch
  """
)
```

---

## Claude Code Review Gates (unchanged)

After the sub-agent returns, Claude Code runs the same DIFF GATES and TEST RESULT GATES as today (see `CLAUDE.md`). The gates don't change — only the delivery mechanism does.

If the agent returns `BLOCKED: [reason]`, Claude Code resolves the blocker and re-spawns the agent with corrected instructions.

---

## Brandon's Remaining Touchpoints

1. **Secrets** — type API keys, DSNs, webhook URLs into Vercel/Railway/GCP dashboards
2. **PR approval** — review and merge in GitHub after Claude Code issues "Clear to merge"
3. **Decisions** — state outcomes, approve pivots, answer domain questions

Everything else — git, npm, tsc, playwright, vercel deploy, diff review — happens inside the Claude Code ↔ Agent loop.

---

## Limitations

- **Google OAuth flows are not automatable.** Playwright can handle everything except Google sign-in. Routes protected by Google OAuth (dispatch dashboard, `/live`, `/schedule`) require a real session cookie or a service account — neither of which is safe to inject into automated tests. Dispatch-facing flows in validation sprints must be tested manually or via direct API calls with the appropriate auth header.

- **Agents don't persist state between spawns.** Each Agent call starts fresh. For multi-stage work (implement → review → test), Claude Code spawns a new agent per stage and carries context between them in the prompt.

- **Sub-agents can't pause mid-task for interactive input.** If a task needs a decision mid-stream, the agent must stop and return. Claude Code resolves, re-spawns.

## What Playwright Handles Automatically

Everything else — including mobile PWA testing — is fully automatable:
- Mobile viewport emulation (`devices['iPhone 12 Pro']`)
- Badge/PIN login flows
- Network request interception (`page.on('response', ...)`) for status codes and response bodies
- UI state assertions after each action
- Clock-in, break, job-complete, clock-out flows
- Screenshot capture for evidence

---

## Activation

No code changes required. Claude Code begins using the `Agent` tool for implementation and test sprints starting next session. Brandon's role shifts to: approve the task list, handle secrets/PR, decide outcomes. The relay disappears.

---

*Spec complete. Fold into WORKFLOW.md once validated in practice.*
