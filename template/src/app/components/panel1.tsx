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
import { query } from "@/queries/generated/othertest@gmail.com/m7ka3oulcufa48gskua/query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const rfqTitles = rows.map(row => row[1]); // Assuming rfq_title is the 2nd column
  const volumes = rows.map(row => parseFloat(row[2]) || 0); // Assuming rfq_volume is the 3rd column

  const data = {
    labels: rfqTitles,
    datasets: [
      {
        label: 'RFQ Volume',
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(255, 255, 255)',
        borderWidth: 2,
        data: volumes,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">RFQ Volume Chart</h2>
        <Bar data={data} options={{ responsive: true }} className="h-[80%] w-[60%] mx-[10%]" />
      </div>
    </div>
  );
}