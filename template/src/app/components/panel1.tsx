"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { query } from "@/queries/generated/othertest@gmail.com/m6z3kgzibkf6bk93opv/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [filters, setFilters] = useState("");
  const [showTopParents, setShowTopParents] = useState(false);
  const [headers, rows, loading] = useQuery(url, query);
  
  if (loading) return <LoadingIndicator />;
  
  const filteredRows = rows.filter(row => 
    row[1].toLowerCase().includes(filters.toLowerCase()) &&
    (!showTopParents || row[4] === "true") // Toggle for showing top parents
  );

  return (
    <div className="w-full h-full p-4">
      <input
        type="text"
        placeholder="Filter by supplier name"
        className="mb-4 p-2 border border-gray-300 rounded w-full md:w-1/2"
        value={filters}
        onChange={(e) => setFilters(e.target.value)}
      />
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => setShowTopParents(!showTopParents)}
      >
        {showTopParents ? "Show All Suppliers" : "Show Only Top Parents"}
      </Button>
      <Table>
        <TableCaption>A list of suppliers and their details.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
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