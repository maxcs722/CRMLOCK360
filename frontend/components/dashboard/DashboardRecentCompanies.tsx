"use client";

import { Building2 } from "lucide-react";

import {
  RecentCompany,
} from "@/services/dashboard.service";

interface Props {
  companies: RecentCompany[];
}

export default function DashboardRecentCompanies({
  companies,
}: Props) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />

        <h2 className="text-xl font-bold text-foreground">
          Últimas Empresas
        </h2>
      </div>

      {companies.length === 0 ? (
        <p className="text-muted-foreground">
          No existen empresas.
        </p>
      ) : (
        <div className="space-y-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/40"
            >
              <h3 className="font-semibold text-foreground">
                {company.nombreFantasia ||
                  company.razonSocial}
              </h3>

              <p className="text-sm text-muted-foreground">
                {company.tipo}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(
                  company.createdAt,
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}