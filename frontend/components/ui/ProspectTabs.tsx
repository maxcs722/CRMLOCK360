"use client";

interface Tab {

  id: string;

  label: string;

}

interface Props {

  tabs: Tab[];

  active: string;

  onChange(id: string): void;

}

export default function Tabs({

  tabs,

  active,

  onChange,

}: Props) {

  return (

    <div className="border-b">

      <div className="flex gap-2">

        {tabs.map((tab) => (

          <button

            key={tab.id}

            onClick={() => onChange(tab.id)}

            className={`rounded-t-lg px-5 py-3 text-sm font-semibold transition

            ${
              active === tab.id

                ? "bg-blue-600 text-white"

                : "bg-background text-muted-foreground hover:bg-slate-200"

            }`}

          >

            {tab.label}

          </button>

        ))}

      </div>

    </div>

  );

}