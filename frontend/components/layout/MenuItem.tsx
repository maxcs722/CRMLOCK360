"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  icon: React.ReactNode;
  title: string;
}

export function MenuItem({
  href,
  icon,
  title,
}: Props) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all
      ${
        active
          ? "bg-blue-600 text-white"
          : "text-muted-foreground hover:bg-background dark:hover:bg-slate-800"
      }`}
    >
      {icon}

      <span>{title}</span>
    </Link>
  );
}