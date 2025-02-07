"use client";

import React from "react"
import { useQuery } from "@/hooks/useQuery";
import LoadingIndicator from "@/components/LoadingIndicator"
import { query } from "@/queries/generated/othertest@gmail.com/m6uvfyg5tskdrg0g3s/query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const url = "http://genui-kg-a8hedtafhpb0fwak.germanywestcentral-01.azurewebsites.net/repositories/sustainability";

export default function Page() {
  
  const [headers, rows, loading] = useQuery(url, query);

  if (loading) return <LoadingIndicator />;

  const germanyImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png";
  const franceImageUrl = "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg";

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center space-y-4">
      <Card className="w-full md:w-1/2 lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Comparison Germany and France</CardTitle>
          <CardDescription className="text-sm">A detailed analysis of data from Germany and France.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            <Avatar>
              <AvatarImage src={germanyImageUrl} />
              <AvatarFallback>Germany Flag</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src={franceImageUrl} />
              <AvatarFallback>France Flag</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}