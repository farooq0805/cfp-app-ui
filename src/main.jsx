import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Box, Container } from "@mui/material";
import AppLayout from "./Layout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppLayout>
      <App />
    </AppLayout>
  </StrictMode>
);
