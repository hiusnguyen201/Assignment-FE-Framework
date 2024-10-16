import { Box, Button, Typography } from "@mui/material";

export default function RolesPage() {
  return (
    <Box
      component="header"
      className="flex items-center justify-between mb-2"
    >
      <Typography className="text-lg font-bold" variant="h4">
        Roles
      </Typography>

      <Button variant="contained" className="normal-case">
        Add role
      </Button>
    </Box>
  );
}
