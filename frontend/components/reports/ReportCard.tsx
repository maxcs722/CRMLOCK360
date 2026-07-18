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
    <div className="rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-sm font-semibold text-muted-foreground">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-bold text-foreground">
        {value}
      </p>

      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}