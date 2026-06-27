import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { parseEmailToWO } from '@/lib/intake/parseEmailToWO';

export async function POST(request: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let payload: any = {};
  try {
    payload = await request.json();

    // Auth Check
    const dashboardApiKey = request.headers.get('DASHBOARD_API_KEY');
    const authHeader = request.headers.get('authorization');
    if (dashboardApiKey !== process.env.DASHBOARD_API_KEY && authHeader !== `Bearer ${process.env.DASHBOARD_API_KEY}`) {
      console.warn('Unauthorized webhook attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY && !process.env.GOOGLE_API_KEY && !process.env.GEMINI_API_KEY) {
      console.error('Missing Google AI API Key');
      return NextResponse.json({ error: 'Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable. Please add it to your Vercel or local environment to enable AI parsing.' }, { status: 500 });
    }

    // We now expect raw email components from n8n instead of pre-parsed data
    const { subject, bodyText, gmailMsgId, sender } = payload;

    if (!gmailMsgId) {
      return NextResponse.json({ error: 'Missing gmailMsgId' }, { status: 400 });
    }

    if (!subject && !bodyText) {
      // Fallback for old payloads (while migrating)
      if (payload.address) {
         // handle old pre-parsed payload...
         // skipping for brevity, we assume n8n is updated to send raw.
      } else {
        return NextResponse.json({ error: 'Missing raw email data (subject, bodyText)' }, { status: 400 });
      }
    }

    const result = await parseEmailToWO({
      subject: subject ?? '',
      bodyText: bodyText ?? '',
      messageId: gmailMsgId,
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
    console.error('[Webhook] Failed to process n8n payload via Gemini:', error);
    
    // FALLBACK: If AI parsing fails, insert the raw email as a Work Order so it's not lost
    try {
      const newJobId = `EMAIL-${payload.gmailMsgId || Date.now()}`;
      
      let availableModels = 'Unknown';
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`);
        const data = await res.json();
        availableModels = data.models ? data.models.map((m: { name: string }) => m.name).join(', ') : JSON.stringify(data);
      } catch (e) {
        availableModels = String(e);
      }

      const updateSet = {
        propertyId: null,
        address: 'Needs Manual Triage',
        unit: '',
        category: 'Unknown',
        priority: '4-STANDARD',
        description: `[AI PARSING FAILED] Subject: ${payload.subject}\n\nBody: ${payload.bodyText}\n\nError: ${error instanceof Error ? error.message : String(error)}\n\nModels: ${availableModels}`,
        status: 'Needs Info',
        emailType: 'adhoc_workorder',
        gmailMsgId: payload.gmailMsgId || '',
        timestamp: new Date(),
      };
      
      const insertData = { ...updateSet, jobId: newJobId, orgId: 'APT-CA' };
      const [fallbackJob] = await db.insert(jobs)
        .values(insertData)
        .onConflictDoUpdate({ target: jobs.jobId, set: updateSet })
        .returning();
      console.log('[Webhook] Inserted FALLBACK WO:', newJobId);
      return NextResponse.json({ success: true, job: fallbackJob, note: 'Fallback used due to AI error' });
    } catch (fallbackErr) {
      console.error('[Webhook] Fallback insertion also failed:', fallbackErr);
      return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
  }
}
