"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  currentMonth: Date;
  onPrev(): void;
  onNext(): void;
}

export default function CalendarHeader({
  currentMonth,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">

      <Button
        variant="outline"
        onClick={onPrev}
      >
        <ChevronLeft size={18} />
      </Button>

      <h2 className="text-2xl font-bold capitalize">
        {format(
          currentMonth,
          "MMMM yyyy",
          { locale: es },
        )}
      </h2>

      <Button
        variant="outline"
        onClick={onNext}
      >
        <ChevronRight size={18} />
      </Button>

    </div>
  );
}