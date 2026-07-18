"use client";

interface Props {
  status: string;
}

const colors: Record<string, string> = {

  NUEVO:
    "bg-background text-foreground",

  CONTACTADO:
    "bg-blue-100 text-blue-700",

  VISITA_AGENDADA:
    "bg-yellow-100 text-yellow-700",

  LEVANTAMIENTO:
    "bg-purple-100 text-purple-700",

  COTIZANDO:
    "bg-indigo-100 text-indigo-700",

  NEGOCIACION:
    "bg-orange-100 text-orange-700",

  GANADO:
    "bg-green-100 text-green-700",

  PERDIDO:
    "bg-red-100 text-red-700",

};

export default function ProspectStatusBadge({
  status,
}: Props) {

  return (

    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] ??
        "bg-background text-muted-foreground"
      }`}
    >

      {status.replaceAll("_", " ")}

    </span>

  );

}