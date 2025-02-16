import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import QueryProvider from "./providers/QueryProvider";
import { AppContextProvider } from "./providers/AppContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <React.StrictMode> */}
    <QueryProvider>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </QueryProvider>
    {/* </React.StrictMode> */}
  </>
);
