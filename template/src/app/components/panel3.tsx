"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/selam.geg@yahoo.com/m8x02ygifffr5nm5ggt/query";
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

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const labels = rows.map(row => row[1]); // Assuming year is at index 1
  const dataValues = rows.map(row => parseFloat(row[2])); // Assuming co2 is at index 2

  const backgroundColors = labels.map(label => label === "2002" ? 'rgba(255, 0, 0, 1)' : 'rgba(75,192,192,1)');

  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'CO2 Emissions',
        backgroundColor: backgroundColors,
        borderColor: 'rgba(255,255,255)',
        borderWidth: 2,
        data: dataValues,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Bar data={barData} options={{ responsive: true }} className="h-[80vh] w-[60vw] mx-auto" />
    </div>
  );
}