import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import {
  Group as GroupIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import Header from "./partials/Header";
import Navbar from "./partials/Navbar";
import type { NavigationItems } from "./partials/Navbar";
import { CreateUserFormModal } from "#src/components/forms/admin";
import useScreen from "#src/hooks/useScreen";

const USER = {
  name: "Remy Sharp",
  email: "remy.sharp@gmail.com",
  avatar: "/static/images/avatar/1.jpg",
};

const NAVIGATION: NavigationItems[] = [
  {
    to: "",
    title: "BRANDING",
    kind: "brand",
  },
  {
    kind: "divider",
  },
  {
    to: "profile",
    title: (
      <Box>
        <Typography>{USER.name}</Typography>
        <Typography className="text-xs text-gray-500">
          {USER.email}
        </Typography>
      </Box>
    ),
    icon: (
      <Avatar
        alt={USER.name}
        src={USER.avatar}
        sx={{ width: 32, height: 32 }}
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
    to: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    to: "users",
    title: "Users",
    icon: <GroupIcon />,
    action: (
      <CreateUserFormModal>
        <IconButton>
          <AddIcon />
        </IconButton>
      </CreateUserFormModal>
    ),
  },
  {
    kind: "divider",
  },
  {
    to: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
];

export default function MainLayout() {
  const { isMobile, isDesktop, isTablet, getUserOpenNav, setUserOpenNav } =
    useScreen();
  const [openNav, setOpenNav] = useState<boolean>(() => {
    if (isMobile || isTablet) {
      return false;
    }

    setUserOpenNav(true);
    return getUserOpenNav();
  });

  useEffect(() => {
    if (isTablet || (isMobile && openNav === true)) {
      setOpenNav(false);
    } else if (
      isDesktop &&
      openNav === false &&
      getUserOpenNav() === true
    ) {
      setOpenNav(true);
    }
  }, [isTablet, isMobile, isDesktop]);

  return (
    <Box className="flex">
      <Header onOpenNav={() => setOpenNav(!openNav)} />
      <Navbar
        onCloseNav={() => setOpenNav(!openNav)}
        sx={{
          "& .MuiPaper-root": {
            marginTop: isMobile
              ? 0
              : `var(--main-content-margin-top-desktop)`,
            [isMobile ? "width" : ""]: isMobile
              ? "var(--nav-width-mobile)"
              : "",
          },
        }}
        open={openNav}
        navigation={isMobile ? NAVIGATION : NAVIGATION.slice(4)}
      />

      <Box
        component="main"
        sx={{
          marginTop: `var(--main-content-margin-top-${
            isMobile ? "mobile" : "desktop"
          })`,
          width: !isMobile
            ? `calc(100% - var(--nav-width-${
                isTablet || !openNav ? "closed" : "desktop"
              }))`
            : "100%",
        }}
        className={`flex-grow ${
          isMobile ? "py-3 px-4" : "px-6 py-4"
        } mb-3`}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
