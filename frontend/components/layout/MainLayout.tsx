"use client";

import { ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface Props {
  children: ReactNode;
}

export function MainLayout({
  children,
}: Props) {
  return (
    <div className="flex h-screen bg-background dark:bg-slate-950">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Topbar />

        <main className="flex-1 overflow-auto p-8">

          {children}

        </main>

      </div>

    </div>
  );
}