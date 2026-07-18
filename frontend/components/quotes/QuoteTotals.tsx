"use client";

interface Props {
  subtotal: number;
  iva: number;
  total: number;
}

export default function QuoteTotals({
  subtotal,
  iva,
  total,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="ml-auto w-96 space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal
          </span>

          <strong>
            $
            {subtotal.toLocaleString("es-CL")}
          </strong>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            IVA (19%)
          </span>

          <strong>
            $
            {iva.toLocaleString("es-CL")}
          </strong>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span>
              $
              {total.toLocaleString("es-CL")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}