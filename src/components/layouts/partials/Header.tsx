import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import AccountTooltip from "./AccountTooltip";

import { fakeUser } from "#src/fakeUser";
import { memo } from "react";

type HeaderProps = {
  className?: string;
  onOpenNav: () => void;
};

export default memo(function Header({
  className,
  onOpenNav,
}: HeaderProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar className={className + " bg-white"} position="fixed">
      <Toolbar className="px-3 flex justify-between">
        <Box className="flex items-center">
          <Tooltip title="Main Menu">
            <IconButton
              onClick={() => onOpenNav()}
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
        <Box>{!isSmallScreen && <AccountTooltip user={fakeUser} />}</Box>
      </Toolbar>
    </AppBar>
  );
});
