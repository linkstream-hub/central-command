/**
 * POST /api/intake/email
 *
 * Cloudflare Email Routing webhook — receives parsed inbound emails from Cloudflare Worker
 * and creates Work Orders via shared parseEmailToWO logic.
 *
 * Auth: x-email-token header compared against EMAIL_INBOUND_TOKEN env var.
 *
 * Payload shape (from Cloudflare Worker):
 *   { subject, bodyText, sender, messageId }
 *
 * Phase 0 — replaces n8n Gmail polling and Postmark as primary intake path.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { parseEmailToWO } from '@/lib/intake/parseEmailToWO';

export async function POST(request: NextRequest) {
  // Validate EMAIL_INBOUND_TOKEN is configured server-side
  const configuredToken = process.env.EMAIL_INBOUND_TOKEN;
  if (!configuredToken) {
    console.error('[Email Intake] Missing EMAIL_INBOUND_TOKEN environment variable');
    return NextResponse.json(
      { error: 'Server configuration error: missing EMAIL_INBOUND_TOKEN' },
      { status: 500 }
    );
  }

  // Validate incoming token from Cloudflare webhook header
  const requestToken = request.headers.get('x-email-token');
  if (!requestToken || requestToken !== configuredToken) {
    console.warn('[Email Intake] Unauthorized inbound webhook attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let payload: any = {};
  try {
    payload = await request.json();

    const { subject, bodyText, sender, messageId } = payload;

    if (!messageId) {
      return NextResponse.json({ error: 'Missing messageId' }, { status: 400 });
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY && !process.env.GOOGLE_API_KEY && !process.env.GEMINI_API_KEY) {
      console.error('[Email Intake] Missing Google AI API Key');
      return NextResponse.json(
        { error: 'Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable. Please add it to your Vercel or local environment to enable AI parsing.' },
        { status: 500 }
      );
    }

    const result = await parseEmailToWO({
      subject: subject ?? '',
      bodyText: bodyText ?? '',
      messageId: messageId,
      sender: sender ?? '',
    });

    return NextResponse.json({
      success: true,
      job: result.job,
      parsed: {
        isLaphamForm: result.isLaphamForm,
        senderType: result.senderType,
        senderEmail: result.senderEmail,
      },
    });
  } catch (error) {
    console.error('[Email Intake] Failed to process inbound email:', error);

    // FALLBACK: If parsing fails, insert raw email as WO so it is not lost
    try {
      const newJobId = `EMAIL-${payload.messageId || Date.now()}`;

      const updateSet = {
        propertyId: null,
        address: 'Needs Manual Triage',
        unit: '',
        category: 'Unknown',
        priority: '4-STANDARD',
        description: `[AI PARSING FAILED] Subject: ${payload.subject}\n\nBody: ${payload.bodyText}\n\nError: ${error instanceof Error ? error.message : String(error)}`,
        status: 'Needs Info',
        emailType: 'adhoc_workorder',
        gmailMsgId: payload.messageId || '',
        timestamp: new Date(),
      };

      const insertData = { ...updateSet, jobId: newJobId, orgId: 'APT-CA' };
      const [fallbackJob] = await db.insert(jobs)
        .values(insertData)
        .onConflictDoUpdate({ target: jobs.jobId, set: updateSet })
        .returning();
      console.log('[Email Intake] Inserted FALLBACK WO:', newJobId);
      return NextResponse.json({ success: true, job: fallbackJob, note: 'Fallback used due to AI error' });
    } catch (fallbackErr) {
      console.error('[Email Intake] Fallback insertion also failed:', fallbackErr);
      return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
  }
}
