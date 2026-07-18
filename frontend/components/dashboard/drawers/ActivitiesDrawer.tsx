"use client";

import { useEffect, useState } from "react";

import {
  activityService,
  Activity,
} from "@/services/activity.service";

export default function ActivitiesDrawer() {

  const [activities, setActivities] =
    useState<Activity[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await activityService.getActivities();

        setActivities(data);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  if (loading) {

    return <p>Cargando actividades...</p>;

  }

  if (activities.length === 0) {

    return <p>No existen actividades.</p>;

  }

  return (

    <div className="space-y-3">

      {activities.map((item) => (

        <div
          key={item.id}
          className="rounded-lg border p-4 hover:bg-muted"
        >

          <div className="flex items-center justify-between">

            <h3 className="font-semibold">

              {item.titulo}

            </h3>

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

          <p className="mt-2 text-sm text-muted-foreground">

            {item.tipo}

          </p>

          <p className="text-sm text-muted-foreground">

            {new Date(item.fecha).toLocaleString("es-CL")}

          </p>

        </div>

      ))}

    </div>

  );

}