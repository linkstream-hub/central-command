-- Run this in Neon dashboard SQL Editor (ep-jolly-morning project)
-- Step 1: Create the table
CREATE TABLE "workflow_events" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"payload" text NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"last_attempted_at" timestamp with time zone,
	"delivered_at" timestamp with time zone,
	"error" text
);

-- Step 2: Create the index
CREATE INDEX idx_workflow_events_status ON workflow_events (status, occurred_at);

-- Step 3: Record migration so drizzle-kit doesn't re-run it
INSERT INTO "__drizzle_migrations" (id, hash, created_at)
SELECT '0007_curly_kree', 'curly_kree', extract(epoch from now())::bigint * 1000
WHERE NOT EXISTS (
  SELECT 1 FROM "__drizzle_migrations" WHERE id = '0007_curly_kree'
);
