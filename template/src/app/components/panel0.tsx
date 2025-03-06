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
import { query } from "@/queries/generated/othertest@gmail.com/m7xb3t2d4pyxmal5hyi/query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const countrySums = {};

  rows.forEach(row => {
    const country = row[0];
    const co2 = parseFloat(row[2]);
    if (!countrySums[country]) {
      countrySums[country] = 0;
    }
    countrySums[country] += co2;
  });

  const countries = Object.keys(countrySums);
  const data = {
    labels: countries,
    datasets: [{
      label: 'Total CO2 Emissions',
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: countries.map(country => countrySums[country]),
    }],
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-[90%] max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Total CO2 Emissions by Country (2010 - 2020)</h2>
        <Bar data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}