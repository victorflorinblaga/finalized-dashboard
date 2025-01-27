"use client";

import React from "react"
import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator"
import { query } from "@/queries/generated/othertest@gmail.com/m6asrza0hjpofm7wme8/query";

export default function Page() {
  
  const [headers, rows, loading] = useQuery(query);

  if (loading) return <LoadingIndicator />;

  return (
    <div className="size-full p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Data Dashboard</h1>
      {/* Additional components can be placed here */}
    </div>
  )
}