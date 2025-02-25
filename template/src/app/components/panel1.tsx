"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m7kijzoqoil90fk6r8/query";
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
  const [filter, setFilter] = useState("");
  const [showTrue, setShowTrue] = useState(false);

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => 
    row[1].toLowerCase().includes(filter.toLowerCase()) && (!showTrue || row[3] === "true")
  );

  return (
    <div className="size-full p-4">
      <input 
        type="text" 
        className="mb-4 p-2 border border-gray-300 rounded" 
        placeholder="Filter by name" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
      />
      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="mr-2" 
            checked={showTrue} 
            onChange={() => setShowTrue(!showTrue)} 
          />
          <span>Show only rows with property "true"</span>
        </label>
      </div>
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
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}