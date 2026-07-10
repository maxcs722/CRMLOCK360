"use client";

import { Pipeline as PipelineType } from "@/services/prospect.service";

import PipelineColumn from "./PipelineColumn";

interface Props {

  pipeline: PipelineType;

}

export default function Pipeline({

  pipeline,

}: Props) {

  const columns = [

    {
      key: "NUEVO",
      title: "Nuevo",
    },

    {
      key: "CONTACTADO",
      title: "Contactado",
    },

    {
      key: "VISITA_AGENDADA",
      title: "Visita Agendada",
    },

    {
      key: "LEVANTAMIENTO",
      title: "Levantamiento",
    },

    {
      key: "COTIZANDO",
      title: "Cotizando",
    },

    {
      key: "NEGOCIACION",
      title: "Negociación",
    },

    {
      key: "GANADO",
      title: "Ganado",
    },

    {
      key: "PERDIDO",
      title: "Perdido",
    },

  ] as const;

  return (

    <div className="flex gap-4 overflow-x-auto pb-4">

      {columns.map((column) => (

        <PipelineColumn

          key={column.key}

          title={column.title}

          prospects={pipeline[column.key]}

        />

      ))}

    </div>

  );

}