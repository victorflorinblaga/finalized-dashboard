"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m6ashii2cvzwr9cuar/query";
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

export default function Page() {
  const [headers, rows, loading] = useQuery(query);
  const [countryFilter, setCountryFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => 
    row[0].toLowerCase().includes(countryFilter.toLowerCase()) &&
    row[1].includes(yearFilter)
  );

  return (
    <div className="w-full h-full p-4 flex flex-col">
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Search countries..."
          value={countryFilter}
          onChange={e => setCountryFilter(e.target.value)}
          className="rounded-md border w-full"
        />
        <Input
          placeholder="Filter by year (2000-2020)..."
          value={yearFilter}
          onChange={e => setYearFilter(e.target.value)}
          className="rounded-md border w-full"
        />
      </div>
      <Table>
        <TableCaption>A list of countries' population and GDP from 2000 to 2020.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="w-auto">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, index) => (
            <TableRow key={index}>
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