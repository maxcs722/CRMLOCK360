"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function NewQuotePage() {

  const [items, setItems] = useState([
    {
      descripcion: "",
      cantidad: 1,
      precio: 0,
      descuento: 0,
    },
  ]);

  const subtotal = items.reduce(
    (t, i) =>
      t + i.cantidad * i.precio - i.descuento,
    0,
  );

  const iva = subtotal * 0.19;

  const total = subtotal + iva;

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Nueva Cotización

        </h1>

        <p className="text-slate-500">

          Crear una nueva cotización

        </p>

      </div>

      <div className="rounded-xl border bg-white p-6">

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="mb-2 block font-medium">

              Cliente

            </label>

            <input
              className="w-full rounded-lg border p-2"
              placeholder="Seleccione un cliente"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">

              Ejecutivo

            </label>

            <input
              className="w-full rounded-lg border p-2"
              placeholder="Ejecutivo"
            />

          </div>

        </div>

      </div>

      <div className="rounded-xl border bg-white p-6">

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

            </tr>

          </thead>

          <tbody>

            {items.map((item, index) => (

              <tr key={index}>

                <td className="p-2">

                  <input
                    className="w-full rounded border p-2"
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

                <td className="text-right">

                  {(
                    item.cantidad *
                      item.precio -
                    item.descuento
                  ).toLocaleString("es-CL")}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <Button
          className="mt-6"
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

          Agregar Ítem

        </Button>

      </div>

      <div className="rounded-xl border bg-white p-6">

        <div className="ml-auto w-80 space-y-2">

          <div className="flex justify-between">

            <span>Subtotal</span>

            <strong>

              $
              {subtotal.toLocaleString("es-CL")}

            </strong>

          </div>

          <div className="flex justify-between">

            <span>IVA</span>

            <strong>

              $
              {iva.toLocaleString("es-CL")}

            </strong>

          </div>

          <div className="flex justify-between text-xl">

            <span>Total</span>

            <strong>

              $
              {total.toLocaleString("es-CL")}

            </strong>

          </div>

        </div>

      </div>

    </div>

  );

}