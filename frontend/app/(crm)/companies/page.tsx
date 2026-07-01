import CompaniesTable from "@/components/companies/CompaniesTable";

export default function CompaniesPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Empresas
          </h1>

          <p className="text-muted-foreground">
            Gestión de empresas clientes
          </p>
        </div>

      </div>

      <CompaniesTable />

    </div>
  );
}