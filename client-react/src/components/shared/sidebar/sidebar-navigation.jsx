import React from "react";
import SideBarItem from "./sidebar-item";
import { sidebarRoutes } from "@/lib/navigation";
import { Headset } from "lucide-react";
import { Link } from "react-router-dom";

export default function SidebarNavigation() {
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r bg-white">
      <div className="p-5 pt-4 border-b bg-teal-default text-white">
        <Link to="/">
          <Headset size={20} />
        </Link>
      </div>
      <nav className="grid gap-y-3 pt-3 justify-center w-14">
        {sidebarRoutes.map((item, idx) => (
          <SideBarItem route={item} key={idx} />
        ))}
      </nav>
    </aside>
  );
}
