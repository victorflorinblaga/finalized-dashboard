"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/selam.geg@yahoo.com/m8x1e280rw9f7hhnxd/query";
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

  const germanyRows = rows.filter(row => row[0] === "Germany").sort((a, b) => Number(a[2]) - Number(b[2]));

  return (
    <div className="w-full h-full">
      <div className="p-4">
        <Table>
          <TableCaption>A table of sustainability data for Germany, sorted by GDP.</TableCaption>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="w-[100px]">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {germanyRows.map((row, index) => (
              <TableRow key={index} className={row[1] === "2008" ? "bg-yellow-200" : ""}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="p-2">
                    {cellIndex === 2 ? `${Number(cell).toLocaleString()} USD` : 
                     cellIndex === 3 ? `${Number(cell).toLocaleString()} people` : 
                     cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}