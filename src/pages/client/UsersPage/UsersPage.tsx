import { Fragment, useState } from "react";
import { useGridApiRef } from "@mui/x-data-grid";
import { Box, IconButton, Button } from "@mui/material";
import {
  Window as WindowIcon,
  ViewList as ViewListIcon,
} from "@mui/icons-material";

import { columns } from "./columns";
import { rows } from "./rows";
import DataListTable, {
  getAutosizeOptions,
} from "#src/components/DataListTable";

export default function UsersPage() {
  const apiRef = useGridApiRef();
  const [tableType, setTableType] = useState<"list" | "grid">("list");
  const autosizeKeys = columns.map((column) => column.field);
  return (
    <Fragment>
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
          onClick={() =>
            apiRef.current.autosizeColumns(
              getAutosizeOptions(autosizeKeys)
            )
          }
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
        <DataListTable apiRef={apiRef} rows={rows} columns={columns} />
      </Box>
    </Fragment>
  );
}
