import { ReactNode, useState, MouseEvent, Fragment, useMemo } from "react";
import { Box, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

type MenuItemDivider = {
  kind: "divider";
};

type MenuItemRow = {
  to?: string;
  title: string | ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
};

type MenuPopperItem = MenuItemRow | MenuItemDivider;

type MenuPopperProps = {
  items: MenuPopperItem[];
  children: React.JSX.Element;
};

export type { MenuPopperItem };

export default function MenuPopper({ items, children }: MenuPopperProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const data = useMemo(() => items, [items]);

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Box onClick={handleOpen}>{children}</Box>
      <Menu
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
        {data.map((item, index) => {
          if ("kind" in item && item.kind === "divider") {
            return <Divider key={index} />;
          }

          const data = item as MenuItemRow;
          return (
            <MenuItem
              className="py-2"
              key={index}
              onClick={(e) => {
                if (data.onClick) {
                  e.preventDefault();
                  data.onClick();
                }
              }}
            >
              <Link
                className="w-full flex items-center"
                to={data.to ?? ""}
              >
                {data.icon && (
                  <ListItemIcon className="min-w-0 mr-2">
                    {data.icon}
                  </ListItemIcon>
                )}
                {data.title}
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
}
