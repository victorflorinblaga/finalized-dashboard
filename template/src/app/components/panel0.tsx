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
import { query } from "@/queries/generated/othertest@gmail.com/m6tb4bbsbd3s11ez7fe/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  
  const colorPalette = [
    'rgba(75, 0, 0, 1)', 
    'rgba(0, 75, 0, 1)', 
    'rgba(0, 0, 75, 1)', 
    'rgba(75, 75, 0, 1)', 
    'rgba(75, 0, 75, 1)', 
    'rgba(0, 75, 75, 1)', 
    'rgba(100, 100, 100, 1)'
  ];

  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => row[2]), // CO2 data
    backgroundColor: colorPalette[index % colorPalette.length],
    borderColor: colorPalette[index % colorPalette.length],
    borderWidth: 1,
    fill: false,
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  return (
    <div className="w-full h-full p-2">
      <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-[80%]">
        <h2 className="text-xl font-semibold mb-4">CO2 Emissions by Country (2010 - 2020)</h2>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}