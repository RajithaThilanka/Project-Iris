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
  const [rows, setRows] = useState([]);
  const [imid, setimid] = useState(null);
  const [liveimg, setLiveimg] = useState(null);
  const [idFront, setidFront] = useState(null);
  const [idBack, setidBack] = useState(null);

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
        let liveimg;
        let idFront;
        let idBack;
        const showProfileImage = (e) => {
          imageid = params.row.profilePhoto;
          liveimg = params.row.liveImage;
          idFront = params.row.nicFront;
          idBack = params.row.nicBack;
          setLiveimg(liveimg);
          setidFront(idFront);
          setidBack(idBack);
          setimid(imageid);
        };

        const deleteProfile = async () => {
          const userId = params.row._id;

          try {
            console.log(userId);
            await deleteaUser(userId);
            setRows(rows.filter((u) => u._id + "" !== userId));
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

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

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
          <AllProfileData
            imid={imid}
            liveimg={liveimg}
            idFront={idFront}
            idBack={idBack}
          />
        </Box>
      </Stack>
    </>
  );
}
