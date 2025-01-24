"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m6aza0e4kc6gbhmgnc/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [headers, rows, loading] = useQuery(query);
  const [countryFilter, setCountryFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => {
    const countryMatch = row[0].toLowerCase().includes(countryFilter.toLowerCase());
    const yearMatch = row[1].includes(yearFilter);
    return countryMatch && yearMatch;
  });

  const clearFilters = () => {
    setCountryFilter("");
    setYearFilter("");
  };

  return (
    <div className="w-full h-full p-4">
      <div className="mb-4 flex flex-wrap gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[180px]">Search Country</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder="Search country..." onValueChange={setCountryFilter} />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(rows.map(row => row[0]))).map(country => (
                    <CommandItem key={country} onSelect={() => setCountryFilter(country)}>
                      {country}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[180px]">Search Year</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder="Search year..." onValueChange={setYearFilter} />
              <CommandList>
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(rows.map(row => row[1]))).map(year => (
                    <CommandItem key={year} onSelect={() => setYearFilter(year)}>
                      {year}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button variant="outline" onClick={clearFilters} className="w-[120px]">Clear Filters</Button>
      </div>

      <Table>
        <TableCaption>Data Overview</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="text-left">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row, rowIndex) => (
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