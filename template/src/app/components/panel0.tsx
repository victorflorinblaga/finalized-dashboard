"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { query } from "@/queries/generated/othertest@gmail.com/m68209dh5yer051t3in/query";

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Page() {
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  const countries = rows.map(row => row[0]); // Assuming the first column contains country names
  const co2Emissions = rows.map(row => row[1]); // Assuming the second column contains CO2 emissions
  const populations = rows.map(row => row[2]); // Assuming the third column contains populations

  const data = {
    datasets: [
      {
        label: 'Population vs CO2 Emissions (2020)',
        data: countries.map((country, index) => ({
          x: co2Emissions[index],
          y: populations[index],
        })),
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'CO2 Emissions',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Population',
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Population vs CO2 Emissions (2020)</h2>
        <Scatter data={data} options={options} />
      </div>
    </div>
  );
}