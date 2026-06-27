# GATES.md — APT Central Command
# Zero-trust merge checklist. Claude Code runs this before every "Clear to merge".
# One failure = BLOCK PR. No exceptions.
# Last updated: 2026-06-26

---

## PRE-MERGE CHECKLIST

### Gate 1 — Scope
- [ ] Only files listed in "Files allowed to change" were modified
- [ ] No adjacent cleanup, no unrelated refactors
- [ ] Every changed line traces directly to the Task Card

### Gate 2 — Secrets
- [ ] Zero hardcoded secrets, API keys, webhooks, or internal URLs in diff
- [ ] No `NEXT_PUBLIC_` prefix on server-only variables
- [ ] No secrets in comments or test fixtures

### Gate 3 — Auth
- [ ] Server-side validation present on all new/modified API routes
- [ ] No GAS in the permission path
- [ ] No localStorage for session tokens
- [ ] No `as any` on auth-related types

### Gate 4 — Tests
- [ ] RED failing test was posted before implementation started
- [ ] All 203+ tests pass (full suite GREEN)
- [ ] New behavior has at least one test covering it
- [ ] Bug fix has a test reproducing the original bug

### Gate 5 — Types
- [ ] `tsc` clean — zero errors
- [ ] No unjustified `as any` or `@ts-ignore`
- [ ] No `unknown` silently cast to typed

### Gate 6 — Deploy
- [ ] Migrations are atomic (if schema changed)
- [ ] Rollback plan documented in Task Card
- [ ] Preview build does not mutate production DB (until Phase 2 — manual check)
- [ ] No `TODO`, `FIXME`, or `HACK` in shipped code

### Gate 7 — Freeze
- [ ] No feature work (freeze is ACTIVE — Phase 0)
- [ ] Change is within approved recovery scope
- [ ] Task Card present and complete

### Gate 8 — External Dependencies
- [ ] All n8n node types verified (no unknown types)
- [ ] All env vars in diff are set in Vercel
- [ ] All API endpoints referenced in diff exist and are verified
- [ ] No unset credentials in n8n workflow changes

---

## VERDICT FORMAT

```
CLEAR TO MERGE — PR #[N] — all 8 gates pass
```

```
BLOCK — PR #[N] — Gate [N]: [specific finding at file:line]
```

Never issue "Clear to merge" without running every gate. Never issue a conditional "LGTM" — it's CLEAR or BLOCK, nothing in between.

---

## QUICK REFERENCE — CRITICAL RULES

```yaml
no_gas_in_auth: GAS must not be in any permission-check path
no_client_secrets: NEXT_PUBLIC_ = client bundle = exposed
no_localstorage_auth: localStorage tokens = XSS target
no_todo_in_ship: TODO/FIXME/HACK in shipped code = BLOCK
no_feature_during_freeze: freeze is ACTIVE
no_self_merge: no agent approves own PR
```
