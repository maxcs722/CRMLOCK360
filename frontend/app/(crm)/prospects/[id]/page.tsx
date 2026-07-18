"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import ProspectTabs from "@/components/ui/ProspectTabs";

import {
  Prospect,
  prospectService,
} from "@/services/prospect.service";

export default function ProspectDetailPage() {

  const params = useParams();

  const id = params.id as string;

  const [prospect, setProspect] =
    useState<Prospect | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("info");

  useEffect(() => {

    loadProspect();

  }, []);

  async function loadProspect() {

    try {

      const data =
        await prospectService.getProspect(id);

      setProspect(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  const tabs = [

    {
      id: "info",
      label: "Información",
    },

    {
      id: "activities",
      label: "Actividades",
    },

    {
      id: "quotes",
      label: "Cotizaciones",
    },

    {
      id: "notes",
      label: "Notas",
    },

    {
      id: "history",
      label: "Historial",
    },

  ];

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

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            {prospect.titulo}

          </h1>

          <p className="text-muted-foreground">

            Estado: {prospect.status}

          </p>

        </div>

        <Button
          variant="outline"
          onClick={() => history.back()}
        >

          Volver

        </Button>

      </div>

        <ProspectTabs
          tabs={tabs}
          active={activeTab}
          onChange={setActiveTab}
      />

      {activeTab === "info" && (

        <div className="space-y-6">

          <div className="rounded-xl border bg-card p-6">

            <h2 className="mb-4 text-xl font-bold">

              Información General

            </h2>

            <div className="grid grid-cols-2 gap-6">

              <div>

                <strong>Empresa</strong>

                <p>

                  {prospect.company?.nombreFantasia ||

                    prospect.company?.razonSocial ||

                    "Sin empresa"}

                </p>

              </div>

              <div>

                <strong>Ejecutivo</strong>

                <p>

                  {prospect.ejecutivo

                    ? `${prospect.ejecutivo.nombre} ${prospect.ejecutivo.apellido}`

                    : "Sin asignar"}

                </p>

              </div>

              <div>

                <strong>Servicio</strong>

                <p>

                  {prospect.servicio || "-"}

                </p>

              </div>

              <div>

                <strong>Valor Estimado</strong>

                <p>

                  $

                  {Number(

                    prospect.valorEstimado || 0,

                  ).toLocaleString("es-CL")}

                </p>

              </div>

              <div>

                <strong>Fecha de Contacto</strong>

                <p>

                  {prospect.fechaContacto

                    ? new Date(

                        prospect.fechaContacto,

                      ).toLocaleDateString("es-CL")

                    : "-"}

                </p>

              </div>

              <div>

                <strong>Próxima Acción</strong>

                <p>

                  {prospect.proximaAccion

                    ? new Date(

                        prospect.proximaAccion,

                      ).toLocaleDateString("es-CL")

                    : "-"}

                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border bg-card p-6">

            <h2 className="mb-4 text-xl font-bold">

              Descripción

            </h2>

            <p>

              {prospect.descripcion ||

                "Sin descripción"}

            </p>

          </div>

        </div>

      )}

      {activeTab === "activities" && (

        <div className="rounded-xl border bg-card p-12 text-center">

          <h2 className="text-xl font-bold">

            Actividades

          </h2>

          <p className="mt-2 text-muted-foreground">

            Próximamente podrás registrar llamadas, reuniones, visitas y seguimientos.

          </p>

        </div>

      )}

      {activeTab === "quotes" && (

        <div className="rounded-xl border bg-card p-12 text-center">

          <h2 className="text-xl font-bold">

            Cotizaciones

          </h2>

          <p className="mt-2 text-muted-foreground">

            Aquí aparecerán las cotizaciones asociadas al prospecto.

          </p>

        </div>

      )}

      {activeTab === "notes" && (

        <div className="rounded-xl border bg-card p-12 text-center">

          <h2 className="text-xl font-bold">

            Notas

          </h2>

          <p className="mt-2 text-muted-foreground">

            Aquí podrás registrar notas comerciales.

          </p>

        </div>

      )}

      {activeTab === "history" && (

        <div className="rounded-xl border bg-card p-12 text-center">

          <h2 className="text-xl font-bold">

            Historial

          </h2>

          <p className="mt-2 text-muted-foreground">

            Aquí se mostrará el historial completo del prospecto.

          </p>

        </div>

      )}

    </div>

  );

}