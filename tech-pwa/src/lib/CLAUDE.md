# Gate: Auth Split

Two auth systems. **Never mix them.** Wrong hook = redirect loop in production.

| Page zone | Hook | Session store |
|---|---|---|
| Office staff (`/`, `/live`, `/schedule`, `/people`, `/admin`, `/intel`, `/finance`) | `useSession()` from `next-auth/react` | Next-Auth JWT cookie |
| Tech PWA (`/jobs`, `/job/[jobId]`, `/clock`) | `getSession()` from `@/lib/auth` | localStorage `apt_tech_session` |

`RouteGuard.tsx` explicitly excludes TECH_ROUTES from the office guard — that split is load-bearing.

> Ref: ADR-001, RULES.md §AUTH HOOK RULE
