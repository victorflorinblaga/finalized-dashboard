"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m6ghafnjr9dk2hgos3h/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [headers, rows, loading] = useQuery(query);
  const [filter, setFilter] = useState("");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => row[0].toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="w-full h-full p-2">
      <Input 
        type="text" 
        placeholder="Filter by country..." 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        className="mb-4"
      />
      <Table>
        <TableCaption>A summary of population and GDP data from 2000 to 2020.</TableCaption>
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