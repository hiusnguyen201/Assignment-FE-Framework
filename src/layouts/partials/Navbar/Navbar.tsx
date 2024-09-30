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
  Box,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
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

function isNavigationBrand(
  item: NavigationItems
): item is NavigationBrand {
  return item.kind === "brand";
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
  const { isMobile } = useScreen();
  const Comp = isMobile ? MuiDrawer : Drawer;
  const data = useMemo(() => navigation, [navigation]);

  return (
    <Comp
      sx={sx}
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={() => onCloseNav()}
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
            return (
              <Box key={index} className="w-full px-2">
                <NavLink
                  to={`/${navItem.to}`}
                  className={({ isActive }) => {
                    let classes: string = "flex items-center rounded-md";
                    classes += isActive ? " bg-[#e8f0fe]" : "";
                    return classes;
                  }}
                >
                  <Tooltip
                    disableFocusListener={open}
                    disableTouchListener={open}
                    disableHoverListener={open}
                    disableInteractive={open}
                    placement="right"
                    title={navItem.title}
                  >
                    <ListItem className="max-h-12 p-3 hover:bg-[#2021240a] rounded-md transition duration-200 ease-in-out cursor-pointer">
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
                            className="min-w-0"
                            onClick={(e) => e.preventDefault()}
                          >
                            {navItem.action}
                          </ListItemIcon>
                        )}
                      </Box>
                    </ListItem>
                  </Tooltip>
                </NavLink>
              </Box>
            );
          } else if (isNavigationBrand(navItem)) {
            return (
              <ListItem>
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
