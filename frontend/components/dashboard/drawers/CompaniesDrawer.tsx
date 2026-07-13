"use client";

import { useEffect, useState } from "react";

import {
  companyService,
  Company,
} from "@/services/company.service";

export default function CompaniesDrawer() {

  const [companies, setCompanies] =
    useState<Company[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await companyService.getCompanies();

        setCompanies(data);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  if (loading) {

    return <p>Cargando empresas...</p>;

  }

  if (companies.length === 0) {

    return <p>No existen empresas.</p>;

  }

  return (

    <div className="space-y-3">

      {companies.map((company) => (

        <div
          key={company.id}
          className="rounded-lg border p-4 hover:bg-slate-50"
        >

          <h3 className="font-semibold">

            {company.razonSocial}

          </h3>

          {company.nombreFantasia && (

            <p className="text-sm text-slate-500">

              {company.nombreFantasia}

            </p>

          )}

          <div className="mt-2 text-sm text-slate-600">

            <p>RUT: {company.rut}</p>

            <p>Tipo: {company.tipo}</p>

            {company.telefono && (
              <p>Tel: {company.telefono}</p>
            )}

            {company.email && (
              <p>{company.email}</p>
            )}

          </div>

        </div>

      ))}

    </div>

  );

}