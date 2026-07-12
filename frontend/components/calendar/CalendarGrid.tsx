"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import CalendarDay from "./CalendarDay";

import {
  Activity,
} from "@/services/activity.service";

interface Props {
  currentMonth: Date;
  activities: Activity[];
  onDayClick(date: Date): void;
}

export default function CalendarGrid({
  currentMonth,
  activities,
  onDayClick,
}: Props) {

  const days = eachDayOfInterval({
    start: startOfWeek(
      startOfMonth(currentMonth),
      {
        weekStartsOn: 1,
      },
    ),

    end: endOfWeek(
      endOfMonth(currentMonth),
      {
        weekStartsOn: 1,
      },
    ),
  });

  return (

    <div>

      <div className="mb-2 grid grid-cols-7 text-center font-semibold text-slate-500">

        <div>Lun</div>
        <div>Mar</div>
        <div>Mié</div>
        <div>Jue</div>
        <div>Vie</div>
        <div>Sáb</div>
        <div>Dom</div>

      </div>

      <div className="grid grid-cols-7 gap-2">

        {days.map((day) => (

          <CalendarDay
            key={day.toISOString()}
            date={day}
            activities={activities}
            onClick={() => onDayClick(day)}
          />

        ))}

      </div>

    </div>

  );

}