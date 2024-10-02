import { useMemo, ReactNode } from "react";
import {
  createTheme,
  StyledEngineProvider,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";

import { useSettings } from "#src/hooks";
import GlobalStyles from "./GlobalStyles";
import { ThemeMode } from "#src/constants";
import palette from "./palatte";
import typography from "./typography";
import components from "./components";

export default function ThemeConfig({
  children,
}: {
  children: ReactNode;
}) {
  const { isDark } = useSettings();

  const themeOptions = useMemo(
    () => ({
      palette: isDark
        ? { ...palette.dark, mode: ThemeMode.DARK }
        : { ...palette.light, mode: ThemeMode.LIGHT },
      typography,
      components,
    }),
    [isDark]
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
