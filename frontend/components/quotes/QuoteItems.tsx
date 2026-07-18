"use client";

import { Button } from "@/components/ui/button";
import { QuoteItem } from "@/services/quote.service";

interface Props {
  items: QuoteItem[];
  setItems: React.Dispatch<
    React.SetStateAction<QuoteItem[]>
  >;
}

export default function QuoteItems({
  items,
  setItems,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">
              Descripción
            </th>

            <th>Cantidad</th>

            <th>Precio</th>

            <th>Desc.</th>

            <th>Total</th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="p-2">
                <input
                  className="w-full rounded border p-2"
                  value={item.descripcion}
                  onChange={(e) => {
                    const copy = [...items];
                    copy[index].descripcion =
                      e.target.value;
                    setItems(copy);
                  }}
                />
              </td>

              <td>
                <input
                  type="number"
                  className="w-24 rounded border p-2"
                  value={item.cantidad}
                  onChange={(e) => {
                    const copy = [...items];
                    copy[index].cantidad =
                      Number(e.target.value);
                    setItems(copy);
                  }}
                />
              </td>

              <td>
                <input
                  type="number"
                  className="w-32 rounded border p-2"
                  value={item.precio}
                  onChange={(e) => {
                    const copy = [...items];
                    copy[index].precio =
                      Number(e.target.value);
                    setItems(copy);
                  }}
                />
              </td>

              <td>
                <input
                  type="number"
                  className="w-24 rounded border p-2"
                  value={item.descuento}
                  onChange={(e) => {
                    const copy = [...items];
                    copy[index].descuento =
                      Number(e.target.value);
                    setItems(copy);
                  }}
                />
              </td>

              <td className="text-right font-semibold">
                $
                {(
                  item.cantidad *
                  item.precio -
                  (item.descuento ?? 0)
                ).toLocaleString("es-CL")}
              </td>

              <td>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (items.length === 1)
                      return;

                    setItems(
                      items.filter(
                        (_, i) =>
                          i !== index,
                      ),
                    );
                  }}
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <Button
          onClick={() =>
            setItems([
              ...items,
              {
                descripcion: "",
                cantidad: 1,
                precio: 0,
                descuento: 0,
              },
            ])
          }
        >
          + Agregar Ítem
        </Button>
      </div>
    </div>
  );
}