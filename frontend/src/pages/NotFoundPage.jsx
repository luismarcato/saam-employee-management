import { useNavigate } from "react-router";

import { Box, Typography, Button } from "@mui/material";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="primary">
        404
      </Typography>
      <Typography variant="h4" color="white" sx={{ mt: 2 }}>
        Página não encontrada
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => navigate("/")}
      >
        Voltar para o início
      </Button>
    </Box>
  );
}

