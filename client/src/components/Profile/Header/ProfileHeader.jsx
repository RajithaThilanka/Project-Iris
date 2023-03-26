import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  Grid,
  Typography,
  Stack,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import "./PHeaderstyle.css";
import { useDispatch } from "react-redux";
import Badge from "@mui/material/Badge";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";

import { useState, useEffect } from "react";
import { getMe } from "../../../api/UserRequests";
import { toast } from "react-toastify";
import { uploadImage } from "../../../actions/UploadAction";
import { updateMe } from "../../api/UserRequests";

function ProfilHeader() {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  //get my details
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getMe();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const [formData, setData] = useState({
    profilePhoto: "",
  });

  const dispatch = useDispatch();

  //set image
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      console.log(img);
    }
  };

  const [fileName, SetImageNewName] = useState("");
  //Upload image and rename and new name upload
  const handleUploadAndImageNameUpdate = async (e) => {
    if (image) {
      const data = new FormData();
      const newImageName = Date.now() + image.name;
      data.append("name", newImageName);
      data.append("file", image);

      try {
        await dispatch(uploadImage(data));
        setData({ ...formData, profilePhoto: newImageName });
        await updateMe({ profilePhoto: newImageName });
        console.log("image upload and name update success");
      } catch (err) {
        console.log(err);
        console.log("image upload and name update unsuccess");
      }
    } else {
      console.log("Upload Error");
    }
  };

  return (
    <div>
      <Box
        className="Header"
        sx={{
          display: "flex",
          // height: 300,
          padding: "2",
          borderradius: "5",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={6}
        >
          <Grid item xs={4} justifyContent="right">
            <Stack
              direction="column"
              className="profilepic"
              justifyContent="center"
              alignItems="center"
            >
              <div style={{ position: "relative", backgroundColor: "none" }}>
                <Avatar
                  className="profileavatar custom-avatar"
                  style={{
                    border: "4px solid white",
                    margin: "1px",
                  }}
                  alt="The image"
                  src={serverPublic + user?.profilePhoto}
                  sx={{
                    width: { xs: 64, sm: 96, md: 128, lg: 150 },
                    height: { xs: 64, sm: 96, md: 128, lg: 150 },
                  }}
                />
                <IconButton
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    // backgroundColor: "#5f0937",
                    color: "white",
                  }}
                >
                  <label htmlFor="file-upload">
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 27,
                        height: 27,
                        border: "4px solid #fff",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <ControlPointIcon />
                    </Avatar>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </IconButton>
              </div>
              <Stack direction="row">
                <InputAdornment position="end">
                  <Button
                    component="label"
                    variant="contained"
                    className="prouploadbutton custom-button"
                    onClick={handleUploadAndImageNameUpdate}
                  >
                    Update
                  </Button>
                </InputAdornment>
              </Stack>

              <br />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ProfilHeader;
