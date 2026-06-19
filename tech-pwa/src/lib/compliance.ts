// CA Labor Code §226.7 / IWC Wage Order 16 compliance engine.
// Authoritative implementation for CC3.0+.
//
// GAS DIVERGENCE (TechPWA.gs:calculateMealPremiums): GAS uses elapsed time
// (clockOut - clockIn) instead of hoursWorked for the >300min threshold.
// This is a known bug. It will be removed in CC3.0 Phase 4 when TechPWA.gs
// is replaced by Next.js routes using this module.

export interface ShiftDetails {
  clockIn: Date;
  clockOut?: Date | null;
  breakStart?: Date | null;
  breakEnd?: Date | null;
  breakMinutes?: number;
}

export interface ComplianceStatus {
  violations: string[];
  warnings: string[];
  requiresAttestation: boolean;
  totalHoursWorked: number;
}

/**
 * CA Compliance Engine
 * Evaluates California labor laws regarding meal and rest breaks.
 */
export function evaluateCACompliance(shift: ShiftDetails, currentTime: Date = new Date()): ComplianceStatus {
  const violations: string[] = [];
  const warnings: string[] = [];
  let requiresAttestation = false;

  const endTime = shift.clockOut || currentTime;
  const shiftDurationMs = endTime.getTime() - shift.clockIn.getTime();


  // Actual hours worked = Shift duration - Unpaid break duration
  const breakDurationMs = shift.breakMinutes ? shift.breakMinutes * 60 * 1000 : 0;
  const hoursWorked = (shiftDurationMs - breakDurationMs) / (1000 * 60 * 60);

  // 1. First Meal Break Rule (Before end of 5th hour)
  if (hoursWorked >= 5) {
    if (!shift.breakMinutes || shift.breakMinutes < 30) {
      violations.push('Missed or short first meal break (required before 5th hour).');
      requiresAttestation = true;
    } else if (shift.breakStart) {
      const timeUntilBreakStart = (shift.breakStart.getTime() - shift.clockIn.getTime()) / (1000 * 60 * 60);
      if (timeUntilBreakStart > 5) {
        violations.push('Late first meal break (started after 5 hours of work).');
        requiresAttestation = true;
      }
    }
  } else if (!shift.clockOut && hoursWorked >= 4.5 && !shift.breakStart) {
    // Warning approaching 5 hours
    warnings.push('Approaching 5th hour meal break violation. Please take a meal break soon.');
  }

  // 2. Second Meal Break Rule (Before end of 10th hour)
  if (hoursWorked >= 10) {
    const totalBreakMinutes = shift.breakMinutes ?? 0;
    if (totalBreakMinutes < 60) {
      violations.push('Missed or short second meal break (required before 10th hour of work).');
      requiresAttestation = true;
    }
  }

  return {
    violations,
    warnings,
    requiresAttestation,
    totalHoursWorked: hoursWorked,
  };
}
