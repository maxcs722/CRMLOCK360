"use client";

import Link from "next/link";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Prospect } from "@/services/prospect.service";

interface Props {
  prospect: Prospect;
}

export default function ProspectCard({
  prospect,
}: Props) {

  return (

    <div className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="font-semibold text-slate-800">

            {prospect.titulo}

          </h3>

          <p className="mt-2 text-sm text-slate-500">

            {prospect.company?.nombreFantasia ||

              prospect.company?.razonSocial ||

              "Sin empresa"}

          </p>

        </div>

        <Link href={`/prospects/${prospect.id}`}>

          <Button
            size="icon"
            variant="outline"
          >

            <Eye className="h-4 w-4"/>

          </Button>

        </Link>

      </div>

      <div className="mt-4 flex justify-between text-xs text-slate-500">

        <span>

          {prospect.ejecutivo

            ? `${prospect.ejecutivo.nombre} ${prospect.ejecutivo.apellido}`

            : "Sin ejecutivo"}

        </span>

        <strong>

          $

          {Number(
            prospect.valorEstimado || 0,
          ).toLocaleString("es-CL")}

        </strong>

      </div>

    </div>

  );

}