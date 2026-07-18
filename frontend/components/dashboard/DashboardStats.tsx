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
  onCardClick?: (card: string) => void;
}

export default function DashboardStats({
  stats,
  onCardClick,
}: Props) {
  const cards = [
    {
      id: "empresas",
      title: "Empresas",
      value: stats.empresas,
      icon: Building2,
      color:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      id: "usuarios",
      title: "Usuarios",
      value: stats.usuarios,
      icon: Users,
      color:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      id: "prospectos",
      title: "Prospectos",
      value: stats.prospectos,
      icon: Briefcase,
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      id: "actividades",
      title: "Actividades Pendientes",
      value: stats.actividadesPendientes,
      icon: CalendarClock,
      color:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onCardClick?.(card.id)}
            className="
              rounded-xl
              border
              bg-card
              text-card-foreground
              p-6
              text-left
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-blue-500
              hover:shadow-xl
              active:scale-[0.98]
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-foreground">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon className="h-7 w-7" />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}