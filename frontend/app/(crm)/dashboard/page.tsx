import { dashboardService } from "@/services/dashboard.service";

export default async function DashboardPage() {
  const dashboard = await dashboardService.getDashboard();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          LOCK360 Enterprise
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="rounded-xl border p-6">
          <h2 className="text-sm text-muted-foreground">Empresas</h2>
          <p className="text-4xl font-bold">{dashboard.empresas}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-sm text-muted-foreground">Prospectos</h2>
          <p className="text-4xl font-bold">{dashboard.prospectos}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-sm text-muted-foreground">Actividades</h2>
          <p className="text-4xl font-bold">{dashboard.actividades}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-sm text-muted-foreground">Usuarios</h2>
          <p className="text-4xl font-bold">{dashboard.usuarios}</p>
        </div>
      </div>
    </div>
  );
}