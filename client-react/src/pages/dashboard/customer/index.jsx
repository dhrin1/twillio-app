import React from "react";
import { Outlet } from "react-router-dom";

export default function CustomerPage() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
