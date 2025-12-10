import { createTheme } from "@mui/material/styles";

const saamTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00B8E6",
      light: "#33C6EB",
      dark: "#0094B8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#6B46C1",
      light: "#8B66D1",
      dark: "#4F2F91",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#0A0E27",
      paper: "#141B3D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    error: {
      main: "#FF4D4F",
      light: "#FF7875",
      dark: "#D9363E",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFA940",
      light: "#FFC069",
      dark: "#D48806",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#52C41A",
      light: "#73D13D",
      dark: "#389E0D",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#1890FF",
      light: "#40A9FF",
      dark: "#096DD9",
      contrastText: "#FFFFFF",
    },
    inactive: {
      main: "rgba(255, 255, 255, 0.3)",
      contrastText: "#FFFFFF",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "1rem",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 184, 230, 0.3)",
          },
        },
        containedPrimary: {
          background: "#00B8E6",
          "&:hover": {
            background: "#00A0CC",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#141B3D",
          backgroundImage: "none",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 12,
          transition: "all 0.3s ease",
          "&:hover": {
            border: "1px solid rgba(0, 184, 230, 0.3)",
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(0, 184, 230, 0.15)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#00B8E6",
          backgroundImage: "none",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        colorPrimary: {
          backgroundColor: "rgba(0, 184, 230, 0.15)",
          color: "#00B8E6",
          border: "1px solid rgba(0, 184, 230, 0.3)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.23)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.4)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00B8E6",
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            color: "inherit",
          },
        },
      },
    },
  },
});

export default saamTheme;

