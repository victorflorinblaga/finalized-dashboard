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
import { query } from "@/queries/generated/othertest@gmail.com/m88r76skskoi8y27wr8/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [countryFilter, setCountryFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => 
    row[0].toLowerCase().includes(countryFilter.toLowerCase()) &&
    row[1].includes(yearFilter)
  );

  const sortedRows = filteredRows.sort((a, b) => {
    const gdpA = parseFloat(a[2]);
    const gdpB = parseFloat(b[2]);
    return sortOrder === "asc" ? gdpA - gdpB : gdpB - gdpA;
  });

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Filter by country"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded mr-2 mb-2 md:mb-0 md:mr-2"
        />
        <input
          type="text"
          placeholder="Filter by year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded mb-2 md:mb-0 md:mr-2"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="asc">Sort by GDP (Lowest to Highest)</option>
          <option value="desc">Sort by GDP (Highest to Lowest)</option>
        </select>
      </div>
      <Table>
        <TableCaption>A list of GDP data by country and year.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={row[1] === "2008" ? "bg-yellow-200" : ""}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}