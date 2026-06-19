CREATE TABLE "compliance_alerts" (
	"id" serial PRIMARY KEY NOT NULL,
	"tech_name" text,
	"tech_badge" text,
	"violation_type" text,
	"shift_date" text,
	"total_hours" real,
	"premium_amount" real,
	"time_record_id" text,
	"status" text DEFAULT 'Active',
	"created_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "comms_messages" ADD COLUMN "read_at" timestamp;--> statement-breakpoint
ALTER TABLE "time_records" ADD COLUMN "premium_owed" real DEFAULT 0;--> statement-breakpoint
ALTER TABLE "time_records" ADD COLUMN "compliance_violations" text;