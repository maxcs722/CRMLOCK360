"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import CompanyToolbar from "./CompanyToolbar";
import CompanyDialog from "./CompanyDialog";

import {
  companyService,
  Company,
} from "@/services/company.service";

export default function CompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedCompany, setSelectedCompany] =
    useState<Company | null>(null);

  async function loadCompanies() {
    try {
      setLoading(true);

      const data =
        await companyService.getCompanies();

      setCompanies(data);

    } catch (error) {
      console.error(
        "Error cargando empresas:",
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    const term = search.toLowerCase();

    return companies.filter((company) => (
      (company.razonSocial ?? "")
        .toLowerCase()
        .includes(term) ||

      (company.nombreFantasia ?? "")
        .toLowerCase()
        .includes(term) ||

      (company.rut ?? "")
        .toLowerCase()
        .includes(term)
    ));
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
        onNewCompany={() => {
          setSelectedCompany(null);
          setDialogOpen(true);
        }}
      />

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <table className="w-full">

          <thead className="border-b bg-slate-50">
            <tr>
              <th className="p-4 text-left">
                Empresa
              </th>

              <th className="p-4 text-left">
                RUT
              </th>

              <th className="p-4 text-left">
                Rubro
              </th>

              <th className="p-4 text-left">
                Comuna
              </th>

              <th className="p-4 text-left">
                Teléfono
              </th>

              <th className="p-4 text-left">
                Tipo
              </th>

              <th className="p-4 text-left">
                Estado
              </th>

              <th className="p-4 text-center">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredCompanies.length === 0 ? (

              <tr>
                <td
                  colSpan={8}
                  className="p-8 text-center text-gray-500"
                >
                  No se encontraron empresas.
                </td>
              </tr>

            ) : (

              filteredCompanies.map((company) => (

                <tr
                  key={company.id}
                  className="border-b transition-colors hover:bg-slate-50"
                >

                  <td className="p-4">

                    <Link
                      href={`/companies/${company.id}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {company.nombreFantasia || company.razonSocial}
                    </Link>

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
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {company.tipo}
                    </span>
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

                  <td className="p-4">

                    <button
                      className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-700"
                      onClick={() => {
                        setSelectedCompany(company);
                        setDialogOpen(true);
                      }}
                    >
                      Editar
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <CompanyDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setSelectedCompany(null);
          }
        }}
        company={selectedCompany}
        onSuccess={() => {
          loadCompanies();
        }}
      />

    </div>
  );
}