"use client";

import {
  CalendarClock,
  CheckCircle2,
  Circle,
} from "lucide-react";

import {
  UpcomingActivity,
} from "@/services/dashboard.service";

interface Props {
  activities: UpcomingActivity[];
}

export default function DashboardActivities({
  activities,
}: Props) {

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-2">

        <CalendarClock className="h-6 w-6 text-blue-600"/>

        <h2 className="text-xl font-bold">
          Próximas Actividades
        </h2>

      </div>

      {activities.length === 0 ? (

        <p className="text-slate-500">
          No existen actividades pendientes.
        </p>

      ) : (

        <div className="space-y-4">

          {activities.map((activity) => (

            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-lg border p-4"
            >

              {activity.realizada ? (

                <CheckCircle2 className="mt-1 h-6 w-6 text-green-600"/>

              ) : (

                <Circle className="mt-1 h-6 w-6 text-orange-500"/>

              )}

              <div className="flex-1">

                <h3 className="font-semibold">
                  {activity.titulo}
                </h3>

                <p className="text-sm text-slate-500">

                  {activity.company?.nombreFantasia ||
                    activity.company?.razonSocial ||
                    "Sin empresa"}

                </p>

                <p className="mt-1 text-xs text-slate-400">

                  {new Date(activity.fecha).toLocaleString()}

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}