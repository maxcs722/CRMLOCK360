"use client";

import { useEffect, useState } from "react";

import ProspectToolbar from "@/components/prospects/ProspectToolbar";
import ProspectsView from "@/components/prospects/ProspectsView";

import {
  Pipeline,
  prospectService,
} from "@/services/prospect.service";

export default function ProspectsPage() {

  const [pipeline, setPipeline] =
    useState<Pipeline | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [view, setView] =
    useState<"pipeline" | "list">(
      "pipeline",
    );

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

  async function handleDelete(
    id: string,
  ) {

    const ok = window.confirm(
      "¿Eliminar este prospecto?",
    );

    if (!ok) return;

    try {

      await prospectService.deleteProspect(
        id,
      );

      await loadPipeline();

    } catch (error) {

      console.error(error);

      alert(
        "No fue posible eliminar el prospecto.",
      );

    }

  }

  if (loading) {

    return (

      <div className="p-8">

        Cargando prospectos...

      </div>

    );

  }

  if (!pipeline) {

    return (

      <div className="p-8">

        Error cargando prospectos.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Prospectos

        </h1>

        <p className="text-slate-500">

          Gestión Comercial

        </p>

      </div>

      <ProspectToolbar

        search={search}

        onSearch={setSearch}

        view={view}

        onChangeView={setView}

      />

      <ProspectsView

        pipeline={pipeline}

        view={view}

        search={search}

        loading={loading}

        onDelete={handleDelete}

      />

    </div>

  );

}