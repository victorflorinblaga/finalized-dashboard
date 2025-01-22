import React from "react";
import {Progress} from "@/components/ui/progress";
import {Card} from "./ui/card";
import {Skeleton} from "./ui/skeleton";

export default function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center h-full">
    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}
