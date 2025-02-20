"use client";

import React from "react";
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
import { query } from "@/queries/generated/othertest@gmail.com/m7dhpnfdz2pa2q85vj/query";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const countries = [...new Set(rows.map(row => row[0]))];
  const colorPalette = [
    'rgba(255, 99, 132, 1)', // Red
    'rgba(54, 162, 235, 1)', // Blue
    'rgba(255, 206, 86, 1)', // Yellow
    'rgba(75, 192, 192, 1)', // Teal
    'rgba(153, 102, 255, 1)', // Purple
    'rgba(255, 159, 64, 1)', // Orange
    'rgba(255, 0, 255, 1)', // Magenta
    'rgba(0, 255, 255, 1)', // Cyan
    'rgba(0, 128, 0, 1)',   // Green
    'rgba(128, 0, 128, 1)', // Dark Purple
  ];

  const datasets = countries.map((country, index) => {
    const countryData = rows.filter(row => row[0] === country);
    const emissions = countryData.map(row => row[2]);

    return {
      label: country,
      data: emissions,
      backgroundColor: colorPalette[index % colorPalette.length],
      borderColor: colorPalette[index % colorPalette.length],
      borderWidth: 2,
      fill: false,
    };
  });

  const uniqueYears = [...new Set(rows.map(row => row[1]))];
  const maxEmissionsPerCountry = countries.map(country => {
    const countryData = rows.filter(row => row[0] === country);
    const maxEmissionRow = countryData.reduce((maxRow, row) => row[2] > maxRow[2] ? row : maxRow, countryData[0]);
    return { country, year: maxEmissionRow[1], amount: maxEmissionRow[2] };
  });

  const highlightedYears = uniqueYears.map(year => {
    return maxEmissionsPerCountry.find(entry => entry.year === year);
  });

  const data = {
    labels: uniqueYears,
    datasets: datasets.map((dataset, index) => {
      const highlightData = highlightedYears[index];

      return {
        ...dataset,
        pointBackgroundColor: uniqueYears.map(year =>
          highlightData && highlightData.year === year ? 'rgba(255, 0, 0, 1)' : dataset.borderColor
        ),
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} kg CO2`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'CO2 Emissions (kg)',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">CO2 Emissions Over Years (2010 - 2020)</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}