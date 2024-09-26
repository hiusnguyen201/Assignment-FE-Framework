import { Link } from "react-router-dom";
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
  Link as MuiLink,
  SelectChangeEvent,
} from "@mui/material";
import {
  Circle as CircleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreHoriz as MoreHorizIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

import { AccountStatus, Gender } from "#src/constants";
import rows from "./rows";
import MenuPopper, { MenuPopperItem } from "#src/components/MenuPopper";

export { columns };
const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
    flex: 1,
    minWidth: 100,
    renderCell: renderNameCell,
  },
  {
    field: "gender",
    headerName: "Gender",
    editable: true,
    flex: 1,
    sortable: false,
    minWidth: 100,
    renderCell: renderGenderCell,
    renderEditCell: (params: GridEditCellProps) =>
      customEditCell(params, "gender", Gender),
  },
  {
    field: "status",
    headerName: "Status",
    editable: true,
    sortable: false,
    flex: 1,
    minWidth: 100,
    renderCell: renderStatusCell,
    renderEditCell: (params: GridEditCellProps) =>
      customEditCell(params, "status", AccountStatus),
  },
  {
    field: "contact",
    headerName: "Contact",
    filterable: false,
    sortable: false,
    flex: 0.1,
    minWidth: 100,
    renderCell: renderContactCell,
  },
  {
    field: "",
    headerName: "",
    filterable: false,
    sortable: false,
    flex: 0.1,
    renderCell: renderMoreOptionsCell,
  },
];

function renderMoreOptionsCell(): React.JSX.Element {
  const items: MenuPopperItem[] = [
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
    <MenuPopper items={items}>
      <Tooltip title="More">
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
    </MenuPopper>
  );
}

function customEditCell<T extends { [key: string]: string }>(
  params: GridEditCellProps,
  field: string,
  enumType: T
): React.JSX.Element {
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

function renderNameCell(params: GridRenderCellParams): React.JSX.Element {
  return (
    <Box className="h-full flex items-center gap-2">
      <Avatar sx={{ width: 32, height: 32 }} src={params.row.avatar} />
      <Link className="text-blue-500" to={`/users/${params.row.id}`}>
        <Typography>{params.row.name}</Typography>
      </Link>
    </Box>
  );
}

function renderGenderCell(
  params: GridRenderCellParams
): React.JSX.Element {
  return (
    <Box className="h-full flex items-center">
      <Typography>{params.row.gender || "---"}</Typography>
    </Box>
  );
}

function renderStatusCell(
  params: GridRenderCellParams
): React.JSX.Element {
  return (
    <Box className="h-full flex items-center">
      <Box
        className={`inline-flex gap-2 items-center rounded-full px-3 py-1.5 text-xs ring-1 ring-inset status-badge-${params.row.status.toLowerCase()}`}
      >
        <CircleIcon sx={{ width: 6, height: 6 }} />
        <Typography>{params.row.status}</Typography>
      </Box>
    </Box>
  );
}

function renderContactCell(
  params: GridRenderCellParams
): React.JSX.Element {
  return (
    <Box className="h-full flex items-center">
      <Tooltip title={params.row.email}>
        <IconButton className="h-10">
          <MuiLink href={`mailto:${params.row.email}`}>
            <EmailIcon />
          </MuiLink>
        </IconButton>
      </Tooltip>
      <Tooltip title={params.row.phone}>
        <IconButton className="h-10">
          <MuiLink href={`tel:${params.row.phone}`}>
            <PhoneIcon />
          </MuiLink>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
