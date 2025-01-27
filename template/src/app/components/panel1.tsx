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
import { query } from "@/queries/generated/othertest@gmail.com/m6f1h48w25p54ubbizvi/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export default function Page() {
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => row[2]), 
    borderColor: `rgba(${(index + 1) * 50}, ${(index + 1) * 30}, ${(index + 1) * 100}, 1)`,
    backgroundColor: `rgba(${(index + 1) * 50}, ${(index + 1) * 30}, ${(index + 1) * 100}, 0.4)`,
    borderWidth: 2,
    fill: false,
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[80%] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Population Growth (2010 - 2020)</h2>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}