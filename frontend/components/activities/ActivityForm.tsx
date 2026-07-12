"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/lib/auth/AuthProvider";

export interface Activity {
  id?: string;

  titulo: string;

  descripcion?: string;

  tipo:
    | "LLAMADA"
    | "EMAIL"
    | "WHATSAPP"
    | "REUNION"
    | "VISITA"
    | "TAREA"
    | "NOTA"
    | "COTIZACION"
    | "OTRO";

  realizada?: boolean;

  fecha?: string;

  companyId?: string;

  prospectId?: string;

  userId: string;
}

interface ActivityFormProps {
  activity?: Activity | null;

  onSave: (activity: Activity) => void;

  onCancel?: () => void;
}

export default function ActivityForm({
  activity,
  onSave,
  onCancel,
}: ActivityFormProps) {

  const emptyForm: Activity = {
    titulo: "",
    descripcion: "",
    tipo: "LLAMADA",
    realizada: false,
    fecha: new Date().toISOString().slice(0,16),
    companyId: "",
    prospectId: "",
    userId: "",
  };

  const { user } = useAuthContext();

  const [form, setForm] =
    useState<Activity>(emptyForm);

  useEffect(() => {
    if (activity) {
      setForm(activity);
    } else {
      setForm(emptyForm);
    }
  }, [activity]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((old) => ({
      ...old,
      [name]:
        name === "realizada"
          ? value === "true"
          : value,
    }));
  }

  function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    if (!form.titulo.trim()) {
      alert("Ingrese un título.");
      return;
    }

    onSave({
    ...form,
    userId: user?.id ?? "",
   });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <Input
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
      />

      <Textarea
        rows={4}
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
      />

      <select
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        className="w-full rounded-md border p-2"
      >
        <option value="LLAMADA">Llamada</option>
        <option value="EMAIL">Email</option>
        <option value="WHATSAPP">WhatsApp</option>
        <option value="REUNION">Reunión</option>
        <option value="VISITA">Visita</option>
        <option value="TAREA">Tarea</option>
        <option value="NOTA">Nota</option>
        <option value="COTIZACION">Cotización</option>
        <option value="OTRO">Otro</option>
      </select>

      <Input
        type="datetime-local"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
      />

      <select
        name="realizada"
        value={String(form.realizada)}
        onChange={handleChange}
        className="w-full rounded-md border p-2"
      >
        <option value="false">
          Pendiente
        </option>

        <option value="true">
          Realizada
        </option>

      </select>

      <div className="flex justify-end gap-2">

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button type="submit">
          Guardar Actividad
        </Button>

      </div>

    </form>
  );
}