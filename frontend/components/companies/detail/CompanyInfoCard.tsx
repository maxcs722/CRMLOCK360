"use client";

import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
} from "lucide-react";

interface CompanyInfoCardProps {
  razonSocial: string;
  rut: string;
  giro?: string;
  direccion?: string;
  comuna?: string;
  region?: string;
  telefono?: string;
  email?: string;
  sitioWeb?: string;
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-3">
      <div className="mt-1 text-slate-500">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-slate-500">
          {label}
        </p>

        <p className="text-sm text-slate-900">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

export default function CompanyInfoCard({
  razonSocial,
  rut,
  giro,
  direccion,
  comuna,
  region,
  telefono,
  email,
  sitioWeb,
}: CompanyInfoCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-bold">
        Información General
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <InfoItem
          icon={<Building2 size={18} />}
          label="Razón Social"
          value={razonSocial}
        />

        <InfoItem
          icon={<FileText size={18} />}
          label="RUT"
          value={rut}
        />

        <InfoItem
          icon={<Building2 size={18} />}
          label="Giro"
          value={giro}
        />

        <InfoItem
          icon={<MapPin size={18} />}
          label="Dirección"
          value={direccion}
        />

        <InfoItem
          icon={<MapPin size={18} />}
          label="Comuna"
          value={comuna}
        />

        <InfoItem
          icon={<MapPin size={18} />}
          label="Región"
          value={region}
        />

        <InfoItem
          icon={<Phone size={18} />}
          label="Teléfono"
          value={telefono}
        />

        <InfoItem
          icon={<Mail size={18} />}
          label="Correo"
          value={email}
        />

        <InfoItem
          icon={<Globe size={18} />}
          label="Sitio Web"
          value={sitioWeb}
        />

      </div>

    </div>
  );
}