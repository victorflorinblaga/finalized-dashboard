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
import { Input } from "@/components/ui/input";
import { query } from "@/queries/generated/othertest@gmail.com/m7xc5lv50vxywffv7i3d/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  if (loading) return <LoadingIndicator />;

  const filteredRows = filter
    ? rows.filter(row => row[3].toString() === filter)
    : rows;

  const handleSort = (index) => {
    const newOrder = sortColumn === index && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(index);
    setSortOrder(newOrder);
    
    filteredRows.sort((a, b) => {
      const aValue = parseFloat(a[index]);
      const bValue = parseFloat(b[index]);

      return newOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  };

  return (
    <div className="w-full h-full p-4 overflow-x-auto">
      <Input
        placeholder="Filter by CO2..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableCaption>A list of sustainability data</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="w-auto cursor-pointer" onClick={() => handleSort(index)}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="font-medium">{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}