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
import CloseIcon from "@mui/icons-material/Close";

import jsonData from "./AllData.json"; // Import the JSON file
import { getProfileReports } from "../../../api/AdminRequests";
import { reviewReport } from "../../api/AdminRequests";

export default function Profilereports() {
  const [rows, setRows] = useState([]);
  const [des, setDes] = useState("");
  const [evidence, setEvidence] = useState(null);

  const showReports = (params) => {
    const description = params.row.description;
    const evidence = params.row.evidence;

    if (evidence == "") {
      setEvidence("");
    } else {
      setEvidence(evidence);
    }
    if (description === "") {
      setDes("No description");
    } else {
      setDes(description);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "userNotified",
      headerName: " User Notified",
      width: 100,
      editable: false,
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 250,
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
        const setReportPositive = (e) => {
          const reportId = params.row._id;
          const reviewStatus = "positive"; // convert to lowercase
          reviewReport(reportId, reviewStatus)
            .then((response) => {
              //setRows(rows);
              setRows(rows.filter((u) => u._id + "" !== reportId));
            })
            .catch((error) => {
              console.log(error);
            });
        };

        const setReportNegative = (e) => {
          const reportId = params.row._id;
          const reviewStatus = "negative"; // convert to lowercase
          reviewReport(reportId, reviewStatus)
            .then((response) => {
              setRows(rows.filter((u) => u._id + "" !== reportId));
            })
            .catch((error) => {
              console.log(error);
            });
        };
        const showReports = () => {
          showReports(params);
        };
        return (
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={setReportPositive}>
              <DoneIcon />
            </IconButton>
            <IconButton size="small" onClick={setReportNegative}>
              <CloseIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

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
    <div style={{ height: "100vh" }}>
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
            onRowClick={showReports}
          />
        </Box>
        <Box>
          <ProfileReportReason desc={des} evidence={evidence} />
        </Box>
      </Stack>
    </div>
  );
}
