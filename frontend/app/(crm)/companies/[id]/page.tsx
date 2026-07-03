"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CompanyHeader from "@/components/companies/detail/CompanyHeader";
import CompanyInfoCard from "@/components/companies/detail/CompanyInfoCard";
import CompanyContactsCard from "@/components/companies/detail/CompanyContactsCard";
import CompanyDialog from "@/components/companies/CompanyDialog";

import {
  companyService,
  Company,
} from "@/services/company.service";

import { Contact } from "@/components/contacts/ContactForm";

export default function CompanyDetailPage() {
  const router = useRouter();
  const params = useParams();

  const [company, setCompany] =
    useState<Company | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  async function loadCompany() {
    try {
      setLoading(true);

      const data =
        await companyService.getCompany(
          params.id as string,
        );

      setCompany(data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCompany();
  }, [params]);

  if (loading) {
    return (
      <div className="p-8">
        Cargando empresa...
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-8">
        Empresa no encontrada.
      </div>
    );
  }

  const contacts: Contact[] = [
    {
      id: "1",
      nombre: "Juan",
      apellido: "Pérez",
      cargo: "Gerente General",
      telefono: "+56 9 9876 5432",
      whatsapp: "+56 9 9876 5432",
      email: "juan@empresa.cl",
      observaciones: "",
    },
    {
      id: "2",
      nombre: "María",
      apellido: "González",
      cargo: "Jefa de Operaciones",
      telefono: "+56 9 9123 4567",
      whatsapp: "+56 9 9123 4567",
      email: "maria@empresa.cl",
      observaciones: "",
    },
  ];

  return (
    <>
      <div className="space-y-6">

        <CompanyHeader
          companyName={
            company.nombreFantasia ||
            company.razonSocial
          }
          companyType={company.tipo}
          onBack={() =>
            router.push("/companies")
          }
          onEdit={() =>
            setDialogOpen(true)
          }
        />

        <CompanyInfoCard
          razonSocial={company.razonSocial}
          rut={company.rut}
          giro={company.giro}
          direccion={company.direccion}
          comuna={company.comuna}
          region={company.region}
          telefono={company.telefono}
          email={company.email}
          sitioWeb={company.sitioWeb}
        />

        <CompanyContactsCard
          contacts={contacts}
        />

      </div>

      <CompanyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        company={company}
        onSuccess={async () => {
          await loadCompany();
          setDialogOpen(false);
        }}
      />

    </>
  );
}