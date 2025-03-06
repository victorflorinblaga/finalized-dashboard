"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { query } from "@/queries/generated/othertest@gmail.com/m7xdb569lex95p8cicm/query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const datasets = uniqueYears.map((year, index) => ({
    label: year,
    data: countries.map(country => {
      const row = rows.find(row => row[0] === country && row[1] === year);
      return row ? parseFloat(row[2]) : 0;
    }),
    backgroundColor: `rgba(${(index + 1) * 50}, ${(index + 1) * 50}, 192, 0.5)`,
    borderColor: `rgba(${(index + 1) * 50}, ${(index + 1) * 50}, 192, 1)`,
    borderWidth: 2,
  }));

  const data = {
    labels: countries,
    datasets,
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg shadow-md p-6 w-[90%] mx-auto">
        <h2 className="text-xl font-semibold mb-4">CO2 Emissions (by Country)</h2>
        <Bar data={data} options={{ responsive: true }} className="h-[60%] w-full" />
      </div>
    </div>
  );
}