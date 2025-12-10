import { Outlet } from "react-router";

import { Box } from "@mui/material";

import TopNavbar from "./TopNavbar.jsx";

export default function Layout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopNavbar />

      <Box
        component="main"
        sx={{
          flex: 1,
          bgcolor: "background.default",
          py: 6,
          px: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

