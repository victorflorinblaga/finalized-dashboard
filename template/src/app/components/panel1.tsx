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
import { query } from "@/queries/generated/othertest@gmail.com/m7k6fiuoi6ymoy6lk7/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const colors = [
    'rgba(255, 99, 132, 0.4)',
    'rgba(54, 162, 235, 0.4)',
    'rgba(255, 206, 86, 0.4)',
    'rgba(75, 192, 192, 0.4)',
    'rgba(153, 102, 255, 0.4)',
    'rgba(255, 159, 64, 0.4)',
  ];

  const countries = [...new Set(rows.map(row => row[0]))];
  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => row[2]),
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length].replace(/0\.4/, '1'),
    borderWidth: 1,
    fill: false,
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-[80%]">
        <h2 className="text-2xl font-semibold mb-4">CO2 Emissions by Country (2010 - 2020)</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}