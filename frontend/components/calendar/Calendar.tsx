"use client";

import { useEffect, useState } from "react";
import { addMonths, format, subMonths } from "date-fns";

import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

import ActivityDialog from "@/components/activities/ActivityDialog";

import { useAuthContext } from "@/lib/auth/AuthProvider";

import {
  activityService,
  Activity,
} from "@/services/activity.service";

export default function Calendar() {
  const { user, loading } = useAuthContext();

  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  const [activities, setActivities] =
    useState<Activity[]>([]);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  useEffect(() => {
    console.log("Usuario autenticado:");
    console.log(user);
  }, [user]);

  async function loadActivities() {
    try {
      const data =
        await activityService.getActivities();

      setActivities(data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadActivities();
  }, []);

  async function handleCreateActivity(
    activity: any,
  ) {

    if (!user) {
      alert("No hay un usuario autenticado.");
      return;
    }

    const dto = {
      ...activity,
      userId: user.id,
    };

    console.log("DTO enviado:");
    console.log(dto);

    await activityService.createActivity(dto);

    await loadActivities();

    setDialogOpen(false);
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
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
          onDayClick={(date) => {
            setSelectedDate(date);
            setDialogOpen(true);
          }}
        />

      </div>

      <ActivityDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        activity={
          selectedDate
            ? {
                titulo: "",
                descripcion: "",
                tipo: "LLAMADA",
                realizada: false,
                fecha: format(
                  selectedDate,
                  "yyyy-MM-dd'T'09:00",
                ),
                companyId: "",
                prospectId: "",
                userId: user?.id ?? "",
              }
            : null
        }
        onSave={handleCreateActivity}
      />
    </>
  );
}