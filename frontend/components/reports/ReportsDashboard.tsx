"use client";

import { useEffect, useState } from "react";

import ReportCard from "./ReportCard";
import ProspectChart from "./charts/ProspectChart";
import QuoteChart from "./charts/QuoteChart";

import {
  reportsService,
  DashboardReport,
} from "@/services/reports.service";
import SalesChart from "./charts/SalesChart";

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

        console.log("Dashboard", dashboard);

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

      <div className="flex h-96 items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="text-muted-foreground">

            Cargando Dashboard Ejecutivo...

          </p>

        </div>

      </div>

    );

  }

  if (!data) {

    return (

      <div className="rounded-xl bg-red-50 p-10 text-center">

        <h2 className="text-xl font-bold text-red-600">

          No fue posible cargar los reportes.

        </h2>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* CABECERA */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-foreground">

            Dashboard Ejecutivo

          </h1>

          <p className="mt-2 text-muted-foreground">

            Indicadores comerciales de LOCK360 CRM

          </p>

        </div>

      </div>

      {/* KPI PRINCIPALES */}

      <div className="grid gap-6 xl:grid-cols-4">

        <ReportCard
          title="Empresas Activas"
          value={data.kpis.empresas.activas}
          subtitle={`${data.kpis.empresas.total} empresas registradas`}
        />

        <ReportCard
          title="Prospectos"
          value={data.kpis.prospectos.total}
          subtitle={`${data.kpis.prospectos.ganados} ganados`}
        />

        <ReportCard
          title="Actividades"
          value={data.kpis.actividades.total}
          subtitle={`${data.kpis.actividades.pendientes} pendientes`}
        />

        <ReportCard
          title="Cotizaciones"
          value={data.kpis.cotizaciones.total}
          subtitle={`${data.kpis.cotizaciones.aceptadas} aceptadas`}
        />

      </div>

            {/* INDICADORES */}

      <div className="grid gap-6 lg:grid-cols-3">

        <ReportCard
          title="Prospectos perdidos"
          value={data.kpis.prospectos.perdidos}
          subtitle="Oportunidades perdidas"
        />

        <ReportCard
          title="Actividades realizadas"
          value={data.kpis.actividades.realizadas}
          subtitle="Gestiones completadas"
        />

        <ReportCard
          title="Cotizaciones rechazadas"
          value={data.kpis.cotizaciones.rechazadas}
          subtitle="Cotizaciones no adjudicadas"
        />

      </div>

      {/* GRAFICOS */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* Prospectos */}

        <div className="rounded-xl border bg-card p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-bold">

              Prospectos por Estado

            </h2>

            <p className="text-sm text-muted-foreground">

              Distribución de oportunidades comerciales

            </p>

          </div>

          {data.prospectosPorEstado.length > 0 ? (

            <ProspectChart
              data={data.prospectosPorEstado}
            />

          ) : (

            <div className="flex h-[320px] items-center justify-center rounded-lg border border-dashed">

              <div className="text-center">

                <p className="font-semibold text-muted-foreground">

                  Sin datos disponibles

                </p>

                <p className="text-sm text-muted-foreground">

                  Cree prospectos para visualizar este gráfico.

                </p>

              </div>

            </div>

          )}

        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">

  <div className="mb-6">

    <h2 className="text-xl font-bold">

      Evolución Mensual de Ventas

    </h2>

    <p className="text-sm text-muted-foreground">

      Cotizaciones aceptadas por mes

    </p>

  </div>

  <SalesChart
    data={data.ventasPorMes}
  />

</div>

        {/* Cotizaciones */}

        <div className="rounded-xl border bg-card p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-bold">

              Cotizaciones por Estado

            </h2>

            <p className="text-sm text-muted-foreground">

              Estado actual de las cotizaciones emitidas

            </p>

          </div>

          {data.cotizacionesPorEstado.length > 0 ? (

            <QuoteChart
              data={data.cotizacionesPorEstado}
            />

          ) : (

            <div className="flex h-[320px] items-center justify-center rounded-lg border border-dashed">

              <div className="text-center">

                <p className="font-semibold text-muted-foreground">

                  Sin cotizaciones

                </p>

                <p className="text-sm text-muted-foreground">

                  Cuando existan cotizaciones aparecerá el gráfico.

                </p>

              </div>

            </div>

          )}

        </div>

      </div>

            {/* TABLAS */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* ACTIVIDADES */}

        <div className="rounded-xl border bg-card p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-bold">

              Últimas Actividades

            </h2>

            <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">

              {data.ultimasActividades.length}

            </span>

          </div>

          <div className="space-y-3">

            {data.ultimasActividades.length === 0 ? (

              <div className="rounded-lg border border-dashed p-8 text-center">

                <p className="font-medium text-muted-foreground">

                  No existen actividades.

                </p>

              </div>

            ) : (

              data.ultimasActividades.map((item) => (

                <div
                  key={item.id}
                  className="rounded-lg border p-4 transition hover:bg-muted"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="font-semibold">

                        {item.titulo}

                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">

                        🏢 {item.company?.nombre ?? "Sin empresa"}

                      </p>

                      <p className="text-sm text-muted-foreground">

                        👤 {item.user?.nombre} {item.user?.apellido}

                      </p>

                      <p className="text-xs text-muted-foreground mt-1">

                        {new Date(item.fecha).toLocaleDateString("es-CL")}

                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.realizada
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {item.realizada
                        ? "Realizada"
                        : "Pendiente"}

                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

        {/* COTIZACIONES */}

        <div className="rounded-xl border bg-card p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-bold">

              Últimas Cotizaciones

            </h2>

            <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">

              {data.ultimasCotizaciones.length}

            </span>

          </div>

          <div className="space-y-3">

            {data.ultimasCotizaciones.length === 0 ? (

              <div className="rounded-lg border border-dashed p-8 text-center">

                <p className="font-medium text-muted-foreground">

                  No existen cotizaciones.

                </p>

              </div>

            ) : (

              data.ultimasCotizaciones.map((item) => (

                <div
                  key={item.id}
                  className="rounded-lg border p-4 transition hover:bg-muted"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="font-semibold">

                        Cotización #{item.numero}

                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">

                        🏢 {item.company?.nombre ?? "Sin empresa"}

                      </p>

                      <p className="text-sm text-muted-foreground">

                        👤 {item.user?.nombre} {item.user?.apellido}

                      </p>

                      <p className="text-sm font-semibold text-blue-700 mt-2">

                        {Number(item.total).toLocaleString("es-CL", {

                          style: "currency",

                          currency: "CLP",

                          maximumFractionDigits: 0,

                        })}

                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.estado === "ACEPTADA"
                          ? "bg-green-100 text-green-700"
                          : item.estado === "ENVIADA"
                          ? "bg-blue-100 text-blue-700"
                          : item.estado === "RECHAZADA"
                          ? "bg-red-100 text-red-700"
                          : "bg-background text-foreground"
                      }`}
                    >

                      {item.estado}

                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  );

}