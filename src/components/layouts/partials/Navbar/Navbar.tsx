import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  Theme,
  SxProps,
  Drawer as MuiDrawer,
} from "@mui/material";
import { motion } from "framer-motion";

import { Drawer } from "./style";
import {
  NavigationItems,
  NavigationDivider,
  NavigationTitle,
  NavigationLink,
} from "./types";
import { NavLink } from "react-router-dom";
import { memo } from "react";

type NavigationProps = {
  navigation: NavigationItems[];
  sx?: SxProps<Theme>;
  open: boolean;
  onCloseNav: () => void;
};

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

function isNavigationLink(item: NavigationItems): item is NavigationLink {
  return item.kind === undefined || item.kind === "link";
}

export default memo(function Navbar({
  sx,
  navigation,
  open,
  onCloseNav,
}: NavigationProps) {
  const theme = useTheme();
  const isDownSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const Comp = isDownSmScreen ? MuiDrawer : Drawer;

  return (
    <Comp
      sx={sx}
      variant={isDownSmScreen ? "temporary" : "permanent"}
      open={open}
      onClose={() => onCloseNav()}
    >
      <List className="w-full h-full text-sm font-medium">
        {navigation.map((navItem, index) => {
          if (isNavigationDivider(navItem)) {
            return (
              <ListItem className="p-0 my-2" key={index}>
                <Divider className="h-[1px] w-full" />
              </ListItem>
            );
          } else if (isNavigationTitle(navItem)) {
            return (
              (open || isDownSmScreen) && (
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
            return (
              <NavLink
                key={index}
                to={`/${navItem.to}`}
                className={({ isActive }) => {
                  let classes: string = "flex items-center";
                  classes += isActive ? " bg-[#e8f0fe]" : "";
                  return classes;
                }}
              >
                <ListItem className="max-h-12 px-4 py-3 hover:bg-[#2021240a] transition duration-200 ease-in-out cursor-pointer">
                  {navItem.icon && (
                    <ListItemIcon className="min-w-10 flex items-center justify-center">
                      {navItem.icon}
                    </ListItemIcon>
                  )}
                  <ListItemText className="ml-5 my-0">
                    {navItem.title}
                  </ListItemText>
                  {navItem.action && (
                    <ListItemIcon className="min-w-10 flex items-center justify-center">
                      {navItem.action}
                    </ListItemIcon>
                  )}
                </ListItem>
              </NavLink>
            );
          }
          return null;
        })}
      </List>
    </Comp>
  );
});
