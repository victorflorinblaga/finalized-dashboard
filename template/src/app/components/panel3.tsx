"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { query } from "@/queries/generated/selam.geg@yahoo.com/m90vxldsxvbpkbzzork/query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const supplierMap = {};
  rows.forEach(row => {
    const supplier = row[1]; // Assuming supplier_name is at index 1
    if (supplierMap[supplier]) {
      supplierMap[supplier]++;
    } else {
      supplierMap[supplier] = 1;
    }
  });

  const suppliers = Object.keys(supplierMap);
  const supplierCounts = Object.values(supplierMap);

  const data = {
    labels: suppliers,
    datasets: [
      {
        label: 'Supplier Count',
        data: supplierCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="w-full h-full p-4">
      <div className="min-w-full">
        <Bar data={data} options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Supplier Distribution',
            },
          },
        }} />
      </div>
    </div>
  );
}