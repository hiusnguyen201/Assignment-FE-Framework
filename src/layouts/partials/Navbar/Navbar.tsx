import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Theme,
  SxProps,
  Drawer as MuiDrawer,
  Tooltip,
  useTheme as useThemeMui,
  Box,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { memo, useMemo } from "react";

import { Drawer } from "./style";
import {
  NavigationItems,
  NavigationDivider,
  NavigationTitle,
  NavigationLink,
  NavigationBrand,
} from "./types";
import useScreen from "#src/hooks/useScreen";

type NavigationProps = {
  navigation: NavigationItems[];
  sx?: SxProps<Theme>;
  open: boolean;
  onClose: () => void;
};

export default memo(function Navbar({
  sx,
  navigation,
  open,
  onClose,
}: NavigationProps) {
  const { isMobile } = useScreen();
  const navigate = useNavigate();
  const theme = useThemeMui();
  const location = useLocation();
  const Comp = isMobile ? MuiDrawer : Drawer;
  const data = useMemo(() => navigation, [navigation]);

  return (
    <Comp
      sx={sx}
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
    >
      <List className="w-full h-full text-sm font-medium">
        {data.map((navItem, index) => {
          if (isNavigationDivider(navItem)) {
            return (
              <ListItem className="p-0 my-2" key={index}>
                <Divider className="w-full" />
              </ListItem>
            );
          } else if (isNavigationTitle(navItem)) {
            return (
              (open || isMobile) && (
                <ListItem
                  className="px-4 pb-1 pt-2 text-xs font-bold"
                  sx={{
                    marginTop: index === 0 ? 0 : 1.5,
                  }}
                  key={index}
                >
                  <Typography
                    className="leading-5"
                    variant="h6"
                    noWrap
                    component="div"
                  >
                    {navItem.title}
                  </Typography>
                </ListItem>
              )
            );
          } else if (isNavigationLink(navItem)) {
            const isActive = location.pathname === `/${navItem.to}`;
            return (
              <Box key={index} className="w-full px-2">
                <Tooltip
                  disableFocusListener={open}
                  disableTouchListener={open}
                  disableHoverListener={open}
                  disableInteractive={open}
                  placement="right"
                  title={navItem.title}
                >
                  <ListItem
                    onClick={() => {
                      navigate(`/${navItem.to}`);
                    }}
                    sx={{
                      backgroundColor: isActive
                        ? theme.palette.primary.main
                        : "inherit",
                      color: isActive
                        ? theme.palette.primary.contrastText
                        : "inherit",
                      ":hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      },
                    }}
                    className={`max-h-12 my-1 p-3 pr-1 rounded-md transition duration-200 ease-in-out cursor-pointer`}
                  >
                    {navItem.icon && (
                      <ListItemIcon className="min-w-0 flex items-center justify-center">
                        {navItem.icon}
                      </ListItemIcon>
                    )}
                    <Box className="flex items-center w-full">
                      <ListItemText className="ml-5 flex-grow my-0">
                        {navItem.title}
                      </ListItemText>
                      {navItem.action && (
                        <ListItemIcon
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="min-w-0"
                        >
                          {navItem.action}
                        </ListItemIcon>
                      )}
                    </Box>
                  </ListItem>
                </Tooltip>
              </Box>
            );
          } else if (isNavigationBrand(navItem)) {
            return (
              <ListItem key={index}>
                <Link to={`/${navItem.to}`}>{navItem.title}</Link>
              </ListItem>
            );
          }

          return null;
        })}
      </List>
    </Comp>
  );
});

function isNavigationDivider(
  item: NavigationItems
): item is NavigationDivider {
  return item.kind === "divider";
}

function isNavigationTitle(
  item: NavigationItems
): item is NavigationTitle {
  return item.kind === "header";
}

function isNavigationBrand(
  item: NavigationItems
): item is NavigationBrand {
  return item.kind === "brand";
}

function isNavigationLink(item: NavigationItems): item is NavigationLink {
  return item.kind === undefined || item.kind === "link";
}
