import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { db } from '@/lib/db';
import { commsMessages, jobs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { deriveStakeholder } from '@/lib/comms-utils';

export async function POST(req: Request) {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json() as {
      jobId: string;
      messageId: string;
      threadId?: string;
      fromEmail?: string;
      toEmail?: string;
      subject?: string;
      bodyPreview?: string;
      fullBody?: string;
      sentAt?: string;
    };
    const { jobId, messageId, threadId, fromEmail, toEmail, subject, bodyPreview, fullBody, sentAt } = body;

    if (!jobId || !messageId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Resolve job email context to derive stakeholder accurately
    const [jobRow] = await db
      .select({ rmEmail: jobs.rmEmail, tenantEmail: jobs.tenantEmail })
      .from(jobs)
      .where(eq(jobs.jobId, jobId))
      .limit(1);

    const stakeholder = deriveStakeholder(
      fromEmail   ?? '',
      toEmail     ?? '',
      jobRow?.rmEmail     ?? undefined,
      jobRow?.tenantEmail ?? undefined,
    );

    await db.insert(commsMessages).values({
      jobId,
      messageId,
      threadId,
      direction:   'inbound',
      stakeholder,
      fromEmail,
      toEmail,
      subject,
      bodyPreview,
      fullBody,
      sentAt: sentAt ? new Date(sentAt) : new Date(),
    }).onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('[POST /api/comms/inbound] Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
