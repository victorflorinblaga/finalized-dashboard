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
import { query } from "@/queries/generated/othertest@gmail.com/m6f0g9m7jzb340x499/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const colors = [
  'rgba(255, 99, 132, 1)', // Red
  'rgba(54, 162, 235, 1)', // Blue
  'rgba(255, 206, 86, 1)', // Yellow
  'rgba(75, 192, 192, 1)', // Teal
  'rgba(153, 102, 255, 1)', // Purple
  'rgba(255, 159, 64, 1)', // Orange
];

export default function Page() {
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => row[2]), // CO2 data
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length],
    borderWidth: 1,
    fill: false,
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  return (
    <div className="w-full h-full p-2">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">CO2 Emissions by Country (2015 - 2022)</h2>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}