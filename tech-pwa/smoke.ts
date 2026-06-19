import { config } from 'dotenv';
config({ path: '.env.local' });
process.env.DATABASE_URL = process.env.DATABASE_URL_UNPOOLED;
import { db } from './src/lib/db';
import { jobs } from './src/lib/schema';
import { computeDashboardStats } from './src/lib/dal/mappers';

async function main() {
  const dbJobs = await db.select().from(jobs);
  
  // Minimal mapping for stats
  const allJobs = dbJobs.map(j => ({
    status: j.status || 'Needs Review',
    priority: j.priority || '4-STANDARD',
    scheduledDate: j.scheduledDate || '',
  }));

  const filteredJobs = allJobs.filter(j => j.status !== 'Archived' && j.status !== 'Complete');

  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const todayStr = formatter.format(now);

  const stats = computeDashboardStats(allJobs as any, todayStr);

  console.log("=== DB COUNTS ===");
  console.log(`Total jobs in DB: ${dbJobs.length}`);
  
  const manualNewLeads = allJobs.filter(j => j.status !== 'Archived' && j.status !== 'Complete' && j.status === 'Needs Review').length;
  const manualBlocked = allJobs.filter(j => j.status !== 'Archived' && j.status !== 'Complete' && (j.status === 'PTE Required' || j.status === 'Awaiting Approval')).length;
  const manualReady = allJobs.filter(j => j.status !== 'Archived' && j.status !== 'Complete' && j.status === 'Ready to Schedule').length;
  const manualCompletedToday = allJobs.filter(j => j.status === 'Complete' && j.scheduledDate === todayStr).length;

  console.log("New Leads:");
  console.log("  Expected (manual filter):", manualNewLeads);
  console.log("  Actual (stats object):   ", stats.urgentCount);

  console.log("Blocked:");
  console.log("  Expected (manual filter):", manualBlocked);
  console.log("  Actual (stats object):   ", stats.needsActionCount);

  console.log("Ready to Dispatch:");
  console.log("  Expected (manual filter):", manualReady);
  console.log("  Actual (stats object):   ", stats.ptePendingCount);

  console.log("Completed Today:");
  console.log("  Expected (manual filter):", manualCompletedToday);
  console.log("  Actual (stats object):   ", stats.doneThisWeekCount);
}

main().catch(console.error);
