"use client";

import { LayoutDashboard } from "lucide-react";

export default function DashboardHeader() {

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">

          <LayoutDashboard className="h-8 w-8 text-blue-700"/>

        </div>

        <div>

          <h1 className="text-3xl font-bold">

            Dashboard Ejecutivo

          </h1>

          <p className="text-slate-500">

            Resumen general del CRM LOCK360

          </p>

        </div>

      </div>

    </div>

  );

}