import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";

import "reset-css";
import "./index.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
