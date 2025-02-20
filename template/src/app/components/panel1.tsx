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
import { query } from "@/queries/generated/othertest@gmail.com/m7dg49vvjviyn4i90a/query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const projectVolumes = rows.reduce((acc, row) => {
    const project = row[1]; // rfq_title
    const volume = parseFloat(row[2]); // rfq_volume
    acc[project] = (acc[project] || 0) + volume;
    return acc;
  }, {});

  const sortedProjects = Object.entries(projectVolumes)
    .sort((a, b) => b[1] - a[1]); // Sort descending by volume

  const data = {
    labels: sortedProjects.map(item => item[0]),
    datasets: [{
      label: 'RFQ Volume',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(255,255,255)',
      borderWidth: 2,
      data: sortedProjects.map(item => item[1]),
    }],
  };

  return (
    <div className="w-full h-full p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">RFQ Volume by Project</h2>
        <Bar data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}