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
  SelectChangeEvent,
} from "@mui/material";
import {
  Circle as CircleIcon,
  Save as SaveIcon,
  MoreHoriz as MoreHorizIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

import { AccountStatus, Role } from "#src/constants";
import rows from "./rows";
import MenuPopper, { MenuPopperItem } from "#src/components/MenuPopper";

export { columns };
const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "avatar",
    headerName: "Avatar",
    flex: 0.1,
    filterable: false,
    disableExport: true,
    minWidth: 62,
    renderCell: renderAvatarCell,
  },
  {
    field: "name",
    headerName: "Name",
    editable: true,
    flex: 1,
    minWidth: 100,
    renderCell: renderNameCell,
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
    renderCell: renderStatusCell,
    renderEditCell: (params: GridEditCellProps) =>
      customEditCell(params, "status", AccountStatus),
  },
  {
    field: "",
    headerName: "Actions",
    filterable: false,
    disableExport: true,
    flex: 0.4,
    minWidth: 52,
    renderCell: renderMoreOptionsCell,
  },
];

function renderMoreOptionsCell(): React.JSX.Element {
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

function renderAvatarCell(
  params: GridRenderCellParams
): React.JSX.Element {
  return (
    <Box className="h-full flex items-center gap-2">
      <Avatar sx={{ width: 32, height: 32 }} src={params.row.avatar} />
    </Box>
  );
}
function renderNameCell(params: GridRenderCellParams): React.JSX.Element {
  return (
    <Box className="h-full flex items-center gap-2">
      <Link className="text-blue-500" to={`/users/${params.row.id}`}>
        <Typography>{params.row.name}</Typography>
      </Link>
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

// function renderDetailsCell(
//   params: GridRenderCellParams
// ): React.JSX.Element {
//   const [open, setOpen] = useState(false);
//   const items = [
//     {
//       title: "Details",
//       icon: <VisibilityIcon />,
//     },
//     {
//       title: "Edit",
//       icon: <EditIcon />,
//     },
//     {
//       title: "Delete",
//       icon: <DeleteIcon />,
//     },
//   ];

//   console.log(1);

//   return (
//     <Box className="w-full h-full items-center">
//       <Box className="py-2 flex items-center gap-2">
//         <IconButton onClick={() => setOpen(!open)}>
//           {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//         </IconButton>
//         <Avatar sx={{ width: 32, height: 32 }} src={params.row.avatar} />
//         <Typography>{params.row.name}</Typography>
//       </Box>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0 }}
//             animate={{ height: "auto" }}
//             exit={{ height: 0 }}
//             transition={{ duration: 0.1 }}
//           >
//             <Card className="border-l-4 border-blue-500 mb-3 rounded-sm">
//               <Box className="p-2 inline-flex flex-col items-start gap-3 w-full">
//                 <Box className="flex items-center justify-between w-full">
//                   <Box
//                     className={`inline-flex gap-1 items-center rounded-full px-2 py-1 text-xs ring-1 ring-inset status-badge-${params.row.status.toLowerCase()}`}
//                   >
//                     <CircleIcon sx={{ width: 6, height: 6 }} />
//                     <Typography>{params.row.status}</Typography>
//                   </Box>
//                   <Typography>{params.row.role}</Typography>
//                 </Box>
//                 <Box className="flex items-center gap-2">
//                   <EmailIcon fontSize="small" />
//                   <Typography>{params.row.email}</Typography>
//                 </Box>
//                 <Box className="flex items-center gap-2">
//                   <PhoneAndroidIcon fontSize="small" />
//                   <Typography>{params.row.phone}</Typography>
//                 </Box>
//                 <Divider />
//                 <Box className="flex items-center justify-center gap-5 w-full">
//                   {items.map((item) => (
//                     <Tooltip key={item.title} title={item.title}>
//                       <IconButton className="p-0">{item.icon}</IconButton>
//                     </Tooltip>
//                   ))}
//                 </Box>
//               </Box>
//             </Card>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Box>
//   );
// }
