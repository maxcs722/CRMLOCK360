"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ActivityForm, {
  Activity,
} from "./ActivityForm";

interface ActivityDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  activity?: Activity | null;

  onSave: (activity: Activity) => Promise<void>;
}

export default function ActivityDialog({
  open,
  onOpenChange,
  activity,
  onSave,
}: ActivityDialogProps) {

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent className="max-w-2xl">

        <DialogHeader>

          <DialogTitle>

            {activity
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

      </DialogContent>

    </Dialog>
  );
}