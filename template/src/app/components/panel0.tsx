"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { query } from "@/queries/generated/othertest@gmail.com/m68252qcdjxp1otv36/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export default function Page() {
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  const labels = rows.map(row => row[0]); // Assuming the first column contains the labels
  const dataValues = rows.map(row => row[1]); // Assuming the second column contains the values

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: 'CO2 Emissions from Germany (2010 - 2020)',
        data: dataValues,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full h-full p-4">
      <Line data={lineData} options={{ responsive: true }} />
    </div>
  );
}