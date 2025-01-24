"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m6aqy0geszp76hqpaid/query";
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

  if (loading) return <LoadingIndicator />;

  return (
    <div className="w-full h-full p-2">
      <Table>
        <TableCaption>A list of population and CO2 data by country and year.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              className={`transition-colors duration-200 ${row.includes("2019") || row.includes("2020") || row.includes("2021") || row.includes("2022") ? "bg-yellow-200 hover:bg-yellow-300" : ""}`}
            >
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