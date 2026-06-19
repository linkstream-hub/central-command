import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { timeRecords, jobs } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';
import { ClockInSchema } from '@/lib/fieldSchemas';

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
      year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(now);

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
      orgId: 'APT-CA'
    });

    await db.update(jobs)
      .set({ status: 'In Progress' })
      .where(eq(jobs.jobId, jobId));

    return NextResponse.json({
      success: true,
      recordId,
      clockInTime: now.toISOString()
    });
  } catch (error) {
    console.error('clock-in error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
