"use client";

import { Prospect } from "@/services/prospect.service";

import ProspectCard from "./ProspectCard";

interface Props {

  title: string;

  prospects: Prospect[];

}

export default function PipelineColumn({

  title,

  prospects,

}: Props) {

  return (

    <div className="min-w-[320px] rounded-xl bg-background p-4">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="font-bold text-foreground">

          {title}

        </h2>

        <span className="rounded-full bg-card px-3 py-1 text-xs font-bold shadow">

          {prospects.length}

        </span>

      </div>

      <div className="space-y-3">

        {prospects.length === 0 ? (

          <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center text-sm text-muted-foreground">

            Sin prospectos

          </div>

        ) : (

          prospects.map((prospect) => (

            <ProspectCard

              key={prospect.id}

              prospect={prospect}

            />

          ))

        )}

      </div>

    </div>

  );

}