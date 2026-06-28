ALTER TABLE "job_photos" ALTER COLUMN "job_id" SET DATA TYPE text;
ALTER TABLE "job_photos" RENAME COLUMN "photo_data" TO "photo_url";