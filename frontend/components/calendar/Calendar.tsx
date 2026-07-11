"use client";

import { useEffect, useState } from "react";

import { addMonths, subMonths } from "date-fns";

import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

import {
  activityService,
  Activity,
} from "@/services/activity.service";

export default function Calendar() {

  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  const [activities, setActivities] =
    useState<Activity[]>([]);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await activityService.getActivities();

        setActivities(data);

      } catch (error) {

        console.error(
          "Error cargando actividades",
          error,
        );

      }

    }

    load();

  }, []);

  return (

    <div className="space-y-6">

      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={() =>
          setCurrentMonth(
            subMonths(currentMonth, 1),
          )
        }
        onNext={() =>
          setCurrentMonth(
            addMonths(currentMonth, 1),
          )
        }
      />

      <CalendarGrid
        currentMonth={currentMonth}
        activities={activities}
      />

    </div>

  );

}