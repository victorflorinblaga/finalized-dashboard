"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { query } from "@/queries/generated/selam.geg@yahoo.com/m8x1xe1g9rdttv3munr/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [filter, setFilter] = useState("0");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => {
    const co2Index = headers.indexOf("co2");
    return parseFloat(row[co2Index]) > parseFloat(filter);
  });

  const sortedRows = filteredRows.sort((a, b) => {
    const co2PerCapitaIndex = headers.indexOf("co2_per_capita");
    return parseFloat(b[co2PerCapitaIndex]) - parseFloat(a[co2PerCapitaIndex]);
  });

  return (
    <div className="w-full h-full p-2 overflow-x-auto">
      <Input 
        type="number"
        placeholder="Filter by CO2 values" 
        value={filter} 
        onChange={e => setFilter(e.target.value)} 
        className="mb-4 max-w-xs"
      />
      <Table>
        <TableCaption>A table of sustainability data.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="text-left">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="text-left">{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}