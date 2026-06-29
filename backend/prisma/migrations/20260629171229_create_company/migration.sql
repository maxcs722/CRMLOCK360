-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "origen" TEXT,
ADD COLUMN     "rubro" TEXT,
ADD COLUMN     "tipoCliente" TEXT;

-- CreateIndex
CREATE INDEX "Company_rut_idx" ON "public"."Company"("rut");

-- CreateIndex
CREATE INDEX "Company_ejecutivoId_idx" ON "public"."Company"("ejecutivoId");
