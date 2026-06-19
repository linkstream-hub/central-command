import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs, timeRecords } from '@/lib/schema';
import { and, eq, isNull, lte, isNotNull } from 'drizzle-orm';

export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    const [staleJobs, pendingTimecards] = await Promise.all([
      db.select({ jobId: jobs.jobId, address: jobs.address, timestamp: jobs.timestamp })
        .from(jobs)
        .where(and(
          eq(jobs.status, 'PTE Required'),
          lte(jobs.timestamp, threeDaysAgo),
        ))
        .limit(20),
      db.select({ recordId: timeRecords.recordId, techName: timeRecords.techName, clockIn: timeRecords.clockIn })
        .from(timeRecords)
        .where(and(
          isNotNull(timeRecords.clockOut),
          isNull(timeRecords.supervisorStatus),
        ))
        .limit(20),
    ]);

    const notifications = [
      ...staleJobs.map(j => ({
        id:        `stale-${j.jobId}`,
        type:      'STALE_JOB' as const,
        severity:  'warning' as const,
        title:     `Stale PTE Job: ${j.jobId}`,
        body:      `${j.address || 'Unknown address'} has been in PTE Required for 3+ days.`,
        timestamp: j.timestamp?.toISOString() || new Date().toISOString(),
        href:      '/live?tab=pte',
      })),
      ...pendingTimecards.map(r => ({
        id:        `tc-${r.recordId}`,
        type:      'TIMECARD_PENDING' as const,
        severity:  'info' as const,
        title:     `Timecard Pending: ${r.techName || 'Unknown Tech'}`,
        body:      `Time record from ${r.clockIn?.toLocaleDateString() || 'unknown date'} awaiting supervisor approval.`,
        timestamp: r.clockIn?.toISOString() || new Date().toISOString(),
        href:      '/hr?tab=timecards',
      })),
    ];

    return NextResponse.json({
      success: true, source: 'neon',
      notifications,
      unreadCount: notifications.length,
    });
  } catch (error) {
    console.error('[GET /api/notifications] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
