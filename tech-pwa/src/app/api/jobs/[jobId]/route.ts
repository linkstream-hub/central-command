import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { sendTenantScheduledEmail, sendPteCoordinationEmail } from '@/lib/email';
import type { JobStatus } from '@/lib/types';
import { resolveJobStatus, resolveEmailTrigger } from '@/lib/job-transitions';
import { mapNeonJobToJob } from '@/lib/job-mapper';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { jobId } = await params;
    const results = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    if (!results[0]) {
      return NextResponse.json({ success: false, error: 'JOB_NOT_FOUND' }, { status: 404 });
    }
    return NextResponse.json({ success: true, source: 'neon', job: mapNeonJobToJob(results[0]) });
  } catch (error) {
    console.error('[GET /api/jobs/[jobId]] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { jobId } = await params;
    const body = await req.json();

    // 1. SELECT current job state for automation detection, auto-transition, and payload fallback
    const currentJobs = await db.select({
      status: jobs.status,
      tech: jobs.tech,
      scheduledDate: jobs.scheduledDate,
      scheduledTime: jobs.scheduledTime,
      tenantEmail: jobs.tenantEmail,
      tenantName: jobs.tenantName,
      address: jobs.address
    })
      .from(jobs)
      .where(eq(jobs.jobId, jobId))
      .limit(1);

    const jobState = currentJobs[0];
    if (!jobState) {
      return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
    }

    const prevStatus = jobState.status;

    // Map Job interface field names -> Neon column names
    const updates: Partial<typeof jobs.$inferInsert> = {};

    if (body.assignedTech !== undefined) updates.tech = body.assignedTech;
    if (body.serviceCategory !== undefined) updates.category = body.serviceCategory;
    if (body.estHours !== undefined) updates.estHours = body.estHours;
    if (body.rmName !== undefined) updates.rmName = body.rmName;
    if (body.rmEmail !== undefined) updates.rmEmail = body.rmEmail;
    if (body.tenantName !== undefined) updates.tenantName = body.tenantName;
    if (body.tenantPhone !== undefined) updates.tenantPhone = body.tenantPhone;
    if (body.tenantEmail !== undefined) updates.tenantEmail = body.tenantEmail;
    if (body.accessInfo !== undefined) updates.accessInfo = body.accessInfo;
    if (body.scheduledDate !== undefined) updates.scheduledDate = body.scheduledDate;
    if (body.scheduledTime !== undefined) updates.scheduledTime = body.scheduledTime;
    if (body.status !== undefined) updates.status = body.status;
    if (body.notes !== undefined) updates.notes = body.notes;
    if (body.address !== undefined) updates.address = body.address;
    if (body.unit !== undefined) updates.unit = body.unit;
    if (body.description !== undefined) updates.description = body.description;
    // Fields missing from original mapping — needed for full backfill coverage
    if (body.priority !== undefined) updates.priority = body.priority;
    if (body.emailType !== undefined) updates.emailType = body.emailType;
    if (body.gmailMsgId !== undefined) updates.gmailMsgId = body.gmailMsgId;
    if (body.pteGranted !== undefined) updates.pte = body.pteGranted;
    if (body.timing !== undefined) updates.timing = body.timing;
    if (body.tenantPref !== undefined) updates.tenantPref = body.tenantPref;
    if (body.tenantPets !== undefined) updates.tenantPets = body.tenantPets;
    if (body.wcCode !== undefined) updates.wcCode = body.wcCode;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ success: true, message: 'No updates provided' });
    }

    // Auto-transition: RtS → Scheduled when tech + date + time are all present
    // Server-side safety net; UI already does this client-side before submitting
    const resolvedStatus = resolveJobStatus({ prevStatus: prevStatus as JobStatus, updates, jobState });
    if (resolvedStatus) updates.status = resolvedStatus;

    await db.update(jobs)
      .set(updates)
      .where(eq(jobs.jobId, jobId));

    // 2. Automation Triggers — skip when called via API key (backfill/programmatic context)
    let emailWarning: string | undefined;
    if (!isApiKeyAuth && body.status && body.status !== prevStatus) {
      const email = body.tenantEmail || jobState.tenantEmail;
      const name = body.tenantName || jobState.tenantName;
      const addr = body.address || jobState.address;

      if (email && email.includes('@')) {
        try {
          const trigger = resolveEmailTrigger(body.status, prevStatus);
          if (trigger === 'scheduled') {
            await sendTenantScheduledEmail(
              email,
              name || 'Resident',
              addr || 'your property',
              body.scheduledDate || '',
              body.scheduledTime || ''
            );
          } else if (trigger === 'pte-required') {
            await sendPteCoordinationEmail(
              email,
              name || 'Resident',
              addr || 'your property'
            );
          }
        } catch (emailErr) {
          // Status update succeeded — don't revert. Surface warning so dispatcher knows.
          console.error('[PATCH /api/jobs] Email send failed:', emailErr);
          emailWarning = 'Status updated but tenant notification email failed to send.';
        }
      }
    }

    return NextResponse.json({ success: true, ...(emailWarning ? { warning: emailWarning } : {}) });
  } catch (error: unknown) {
    console.error('[PATCH /api/jobs] Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ 
      success: false, 
      message 
    }, { status: 500 });
  }
}
