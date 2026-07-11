"use client";

import ProspectTable from "./ProspectTable";

import {
  Pipeline,
  Prospect,
} from "@/services/prospect.service";

interface Props {
  pipeline: Pipeline;
  search: string;
  loading: boolean;
  onDelete(id: string): void;
}

export default function ProspectsView({
  pipeline,
  search,
  loading,
  onDelete,
}: Props) {

  const prospects: Prospect[] = [
    ...pipeline.NUEVO,
    ...pipeline.CONTACTADO,
    ...pipeline.VISITA_AGENDADA,
    ...pipeline.LEVANTAMIENTO,
    ...pipeline.COTIZANDO,
    ...pipeline.NEGOCIACION,
    ...pipeline.GANADO,
    ...pipeline.PERDIDO,
  ].filter((p) => {

    if (!search.trim()) return true;

    const empresa =
      p.company?.nombreFantasia ||
      p.company?.razonSocial ||
      "";

    return (
      p.titulo.toLowerCase().includes(search.toLowerCase()) ||
      empresa.toLowerCase().includes(search.toLowerCase())
    );

  });

  

  return (
    <ProspectTable
      prospects={prospects}
      loading={loading}
      onDelete={onDelete}
    />
  );
}