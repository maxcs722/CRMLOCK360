"use client";

import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function Topbar() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <Menu className="cursor-pointer lg:hidden" />

        <div className="relative">
          <Search
            className="absolute left-3 top-3 text-muted-foreground"
            size={16}
          />

          <Input
            placeholder="Buscar..."
            className="w-80 pl-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer transition-colors hover:text-blue-500" />

        <button
          type="button"
          aria-label="Cambiar tema"
          className="rounded-lg p-2 transition hover:bg-muted"
          onClick={() =>
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }
        >
          {resolvedTheme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <Avatar>
          <AvatarFallback>EF</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}