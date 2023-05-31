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
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import { Checkbox, FormControlLabel, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import jsonData from "./AllData.json"; // Import the JSON file

import { getAllVeriReq } from "../../../api/AdminRequests";
import { manualVarifyAccount } from "../../api/AdminRequests";

export default function VerificationRequests() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popup-checkbox" : undefined;

  const [rows, setRows] = useState([]);
  const [liveimg, setLiveimg] = useState(null);
  const [idFront, setidFront] = useState(null);
  const [idBack, setidBack] = useState(null);

  const showRequest = (params) => {
    let liveimg;
    let idFront;
    let idBack;
    try {
      liveimg = params.row.liveImage;
      idFront = params.row.nicFront;
      idBack = params.row.nicBack;
      setLiveimg(liveimg);
      setidFront(idFront);
      setidBack(idBack);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: false,
    },
    // {
    //   field: "completeion",
    //   headerName: "Completetion",
    //   width: 150,
    //   editable: false,
    // },

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

        const approveRequest = (e) => {
          const userId = params.row.userId._id;
          //console.log(userId);
          const status = "verified";
          manualVarifyAccount(userId, status)
            .then((response) => {
              console.log("Verified");
              setRows(rows.filter((u) => u.userId._id + "" !== userId));
            })
            .catch((error) => {
              console.log(error);
            });
        };

        const showRequest = () => {
          showRequest(params);
        };
        const deleteRequest = (e) => {
          const userId = params.row.userId._id;
          //console.log(userId);
          const status = "failed";
          manualVarifyAccount(userId, status)
            .then((response) => {
              console.log("failed");
              setRows(rows.filter((u) => u.userId._id + "" !== userId));
            })
            .catch((error) => {
              console.log(error);
            });
        };

        return (
          <>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Box sx={{ width: "100%", height: "100%", padding: "2px" }}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                >
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">
                    Varification Fail Reason
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox onChange={""} name="checkbox1" />}
                      label="Not Clear NIC Photo"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={""} name="checkbox2" />}
                      label="Not Clear Live Photo"
                    />
                  </FormGroup>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="contained">Submit</Button>
                  </Stack>
                </FormControl>
              </Box>
            </Popover>

            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                onClick={approveRequest}
                helperText="Done"
              >
                <DoneIcon />
              </IconButton>

              <IconButton size="small" onClick={deleteRequest}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </>
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
    <div style={{ height: "100vh" }}>
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
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row._id}
            onRowClick={showRequest}
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
    </div>
  );
}
