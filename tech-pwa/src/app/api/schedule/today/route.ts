import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { and, eq, ne } from 'drizzle-orm';
import { mapNeonJobToJob } from '@/lib/job-mapper';
import type { Job } from '@/lib/types';

export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
    const today = formatter.format(new Date());

    const rows = await db.select().from(jobs).where(
      and(
        eq(jobs.scheduledDate, today),
        ne(jobs.status, 'Archived'),
        ne(jobs.status, 'Complete')
      )
    );

    const byTech: Record<string, Job[]> = {};
    const unassigned: Job[] = [];

    rows.forEach(row => {
      const job = mapNeonJobToJob(row);
      if (!row.tech) { unassigned.push(job); return; }
      const names = row.tech.includes(',')
        ? row.tech.split(',').map(n => n.trim()).filter(Boolean)
        : [row.tech];
      names.forEach(name => {
        if (!byTech[name]) byTech[name] = [];
        byTech[name].push(job);
      });
    });

    return NextResponse.json({ success: true, source: 'neon', date: today, byTech, unassigned });
  } catch (error) {
    console.error('[GET /api/schedule/today] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
