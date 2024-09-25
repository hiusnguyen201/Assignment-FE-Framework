import { Fragment, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Link as MuiLink,
  Typography,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreHoriz as MoreHorizIcon,
  Window as WindowIcon,
  ViewList as ViewListIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";

import { Gender } from "#src/constants";
import fakedata from "./fakedata";

type TRow = {
  id: number;
  name: string;
  status: string;
  email: string;
  phone: string;
  avatar: string;
  gender: string;
};

export default function UsersPage() {
  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      pageSize: 10,
      page: 0,
    });
  const [tableType, setTableType] = useState<"list" | "grid">("list");
  const [autoSize, setAutoSize] = useState<boolean>(false);

  const columns: GridColDef<(typeof rows)[number]>[] = useMemo(() => {
    return [
      {
        field: "name",
        headerName: "Name",
        editable: true,
        flex: 1,
        renderCell: (params) => {
          return (
            <Box className="h-full flex items-center gap-2">
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={params.row.avatar}
              />
              <Typography>{params.row.name}</Typography>
            </Box>
          );
        },
      },
      {
        field: "gender",
        headerName: "Gender",
        editable: true,
        flex: 0.5,
        minWidth: 100,
        renderCell: (params) => {
          return (
            <Box className="h-full flex items-center">
              <Typography>{params.row.gender || "---"}</Typography>
            </Box>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        editable: true,
        flex: 0.5,
        minWidth: 100,
        renderCell: (params) => {
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
        },
      },
      {
        field: "contact",
        headerName: "Contact",
        filterable: false,
        sortable: false,
        flex: 0.5,
        minWidth: 100,
        renderCell: (params) => {
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
        },
      },
      {
        field: "",
        headerName: "",
        filterable: false,
        sortable: false,
        flex: 0.2,
        resizable: false,
        renderCell: (params) => {
          return (
            <Tooltip title="More">
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          );
        },
      },
    ];
  }, [autoSize]);

  const rows: TRow[] = useMemo(() => {
    return fakedata.map((patient) => ({ ...patient }));
  }, [fakedata]);

  return (
    <Box component="main" className="px-6 py-4">
      <Box className="mb-3 flex items-center gap-2">
        <IconButton
          onClick={() => setTableType("list")}
          className={`${tableType === "list" ? "text-blue-500" : ""}`}
        >
          <ViewListIcon />
        </IconButton>
        <IconButton
          onClick={() => setTableType("grid")}
          className={`${tableType === "grid" ? "text-blue-500" : ""}`}
        >
          <WindowIcon />
        </IconButton>
        <Button
          className="normal-case"
          variant="contained"
          onClick={() => setAutoSize(!autoSize)}
        >
          AutoSize Columns
        </Button>
      </Box>

      <Box
        sx={{
          height: 520,
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50, 100]}
          onPaginationModelChange={setPaginationModel}
          initialState={{
            pagination: {
              paginationModel,
            },
          }}
        />
      </Box>
    </Box>
  );
}
