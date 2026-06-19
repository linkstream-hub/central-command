import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { timeRecords, jobs, jobPerformanceHistory } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { eq } from 'drizzle-orm';
import { JobCompleteSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = JobCompleteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { recordId, jobId } = parsed.data;

    const now = new Date();

    await db.update(timeRecords)
      .set({ status: 'complete' })
      .where(eq(timeRecords.recordId, recordId));

    const jobList = await db.select().from(jobs).where(eq(jobs.jobId, jobId));
    if (jobList.length > 0) {
      const job = jobList[0];
      
      await db.update(jobs)
        .set({ status: 'Complete' })
        .where(eq(jobs.jobId, jobId));

      await db.insert(jobPerformanceHistory).values({
        jobId,
        employeeId: session.employeeId,
        techName: session.name,
        address: job.address,
        category: job.category,
        completedAt: now,
        orgId: 'APT-CA'
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('job complete error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
