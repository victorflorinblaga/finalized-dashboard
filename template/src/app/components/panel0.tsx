"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m7k6zdeujbzghxhzre/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [filter, setFilter] = useState("");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => row[2].includes(filter));
  const co2PerCapitaIndex = headers.indexOf("co2_per_capita");
  const highestCo2Row = filteredRows.reduce((prev, curr) => {
    return parseFloat(curr[co2PerCapitaIndex]) > parseFloat(prev[co2PerCapitaIndex]) ? curr : prev;
  });

  return (
    <div className="w-full h-full p-4">
      <input 
        type="text" 
        placeholder="Filter CO2 values" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        className="mb-4 p-2 border rounded w-full md:w-1/2"
      />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`border-b ${row === highestCo2Row ? 'bg-yellow-100' : ''}`}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border px-4 py-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}