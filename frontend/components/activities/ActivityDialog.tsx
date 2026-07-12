"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import ActivityForm, {
  Activity,
} from "./ActivityForm";

interface ActivityDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  activity?: Activity | null;

  onSave: (activity: Activity) => Promise<void>;

  onDelete?: (id: string) => Promise<void>;
}

export default function ActivityDialog({
  open,
  onOpenChange,
  activity,
  onSave,
  onDelete,
}: ActivityDialogProps) {

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent className="max-w-2xl">

        <DialogHeader>

          <DialogTitle>

            {activity?.id
              ? "Editar Actividad"
              : "Nueva Actividad"}

          </DialogTitle>

        </DialogHeader>

        <ActivityForm
          activity={activity}
          onSave={async (data) => {
            await onSave(data);
          }}
          onCancel={() =>
            onOpenChange(false)
          }
        />

        {activity?.id && onDelete && (

          <DialogFooter>

            <Button
              variant="destructive"
              onClick={async () => {

                if (
                  !confirm(
                    "¿Desea eliminar esta actividad?"
                  )
                ) return;

                await onDelete(activity.id!);

              }}
            >

              🗑️ Eliminar actividad

            </Button>

          </DialogFooter>

        )}

      </DialogContent>

    </Dialog>

  );

}