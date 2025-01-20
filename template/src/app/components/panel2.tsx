"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m5z4c1u1xnw1rsh4xwe/query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export default function Page() {
  const [headers, rows, loading] = useQuery(query);
  
  const countries = Array.from(new Set(rows.map(row => row[0])));
  const datasets = countries.map(country => {
    return {
      label: country,
      data: rows.filter(row => row[0] === country).map(row => row[2]),
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.4)',
      borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
      borderWidth: 1,
    };
  });

  const lineData = {
    labels: Array.from(new Set(rows.map(row => row[1]))),
    datasets: datasets,
  };

  if (loading) return <LoadingIndicator />;

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Line 
          data={lineData} 
          options={{ 
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                ticks: {
                  callback: function(value) {
                    return value % 1 === 0 ? value : null;
                  }
                }
              }
            }
          }} 
          height={500}
        />
      </div>
    </div>
  );
}