"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m7di4rht80oqmos5oor/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  
  const [headers, rows, loading] = useQuery(url, query);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  if (loading) return <LoadingIndicator />;

  const highestCO2PerCapitaRow = rows.reduce((prev, current) => {
    return (parseFloat(current[2]) > parseFloat(prev[2]) ? current : prev);
  });

  const filteredRows = rows.filter(row =>
    row[1].toString().includes(filter)
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortOrder === "asc") {
      return parseFloat(a[2]) - parseFloat(b[2]);
    } else {
      return parseFloat(b[2]) - parseFloat(a[2]);
    }
  });

  return (
    <div className="w-full h-full p-4">
      <input 
        type="text" 
        placeholder="Filter by CO2 values"
        className="border-2 border-gray-300 p-2 mb-4 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="flex mb-4">
        <button 
          className="bg-blue-500 text-white p-2 rounded-lg mr-2"
          onClick={() => setSortOrder("asc")}
        >
          Sort by CO2 per Capita Ascending
        </button>
        <button 
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={() => setSortOrder("desc")}
        >
          Sort by CO2 per Capita Descending
        </button>
      </div>
      <Table>
        <TableCaption>A table of CO2 emissions data. Highest CO2 emissions per capita: {highestCO2PerCapitaRow[0]} - {highestCO2PerCapitaRow[2]}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">{headers[0]}</TableHead>
            <TableHead>{headers[1]}</TableHead>
            <TableHead>{headers[2]}</TableHead>
            <TableHead>{headers[3]}</TableHead>
            <TableHead>{headers[4]}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
              <TableCell>{row[4]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}