"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import UsersTable from "@/components/tables/UsersTable";
import UserDialog from "@/components/users/UserDialog";

export default function UsersPage() {

  const [open, setOpen] =
    useState(false);

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Usuarios

          </h1>

          <p className="text-muted-foreground">

            Administración de usuarios del CRM

          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >

          <Plus className="h-5 w-5" />

          Nuevo Usuario

        </button>

      </div>

      <UsersTable />

      <UserDialog
        open={open}
        onClose={() => setOpen(false)}
      />

    </div>

  );

}