import { Box, Button, Typography } from "@mui/material";
import { AddPermissionFormModal } from "#src/components/forms";

export default function PermissionsPage() {
  return (
    <Box
      component="header"
      className="flex items-center justify-between mb-2"
    >
      <Typography className="text-lg font-bold" variant="h4">
        Permissions
      </Typography>
      <AddPermissionFormModal>
        <Button variant="contained" className="normal-case">
          Add Permission
        </Button>
      </AddPermissionFormModal>
    </Box>
  );
}
