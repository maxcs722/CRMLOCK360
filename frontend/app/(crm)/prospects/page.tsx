"use client";

import { useEffect, useState } from "react";

import Pipeline from "@/components/prospects/Pipeline";

import {

  Pipeline as PipelineType,

  prospectService,

} from "@/services/prospect.service";

export default function ProspectsPage() {

  const [pipeline, setPipeline] =
    useState<PipelineType | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadPipeline();

  }, []);

  async function loadPipeline() {

    try {

      const data =
        await prospectService.getPipeline();

      setPipeline(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div className="p-8">

        Cargando Pipeline...

      </div>

    );

  }

  if (!pipeline) {

    return (

      <div className="p-8">

        Error cargando el Pipeline.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Pipeline Comercial

          </h1>

          <p className="text-slate-500">

            Gestión de Prospectos

          </p>

        </div>

      </div>

      <Pipeline
        pipeline={pipeline}
      />

    </div>

  );

}