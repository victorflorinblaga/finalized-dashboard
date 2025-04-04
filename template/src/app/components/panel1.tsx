"use client";

import React from "react"
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator"
import { query } from "@/queries/generated/selam.geg@yahoo.com/m92wqx6e9mwepik3xtb/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => row[1] === "2008");

  return (
    <div className="w-full h-full p-2">
      <Table>
        <TableCaption>A list of sustainability data for the year 2008.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header} className="w-auto">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, index) => (
            <TableRow key={index} className="bg-yellow-300">
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="text-left">{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}