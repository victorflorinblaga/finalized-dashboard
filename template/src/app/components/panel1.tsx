"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m6uwl702pmkfqx8rf6e/query";
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
  const [minCo2, setMinCo2] = useState("");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => {
    const co2Value = parseFloat(row[3]); 
    return isNaN(co2Value) || co2Value >= (minCo2 ? parseFloat(minCo2) : 0);
  });

  return (
    <div className="w-full h-full p-2">
      <Table>
        <TableCaption>A list of sustainability data from Germany and France (2010-2020).</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>
                {header}
                {header === "co2" && (
                  <input
                    type="number"
                    placeholder="Min CO2"
                    value={minCo2}
                    onChange={(e) => setMinCo2(e.target.value)}
                    className="ml-2 p-1 border border-gray-300 rounded w-20"
                  />
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={row[1] === "2014" ? "bg-red-500" : ""}>
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