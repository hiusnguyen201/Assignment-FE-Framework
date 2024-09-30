import { Link } from "react-router-dom";
import { memo, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Avatar,
  Stack,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Logout as LogoutIcon,
  Inbox as InboxIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";

import { fakeUser } from "#src/fakeUser";
import { useScreen, useTheme } from "#src/hooks";
import MenuPopper, { MenuPopperItem } from "#src/components/MenuPopper";
import { ThemeMode } from "#src/constants";

type HeaderProps = {
  className?: string;
  onOpenNav: () => void;
};

export default memo(function Header({ onOpenNav }: HeaderProps) {
  const { setUserOpenNav, getUserOpenNav, isMobile } = useScreen();
  const { themeMode, setThemeMode } = useTheme();
  console.log(useTheme());

  const accountMenuItems: MenuPopperItem[] = useMemo(
    () => [
      {
        title: (
          <Box className="flex items-center gap-3">
            <Avatar src={fakeUser.avatar} alt={fakeUser.name} />
            <Stack>
              <Typography>{fakeUser.name}</Typography>
              <Typography fontSize={"small"}>{fakeUser.email}</Typography>
            </Stack>
          </Box>
        ),
      },
      {
        kind: "divider",
      },
      {
        icon:
          themeMode !== ThemeMode.DARK ? (
            <DarkModeIcon />
          ) : (
            <LightModeIcon />
          ),
        title: themeMode !== ThemeMode.DARK ? "Dark Mode" : "Light Mode",
        onClick: () => {
          if (themeMode === ThemeMode.DARK) {
            setThemeMode(ThemeMode.LIGHT);
          } else {
            setThemeMode(ThemeMode.DARK);
          }
        },
      },
      {
        icon: <SettingsIcon />,
        title: "Settings",
      },
      {
        icon: <AddIcon />,
        title: "Add another account",
      },
      {
        kind: "divider",
      },
      {
        icon: <LogoutIcon />,
        title: "Logout",
      },
    ],
    []
  );

  return (
    <AppBar position="fixed">
      <Toolbar className="px-2 flex justify-between">
        <Box className="flex items-center">
          <Tooltip title="Main Menu">
            <IconButton
              onClick={() => {
                onOpenNav();
                setUserOpenNav(!getUserOpenNav());
              }}
              className="p-3"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          {!isMobile && (
            <Link to="/">
              <Typography
                className="px-3"
                variant="h1"
                noWrap
                component="div"
              >
                Branding
              </Typography>
            </Link>
          )}
        </Box>
        <Box className="flex items-center gap-2">
          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={"99+"} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Messages">
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <InboxIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <MenuPopper items={accountMenuItems}>
            <Tooltip title="Account settings">
              <IconButton size="small" color="inherit">
                <Avatar
                  src={fakeUser.avatar}
                  alt={fakeUser.name}
                  sx={{ width: 30, height: 30 }}
                />
              </IconButton>
            </Tooltip>
          </MenuPopper>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
