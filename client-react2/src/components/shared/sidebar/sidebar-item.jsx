import React from "react";
import { NavLink } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SideBarItem(props) {
  const route = props.route;
  return (
    <NavLink
      to={route.path}
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
          ? "inline-flex gap-x-2 w-full items-center bg-teal-default p-2 text-gray-secondary rounded-sm"
          : "inline-flex gap-x-2 w-full p-2 items-center hover:text-teal-default "
      }
    >
      <Tooltip>
        <TooltipTrigger asChild>{<route.icon size={20} />}</TooltipTrigger>
        <TooltipContent side="right" className="capitalize" sideOffset={5}>
          {route.name}
        </TooltipContent>
      </Tooltip>
    </NavLink>
  );
}
