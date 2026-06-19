import { z } from "zod";

export const workOrderSchema = z.object({
  type: z.literal('work_order'),
  address: z.string().min(5, "Property Address required"),
  unit: z.string().optional(),
  category: z.string().min(1, "Service Type required"),
  priority: z.string().min(1, "Priority required"),
  description: z.string().min(10, "Please describe the issue in detail"),
  pte: z.string().min(1, "Permission to enter required"),
  accessInfo: z.string().optional(),
  timing: z.string().optional(),
  tenantPets: z.string().optional(),
  rmName: z.string().min(1, "Your Name required"),
  rmEmail: z.string().email("Invalid email"),
  rmPhone: z.string().optional(),
  tenantName: z.string().optional(),
  tenantPhone: z.string().optional(),
  tenantEmail: z.string().optional().or(z.literal("")),
});

export const leadSchema = z.object({
  type: z.literal('lead'),
  clientName: z.string().min(1, "Name required"),
  managerEmail: z.string().email("Invalid email"),
  address: z.string().optional(),
  notes: z.string().min(10, "Tell us what you need"),
});

export const intakeSchema = z.discriminatedUnion("type", [workOrderSchema, leadSchema]);
export type IntakeFormData = z.infer<typeof intakeSchema>;
