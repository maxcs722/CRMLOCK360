"use client";

import { useEffect, useState } from "react";

import {
  prospectService,
  Prospect,
} from "@/services/prospect.service";

export default function ProspectsDrawer() {

  const [prospects, setProspects] =
    useState<Prospect[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await prospectService.getProspects();

        setProspects(data);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  if (loading) {

    return <p>Cargando prospectos...</p>;

  }

  if (prospects.length === 0) {

    return <p>No existen prospectos.</p>;

  }

  return (

    <div className="space-y-3">

      {prospects.map((item) => (

        <div
          key={item.id}
          className="rounded-lg border p-4 hover:bg-slate-50"
        >

          <h3 className="font-semibold">

            {item.titulo}

          </h3>

          <p className="text-sm text-slate-500">

            {item.company?.razonSocial ?? "Sin empresa"}

          </p>

          <div className="mt-2 flex justify-between text-sm">

            <span>

              {item.status}

            </span>

            <span>

              {item.valorEstimado
                ? `$ ${item.valorEstimado.toLocaleString()}`
                : "-"}

            </span>

          </div>

        </div>

      ))}

    </div>

  );

}