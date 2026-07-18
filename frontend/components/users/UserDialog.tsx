"use client";

import { useState } from "react";
import { usersService } from "@/services/users.service";

interface Props {

  open: boolean;

  onClose: () => void;

}

export default function UserDialog({

  open,

  onClose,

}: Props) {

  const [form, setForm] = useState({

    nombre: "",

    apellido: "",

    email: "",

    cargo: "",

    role: "EJECUTIVO",

    password: "",

    confirmPassword: "",

  });

  if (!open) return null;

  function updateField(

    field: string,

    value: string,

  ) {

    setForm({

      ...form,

      [field]: value,

    });

  }

  async function saveUser() {

  if (form.password !== form.confirmPassword) {

    alert("Las contraseñas no coinciden.");

    return;

  }

  try {

    await usersService.createUser({

      nombre: form.nombre,

      apellido: form.apellido,

      email: form.email,

      cargo: form.cargo,

      role: form.role,

      password: form.password,

    });

    alert("Usuario creado correctamente.");

    onClose();

    window.location.reload();

  } catch (error: any) {

    console.error(error);

    alert(

      error.response?.data?.message ??

      "No fue posible crear el usuario.",

    );

  }

}

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-3xl rounded-xl bg-card p-8 shadow-xl">

        <h2 className="mb-8 text-2xl font-bold">

          Nuevo Usuario

        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Nombre

            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={form.nombre}
              onChange={(e) =>
                updateField("nombre", e.target.value)
              }
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Apellido

            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={form.apellido}
              onChange={(e) =>
                updateField("apellido", e.target.value)
              }
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Correo

            </label>

            <input
              type="email"
              className="w-full rounded-lg border p-3"
              value={form.email}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Cargo

            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={form.cargo}
              onChange={(e) =>
                updateField("cargo", e.target.value)
              }
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Rol

            </label>

            <select
              className="w-full rounded-lg border p-3"
              value={form.role}
              onChange={(e) =>
                updateField("role", e.target.value)
              }
            >

              <option value="ADMIN">

                Administrador

              </option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Contraseña

            </label>

            <input
              type="password"
              className="w-full rounded-lg border p-3"
              value={form.password}
              onChange={(e) =>
                updateField("password", e.target.value)
              }
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium">

              Confirmar contraseña

            </label>

            <input
              type="password"
              className="w-full rounded-lg border p-3"
              value={form.confirmPassword}
              onChange={(e) =>
                updateField(
                  "confirmPassword",
                  e.target.value,
                )
              }
            />

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >

            Cancelar

          </button>

          <button
  onClick={saveUser}
  className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
>

  Guardar Usuario

</button>

        </div>

      </div>

    </div>

  );

}