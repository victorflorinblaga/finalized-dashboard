"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/selam.geg@yahoo.com/m92p45do6w53x7vgmcp/query";
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
  
  const filteredRows = rows.filter(row => row[0] === "Germany");

  return (
    <div className="w-full h-full p-2">
      <Table>
        <TableCaption>A list of sustainability data from 1990 to 2010 for Germany.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={row[1] === "2008" ? "bg-green-200" : ""}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className={row[1] === "2008" ? "text-green-600" : ""}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}