import { useState } from "react";
import type { MouseEvent } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

export type UserProps = {
  name: string;
  avatar: string;
  email: string;
};

export type AccountProps = {
  // Add any props you need for the Account component
  user: UserProps;
  onLogout?: () => void;
};

export default function AccountTooltip({ user, onLogout }: AccountProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 30, height: 30 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className="gap-4">
          <ListItemIcon>
            <Avatar src={user.avatar} alt={user.name} />
          </ListItemIcon>

          <Stack>
            <Typography>{user.name}</Typography>
            <Typography fontSize={"small"}>{user.email}</Typography>
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
