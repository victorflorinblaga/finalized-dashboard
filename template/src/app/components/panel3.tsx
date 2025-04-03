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
import { query } from "@/queries/generated/selam.geg@yahoo.com/m90y3gqls6d0tl2zev/query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const rfqTitles = rows.map(row => row[2]); // rfq_title data
  const rfqVolumes = rows.map(row => parseInt(row[1])); // rfq_volume data

  const data = {
    labels: rfqTitles,
    datasets: [
      {
        label: 'RFQ Volume',
        data: rfqVolumes,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Volume: ${context.raw}`;
          },
        },
      },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'end',
        formatter: (value) => value,
        color: 'black',
        font: {
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'RFQ Titles',
        },
      },
      y: {
        title: {
          display: true,
          text: 'RFQ Volume',
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-[90%]">
        <h2 className="text-xl font-semibold mb-4">RFQ Volumes in 2024</h2>
        <Bar 
          data={data} 
          options={options} 
          className="h-[80%] w-[100%]" 
        />
      </div>
    </div>
  );
}