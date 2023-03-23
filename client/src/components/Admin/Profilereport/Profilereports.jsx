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
import ProfileReportReason from "../ProfileReportReason/ProfileReportReason";
import { useState, useEffect } from "react";

import jsonData from "./AllData.json"; // Import the JSON file
import { getProfileReports } from "../../../api/AdminRequests";


export default function Profilereports() {

  const [rows, setRows] = useState([]);
  const [des, setDes] = useState("");
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "userNotified",
      headerName: " User Notified",
      width: 150,
      editable: false,
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 150,
      editable: false,
    },
    {
      field: "reviewStatus",
      headerName: "Review Status",
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

        const showReports = (e) => {
          const description = params.row.description;
          setDes(description);
        };

        return (
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={showReports}>
              <MessageIcon />
            </IconButton>
            <IconButton size="small" onClick={showReports}>
              <VisibilityIcon />
            </IconButton>
            <IconButton size="small" onClick={showReports}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;;

  ///API call
  useEffect(() => {
    const getReportData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getProfileReports();
        setRows(data);
      } catch (error) {
        console.log(error);
      }
    };
    getReportData();
  }, []);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            height: 500,
            width: 800,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Account Reports </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row._id}
          />
        </Box>
        <Box>
          <ProfileReportReason desc={des} />
        </Box>
      </Stack>
    </>
  );
}
