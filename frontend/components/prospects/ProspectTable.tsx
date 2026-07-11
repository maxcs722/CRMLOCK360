"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Prospect } from "@/services/prospect.service";
import ProspectStatusBadge from "./ProspectStatusBadge";

interface Props {
  prospects: Prospect[];
  loading: boolean;
  onDelete(id: string): void;
}

export default function ProspectTable({
  prospects,
  loading,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8">
        Cargando prospectos...
      </div>
    );
  }

  if (prospects.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
        No existen prospectos.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Título</th>
            <th className="text-left">Empresa</th>
            <th className="text-left">Ejecutivo</th>
            <th className="text-center">Estado</th>
            <th className="text-right">Valor</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {prospects.map((prospect) => {
            const empresa = prospect.company
              ? (
                  prospect.company.nombreFantasia?.trim()
                    ? prospect.company.nombreFantasia
                    : prospect.company.razonSocial
                )
              : "-";

            return (
              <tr
                key={prospect.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4 font-semibold">
                  {prospect.titulo}
                </td>

                <td>{empresa}</td>

                <td>
                  {prospect.ejecutivo
                    ? `${prospect.ejecutivo.nombre} ${prospect.ejecutivo.apellido}`
                    : "-"}
                </td>

                <td className="text-center">
                  <ProspectStatusBadge
                    status={prospect.status}
                  />
                </td>

                <td className="text-right font-bold">
                  $
                  {Number(
                    prospect.valorEstimado || 0,
                  ).toLocaleString("es-CL")}
                </td>

                <td>
                  <div className="flex justify-center gap-2">
                    <Link href={`/prospects/${prospect.id}`}>
                      <Button
                        size="icon"
                        variant="outline"
                      >
                        <Eye size={16} />
                      </Button>
                    </Link>

                    <Link
                      href={`/prospects/${prospect.id}/edit`}
                    >
                      <Button
                        size="icon"
                        variant="outline"
                      >
                        <Pencil size={16} />
                      </Button>
                    </Link>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() =>
                        onDelete(prospect.id)
                      }
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}