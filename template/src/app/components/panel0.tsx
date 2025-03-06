"use client";

import React, { useState } from "react";
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
import { Toggle } from "@/components/ui/toggle";
import { query } from "@/queries/generated/othertest@gmail.com/m7x1n5hwjfk5y5b8ea/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [filter, setFilter] = useState("");
  const [showTopParent, setShowTopParent] = useState(false);

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => 
    row[1].toLowerCase().includes(filter.toLowerCase()) &&
    (!showTopParent || row[3] === 'true')
  );

  return (
    <div className="w-full h-full p-4">
      <input
        type="text"
        placeholder="Filter by supplier name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded-md w-full"
        aria-label="Filter by supplier name"
      />
      <div className="mb-4 flex items-center bg-yellow-200 p-2 rounded-lg">
        <Toggle 
          pressed={showTopParent} 
          onPressedChange={setShowTopParent}
          className="mr-2"
        >
          Show only top parents
        </Toggle>
      </div>
      <Table>
        <TableCaption>A list of suppliers.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="text-left font-bold">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, index) => (
            <TableRow key={index}>
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