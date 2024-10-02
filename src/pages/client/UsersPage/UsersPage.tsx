import { Fragment, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  useTheme as useThemeMui,
} from "@mui/material";
import {
  ViewList as ViewListIcon,
  Window as WindowIcon,
} from "@mui/icons-material";

import { columns, mobileColumns } from "./columns";
import { rows } from "./rows";
import DataListTable from "#src/components/DataListTable";
import useScreen from "#src/hooks/useScreen";
import { CreateUserFormModal } from "#src/components/forms/admin";
import { DataTableType } from "#src/constants";

export default function UsersPage() {
  const [tableType, setTableType] = useState<DataTableType>(
    DataTableType.LIST
  );
  const { isMobile } = useScreen();
  const theme = useThemeMui();

  console.log(2);

  return (
    <Fragment>
      <Box
        component="header"
        className="flex items-center justify-between mb-2"
      >
        <Typography className="text-lg font-bold" variant="h4">
          Users List
        </Typography>

        <CreateUserFormModal>
          <Button variant="contained" className="normal-case">
            Create User
          </Button>
        </CreateUserFormModal>
      </Box>

      <Box className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <Box className="flex items-center gap-1 order-2 mb-2 sm:order-none mb-1 -mt-2 sm:mt-0">
          {Object.values(DataTableType).map((type) => {
            const isActive = type === tableType;
            return (
              <Tooltip key={type} title={type}>
                <IconButton
                  sx={{
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  }}
                  onClick={() => setTableType(type)}
                >
                  {type === DataTableType.LIST ? (
                    <ViewListIcon />
                  ) : (
                    <WindowIcon />
                  )}
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>

        <Box className="flex items-center gap-1 mb-1 sm:mb-2">
          <TextField
            size="small"
            placeholder="Search"
            type="text"
            className="w-full"
          />
          <Button
            variant="contained"
            className="normal-case"
            sx={{ minWidth: 80 }}
          >
            Search
          </Button>
        </Box>
      </Box>

      <DataListTable
        rows={rows}
        columns={isMobile ? mobileColumns : columns}
      />
    </Fragment>
  );
}
