import { useState, Fragment } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Avatar,
  Typography,
  Link as MuiLink,
  Tooltip,
} from "@mui/material";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";

type UserRowProps = {
  user: {
    name: string;
    email: string;
    gender: string;
    phone: string;
    status: string;
    avatar: string;
  };
};

export default function UserRow({ user }: UserRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell className="p-0 pl-1" width={1}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          className="p-2 flex items-center gap-2"
          component="th"
          scope="row"
        >
          <Avatar src={user.avatar} />
          <Box>
            <Typography>{user.name}</Typography>
            <Typography className="text-xs">{user.email}</Typography>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="p-0" colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="py-3 px-2">
              <Box className="flex items-center gap-2">
                <Box
                  className={`inline-flex gap-2 items-center rounded-full px-3 py-1.5 text-xs ring-1 ring-inset status-badge-${user.status.toLowerCase()}`}
                >
                  <Typography>{user.status}</Typography>
                </Box>

                <Typography>{user.gender}</Typography>

                <Box className="flex gap-1 items-center">
                  <Tooltip title={user.email}>
                    <IconButton className="h-10">
                      <MuiLink href={`mailto:${user.email}`}>
                        <EmailIcon />
                      </MuiLink>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={user.phone}>
                    <IconButton className="h-10">
                      <MuiLink href={`tel:${user.phone}`}>
                        <PhoneIcon />
                      </MuiLink>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
