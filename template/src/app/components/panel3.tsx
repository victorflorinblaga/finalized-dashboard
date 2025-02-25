"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { query } from "@/queries/generated/othertest@gmail.com/m7ki1s8nwaeaytuwisf/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  return (
    <div className="w-full h-full p-2">
      <Table>
        <TableCaption>A list of contracts 📄</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="text-left">{header} 🏷️</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="text-left">{cell} ✅</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}