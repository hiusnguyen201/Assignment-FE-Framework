import { Fragment, useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Link as MuiLink,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreHoriz as MoreHorizIcon,
  Window as WindowIcon,
  ViewList as ViewListIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { formatDate } from "#src/utils/stringUtils";
import fakedata from "./fakedata";

type TRow = {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  phone: string;
  lastMeasurement: string;
  lastVisit: string;
};

export default function PatientsPage() {
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const [autoSize, setAutoSize] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns: GridColDef<(typeof rows)[number]>[] = useMemo(() => {
    return [
      {
        field: "firstName",
        headerName: "First Name",
        editable: true,
        flex: 1,
      },
      {
        field: "lastName",
        headerName: "Last Name",
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
        field: "lastMeasurement",
        headerName: "Last Measurement",
        flex: 2,
        renderCell: (params) => (
          <Typography
            className="h-full flex items-center"
            variant="body2"
            style={{ whiteSpace: "pre-line" }}
          >
            {params.value}
          </Typography>
        ),
      },
      {
        field: "lastVisit",
        headerName: "Last Visit",
        flex: 1,
      },
      {
        field: "contact",
        headerName: "Contact",
        filterable: false,
        sortable: false,
        flex: 1,
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
        flex: 0.5,
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
    return fakedata.map((patient) => {
      const lastMeasurement =
        patient.measurements[patient.measurements.length - 1];
      return {
        ...patient,
        lastMeasurement: lastMeasurement
          ? `${lastMeasurement.systolic}/${lastMeasurement.diastolic} - ${lastMeasurement.heartRate}BPM \n ${formatDate(lastMeasurement.time, "MMM d, yyyy | h:mm a")}`
          : "---",
        lastVisit: formatDate(patient.lastVisit),
      };
    });
  }, [fakedata]);

  return (
    <Fragment>
      <Box className="mb-1 flex items-center gap-2">
        <Button variant="outlined" className="normal-case">
          Patients overview
        </Button>
        <Button variant="contained" className="normal-case">
          Patients list
        </Button>
        <Button variant="outlined" className="normal-case">
          Invitations
        </Button>
      </Box>

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
        {isMobile ? (
          <></>
        ) : (
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
        )}
      </Box>
    </Fragment>
  );
}
