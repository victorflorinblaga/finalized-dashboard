"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m69867m8yiwsuqfickq/query";
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

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export default function Page() {
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  const years = rows.map(row => row[0]); // Assuming first item in each row is the year
  const populations = rows.map(row => row[1]); // Assuming second item in each row is the population

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Population',
        data: populations,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full h-full p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Population Over Years</h2>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}