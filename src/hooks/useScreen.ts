import { useMediaQuery, useTheme as useThemeMui } from "@mui/material";

export default function useScreen() {
  const theme = useThemeMui();

  return {
    isMobile: useMediaQuery(theme.breakpoints.down("sm")),
    isTablet: useMediaQuery(theme.breakpoints.between("sm", "md")),
    isDesktop: useMediaQuery(theme.breakpoints.up("md")),
    isOpenNav: localStorage.getItem("userOpenNav") === "true",
    setUserOpenNav: (openNav: boolean): void => {
      localStorage.setItem("userOpenNav", openNav.toString());
    },
  };
}
