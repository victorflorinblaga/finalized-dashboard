"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { query } from "@/queries/generated/othertest@gmail.com/m7dfvxtevgg41gcqiap/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [filter, setFilter] = useState("");
  const [showTopParent, setShowTopParent] = useState(false);
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => 
    row[1].toLowerCase().includes(filter.toLowerCase()) && 
    (!showTopParent || row[4] === "true")
  );

  return (
    <div className="w-full h-full p-2">
      <Input 
        type="text" 
        placeholder="Filter by supplier name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)} 
        className="mb-4"
      />
      <Toggle 
        checked={showTopParent} 
        onChange={() => setShowTopParent(!showTopParent)}
        className="mb-4"
      >
        Show only top parent suppliers
      </Toggle>
      <Table>
        <TableCaption>A list of suppliers.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="w-[150px]">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="text-center">{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}