/*
  Warnings:

  - You are about to drop the column `rubro` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `tipoCliente` on the `Company` table. All the data in the column will be lost.
  - The `origen` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."CompanyType" AS ENUM ('CLIENTE', 'PROSPECTO', 'PROVEEDOR');

-- CreateEnum
CREATE TYPE "public"."LeadSource" AS ENUM ('WEB', 'WHATSAPP', 'EMAIL', 'TELEFONO', 'REFERIDO', 'LICITACION', 'OTRO');

-- DropForeignKey
ALTER TABLE "public"."Contact" DROP CONSTRAINT "Contact_companyId_fkey";

-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "rubro",
DROP COLUMN "tipoCliente",
ADD COLUMN     "tipo" "public"."CompanyType" NOT NULL DEFAULT 'PROSPECTO',
DROP COLUMN "origen",
ADD COLUMN     "origen" "public"."LeadSource";

-- DropTable
DROP TABLE "public"."Contact";

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");
