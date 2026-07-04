"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ContactForm, {
  Contact,
} from "./ContactForm";

interface ContactDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  contact?: Contact | null;

  onSave: (contact: Contact) => Promise<void>;
}

export default function ContactDialog({
  open,
  onOpenChange,
  contact,
  onSave,
}: ContactDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {contact
              ? "Editar Contacto"
              : "Nuevo Contacto"}
          </DialogTitle>
        </DialogHeader>

        <ContactForm
          contact={contact}
          onSave={async (data) => {
            await onSave(data);
          }}
          onCancel={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}