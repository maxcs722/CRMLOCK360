"use client";

interface ReportCardProps {
  title: string;
  value: number;
  subtitle?: string;
}

export default function ReportCard({
  title,
  value,
  subtitle,
}: ReportCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-sm font-semibold text-slate-500">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-bold text-slate-800">
        {value}
      </p>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}