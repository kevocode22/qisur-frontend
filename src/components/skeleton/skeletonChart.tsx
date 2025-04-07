import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonChart() {
  return (
    <div className="dark:bg-gray-800 text-black py-4 ">
      <div className="flex justify-center items-center">
        <Skeleton className="h-6 w-1/2 " />
      </div>
      <div className="py-4 border-0">
        <Skeleton className="h-72 w-full" />
      </div>
      <div>
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
}
