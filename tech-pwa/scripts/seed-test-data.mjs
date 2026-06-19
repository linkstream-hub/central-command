// scripts/seed-test-data.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// src/lib/schema.ts
import { pgTable, serial, text, timestamp, integer, boolean, real, unique, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
var orgs = pgTable("orgs", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().unique(),
  parentOrgId: text("parent_org_id"),
  entityType: text("entity_type").notNull().default("maintenance"),
  name: text("name").notNull(),
  timezone: text("timezone").notNull().default("America/Los_Angeles"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var gmailSyncState = pgTable("gmail_sync_state", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  email: text("email").notNull().unique(),
  historyId: text("history_id").notNull(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var commsMessages = pgTable("comms_messages", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  jobId: text("job_id").notNull(),
  messageId: text("message_id").notNull().unique(),
  threadId: text("thread_id"),
  direction: text("direction"),
  stakeholder: text("stakeholder"),
  fromEmail: text("from_email"),
  toEmail: text("to_email"),
  subject: text("subject"),
  bodyPreview: text("body_preview"),
  fullBody: text("full_body"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
  readAt: timestamp("read_at")
});
var sentinelLog = pgTable("sentinel_log", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  sentinelName: text("sentinel_name").notNull(),
  eventType: text("event_type").notNull(),
  payload: text("payload"),
  severity: text("severity").default("info"),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow()
});
var clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  name: text("name").notNull(),
  type: text("type").notNull(),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  notes: text("notes"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  clientId: integer("client_id"),
  address: text("address").notNull(),
  unit: text("unit"),
  addressKey: text("address_key").notNull(),
  city: text("city").default("Oakland"),
  state: text("state").default("CA"),
  zip: text("zip"),
  propertyType: text("property_type").default("residential"),
  rmName: text("rm_name"),
  rmEmail: text("rm_email"),
  accessInfo: text("access_info"),
  notes: text("notes"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
}, (t) => ({
  uniqAddressKey: unique().on(t.orgId, t.addressKey)
}));
var tenantContacts = pgTable("tenant_contacts", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  propertyId: integer("property_id").notNull(),
  name: text("name"),
  phone: text("phone"),
  email: text("email"),
  prefContact: text("pref_contact").default("email"),
  hasPets: boolean("has_pets").default(false),
  notes: text("notes"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var newContactQueue = pgTable("new_contact_queue", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  sourceLeadId: text("source_lead_id"),
  address: text("address"),
  unit: text("unit"),
  clientName: text("client_name"),
  managerName: text("manager_name"),
  managerEmail: text("manager_email"),
  accessInfo: text("access_info"),
  notes: text("notes"),
  senderEmail: text("sender_email"),
  gmailMsgId: text("gmail_msg_id"),
  status: text("status").default("Pending Review"),
  reviewedBy: text("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow()
});
var employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  badge: text("badge"),
  email: text("email"),
  name: text("name").notNull(),
  phone: text("phone"),
  rank: text("rank"),
  role: text("role").notNull(),
  employmentType: text("employment_type").default("hourly"),
  isActive: boolean("is_active").default(true),
  hourlyRate: real("hourly_rate"),
  hireDate: text("hire_date"),
  pinHash: text("pin_hash"),
  sessionToken: text("session_token"),
  tokenExpiry: timestamp("token_expiry"),
  lastLoginAt: timestamp("last_login_at"),
  permAdmin: boolean("perm_admin").default(false),
  permDispatch: boolean("perm_dispatch").default(false),
  permPeople: boolean("perm_people").default(false),
  permFinance: boolean("perm_finance").default(false),
  permIntel: boolean("perm_intel").default(false),
  skillCarpentry: real("skill_carpentry").default(0),
  skillPlumbing: real("skill_plumbing").default(0),
  skillElectrical: real("skill_electrical").default(0),
  skillFinishCarp: real("skill_finish_carpentry").default(0),
  skillStructural: real("skill_structural").default(0),
  skillLandscaping: real("skill_landscaping").default(0),
  skillJanitorial: real("skill_janitorial").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
}, (t) => ({
  uniqBadge: uniqueIndex("employees_org_badge_idx").on(t.orgId, t.badge).where(sql`badge IS NOT NULL`),
  uniqEmail: uniqueIndex("employees_org_email_idx").on(t.orgId, t.email).where(sql`email IS NOT NULL`)
}));
var pushSubscriptions = pgTable("push_subscriptions", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  employeeId: integer("employee_id").notNull(),
  endpoint: text("endpoint").notNull(),
  p256dh: text("p256dh").notNull(),
  authKey: text("auth_key").notNull(),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
}, (t) => ({
  uniqEndpoint: unique().on(t.employeeId, t.endpoint)
}));
var timeOffRequests = pgTable("time_off_requests", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  employeeId: integer("employee_id").notNull(),
  requestDate: text("request_date").notNull(),
  returnDate: text("return_date").notNull(),
  leaveType: text("leave_type").notNull(),
  notes: text("notes"),
  status: text("status").default("Pending"),
  reviewedBy: integer("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow()
});
var accrualRules = pgTable("accrual_rules", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  ruleName: text("rule_name").notNull(),
  accrualRate: real("accrual_rate").notNull(),
  maxAccrual: real("max_accrual"),
  appliesTo: text("applies_to").default("all"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var shifts = pgTable("shifts", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  shiftId: text("shift_id").notNull().unique(),
  employeeId: integer("employee_id").notNull(),
  shiftDate: text("shift_date").notNull(),
  shiftStart: timestamp("shift_start").notNull(),
  shiftEnd: timestamp("shift_end"),
  totalBreakMinutes: integer("total_break_minutes").default(0),
  actualHours: real("actual_hours"),
  status: text("status").default("Active"),
  createdAt: timestamp("created_at").defaultNow()
});
var timeRecords = pgTable("time_records", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  recordId: text("record_id").notNull().unique(),
  jobId: text("job_id").notNull(),
  shiftId: integer("shift_id"),
  employeeId: integer("employee_id"),
  techId: text("tech_id").notNull(),
  techName: text("tech_name"),
  category: text("category"),
  address: text("address"),
  unit: text("unit"),
  clockIn: timestamp("clock_in"),
  clockOut: timestamp("clock_out"),
  breakStart: timestamp("break_start"),
  breakEnd: timestamp("break_end"),
  breakMinutes: integer("break_minutes").default(0),
  actualHours: real("actual_hours"),
  estHours: real("est_hours"),
  status: text("status"),
  notes: text("notes"),
  receiptIds: text("receipt_ids"),
  mealWarning: boolean("meal_warning").default(false),
  date: text("date"),
  latIn: real("lat_in"),
  lngIn: real("lng_in"),
  latOut: real("lat_out"),
  lngOut: real("lng_out"),
  attestation: text("attestation"),
  attestationAt: timestamp("attestation_at"),
  supervisorStatus: text("supervisor_status"),
  supervisorId: text("supervisor_id"),
  supervisorName: text("supervisor_name"),
  supervisorAt: timestamp("supervisor_at"),
  disputeReason: text("dispute_reason"),
  premiumOwed: real("premium_owed").default(0),
  complianceViolations: text("compliance_violations"),
  createdAt: timestamp("created_at").defaultNow()
});
var breaks = pgTable("breaks", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  timeRecordId: text("time_record_id").notNull(),
  breakNumber: integer("break_number").notNull(),
  breakStart: timestamp("break_start").notNull(),
  breakEnd: timestamp("break_end"),
  breakMinutes: integer("break_minutes"),
  breakType: text("break_type").default("meal"),
  createdAt: timestamp("created_at").defaultNow()
});
var inventoryItems = pgTable("inventory_items", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  itemId: text("item_id").notNull().unique(),
  name: text("name").notNull(),
  sku: text("sku"),
  barcode: text("barcode"),
  locationBin: text("location_bin"),
  cost: real("cost"),
  price: real("price"),
  reorderPoint: real("reorder_point").default(0),
  currentStock: real("current_stock").default(0),
  unitOfMeasure: text("unit_of_measure").default("each"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var inventoryTransactions = pgTable("inventory_transactions", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  itemId: integer("item_id").notNull(),
  jobId: text("job_id"),
  employeeId: integer("employee_id"),
  transactionType: text("transaction_type").notNull(),
  quantity: real("quantity").notNull(),
  notes: text("notes"),
  transactedAt: timestamp("transacted_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var complianceAlerts = pgTable("compliance_alerts", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  employeeId: integer("employee_id"),
  techName: text("tech_name"),
  techBadge: text("tech_badge"),
  violationType: text("violation_type"),
  shiftDate: text("shift_date"),
  totalHours: real("total_hours"),
  premiumAmount: real("premium_amount"),
  timeRecordId: text("time_record_id"),
  status: text("status").default("Active"),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at")
});
var attestations = pgTable("attestations", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  shiftId: integer("shift_id").notNull(),
  employeeId: integer("employee_id").notNull(),
  shiftDate: text("shift_date").notNull(),
  attestationText: text("attestation_text").notNull(),
  signedAt: timestamp("signed_at").notNull(),
  mealCompliant: boolean("meal_compliant").notNull(),
  restCompliant: boolean("rest_compliant").notNull(),
  overtimeHours: real("overtime_hours").default(0),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow()
}, (t) => ({
  uniqShift: unique().on(t.shiftId)
}));
var jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  employeeId: integer("employee_id"),
  propertyId: integer("property_id"),
  jobId: text("job_id").notNull().unique(),
  timestamp: timestamp("timestamp"),
  priority: text("priority"),
  emailType: text("email_type"),
  category: text("category"),
  address: text("address"),
  unit: text("unit"),
  description: text("description"),
  timing: text("timing"),
  accessInfo: text("access_info"),
  rmName: text("rm_name"),
  rmEmail: text("rm_email"),
  tenantName: text("tenant_name"),
  tenantPhone: text("tenant_phone"),
  tenantEmail: text("tenant_email"),
  pte: text("pte"),
  estimate: text("estimate"),
  tech: text("tech"),
  scheduledDate: text("scheduled_date"),
  scheduledTime: text("scheduled_time"),
  estHours: real("est_hours"),
  status: text("status"),
  notes: text("notes"),
  gmailMsgId: text("gmail_msg_id"),
  calendarEventId: text("calendar_event_id"),
  tenantPref: text("tenant_pref"),
  tenantPets: text("tenant_pets"),
  wcCode: text("wc_code"),
  trackingToken: text("tracking_token"),
  tenantScheduled: boolean("tenant_scheduled").default(false),
  disputeReason: text("dispute_reason"),
  createdAt: timestamp("created_at").defaultNow()
});
var jobComments = pgTable("job_comments", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  jobId: text("job_id").notNull(),
  authorId: text("author_id"),
  authorName: text("author_name"),
  content: text("content").notNull(),
  type: text("type").default("dispatch"),
  createdAt: timestamp("created_at").defaultNow()
});
var jobPerformanceHistory = pgTable("job_performance_history", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  jobId: text("job_id").notNull(),
  employeeId: integer("employee_id"),
  techName: text("tech_name"),
  category: text("category"),
  address: text("address"),
  unit: text("unit"),
  estHours: real("est_hours"),
  actualHours: real("actual_hours"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow()
});
var historicalAssignments = pgTable("historical_assignments", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  jobId: text("job_id"),
  employeeId: integer("employee_id"),
  techName: text("tech_name"),
  address: text("address"),
  unit: text("unit"),
  category: text("category"),
  scheduledDate: text("scheduled_date"),
  status: text("status"),
  actualHours: real("actual_hours"),
  createdAt: timestamp("created_at").defaultNow()
});
var dispatcherFeedback = pgTable("dispatcher_feedback", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  jobId: text("job_id").notNull(),
  employeeId: integer("employee_id"),
  feedbackType: text("feedback_type"),
  content: text("content").notNull(),
  submittedBy: text("submitted_by"),
  createdAt: timestamp("created_at").defaultNow()
});
var tradeDurationDefaults = pgTable("trade_duration_defaults", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  category: text("category").notNull(),
  defaultHours: real("default_hours").notNull(),
  sampleCount: integer("sample_count").default(0),
  lastCalibratedAt: timestamp("last_calibrated_at"),
  createdAt: timestamp("created_at").defaultNow()
}, (t) => ({
  uniqCategory: unique().on(t.orgId, t.category)
}));
var jobCosts = pgTable("job_costs", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  jobId: text("job_id").notNull(),
  costType: text("cost_type").notNull(),
  description: text("description"),
  amount: real("amount").notNull(),
  employeeId: integer("employee_id"),
  timeRecordId: text("time_record_id"),
  createdAt: timestamp("created_at").defaultNow()
});
var invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  invoiceNumber: text("invoice_number").notNull().unique(),
  jobId: text("job_id"),
  clientId: integer("client_id"),
  status: text("status").default("Draft"),
  subtotal: real("subtotal").default(0),
  taxAmount: real("tax_amount").default(0),
  totalAmount: real("total_amount").default(0),
  issuedAt: timestamp("issued_at"),
  dueAt: timestamp("due_at"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow()
});
var invoiceLineItems = pgTable("invoice_line_items", {
  id: serial("id").primaryKey(),
  orgId: text("org_id").notNull().default("APT-CA"),
  invoiceId: integer("invoice_id").notNull(),
  description: text("description").notNull(),
  quantity: real("quantity").default(1),
  unitPrice: real("unit_price").notNull(),
  total: real("total").notNull(),
  lineType: text("line_type").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// scripts/seed-test-data.ts
import { eq } from "drizzle-orm";
import * as crypto from "crypto";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
var url = process.env.DATABASE_URL_PREVIEW;
if (!url) {
  throw new Error("DATABASE_URL_PREVIEW not set in .env.local \u2014 cannot seed preview branch.");
}
var sql2 = neon(url);
var db = drizzle(sql2);
var TEST_BADGE = "T01";
var TEST_PIN = "1234";
var TEST_NAME = "Test Tech (Validation)";
var pinHash = crypto.createHash("sha256").update(TEST_PIN).digest("hex");
console.log(`[seed] Seeding test tech: badge=${TEST_BADGE}, pin=${TEST_PIN}`);
console.log(`[seed] pinHash: ${pinHash}`);
console.log(`[seed] Target DB: ${url.slice(0, 40)}...`);
var existing = await db.select().from(employees).where(eq(employees.badge, TEST_BADGE));
var techId;
if (existing.length > 0) {
  techId = existing[0].id;
  await db.update(employees).set({ name: TEST_NAME, pinHash, orgId: "APT-CA" }).where(eq(employees.badge, TEST_BADGE));
  console.log(`[seed] Updated existing tech id=${techId}`);
} else {
  const inserted = await db.insert(employees).values({
    badge: TEST_BADGE,
    name: TEST_NAME,
    role: "tech",
    orgId: "APT-CA",
    pinHash
  }).returning({ id: employees.id });
  techId = inserted[0].id;
  console.log(`[seed] Inserted new tech id=${techId}`);
}
var todayLA = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Los_Angeles",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(/* @__PURE__ */ new Date());
var TEST_JOB_ID = "TEST-VALIDATION-001";
var existingJob = await db.select().from(jobs).where(eq(jobs.jobId, TEST_JOB_ID));
if (existingJob.length > 0) {
  await db.update(jobs).set({
    tech: TEST_BADGE,
    employeeId: techId,
    status: "Scheduled",
    scheduledDate: todayLA
  }).where(eq(jobs.jobId, TEST_JOB_ID));
  console.log(`[seed] Updated existing test job jobId=${TEST_JOB_ID}`);
} else {
  await db.insert(jobs).values({
    jobId: TEST_JOB_ID,
    tech: TEST_BADGE,
    employeeId: techId,
    status: "Scheduled",
    scheduledDate: todayLA,
    scheduledTime: "09:00",
    address: "123 Validation Test St",
    unit: "Unit 1",
    rmName: "Test RM",
    rmEmail: "test-rm@test.local",
    tenantName: "Test Tenant",
    tenantEmail: "test-tenant@test.local",
    tenantPhone: "555-000-0000",
    priority: "ROUTINE",
    emailType: "GENERAL",
    category: "GENERAL",
    orgId: "APT-CA",
    notes: "VALIDATION TEST JOB \u2014 safe to delete after go-live validation sprint"
  });
  console.log(`[seed] Inserted test job jobId=${TEST_JOB_ID}`);
}
console.log("[seed] Done. Test tech and job are in the preview Neon branch.");
console.log(`[seed] Login credentials: badge=${TEST_BADGE}, pin=${TEST_PIN}`);
