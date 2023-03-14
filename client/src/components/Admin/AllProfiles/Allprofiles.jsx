import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import { Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconButton, Typography } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import BlockIcon from "@mui/icons-material/Block";
import { useState, useEffect } from "react";
import AllProfileData from "../AllProfileData/AllProfileData";
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
    type: "string",
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
          <IconButton size="small" onClick={onClick}>
            <BlockIcon />
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

export default function Profilereports() {
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
          <Typography variant="h6">All profiles </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
        <Box>
          <AllProfileData />
        </Box>
      </Stack>
    </>
  );
}
