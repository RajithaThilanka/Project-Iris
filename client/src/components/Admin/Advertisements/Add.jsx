import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Stack, IconButton, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import MessageIcon from "@mui/icons-material/Message";
import BlockIcon from "@mui/icons-material/Block";
import { useState, useEffect } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import Preview from "../Advertisements/Preview";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import { Checkbox, FormControlLabel, Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { getAllSuspendedAccounts } from "../../api/AdminRequests";
import AddData from "./AddData.json";
export default function Add() {
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "popup-checkbox" : undefined;
  const columns = [
    { field: "fullname", headerName: "Name", width: 100 },
    {
      field: `email`,
      headerName: "Email",
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
        const showDescription = () => {
          setDecription(params.row.description);
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
              <Box
                justifyContent="flex-end"
                alignItems="flex-start"
                sx={{ width: "100%", height: "100%", padding: "2px" }}
              >
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
                  justifyContent="center"
                  alignItems="center"
                >
                  <FormLabel component="legend">Reason</FormLabel>
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
                    <IconButton size="small" onClick={""}>
                      <DoneIcon />
                    </IconButton>
                    <Button variant="contained">Delete</Button>
                  </Stack>
                </FormControl>
              </Box>
            </Popover>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={showDescription}>
                <DoneIcon />
              </IconButton>
              <IconButton size="small" onClick={handleClick}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </>
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
    <div style={{ height: "100vh" }}>
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            height: 400,
            width: 500,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Advertisement</Typography>
          <DataGrid
            getRowId={(row) => row._id}
            rows={rows}
            // rows={AddData}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[]}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
        <Box>
          <Preview description={description} />
        </Box>
      </Stack>
    </div>
  );
}
