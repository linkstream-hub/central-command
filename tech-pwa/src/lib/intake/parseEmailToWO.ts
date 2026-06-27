/**
 * Shared email-to-WO parsing logic.
 *
 * Called by both the n8n Gmail webhook route and the Cloudflare Email Worker.
 * Auth and input validation remain in each route. This function assumes:
 *   - messageId is non-empty (validated by caller)
 *   - Gemini key presence is validated by caller before calling this function
 */

import { db } from '@/lib/db';
import { jobs, properties } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { normalizeAddressKey } from '@/lib/normalizeAddressKey';
import { detectLaphamForm } from '@/lib/detectLaphamForm';
import { computeAccessMerge } from '@/lib/access-codes';

export const jobSchema = z.object({
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
  pteGranted: z.string().optional().describe("Permission to enter status. MUST be exactly one of: 'Yes', 'No', 'Not Applicable'. Use 'Not Applicable' for turnovers/inspections."),
  senderType: z.string().optional().describe("Who sent this email. MUST be exactly one of: 'Resident Manager', 'PM Office Staff', 'APT Internal', 'Unknown'."),
  notes: z.string().optional().describe('Any additional notes to append, such as extracted Google Drive links.'),
});

export function extractEmailFromSender(raw: string): string {
  const match = raw.match(/<([^>]+)>/);
  return match ? match[1].toLowerCase().trim() : '';
}

export interface ParseEmailInput {
  /** Email subject line */
  subject: string;
  /** Plain-text email body */
  bodyText: string;
  /** Unique message identifier (gmailMsgId or Postmark MessageID) — stored in jobs.gmailMsgId */
  messageId: string;
  /** Full sender header, e.g. '"Name" <email@domain.com>' */
  sender: string;
}

export interface ParseEmailResult {
  job: typeof jobs.$inferSelect;
  isLaphamForm: boolean;
  senderType: string;
  senderEmail: string;
}

export async function parseEmailToWO(input: ParseEmailInput): Promise<ParseEmailResult> {
  const { subject, bodyText, messageId, sender } = input;

  const senderEmail = extractEmailFromSender(sender ?? '');
  const laphamResult = detectLaphamForm(sender ?? '', subject ?? '', bodyText ?? '');
  const isLaphamForm = !!laphamResult;

  let object: z.infer<typeof jobSchema>;
  let inboundAccessInfo = '';

  if (laphamResult) {
    console.log('[Intake] Lapham form detected. Skipping Gemini.');
    const priority = laphamResult.pteGranted === 'Yes' ? '3-PTE' : '4-STANDARD';

    object = {
      address: laphamResult.address,
      unit: laphamResult.unit,
      description: laphamResult.description,
      category: laphamResult.serviceCategory === 'Unknown' ? 'General Repair' : laphamResult.serviceCategory,
      priority,
      timing: '',
      tenantName: laphamResult.tenantName,
      tenantPhone: laphamResult.tenantPhone,
      tenantEmail: laphamResult.tenantEmail,
      emailType: laphamResult.emailType,
      pteGranted: laphamResult.pteGranted,
      senderType: 'PM Office Staff',
      notes: `PTE Notes: ${laphamResult.pteNotes}\nPets: ${laphamResult.tenantHasPets}\nPreferred Contact: ${laphamResult.tenantPreferredContact}`,
    };

    inboundAccessInfo = laphamResult.pteNotes;
  } else {
    console.log('[Intake] Running Gemini 2.5 Flash parsing on email...');

    const { object: geminiObject } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: jobSchema,
      prompt: `You are an expert maintenance dispatcher.
          Analyze the following email and extract the structured data for a Work Order.

          FROM: ${sender || 'Unknown'}
          APT Internal senders: brandon@, keith@, tsegab@, bemenet@ aptmaintenanceinc.com — set senderType='APT Internal', emailType='internal_forward'
          Lapham senders: maintenance@laphamcompany.com, website@laphamcompany.com, turnovers.lapham@gmail.com — set senderType='PM Office Staff'
          All other senders: set senderType='Resident Manager' if they manage a property, otherwise 'Unknown'

          CRITICAL INSTRUCTIONS FOR INSPECTION EMAILS:
          If the email is from Sam Cooney, SSC Inspections, or mentions an "Inspection Summary" / "Annual Inspections":
          1. Set the category strictly to "Inspection Repair".
          2. Set the emailType strictly to "inspection".
          3. Set pteGranted to "Not Applicable".
          4. If there is a Google Drive link (https://drive.google.com/...) in the body, extract that link and place it in the "notes" field exactly as: "Inspection Report Link: [link]".

          PERMISSION TO ENTER: Extract from email body. Set pteGranted to 'Yes' if tenant gives explicit permission, 'No' if denied, 'Not Applicable' for turnovers/inspections/no tenant involved.

          Email Subject: ${subject || 'No Subject'}

          Email Body:
          ${bodyText || 'No Body'}
        `,
    });
    object = geminiObject;
  }

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
    pteGranted,
    senderType,
    notes,
  } = object;

  // Attempt to match property
  let propId = null;
  let rmName = '';
  let rmEmail = '';
  let accessInfo = '';

  if (address && address !== 'LOOKUP_BY_SENDER') {
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

      if (inboundAccessInfo) {
        const mergeResult = computeAccessMerge(accessInfo, inboundAccessInfo);
        if (mergeResult.updated && mergeResult.merged) {
          accessInfo = mergeResult.merged;
          await db.update(properties)
            .set({ accessInfo })
            .where(eq(properties.id, propId));
          console.log(`[Intake] Updated access info for property ${propId}`);
        }
      }
    }
  }

  if (!rmName && sender) {
    const match = sender.match(/^"?(.+?)"?\s*<.+>$/) ?? sender.match(/^([^<@]+)/);
    rmName = match?.[1]?.trim() || '';
  }
  if (!rmEmail && senderEmail) {
    rmEmail = senderEmail;
  }

  const newJobId = `EMAIL-${messageId}`;

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
    pte: pteGranted || null,
    rmName,
    rmEmail,
    accessInfo,
    emailType: emailType || 'adhoc_workorder',
    notes: notes || '',
    gmailMsgId: messageId || '',
    status: 'Needs Info',
    timestamp: new Date(),
  };

  const insertData = { ...updateSet, jobId: newJobId, orgId: 'APT-CA' };
  const [newJob] = await db.insert(jobs)
    .values(insertData)
    .onConflictDoUpdate({ target: jobs.jobId, set: updateSet })
    .returning();

  console.log('[Intake] Successfully processed and inserted WO:', newJobId);

  return {
    job: newJob,
    isLaphamForm,
    senderType: senderType || 'Unknown',
    senderEmail,
  };
}
