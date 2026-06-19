ALTER TABLE "techs" ALTER COLUMN "skill_carpentry" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "techs" ALTER COLUMN "skill_plumbing" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "techs" ALTER COLUMN "skill_electrical" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "techs" ALTER COLUMN "skill_finish_carpentry" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "techs" ALTER COLUMN "skill_structural" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "techs" ALTER COLUMN "skill_landscaping" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "techs" ALTER COLUMN "skill_janitorial" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "techs" ADD CONSTRAINT "techs_badge_unique" UNIQUE("badge");