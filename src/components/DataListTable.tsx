import { useMemo, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridApiCommon,
  GridAutosizeOptions,
} from "@mui/x-data-grid";

type DataListTableProps<T extends { [key: string]: any }> = {
  apiRef?: React.MutableRefObject<GridApiCommon>;
  rows: T[];
  columns: GridColDef<T>[];
};

export function getAutosizeOptions(keys?: string[]): GridAutosizeOptions {
  return {
    includeHeaders: true,
    includeOutliers: true,
    columns: keys,
    expand: true,
  };
}

export default function DataListTable<T extends { [key: string]: any }>({
  apiRef,
  rows,
  columns,
}: DataListTableProps<T>): React.JSX.Element {
  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      pageSize: 10,
      page: 0,
    });

  const rowData = useMemo(() => rows, [rows]);
  const columnData = useMemo(() => columns, [columns]);

  return (
    <DataGrid
      apiRef={apiRef}
      rows={rowData}
      columns={columnData}
      checkboxSelection
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 50, 100]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      autosizeOptions={getAutosizeOptions()}
    />
  );
}
