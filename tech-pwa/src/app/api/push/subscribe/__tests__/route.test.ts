import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { NextRequest } from 'next/server';
import { db } from '../../../../../lib/db';
import { employees, pushSubscriptions } from '../../../../../lib/schema';
import { eq, and } from 'drizzle-orm';
import * as crypto from 'crypto';
import { POST } from '../route';

describe('POST /api/push/subscribe', () => {
  const testToken = crypto.randomUUID();
  const testTokenHash = crypto.createHash('sha256').update(testToken).digest('hex');
  const employeeBadge = 'TEST_PUSH_TECH';
  let testEmployeeId: number;
  const testEndpoint = `https://push.example.com/endpoint-${Date.now()}`;

  beforeAll(async () => {
    // Idempotent: remove stale records from any prior aborted run
    const stale = await db.select({ id: employees.id })
      .from(employees).where(eq(employees.badge, employeeBadge)).limit(1);
    if (stale[0]) {
      await db.delete(pushSubscriptions).where(eq(pushSubscriptions.employeeId, stale[0].id));
      await db.delete(employees).where(eq(employees.badge, employeeBadge));
    }

    const [emp] = await db.insert(employees).values({
      badge: employeeBadge,
      name: 'Test Tech Push',
      role: 'Tech',
      sessionToken: testTokenHash,
      tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
      isActive: true,
      orgId: 'APT-CA',
    }).returning();
    testEmployeeId = emp.id;
  });

  afterAll(async () => {
    await db.delete(pushSubscriptions).where(eq(pushSubscriptions.employeeId, testEmployeeId));
    await db.delete(employees).where(eq(employees.badge, employeeBadge));
  });

  function makeReq(endpoint: string) {
    return new NextRequest('http://localhost/api/push/subscribe', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${testToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        subscription: {
          endpoint,
          keys: { p256dh: 'test-p256dh-key', auth: 'test-auth-key' },
        },
      }),
    });
  }

  it('POST with valid session + valid subscription → 200', async () => {
    const res = await POST(makeReq(testEndpoint));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it('SELECT from pushSubscriptions WHERE endpoint → exactly 1 row', async () => {
    const rows = await db.select().from(pushSubscriptions).where(
      and(
        eq(pushSubscriptions.employeeId, testEmployeeId),
        eq(pushSubscriptions.endpoint, testEndpoint),
      ),
    );
    expect(rows.length).toBe(1);
    expect(rows[0].p256dh).toBe('test-p256dh-key');
  });

  it('upsert — second POST same endpoint → still exactly 1 row', async () => {
    // Second POST with updated keys
    const req2 = new NextRequest('http://localhost/api/push/subscribe', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${testToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        subscription: {
          endpoint: testEndpoint,
          keys: { p256dh: 'updated-p256dh', auth: 'updated-auth' },
        },
      }),
    });
    await POST(req2);

    const rows = await db.select().from(pushSubscriptions).where(
      and(
        eq(pushSubscriptions.employeeId, testEmployeeId),
        eq(pushSubscriptions.endpoint, testEndpoint),
      ),
    );
    expect(rows.length).toBe(1);
    expect(rows[0].p256dh).toBe('updated-p256dh');
  });

  it('POST with no Authorization header → 401', async () => {
    const req = new NextRequest('http://localhost/api/push/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        subscription: { endpoint: 'x', keys: { p256dh: 'y', auth: 'z' } },
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });
});
