"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { companyService } from "@/services/company.service";

interface CompanyFormProps {
  onSuccess?: () => void;
}

export default function CompanyForm({
  onSuccess,
}: CompanyFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

      await companyService.createCompany({
        razonSocial: form.razonSocial,
        nombreFantasia: form.nombreFantasia,
        rut: form.rut,
        giro: form.giro,
        direccion: form.direccion,
        comuna: form.comuna,
        region: form.region,
        telefono: form.telefono,
        email: form.email,
        sitioWeb: form.sitioWeb,
        tipo: form.tipo,
        observaciones: form.observaciones,
      });

      setForm({
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
      });

      onSuccess?.();

    } catch (error) {
      console.error(error);
      alert("No fue posible crear la empresa.");
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

      <div className="flex justify-end">

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Guardando..."
            : "Guardar Empresa"}
        </Button>

      </div>
    </form>
  );
}