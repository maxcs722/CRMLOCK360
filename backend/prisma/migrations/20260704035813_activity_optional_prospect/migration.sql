-- AlterTable
ALTER TABLE "public"."Activity" ALTER COLUMN "prospectId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Activity_companyId_idx" ON "public"."Activity"("companyId");
