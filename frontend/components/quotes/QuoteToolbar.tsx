"use client";

import Link from "next/link";

import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {

  search: string;

  onSearch(value: string): void;

}

export default function QuoteToolbar({

  search,

  onSearch,

}: Props) {

  return (

    <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">

      <div className="relative w-full md:w-96">

        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          className="w-full rounded-lg border py-2 pl-10 pr-3"
          placeholder="Buscar cotización..."
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
        />

      </div>

      <div className="flex items-center gap-3">

        <Link href="/quotes/new">

          <Button>

            <Plus
              size={18}
              className="mr-2"
            />

            Nueva Cotización

          </Button>

        </Link>

      </div>

    </div>

  );

}