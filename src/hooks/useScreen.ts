import { useMediaQuery, useTheme } from "@mui/material";

export default function useScreen() {
  const theme = useTheme();

  return {
    isMobile: useMediaQuery(theme.breakpoints.down("sm")),
    isTablet: useMediaQuery(theme.breakpoints.between("sm", "md")),
    isDesktop: useMediaQuery(theme.breakpoints.up("md")),
    getUserOpenNav: (): boolean => {
      return localStorage.getItem("userOpenNav") === "true";
    },
    setUserOpenNav: (openNav: boolean): void => {
      localStorage.setItem("userOpenNav", openNav.toString());
    },
  };
}
