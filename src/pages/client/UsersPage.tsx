import { Fragment, useMemo, useState } from "react";
import { Box, IconButton, Button, Link as MuiLink, Typography } from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreHoriz as MoreHorizIcon,
  Window as WindowIcon,
  ViewList as ViewListIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import fakedata from "./fakedata";

type TRow = {
  id: number;
  name: string;
  status: string;
  email: string;
  phone: string;
};

export default function PatientsPage() {
  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      pageSize: 10,
      page: 0,
    });
  const [autoSize, setAutoSize] = useState<boolean>(false);

  const columns: GridColDef<(typeof rows)[number]>[] = useMemo(() => {
    return [
      {
        field: "name",
        headerName: "Name",
        editable: true,
        flex: 1,
      },
      {
        field: "status",
        headerName: "Status",
        editable: true,
        flex: 1,
      },
      {
        field: "contact",
        headerName: "Contact",
        filterable: false,
        sortable: false,
        flex: 0.2,
        renderCell: (params) => {
          return (
            <Box className="h-full flex items-center">
              <IconButton className="h-10">
                <MuiLink href={`mailto:${params.row.email}`}>
                  <EmailIcon />
                </MuiLink>
              </IconButton>
              <IconButton className="h-10">
                <MuiLink href={`tel:${params.row.phone}`}>
                  <PhoneIcon />
                </MuiLink>
              </IconButton>
            </Box>
          );
        },
      },
      {
        field: "",
        headerName: "",
        filterable: false,
        sortable: false,
        flex: 0.1,
        resizable: false,
        renderCell: (params) => {
          return (
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          );
        },
      },
    ];
  }, [autoSize]);

  const rows: TRow[] = useMemo(() => {
    return fakedata.map((patient) => ({ ...patient }));
  }, [fakedata]);

  return (
    <Fragment>
      <Box className="mb-1 flex items-center gap-2">
        <IconButton>
          <ViewListIcon className="text-blue-500" />
        </IconButton>
        <IconButton>
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

      <Box sx={{ height: 520, width: "100%" }}>
        {/* <DataGrid
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
        /> */}
      </Box>
    </Fragment>
  );
}
