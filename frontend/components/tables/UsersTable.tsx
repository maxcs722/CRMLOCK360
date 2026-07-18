"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import {
  usersService,
  User,
} from "@/services/users.service";

export default function UsersTable() {

  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadUsers() {

    try {

      const data =
        await usersService.getUsers();

      setUsers(data);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadUsers();

  }, []);

  async function handleDelete(user: User) {

    const ok = confirm(
      `¿Eliminar al usuario ${user.nombre} ${user.apellido}?`,
    );

    if (!ok) return;

    try {

      await usersService.deleteUser(user.id);

      await loadUsers();

      alert("Usuario eliminado correctamente.");

    } catch (error) {

      console.error(error);

      alert("No fue posible eliminar el usuario.");

    }

  }

  if (loading) {

    return <p>Cargando usuarios...</p>;

  }

  return (

    <div className="rounded-xl border bg-card shadow-sm">

      <table className="w-full">

        <thead className="border-b bg-muted">

          <tr>

            <th className="p-4 text-left">

              Nombre

            </th>

            <th className="p-4 text-left">

              Correo

            </th>

            <th className="p-4 text-left">

              Cargo

            </th>

            <th className="p-4 text-left">

              Rol

            </th>

            <th className="p-4 text-center">

              Acciones

            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b hover:bg-muted"
            >

              <td className="p-4">

                {user.nombre} {user.apellido}

              </td>

              <td className="p-4">

                {user.email}

              </td>

              <td className="p-4">

                {user.cargo ?? "-"}

              </td>

              <td className="p-4">

                {user.role}

              </td>

              <td className="p-4">

                <div className="flex justify-center">

                  <button
                    onClick={() => handleDelete(user)}
                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
                    title="Eliminar usuario"
                  >

                    <Trash2 className="h-5 w-5" />

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}