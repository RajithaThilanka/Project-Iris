import { Box, Button, FormLabel, Stack, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./ProfileView.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../../actions/UploadAction";

function ProfileView({ data, setData }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const imageRef = useRef();
  const handleUpload = async (e) => {
    e.preventDefault();
    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      // newPost.image = fileName;
      setData({ profilePhoto: fileName });
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    resetShare();
  };
  const resetShare = () => {
    setImage(null);
  };

  const handleChange = (event) => {
    setData({ userDescription: event.target.value });
  };
  return (
    <Box
      sx={{
        width: "80vw",
        margin: "6rem auto",
        height: "60rem",
        boxShadow: "4rem 4rem 5rem rgba(0, 0, 0, 0.06)",
      }}
    >
      <Grid container spacing={3} py={1} px={3} margin={2}>
        <Grid sm={4}>
          <Stack spacing={1.7}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>Profile Picture</FormLabel>
            <Box sx={{ display: "flex" }}>
              <input
                type="file"
                id="file"
                accept="image/*"
                ref={imageRef}
                onChange={onImageChange}
              />
              <label for="file">
                {<CloudUploadIcon style={{ marginRight: "1rem" }} />}
              </label>
              <Button variant="outlined" onClick={handleUpload}>
                Upload
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid sm={12}>
          <Stack spacing={1.7}>
            <FormLabel>Tell us something about yourself</FormLabel>
            <TextField
              id="filled-multiline-static"
              multiline
              rows={10}
              variant="filled"
              value={data.userDescription}
              onChange={handleChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileView;
