import { useEffect, useState } from "react";
import { sidebarRoutes } from "@/lib/navigation";
import { useLocation } from "react-router-dom";

export default function useSubRoutes() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1].replace("/", "");
  const [subRoutes, setSubRoutes] = useState([]);

  useEffect(() => {
    const hasChild = sidebarRoutes.filter(
      (item) =>
        item.name == currentPath &&
        item.children &&
        Array.isArray(item.children) &&
        item.children.length > 0
    )[0];
    setSubRoutes(typeof hasChild !== "undefined" ? hasChild?.children : []);
  }, [currentPath]);

  return [subRoutes, setSubRoutes];
}
