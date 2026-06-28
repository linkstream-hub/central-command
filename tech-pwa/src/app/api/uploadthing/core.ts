import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/lib/db";
import { jobPhotos } from "@/lib/schema";
import { verifyFieldSession } from "@/lib/fieldAuth";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  jobPhoto: f({ image: { maxFileSize: "8MB" } })
    .input(z.object({
      jobId: z.string(),
      photoType: z.string(),
    }))
    .middleware(async ({ req, input }) => {
      const session = await verifyFieldSession(req);

      if (!session) {
        throw new UploadThingError("UNAUTHORIZED");
      }

      return { 
        employeeId: session.employeeId,
        jobId: input.jobId,
        photoType: input.photoType
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(jobPhotos).values({
        orgId: 'APT-CA',
        jobId: metadata.jobId,
        employeeId: metadata.employeeId,
        photoType: metadata.photoType,
        fileName: file.name,
        photoUrl: file.url,
      });

      return { uploadedBy: metadata.employeeId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
