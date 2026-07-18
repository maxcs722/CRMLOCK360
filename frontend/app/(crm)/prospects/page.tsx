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

  useEffect(() => {
    loadProspects();
  }, []);

  async function loadProspects() {
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
      "¿Desea eliminar este prospecto?",
    );

    if (!ok) return;

    try {

      await prospectService.deleteProspect(id);

      await loadProspects();

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

        <p className="text-muted-foreground">
          Gestión Comercial
        </p>

      </div>

      <ProspectToolbar
        search={search}
        onSearch={setSearch}
      />

      <ProspectsView
        pipeline={pipeline}
        search={search}
        loading={loading}
        onDelete={handleDelete}
      />

    </div>
  );
}