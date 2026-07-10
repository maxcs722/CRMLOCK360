"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import ProspectForm from "@/components/prospects/ProspectForm";

import {
  Prospect,
  CreateProspectDto,
  prospectService,
} from "@/services/prospect.service";

export default function EditProspectPage() {

  const params = useParams();

  const router = useRouter();

  const id = params.id as string;

  const [prospect, setProspect] =
    useState<Prospect | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadProspect();

  }, []);

  async function loadProspect() {

    try {

      const data =
        await prospectService.getProspect(id);

      setProspect(data);

    } finally {

      setLoading(false);

    }

  }

  async function handleSubmit(
    values: CreateProspectDto,
  ) {

    try {

      await prospectService.updateProspect(
        id,
        values,
      );

      router.push("/prospects");

    } catch (error) {

      console.error(error);

      alert(
        "No fue posible actualizar el prospecto.",
      );

    }

  }

  if (loading) {

    return (

      <div className="p-8">

        Cargando...

      </div>

    );

  }

  if (!prospect) {

    return (

      <div className="p-8">

        Prospecto no encontrado.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Editar Prospecto

        </h1>

        <p className="text-slate-500">

          Modifique la información del prospecto.

        </p>

      </div>

      <ProspectForm

        initialValues={{

          titulo: prospect.titulo,

          descripcion:
            prospect.descripcion,

          servicio:
            prospect.servicio,

          status:
            prospect.status,

          valorEstimado:
            prospect.valorEstimado,

          fechaContacto:
            prospect.fechaContacto,

          proximaAccion:
            prospect.proximaAccion,

          companyId:
            prospect.company?.id,

          ejecutivoId:
            prospect.ejecutivo?.id,

        }}

        onSubmit={handleSubmit}

      />

    </div>

  );

}