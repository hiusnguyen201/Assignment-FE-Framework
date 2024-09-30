import { useMemo, ReactNode } from "react";
import {
  createTheme,
  StyledEngineProvider,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import useTheme from "#src/hooks/useTheme";
import GlobalStyles from "./GlobalStyles";
import { ThemeMode } from "#src/constants";

const styledTheme = {
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
          backgroundColor: "#ffffff",
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
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#E0E0E0",
          width: "100%",
        },
      },
    },
  },
};

export default function ThemeConfig({ children }: { children: ReactNode }) {
  const { themeMode } = useTheme();

  const themeOptions = useMemo(
    () => ({
      ...styledTheme,
      palette: {
        mode: themeMode as ThemeMode,
        text: {
          primary: "#3c4043",
        },
      },
    }),
    [themeMode]
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <GlobalStyles>{children}</GlobalStyles>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}
