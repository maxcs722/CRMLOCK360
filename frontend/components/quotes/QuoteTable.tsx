"use client";

import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
  StickyNote,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Quote } from "@/services/quote.service";

interface Props {
  quotes: Quote[];
  loading: boolean;
  onDelete(id: string): void;
}

export default function QuoteTable({
  quotes,
  loading,
  onDelete,
}: Props) {

  if (loading) {
    return (
      <div className="rounded-xl border bg-card p-8">
        Cargando cotizaciones...
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        No existen cotizaciones.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow">

      <table className="w-full">

        <thead className="bg-background">
          <tr>
            <th className="p-4 text-left">Nº</th>
            <th className="text-left">Cliente</th>
            <th className="text-left">Ejecutivo</th>
            <th className="text-left">Estado</th>
            <th className="text-right">Total</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {quotes.map((quote) => (

            <tr
              key={quote.id}
              className="border-t hover:bg-muted"
            >

              <td className="p-4 font-semibold">
                #{quote.numero}
              </td>

              <td>
                {quote.company.nombreFantasia ??
                  quote.company.razonSocial}
              </td>

              <td>
                {quote.user.nombre} {quote.user.apellido}
              </td>

              <td>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {quote.estado}
                </span>
              </td>

              <td className="text-right font-bold">
                $
                {Number(
                  quote.total,
                ).toLocaleString("es-CL")}
              </td>

              <td>

                <div className="flex justify-center gap-2">

                  {/* Ver */}
                  <Link href={`/quotes/${quote.id}`}>
                    <Button
                      size="icon"
                      variant="outline"
                    >
                      <Eye size={16} />
                    </Button>
                  </Link>

                  {/* Editar */}
                  <Link href={`/quotes/${quote.id}/edit`}>
                    <Button
                      size="icon"
                      variant="outline"
                    >
                      <Pencil size={16} />
                    </Button>
                  </Link>

                  {/* PDF */}
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `http://localhost:3001/api/quotes/${quote.id}/pdf`,
                        "_blank",
                      )
                    }
                  >
                    <FileText size={16} />
                  </Button>

                  {/* Notas */}
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      alert(
                        "Módulo de notas próximamente.",
                      )
                    }
                  >
                    <StickyNote size={16} />
                  </Button>

                  {/* Eliminar */}
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() =>
                      onDelete(quote.id)
                    }
                  >
                    <Trash2 size={16} />
                  </Button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}