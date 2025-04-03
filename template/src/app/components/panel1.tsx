"use client";

import React from "react"
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator"
import { query } from "@/queries/generated/selam.geg@yahoo.com/m90xh4y5078zwix7qm1e/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  return (
    <div className="w-full h-full p-2 overflow-x-auto">
      <Table>
        <TableCaption>A list of projects.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => {
            const projectTitle = row[1].replace(/^http:\/\/example\.com\//, "");
            return (
              <TableRow key={index} className={row[2] === "In Progress" ? "bg-green-200" : ""}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {cellIndex === 1 ? projectTitle : cell}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}