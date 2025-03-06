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
import { query } from "@/queries/generated/othertest@gmail.com/m7x1v02rs8s5d6hq65e/query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const rfqIds = [...new Set(rows.map(row => row[3]))];
  
  const volumeData = rfqIds.map(rfqId => {
    const totalVolume = rows
      .filter(row => row[3] === rfqId)
      .reduce((sum, row) => sum + parseFloat(row[1]), 0);
    return { id: rfqId, volume: totalVolume };
  });

  const sortedVolumeData = volumeData.sort((a, b) => b.volume - a.volume);

  const sortedRfqIds = sortedVolumeData.map(data => data.id);
  const sortedVolumeMap = sortedVolumeData.map(data => data.volume);

  const data = {
    labels: sortedRfqIds,
    datasets: [
      {
        label: 'Summarized Volume per RFQ ID',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(255,255,255)',
        borderWidth: 2,
        data: sortedVolumeMap,
      },
    ],
  };

  return (
    <div className="w-full h-full p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">RFQ Volume Overview</h2>
        <Bar 
          data={data} 
          options={{ 
            responsive: true, 
            plugins: {
              legend: {
                display: false 
              },
            },
          }}
        />
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">RFQ ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Summarized Volume</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedVolumeData.map(({ id, volume }) => (
                <tr key={id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{id}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}