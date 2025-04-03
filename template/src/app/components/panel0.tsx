"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/selam.geg@yahoo.com/m90xsaaractw7a44etd/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  
  const [headers, rows, loading] = useQuery(url, query);
  const [filter, setFilter] = useState("");
  const [showTopParent, setShowTopParent] = useState(false);

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => 
    row[1].toLowerCase().includes(filter.toLowerCase())
  );

  const finalRows = showTopParent ? filteredRows.filter(row => row[3] === "true") : filteredRows;

  return (
    <div className="w-full h-full p-4">
      <div className="flex items-center mb-4">
        <Textarea
          placeholder="Filter by supplier name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mr-2 w-1/3"  // Adjusted to make it smaller
        />
        <label className="mr-2">Show only top parent suppliers:</label>
        <Switch 
          checked={showTopParent} 
          onCheckedChange={(checked) => setShowTopParent(checked)} 
        />
      </div>
      <Table>
        <TableCaption>A list of suppliers.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {finalRows.map((row, rowIndex) => (
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