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
import { query } from "@/queries/generated/othertest@gmail.com/m6hwsunw2km1ti818gr/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export default function Page() {
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => row[2]), // Population data
    backgroundColor: `rgba(${index * 40}, 99, 132, 0.4)`,
    borderColor: `rgba(${index * 40}, 99, 132, 1)`,
    borderWidth: 1,
    fill: false,
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  return (
    <div className="size-full p-2 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-[80%]">
        <h2 className="text-xl font-semibold mb-4">Population Growth (2005 - 2015)</h2>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}