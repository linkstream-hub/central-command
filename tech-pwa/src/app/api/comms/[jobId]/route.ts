import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { commsMessages } from '@/lib/schema';
import { eq, and, isNull } from 'drizzle-orm';
import { jobsRepository } from '@/lib/dal/jobs';
import { Resend } from 'resend';

function parseMsgDate(dateStr: string): Date {
  // GAS formats dates as "Jan 5, 2025 at 3:45 PM" — strip " at " before parsing
  const d = new Date(dateStr.replace(/ at /i, ' '));
  return isNaN(d.getTime()) ? new Date() : d;
}

import { extractEmailAddress, deriveStakeholder } from '@/lib/comms-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { jobId } = await params;

  // 0. Fetch Job for email context
  const jobRes = await jobsRepository.getJobById(jobId);
  const job = jobRes.success ? jobRes.job : null;
  const rmEmail = job?.rmEmail;
  const tenantEmail = job?.tenantEmail;

  // 1. Try Neon first
  const rows = await db
    .select()
    .from(commsMessages)
    .where(eq(commsMessages.jobId, jobId))
    .orderBy(commsMessages.sentAt);

  // Infer requester from first inbound message when rmEmail not on job record
  let effectiveRmEmail = rmEmail || '';
  if (!effectiveRmEmail) {
    const firstInbound = rows.find(r => r.direction === 'inbound');
    if (firstInbound?.fromEmail) {
      effectiveRmEmail = extractEmailAddress(firstInbound.fromEmail);
    }
  }

  // Gmail fallback: when no Neon rows exist and job has a gmailMsgId
  if (rows.length === 0 && job?.gmailMsgId) {
    const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
    const apiKey = process.env.DASHBOARD_API_KEY;
    if (apiUrl && apiKey) {
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            action: 'getGmailThread',
            msgId: job.gmailMsgId,
            address: job.address ?? '',
            apiKey,
          }),
        });
        const daData = await res.json() as {
          success: boolean;
          threadId?: string;
          messages?: Array<{
            id: string;
            from: string;
            fromEmail: string;
            toEmail: string;
            date: string;
            subject: string;
            body: string;
            isOutbound: boolean;
            attachments: Array<{ name: string; mimeType: string; size: number; url: string | null }>;
          }>;
        };

        if (daData.success && Array.isArray(daData.messages) && daData.messages.length > 0) {
          const insertRows = daData.messages.map(m => ({
            jobId,
            messageId:   m.id,
            threadId:    daData.threadId ?? null,
            direction:   m.isOutbound ? 'outbound' : 'inbound',
            stakeholder: deriveStakeholder(m.fromEmail, m.toEmail, effectiveRmEmail, tenantEmail ?? ''),
            fromEmail:   m.fromEmail,
            toEmail:     m.toEmail,
            subject:     m.subject,
            bodyPreview: m.body.substring(0, 500),
            fullBody:    m.body,
            sentAt:      parseMsgDate(m.date),
          }));

          // Cache to Neon — best-effort, don't block the read on cache failure
          try {
            await db.insert(commsMessages).values(insertRows).onConflictDoNothing();
          } catch (cacheErr) {
            console.error('[GET /api/comms] Neon cache write failed:', cacheErr);
          }

          return NextResponse.json({
            success: true,
            source: 'gmail',
            messages: daData.messages.map(m => ({
              from:        m.from,
              fromEmail:   m.fromEmail,
              toEmail:     m.toEmail,
              text:        m.body,
              timestamp:   m.date,
              isOutbound:  m.isOutbound,
              stakeholder: deriveStakeholder(m.fromEmail, m.toEmail, effectiveRmEmail, tenantEmail ?? ''),
              attachments: m.attachments ?? [],
            })),
          });
        }
      } catch (err) {
        console.error('[GET /api/comms] DashboardAPI fallback failed:', err);
        // Fall through: return empty array
      }
    }
  }

  return NextResponse.json({
    success: true,
    source: 'neon',
    messages: rows.map(r => ({
      from:        r.fromEmail ?? '',
      fromEmail:   r.fromEmail ?? '',
      toEmail:     r.toEmail   ?? '',
      text:        r.fullBody  ?? r.bodyPreview ?? '',
      timestamp:   r.sentAt ? r.sentAt.toISOString() : '',
      isOutbound:  r.direction === 'outbound',
      stakeholder: deriveStakeholder(r.fromEmail ?? '', r.toEmail ?? '', effectiveRmEmail, tenantEmail ?? ''),
      attachments: [],
    })),
  });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { jobId } = await params;
    const { replyBody, stakeholder, channel } = await req.json();

    // SMS and TECH not yet supported — caller should fall back to GAS
    if (channel === 'SMS' || stakeholder === 'TECH') {
      return NextResponse.json({ success: false, error: 'not_supported' }, { status: 422 });
    }

    // Look up recipient email from job record
    const jobRes = await jobsRepository.getJobById(jobId);
    if (!jobRes.success || !jobRes.job) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }
    const job = jobRes.job;

    const toEmail = stakeholder === 'TENANT'
      ? job.tenantEmail
      : stakeholder === 'REQUESTER'
        ? job.rmEmail
        : null;

    if (!toEmail || !toEmail.includes('@')) {
      return NextResponse.json({ success: false, error: 'No valid recipient email' }, { status: 422 });
    }

    const subject = `Re: Maintenance at ${job.address || jobId}`;

    // Send via Resend (dev guard in email.ts already blocks in development)
    if (process.env.NODE_ENV !== 'development') {
      const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
      await resend.emails.send({
        from: 'noreply@aptmaintenanceinc.com',
        to: toEmail,
        replyTo: 'workorder@aptmaintenanceinc.com',
        subject,
        text: replyBody,
      });
    } else {
      console.log(`[DEV EMAIL BLOCKED] Comms reply → ${toEmail} | ${subject}`);
    }

    // Write to comms_messages
    await db.insert(commsMessages).values({
      jobId,
      messageId:   `outbound-${Date.now()}`,
      direction:   'outbound',
      stakeholder,
      fromEmail:   'noreply@aptmaintenanceinc.com',
      toEmail,
      subject,
      bodyPreview: replyBody.substring(0, 500),
      fullBody:    replyBody,
      sentAt:      new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { jobId } = await params;

  try {
    await db
      .update(commsMessages)
      .set({ readAt: new Date() })
      .where(
        and(
          eq(commsMessages.jobId, jobId),
          eq(commsMessages.direction, 'inbound'),
          eq(commsMessages.stakeholder, 'TENANT'),
          isNull(commsMessages.readAt)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}