"use client";

import Link from "next/link";

import {
  Search,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  search: string;
  onSearch(value: string): void;
}

export default function ProspectToolbar({
  search,
  onSearch,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Buscador */}
      <div className="relative w-full lg:w-96">

        <Search
          size={18}
          className="absolute left-3 top-3 text-muted-foreground"
        />

        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar prospecto..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />

      </div>

      {/* Botón Nuevo Prospecto */}
      <Button asChild>

        <Link href="/prospects/new">

          <Plus className="mr-2 h-4 w-4" />

          Nuevo Prospecto

        </Link>

      </Button>

    </div>
  );
}