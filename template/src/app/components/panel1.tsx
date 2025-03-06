"use client";

import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m7xbqxdiodphqmldx1b/query";
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

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

const formatNumber = (num) => {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";
};

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  if (loading) return <LoadingIndicator />;

  const filteredRows = rows.filter(row => 
    (selectedCountries.length === 0 || selectedCountries.includes(row[0])) &&
    (selectedYears.length === 0 || selectedYears.includes(row[1]))
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const modifier = sortConfig.direction === 'asc' ? 1 : -1;
    return (parseFloat(a[sortConfig.key]) - parseFloat(b[sortConfig.key])) * modifier;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full h-full p-4">
      <div className="mb-4 flex space-x-2">
        <Select onValueChange={setSelectedCountries} multiple>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {[...new Set(rows.map(row => row[0]))].map(country => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedYears} multiple>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {[...new Set(rows.map(row => row[1]))].map(year => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>A list of sustainability data (1990-2010).</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Year</TableHead>
            <TableHead>Country</TableHead>
            <TableHead onClick={() => handleSort(2)} className="cursor-pointer">Population</TableHead>
            <TableHead onClick={() => handleSort(3)} className="cursor-pointer">GDP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.map((row, index) => (
            <TableRow key={index} className={row[1] === "2008" ? "bg-yellow-300" : ""}>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{formatNumber(Number(row[2]))}</TableCell>
              <TableCell>{formatNumber(Number(row[3]))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}