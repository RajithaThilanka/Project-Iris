import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import { Stack, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import UserVerificationView from "../UserVerificationData/UserVerificationView";
import { useState, useEffect } from "react";

import jsonData from "./AllData.json"; // Import the JSON file

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "fullname",
    headerName: "Full Name",
    width: 150,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    width: 110,
    editable: false,
  },

  {
    field: "action",
    headerName: "Action",
    width: 180,
    sortable: false,
    disableClickEventBubbling: true,

    renderCell: (params) => {
      const onClick = (e) => {
        const currentRow = params.row;
        // return alert(JSON.stringify(currentRow, null, 4));
      };

      return (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" onClick={onClick} helperText="Done">
            <DoneIcon />
          </IconButton>
          <IconButton size="small" onClick={onClick}>
            <VisibilityIcon />
          </IconButton>
          <IconButton size="small" onClick={onClick}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      );
    },
  },
];

const rows = [
  { id: 1, fullName: "Snow", email: "Jon@gmail.com", status: "Verified" },

  {
    id: 2,
    fullName: "Lannister",
    email: "Cersei@gmail.com",
    status: "Verified",
  },
];

export default function VerificationRequests() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Parse the JSON data
    const data = JSON.parse(JSON.stringify(jsonData));

    // Create the rows array
    const rowsArray = data.map((item) => ({
      id: item.id,
      fullname: item.fullname,
      email: item.email,
      status: item.status,
    }));

    // Set the rows state
    setRows(rowsArray);
  }, []);

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Box
          sx={{
            height: 500,
            width: 800,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6"> Verification Requests</Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
        <Box>
          <UserVerificationView />
        </Box>
      </Stack>
    </>
  );
}
