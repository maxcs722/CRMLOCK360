"use client";

import { Activity } from "@/services/activity.service";

interface Props {
  activity: Activity;
  onClick: (activity: Activity) => void;
}

export default function CalendarEvent({
  activity,
  onClick,
}: Props) {

  return (

    <button
      type="button"
      onClick={(e) => {

        e.stopPropagation();

        onClick(activity);

      }}
      className="block w-full truncate rounded-md bg-blue-100 px-2 py-1 text-left text-xs font-medium text-blue-700 transition hover:bg-blue-200"
      title={activity.titulo}
    >

      {activity.titulo}

    </button>

  );

}