"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CompanyForm from "./CompanyForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CompanyDialog({
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-4xl">

        <DialogHeader>
          <DialogTitle>
            Nueva Empresa
          </DialogTitle>

          <DialogDescription>
            Complete la información de la empresa.
          </DialogDescription>
        </DialogHeader>

        <CompanyForm
          onSuccess={() => {
            onOpenChange(false);
          }}
        />

      </DialogContent>
    </Dialog>
  );
}