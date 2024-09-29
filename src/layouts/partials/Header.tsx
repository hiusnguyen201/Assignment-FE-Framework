import { memo } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Avatar,
  Stack,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { fakeUser } from "#src/fakeUser";
import useScreen from "#src/hooks/useScreen";
import MenuPopper, { MenuPopperItem } from "#src/components/MenuPopper";

type HeaderProps = {
  className?: string;
  onOpenNav: () => void;
};

export default memo(function Header({ onOpenNav }: HeaderProps) {
  const { setUserOpenNav, getUserOpenNav } = useScreen();
  const accountMenuItems: MenuPopperItem[] = [
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
  ];

  return (
    <AppBar position="fixed">
      <Toolbar className="px-3 flex justify-between">
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

          <Typography className="px-3" variant="h6" noWrap component="div">
            Branding
          </Typography>
        </Box>
        <Box>
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
