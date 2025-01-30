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
import { query } from "@/queries/generated/othertest@gmail.com/m6jx62elxm7ha5ybty/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const colors = [
  'rgba(255, 99, 132, 0.4)',
  'rgba(54, 162, 235, 0.4)',
  'rgba(255, 206, 86, 0.4)',
  'rgba(75, 192, 192, 0.4)',
  'rgba(153, 102, 255, 0.4)',
  'rgba(255, 159, 64, 0.4)',
];

export default function Page() {
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => parseInt(row[2])), // Population data as integers
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length].replace(/0\.4/, '1'), // Adjust opacity for border
    borderWidth: 1,
    fill: false,
    tension: 0.4, // This controls the curvature of the line
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-[90%]">
        <h2 className="text-xl font-semibold mb-4">Population Growth (1990 - 2020)</h2>
        <Line 
          data={data} 
          options={{ 
            responsive: true,
            animations: {
              tension: {
                duration: 1000,
                easing: 'easeInOutBounce',
                from: 1,
                to: 0,
                loop: true
              }
            }
          }} 
        />
      </div>
    </div>
  );
}