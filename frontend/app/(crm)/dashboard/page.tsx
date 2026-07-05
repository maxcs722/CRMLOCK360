"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardPipeline from "@/components/dashboard/DashboardPipeline";
import DashboardActivities from "@/components/dashboard/DashboardActivities";
import DashboardRecentCompanies from "@/components/dashboard/DashboardRecentCompanies";

import {
  dashboardService,
  DashboardResponse,
} from "@/services/dashboard.service";

export default function DashboardPage() {

  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

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

    <div className="space-y-6">

      <DashboardHeader />

      <DashboardStats
        stats={dashboard.stats}
      />

      <DashboardPipeline
        pipeline={dashboard.pipeline}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <DashboardActivities
          activities={dashboard.proximasActividades}
        />

        <DashboardRecentCompanies
          companies={dashboard.ultimasEmpresas}
        />

      </div>

    </div>

  );

}