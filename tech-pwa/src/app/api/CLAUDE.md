# Gate: API Routes

Every `/api/` route requires BOTH checks — missing either is a security bug.

**Session check (office staff routes):**
```typescript
const session = await auth();
if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

**Dual auth (session OR internal API key):**
```typescript
const session = await auth();
const apiKey = req.headers.get('x-api-key');
if (!session && apiKey !== process.env.DASHBOARD_API_KEY) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

- `auth()` = `@/auth` (next-auth) — office staff pages
- Tech PWA routes (`/jobs`, `/job/[id]`, `/clock`) use `getSession()` from `@/lib/auth` instead — **never mix**
- New routes that touch auth / schema / column indexes / cross-system writes: flag to Claude Code before committing

> Ref: ADR-001, RULES.md §DUAL AUTH
