"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardActivities from "@/components/dashboard/DashboardActivities";
import DashboardRecentCompanies from "@/components/dashboard/DashboardRecentCompanies";
import DashboardDrawer from "@/components/dashboard/DashboardDrawer";
import CompaniesDrawer from "@/components/dashboard/drawers/CompaniesDrawer";
import ProspectsDrawer from "@/components/dashboard/drawers/ProspectsDrawer";
import ActivitiesDrawer from "@/components/dashboard/drawers/ActivitiesDrawer";

import {
  dashboardService,
  DashboardResponse,
} from "@/services/dashboard.service";

export default function DashboardPage() {

  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [selectedCard, setSelectedCard] =
    useState("");

  async function loadDashboard() {

    try {

      const data =
        await dashboardService.getDashboard();

      setDashboard(data);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadDashboard();

  }, []);

  if (loading) {

    return (
      <div className="p-8">
        Cargando Dashboard...
      </div>
    );

  }

  if (!dashboard) {

    return (
      <div className="p-8">
        No fue posible cargar el Dashboard.
      </div>
    );

  }

  return (

    <>

      <div className="space-y-6">

        <DashboardHeader />

        <DashboardStats
          stats={dashboard.stats}
          onCardClick={(card) => {

            setSelectedCard(card);

            setDrawerOpen(true);

          }}
        />

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-2 text-lg font-bold">

              Prospectos por Estado

            </h2>

            <p className="text-slate-500">

              Próximamente gráfico comercial.

            </p>

          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-2 text-lg font-bold">

              Cotizaciones por Estado

            </h2>

            <p className="text-slate-500">

              Próximamente gráfico comercial.

            </p>

          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <DashboardActivities
            activities={dashboard.proximasActividades}
          />

          <DashboardRecentCompanies
            companies={dashboard.ultimasEmpresas}
          />

        </div>

      </div>

      <DashboardDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title={selectedCard.toUpperCase()}
      >

        {selectedCard === "empresas" && (

          <CompaniesDrawer />

        )}


        {selectedCard === "usuarios" && (

          <p>Lista de usuarios.</p>

        )}

        {selectedCard === "prospectos" && (

          <ProspectsDrawer />

        )}

         {selectedCard === "actividades" && (

          <ActivitiesDrawer />

        )}

      </DashboardDrawer>

    </>

  );

}