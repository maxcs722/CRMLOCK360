"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  companyService,
  Company,
} from "@/services/company.service";

import {
  usersService,
  User,
} from "@/services/users.service";

import {
  quoteService,
  Quote,
  QuoteItem,
} from "@/services/quote.service";

import QuoteItems from "./QuoteItems";
import QuoteTotals from "./QuoteTotals";

interface QuoteFormProps {
  mode: "create" | "edit";
  quoteId?: string;
}

export default function QuoteForm({
  mode,
  quoteId,
}: QuoteFormProps) {

  const [companies, setCompanies] =
    useState<Company[]>([]);

  const [users, setUsers] =
    useState<User[]>([]);

  const [companyId, setCompanyId] =
    useState("");

  const [userId, setUserId] =
    useState("");

  const [observaciones, setObservaciones] =
    useState("");

  const [items, setItems] = useState<QuoteItem[]>([
    {
      descripcion: "",
      cantidad: 1,
      precio: 0,
      descuento: 0,
    },
  ]);

  const [saving, setSaving] =
    useState(false);

  const [loading, setLoading] =
  useState(mode === "edit");

  useEffect(() => {

  loadData();

  if (
    mode === "edit" &&
    quoteId
  ) {

    loadQuote();

  }

}, []);

async function guardarCotizacion() {

  try {

    setSaving(true);

    if (mode === "create") {

      await quoteService.createQuote({

        companyId,

        userId,

        observaciones,

        items,

      });

      alert(
        "Cotización creada correctamente."
      );

    } else {

      await quoteService.updateQuote(

        quoteId!,

        {

          companyId,

          userId,

          observaciones,

          items,

        },

      );

      alert(
        "Cotización actualizada correctamente."
      );

    }

    history.back();

  } catch (error) {

    console.error(error);

    alert("Ocurrió un error.");

  } finally {

    setSaving(false);

  }

}

  async function loadData() {

    try {

      const companiesData =
        await companyService.getCompanies();

      setCompanies(companiesData);

    } catch (e) {

      console.error(e);

    }

    try {

      const usersData =
        await usersService.getUsers();

      setUsers(usersData);

    } catch (e) {

      console.error(e);

    }

  }

  async function loadQuote() {

  try {

    const quote =
      await quoteService.getQuote(
        quoteId!,
      );

    setCompanyId(
      quote.company.id,
    );

    setUserId(
      quote.user.id,
    );

    setObservaciones(
      quote.observaciones ?? "",
    );

    setItems(

      quote.items.map((item: QuoteItem) => ({

        descripcion:
          item.descripcion,

        cantidad:
          Number(item.cantidad),

        precio:
          Number(item.precio),

        descuento:
          Number(item.descuento),

      })),

    );

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

}

if (loading) {

  return (

    <div className="p-8">

      Cargando cotización...

    </div>

  );

}

const subtotal = items.reduce(
  (total, item) =>
    total +
    item.cantidad * item.precio -
    (item.descuento ?? 0),
  0,
);

const iva = subtotal * 0.19;

const total = subtotal + iva;

  return (

    <div>

      QuoteForm {mode}

    </div>

  );

}