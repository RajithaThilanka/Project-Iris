import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 150,
    editable: true
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    width: 110,
    editable: true
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    editable: "true"
  }
];

const rows = [
  { id: 1, fullName: "Snow", email: "Jon", status: "Verified", action: "tt" },
  {
    id: 2,
    fullName: "Lannister",
    email: "Cersei",
    status: "Verified",
    action: "tt"
  }
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
