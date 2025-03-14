"use client";

import React from "react";
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
import { query } from "@/queries/generated/othertest@gmail.com/m88mkc3tlxg4fw9ik6/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const germanyRows = rows.filter(row => row[0] === "Germany");
  const gdpColumnIndex = headers.indexOf("gdp");
  const lowestGdp = Math.min(...germanyRows.map(row => parseFloat(row[gdpColumnIndex])));

  return (
    <div className="w-full h-full p-2">
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
          {rows.map((row, rowIndex) => {
            const isLowestGdp = row[0] === "Germany" && parseFloat(row[gdpColumnIndex]) === lowestGdp;
            return (
              <TableRow key={rowIndex} className={`${row[1] === "2008" ? "bg-yellow-200" : ""} ${row[0] === "Germany" ? "bg-green-500" : ""} ${isLowestGdp ? "bg-red-200" : ""}`}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}