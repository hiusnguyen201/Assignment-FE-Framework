import { Link } from "react-router-dom";
import { ReactNode, useMemo } from "react";
import {
  GridColDef,
  GridEditCellProps,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  Box,
  Avatar,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  SelectChangeEvent,
  Card,
} from "@mui/material";
import {
  Circle as CircleIcon,
  Save as SaveIcon,
  MoreHoriz as MoreHorizIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  PhoneAndroid as PhoneAndroidIcon,
  Badge as BadgeIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

import { AccountStatus, Role } from "#src/constants";
import rows from "./rows";
import MenuPopper, { MenuPopperItem } from "#src/components/MenuPopper";

export { columns, mobileColumns };
const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "avatar",
    headerName: "Avatar",
    flex: 0.1,
    minWidth: 62,
    renderCell: (params) => (
      <Box className="h-full flex items-center gap-2">
        <Avatar sx={{ width: 32, height: 32 }} src={params.row.avatar} />
      </Box>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    editable: true,
    flex: 1,
    minWidth: 100,
    renderCell: (params) => (
      <Box className="h-full flex items-center gap-2">
        <Link className="text-blue-500" to={`/users/${params.row.id}`}>
          <Typography>{params.row.name}</Typography>
        </Link>
      </Box>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    editable: true,
    flex: 1,
    minWidth: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    editable: true,
    flex: 1,
    minWidth: 100,
  },
  {
    field: "role",
    headerName: "Role",
    editable: true,
    flex: 0.5,
    minWidth: 80,
    renderEditCell: (params: GridEditCellProps) =>
      customEditCell(params, "role", Role),
  },
  {
    field: "status",
    headerName: "Status",
    editable: true,
    flex: 0.5,
    minWidth: 100,
    renderCell: (params) => (
      <Box className="h-full flex items-center gap-2">
        <Box
          className={`inline-flex gap-2 items-center rounded-full px-3 py-1.5 text-xs ring-1 ring-inset status-badge-${params.row.status.toLowerCase()}`}
        >
          <CircleIcon sx={{ width: 6, height: 6 }} />
          <Typography>{params.row.status}</Typography>
        </Box>
      </Box>
    ),
    renderEditCell: (params: GridEditCellProps) =>
      customEditCell(params, "status", AccountStatus),
  },
  {
    field: "",
    headerName: "",
    flex: 0.1,
    renderCell: () => {
      const items: MenuPopperItem[] = [
        {
          title: "Save",
          icon: <SaveIcon />,
        },
        {
          title: "Details",
          icon: <VisibilityIcon />,
        },
        {
          title: "Edit",
          icon: <EditIcon />,
        },
        {
          title: "Delete",
          icon: <DeleteIcon />,
        },
      ];

      return (
        <Box className="flex justify-center items-center">
          <MenuPopper itemMinWidth={150} items={items}>
            <Tooltip title="More">
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          </MenuPopper>
        </Box>
      );
    },
  },
];

const mobileColumns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "",
    headerName: "",
    flex: 1,
    renderCell: renderDetailsCell,
  },
];

function customEditCell<T extends { [key: string]: string }>(
  params: GridEditCellProps,
  field: string,
  enumType: T
): ReactNode {
  const value = params.row[field] as T[keyof T];

  const handleChange = (e: SelectChangeEvent) => {
    params.api.setEditCellValue(
      {
        id: params.id,
        field: params.field,
        value: e.target.value as T[keyof T],
      },
      e
    );
  };

  return (
    <FormControl className="w-full">
      <Select
        size="small"
        className="h-full"
        value={value}
        onChange={handleChange}
      >
        {Object.values(enumType).map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function renderDetailsCell(params: GridRenderCellParams): ReactNode {
  const items = [
    {
      title: "Details",
      icon: <VisibilityIcon />,
    },
    {
      title: "Edit",
      icon: <EditIcon />,
    },
    {
      title: "Delete",
      icon: <DeleteIcon />,
    },
  ];

  return (
    <Card className="border border-gray-200 border-l-4 border-l-blue-500 my-2.5 rounded-sm">
      <Box className="px-2 py-3 inline-flex flex-col items-start gap-2 w-full">
        <Box className="flex items-center justify-between w-full">
          <Box className="flex-grow flex items-center gap-2">
            <Avatar sx={{ width: 32, height: 32 }} src={params.row.avatar} />
            <Typography>{params.row.name}</Typography>
          </Box>

          <MenuPopper items={items}>
            <Tooltip title="More">
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          </MenuPopper>
        </Box>

        <Box
          className={`inline-flex gap-2 items-center rounded-full px-2 py-1 text-xs ring-1 ring-inset status-badge-${params.row.status.toLowerCase()}`}
        >
          <CircleIcon sx={{ width: 6, height: 6 }} />
          <Typography>{params.row.status}</Typography>
        </Box>

        <Box className="flex items-center gap-2">
          <EmailIcon fontSize="small" />
          <Typography>{params.row.email}</Typography>
        </Box>

        <Box className="flex items-center gap-2">
          <PhoneAndroidIcon fontSize="small" />
          <Typography>{params.row.phone}</Typography>
        </Box>

        <Box className="flex items-center gap-2">
          <BadgeIcon fontSize="small" />
          <Typography className="mt-0.5">{params.row.role}</Typography>
        </Box>
      </Box>
    </Card>
  );
}
