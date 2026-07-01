export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">
          Bienvenido a LOCK360 Enterprise CRM
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border p-6">
          Empresas
        </div>

        <div className="rounded-xl border p-6">
          Prospectos
        </div>

        <div className="rounded-xl border p-6">
          Actividades
        </div>

        <div className="rounded-xl border p-6">
          Pipeline
        </div>
      </div>
    </div>
  );
}