"use client";

import React from "react"
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator"
import { query } from "@/queries/generated/othertest@gmail.com/m6z2egianmd8ctftrh/query";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const labels = rows.map(row => row[0]); // assuming first column is the label
  const dataValues = rows.map(row => parseInt(row[1], 10)); // assuming second column is the value

  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'RFQ Volume',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(255,255,255)',
        borderWidth: 2,
        data: dataValues,
      },
    ],
  };

  return (
    <div className="w-full h-full p-4">
      <Bar data={barData} options={{ responsive: true }} height={400} />
    </div>
  );
}