"use client";

import { useEffect, useState } from "react";

import {
  User,
  Phone,
  Mail,
  Plus,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import ContactDialog from "@/components/contacts/ContactDialog";
import { Contact } from "@/components/contacts/ContactForm";

interface CompanyContactsCardProps {
  contacts?: Contact[];
}

export default function CompanyContactsCard({
  contacts = [],
}: CompanyContactsCardProps) {

  const [items, setItems] =
    useState<Contact[]>(contacts);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedContact, setSelectedContact] =
    useState<Contact | null>(null);

  useEffect(() => {
    setItems(contacts);
  }, [contacts]);

  function handleNewContact() {
    setSelectedContact(null);
    setDialogOpen(true);
  }

  function handleEditContact(
    contact: Contact,
  ) {
    setSelectedContact(contact);
    setDialogOpen(true);
  }

  function handleSave(contact: Contact) {

    if (selectedContact) {

      setItems((old) =>
        old.map((c) =>
          c.id === selectedContact.id
            ? {
                ...selectedContact,
                ...contact,
              }
            : c,
        ),
      );

    } else {

      setItems((old) => [
        ...old,
        {
          ...contact,
          id: Date.now().toString(),
        },
      ]);

    }

    setDialogOpen(false);
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

        {items.length === 0 ? (

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

            {items.map((contact) => (

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
                      {contact.cargo}
                    </p>

                    <div className="mt-2 flex gap-4 text-sm text-slate-600">

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