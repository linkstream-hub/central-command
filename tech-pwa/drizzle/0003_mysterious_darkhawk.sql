CREATE TABLE "accrual_rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"rule_name" text NOT NULL,
	"accrual_rate" real NOT NULL,
	"max_accrual" real,
	"applies_to" text DEFAULT 'all',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "attestations" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"shift_id" integer NOT NULL,
	"employee_id" integer NOT NULL,
	"shift_date" text NOT NULL,
	"attestation_text" text NOT NULL,
	"signed_at" timestamp NOT NULL,
	"meal_compliant" boolean NOT NULL,
	"rest_compliant" boolean NOT NULL,
	"overtime_hours" real DEFAULT 0,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "attestations_shift_id_unique" UNIQUE("shift_id")
);
--> statement-breakpoint
CREATE TABLE "breaks" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"time_record_id" text NOT NULL,
	"break_number" integer NOT NULL,
	"break_start" timestamp NOT NULL,
	"break_end" timestamp,
	"break_minutes" integer,
	"break_type" text DEFAULT 'meal',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"contact_name" text,
	"contact_email" text,
	"contact_phone" text,
	"notes" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "dispatcher_feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"job_id" text NOT NULL,
	"employee_id" integer,
	"feedback_type" text,
	"content" text NOT NULL,
	"submitted_by" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"badge" text,
	"email" text,
	"name" text NOT NULL,
	"phone" text,
	"rank" text,
	"role" text NOT NULL,
	"employment_type" text DEFAULT 'hourly',
	"is_active" boolean DEFAULT true,
	"hourly_rate" real,
	"hire_date" text,
	"pin_hash" text,
	"session_token" text,
	"token_expiry" timestamp,
	"last_login_at" timestamp,
	"perm_admin" boolean DEFAULT false,
	"perm_dispatch" boolean DEFAULT false,
	"perm_people" boolean DEFAULT false,
	"perm_finance" boolean DEFAULT false,
	"perm_intel" boolean DEFAULT false,
	"skill_carpentry" real DEFAULT 0,
	"skill_plumbing" real DEFAULT 0,
	"skill_electrical" real DEFAULT 0,
	"skill_finish_carpentry" real DEFAULT 0,
	"skill_structural" real DEFAULT 0,
	"skill_landscaping" real DEFAULT 0,
	"skill_janitorial" real DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "gmail_sync_state" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"email" text NOT NULL,
	"history_id" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "gmail_sync_state_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "historical_assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"job_id" text,
	"employee_id" integer,
	"tech_name" text,
	"address" text,
	"unit" text,
	"category" text,
	"scheduled_date" text,
	"status" text,
	"actual_hours" real,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "inventory_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"item_id" text NOT NULL,
	"name" text NOT NULL,
	"sku" text,
	"barcode" text,
	"location_bin" text,
	"cost" real,
	"price" real,
	"reorder_point" real DEFAULT 0,
	"current_stock" real DEFAULT 0,
	"unit_of_measure" text DEFAULT 'each',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "inventory_items_item_id_unique" UNIQUE("item_id")
);
--> statement-breakpoint
CREATE TABLE "inventory_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"item_id" integer NOT NULL,
	"job_id" text,
	"employee_id" integer,
	"transaction_type" text NOT NULL,
	"quantity" real NOT NULL,
	"notes" text,
	"transacted_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "invoice_line_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"invoice_id" integer NOT NULL,
	"description" text NOT NULL,
	"quantity" real DEFAULT 1,
	"unit_price" real NOT NULL,
	"total" real NOT NULL,
	"line_type" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"invoice_number" text NOT NULL,
	"job_id" text,
	"client_id" integer,
	"status" text DEFAULT 'Draft',
	"subtotal" real DEFAULT 0,
	"tax_amount" real DEFAULT 0,
	"total_amount" real DEFAULT 0,
	"issued_at" timestamp,
	"due_at" timestamp,
	"paid_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "invoices_invoice_number_unique" UNIQUE("invoice_number")
);
--> statement-breakpoint
CREATE TABLE "job_costs" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"job_id" text NOT NULL,
	"cost_type" text NOT NULL,
	"description" text,
	"amount" real NOT NULL,
	"employee_id" integer,
	"time_record_id" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "job_performance_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"job_id" text NOT NULL,
	"employee_id" integer,
	"tech_name" text,
	"category" text,
	"address" text,
	"unit" text,
	"est_hours" real,
	"actual_hours" real,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "new_contact_queue" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"source_lead_id" text,
	"address" text,
	"unit" text,
	"client_name" text,
	"manager_name" text,
	"manager_email" text,
	"access_info" text,
	"notes" text,
	"sender_email" text,
	"gmail_msg_id" text,
	"status" text DEFAULT 'Pending Review',
	"reviewed_by" text,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orgs" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text NOT NULL,
	"parent_org_id" text,
	"entity_type" text DEFAULT 'maintenance' NOT NULL,
	"name" text NOT NULL,
	"timezone" text DEFAULT 'America/Los_Angeles' NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "orgs_org_id_unique" UNIQUE("org_id")
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"client_id" integer,
	"address" text NOT NULL,
	"unit" text,
	"address_key" text NOT NULL,
	"city" text DEFAULT 'Oakland',
	"state" text DEFAULT 'CA',
	"zip" text,
	"property_type" text DEFAULT 'residential',
	"rm_name" text,
	"rm_email" text,
	"access_info" text,
	"notes" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "properties_org_id_address_key_unique" UNIQUE("org_id","address_key")
);
--> statement-breakpoint
CREATE TABLE "push_subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"employee_id" integer NOT NULL,
	"endpoint" text NOT NULL,
	"p256dh" text NOT NULL,
	"auth_key" text NOT NULL,
	"user_agent" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "push_subscriptions_employee_id_endpoint_unique" UNIQUE("employee_id","endpoint")
);
--> statement-breakpoint
CREATE TABLE "sentinel_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"sentinel_name" text NOT NULL,
	"event_type" text NOT NULL,
	"payload" text,
	"severity" text DEFAULT 'info',
	"resolved_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "shifts" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"shift_id" text NOT NULL,
	"employee_id" integer NOT NULL,
	"shift_date" text NOT NULL,
	"shift_start" timestamp NOT NULL,
	"shift_end" timestamp,
	"total_break_minutes" integer DEFAULT 0,
	"actual_hours" real,
	"status" text DEFAULT 'Active',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "shifts_shift_id_unique" UNIQUE("shift_id")
);
--> statement-breakpoint
CREATE TABLE "tenant_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"property_id" integer NOT NULL,
	"name" text,
	"phone" text,
	"email" text,
	"pref_contact" text DEFAULT 'email',
	"has_pets" boolean DEFAULT false,
	"notes" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "time_off_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"employee_id" integer NOT NULL,
	"request_date" text NOT NULL,
	"return_date" text NOT NULL,
	"leave_type" text NOT NULL,
	"notes" text,
	"status" text DEFAULT 'Pending',
	"reviewed_by" integer,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "trade_duration_defaults" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"category" text NOT NULL,
	"default_hours" real NOT NULL,
	"sample_count" integer DEFAULT 0,
	"last_calibrated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "trade_duration_defaults_org_id_category_unique" UNIQUE("org_id","category")
);
--> statement-breakpoint
INSERT INTO "employees" (
  "org_id", "badge", "name", "phone", "rank", "role",
  "employment_type", "is_active", "hourly_rate",
  "pin_hash", "session_token", "token_expiry",
  "skill_carpentry", "skill_plumbing", "skill_electrical",
  "skill_finish_carpentry", "skill_structural",
  "skill_landscaping", "skill_janitorial",
  "created_at", "updated_at"
)
SELECT 
  'APT-CA', "badge", "name", "phone", "rank", 'tech',
  'hourly', "is_active", "hourly_rate",
  "pin_hash", "session_token", "token_expiry",
  "skill_carpentry", "skill_plumbing", "skill_electrical",
  "skill_finish_carpentry", "skill_structural",
  "skill_landscaping", "skill_janitorial",
  "created_at", "created_at"
FROM "techs";
--> statement-breakpoint
DROP TABLE "techs" CASCADE;--> statement-breakpoint
ALTER TABLE "comms_messages" ADD COLUMN "org_id" text DEFAULT 'APT-CA' NOT NULL;--> statement-breakpoint
ALTER TABLE "compliance_alerts" ADD COLUMN "org_id" text DEFAULT 'APT-CA' NOT NULL;--> statement-breakpoint
ALTER TABLE "compliance_alerts" ADD COLUMN "employee_id" integer;--> statement-breakpoint
ALTER TABLE "job_comments" ADD COLUMN "org_id" text DEFAULT 'APT-CA' NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "org_id" text DEFAULT 'APT-CA' NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "employee_id" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "property_id" integer;--> statement-breakpoint
ALTER TABLE "time_records" ADD COLUMN "org_id" text DEFAULT 'APT-CA' NOT NULL;--> statement-breakpoint
ALTER TABLE "time_records" ADD COLUMN "shift_id" integer;--> statement-breakpoint
ALTER TABLE "time_records" ADD COLUMN "employee_id" integer;--> statement-breakpoint
CREATE UNIQUE INDEX "employees_org_badge_idx" ON "employees" USING btree ("org_id","badge") WHERE badge IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "employees_org_email_idx" ON "employees" USING btree ("org_id","email") WHERE email IS NOT NULL;--> statement-breakpoint
ALTER TABLE "job_comments" DROP COLUMN "entity_id";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "entity_id";--> statement-breakpoint
ALTER TABLE "time_records" DROP COLUMN "entity_id";