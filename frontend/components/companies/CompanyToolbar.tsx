"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import CompanyDialog from "./CompanyDialog";

interface CompanyToolbarProps {
  search: string;
  onSearch: (value: string) => void;
}

export default function CompanyToolbar({
  search,
  onSearch,
}: CompanyToolbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-md">
          <Input
            type="text"
            placeholder="🔍 Buscar empresa por nombre o RUT..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Button onClick={() => setOpen(true)}>
          + Nueva Empresa
        </Button>
      </div>

      <CompanyDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}