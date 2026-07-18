"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  companyService,
  Company,
} from "@/services/company.service";

import {
  usersService,
  User,
} from "@/services/users.service";

import {
  quoteService,
} from "@/services/quote.service";

export default function NewQuotePage() {

  const [items, setItems] = useState([
    {
      descripcion: "",
      cantidad: 1,
      precio: 0,
      descuento: 0,
    },
  ]);

  const [companies, setCompanies] =
    useState<Company[]>([]);

  const [users, setUsers] =
    useState<User[]>([]);

  const [companyId, setCompanyId] =
    useState("");

  const [userId, setUserId] =
    useState("");

  const [observaciones, setObservaciones] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    async function loadData() {

      try {

  const companiesData =
    await companyService.getCompanies();

  setCompanies(companiesData);

} catch (e) {

  console.error("Empresas", e);

}

try {

  const usersData =
    await usersService.getUsers();

  setUsers(usersData);

} catch (e) {

  console.error("Usuarios", e);

}

    }

    loadData();

  }, []);

  const subtotal = items.reduce(
    (total, item) =>
      total +
      item.cantidad *
      item.precio -
      item.descuento,
    0,
  );

  const iva = subtotal * 0.19;

  const total = subtotal + iva;

  async function guardarCotizacion() {

    try {

      setSaving(true);

      await quoteService.createQuote({

        companyId,

        userId,

        observaciones,

        items,

      });

      alert(
        "Cotización creada correctamente."
      );

    } catch (error) {

      console.error(error);

      alert(
        "Error al crear la cotización."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

  <div className="space-y-6">

    <div>

      <h1 className="text-3xl font-bold">

        Nueva Cotización

      </h1>

      <p className="text-muted-foreground">

        Crear una nueva cotización

      </p>

    </div>

    <div className="rounded-xl border bg-card p-6">

      <div className="grid grid-cols-2 gap-6">

        <div>

          <label className="mb-2 block font-medium">

            Cliente

          </label>

          <select
            className="w-full rounded-lg border p-2"
            value={companyId}
            onChange={(e) =>
              setCompanyId(e.target.value)
            }
          >

            <option value="">
              Seleccione un cliente
            </option>

            {companies.map((company) => (

              <option
                key={company.id}
                value={company.id}
              >

                {company.nombreFantasia ??
                  company.razonSocial}

              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="mb-2 block font-medium">

            Ejecutivo

          </label>

          <select
            className="w-full rounded-lg border p-2"
            value={userId}
            onChange={(e) =>
              setUserId(e.target.value)
            }
          >

            <option value="">
              Seleccione un ejecutivo
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

      </div>

      <div className="mt-6">

        <label className="mb-2 block font-medium">

          Observaciones

        </label>

        <textarea
          className="w-full rounded-lg border p-3"
          rows={4}
          placeholder="Observaciones de la cotización..."
          value={observaciones}
          onChange={(e) =>
            setObservaciones(e.target.value)
          }
        />

      </div>

    </div>

    <div className="rounded-xl border bg-card p-6">

      <table className="w-full">

  <thead>

    <tr className="border-b">

      <th className="p-2 text-left">
        Descripción
      </th>

      <th>Cantidad</th>

      <th>Precio</th>

      <th>Desc.</th>

      <th>Total</th>

      <th></th>

    </tr>

  </thead>

  <tbody>

    {items.map((item, index) => (

      <tr key={index}>

        <td className="p-2">

          <input
            className="w-full rounded border p-2"
            placeholder="Descripción del producto o servicio"
            value={item.descripcion}
            onChange={(e) => {

              const copy = [...items];

              copy[index].descripcion =
                e.target.value;

              setItems(copy);

            }}
          />

        </td>

        <td>

          <input
            type="number"
            className="w-24 rounded border p-2"
            value={item.cantidad}
            onChange={(e) => {

              const copy = [...items];

              copy[index].cantidad =
                Number(e.target.value);

              setItems(copy);

            }}
          />

        </td>

        <td>

          <input
            type="number"
            className="w-32 rounded border p-2"
            value={item.precio}
            onChange={(e) => {

              const copy = [...items];

              copy[index].precio =
                Number(e.target.value);

              setItems(copy);

            }}
          />

        </td>

        <td>

          <input
            type="number"
            className="w-24 rounded border p-2"
            value={item.descuento}
            onChange={(e) => {

              const copy = [...items];

              copy[index].descuento =
                Number(e.target.value);

              setItems(copy);

            }}
          />

        </td>

        <td className="text-right font-semibold">

          $

          {(
            item.cantidad *
              item.precio -
            item.descuento
          ).toLocaleString("es-CL")}

        </td>

        <td>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => {

              if (items.length === 1)
                return;

              setItems(
                items.filter(
                  (_, i) =>
                    i !== index,
                ),
              );

            }}
          >

            X

          </Button>

        </td>

      </tr>

    ))}

  </tbody>

</table>

<div className="mt-6 flex gap-3">

  <Button
    onClick={() =>

      setItems([
        ...items,
        {
          descripcion: "",
          cantidad: 1,
          precio: 0,
          descuento: 0,
        },
      ])

    }
  >

    + Agregar Ítem

  </Button>

</div>

</div>

      <div className="rounded-xl border bg-card p-6">

        <div className="ml-auto w-96 space-y-3">

          <div className="flex justify-between">

            <span className="text-muted-foreground">

              Subtotal

            </span>

            <strong>

              $
              {subtotal.toLocaleString("es-CL")}

            </strong>

          </div>

          <div className="flex justify-between">

            <span className="text-muted-foreground">

              IVA (19%)

            </span>

            <strong>

              $
              {iva.toLocaleString("es-CL")}

            </strong>

          </div>

          <div className="border-t pt-3">

            <div className="flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span>

                $
                {total.toLocaleString("es-CL")}

              </span>

            </div>

          </div>

          <div className="mt-8 flex justify-end gap-3">

            <Button
              variant="outline"
              onClick={() =>
                history.back()
              }
            >

              Cancelar

            </Button>

            <Button

              disabled={
                saving ||
                !companyId ||
                !userId ||
                items.length === 0
              }

              onClick={guardarCotizacion}

            >

              {saving
                ? "Guardando..."
                : "Guardar Cotización"}

            </Button>

          </div>

        </div>

      </div>

    </div>

  );

}