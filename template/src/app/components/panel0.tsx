"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m7kic9bedd20gq5keth/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  return (
    <div className="w-full h-full p-2">
      <Table>
        <TableCaption>A list of purchasing projects.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header.replace(/_/g, ' ')}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={row[2] === "In Progress" ? "bg-yellow-100" : ""}>
              {row.map((cell, cellIndex) => {
                if (cellIndex === 3) {
                  const formattedDate = format(new Date(cell), "dd.MM.yyyy");
                  return <TableCell key={cellIndex}>{formattedDate}</TableCell>;
                }
                return <TableCell key={cellIndex}>{cell}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}