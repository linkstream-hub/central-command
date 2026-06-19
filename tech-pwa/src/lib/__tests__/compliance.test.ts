import { describe, it, expect } from 'vitest';
import { evaluateCACompliance } from '../compliance';

// Helper: build a Date from hours offset from an arbitrary start
const T0 = new Date('2026-01-01T08:00:00Z');
const hoursAfter = (h: number) => new Date(T0.getTime() + h * 60 * 60 * 1000);
const minsAfter  = (m: number) => new Date(T0.getTime() + m * 60 * 1000);

describe('evaluateCACompliance — First Meal Break', () => {

  it('no violation: shift under 5 hours with no break', () => {
    const result = evaluateCACompliance({
      clockIn: T0,
      clockOut: hoursAfter(4.9),
    });
    expect(result.violations).toHaveLength(0);
    expect(result.requiresAttestation).toBe(false);
  });

  it('no violation: exactly 5h worked with 30-min break taken before hour 5', () => {
    // Clock in 8am, break 11am-11:30am, clock out 1:30pm = 5.5h elapsed, 5h worked
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(5.5),
      breakStart:   hoursAfter(3),   // 3 hours in — before 5h mark
      breakMinutes: 30,
    });
    expect(result.violations).toHaveLength(0);
  });

  it('violation: 5+ hours worked, no break taken', () => {
    const result = evaluateCACompliance({
      clockIn:  T0,
      clockOut: hoursAfter(6),
    });
    expect(result.violations).toContain('Missed or short first meal break (required before 5th hour).');
    expect(result.requiresAttestation).toBe(true);
  });

  it('violation: 5+ hours worked, break taken but only 20 minutes (too short)', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(6),
      breakStart:   hoursAfter(2),
      breakMinutes: 20,
    });
    expect(result.violations).toContain('Missed or short first meal break (required before 5th hour).');
  });

  it('violation: break was 30+ min but started after 5 hours of work', () => {
    // Clock in 8am, break starts at 1:30pm (5.5h after clock-in), clock out 3pm
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(7),
      breakStart:   hoursAfter(5.5),  // late — after 5h worked
      breakMinutes: 30,
    });
    expect(result.violations).toContain('Late first meal break (started after 5 hours of work).');
    expect(result.requiresAttestation).toBe(true);
  });

  it('warning only: approaching 5th hour, no break yet, shift in progress', () => {
    // Shift in progress at 4h45m, no break, no clockOut
    const result = evaluateCACompliance({
      clockIn: T0,
    }, minsAfter(285)); // 4h45m = 285 min
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.violations).toHaveLength(0);
    expect(result.requiresAttestation).toBe(false);
  });

});

describe('evaluateCACompliance — Second Meal Break', () => {

  it('no violation: 9.9 hours worked', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(10.5),
      breakMinutes: 36, // 36 min break → 9.9h worked
    });
    expect(result.violations.filter(v => v.includes('second'))).toHaveLength(0);
  });

  it('violation: 10+ hours worked with NO break at all', () => {
    // Bug regression: breakMinutes = 0 must still fire
    const result = evaluateCACompliance({
      clockIn:  T0,
      clockOut: hoursAfter(11),
    });
    expect(result.violations).toContain('Missed or short second meal break (required before 10th hour of work).');
    expect(result.requiresAttestation).toBe(true);
  });

  it('violation: 10+ hours worked with only 30 min total break (not enough for 2nd meal)', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(11),
      breakMinutes: 30, // first meal break only — second meal missed
    });
    expect(result.violations).toContain('Missed or short second meal break (required before 10th hour of work).');
  });

  it('no violation: 10+ hours worked with 60+ min total break', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(11),
      breakMinutes: 65,
    });
    expect(result.violations.filter(v => v.includes('second'))).toHaveLength(0);
  });

});

describe('evaluateCACompliance — hoursWorked calculation', () => {

  it('excludes break time from hours worked threshold', () => {
    // 6h elapsed, 2h break → 4h worked. No violation even though elapsed > 5h.
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(6),
      breakStart:   hoursAfter(2),
      breakMinutes: 120,
    });
    expect(result.violations).toHaveLength(0);
    expect(result.totalHoursWorked).toBeCloseTo(4, 1);
  });

  it('reports correct totalHoursWorked', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(8),
      breakMinutes: 30,
    });
    expect(result.totalHoursWorked).toBeCloseTo(7.5, 1);
  });

});

describe('evaluateCACompliance — requiresAttestation flag', () => {

  it('false for clean compliant shift', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(6),
      breakStart:   hoursAfter(3),
      breakMinutes: 30,
    });
    expect(result.requiresAttestation).toBe(false);
  });

  it('true whenever any violation exists', () => {
    const result = evaluateCACompliance({
      clockIn:  T0,
      clockOut: hoursAfter(6),
    });
    expect(result.requiresAttestation).toBe(true);
  });

});
