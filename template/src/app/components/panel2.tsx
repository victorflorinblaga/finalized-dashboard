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
import { query } from "@/queries/generated/selam.geg@yahoo.com/m92w6yopd4jqrwl8rp8/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const datasets = [
    {
      label: "France",
      data: rows.filter(row => row[0] === "France").map(row => row[2]),
      borderColor: 'rgba(128, 0, 128, 1)', // purple
      backgroundColor: 'rgba(128, 0, 128, 0.5)',
      borderWidth: 1,
      fill: false,
    },
    {
      label: "Germany",
      data: rows.filter(row => row[0] === "Germany").map(row => row[2]),
      borderColor: 'rgba(0, 0, 255, 1)', // blue
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
      borderWidth: 1,
      fill: false,
    },
    {
      label: "Spain",
      data: rows.filter(row => row[0] === "Spain").map(row => row[2]),
      borderColor: 'rgba(255, 192, 203, 1)', // pink
      backgroundColor: 'rgba(255, 192, 203, 0.5)',
      borderWidth: 1,
      fill: false,
    },
  ];

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  return (
    <div className="w-full h-full p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">CO2 Emissions Over Years (2010 - 2020)</h2>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}