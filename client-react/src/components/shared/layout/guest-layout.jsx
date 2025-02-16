import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../header/navbar-header";
import { useStateContext } from "@/providers/AppContextProvider";

export default function GuestLayout() {
  const { user, token } = useStateContext();
  if (token && user?.isAuthenticated) return <Navigate to="/" />;

  return (
    <main className="bg-[#EDEFFA] h-screen">
      <Navbar />
      <section className="container size-full  flex justify-center  items-center   h-[80vh]">
        <Outlet />
      </section>
    </main>
  );
}
