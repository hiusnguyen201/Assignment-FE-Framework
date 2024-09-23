import { Outlet, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  Group as GroupIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { DashboardLayout, AppProvider } from "@toolpad/core";
import type { Navigation, Branding, Router } from "@toolpad/core";

import InvitePatient from "#src/components/forms/InvitePatient";
import AccountTooltip, { UserProps } from "./partials/AccountTooltip";

const USER: UserProps = {
  name: "Remy Sharp",
  email: "remy.sharp@gmail.com",
  avatar: "/static/images/avatar/1.jpg",
};

const NAVIGATION: Navigation = [
  {
    segment: "profile",
    title: USER.name,
    icon: (
      <Avatar
        alt={USER.name}
        src={USER.avatar}
        sx={{ width: 30, height: 30 }}
      />
    ),
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "patients",
    title: "Patients",
    icon: <GroupIcon />,
    action: (
      <IconButton
        onClick={(e) => {
          e.preventDefault();
        }}
        className="bg-blue-500 rounded sm:hidden flex"
        size="small"
        children={<AddIcon className="text-white" />}
      />
    ),
  },
];

const BRANDING: Branding = {
  title: "PATIENTS MANAGER",
  logo: <></>,
};

const theme = createTheme({
  components: {
    MuiDrawer: {},
  },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Actions() {
  const [open, setOpen] = useState(false);

  return (
    <Box className="hidden sm:flex">
      <InvitePatient open={open} setOpen={setOpen} />
      <Button
        variant="contained"
        className="normal-case mr-2"
        endIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Invite new patients
      </Button>
      <AccountTooltip user={USER} />
    </Box>
  );
}

export default function MainLayout() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [pathname, setPathname] = useState(window.location.pathname);
  const navigateRouter = useNavigate();

  const router = useMemo<Router>(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path));
        navigateRouter(path);
      },
    }),
    [pathname]
  );

  return (
    <AppProvider
      navigation={!isMobile ? NAVIGATION.slice(2) : NAVIGATION}
      router={router}
      theme={theme}
      branding={BRANDING}
    >
      <DashboardLayout
        slots={{
          toolbarActions: Actions,
        }}
      >
        <Box
          className="p-5"
          sx={{ maxWidth: isMobile ? "unset" : "calc(100vw - 320px)" }}
        >
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
