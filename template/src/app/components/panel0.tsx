"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m5zc1xod0e5z5836hm9/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  return (
    <div className="w-full h-full p-2">
      <Table>
        <TableCaption>🌍 A list of countries and their populations. 🌍</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header} 📊</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell} 🌟</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}