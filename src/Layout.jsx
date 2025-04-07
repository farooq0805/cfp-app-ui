import React from "react";
import { Box, CssBaseline } from "@mui/material";

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Full-width content area */}
      <Box sx={{ flex: 1, p: 2 }}>{children}</Box>

      {/* Optional Footer */}
      {/* 
      <Box component="footer" sx={{ py: 2, textAlign: "center", bgcolor: "grey.100" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Your Company
        </Typography>
      </Box>
      */}
    </Box>
  );
};

export default AppLayout;
