"use client";

import { useEffect, useMemo, useState } from "react";

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

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const company = companies.find(
      (c) => c.id === value,
    );

    if (company) {
      setSearch(
        company.nombreFantasia ||
        company.razonSocial,
      );
    }
  }, [value, companies]);

  const filtered = useMemo(() => {

    if (!search.trim()) return companies;

    return companies.filter((company) => {

      const text = (
        company.nombreFantasia ||
        company.razonSocial
      ).toLowerCase();

      return text.includes(
        search.toLowerCase(),
      );

    });

  }, [search, companies]);

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

        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white shadow">

          {filtered.map((company) => (

            <button
              key={company.id}
              type="button"
              className="block w-full px-3 py-2 text-left hover:bg-slate-100"
              onClick={() => {

                setSearch(
                  company.nombreFantasia ||
                  company.razonSocial,
                );

                onChange(company.id);

                setOpen(false);

              }}
            >

              {company.nombreFantasia ||
                company.razonSocial}

            </button>

          ))}

        </div>

      )}

    </div>

  );

}