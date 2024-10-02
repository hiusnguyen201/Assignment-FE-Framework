import { Components } from "@mui/material";

const components: Components = {
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
        color: "inherit",
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
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: "inherit",
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontSize: "inherit",
        fontWeight: "inherit",
        color: "inherit",
      },
    },
  },
};

export default components;
