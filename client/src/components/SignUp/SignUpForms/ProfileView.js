import { Box, Button, FormLabel, Stack, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./ProfileView.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../actions/UploadAction";
import { signupProfileView } from "../../../api/AuthRequests";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileView() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { id } = useParams();
  const navigate = useNavigate();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const [wordCount, setWordCount] = useState(0);
  const [formData, setData] = useState({
    profilePhoto: "",
    userDescription: "",
    userId: id,
  });
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
      setData({ ...formData, profilePhoto: fileName });
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
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
    resetShare();
  };
  const resetShare = () => {
    setImage(null);
  };

  const handleChange = (event) => {
    setData({ ...formData, userDescription: event.target.value });
    console.log(formData.userDescription);
    setWordCount(formData.userDescription.trim().split(" ").length);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (wordCount < 50) {
      console.log("word count must be at least 50");
      return;
    }
    try {
      const {
        data: {
          data: { data },
        },
      } = await signupProfileView(formData);
      navigate(`/auth/signup/lookingfor-info/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup-container">
      <form
        style={{
          width: "80vw",
          margin: "auto",
          height: "auto",
          background: "#fff",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
        method="post"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3} py={1} px={3} margin={2}>
          <Grid sm={12}>
            <div style={{ textAlign: "center" }}>
              <img
                style={{ borderRadius: "50%", width: "4rem", height: "4rem" }}
                src={serverPublic + "irislogo.png"}
                alt="logo"
              />
            </div>
          </Grid>
          <Grid sm={12}>
            <h3
              style={{ textAlign: "center", fontSize: "3.4rem" }}
              className="heading-tertiary"
            >
              Let's make your profile glowing
            </h3>
          </Grid>
          <Grid sm={4}>
            <Stack spacing={1.7}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                Profile Picture
              </FormLabel>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  ref={imageRef}
                  onChange={onImageChange}
                />
                <label for="file">{<CloudUploadIcon />}</label>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  sx={{ fontSize: "1rem" }}
                >
                  Click to Upload
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid sm={12}>
            <Stack spacing={1.7}>
              <FormLabel>
                Tell us something about yourself (minimum 50 words)
              </FormLabel>
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "var(--color-primary-dark)",
                  fontWeight: 600,
                }}
              >
                Number of words:{" "}
                <span style={{ color: "red" }}> {wordCount}</span>
              </p>
              <TextField
                id="filled-multiline-static"
                multiline
                rows={10}
                variant="filled"
                value={formData.userDescription}
                onChange={handleChange}
                required
              />
            </Stack>
          </Grid>
          <Grid sm={12}></Grid>

          <Grid sm={4}></Grid>
          <Grid sm={4}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={wordCount < 50}
            >
              Finish
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ProfileView;
