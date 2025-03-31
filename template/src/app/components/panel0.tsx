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
import { query } from "@/queries/generated/selam.geg@yahoo.com/m8x15cnnq6ot2fud27/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const colors = [
    'rgba(75, 192, 192, 0.4)', // color for first country
    'rgba(255, 99, 132, 0.4)', // color for second country
    'rgba(255, 206, 86, 0.4)'  // color for third country
  ];
  
  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => parseFloat(row[2])), // CO2 data
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length].replace('0.4', '1'), // border color
    borderWidth: 1,
    fill: false,
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-[90%] md:w-[80%] lg:w-[70%]">
        <h2 className="text-xl font-semibold mb-4">CO2 Emissions (2010 - 2020)</h2>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}