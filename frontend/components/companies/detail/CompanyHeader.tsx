"use client";

import {
  Building2,
  Pencil,
  ArrowLeft,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface CompanyHeaderProps {
  companyName: string;
  companyType: string;

  onBack?: () => void;

  onEdit?: () => void;

  onDelete?: () => void;
}

export default function CompanyHeader({
  companyName,
  companyType,
  onBack,
  onEdit,
  onDelete,
}: CompanyHeaderProps) {

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">

            <Building2 className="h-7 w-7 text-blue-700" />

          </div>

          <div>

            <h1 className="text-2xl font-bold">
              {companyName}
            </h1>

            <span className="mt-1 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {companyType}
            </span>

          </div>

        </div>

        <div className="flex gap-2">

          <Button
            variant="outline"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>

          <Button
            onClick={onEdit}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>

          <Button
            variant="destructive"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>

        </div>

      </div>

    </div>

  );

}

