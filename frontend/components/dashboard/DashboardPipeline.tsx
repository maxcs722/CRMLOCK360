"use client";

import { DashboardPipeline as Pipeline } from "@/services/dashboard.service";

interface Props {
  pipeline: Pipeline;
}

export default function DashboardPipeline({
  pipeline,
}: Props) {

  const etapas = [

    {
      nombre: "Nuevos",
      valor: pipeline.nuevos,
      color: "bg-blue-500",
    },

    {
      nombre: "Contactados",
      valor: pipeline.contactados,
      color: "bg-cyan-500",
    },

    {
      nombre: "Visitas",
      valor: pipeline.visitas,
      color: "bg-indigo-500",
    },

    {
      nombre: "Levantamientos",
      valor: pipeline.levantamientos,
      color: "bg-violet-500",
    },

    {
      nombre: "Cotizando",
      valor: pipeline.cotizando,
      color: "bg-orange-500",
    },

    {
      nombre: "Negociación",
      valor: pipeline.negociacion,
      color: "bg-yellow-500",
    },

    {
      nombre: "Ganados",
      valor: pipeline.ganados,
      color: "bg-green-600",
    },

    {
      nombre: "Perdidos",
      valor: pipeline.perdidos,
      color: "bg-red-600",
    },

  ];

  const maximo = Math.max(
    ...etapas.map((e) => e.valor),
    1,
  );

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Pipeline Comercial
      </h2>

      <div className="space-y-5">

        {etapas.map((etapa) => (

          <div key={etapa.nombre}>

            <div className="mb-2 flex justify-between text-sm font-medium">

              <span>{etapa.nombre}</span>

              <span>{etapa.valor}</span>

            </div>

            <div className="h-3 w-full rounded-full bg-slate-200">

              <div
                className={`h-3 rounded-full transition-all duration-700 ${etapa.color}`}
                style={{
                  width: `${(etapa.valor / maximo) * 100}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}