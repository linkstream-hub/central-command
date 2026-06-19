import { db } from '@/lib/db';
import { jobs, commsMessages, employees } from '@/lib/schema';
import { like, eq } from 'drizzle-orm';

export const TEST_JOBS = [
  {
    jobId: 'TEST-1',
    timestamp: new Date(),
    priority: '4-STANDARD',
    emailType: 'inspection',
    category: 'Plumbing',
    address: '100 Test St',
    status: 'Ready to Schedule',
    tech: '',
    description: 'Test inspection 1'
  },
  {
    jobId: 'TEST-2',
    timestamp: new Date(),
    priority: '1-URGENT',
    emailType: 'turnover',
    category: 'Cleaning',
    address: '200 Test St',
    status: 'Ready to Schedule',
    tech: 'John Doe',
    description: 'Test turnover 1'
  },
  {
    jobId: 'TEST-3',
    timestamp: new Date(),
    priority: '2-PTE',
    emailType: 'service',
    category: 'Electrical',
    address: '300 Test St',
    status: 'Ready to Schedule',
    tech: 'Alice;Bob',
    description: 'Test service 1'
  },
  {
    jobId: 'TEST-4',
    timestamp: new Date(),
    priority: '4-STANDARD',
    emailType: 'inspection',
    category: 'Plumbing',
    address: '400 Test St',
    status: 'Ready to Schedule',
    tech: '',
    description: 'Test inspection 2'
  },
  {
    jobId: 'TEST-5',
    timestamp: new Date(),
    priority: '1-URGENT',
    emailType: 'turnover',
    category: 'Cleaning',
    address: '500 Test St',
    status: 'Ready to Schedule',
    tech: 'John Doe',
    description: 'Test turnover 2'
  },
  {
    jobId: 'TEST-6',
    timestamp: new Date(),
    priority: '2-PTE',
    emailType: 'service',
    category: 'Electrical',
    address: '600 Test St',
    status: 'Ready to Schedule',
    tech: 'Alice;Bob',
    description: 'Test service 2'
  },
  {
    jobId: 'TEST-7',
    timestamp: new Date(),
    priority: '4-STANDARD',
    emailType: 'inspection',
    category: 'Plumbing',
    address: '700 Test St',
    status: 'Needs Review',
    tech: '',
    description: 'Test needs review 1'
  },
  {
    jobId: 'TEST-8',
    timestamp: new Date(),
    priority: '1-URGENT',
    emailType: 'turnover',
    category: 'Cleaning',
    address: '800 Test St',
    status: 'Needs Review',
    tech: 'John Doe',
    description: 'Test needs review 2'
  },
  {
    jobId: 'TEST-9',
    timestamp: new Date(),
    priority: '2-PTE',
    emailType: 'service',
    category: 'Electrical',
    address: '900 Test St',
    status: 'Needs Review',
    tech: 'Alice;Bob',
    description: 'Test needs review 3'
  }
];

export async function seedFixtures() {
  console.log('🌱 Seeding test fixtures...');
  try {
    await db.delete(commsMessages).where(like(commsMessages.jobId, 'TEST-%')).execute();
    await db.delete(jobs).where(like(jobs.jobId, 'TEST-%')).execute();
    // Delete + reinsert test employees — ensures clean sessionToken/pinHash state on every run.
    // badge='1': used by auth.spec.ts browser UI flows (pressSequentially, form submit).
    // badge='99': used by request-fixture API tests (DISP-03, P3-4) — separate rate-limit
    //   counter prevents accumulation from UI-flow attempts blocking API-only tests in a
    //   single full-suite invocation when a reused dev server has rate-limiting active.
    await db.delete(employees).where(eq(employees.badge, '1')).execute();
    await db.insert(employees).values({
      name: 'Test Tech',
      badge: '1',
      role: 'tech',
      isActive: true,
    }).execute();
    await db.delete(employees).where(eq(employees.badge, '99')).execute();
    await db.insert(employees).values({
      name: 'Test Tech API',
      badge: '99',
      role: 'tech',
      isActive: true,
    }).execute();
    console.log('✅ Wiped test data.');

    for (const job of TEST_JOBS) {
      await db.insert(jobs).values(job).execute();
    }

    // Seed scheduled job for weekly-schedule E2E tests (7.1, 7.2)
    // Uses a real Neon tech name so the schedule grid row exists
    const todayLA = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date());
    await db.insert(jobs).values({
      jobId: 'TEST-SCHED',
      timestamp: new Date(),
      priority: '4-STANDARD',
      emailType: 'service',
      category: 'Plumbing',
      address: '240 Lakeshore Ave',
      status: 'Scheduled',
      tech: 'Cabrera, Salvador',
      scheduledDate: todayLA,
      scheduledTime: '09:00',
      description: 'Test scheduled job for weekly-schedule E2E tests',
    }).execute();

    // Insert unread tenant message for TEST-7
    await db.insert(commsMessages).values({
      jobId: 'TEST-7',
      messageId: 'TEST-MSG-1',
      direction: 'inbound',
      stakeholder: 'TENANT',
      bodyPreview: 'I will be home at 2pm tomorrow. You have my permission to enter.',
      sentAt: new Date()
    }).execute();

    console.log(`✅ Seeded ${TEST_JOBS.length} jobs and test messages.`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

export async function teardownFixtures() {
  console.log('🧹 Tearing down test fixtures...');
  try {
    await db.delete(commsMessages).where(like(commsMessages.jobId, 'TEST-%')).execute();
    await db.delete(jobs).where(like(jobs.jobId, 'TEST-%')).execute();
    console.log('✅ Database cleared.');
  } catch (error) {
    console.warn('⚠️ Teardown failed:', error);
  }
}
