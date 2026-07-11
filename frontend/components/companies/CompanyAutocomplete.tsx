"use client";

import { useEffect, useMemo, useState } from "react";

import { companyService } from "@/services/company.service";

interface Company {
  id: string;
  razonSocial: string;
  nombreFantasia?: string;
}

interface Props {
  companies: Company[];
  value?: string;
  onChange(companyId: string): void;
}

export default function CompanyAutocomplete({
  companies,
  value,
  onChange,
}: Props) {

  const [items, setItems] =
    useState<Company[]>(companies);

  const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    setItems(companies);
  }, [companies]);

  useEffect(() => {

    const company = items.find(
      (c) => c.id === value,
    );

    if (company) {

      setSearch(
        company.nombreFantasia?.trim()
          ? company.nombreFantasia
          : company.razonSocial,
      );

    }

  }, [value, items]);

  const filtered = useMemo(() => {

    if (!search.trim()) return items;

    return items.filter((company) => {

      const text = (
        company.nombreFantasia?.trim()
          ? company.nombreFantasia
          : company.razonSocial
      ).toLowerCase();

      return text.includes(
        search.toLowerCase(),
      );

    });

  }, [search, items]);

  const exists = filtered.some((company) => {

    const text = (
      company.nombreFantasia?.trim()
        ? company.nombreFantasia
        : company.razonSocial
    ).toLowerCase();

    return (
      text === search.toLowerCase()
    );

  });

  async function createCompany() {

  try {

    const company =
      await companyService.createCompany({

        razonSocial: search.trim(),

        nombreFantasia: "",

        rut: `TEMP-${Date.now()}`,

        tipo: "PROSPECTO",

      });

    setItems((old) => [
      ...old,
      company,
    ]);

    setSearch(company.razonSocial);

    onChange(company.id);

    setOpen(false);

  } catch (error: any) {

    console.log(error.response?.data);

    alert(
      JSON.stringify(error.response?.data)
    );

  }

}

  return (

    <div className="relative">

      <input
        value={search}
        placeholder="Buscar empresa..."
        className="w-full rounded-lg border p-2"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
      />

      {open && (

        <div className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-lg border bg-white shadow">

          {filtered.map((company) => (

            <button
              key={company.id}
              type="button"
              className="block w-full px-3 py-2 text-left hover:bg-slate-100"
              onClick={() => {

                setSearch(
                  company.nombreFantasia?.trim()
                    ? company.nombreFantasia
                    : company.razonSocial,
                );

                onChange(company.id);

                setOpen(false);

              }}
            >

              {company.nombreFantasia?.trim()
                ? company.nombreFantasia
                : company.razonSocial}

            </button>

          ))}

          {!exists && search.trim() !== "" && (

            <button
              type="button"
              onClick={createCompany}
              className="block w-full border-t bg-blue-50 px-3 py-2 text-left font-semibold text-blue-700 hover:bg-blue-100"
            >

              ➕ Crear "{search}"

            </button>

          )}

        </div>

      )}

    </div>

  );

}