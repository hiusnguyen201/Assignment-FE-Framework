import { Outlet } from "react-router-dom";
import {  useEffect, useMemo, useState } from "react";
import { Avatar, Box, IconButton, Typography, useMediaQuery, useTheme, } from "@mui/material";
import {
  Group as GroupIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import Header from "./partials/Header";
import Navbar from "./partials/Navbar";
import type { NavigationItems } from "./partials/Navbar";
import {CreateUserFormModal} from "#src/components/forms/admin";

const USER = {
  name: "Remy Sharp",
  email: "remy.sharp@gmail.com",
  avatar: "/static/images/avatar/1.jpg",
};

export default function MainLayout() {
  const [openNav, setOpenNav] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const theme = useTheme();
  const isDownSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const NAVIGATION: NavigationItems[] = useMemo(() =>  [
    {
      to: "profile",
      title: (
        <Box>
          <Typography>{USER.name}</Typography>
          <Typography className="text-xs text-gray-500">{USER.email}</Typography>
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
      <IconButton onClick={() => setOpenModal(true)}>
        <AddIcon />
      </IconButton>
      )
    },
    {
      kind: "divider",
    },
    {
      to: "settings",
      title: "Settings",
      icon: <SettingsIcon />,
    }
  ], []);
 

  useEffect(() => {
    if(isDownSmScreen) {
      setOpenNav(false);
    } 
  }, [isDownSmScreen]);

  return (
    <Box className="flex">
      <CreateUserFormModal open={openModal} onClose={() => setOpenModal(false)} />
      <Header onOpenNav={() => setOpenNav(!openNav)}/>
      <Navbar 
        onCloseNav={() => setOpenNav(!openNav)} 
        sx={{"& .MuiPaper-root": {
          marginTop: isDownSmScreen ?  0 : `var(--main-content-margin-top)`,
          [isDownSmScreen ? "width" : ""]: isDownSmScreen ? "var(--nav-width-mobile)" : ""
        }}} 
        open={openNav} 
        navigation={isDownSmScreen ? NAVIGATION : NAVIGATION.slice(2) }
      />
      <Box sx={{marginTop: isDownSmScreen ?0 :`var(--main-content-margin-top)`}} className="flex-grow">
        <Outlet />
      </Box>
    </Box>
  );
}

