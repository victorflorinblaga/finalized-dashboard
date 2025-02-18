"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m7a9w1kbnh59x6148ec/query";
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
import { Switch } from "@/components/ui/switch";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTopParents, setShowTopParents] = useState(false);
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => {
    const matchesSearchTerm = row[1].toLowerCase().includes(searchTerm.toLowerCase());
    const isTopParent = showTopParents ? row[3] === "true" : true;
    return matchesSearchTerm && isTopParent;
  });

  return (
    <div className="w-full h-full p-2 overflow-x-auto">
      <div className="mb-4 flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Filter by supplier name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2"
        />
        <div className="flex items-center">
          <Switch
            checked={showTopParents}
            onCheckedChange={() => setShowTopParents(!showTopParents)}
            className="mr-2"
          />
          <span>Show only top parent suppliers</span>
        </div>
      </div>
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
                <TableCell key={cellIndex} className="whitespace-nowrap">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}