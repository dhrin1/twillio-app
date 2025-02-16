import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "@/providers/AppContextProvider";
import { Label } from "@/components/ui/label";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet, NavLink } from "react-router-dom";

const SidebarNavigation = lazy(() => import("../sidebar/sidebar-navigation"));
const NavbarHeader = lazy(() => import("../header/navbar-header"));

import ModalContainer from "../modal-container";
import ToastContainer from "../toast-container";
import NotificationContainer from "../notification-container";
import useSubRoutes from "@/hooks/useSubRoutes";

export default function DefaultLayout() {
  const { user, token } = useStateContext();
  const [subRoutes] = useSubRoutes();

  if (!token && !user?.isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <TooltipProvider>
        <main className="grid h-screen w-full pl-[60px]">
          <SidebarNavigation />
          <div className="flex flex-col h-full">
            <NavbarHeader />
            <div className="h-full grid flex-1 grid-cols-12 bg-[#EDEFFA]">
              {subRoutes.length > 0 ? (
                <section className="col-span-12 md:col-span-2 border-r">
                  <div className="flex flex-col p-4  self-start sticky top-[5.4vh]">
                    {subRoutes.map((route, idx) =>
                      route.name === "separator" ? (
                        <div
                          key={idx}
                          className={`px-2  mb-1 ${
                            idx === 0 ? "" : "mt-1 pt-2"
                          }`}
                        >
                          <Label className="text-md font-medium text-sm">
                            {route.title}
                          </Label>
                        </div>
                      ) : (
                        <NavLink
                          to={route.path}
                          key={idx}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : isActive
                              ? "inline-flex w-full px-2 text-sm py-2 justify-start items-center bg-teal-default  text-gray-secondary  rounded-sm"
                              : "inline-flex w-full px-2 text-sm py-2 justify-start items-center hover:text-teal-default hover:bg-[#E6E9EE] rounded-sm"
                          }
                        >
                          {<route.icon size={16} className="mr-2" />}
                          {route.title}
                        </NavLink>
                      )
                    )}
                  </div>
                </section>
              ) : null}
              <div
                className={`size-full flex flex-col gap-4 p-2 md:gap-8 md:p-8 ${
                  subRoutes.length === 0
                    ? "col-span-12"
                    : "col-span-12 md:col-span-10"
                } `}
              >
                <Outlet />
              </div>
            </div>
          </div>
        </main>
        <ModalContainer />
        <ToastContainer />
        <NotificationContainer />
      </TooltipProvider>
    </>
  );
}
