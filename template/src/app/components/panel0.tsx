"use client";

import React, { useEffect, useState } from "react";
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
import { query } from "@/queries/generated/selam.geg@yahoo.com/m92oqw70x4dmzsg5bq/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

const colors = {
  Germany: 'rgba(75, 192, 192, 0.6)',
  France: 'rgba(255, 99, 132, 0.6)',
  Spain: 'rgba(54, 162, 235, 0.6)',
};

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [highestEmissions, setHighestEmissions] = useState({ country: '', year: '', co2: -Infinity });

  useEffect(() => {
    if (!loading) {
      rows.forEach(row => {
        const co2 = parseFloat(row[2]);
        if (co2 > highestEmissions.co2) {
          setHighestEmissions({ country: row[0], year: row[1], co2 });
        }
      });
    }
  }, [loading, rows, highestEmissions.co2]);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const datasets = countries.map(country => ({
    label: country,
    data: rows
      .filter(row => row[0] === country)
      .map(row => parseFloat(row[2])), // CO2 data
    backgroundColor: colors[country] || 'rgba(0, 0, 0, 0.6)',
    borderColor: colors[country]?.replace('0.6', '1') || 'rgba(0, 0, 0, 1)',
    borderWidth: 1,
    fill: false,
  }));

  const uniqueYears = [...new Set(rows.map(row => row[1]))];

  const data = {
    labels: uniqueYears,
    datasets,
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'CO2 Emissions (in tons)',
        },
      },
    },
    elements: {
      point: {
        radius: (context) => {
          const { dataset, dataIndex } = context;
          if (dataset.label === 'Germany' && uniqueYears[dataIndex] === '2013') {
            return 8; // highlight radius
          }
          return 4; // regular radius
        },
        backgroundColor: (context) => {
          const { dataset, dataIndex } = context;
          if (dataset.label === 'Germany' && uniqueYears[dataIndex] === '2013') {
            return 'red'; // highlight color
          }
          return dataset.backgroundColor;
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">CO2 Emissions (2010 - 2020)</h2>
        <Line data={data} options={options} />
        {highestEmissions.co2 > 0 && (
          <div className="mt-4 p-2 border border-red-500 text-red-500 rounded">
            <strong>Highest CO2 Emissions:</strong> <span className="font-bold text-red-600">{highestEmissions.country}</span> in <span className="font-bold text-red-600">{highestEmissions.year}</span> with <span className="font-bold text-red-600">{highestEmissions.co2} tons</span>
          </div>
        )}
      </div>
    </div>
  );
}