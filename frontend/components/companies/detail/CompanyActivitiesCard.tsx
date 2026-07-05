"use client";

import { useState } from "react";

import {
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  ClipboardList,
  FileText,
  Car,
  StickyNote,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
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

  function getIcon(tipo: string) {

    switch (tipo) {

      case "LLAMADA":
        return <Phone className="h-5 w-5 text-blue-600" />;

      case "EMAIL":
        return <Mail className="h-5 w-5 text-purple-600" />;

      case "WHATSAPP":
        return <MessageCircle className="h-5 w-5 text-green-600" />;

      case "REUNION":
        return <Calendar className="h-5 w-5 text-cyan-600" />;

      case "VISITA":
        return <Car className="h-5 w-5 text-orange-600" />;

      case "TAREA":
        return <ClipboardList className="h-5 w-5 text-indigo-600" />;

      case "COTIZACION":
        return <FileText className="h-5 w-5 text-slate-700" />;

      case "NOTA":
        return <StickyNote className="h-5 w-5 text-yellow-600" />;

      default:
        return <MoreHorizontal className="h-5 w-5" />;

    }

  }

  async function handleSave(activity: any) {

    try {

      if (activity.id) {

        await activityService.updateActivity(
          activity.id,
          {
            titulo: activity.titulo,
            descripcion: activity.descripcion,
            tipo: activity.tipo,
            realizada: activity.realizada,
            fecha: activity.fecha,
            companyId: activity.companyId,
            prospectId: activity.prospectId,
            userId: activity.userId,
          },
        );

      } else {

        await activityService.createActivity({
          titulo: activity.titulo,
          descripcion: activity.descripcion,
          tipo: activity.tipo,
          realizada: activity.realizada,
          fecha: activity.fecha,
          companyId,
          prospectId: activity.prospectId,
          userId,
        });

      }

      if (onActivitiesChanged) {
        await onActivitiesChanged();
      }

      setDialogOpen(false);

    } catch (error: any) {

      console.log(error);

      alert(
        "No fue posible guardar la actividad."
      );

    }

  }

  async function handleDelete(id: string) {

    const ok = window.confirm(
      "¿Está seguro de eliminar esta actividad?\n\nEsta acción no se puede deshacer."
    );

    if (!ok) return;

    try {

      await activityService.deleteActivity(id);

      if (onActivitiesChanged) {
        await onActivitiesChanged();
      }

    } catch (error) {

      console.log(error);

      alert(
        "No fue posible eliminar la actividad."
      );

    }

  }

    return (
    <>

      <div className="rounded-xl border bg-white shadow-sm">

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-xl font-bold">
              Timeline Comercial
            </h2>

            <p className="text-sm text-slate-500">
              Historial de todas las actividades de la empresa
            </p>

          </div>

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

          <div className="p-10 text-center">

            <p className="text-slate-500">
              Todavía no existen actividades.
            </p>

          </div>

        ) : (

          <div className="p-6">

            {activities.map((activity) => (

              <div
                key={activity.id}
                className="relative pl-12 pb-10 last:pb-0"
              >

                <div
                  className="absolute left-5 top-0 h-full border-l border-slate-300"
                />

                <div
                  className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow"
                >

                  {activity.realizada ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-slate-400" />
                  )}

                </div>

                <div className="rounded-xl border bg-slate-50 p-5">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      {getIcon(activity.tipo)}

                      <div>

                        <h3 className="font-bold">
                          {activity.titulo}
                        </h3>

                        <p className="text-xs text-slate-500">
                          {new Date(activity.fecha).toLocaleString()}
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-2">

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

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDelete(activity.id)
                        }
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </Button>

                    </div>

                  </div>

                  {activity.descripcion && (

                    <p className="mt-4 text-slate-700">
                      {activity.descripcion}
                    </p>

                  )}

                  <div className="mt-5 flex items-center justify-between text-sm">

                    <span className="rounded-full bg-slate-200 px-3 py-1">
                      {activity.tipo}
                    </span>

                    <span>
                      {activity.realizada
                        ? "✅ Realizada"
                        : "⏳ Pendiente"}
                    </span>

                  </div>

                </div>

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