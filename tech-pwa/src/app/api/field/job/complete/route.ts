import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { timeRecords, jobs, jobPerformanceHistory } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { eq } from 'drizzle-orm';
import { JobCompleteSchema } from '@/lib/fieldSchemas';
import { createJobStateService, toJobId, toTechId } from '@/domain/job';
import { makeJobStateDAL } from '@/lib/dal/job-state-dal';

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

    // Fetch address + category for performance history (non-FSM fields)
    const jobRows = await db
      .select({ address: jobs.address, category: jobs.category })
      .from(jobs)
      .where(eq(jobs.jobId, jobId))
      .limit(1);
    if (!jobRows[0])
      return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });

    // FSM transition — validates In Progress → Complete, writes status via DAL
    const svc = createJobStateService(makeJobStateDAL());
    const result = await svc.transition({
      type: 'COMPLETE',
      payload: {
        jobId: toJobId(jobId),
        techId: toTechId(session.badge),
        attestedAt: now.toISOString(),
      },
    });

    if (!result.ok) {
      const { error } = result;
      if (error.code === 'JOB_NOT_FOUND')
        return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
      if (error.code === 'INVALID_TRANSITION')
        return NextResponse.json(
          { success: false, message: `Cannot complete: job is currently ${error.from}` },
          { status: 409 }
        );
      return NextResponse.json({ success: false, message: 'Transition failed' }, { status: 400 });
    }

    // Execute CLOSE_TIME_RECORD side effect
    await db.update(timeRecords)
      .set({ status: 'complete' })
      .where(eq(timeRecords.recordId, recordId));

    // Performance history
    await db.insert(jobPerformanceHistory).values({
      jobId,
      employeeId: session.employeeId,
      techName: session.name,
      address: jobRows[0].address,
      category: jobRows[0].category,
      completedAt: now,
      orgId: 'APT-CA',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('job complete error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
