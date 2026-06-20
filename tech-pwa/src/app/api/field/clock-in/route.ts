import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { timeRecords, jobs } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import * as crypto from 'crypto';
import { ClockInSchema } from '@/lib/fieldSchemas';
import { createJobStateService, toJobId, toTechId } from '@/domain/job';
import { makeJobStateDAL } from '@/lib/dal/job-state-dal';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = ClockInSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { jobId, lat, lng } = parsed.data;
    const recordId = crypto.randomUUID();
    const now = new Date();
    const todayLA = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(now);

    // FSM transition — validates Scheduled → In Progress, writes status via DAL
    const svc = createJobStateService(makeJobStateDAL());
    const result = await svc.transition({
      type: 'CLOCK_IN',
      payload: {
        jobId: toJobId(jobId),
        techId: toTechId(session.badge),
        clockedInAt: now.toISOString(),
      },
    });

    if (!result.ok) {
      const { error } = result;
      if (error.code === 'JOB_NOT_FOUND')
        return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
      if (error.code === 'INVALID_TRANSITION')
        return NextResponse.json(
          { success: false, message: `Cannot clock in: job is currently ${error.from}` },
          { status: 409 }
        );
      return NextResponse.json({ success: false, message: 'Transition failed' }, { status: 400 });
    }

    // Execute START_TIME_RECORD side effect — insert time record
    await db.insert(timeRecords).values({
      recordId,
      jobId,
      techId: session.badge,
      techName: session.name,
      employeeId: session.employeeId,
      clockIn: now,
      status: 'active',
      date: todayLA,
      latIn: lat ?? null,
      lngIn: lng ?? null,
      orgId: 'APT-CA',
    });

    return NextResponse.json({ success: true, recordId, clockInTime: now.toISOString() });
  } catch (error) {
    console.error('clock-in error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
