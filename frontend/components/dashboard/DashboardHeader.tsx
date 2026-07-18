"use client";

import { LayoutDashboard } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
          <LayoutDashboard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard Ejecutivo
          </h1>

          <p className="text-muted-foreground">
            Resumen general del CRM LOCK360
          </p>
        </div>
      </div>
    </div>
  );
}