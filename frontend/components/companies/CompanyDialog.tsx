"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CompanyForm from "./CompanyForm";

import {
  Company,
} from "@/services/company.service";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  company?: Company | null;

  onSuccess?: () => void;
}

export default function CompanyDialog({
  open,
  onOpenChange,
  company,
  onSuccess,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-4xl">

        <DialogHeader>

          <DialogTitle>
            {company
              ? "Editar Empresa"
              : "Nueva Empresa"}
          </DialogTitle>

          <DialogDescription>
            {company
              ? "Modifique la información de la empresa."
              : "Complete la información de la empresa."}
          </DialogDescription>

        </DialogHeader>

        <CompanyForm
          company={company}
          onSuccess={() => {
            onOpenChange(false);

            onSuccess?.();
          }}
        />

      </DialogContent>
    </Dialog>
  );
}