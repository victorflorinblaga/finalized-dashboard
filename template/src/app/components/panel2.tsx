"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m7xe9q4t5j9mw1me6zn/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [filter, setFilter] = useState("");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => row[3].toString().startsWith(filter));

  const highestRow = filteredRows.reduce((maxRow, currentRow) => {
    return parseFloat(currentRow[4]) > parseFloat(maxRow[4]) ? currentRow : maxRow;
  }, filteredRows[0]);

  return (
    <div className="w-full h-full p-4 overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by CO2..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2 w-full md:w-1/2"
        />
      </div>
      {highestRow && (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-2 border border-gray-300 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-200">
              {highestRow.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 border border-gray-300 text-left">
                  {cell}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}