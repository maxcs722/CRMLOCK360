-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('BAJA', 'MEDIA', 'ALTA', 'URGENTE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."UserRole" ADD VALUE 'ASEO';
ALTER TYPE "public"."UserRole" ADD VALUE 'SUPERVISOR_ASEO';

-- AlterTable
ALTER TABLE "public"."Prospect" ADD COLUMN     "fechaCierre" TIMESTAMP(3),
ADD COLUMN     "fechaPerdida" TIMESTAMP(3),
ADD COLUMN     "motivoPerdida" TEXT,
ADD COLUMN     "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIA',
ADD COLUMN     "probabilidad" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "valorFinal" DECIMAL(12,2);
