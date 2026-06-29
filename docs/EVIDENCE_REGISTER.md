# Evidence Register

**Rule:** No agent may claim something works without an entry here.
**Format:** One row per verified claim. Evidence must be a link, output, query result, screenshot, or deployment log — not prose.

| Date | Claim | Evidence Type | Link / Output | Verified By | Re-validate By | Invalidation Triggers |
|---|---|---|---|---|---|---|
| 2026-06-28 | Cloudflare email intake operational | Commit | f0af7347 (WF-006 merged) | CC | 2026-07-28 | Any change to workers/email-intake/ |

---

## What Counts as Evidence

| Type | Acceptable | Not Acceptable |
|---|---|---|
| Test | CI run link + pass/fail output | "tests pass" |
| Deployment | Vercel deployment URL + health check | "deployed successfully" |
| DB state | Query result with row counts | "data looks right" |
| Auth | Screenshot of auth flow working | "auth is fixed" |
| Integration | E2E Playwright run or log | "integration tested" |
| Sentry | Screenshot showing 0 new errors post-deploy | "no errors seen" |
| Rollback | Timed drill log (<5 min) | "rollback is possible" |

## Stale Evidence Protocol

- `Re-validate By` = 30 days default; reset to 7 days if schema/auth/workflow changes
- `Invalidation Triggers` = specific file/event that makes this claim untrue
- Monthly: CC scans for entries past `Re-validate By` date
- Stale entry = Task Card to refresh before phase gate can close
- "Evidence was valid when captured" ≠ "evidence is valid now"

---

## Architecture Names Are Not Evidence

These exist but are NOT proof of correct behavior:
- FSM exists ≠ FSM handles all transitions correctly
- EventBus exists ≠ events survive restart
- RBAC exists ≠ unauthorized users are blocked
- outbox table exists ≠ events are consumed
- test file exists ≠ behavior is verified
