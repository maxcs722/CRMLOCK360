"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  CreateProspectDto,
} from "@/services/prospect.service";

import { companyService } from "@/services/company.service";
import { usersService } from "@/services/users.service";
import CompanyAutocomplete from "@/components/companies/CompanyAutocomplete";

interface Props {

  initialValues?: Partial<CreateProspectDto>;

  onSubmit(
    values: CreateProspectDto,
  ): Promise<void>;

}

export default function ProspectForm({

  initialValues,

  onSubmit,

}: Props) {

  const [companies, setCompanies] =
    useState<any[]>([]);

  const [users, setUsers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<CreateProspectDto>({

      titulo:
        initialValues?.titulo || "",

      descripcion:
        initialValues?.descripcion || "",

      servicio:
        initialValues?.servicio || "",

      status:
        initialValues?.status || "NUEVO",

      valorEstimado:
        initialValues?.valorEstimado || 0,

      fechaContacto:
        initialValues?.fechaContacto || "",

      proximaAccion:
        initialValues?.proximaAccion || "",

      companyId:
        initialValues?.companyId || "",

      ejecutivoId:
        initialValues?.ejecutivoId || "",

    });

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    const companies =
      await companyService.getCompanies();

    const users =
      await usersService.getUsers();

    setCompanies(companies);

    setUsers(users);

  }

  function update(
    field: keyof CreateProspectDto,
    value: any,
  ) {

    setForm((old) => ({

      ...old,

      [field]: value,

    }));

  }

  async function handleSubmit(
  e: React.FormEvent,
) {

  e.preventDefault();

  setLoading(true);

  try {

    const payload: any = {
      ...form,
    };

    payload.valorEstimado = Number(
      payload.valorEstimado || 0,
    );

    if (!payload.fechaContacto) {
      delete payload.fechaContacto;
    }

    if (!payload.proximaAccion) {
      delete payload.proximaAccion;
    }

    if (!payload.companyId) {
      delete payload.companyId;
    }

    if (!payload.ejecutivoId) {
      delete payload.ejecutivoId;
    }

    await onSubmit(payload);

  } finally {

    setLoading(false);

  }

}


  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-card p-6"
    >

      <div className="grid grid-cols-2 gap-6">

        <div>

          <label className="mb-2 block font-medium">

            Título

          </label>

          <input

            value={form.titulo}

            onChange={(e) =>
              update(
                "titulo",
                e.target.value,
              )
            }

            className="w-full rounded-lg border p-2"

            required

          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
  Empresa
</label>

<CompanyAutocomplete
  companies={companies}
  value={form.companyId}
  onChange={(companyId) =>
    update("companyId", companyId)
  }
/>

        </div>

        <div>

          <label className="mb-2 block font-medium">

            Ejecutivo

          </label>

          <select

            value={form.ejecutivoId}

            onChange={(e) =>
              update(
                "ejecutivoId",
                e.target.value,
              )
            }

            className="w-full rounded-lg border p-2"

          >

            <option value="">

              Seleccione...

            </option>

            {users.map((user) => (

              <option
                key={user.id}
                value={user.id}
              >

                {user.nombre} {user.apellido}

              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="mb-2 block font-medium">

            Servicio

          </label>

          <input

            value={form.servicio}

            onChange={(e) =>
              update(
                "servicio",
                e.target.value,
              )
            }

            className="w-full rounded-lg border p-2"

          />

        </div>

        <div>

          <label className="mb-2 block font-medium">

            Valor Estimado

          </label>

          <input
  type="text"
  inputMode="numeric"
  value={
    form.valorEstimado
      ? `$ ${Number(form.valorEstimado).toLocaleString("es-CL")}`
      : ""
  }
  onChange={(e) => {

    const onlyNumbers = e.target.value.replace(/\D/g, "");

    update(
      "valorEstimado",
      onlyNumbers === ""
        ? 0
        : Number(onlyNumbers),
    );

  }}
  placeholder="$ 0"
  className="w-full rounded-lg border p-2"
/>

        </div>

        <div>

          <label className="mb-2 block font-medium">

            Estado

          </label>

          <select

            value={form.status}

            onChange={(e) =>
              update(
                "status",
                e.target.value,
              )
            }

            className="w-full rounded-lg border p-2"

          >

            <option value="NUEVO">

              Nuevo

            </option>

            <option value="CONTACTADO">

              Contactado

            </option>

            <option value="VISITA_AGENDADA">

              Visita Agendada

            </option>

            <option value="LEVANTAMIENTO">

              Levantamiento

            </option>

            <option value="COTIZANDO">

              Cotizando

            </option>

            <option value="NEGOCIACION">

              Negociación

            </option>

            <option value="GANADO">

              Ganado

            </option>

            <option value="PERDIDO">

              Perdido

            </option>

          </select>

        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">

          Descripción

        </label>

        <textarea

          rows={5}

          value={form.descripcion}

          onChange={(e) =>
            update(
              "descripcion",
              e.target.value,
            )
          }

          className="w-full rounded-lg border p-3"

        />

      </div>

      <div className="flex justify-end">

        <Button
          disabled={loading}
          type="submit"
        >

          {loading
            ? "Guardando..."
            : "Guardar Prospecto"}

        </Button>

      </div>

    </form>

  );

}