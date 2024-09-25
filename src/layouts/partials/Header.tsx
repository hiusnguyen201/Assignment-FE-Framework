import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { memo } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

import AccountTooltip from "./AccountTooltip";
import { fakeUser } from "#src/fakeUser";
import useScreen from "#src/hooks/useScreen";

type HeaderProps = {
  className?: string;
  onOpenNav: () => void;
};

export default memo(function Header({
  className,
  onOpenNav,
}: HeaderProps) {
  const { setUserOpenNav, getUserOpenNav, isMobile } = useScreen();

  return (
    <AppBar className={className + " bg-white"} position="fixed">
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
        <Box>{!isMobile && <AccountTooltip user={fakeUser} />}</Box>
      </Toolbar>
    </AppBar>
  );
});
