import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";

import { loginSchema } from "../schemas/loginSchema";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { mutate } = useLogin();
  const { login } = useAuth();
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    mutate(data, {
      onSuccess: ({ accessToken }) => {
        login(accessToken);
        showToast("Login realizado com sucesso!", "success");
        navigate("/dashboard");
      },
      onError: (error) => {
        showToast(error.response?.data?.message ?? "Falha no login", "error");
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg, #0A0E27, #00B8E6)",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 5,
          borderRadius: 3,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Box
            display="inline-flex"
            p={1.5}
            bgcolor="#2a76e8"
            borderRadius={2}
            color="#fff"
            mb={1}
            sx={{ boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.2)" }}
          >
            <BadgeIcon fontSize="large" />
          </Box>

          <Typography variant="h5" fontWeight="bold">
            Sistema Gestão de Funcionários
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Digite suas credenciais para entrar no sistema
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 1 }}>
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="Senha"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 1 }}>
                    <LockIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            ENTRAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

