import { Fragment, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  ViewList as ViewListIcon,
  Window as WindowIcon,
} from "@mui/icons-material";

import { columns } from "./columns";
import { rows } from "./rows";
import DataListTable from "#src/components/DataListTable";
import DataGridCard from "#src/components/DataGridCard";
import useScreen from "#src/hooks/useScreen";

export default function UsersPage() {
  const [tableType, setTableType] = useState<"list" | "grid">("grid");

  return (
    <Fragment>
      <Box className="mb-2 flex items-center gap-2">
        <Tooltip title="List">
          <IconButton
            className={`${tableType === "list" ? "text-blue-500" : ""}`}
            onClick={() => setTableType("list")}
          >
            <ViewListIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Grid">
          <IconButton
            className={`${tableType === "grid" ? "text-blue-500" : ""}`}
            onClick={() => setTableType("grid")}
          >
            <WindowIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {tableType === "list" ? (
        <DataListTable rows={rows} columns={columns} />
      ) : (
        <DataGridCard />
      )}
    </Fragment>
  );
}
