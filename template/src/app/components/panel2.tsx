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
import { query } from "@/queries/generated/othertest@gmail.com/m7kivdyn0qisa65h8qum/query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const data = {
    labels: rows.map(row => row[1]), // rfq_id
    datasets: [
      {
        label: 'RFQ Volume (Currency)',
        backgroundColor: rows.map(row => parseInt(row[2]) > 75000 ? 'rgba(255,0,0,1)' : 'rgba(75,192,192,1)'),
        borderColor: 'rgba(255,255,255)',
        borderWidth: 2,
        data: rows.map(row => parseInt(row[2])), // rfq_volume
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'RFQ ID',
        },
      },
      y: {
        title: {
          display: true,
          text: 'RFQ Volume (Currency)',
        },
        ticks: {
          callback: function(value) {
            return '$' + value; // Add currency symbol
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-2">
      <div className="bg-white rounded-lg shadow-md p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">RFQ Volume by RFQ ID</h2>
        <Bar data={data} options={options} className="h-[80%]" />
      </div>
    </div>
  );
}