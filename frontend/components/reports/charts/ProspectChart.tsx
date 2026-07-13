"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {

  data: {
    status: string;

    _count: {
      status: number;
    };

  }[];

}

export default function ProspectChart({
  data,
}: Props) {

  const chartData = data.map((item) => ({

    estado: item.status,

    cantidad: item._count.status,

  }));

  return (

    <ResponsiveContainer
      width="100%"
      height={320}
    >

      <BarChart data={chartData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="estado" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="cantidad"
          radius={[8, 8, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  );

}