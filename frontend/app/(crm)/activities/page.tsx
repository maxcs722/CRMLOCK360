"use client";

import Calendar from "@/components/calendar/Calendar";

export default function ActivitiesPage() {

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Calendario
        </h1>

        <p className="text-muted-foreground">
          Gestión de actividades comerciales.
        </p>

      </div>

      <Calendar />

    </div>

  );

}