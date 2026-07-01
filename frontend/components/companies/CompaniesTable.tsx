"use client";

import { useEffect, useMemo, useState } from "react";

import CompanyToolbar from "./CompanyToolbar";

import {
  companyService,
  Company,
} from "@/services/company.service";

export default function CompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data = await companyService.getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Error cargando empresas:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    const term = search.toLowerCase();

    return companies.filter((company) => {
      return (
        (company.razonSocial ?? "")
          .toLowerCase()
          .includes(term) ||

        (company.nombreFantasia ?? "")
          .toLowerCase()
          .includes(term) ||

        (company.rut ?? "")
          .toLowerCase()
          .includes(term)
      );
    });
  }, [companies, search]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6">
        Cargando empresas...
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <CompanyToolbar
        search={search}
        onSearch={setSearch}
      />

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="p-4 text-left">Empresa</th>
              <th className="p-4 text-left">RUT</th>
              <th className="p-4 text-left">Rubro</th>
              <th className="p-4 text-left">Comuna</th>
              <th className="p-4 text-left">Teléfono</th>
              <th className="p-4 text-left">Tipo</th>
              <th className="p-4 text-left">Estado</th>
            </tr>
          </thead>

          <tbody>

            {filteredCompanies.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-gray-500"
                >
                  No se encontraron empresas.
                </td>
              </tr>
            ) : (

              filteredCompanies.map((company) => (

                <tr
                  key={company.id}
                  className="border-b hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4">

                    <div className="font-semibold">
                      {company.nombreFantasia}
                    </div>

                    <div className="text-xs text-gray-500">
                      {company.razonSocial}
                    </div>

                  </td>

                  <td className="p-4">
                    {company.rut}
                  </td>

                  <td className="p-4">
                    {company.giro ?? "-"}
                  </td>

                  <td className="p-4">
                    {company.comuna ?? "-"}
                  </td>

                  <td className="p-4">
                    {company.telefono ?? "-"}
                  </td>

                  <td className="p-4">
                    {company.tipo}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        company.activo
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {company.activo
                        ? "Activo"
                        : "Inactivo"}
                    </span>
                  </td>

                </tr>

              ))

            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}