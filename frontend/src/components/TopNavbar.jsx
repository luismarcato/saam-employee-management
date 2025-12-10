import { NavLink } from "react-router";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";

import { useAuth } from "../context/AuthContext";

export default function TopNavbar() {
  const { logout } = useAuth();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <BadgeIcon fontSize="medium" />
            <Typography variant="h7" fontWeight={"bold"} component="div">
              Gestão de Funcionários
            </Typography>
          </Box>

          <Box>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: "white",
                fontWeight: isActive ? "normal" : "lighter",
                borderBottom: isActive ? "2px solid white" : "none",
                paddingBottom: 4,
              })}
            >
              Dashboard
            </NavLink>
          </Box>

          <Box>
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={() => logout()}
            >
              Sair
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

