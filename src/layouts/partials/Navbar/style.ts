import { Drawer as MuiDrawer } from "@mui/material";
import { Theme, styled, CSSObject } from "@mui/material/styles";

const openedMixin = (theme: Theme, open: boolean): CSSObject => ({
  width: open ? "var(--nav-width-desktop)" : "var(--nav-width-closed)",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `var(--nav-width-closed)`,
  [theme.breakpoints.up("sm")]: {
    width: `var(--nav-width-closed)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open = true }) => ({
  width: `var(--nav-width-${open ? "desktop" : "mobile"})`,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme, open),
        "& .MuiDrawer-paper": openedMixin(theme, open),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export { Drawer };
