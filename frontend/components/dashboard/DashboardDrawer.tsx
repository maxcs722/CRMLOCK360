"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ReactNode } from "react";

interface Props {

  open: boolean;

  onOpenChange: (open: boolean) => void;

  title: string;

  children: ReactNode;

}

export default function DashboardDrawer({
  open,
  onOpenChange,
  title,
  children,
}: Props) {

  return (

    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent
        side="right"
        className="w-[520px] sm:w-[600px]"
      >

        <SheetHeader>

          <SheetTitle>

            {title}

          </SheetTitle>

        </SheetHeader>

        <div className="mt-6">

          {children}

        </div>

      </SheetContent>

    </Sheet>

  );

}