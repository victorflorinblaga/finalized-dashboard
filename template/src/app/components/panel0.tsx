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
import { query } from "@/queries/generated/othertest@gmail.com/m7t5dr5yc33lhf44i2v/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const datasets = countries.map((country, index) => {
    const co2Data = rows
      .filter(row => row[0] === country)
      .map(row => parseFloat(row[2])); // CO2 data
    const maxValue = Math.max(...co2Data);
    const minValue = Math.min(...co2Data);
    
    return {
      label: country,
      data: co2Data,
      borderColor: co2Data.map(value => (value === maxValue ? 'rgba(255, 0, 0, 1)' : value === minValue ? 'rgba(0, 255, 0, 1)' : `rgba(${index * 30 + 100}, ${index * 40 + 50}, 200, 1)`)),
      backgroundColor: `rgba(${index * 30 + 100}, ${index * 40 + 50}, 200, 0.5)`,
      borderWidth: 1,
      fill: false,
    };
  });

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
    <div className="w-full h-full p-2 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-[80%] max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">CO2 Emissions by Country (2010 - 2020)</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}