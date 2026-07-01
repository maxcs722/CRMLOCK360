import UsersTable from "@/components/tables/UsersTable";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Usuarios
        </h1>

        <p className="text-muted-foreground">
          Administración de usuarios del CRM
        </p>
      </div>

      <UsersTable />
    </div>
  );
}