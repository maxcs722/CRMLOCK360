-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "ultimoLogin" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "nombreFantasia" TEXT,
    "rut" TEXT NOT NULL,
    "giro" TEXT,
    "direccion" TEXT,
    "region" TEXT,
    "comuna" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "sitioWeb" TEXT,
    "ejecutivoId" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_rut_key" ON "public"."Company"("rut");

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_ejecutivoId_fkey" FOREIGN KEY ("ejecutivoId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
