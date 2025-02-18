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
import { query } from "@/queries/generated/othertest@gmail.com/m7aa2jp8orv1fmhm3n/query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const uniqueRfqTitles = [...new Set(rows.map(row => row[2]))];
  const volumes = uniqueRfqTitles.map(title => 
    rows.filter(row => row[2] === title).reduce((acc, row) => acc + Number(row[1]), 0)
  );

  const data = {
    labels: uniqueRfqTitles,
    datasets: [
      {
        label: 'RFQ Volume',
        data: volumes,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-[90%] h-[80%]">
        <h2 className="text-xl font-semibold mb-4">RFQ Volume Overview</h2>
        <Bar data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}