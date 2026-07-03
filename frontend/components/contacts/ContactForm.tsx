"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface Contact {
  id?: string;

  nombre: string;
  apellido: string;

  cargo?: string;

  telefono?: string;
  whatsapp?: string;

  email?: string;

  observaciones?: string;
}

interface ContactFormProps {
  contact?: Contact | null;

  onSave: (contact: Contact) => void;

  onCancel?: () => void;
}

export default function ContactForm({
  contact,
  onSave,
  onCancel,
}: ContactFormProps) {
  const emptyForm: Contact = {
    nombre: "",
    apellido: "",
    cargo: "",
    telefono: "",
    whatsapp: "",
    email: "",
    observaciones: "",
  };

  const [form, setForm] =
    useState<Contact>(emptyForm);

  useEffect(() => {
    if (contact) {
      setForm(contact);
    } else {
      setForm(emptyForm);
    }
  }, [contact]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) {
    setForm((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!form.nombre.trim()) {
      alert("Ingrese el nombre.");
      return;
    }

    if (!form.apellido.trim()) {
      alert("Ingrese el apellido.");
      return;
    }

    onSave(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">

        <Input
          name="nombre"
          placeholder="Nombre *"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <Input
          name="apellido"
          placeholder="Apellido *"
          value={form.apellido}
          onChange={handleChange}
          required
        />

        <Input
          name="cargo"
          placeholder="Cargo"
          value={form.cargo}
          onChange={handleChange}
        />

        <Input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
        />

        <Input
          name="whatsapp"
          placeholder="WhatsApp"
          value={form.whatsapp}
          onChange={handleChange}
        />

        <Input
          name="email"
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
        />

        <div className="col-span-2">

          <Textarea
            name="observaciones"
            rows={4}
            placeholder="Observaciones"
            value={form.observaciones}
            onChange={handleChange}
          />

        </div>

      </div>

      <div className="flex justify-end gap-2">

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button type="submit">
          Guardar Contacto
        </Button>

      </div>

    </form>
  );
}