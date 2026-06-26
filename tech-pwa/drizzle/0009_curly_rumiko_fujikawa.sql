CREATE TABLE "job_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" text DEFAULT 'APT-CA' NOT NULL,
	"job_id" integer NOT NULL,
	"employee_id" integer NOT NULL,
	"photo_type" text NOT NULL,
	"file_name" text NOT NULL,
	"photo_data" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
