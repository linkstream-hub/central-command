/**
 * Go-Live Validation — Test Data Seeder
 * Targets DATABASE_URL_PREVIEW (Neon preview branch).
 * Safe: uses fake emails only, no real client data.
 * Run: cd tech-pwa && npx tsx scripts/seed-test-data.ts
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { employees, jobs } from '../src/lib/schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function main() {
  const url = process.env.DATABASE_URL_PREVIEW;
  if (!url) {
    throw new Error('DATABASE_URL_PREVIEW not set in .env.local — cannot seed preview branch.');
  }

  const sql = neon(url);
  const db = drizzle(sql);

  // ── Test tech credentials ───────────────────────────────────────────────────
  const TEST_BADGE = 'T01';
  const TEST_PIN   = '1234';
  const TEST_NAME  = 'Test Tech (Validation)';

  // hashPin mirrors login/route.ts: sha256(pin)
  const pinHash = crypto.createHash('sha256').update(TEST_PIN).digest('hex');

  console.log(`[seed] Seeding test tech: badge=${TEST_BADGE}, pin=${TEST_PIN}`);
  console.log(`[seed] pinHash: ${pinHash}`);
  console.log(`[seed] Target DB: ${url.slice(0, 40)}...`);

  // ── Upsert test tech ────────────────────────────────────────────────────────
  const existing = await db.select().from(employees).where(eq(employees.badge, TEST_BADGE));

  let techId: number;
  if (existing.length > 0) {
    techId = existing[0].id;
    await db.update(employees)
      .set({ name: TEST_NAME, pinHash, orgId: 'APT-CA' })
      .where(eq(employees.badge, TEST_BADGE));
    console.log(`[seed] Updated existing tech id=${techId}`);
  } else {
    const inserted = await db.insert(employees).values({
      badge: TEST_BADGE,
      name: TEST_NAME,
      role: 'tech',
      orgId: 'APT-CA',
      pinHash,
    }).returning({ id: employees.id });
    techId = inserted[0].id;
    console.log(`[seed] Inserted new tech id=${techId}`);
  }

  // ── Upsert test job ─────────────────────────────────────────────────────────
  // Job is filtered by jobs.tech === session.badge (see /api/field/jobs/route.ts)
  // Uses fake emails only — no real RM or tenant data.

  const todayLA = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());

  const TEST_JOB_ID = 'TEST-V001';

  const existingJob = await db.select().from(jobs).where(eq(jobs.jobId, TEST_JOB_ID));

  if (existingJob.length > 0) {
    await db.update(jobs)
      .set({
        tech: TEST_BADGE,
        employeeId: techId,
        status: 'Scheduled',
        scheduledDate: todayLA,
      })
      .where(eq(jobs.jobId, TEST_JOB_ID));
    console.log(`[seed] Updated existing test job jobId=${TEST_JOB_ID}`);
  } else {
    await db.insert(jobs).values({
      jobId: TEST_JOB_ID,
      tech: TEST_BADGE,
      employeeId: techId,
      status: 'Scheduled',
      scheduledDate: todayLA,
      scheduledTime: '09:00',
      address: '123 Validation Test St',
      unit: 'Unit 1',
      rmName: 'Test RM',
      rmEmail: 'test-rm@test.local',
      tenantName: 'Test Tenant',
      tenantEmail: 'test-tenant@test.local',
      tenantPhone: '555-000-0000',
      priority: 'ROUTINE',
      emailType: 'GENERAL',
      category: 'GENERAL',
      orgId: 'APT-CA',
      notes: 'VALIDATION TEST JOB — safe to delete after go-live validation sprint',
    });
    console.log(`[seed] Inserted test job jobId=${TEST_JOB_ID}`);
  }

  console.log('[seed] Done. Test tech and job are in the preview Neon branch.');
  console.log(`[seed] Login credentials: badge=${TEST_BADGE}, pin=${TEST_PIN}`);
}

main().catch(err => {
  console.error('[seed] FAILED:', err);
  process.exit(1);
});
