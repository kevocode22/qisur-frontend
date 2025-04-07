import React from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonTable() {
  return Array.from({ length: 8 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="w-10 h-10 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[180px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[60px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[40px]" />
      </TableCell>
      <TableCell className="flex gap-2">
        <Skeleton className="h-8 w-16 rounded" />
        <Skeleton className="h-8 w-16 rounded" />
      </TableCell>
    </TableRow>
  ));
}
