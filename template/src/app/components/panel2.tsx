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
import { query } from "@/queries/generated/othertest@gmail.com/m88qxnma2tjehz9zzrj/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const colors = [
    'rgba(255, 99, 132, 1)', 
    'rgba(54, 162, 235, 1)', 
    'rgba(255, 206, 86, 1)', 
    'rgba(75, 192, 192, 1)', 
    'rgba(153, 102, 255, 1)', 
    'rgba(255, 159, 64, 1)',
  ];

  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => parseFloat(row[2])), // CO2 data
    borderColor: colors[index % colors.length],
    backgroundColor: colors[index % colors.length].replace('1', '0.2'),
    fill: false,
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'CO2 Emissions (tons)',
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg shadow-md p-6 w-[90%] mx-auto">
        <h2 className="text-xl font-semibold mb-4">CO2 Emissions by Country (2010 - 2020)</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}