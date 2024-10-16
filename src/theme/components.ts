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
  MuiIconButton: {
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
      },
    },
  },
};

export default components;
