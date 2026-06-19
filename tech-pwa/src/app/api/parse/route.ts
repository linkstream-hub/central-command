import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sender, subject, textBody, threadContext } = body;

    if (!sender || !subject) {
      return NextResponse.json({ error: 'Sender and subject are required' }, { status: 400 });
    }

    // 1. Lapham Webform Check (Bypass Gemini if structured)
    const isLaphamSender = sender.includes('website@laphamcompany.com');
    const isFormBody = textBody?.includes('Submitted values are:') || textBody?.includes('Webform submission from: Maintenance Request');
    
    let parsedData: any = null;

    if (isLaphamSender && isFormBody) {
      // Basic structured extraction fallback
      parsedData = {
        emailType: 'adhoc_workorder',
        propertyAddress: extractField(textBody, ['Address', 'Property Address', 'Property']) || 'LOOKUP_BY_SENDER',
        description: extractField(textBody, ['Description', 'Issue', 'Problem']) || 'See original email',
        tenantName: extractField(textBody, ['Name', 'Full Name']),
        tenantPhone: extractField(textBody, ['Phone', 'Phone Number']),
        tenantEmail: extractField(textBody, ['Email', 'Email Address']),
        pte: extractField(textBody, ['Permission to Enter', 'PTE']),
        category: 'General Repair',
        urgency: 'Standard',
        estimateNeeded: 'No',
        confidenceNotes: 'Structured Lapham webform — Gemini bypassed'
      };
    } else {
      // 2. Gemini Parsing
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        }
      });

      const prompt = `
        You are a work order intake agent for APT Maintenance.
        Parse this email into structured FSM JSON data.
        
        FROM: ${sender}
        SUBJECT: ${subject}
        BODY: ${textBody}
        
        Return ONLY valid JSON matching this schema:
        {
          "emailType": "adhoc_workorder|turnover|inspection|unknown",
          "propertyAddress": "string or LOOKUP_BY_SENDER",
          "unit": "string",
          "description": "string (1-2 sentences)",
          "category": "Plumbing|Electrical|Carpentry|HVAC|Appliance|General Repair|Unknown",
          "urgency": "Urgent|Standard|Flexible",
          "tenantName": "string",
          "tenantPhone": "string",
          "tenantEmail": "string",
          "pte": "Yes|No|Unknown",
          "estimateNeeded": "Yes|No|Unknown",
          "confidence": "High|Medium|Low",
          "confidenceNotes": "string"
        }
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      parsedData = JSON.parse(responseText);
    }

    // 3. Map to FSM Database Schema and Insert
    // This entirely replaces the brittle Google Apps Script connection!
    const jobId = `JOB-${Date.now()}`;
    
    await db.insert(jobs).values({
      jobId,
      emailType: parsedData.emailType,
      address: parsedData.propertyAddress,
      unit: parsedData.unit || '',
      description: parsedData.description,
      category: parsedData.category,
      priority: parsedData.urgency,
      tenantName: parsedData.tenantName,
      tenantPhone: parsedData.tenantPhone,
      tenantEmail: parsedData.tenantEmail,
      pte: parsedData.pte,
      estimate: parsedData.estimateNeeded,
      status: 'Needs Review', // Forces dispatch to touch this in the UI
      notes: parsedData.confidenceNotes || 'Auto-parsed natively by Next.js',
    });

    return NextResponse.json({ success: true, jobId, data: parsedData });

  } catch (error: any) {
    console.error('Parsing Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function extractField(body: string, labels: string[]): string {
  if (!body) return '';
  for (const label of labels) {
    const re = new RegExp(`(?:^|\\n)${label}\\s*:?\\s*([^\\n]+)`, 'i');
    const match = body.match(re);
    if (match && match[1]) return match[1].trim();
  }
  return '';
}
