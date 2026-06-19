import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { timeRecords, complianceAlerts } from '@/lib/schema';
import { type InferInsertModel } from 'drizzle-orm';
import { evaluateCACompliance } from '@/lib/compliance';

type TimeRecordInsert = InferInsertModel<typeof timeRecords>;

export async function POST(req: NextRequest) {
  // TechPWA.gs sends the key as header name 'DASHBOARD_API_KEY' (not 'x-api-key') — intentional, both sides match
  const apiKey = req.headers.get('DASHBOARD_API_KEY');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // Helper to safely convert string to Date or null
    const parseDate = (val: unknown) => {
      if (typeof val === 'string' && !isNaN(Date.parse(val))) {
        return new Date(val);
      }
      return null;
    };

    // Convert date strings to Date objects for Drizzle timestamp columns
    const trData: TimeRecordInsert = {
      recordId: String(body.recordId || ''),
      jobId: String(body.jobId || ''),
      techId: String(body.techId || ''),
      techName: body.techName,
      category: body.category,
      address: body.address,
      unit: body.unit,
      clockIn: parseDate(body.clockIn),
      clockOut: parseDate(body.clockOut),
      breakStart: parseDate(body.breakStart),
      breakEnd: parseDate(body.breakEnd),
      breakMinutes: body.breakMinutes,
      actualHours: body.actualHours,
      estHours: body.estHours,
      status: body.status,
      notes: body.notes,
      receiptIds: body.receiptIds,
      mealWarning: body.mealWarning,
      date: body.date,
      latIn: body.latIn,
      lngIn: body.lngIn,
      latOut: body.latOut,
      lngOut: body.lngOut,
      attestation: body.attestation,
      attestationAt: parseDate(body.attestationAt),
      supervisorStatus: body.supervisorStatus,
      supervisorId: body.supervisorId,
      supervisorName: body.supervisorName,
      supervisorAt: parseDate(body.supervisorAt),
      disputeReason: body.disputeReason,
      premiumOwed: body.premiumOwed,
      complianceViolations: body.complianceViolations,
      createdAt: body.createdAt ? parseDate(body.createdAt) : undefined,
    };
    
    if (!trData.recordId || !trData.jobId || !trData.techId) {
      return NextResponse.json({ 
        error: 'recordId, jobId, and techId are required',
        received: { recordId: trData.recordId, jobId: trData.jobId, techId: trData.techId }
      }, { status: 400 });
    }

    // FSM Digital Straitjacket: Server-authoritative PAGA Compliance Check
    if (trData.clockIn && trData.clockOut) {
      const compliance = evaluateCACompliance({
        clockIn: trData.clockIn,
        clockOut: trData.clockOut,
        breakStart: trData.breakStart,
        breakEnd: trData.breakEnd,
        breakMinutes: trData.breakMinutes || 0
      }, trData.clockOut);

      // Force actualHours to be the server-calculated value, ignoring whatever the client sent
      trData.actualHours = compliance.totalHoursWorked;

      // If the engine demands an attestation for a violation, explicitly block the sync if missing
      if (compliance.requiresAttestation && !trData.attestation) {
        return NextResponse.json({ 
          error: 'FSM Constraint Violation: Meal period violation detected. A digital attestation signature is legally required to clock out.',
          complianceViolations: compliance.violations.join('; ')
        }, { status: 400 });
      }

      // Automatically flag compliance violations onto the record
      if (compliance.violations.length > 0) {
        trData.complianceViolations = compliance.violations.join('; ');
      }
    }

    // Upsert time record using recordId as natural key
    const result = await db.insert(timeRecords)
      .values(trData)
      .onConflictDoUpdate({
        target: timeRecords.recordId,
        set: {
          ...trData,
          // Don't update the natural key
          recordId: undefined 
        }
      })
      .returning();

    // If premium is owed, create a compliance alert entry
    if (trData.premiumOwed && trData.premiumOwed > 0) {
      try {
        await db.insert(complianceAlerts).values({
          techName: trData.techName,
          techBadge: trData.techId,
          violationType: trData.complianceViolations || 'Meal Period Violation',
          shiftDate: trData.date,
          totalHours: trData.actualHours,
          premiumAmount: trData.premiumOwed,
          timeRecordId: trData.recordId,
          status: 'Active'
        });
      } catch (alertError) {
        console.error('Failed to insert compliance alert:', alertError);
        // We don't fail the whole request if the alert insert fails, 
        // as the time record was already synced.
      }
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: unknown) {
    console.error('Time record sync error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
