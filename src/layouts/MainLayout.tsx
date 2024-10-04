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
import Navbar, { NavigationItems } from "./partials/Navbar";
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

type InitNavbar = {
  currStatus: boolean;
  clicked: boolean;
};

export default function MainLayout() {
  const { isMobile, isTablet, isDesktop } = useScreen();

  const [navbar, setNavBar] = useState<InitNavbar>(() => {
    const storedNavbar = localStorage.getItem("navbar");
    return storedNavbar
      ? JSON.parse(storedNavbar)
      : {
          currStatus: true,
          clicked: false,
        };
  });

  useEffect(() => {
    localStorage.setItem("navbar", JSON.stringify(navbar));
  }, [navbar]);

  useEffect(() => {
    if (navbar.clicked && !navbar.currStatus) return;

    if (isTablet) {
      setNavBar({
        currStatus: false,
        clicked: false,
      });
    } else if (isDesktop) {
      setNavBar({
        currStatus: true,
        clicked: false,
      });
    }
  }, [isMobile, isTablet]);

  return (
    <Box className="flex">
      <Header
        onToggleNav={() => {
          setNavBar({
            currStatus: !navbar.currStatus,
            clicked: true,
          });
        }}
      />
      <Navbar
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
        navigation={isMobile ? NAVIGATION : NAVIGATION.slice(4)}
        open={navbar.currStatus}
        onClose={() => {
          setNavBar({
            currStatus: false,
            clicked: true,
          });
        }}
      />

      <Box
        component="main"
        sx={{
          marginTop: `var(--main-content-margin-top-${
            isMobile ? "mobile" : "desktop"
          })`,
          width: !isMobile
            ? `calc(100% - var(--nav-width-${
                isTablet || !navbar.currStatus ? "closed" : "desktop"
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
