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

import { getAllUsers, deleteaUser } from "../../../api/AdminRequests";

export default function Profilereports() {
  const [imid, setimid] = useState(null);
  const [userId, getuserId] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstname",
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
      field: "verified",
      headerName: "Verified",
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
        let imageid;
        let userId;
        const showProfileImage = (e) => {
          imageid = params.row.profilePhoto;
          setimid(imageid);
        };

        const deleteProfile = async () => {
          userId = params.row._id;
          getuserId(userId);

          try {
            await deleteaUser(userId);
            console.log(userId);
          } catch (error) {
            console.log(error);
          }
        };

        return (
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={showProfileImage}>
              <BlockIcon />
            </IconButton>
            <IconButton size="small" onClick={showProfileImage}>
              <VisibilityIcon />
            </IconButton>
            <IconButton size="small" onClick={deleteProfile}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
    {
      field: "occupation",
      headerName: "Occupation",
      type: "string",
      width: 110,
      editable: false,
    },
    {
      field: "country",
      headerName: "Country",
      type: "string",
      width: 110,
      editable: false,
    },
  ];

  const [rows, setRows] = useState([]);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // const [user, setUser] = useState([]);

  //Json File load
  // useEffect(() => {
  //   // Parse the JSON data
  //   const data = JSON.parse(JSON.stringify(jsonData));

  //   // Create the rows array
  //   const rowsArray = data.map((item) => ({
  //     id: item.id,
  //     fullname: item.fullname,
  //     email: item.email,
  //     status: item.status,
  //   }));

  //   // Set the rows state
  //   setRows(rowsArray);
  // }, []);

  ///API call
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllUsers();
        setRows(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
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
          <AllProfileData imid={imid} />
        </Box>
      </Stack>
    </>
  );
}
