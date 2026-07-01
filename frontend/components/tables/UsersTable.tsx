"use client";

import { useEffect, useState } from "react";
import { usersService, User } from "@/services/users.service";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await usersService.getUsers();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="rounded-xl border bg-white">
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Correo</th>
            <th className="p-4 text-left">Cargo</th>
            <th className="p-4 text-left">Rol</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-4">
                {user.nombre} {user.apellido}
              </td>

              <td className="p-4">{user.email}</td>

              <td className="p-4">{user.cargo ?? "-"}</td>

              <td className="p-4">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}