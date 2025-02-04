"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m6jwxkwynk6hfetch3b/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  const yearOptions = ["All Years", ...new Set(rows.map(row => row[1]))];

  return (
    <div className="w-full h-full p-2 overflow-x-auto">
      <Table>
        <TableCaption>A list of countries and their CO2 emissions and GDP for the year {selectedYear}.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="w-auto">
                {header === "year" ? (
                  <div className="flex items-center">
                    <span className="mr-2">{header}</span>
                    <Select onValueChange={setSelectedYear} className="w-[120px]">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((year, index) => (
                          <SelectItem key={index} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows
            .filter(row => selectedYear === "All Years" || row[1] === selectedYear)
            .map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="text-sm">{cell}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}