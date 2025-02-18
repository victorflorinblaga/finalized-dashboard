"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { query } from "@/queries/generated/othertest@gmail.com/m7ag5939en1hujcog4a/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [filters, setFilters] = useState("");
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => {
    const co2Index = headers.indexOf("co2");
    return row[co2Index]?.toString().includes(filters);
  });

  const highestCo2PerCapita = filteredRows.reduce((prev, curr) => {
    const co2PerCapitaIndex = headers.indexOf("co2_per_capita");
    const currCo2PerCapita = parseFloat(curr[co2PerCapitaIndex]);
    return currCo2PerCapita > prev.co2PerCapita ? { row: curr, co2PerCapita: currCo2PerCapita } : prev;
  }, { row: [], co2PerCapita: 0 });

  return (
    <div className="w-full h-full p-4">
      <input
        type="text"
        placeholder="🔍 Filter by CO2 values"
        value={filters}
        onChange={(e) => setFilters(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 w-full max-w-md"
      />
      <h2 className="text-xl font-semibold mb-4">Highest CO2 Emissions per Capita</h2>
      <Table>
        <TableCaption>A table displaying sustainability data.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {highestCo2PerCapita.row.length ? (
            <TableRow>
              {highestCo2PerCapita.row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}