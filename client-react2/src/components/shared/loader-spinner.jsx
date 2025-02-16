import React from "react";
import { cn } from "@/lib/utils";
import { Loader as LoaderIcon } from "lucide-react";

export default function Loader(props) {
  const { isPending, className } = props;
  return (
    isPending && <LoaderIcon className={cn("animate-spin mr-2", className)} />
  );
}
