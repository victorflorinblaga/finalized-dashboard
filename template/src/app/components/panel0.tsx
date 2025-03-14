"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m88rkmzd655rpqllmy/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [filterText, setFilterText] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => row[3].includes(filterText)); // Assuming CO2 values are in the 4th column

  const sortedRows = [...filteredRows].sort((a, b) => {
    const co2PerCapitaA = parseFloat(a[4]);
    const co2PerCapitaB = parseFloat(b[4]);
    return isSorted ? co2PerCapitaB - co2PerCapitaA : co2PerCapitaA - co2PerCapitaB;
  });

  return (
    <div className="w-full h-full p-2">
      <Label htmlFor="co2-filter" className="mb-2 block">
        Filter by CO2 values
      </Label>
      <Input
        id="co2-filter"
        type="text"
        placeholder="Enter CO2 value"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <button
        onClick={() => setIsSorted(prev => !prev)}
        className="mb-4 p-2 border border-gray-500 rounded bg-gray-200 hover:bg-gray-300"
      >
        Sort CO2 per Capita {isSorted ? 'Descending' : 'Ascending'}
      </button>
      <Table>
        <TableCaption>A list of countries and their CO2 emissions.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}