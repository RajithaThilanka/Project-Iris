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

import { getAllVeriReq } from "../../../api/AdminRequests";

export default function VerificationRequests() {
  const [rows, setRows] = useState([]);
  const [liveimg, setLiveimg] = useState(null);
  const [idFront, setidFront] = useState(null);
  const [idBack, setidBack] = useState(null);
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: false,
    },
    {
      field: "completeion",
      headerName: "Completetion",
      width: 150,
      editable: false,
    },

    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        let liveimg;
        let idFront;
        let idBack;
        const approveRequest = (e) => {};
        const showRequest = (e) => {
          liveimg = params.row.liveImage;
          idFront = params.row.nicFront;
          idBack = params.row.nicBack;
          setLiveimg(liveimg);
          setidFront(idFront);
          setidBack(idBack);
        };
        const deleteRequest = (e) => {};

        return (
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={showRequest} helperText="Done">
              <DoneIcon />
            </IconButton>
            <IconButton size="small" onClick={showRequest}>
              <VisibilityIcon />
            </IconButton>
            <IconButton size="small" onClick={showRequest}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  ///API call
  useEffect(() => {
    const getVerReqData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllVeriReq();
        setRows(data);
      } catch (error) {
        console.log(error);
      }
    };
    getVerReqData();
  }, []);

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Box
          sx={{
            height: 500,
            width: 600,
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
            getRowId={(row) => row._id}
          />
        </Box>
        <Box>
          <UserVerificationView
            liveimg={liveimg}
            idFront={idFront}
            idBack={idBack}
          />
        </Box>
      </Stack>
    </>
  );
}
