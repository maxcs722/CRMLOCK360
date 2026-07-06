"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { quoteService, Quote } from "@/services/quote.service";

import { Button } from "@/components/ui/button";

import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  FileText,
} from "lucide-react";

export default function QuotesPage() {

  const [quotes, setQuotes] = useState<Quote[]>([]);

  async function loadQuotes() {

    const data =
      await quoteService.getQuotes();

    setQuotes(data);

  }

  useEffect(() => {
    loadQuotes();
  }, []);

  async function handleDelete(id: string) {

    const ok =
      window.confirm(
        "¿Eliminar cotización?"
      );

    if (!ok) return;

    await quoteService.deleteQuote(id);

    await loadQuotes();

  }

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Cotizaciones
          </h1>

          <p className="text-slate-500">
            Administración de cotizaciones
          </p>

        </div>

        <Link href="/quotes/new">

          <Button>

            <Plus className="mr-2 h-4 w-4" />

            Nueva Cotización

          </Button>

        </Link>

      </div>

      <div className="overflow-hidden rounded-xl border bg-white">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-3 text-left">
                Nº
              </th>

              <th className="p-3 text-left">
                Cliente
              </th>

              <th className="p-3 text-left">
                Fecha
              </th>

              <th className="p-3 text-left">
                Estado
              </th>

              <th className="p-3 text-right">
                Total
              </th>

              <th className="p-3 text-center">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {quotes.map((quote) => (

              <tr
                key={quote.id}
                className="border-t"
              >

                <td className="p-3">
                  {quote.numero}
                </td>

                <td className="p-3">

                  {quote.company.nombreFantasia ||

                    quote.company.razonSocial}

                </td>

                <td className="p-3">

                  {new Date(
                    quote.fecha,
                  ).toLocaleDateString()}

                </td>

                <td className="p-3">
                  {quote.estado}
                </td>

                <td className="p-3 text-right">

                  $
                  {Number(
                    quote.total,
                  ).toLocaleString("es-CL")}

                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <Link
                      href={`/quotes/${quote.id}`}
                    >

                      <Button
                        size="icon"
                        variant="outline"
                      >

                        <Eye className="h-4 w-4" />

                      </Button>

                    </Link>

                    <Link
                      href={`/quotes/${quote.id}/edit`}
                    >

                      <Button
                        size="icon"
                        variant="outline"
                      >

                        <Pencil className="h-4 w-4" />

                      </Button>

                    </Link>

                    <Button
                      size="icon"
                      variant="outline"
                    >

                      <FileText className="h-4 w-4" />

                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() =>
                        handleDelete(
                          quote.id,
                        )
                      }
                    >

                      <Trash2 className="h-4 w-4" />

                    </Button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}