"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { query } from "@/queries/generated/othertest@gmail.com/m6qk72hgbr07mdfk9ze/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => row[2]), // Population data
    borderColor: `rgba(${index * 30}, ${index * 50}, ${index * 100}, 1)`,
    backgroundColor: `rgba(${index * 30}, ${index * 50}, ${index * 100}, 0.4)`,
    borderWidth: 2,
    fill: true,
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  return (
    <div className="size-full p-2">
      <div className="bg-white rounded-lg shadow-md p-6 w-[90%] mx-auto">
        <h2 className="text-xl font-semibold mb-4">Population Growth (2010 - 2020)</h2>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}