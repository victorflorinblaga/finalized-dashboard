"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { query } from "@/queries/generated/selam.geg@yahoo.com/m7suf0wqpwlmmbkbidd/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [filter, setFilter] = useState("");
  const [showTopParentOnly, setShowTopParentOnly] = useState(false);
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => 
    row[1].toLowerCase().includes(filter.toLowerCase()) &&
    (!showTopParentOnly || row[3] === "true")
  );

  return (
    <div className="w-full h-full p-4 md:p-6">
      <Input
        type="text"
        placeholder="Filter by supplier name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      />
      <div className="flex items-center mb-4">
        <Switch
          checked={showTopParentOnly}
          onCheckedChange={setShowTopParentOnly}
          className="mr-2"
        />
        <span>Show Only Top Parent Suppliers</span>
      </div>
      <Table>
        <TableCaption>A list of suppliers and their details.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="w-auto">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="text-left">{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}