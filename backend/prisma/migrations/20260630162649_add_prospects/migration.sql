-- CreateEnum
CREATE TYPE "public"."ProspectStatus" AS ENUM ('NUEVO', 'CONTACTADO', 'VISITA_AGENDADA', 'LEVANTAMIENTO', 'COTIZANDO', 'NEGOCIACION', 'GANADO', 'PERDIDO');

-- CreateTable
CREATE TABLE "public"."Prospect" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "servicio" TEXT NOT NULL,
    "status" "public"."ProspectStatus" NOT NULL DEFAULT 'NUEVO',
    "valorEstimado" DECIMAL(12,2),
    "fechaContacto" TIMESTAMP(3),
    "proximaAccion" TIMESTAMP(3),
    "companyId" TEXT,
    "ejecutivoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Prospect_status_idx" ON "public"."Prospect"("status");

-- CreateIndex
CREATE INDEX "Prospect_companyId_idx" ON "public"."Prospect"("companyId");

-- CreateIndex
CREATE INDEX "Prospect_ejecutivoId_idx" ON "public"."Prospect"("ejecutivoId");

-- AddForeignKey
ALTER TABLE "public"."Prospect" ADD CONSTRAINT "Prospect_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prospect" ADD CONSTRAINT "Prospect_ejecutivoId_fkey" FOREIGN KEY ("ejecutivoId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
