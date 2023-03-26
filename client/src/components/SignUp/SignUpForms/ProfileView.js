import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./ProfileView.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../actions/UploadAction";
import { signupProfileView } from "../../../api/AuthRequests";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelIcon from "@mui/icons-material/Cancel";
function ProfileView() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const [uploaded, setUploaded] = useState(false);
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
  const resetShare = () => {
    setImage(null);
  };

  const handleChange = (event) => {
    setData({ ...formData, userDescription: event.target.value });
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
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);
  return (
    <div className="signup-container">
      <form className="account-info-form" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={3} py={1} px={3} margin={2}>
          <Grid sm={12} xs={12}>
            <div style={{ textAlign: "center" }}>
              <img
                style={{ borderRadius: "50%", width: "4rem", height: "4rem" }}
                src={serverPublic + "irislogo.png"}
                alt="logo"
              />
            </div>
          </Grid>
          <Grid sm={12} xs={12}>
            <h3 className="heading-tertiary signup-heading">
              Let's make your profile glowing
            </h3>
          </Grid>
          <Grid sm={4}>
            <Stack spacing={1.7}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                Profile Picture
              </FormLabel>
              <Box sx={{ display: "flex", gap: "1rem" }}>
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
                  disabled={uploaded || !image}
                >
                  Upload
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid sm={12} xs={12}>
            <div className="image-preview-container">
              {image && <img src={preview} alt="profile" />}
              {image && !uploaded && (
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: 0,
                    color: "#fff",
                    "&:hover": {
                      background: "rgba(0,0,0,0.6)",
                    },
                  }}
                  onClick={() => {
                    setImage(undefined);
                  }}
                >
                  <CancelIcon />
                </IconButton>
              )}

              {uploaded && image && (
                <h3 className="image-uploaded-logo">Image Uploaded</h3>
              )}
            </div>
          </Grid>
          <Grid sm={12} xs={12}>
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
          <Grid sm={12} xs={1}></Grid>
          <Grid sm={4} xs={1}></Grid>
          <Grid sm={4} xs={8}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={wordCount < 50}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ProfileView;
