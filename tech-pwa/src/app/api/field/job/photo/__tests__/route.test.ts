import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { NextRequest } from 'next/server';
import { db } from '../../../../../../lib/db';
import { employees, jobPhotos } from '../../../../../../lib/schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';
import { POST } from '../route';

describe('POST /api/field/job/photo', () => {
  const testToken = crypto.randomUUID();
  const testTokenHash = crypto.createHash('sha256').update(testToken).digest('hex');
  const employeeBadge = 'TEST_PHOTO_TECH';
  let testEmployeeId: number;

  beforeAll(async () => {
    // Idempotent: remove stale records from any prior aborted run
    const stale = await db.select({ id: employees.id })
      .from(employees).where(eq(employees.badge, employeeBadge)).limit(1);
    if (stale[0]) {
      await db.delete(jobPhotos).where(eq(jobPhotos.employeeId, stale[0].id));
      await db.delete(employees).where(eq(employees.badge, employeeBadge));
    }

    const [emp] = await db.insert(employees).values({
      badge: employeeBadge,
      name: 'Test Tech Photo',
      role: 'Tech',
      sessionToken: testTokenHash,
      tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
      isActive: true,
      orgId: 'APT-CA',
    }).returning();
    testEmployeeId = emp.id;
  });

  afterAll(async () => {
    await db.delete(jobPhotos).where(eq(jobPhotos.employeeId, testEmployeeId));
    await db.delete(employees).where(eq(employees.badge, employeeBadge));
  });

  it('POST with valid session → 200 and row inserted in job_photos', async () => {
    const req = new NextRequest('http://localhost/api/field/job/photo', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${testToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        jobId: 99999,
        photoType: 'before',
        photoBase64: 'data:image/jpeg;base64,abc123',
        fileName: 'test-photo.jpg',
      }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.photoId).toBeDefined();

    // Verify DB row
    const dbPhoto = await db.select().from(jobPhotos)
      .where(eq(jobPhotos.id, json.photoId as number))
      .limit(1);
    expect(dbPhoto[0]).toBeDefined();
    expect(dbPhoto[0].jobId).toBe(99999);
    expect(dbPhoto[0].photoType).toBe('before');
    expect(dbPhoto[0].employeeId).toBe(testEmployeeId);
  });

  it('POST with no Authorization header → 401', async () => {
    const req = new NextRequest('http://localhost/api/field/job/photo', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        jobId: 1,
        photoType: 'before',
        photoBase64: 'abc',
        fileName: 'f.jpg',
      }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json.success).toBe(false);
  });
});
