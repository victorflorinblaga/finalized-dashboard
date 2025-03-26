"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { query } from "@/queries/generated/selam.sandy@yahoo.com/m8q1s4xnbontfrurhvh/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTopParents, setShowTopParents] = useState(false);
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => 
    row[1].toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!showTopParents || row[3] === "true")
  );

  const humanReadableHeaders = headers.map(header => 
    header.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
  );

  return (
    <div className="w-full h-full p-2 overflow-x-auto">
      <div className="flex items-center mb-4">
        <Input 
          type="text" 
          placeholder="Search by supplier name..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="mr-4 w-full md:w-1/3" 
        />
        <label className="flex items-center">
          <Switch 
            checked={showTopParents} 
            onCheckedChange={setShowTopParents}
          />
          <Label className="ml-2 font-medium">Show Parents</Label>
        </label>
      </div>
      <Table>
        <TableCaption>A list of suppliers and their details.</TableCaption>
        <TableHeader>
          <TableRow>
            {humanReadableHeaders.map((header, index) => (
              <TableHead key={index} className="whitespace-nowrap">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="whitespace-nowrap">{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}