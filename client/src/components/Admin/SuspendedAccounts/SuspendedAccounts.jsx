import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Stack, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MessageIcon from "@mui/icons-material/Message";
import BlockIcon from "@mui/icons-material/Block";
import { useState, useEffect } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import ProfileSuspeneReason from "../ProfileSuspendReason/ProfileSuspeneReason";

import jsonData from "./AllData.json"; // Import the JSON file
import { getAllSuspendedAccounts } from "../../api/AdminRequests";

export default function SuspendedAccounts() {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: `_id.id`, headerName: "ID", width: 90 },
    { field: `_id.firstname`, headerName: "First name", width: 100 },
    {
      field: `_id.email`,
      headerName: "Email",
      width: 150,
      editable: false,
    },
    {
      field: "_id.verified",
      headerName: "Verified",
      type: "string",
      width: 110,
      editable: false,
    },
    {
      field: "reportCount",
      headerName: "Report Count",
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
        const showDescription = () => {
          setDecription(params.row.description);
        };

        return (
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={showDescription}>
              <VisibilityIcon />
            </IconButton>
            <IconButton size="small" onClick={showDescription}>
              <RestoreIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => console.log("Delete clicked")}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const [accounts, setAccounts] = useState([]);
  const [description, setDecription] = useState("");

  //APi call
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllSuspendedAccounts();
        console.log("Data from server: ", data);
        setRows(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            height: 400,
            width: 800,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Suspended Accounts </Typography>
          <DataGrid
            getRowId={(row) => row._id}
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
          <ProfileSuspeneReason description={description} />
        </Box>
      </Stack>
    </div>
  );
}
