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
import { query } from "@/queries/generated/othertest@gmail.com/m7t5okcez7cf98ru22f/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const germanData = rows.filter(row => row[0] === "Germany");
  const gdpData = germanData.map(row => parseFloat(row[1]));
  const lowestGDPIndex = gdpData.indexOf(Math.min(...gdpData));
  
  return (
    <div className="w-full h-full p-2">
      <Table>
        <TableCaption>A list of GDP and year data for Germany.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="w-[100px]">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {germanData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className={`font-medium ${rowIndex === lowestGDPIndex ? "bg-green-300" : ""} ${cell === "2008" ? "bg-orange-300" : ""}`}>
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