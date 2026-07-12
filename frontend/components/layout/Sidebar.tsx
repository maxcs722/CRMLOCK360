"use client";

import {
  Building2,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Activity,
  ReceiptText,
} from "lucide-react";

import { Logo } from "./Logo";
import { MenuItem } from "./MenuItem";

export function Sidebar() {
  return (
    <aside className="hidden w-72 border-r bg-background lg:flex lg:flex-col">

      <Logo />

      <nav className="flex flex-1 flex-col gap-2 px-3">

        <MenuItem
          href="/dashboard"
          icon={<LayoutDashboard size={20} />}
          title="Dashboard"
        />

        <MenuItem
          href="/companies"
          icon={<Building2 size={20} />}
          title="Empresas"
        />

        <MenuItem
          href="/prospects"
          icon={<ClipboardList size={20} />}
          title="Prospectos"
        />

        <MenuItem
          href="/activities"
          icon={<Activity size={20} />}
          title="Actividades"
        />

        

        <MenuItem
          href="/quotes"
          icon={<ReceiptText size={20} />}
          title="Cotizaciones"
        />

        <MenuItem
          href="/reports"
          icon={<FileText size={20} />}
          title="Reportes"
        />

        <MenuItem
          href="/settings"
          icon={<Settings size={20} />}
          title="Configuración"
        />

        <MenuItem
          href="/users"
          icon={<Users size={20} />}
          title="Usuarios"
        />

      </nav>
    </aside>
  );
}