import { z } from 'zod';

// ── Login ─────────────────────────────────────────────────────────────────────
export const LoginSchema = z.object({
  badge: z.string().min(1, 'badge is required').max(20),
  pin: z.string().min(1, 'pin is required').max(20),
});

// ── Change PIN ────────────────────────────────────────────────────────────────
export const ChangePinSchema = z.object({
  oldPin: z.string().min(1, 'oldPin is required').max(20),
  newPin: z.string().min(4, 'newPin must be at least 4 characters').max(20),
});

// ── Clock-in ──────────────────────────────────────────────────────────────────
export const ClockInSchema = z.object({
  jobId: z.string().min(1, 'jobId is required').max(50),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// ── Clock-out ─────────────────────────────────────────────────────────────────
export const ClockOutSchema = z.object({
  recordId: z.string().min(1, 'recordId is required').max(50),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// ── Break start ───────────────────────────────────────────────────────────────
export const BreakStartSchema = z.object({
  shiftId: z.string().min(1, 'shiftId is required').max(100),
});

// ── Break end ─────────────────────────────────────────────────────────────────
export const BreakEndSchema = z.object({
  shiftId: z.string().min(1, 'shiftId is required').max(100),
});

// ── Job complete ──────────────────────────────────────────────────────────────
export const JobCompleteSchema = z.object({
  recordId: z.string().min(1, 'recordId is required').max(50),
  jobId: z.string().min(1, 'jobId is required').max(50),
});

// ── Shift start ───────────────────────────────────────────────────────────────
export const ShiftStartSchema = z.object({
  shiftDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'shiftDate must be YYYY-MM-DD').optional(),
});

// ── Shift end ─────────────────────────────────────────────────────────────────
export const ShiftEndSchema = z.object({
  shiftId: z.string().min(1, 'shiftId is required').max(100),
});

// ── Shift status ──────────────────────────────────────────────────────────────
export const ShiftStatusSchema = z.object({
  shiftDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'shiftDate must be YYYY-MM-DD').optional(),
});

// ── Attestation sign ──────────────────────────────────────────────────────────
export const AttestationSignSchema = z.object({
  shiftId: z.string().min(1, 'shiftId is required').max(100),
  attestationText: z.string().max(2000).default(''),
  mealCompliant: z.boolean(),
  restCompliant: z.boolean(),
});
