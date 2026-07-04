"use client";

import { useState } from "react";

import {
  Plus,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  ClipboardList,
  FileText,
  Car,
  StickyNote,
  MoreHorizontal,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import ActivityDialog from "@/components/activities/ActivityDialog";

import {
  activityService,
  Activity,
} from "@/services/activity.service";

interface Props {
  companyId: string;

  userId: string;

  activities?: Activity[];

  onActivitiesChanged?: () => Promise<void>;
}

export default function CompanyActivitiesCard({
  companyId,
  userId,
  activities = [],
  onActivitiesChanged,
}: Props) {

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedActivity, setSelectedActivity] =
    useState<Activity | null>(null);

  function icon(tipo: string) {

    switch (tipo) {

      case "LLAMADA":
        return <Phone size={18} />;

      case "EMAIL":
        return <Mail size={18} />;

      case "WHATSAPP":
        return <MessageCircle size={18} />;

      case "REUNION":
        return <Calendar size={18} />;

      case "VISITA":
        return <Car size={18} />;

      case "TAREA":
        return <ClipboardList size={18} />;

      case "COTIZACION":
        return <FileText size={18} />;

      case "NOTA":
        return <StickyNote size={18} />;

      default:
        return <MoreHorizontal size={18} />;
    }

  }

  async function handleSave(activity: any) {

    if (activity.id) {

      const { id, ...dto } = activity;

      await activityService.updateActivity(
        id,
        dto,
      );

    } else {

      await activityService.createActivity({
        ...activity,
        companyId,
        userId,
      });

    }

    setDialogOpen(false);

    if (onActivitiesChanged) {
      await onActivitiesChanged();
    }

  }

  return (
    <>

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-lg font-bold">
            Actividades
          </h2>

          <Button
            onClick={() => {
              setSelectedActivity(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nueva Actividad
          </Button>

        </div>

        {activities.length === 0 ? (

          <div className="rounded-lg border border-dashed p-10 text-center">

            <p className="text-slate-500">
              No existen actividades.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {activities.map((activity) => (

              <div
                key={activity.id}
                className="flex items-start justify-between rounded-lg border p-4"
              >

                <div className="flex gap-4">

                  <div className="mt-1 rounded-full bg-blue-100 p-2">

                    {icon(activity.tipo)}

                  </div>

                  <div>

                    <p className="font-semibold">
                      {activity.titulo}
                    </p>

                    <p className="text-sm text-slate-600">
                      {activity.descripcion}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">

                      {new Date(
                        activity.fecha,
                      ).toLocaleString()}

                    </p>

                  </div>

                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedActivity(activity);
                    setDialogOpen(true);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>

              </div>

            ))}

          </div>

        )}

      </div>

      <ActivityDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        activity={selectedActivity}
        onSave={handleSave}
      />

    </>
  );

}