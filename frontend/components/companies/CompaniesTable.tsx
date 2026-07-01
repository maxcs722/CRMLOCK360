"use client";

import { useEffect, useState } from "react";
import {
  companyService,
  Company,
} from "@/services/company.service";

export default function CompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data = await companyService.getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCompanies();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6">
        Cargando empresas...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <table className="w-full">
        <thead className="border-b bg-slate-50">
          <tr>
            <th className="p-4 text-left">Empresa</th>
            <th className="p-4 text-left">RUT</th>
            <th className="p-4 text-left">Ciudad</th>
            <th className="p-4 text-left">Teléfono</th>
            <th className="p-4 text-left">Estado</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="p-4 font-medium">
                {company.nombre}
              </td>

              <td className="p-4">
                {company.rut}
              </td>

              <td className="p-4">
                {company.ciudad ?? "-"}
              </td>

              <td className="p-4">
                {company.telefono ?? "-"}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    company.activo
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {company.activo ? "Activo" : "Inactivo"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}