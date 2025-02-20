"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m7dhysvp6ty4ttupn85/query";
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

  if (loading) return <LoadingIndicator />;

  const germanyRows = rows.filter(row => row[0] === "Germany");
  const lowestGdpRow = germanyRows.reduce((prev, curr) => {
    return parseFloat(prev[3]) < parseFloat(curr[3]) ? prev : curr;
  });

  return (
    <div className="w-full h-full p-2 overflow-x-auto">
      <Table>
        <TableCaption>Year with the lowest GDP for Germany.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {lowestGdpRow.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}