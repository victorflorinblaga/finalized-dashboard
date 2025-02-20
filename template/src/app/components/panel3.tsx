"use client";

import React from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator";
import { query } from "@/queries/generated/othertest@gmail.com/m7dfaitkvtuo0byhtxl/query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/purchasing";

export default function Page() {
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const projectEtaRow = rows.find(row => row[1] === "Project Eta");
  const projectEtaStartDate = projectEtaRow ? projectEtaRow[3] : "Date not found";
  
  const updatedRows = [["", "Project Eta", "", projectEtaStartDate, "", "", "", "", ""]].concat(rows.filter(row => row[1] !== "Project Eta"));

  return (
    <div className="w-full h-full p-4">
      <Table>
        <TableCaption>A table of project details.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="uppercase">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {updatedRows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={row[2] === "In Progress" ? "bg-yellow-100" : ""}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-lg">
        Start Date of "Project Eta": <strong>{projectEtaStartDate}</strong>
      </div>
    </div>
  );
}