"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m7t67btz73xbthc28b7/query";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [co2Filter, setCo2Filter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [co2PerCapitaRange, setCo2PerCapitaRange] = useState([0, 100]);

  if (loading) return <LoadingIndicator />;

  const co2PerCapitaValues = rows.map(row => parseFloat(row[4])).filter(v => !isNaN(v));
  const minCo2 = Math.min(...co2PerCapitaValues);
  const maxCo2 = Math.max(...co2PerCapitaValues);
  
  if (co2PerCapitaRange[0] === 0 && co2PerCapitaRange[1] === 100) {
    setCo2PerCapitaRange([minCo2, maxCo2]);
  }

  const filteredRows = rows.filter(row => 
    (row[3].includes(co2Filter) || co2Filter === "") && 
    (row[0].toLowerCase().includes(countryFilter.toLowerCase()) || countryFilter === "") &&
    (parseFloat(row[4]) >= co2PerCapitaRange[0] && parseFloat(row[4]) <= co2PerCapitaRange[1])
  );

  const countryOptions = Array.from(new Set(rows.map(row => row[0]))); 

  return (
    <div className="w-full h-full p-4">
      <Select onValueChange={setCountryFilter}>
        <SelectTrigger className="mb-4 w-full">
          <SelectValue placeholder="Select country..." />
        </SelectTrigger>
        <SelectContent>
          {countryOptions.map((country, index) => (
            <SelectItem key={index} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea 
        placeholder="Filter by CO2 value..." 
        value={co2Filter} 
        onChange={(e) => setCo2Filter(e.target.value)} 
        className="mb-4 w-full"
      />

      <div className="mb-4">
        <span>CO2 per Capita Range: {co2PerCapitaRange[0]} - {co2PerCapitaRange[1]}</span>
        <Slider 
          value={co2PerCapitaRange} 
          onValueChange={setCo2PerCapitaRange} 
          max={maxCo2} 
          min={minCo2} 
          step={1} 
        />
      </div>

      <Table>
        <TableCaption>A list of countries' CO2 emissions data.</TableCaption>
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
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}