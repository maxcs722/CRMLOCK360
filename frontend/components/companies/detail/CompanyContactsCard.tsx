"use client";

import { useState } from "react";

import {
  User,
  Phone,
  Mail,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/contacts/ContactDialog";

import {
  contactService,
  Contact,
} from "@/services/contact.service";

interface CompanyContactsCardProps {
  companyId: string;
  contacts?: Contact[];
  onContactsChanged?: () => Promise<void>;
}

export default function CompanyContactsCard({
  companyId,
  contacts = [],
  onContactsChanged,
}: CompanyContactsCardProps) {

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedContact, setSelectedContact] =
    useState<Contact | null>(null);

  function handleNewContact() {
    setSelectedContact(null);
    setDialogOpen(true);
  }

  function handleEditContact(contact: Contact) {
    setSelectedContact(contact);
    setDialogOpen(true);
  }

  async function handleSave(contact: Contact) {

    try {

      if (contact.id) {

        await contactService.updateContact(
          contact.id,
          {
            nombre: contact.nombre,
            apellido: contact.apellido,
            cargo: contact.cargo ?? "",
            telefono: contact.telefono ?? "",
            whatsapp: contact.whatsapp ?? "",
            email: contact.email ?? "",
            observaciones: contact.observaciones ?? "",
          },
        );

      } else {

        await contactService.createContact({
          nombre: contact.nombre,
          apellido: contact.apellido,
          cargo: contact.cargo ?? "",
          telefono: contact.telefono ?? "",
          whatsapp: contact.whatsapp ?? "",
          email: contact.email ?? "",
          observaciones: contact.observaciones ?? "",
          companyId,
        });

      }

      if (onContactsChanged) {
        await onContactsChanged();
      }

      setDialogOpen(false);

    } catch (error) {

      console.error(error);

      alert(
        "No fue posible guardar el contacto."
      );

    }

  }

  async function handleDelete(id: string) {

  console.log("1 CLICK CONTACT");

  const ok = window.confirm(
    "¿Está seguro de eliminar este contacto?"
  );

  console.log("2 CONFIRM", ok);

  if (!ok) return;

  console.log("3 ANTES SERVICE");

  try {

    const resp = await contactService.deleteContact(id);

    console.log("4 RESPUESTA");
    console.log(resp);

    if (onContactsChanged) {
      await onContactsChanged();
    }

  } catch (error: any) {

    console.log("5 ERROR");
    console.log(error);

    console.log(error.response);

    console.log(error.response?.data);

  }

}

    return (
    <>

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-lg font-bold">
            Contactos
          </h2>

          <Button
            size="sm"
            onClick={handleNewContact}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Contacto
          </Button>

        </div>

        {contacts.length === 0 ? (

          <div className="rounded-lg border border-dashed p-10 text-center">

            <User className="mx-auto mb-3 h-10 w-10 text-slate-400" />

            <p className="font-semibold">
              No existen contactos
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Esta empresa todavía no tiene contactos registrados.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {contacts.map((contact) => (

              <div
                key={contact.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">

                    <User className="h-6 w-6 text-blue-700" />

                  </div>

                  <div>

                    <p className="font-semibold">
                      {contact.nombre} {contact.apellido}
                    </p>

                    <p className="text-sm text-slate-500">
                      {contact.cargo || "-"}
                    </p>

                    <div className="mt-2 flex gap-6 text-sm text-slate-600">

                      <div className="flex items-center gap-1">

                        <Phone size={14} />

                        {contact.telefono || "-"}

                      </div>

                      <div className="flex items-center gap-1">

                        <Mail size={14} />

                        {contact.email || "-"}

                      </div>

                    </div>

                  </div>

                </div>

                <div className="flex gap-2"></div>

                <div className="flex gap-2">

                                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleEditContact(contact)
                    }
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      handleDelete(contact.id)
                    }
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

            <ContactDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        contact={selectedContact}
        onSave={handleSave}
      />

    </>
  );

}





