import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { jobs } from '../src/lib/schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL not set');
if (url.includes('pooler.us-east') && !url.includes('dev')) {
  // Rough guard — flag if this looks like a production URL pattern
  throw new Error('SAFETY: DATABASE_URL does not look like a dev branch. Aborting.');
}

const sql = neon(url);
const db = drizzle(sql);

const STATUSES = [
  'Needs Review', 'Ready to Schedule', 'PTE Required',
  'Awaiting Approval', 'Scheduled', 'In Progress', 'Complete', 'Archived'
];

const PRIORITIES = ['URGENT', 'ROUTINE', 'STANDARD'];
const EMAIL_TYPES = ['GENERAL', 'TURNOVER', 'INSPECTION'];
const CATEGORIES = ['PLUMBING', 'ELECTRICAL', 'LANDSCAPING', 'CARPENTRY', 'HVAC', 'GENERAL'];

const ADDRESSES = [
  '65 Thornton Ave', '1420 Alice St', '500 Grand Ave', '120 Mission St',
  '880 Market St', '2200 Broadway', '411 Oakland Ave', '3300 Telegraph Ave',
  '750 Lakeshore Dr', '199 Fruitvale Ave', '5th & Madison', '920 MacArthur Blvd',
];

const RM_NAMES = ['Jan Blythe', 'David Park', 'Carla Reyes', 'Marcus Webb', 'Priya Nair'];
const TECHS = ['Robert Haile', 'Metkel Tecle', 'Keith Johnson', ''];

const DISTRIBUTION: { status: string; count: number }[] = [
  { status: 'Needs Review',       count: 6 },
  { status: 'Ready to Schedule',  count: 10 },
  { status: 'PTE Required',       count: 4 },
  { status: 'Awaiting Approval',  count: 3 },
  { status: 'Scheduled',          count: 8 },
  { status: 'In Progress',        count: 4 },
  { status: 'Complete',           count: 5 },
  { status: 'Archived',           count: 2 },
];

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

async function seed() {
  console.log('Truncating jobs table...');
  await sql`TRUNCATE TABLE jobs RESTART IDENTITY CASCADE`;

  const rows = [];
  let idx = 1;

  for (const { status, count } of DISTRIBUTION) {
    for (let i = 0; i < count; i++) {
      const isScheduled = ['Scheduled', 'In Progress', 'Complete', 'Archived'].includes(status);
      const address = pick(ADDRESSES);
      const tech = isScheduled ? pick(TECHS.filter(Boolean)) : '';
      rows.push({
        jobId:         `APT-SEED-${String(idx).padStart(4, '0')}`,
        priority:      pick(PRIORITIES),
        emailType:     pick(EMAIL_TYPES),
        category:      pick(CATEGORIES),
        address,
        unit:          `UNIT ${Math.floor(Math.random() * 20) + 1}`,
        description:   `${pick(CATEGORIES)} issue requires attention`,
        rmName:        pick(RM_NAMES),
        rmEmail:       `rm${idx}@laphamcompany.com`,
        tenantName:    `Tenant ${idx}`,
        tenantPhone:   `510-555-${String(1000 + idx).padStart(4, '0')}`,
        status,
        tech,
        scheduledDate: isScheduled ? '2026-05-19' : null,
        scheduledTime: isScheduled ? '09:00' : null,
        estHours:      pick([1, 2, 3, 4]),
        entityId:      'apt-ca',
        trackingToken: `seed-token-${idx}`,
      });
      idx++;
    }
  }

  console.log(`Inserting ${rows.length} jobs...`);
  await db.insert(jobs).values(rows);
  console.log('Seed complete.');
}

seed().catch(console.error);
