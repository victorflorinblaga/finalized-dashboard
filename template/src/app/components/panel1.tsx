"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m6f11fwyuptoa7gyw7r/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const [headers, rows, loading] = useQuery(query);
  const [filter, setFilter] = useState("");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => 
    row[1].toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full h-full p-2">
      <input
        type="text"
        placeholder="Filter by country"
        className="mb-4 p-2 border rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Table>
        <TableCaption>A summary of population and GDP data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Population</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Year (2000 - 2020)</TableHead>
            <TableHead>GDP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}