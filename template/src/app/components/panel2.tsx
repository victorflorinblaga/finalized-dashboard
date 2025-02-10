"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m6z4vcsek884240tyh/query";
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
import { Input } from "@/components/ui/input";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [showTopParents, setShowTopParents] = useState(false);
  const [companyNameFilter, setCompanyNameFilter] = useState("");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => {
    const isTopParent = showTopParents ? row[1] === "true" : true;
    const matchesCompanyName = row[3].toLowerCase().includes(companyNameFilter.toLowerCase());
    return isTopParent && matchesCompanyName;
  });

  return (
    <div className="w-full h-full p-2">
      <Toggle 
        pressed={showTopParents} 
        onClick={() => setShowTopParents(prev => !prev)}
      >
        {showTopParents ? "Show All Suppliers" : "Show Only Top Parent Suppliers"}
      </Toggle>
      <Input
        placeholder="Filter by Company Name"
        value={companyNameFilter}
        onChange={(e) => setCompanyNameFilter(e.target.value)}
        className="mt-2 mb-4"
      />
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