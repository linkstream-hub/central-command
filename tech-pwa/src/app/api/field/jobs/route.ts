import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { eq, or, and, notInArray, asc } from 'drizzle-orm';
import { verifyFieldSession } from '@/lib/fieldAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const todayLA = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date());

    const result = await db.select().from(jobs)
      .where(
        and(
          or(
            eq(jobs.employeeId, session.employeeId),
            eq(jobs.tech, session.badge)
          ),
          or(
            notInArray(jobs.status, ['Archived', 'Complete']),
            and(
              eq(jobs.status, 'Complete'),
              eq(jobs.scheduledDate, todayLA)
            )
          )
        )
      )
      .orderBy(asc(jobs.priority), asc(jobs.scheduledDate));

    return NextResponse.json({ success: true, jobs: result });
  } catch (error) {
    console.error('jobs error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
