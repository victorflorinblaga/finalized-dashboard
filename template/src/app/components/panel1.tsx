"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m60j2wqsppew0fnvhlo/query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export default function Page() {
  
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;
  
  const years = Array.from(new Set(rows.map(row => row[1]))); // Unique years
  const germanyData = years.map(year => {
    const row = rows.find(row => row[0] === 'Germany' && row[1] === year);
    return row ? row[2] : 0; // Fallback to 0 if no data
  });
  const franceData = years.map(year => {
    const row = rows.find(row => row[0] === 'France' && row[1] === year);
    return row ? row[2] : 0; // Fallback to 0 if no data
  });

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Germany',
        data: germanyData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'France',
        data: franceData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Population Data (2010-2020)</h2>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}