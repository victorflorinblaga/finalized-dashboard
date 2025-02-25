"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { query } from "@/queries/generated/othertest@gmail.com/m7kkiuq82fqa9bdjmgb/query";

ChartJS.register(ArcElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const highestCO2Data = countries.map(country => {
    const countryRows = rows.filter(row => row[0] === country);
    const maxRow = countryRows.reduce((prev, current) => (parseFloat(current[2]) > parseFloat(prev[2]) ? current : prev));
    return { country, maxCO2Value: parseFloat(maxRow[2]), year: maxRow[1] };
  });

  highestCO2Data.sort((a, b) => a.country.localeCompare(b.country));

  const data = {
    labels: highestCO2Data.map(data => `${data.country} (${data.year})`),
    datasets: [{
      data: highestCO2Data.map(data => data.maxCO2Value),
      backgroundColor: highestCO2Data.map((_, index) => `rgba(${(index + 1) * 45}, 99, 132, 0.6)`),
      borderColor: highestCO2Data.map((_, index) => `rgba(${(index + 1) * 45}, 99, 132, 1)`),
      borderWidth: 1,
    }],
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-[80%]">
        <h2 className="text-xl font-semibold mb-4">Highest CO2 Emissions by Country</h2>
        <Pie data={data} />
      </div>
    </div>
  );
}