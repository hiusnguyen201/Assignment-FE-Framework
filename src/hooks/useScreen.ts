import { useMediaQuery, useTheme as useThemeMui } from "@mui/material";

export default function useScreen() {
  const theme = useThemeMui();

  const screenStatus = {
    isMobile: useMediaQuery(theme.breakpoints.down("sm")),
    isTablet: useMediaQuery(theme.breakpoints.between("sm", "md")),
    isDesktop: useMediaQuery(theme.breakpoints.up("md")),
  };

  return {
    ...screenStatus,
  };
}
