"use client";

import {
  Building2,
  Users,
  Briefcase,
  CalendarClock,
} from "lucide-react";

import { DashboardStats as Stats } from "@/services/dashboard.service";

interface Props {
  stats: Stats;
}

export default function DashboardStats({
  stats,
}: Props) {

  const cards = [

    {
      title: "Empresas",
      value: stats.empresas,
      icon: Building2,
      color: "bg-blue-100 text-blue-700",
    },

    {
      title: "Usuarios",
      value: stats.usuarios,
      icon: Users,
      color: "bg-green-100 text-green-700",
    },

    {
      title: "Prospectos",
      value: stats.prospectos,
      icon: Briefcase,
      color: "bg-purple-100 text-purple-700",
    },

    {
      title: "Actividades Pendientes",
      value: stats.actividadesPendientes,
      icon: CalendarClock,
      color: "bg-orange-100 text-orange-700",
    },

  ];

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {card.value}
                </h2>

              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon className="h-7 w-7" />
              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}