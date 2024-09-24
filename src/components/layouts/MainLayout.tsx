import { Outlet } from "react-router-dom";
import {  useEffect, useState } from "react";
import { Avatar, Box, useMediaQuery, useTheme, } from "@mui/material";
import {
  Group as GroupIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

import Header from "./partials/Header";
import Navigation from "./partials/Navigation";
import type { NavigationItems } from "./partials/Navigation";

const USER = {
  name: "Remy Sharp",
  email: "remy.sharp@gmail.com",
  avatar: "/static/images/avatar/1.jpg",
};

const NAVIGATION: NavigationItems[] = [
  {
    to: "profile",
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
    to: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    to: "users",
    title: "Users",
    icon: <GroupIcon />,
  },
];

export default function MainLayout() {
  const [navOpen, setNavOpen] = useState<boolean>(true);
  const theme = useTheme();
  const isDownSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if(isDownSmScreen) {
      setNavOpen(false);
    } 
  }, [isDownSmScreen]);

  return (
    <Box className="flex">
      <Header onOpenNav={() => setNavOpen(!navOpen)}/>
      <Navigation 
        onCloseNav={() => setNavOpen(!navOpen)} 
        sx={{"& .MuiPaper-root": {
          marginTop: isDownSmScreen ?  0 : `var(--main-content-margin-top)`,
          [isDownSmScreen ? "width" : ""]: isDownSmScreen ? "var(--nav-width-mobile)" : ""
        }}} 
        open={navOpen} 
        navigation={isDownSmScreen ? NAVIGATION : NAVIGATION.slice(2) }
      />
      <Box sx={{marginTop: isDownSmScreen ?0 :`var(--main-content-margin-top)`}} className="flex-grow">
        <Outlet />
      </Box>
    </Box>
  );
}

