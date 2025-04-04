"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { query } from "@/queries/generated/selam.geg@yahoo.com/m92x6g6a0y3b4jwla7hc/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [showMaxCo2, setShowMaxCo2] = useState(false);

  if (loading) return <LoadingIndicator />;

  const co2Index = headers.indexOf("co2");
  const maxCo2Value = Math.max(...rows.map(row => parseFloat(row[co2Index]) || 0));

  const displayRows = showMaxCo2 
    ? rows.filter(row => parseFloat(row[co2Index]) === maxCo2Value)
    : rows;

  return (
    <div className="w-full h-full p-4">
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          className="mr-2"
          checked={showMaxCo2}
          onChange={() => setShowMaxCo2(!showMaxCo2)}
        />
        Show highest CO2
      </label>
      <input
        type="text"
        value={showMaxCo2 ? maxCo2Value : "No data"}
        readOnly
        className="mb-4 p-2 border rounded w-full"
      />
      <Table>
        <TableCaption>A list of sustainability data.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayRows.map((row, rowIndex) => (
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