"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  companyService,
  Company,
} from "@/services/company.service";

 interface CompanyFormProps {
  company?: Company | null;
  onSuccess?: () => void;
}

export default function CompanyForm({
  company,
  onSuccess,
}: CompanyFormProps) {
  const [loading, setLoading] = useState(false);

  const emptyForm = {
    razonSocial: "",
    nombreFantasia: "",
    rut: "",
    giro: "",
    direccion: "",
    comuna: "",
    region: "",
    telefono: "",
    email: "",
    sitioWeb: "",
    tipo: "PROSPECTO",
    observaciones: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!company) {
      setForm(emptyForm);
      return;
    }

    setForm({
      razonSocial: company.razonSocial ?? "",
      nombreFantasia: company.nombreFantasia ?? "",
      rut: company.rut ?? "",
      giro: company.giro ?? "",
      direccion: company.direccion ?? "",
      comuna: company.comuna ?? "",
      region: company.region ?? "",
      telefono: company.telefono ?? "",
      email: company.email ?? "",
      sitioWeb: company.sitioWeb ?? "",
      tipo: company.tipo ?? "PROSPECTO",
      observaciones: company.observaciones ?? "",
    });
  }, [company]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >,
  ) {
    setForm((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    if (!form.razonSocial.trim()) {
      alert("Debe ingresar la Razón Social.");
      return;
    }

    if (!form.rut.trim()) {
      alert("Debe ingresar el RUT.");
      return;
    }

    try {
      setLoading(true);

      if (company) {
        await companyService.updateCompany(
          company.id,
          form,
        );
      } else {
        await companyService.createCompany(form);
      }

      setForm(emptyForm);

      onSuccess?.();

    } catch (error) {
      console.error(error);

      alert(
        company
          ? "No fue posible actualizar la empresa."
          : "No fue posible crear la empresa."
      );

    } finally {
      setLoading(false);
    }
  }

    return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">

        <Input
          name="razonSocial"
          placeholder="Razón Social *"
          value={form.razonSocial}
          onChange={handleChange}
          required
        />

        <Input
          name="nombreFantasia"
          placeholder="Nombre Fantasía"
          value={form.nombreFantasia}
          onChange={handleChange}
        />

        <Input
          name="rut"
          placeholder="RUT *"
          value={form.rut}
          onChange={handleChange}
          required
        />

        <Input
          name="giro"
          placeholder="Giro"
          value={form.giro}
          onChange={handleChange}
        />

        <Input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
        />

        <Input
          name="comuna"
          placeholder="Comuna"
          value={form.comuna}
          onChange={handleChange}
        />

        <Input
          name="region"
          placeholder="Región"
          value={form.region}
          onChange={handleChange}
        />

        <Input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
        />

        <Input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name="sitioWeb"
          placeholder="Sitio Web"
          value={form.sitioWeb}
          onChange={handleChange}
        />

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Tipo de Empresa
          </label>

          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          >
            <option value="PROSPECTO">
              Prospecto
            </option>

            <option value="CLIENTE">
              Cliente
            </option>
          </select>
        </div>

                <div className="col-span-2">
          <Textarea
            name="observaciones"
            placeholder="Observaciones"
            rows={4}
            value={form.observaciones}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="flex justify-end gap-2">

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? company
              ? "Actualizando..."
              : "Guardando..."
            : company
              ? "Actualizar Empresa"
              : "Guardar Empresa"}
        </Button>

      </div>

    </form>
  );
}

    