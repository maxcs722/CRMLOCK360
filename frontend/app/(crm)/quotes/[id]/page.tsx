"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  quoteService,
  Quote,
} from "@/services/quote.service";

export default function QuoteDetailPage() {

  const params = useParams();

  const id = params.id as string;

  const [quote, setQuote] =
    useState<Quote | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadQuote();

  }, []);

  async function loadQuote() {

    try {

      const data =
        await quoteService.getQuote(id);

      setQuote(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div className="p-8">

        Cargando cotización...

      </div>

    );

  }

  if (!quote) {

    return (

      <div className="p-8">

        No existe la cotización.

      </div>

    );

  }

  const subtotal = Number(quote.subtotal);

  const iva = Number(quote.iva);

  const total = Number(quote.total);

    return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Cotización #{quote.numero}

          </h1>

          <p className="text-slate-500">

            Estado:
            <strong className="ml-2">
              {quote.estado}
            </strong>

          </p>

        </div>

        <Button
          variant="outline"
          onClick={() => history.back()}
        >

          Volver

        </Button>

      </div>

      <div className="rounded-xl border bg-white p-6">

        <div className="grid grid-cols-2 gap-8">

          <div>

            <h3 className="mb-3 text-lg font-bold">

              Cliente

            </h3>

            <p>

              <strong>

                {quote.company.nombreFantasia ||
                  quote.company.razonSocial}

              </strong>

            </p>

            <p>

              {quote.company.razonSocial}

            </p>

          </div>

          <div>

            <h3 className="mb-3 text-lg font-bold">

              Ejecutivo

            </h3>

            <p>

              {quote.user.nombre}{" "}
              {quote.user.apellido}

            </p>

            <p>

              Fecha:
              {" "}
              {new Date(
                quote.fecha,
              ).toLocaleDateString("es-CL")}

            </p>

          </div>

        </div>

      </div>

      <div className="rounded-xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-bold">

          Observaciones

        </h2>

        <p>

          {quote.observaciones ||
            "Sin observaciones"}

        </p>

      </div>

      <div className="rounded-xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-bold">

          Ítems

        </h2>

            <table className="w-full">

                <thead>

          <tr className="border-b bg-slate-100">

            <th className="p-3 text-left">

              Descripción

            </th>

            <th className="text-center">

              Cantidad

            </th>

            <th className="text-right">

              Precio

            </th>

            <th className="text-right">

              Descuento

            </th>

            <th className="text-right">

              Subtotal

            </th>

          </tr>

        </thead>

        <tbody>

          {quote.items.map((item) => (

            <tr
              key={item.id}
              className="border-b"
            >

              <td className="p-3">

                {item.descripcion}

              </td>

              <td className="text-center">

                {Number(item.cantidad)}

              </td>

              <td className="text-right">

                $

                {Number(
                  item.precio,
                ).toLocaleString("es-CL")}

              </td>

              <td className="text-right">

                $

                {Number(
                  item.descuento,
                ).toLocaleString("es-CL")}

              </td>

              <td className="text-right font-semibold">

                $

                {Number(
                  item.subtotal,
                ).toLocaleString("es-CL")}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="mt-8 ml-auto w-80 space-y-3">

        <div className="flex justify-between">

          <span>

            Subtotal

          </span>

          <strong>

            $

            {subtotal.toLocaleString("es-CL")}

          </strong>

        </div>

        <div className="flex justify-between">

          <span>

            IVA

          </span>

          <strong>

            $

            {iva.toLocaleString("es-CL")}

          </strong>

        </div>

                <div className="flex justify-between border-t pt-4 text-2xl font-bold">

          <span>

            Total

          </span>

          <span>

            $

            {total.toLocaleString("es-CL")}

          </span>

        </div>

      </div>

    </div>

  </div>

);

}
        

        

        

