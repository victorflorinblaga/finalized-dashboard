"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { query } from "@/queries/generated/othertest@gmail.com/m7xdni5a1fqt4llqbmp/query";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  const [allCountriesLowestGdp, setAllCountriesLowestGdp] = useState([]);
  const [headers, rows, loading] = useQuery(url, query);

  useEffect(() => {
    if (rows.length) {
      const gdpData = rows.map(row => ({
        country: row[0],
        year: row[1],
        gdp: parseFloat(row[3]) // Assuming GDP is in the fourth column and is numeric
      }));

      const lowestGdpByCountry = {};
      
      gdpData.forEach(data => {
        const { country, year, gdp } = data;
        if (!lowestGdpByCountry[country] || gdp < lowestGdpByCountry[country].gdp) {
          lowestGdpByCountry[country] = { year, gdp };
        }
      });

      setAllCountriesLowestGdp(Object.entries(lowestGdpByCountry).map(([country, { year, gdp }]) => ({ country, year, gdp })));
    }
  }, [rows]);

  if (loading) return <LoadingIndicator />;

  return (
    <div className="w-full h-full p-2 overflow-x-auto">
      <Table>
        <TableCaption>Lowest GDP data for all countries.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="max-w-[150px]">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCountriesLowestGdp.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{data.country}</TableCell>
              <TableCell className="font-medium">{data.year}</TableCell>
              <TableCell className="font-medium">{data.gdp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}