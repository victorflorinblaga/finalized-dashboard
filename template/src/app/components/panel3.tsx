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
import { query } from "@/queries/generated/othertest@gmail.com/m6uwq74w2bl8rwimh31/query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const datasets = [
    {
      label: "Germany",
      data: rows
        .filter(row => row[0] === "Germany")
        .map(row => Number(row[2])),
      backgroundColor: "rgba(255, 0, 0, 0.4)",
    },
    {
      label: "France",
      data: rows
        .filter(row => row[0] === "France")
        .map(row => Number(row[2])),
      backgroundColor: "rgba(0, 0, 255, 0.4)",
    }
  ];

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-[90%] lg:w-[80%]">
        <h2 className="text-xl font-semibold mb-4">Population Growth Germany and France (2010 - 2020)</h2>
        <Bar data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}