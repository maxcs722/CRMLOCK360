"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  data: {
    estado: string;
    _count: {
      estado: number;
    };
  }[];
}

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#64748b",
];

export default function QuoteChart({
  data,
}: Props) {

  const chartData = data.map((item) => ({
    name: item.estado,
    value: item._count.estado,
  }));

  return (

    <ResponsiveContainer
      width="100%"
      height={320}
    >

      <PieChart>

        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >

          {chartData.map((_, index) => (

            <Cell
              key={index}
              fill={
                COLORS[
                  index % COLORS.length
                ]
              }
            />

          ))}

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  );

}