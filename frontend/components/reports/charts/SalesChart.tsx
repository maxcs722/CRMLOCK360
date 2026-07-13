"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {

  data: {

    mes: string;

    total: number;

  }[];

}

export default function SalesChart({
  data,
}: Props) {

  return (

    <ResponsiveContainer
      width="100%"
      height={320}
    >

      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="mes" />

        <YAxis />

        <Tooltip
          formatter={(value) =>
            Number(value).toLocaleString(
              "es-CL",
              {
                style: "currency",
                currency: "CLP",
                maximumFractionDigits: 0,
              },
            )
          }
        />

        <Line
          type="monotone"
          dataKey="total"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{
            r: 5,
          }}
        />

      </LineChart>

    </ResponsiveContainer>

  );

}