"use client";

import { useEffect, useState } from "react";
import {
  addMonths,
  format,
  subMonths,
} from "date-fns";

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

  const [selectedActivity, setSelectedActivity] =
    useState<Activity | null>(null);

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

  async function handleSaveActivity(
    activity: any,
  ) {

    if (!user) {

      alert("No hay un usuario autenticado.");

      return;

    }

    // SOLO enviar propiedades permitidas
    const dto = {

      titulo: activity.titulo,

      descripcion: activity.descripcion,

      tipo: activity.tipo,

      realizada: activity.realizada,

      fecha: activity.fecha,

      companyId: activity.companyId || "",

      prospectId: activity.prospectId || "",

      userId: user.id,

    };

    console.log("DTO enviado:");
    console.log(dto);

    if (selectedActivity) {

      await activityService.updateActivity(
        selectedActivity.id,
        dto,
      );

    } else {

      await activityService.createActivity(
        dto,
      );

    }

    await loadActivities();

    setDialogOpen(false);

    setSelectedActivity(null);

    setSelectedDate(null);

  }

  async function handleDeleteActivity(
    id: string,
  ) {

    const ok = confirm(
      "¿Desea eliminar esta actividad?"
    );

    if (!ok) return;

    await activityService.deleteActivity(id);

    await loadActivities();

    setDialogOpen(false);

    setSelectedActivity(null);

    setSelectedDate(null);

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

            setSelectedActivity(null);

            setSelectedDate(date);

            setDialogOpen(true);

          }}

          onActivityClick={(activity) => {

            setSelectedActivity(activity);

            setDialogOpen(true);

          }}

        />

      </div>

      <ActivityDialog
        open={dialogOpen}

        onOpenChange={(open) => {

          setDialogOpen(open);

          if (!open) {

            setSelectedActivity(null);

            setSelectedDate(null);

          }

        }}

        activity={
          selectedActivity
            ? selectedActivity
            : selectedDate
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

        onSave={handleSaveActivity}

        onDelete={handleDeleteActivity}

      />

    </>

  );

}