"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { query } from "@/queries/generated/selam.geg@yahoo.com/m92pms0bl2l7ww5ksbk/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [filterValue, setFilterValue] = useState("");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => {
    const co2Index = headers.indexOf("co2");
    return co2Index > -1 && (filterValue === "" || parseFloat(row[co2Index]) >= parseFloat(filterValue));
  });

  return (
    <div className="w-full h-full p-4">
      <Input 
        placeholder="🔍 Filter CO2 values (e.g., ≥ 0, 5, 10, or enter a value)" 
        value={filterValue} 
        onChange={(e) => setFilterValue(e.target.value)} 
        className="mb-4 w-full"
      />
      <Table>
        <TableCaption>A list of sustainability data by country and year.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="text-left">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
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