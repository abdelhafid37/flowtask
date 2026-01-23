import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function Loader() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
      <Skeleton className="h-48 bg-neutral-200" />
      <Skeleton className="h-48 bg-neutral-200" />
      <Skeleton className="h-48 bg-neutral-200" />
      <Skeleton className="h-48 bg-neutral-200" />
    </div>
  );
}
