# ADR-014: Domain Layer Boundary — `domain/` Directory + ESLint Enforcement

**Status:** Accepted  
**Date:** 2026-06-18  
**Deciders:** Brandon Bittner  

---

## Context

CC has 4 AI builders (Claude Code, AG, Codex, omp). Without a structurally enforced boundary, each builder follows the path of least resistance on every task — importing `next/headers` from service logic, adding DB calls to domain types, inserting side effects into transitions. No builder has persistent memory of architectural intent across sessions.

A naming convention is insufficient. Only a machine-enforced boundary (linter rule + directory structure) survives 4 independent agents working across multiple sprints.

---

## Decision

Introduce `tech-pwa/src/domain/` as the canonical location for pure business logic. Enforce the boundary via ESLint.

**Directory shape:**

```
tech-pwa/src/
├── domain/                  ← pure business logic only
│   ├── job/
│   │   ├── index.ts         ← narrow public API (re-exports only)
│   │   └── job-state.ts     ← JobStateService (ADR-010)
│   └── work-order/          ← future: WO intake domain logic
├── dal/                     ← DB access only, no business logic
├── lib/                     ← infra: auth, events, redis, http utils
├── app/                     ← Next.js routes (thin, delegate to domain)
└── components/
```

**Domain layer rules (enforced by ESLint):**

1. No imports from `next/*` (no `next/headers`, `next/server`, `next/navigation`, etc.)
2. No imports from `@/app/**` (no route handlers, no page components)
3. No direct Drizzle/DB calls — all DB access via injected DAL interface
4. No `console.log` — domain logic is silent; callers own observability
5. No side effects beyond returning `Result<T, E>`

**ESLint rule (`eslint-plugin-import` no-restricted-paths):**

```json
{
  "import/no-restricted-paths": [
    "error",
    {
      "zones": [
        {
          "target": "./src/domain",
          "from": ["./src/app", "next"],
          "message": "domain/ is framework-free. Move Next.js concerns to lib/ or app/."
        }
      ]
    }
  ]
}
```

**Public API pattern (Pocock deep-module principle):**

Each `domain/*/index.ts` exports a narrow public interface. Callers import from `@/domain/job`, never from `@/domain/job/job-state` directly. Internal files are the implementation; `index.ts` is the contract.

```ts
// domain/job/index.ts — narrow public API
export type { JobTransitionEvent, TransitionError } from './job-state'
export { JobStateService } from './job-state'
```

**DAL injection:**

`JobStateService` accepts a `DAL` interface, not a concrete import. This makes the domain layer testable without a real DB connection.

```ts
interface JobDAL {
  getJobById(id: JobId): Promise<Job | null>
  updateJobStatus(id: JobId, status: JobStatus, fields?: StatusFields): Promise<Job>
}

class JobStateService {
  constructor(private dal: JobDAL) {}
}
```

---

## What This ADR Does Not Change

- `lib/` remains for infrastructure shared across app and domain (auth utils, event bus client, Redis client)
- `dal/` remains the DB access layer — `domain/` depends on it via interface injection, not direct import
- Existing files in `lib/` are not moved retroactively — migration is incremental as phases execute

---

## Consequences

**Positive:**
- Any builder who violates the boundary gets an ESLint error with a clear message
- Domain logic is unit-testable without spinning up Next.js or Neon
- `design-an-interface` and `codebase-design` skills operate on `domain/` modules — narrow public API is the target
- Adding a new domain concept follows the same pattern: directory + index.ts + unit tests

**Negative / Constraints:**
- `eslint-plugin-import` must be added as a dev dependency before Phase 17 starts
- Phase 17 creates `domain/job/` — this is the first domain directory; the pattern is established here
- Existing fragmented logic (scattered across `lib/`, routes) is not moved in bulk — only new implementations land in `domain/`

---

## References

- ADR-010: `JobStateService` file location amended to `domain/job/job-state.ts`
- open-fsm: reference FSM implementation (same stack)
- Beveren FSM patterns: DAL boundary injection, test fixture builders
