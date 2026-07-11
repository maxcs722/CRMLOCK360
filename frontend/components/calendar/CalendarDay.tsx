"use client";

import { format, isSameDay } from "date-fns";

import {
  Activity,
} from "@/services/activity.service";

interface Props {
  date: Date;
  activities: Activity[];
}

export default function CalendarDay({
  date,
  activities,
}: Props) {

  const dayActivities = activities.filter((activity) =>
    isSameDay(
      new Date(activity.fecha),
      date,
    ),
  );

  return (

    <div className="h-32 overflow-hidden rounded-xl border bg-white p-2 shadow-sm transition hover:border-blue-500 hover:shadow-md">

      <div className="flex items-center justify-between">

        <span className="text-sm font-semibold text-slate-700">
          {format(date, "d")}
        </span>

        {dayActivities.length > 0 && (

          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">

            {dayActivities.length}

          </span>

        )}

      </div>

      <div className="mt-2 space-y-1">

        {dayActivities.slice(0, 3).map((activity) => (

          <div
            key={activity.id}
            className="truncate rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
            title={activity.titulo}
          >

            {activity.titulo}

          </div>

        ))}

        {dayActivities.length > 3 && (

          <div className="text-center text-xs font-medium text-slate-500">

            +{dayActivities.length - 3} más

          </div>

        )}

      </div>

    </div>

  );

}