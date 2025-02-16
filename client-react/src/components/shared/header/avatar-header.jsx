import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AvatarHeader(props) {
  const { user, onLogout } = props;
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        role="button"
        className="h-10 px-2 text-[#F7F8F9] outline-none focus:ring-0  flex space-x-2 items-center rounded-full cursor-pointer"
      >
        <Avatar className="size-7 border">
          <UserCircle size={26} />
        </Avatar>
        <label className="text-sm hidden md:block">{user?.name}</label>
        <span>
          <ChevronDown size="16" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm ">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            navigate(
              `settings/profile/${user?.name.replace(" ", "").toLowerCase()}`
            )
          }
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem type="button" onClick={onLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
