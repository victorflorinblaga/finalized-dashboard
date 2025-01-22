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
import { query } from "@/queries/generated/othertest@gmail.com/m6828u5r8fhn8g36pes/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export default function Page() {
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))]; // Extract unique countries
  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => row[2]), // Population data
    backgroundColor: `rgba(${75 + index * 20},192,192,0.4)`,
    borderColor: `rgba(${75 + index * 20},192,192,1)`,
    borderWidth: 1,
    fill: false,
  }));

  // Get unique years for x-axis labels
  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears, // Year (2010-2020) - unique
    datasets,
  };

  return (
    <div className="w-full h-full p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Population Growth (2010 - 2020)</h2>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}