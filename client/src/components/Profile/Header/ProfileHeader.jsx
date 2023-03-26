import React from "react";
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
import { getMe } from "../../../api/UserRequests";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "../../../actions/UploadAction";
function ProfilHeader() {
  const [image, setImage] = useState(null);

  const [uploaded, setUploaded] = useState(false);
  const [user, setUser] = useState(null);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const [formData, setData] = useState({
    profilePhoto: "",
  });

  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      console.log(img);
    }
  };

  const handleUpload = async (e) => {
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);

      // newPost.image = fileName;
      setData({ ...formData, profilePhoto: fileName });
      try {
        dispatch(uploadImage(data));
        setUploaded(true);
      } catch (err) {
        console.log(err);
        setUploaded(false);
      }
    } else {
      toast.error("No image is chosen", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
  };

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
              <Stack direction="row">
                <input
                  id="file"
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file">
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>

                <InputAdornment position="end">
                  <Button
                    component="label"
                    variant="contained"
                    className="prouploadbutton custom-button"
                    onClick={handleUpload}
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
