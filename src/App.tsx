import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "#src/routers/index";

const theme = createTheme({
  palette: {
    text: {
      primary: "#3c4043",
    },
  },
  typography: {
    h1: {
      color: "#000000de",
    },
    h2: {
      color: "#000000de",
    },
    h3: {
      color: "#000000de",
    },
    h4: {
      color: "#000000de",
    },
    h5: {
      color: "#000000de",
    },
    h6: {
      color: "#5f6368",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "var(--header-border-bottom-width) solid #e0e0e0",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#5f6368",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          flexGrow: 0,
          WebkitFlexGrow: 0,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "inherit",
          fontWeight: "inherit",
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
