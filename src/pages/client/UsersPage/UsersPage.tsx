import { Fragment, useEffect } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import store from "#src/redux/store";
import { getAllUser } from "#src/redux/slices/userSlice";
import DataListTable from "#src/components/DataListTable";
import useScreen from "#src/hooks/useScreen";
import { CreateUserFormModal } from "#src/components/forms";
import { columns, mobileColumns } from "./columns";

export default function UsersPage() {
  const { isMobile } = useScreen();
  const { list: users, isLoading } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser() as any);
  }, [dispatch]);

  return (
    <Fragment>
      <Box
        component="header"
        className="flex items-center justify-between mb-2"
      >
        <Typography className="text-lg font-bold" variant="h4">
          Users
        </Typography>

        <CreateUserFormModal>
          <Button variant="contained" className="normal-case">
            Create User
          </Button>
        </CreateUserFormModal>
      </Box>

      <Box className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <Box></Box>
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
        rows={users}
        loading={isLoading}
        columns={isMobile ? mobileColumns : columns}
      />
    </Fragment>
  );
}
