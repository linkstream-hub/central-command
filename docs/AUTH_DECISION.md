# AUTH_DECISION.md — Staff Authentication Vendor Decision
# Decided: 2026-06-29
# Decided by: Brandon Bittner (owner) + Claude Code (lead)
# Phase: 0 gate — required before Phase 1 security work begins

---

```yaml
decision: CLERK
status: FINAL
replaces: next-auth (current, to be removed in Phase 1)
cost: $0/mo (APT has ~41 users — well within free tier 50k MRU limit)
```

---

## Decision Rationale

| Factor | Clerk | Lucia |
|---|---|---|
| Cost at APT scale (~41 users) | $0 | $0 |
| Implementation effort | Low — managed service | High — build session mgmt, token rotation, revocation from scratch |
| next-auth removal | Clerk replaces it entirely | Must still remove next-auth AND build replacement |
| Maintenance burden | Zero — vendor owns auth bugs | Ongoing — we own all auth security |
| Session security | HTTP-Only cookies, sliding expiry, server-side revocation built-in | Must implement all manually |
| Risk | Low | Higher — we own auth attack surface |

Clerk wins on effort and security posture. At APT's scale, $0 cost makes it a strict improvement over building and maintaining custom auth.

---

## What Changes in Phase 1

1. **Remove next-auth** — completely, not alongside Clerk
2. **Install + configure Clerk** for staff dashboard auth
3. **Migrate staff sessions** — Clerk replaces all session management
4. **Verify**: unauthorized users blocked, disabled staff loses access immediately, logout invalidates token server-side

---

## What Does NOT Change

- Field tech auth (`apt_tech_session`) — this is a separate auth system, handled separately in Phase 1 (GAP-02: token rotation)
- Neon DB — no schema change required for Clerk (Clerk manages user store)

---

## Rollback Path

If Clerk integration fails during Phase 1:
1. Revert Clerk config commit
2. Re-enable next-auth temporarily (branch preserved)
3. Vercel Instant Rollback to pre-Phase-1 deployment
4. Root cause before retry

---

## Owner Impact

- Staff login flow will change (Clerk-hosted or embedded sign-in)
- No action required from Brandon during migration
- Zero cost impact at current scale

---

## Evidence Required Before Phase 1 Gate Closes

- [ ] Clerk dashboard: staff can log in (screenshot)
- [ ] Unauthorized user blocked at /dashboard (Playwright test)
- [ ] Disabled staff loses access within 1 request (test)
- [ ] next-auth fully removed: `grep -r "next-auth" tech-pwa/src` returns 0 results
- [ ] Sentry: 0 new auth errors 24h post-deploy
