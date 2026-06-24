import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs, properties } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { normalizeAddressKey } from '@/lib/normalizeAddressKey';

const jobSchema = z.object({
  address: z.string().describe('The street address of the property.'),
  unit: z.string().optional().describe('The unit or apartment number, if any.'),
  city: z.string().optional().describe('The city name. Default to Oakland if unknown.'),
  description: z.string().describe('The detailed description of the maintenance issue or work requested.'),
  category: z.string().describe('The category of the work. Examples: General Repair, Inspection Repair, Plumbing, Electrical, Turnover.'),
  priority: z.string().describe('The priority level. MUST be exactly one of: 1-URGENT, 2-TURNOVER, 3-PTE, 4-STANDARD.'),
  timing: z.string().optional().describe('Any timing constraints or scheduling notes.'),
  tenantName: z.string().optional(),
  tenantPhone: z.string().optional(),
  tenantEmail: z.string().optional(),
  emailType: z.string().optional().describe('Type of email. E.g., inspection, adhoc_workorder, turnover.'),
  notes: z.string().optional().describe('Any additional notes to append, such as extracted Google Drive links.'),
});

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

    console.log('[Webhook] Running Gemini 2.0 Flash parsing on email...');

    // Call Gemini to parse the raw email
    const { object } = await generateObject({
      model: google('gemini-2.0-flash'),
      schema: jobSchema,
      prompt: `You are an expert maintenance dispatcher.
        Analyze the following email and extract the structured data for a Work Order.
        
        CRITICAL INSTRUCTIONS FOR INSPECTION EMAILS:
        If the email is from Sam Cooney, SSC Inspections, or mentions an "Inspection Summary" / "Annual Inspections":
        1. Set the category strictly to "Inspection Repair".
        2. Set the emailType strictly to "inspection".
        3. If there is a Google Drive link (https://drive.google.com/...) in the body, extract that link and place it in the "notes" field exactly as: "Inspection Report Link: [link]".
        
        Email Subject: ${subject || 'No Subject'}
        
        Email Body:
        ${bodyText || 'No Body'}
      `,
    });

    const { 
      address, 
      unit, 
      description, 
      category, 
      priority, 
      timing, 
      tenantName, 
      tenantPhone, 
      tenantEmail,
      emailType,
      notes,
    } = object;

    // Attempt to match property
    let propId = null;
    let rmName = '';
    let rmEmail = '';
    let accessInfo = '';
    
    if (address) {
      const addressKey = normalizeAddressKey(address, unit);
      const matchedProp = await db.select().from(properties).where(and(
        eq(properties.orgId, 'APT-CA'),
        eq(properties.addressKey, addressKey)
      )).limit(1);

      if (matchedProp.length > 0) {
        propId = matchedProp[0].id;
        rmName = matchedProp[0].rmName || '';
        rmEmail = matchedProp[0].rmEmail || '';
        accessInfo = matchedProp[0].accessInfo || '';
      }
    }
    
    if (!rmName && sender) {
      const match = sender.match(/^"?(.+?)"?\s*<.+>$/) ?? sender.match(/^([^<@]+)/);
      rmName = match?.[1]?.trim() || '';
    }

    const newJobId = `EMAIL-${gmailMsgId}`;

    const updateSet = {
      propertyId: propId,
      address: address || 'Unknown Address',
      unit: unit || '',
      category: category || 'General Repair',
      priority: priority || '4-STANDARD',
      description: description || '',
      timing: timing || '',
      tenantName: tenantName || '',
      tenantPhone: tenantPhone || '',
      tenantEmail: tenantEmail || '',
      rmName,
      rmEmail,
      accessInfo,
      emailType: emailType || 'adhoc_workorder',
      notes: notes || '',
      gmailMsgId: gmailMsgId || '',
      status: 'Needs Review',
      timestamp: new Date(),
    };

    const insertData = { ...updateSet, jobId: newJobId, orgId: 'APT-CA' };
    const [newJob] = await db.insert(jobs)
      .values(insertData)
      .onConflictDoUpdate({ target: jobs.jobId, set: updateSet })
      .returning();

    console.log('[Webhook] Successfully processed and inserted WO:', newJobId);

    return NextResponse.json({ success: true, job: newJob });
  } catch (error) {
    console.error('[Webhook] Failed to process n8n payload via Gemini:', error);
    
    // FALLBACK: If AI parsing fails, insert the raw email as a Work Order so it's not lost
    try {
      const newJobId = `EMAIL-${payload.gmailMsgId || Date.now()}`;
      
      const updateSet = {
        propertyId: null,
        address: 'Needs Manual Triage',
        unit: '',
        category: 'Unknown',
        priority: '4-STANDARD',
        description: `[AI PARSING FAILED] Subject: ${payload.subject}\n\nBody: ${payload.bodyText}\n\nError: ${error instanceof Error ? error.message : String(error)}`,
        status: 'Needs Review',
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
