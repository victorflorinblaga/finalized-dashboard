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
import { query } from "@/queries/generated/othertest@gmail.com/m7afuzjd2ekm2uw6rzp/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const datasets = countries.map((country, index) => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => Number(row[2])), // CO2 emissions data
    backgroundColor: `rgba(${index * 50}, 99, 132, 0.6)`,
    borderColor: `rgba(${index * 50}, 99, 132, 1)`,
    borderWidth: 1,
    fill: false,
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  const highestEmission = rows.reduce((prev, curr) => {
    return Number(curr[2]) > Number(prev[2]) ? curr : prev;
  });
  
  const highlightCountry = highestEmission[0];
  const highlightYear = highestEmission[1];
  const highlightValue = highestEmission[2];

  return (
    <div className="w-full h-full p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-red-600 mb-4">CO2 Emissions by Country (2010 - 2020)</h2>
        <p className="text-lg mb-2">
          Highest CO2 Emissions: <span className="font-bold">{highlightCountry}</span> in <span className="font-bold">{highlightYear}</span> with <span className="font-bold">{highlightValue}</span> emissions.
        </p>
        <Line data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}