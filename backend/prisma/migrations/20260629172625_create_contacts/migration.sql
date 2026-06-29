-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "cargo" TEXT,
    "email" TEXT,
    "telefono" TEXT,
    "celular" TEXT,
    "whatsapp" TEXT,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "recibeCotizaciones" BOOLEAN NOT NULL DEFAULT true,
    "recibeFacturas" BOOLEAN NOT NULL DEFAULT false,
    "observaciones" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contact_companyId_idx" ON "public"."Contact"("companyId");

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
