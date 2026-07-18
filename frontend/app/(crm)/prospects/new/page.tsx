"use client";

import { useRouter } from "next/navigation";

import ProspectForm from "@/components/prospects/ProspectForm";

import {
  CreateProspectDto,
  prospectService,
} from "@/services/prospect.service";

export default function NewProspectPage() {
  const router = useRouter();

  async function handleSubmit(
    data: CreateProspectDto,
  ) {
    try {
      const dto: any = { ...data };

      if (!dto.fechaContacto) {
        delete dto.fechaContacto;
      }

      if (!dto.proximaAccion) {
        delete dto.proximaAccion;
      }

      if (!dto.companyId) {
        delete dto.companyId;
      }

      if (!dto.ejecutivoId) {
        delete dto.ejecutivoId;
      }

      if (!dto.descripcion) {
        delete dto.descripcion;
      }

      console.log("DTO enviado:", dto);

      await prospectService.createProspect(dto);

      router.push("/prospects");

    } catch (error: any) {

      console.error(error);

      console.error(error.response?.data);

      alert(
        JSON.stringify(
          error.response?.data,
          null,
          2,
        ),
      );

    }
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Nuevo Prospecto
        </h1>

        <p className="text-muted-foreground">
          Registre una nueva oportunidad comercial.
        </p>

      </div>

      <ProspectForm
        onSubmit={handleSubmit}
      />

    </div>
  );
}