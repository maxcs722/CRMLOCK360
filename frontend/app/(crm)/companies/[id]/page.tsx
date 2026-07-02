"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CompanyHeader from "@/components/companies/detail/CompanyHeader";
import CompanyInfoCard from "@/components/companies/detail/CompanyInfoCard";

import {
  companyService,
  Company,
} from "@/services/company.service";

export default function CompanyDetailPage() {
  const router = useRouter();
  const params = useParams();

  const [company, setCompany] =
    useState<Company | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadCompany() {
      try {
        const data = await companyService.getCompany(
          params.id as string,
        );

        setCompany(data);
      } catch (error) {
        console.error(
          "Error cargando empresa:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

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

  return (
    <div className="space-y-6">

      <CompanyHeader
        companyName={
          company.nombreFantasia ||
          company.razonSocial
        }
        companyType={company.tipo}
        onBack={() => {
          router.push("/companies");
        }}
        onEdit={() => {
          console.log("Editar empresa");
        }}
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

    </div>
  );
}