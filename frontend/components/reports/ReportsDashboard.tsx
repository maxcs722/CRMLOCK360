"use client";

import { useEffect, useState } from "react";

import ReportCard from "./ReportCard";

import {
  reportsService,
  DashboardReport,
} from "@/services/reports.service";

export default function ReportsDashboard() {

  const [data, setData] =
    useState<DashboardReport | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const dashboard =
          await reportsService.dashboard();

        setData(dashboard);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  if (loading) {

    return (
      <div className="p-8 text-center">
        Cargando reportes...
      </div>
    );

  }

  if (!data) {

    return (
      <div className="p-8 text-center text-red-500">
        No fue posible cargar los reportes.
      </div>
    );

  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Reportes
        </h1>

        <p className="text-slate-500">
          Resumen ejecutivo del CRM
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <ReportCard
          title="Empresas"
          value={data.empresas.total}
          subtitle={`${data.empresas.activas} activas`}
        />

        <ReportCard
          title="Prospectos"
          value={data.prospectos.total}
          subtitle={`${data.prospectos.ganados} ganados`}
        />

        <ReportCard
          title="Actividades"
          value={data.actividades.total}
          subtitle={`${data.actividades.pendientes} pendientes`}
        />

        <ReportCard
          title="Cotizaciones"
          value={data.cotizaciones.total}
          subtitle={`${data.cotizaciones.aceptadas} aceptadas`}
        />

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <ReportCard
          title="Prospectos perdidos"
          value={data.prospectos.perdidos}
        />

        <ReportCard
          title="Actividades realizadas"
          value={data.actividades.realizadas}
        />

        <ReportCard
          title="Cotizaciones rechazadas"
          value={data.cotizaciones.rechazadas}
        />

      </div>

    </div>

  );

}