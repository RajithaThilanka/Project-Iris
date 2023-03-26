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
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import FormDialogBox from "../../FormDialogBox/FormDialogBox";
function ProfileView() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [otherImage1, setOtherImage1] = useState(null);
  const [otherImage2, setOtherImage2] = useState(null);
  const [otherImage3, setOtherImage3] = useState(null);
  const [otherImage4, setOtherImage4] = useState(null);
  const [otherImage5, setOtherImage5] = useState(null);
  const [preview, setPreview] = useState();
  const [otherImagePreview1, setOtherImagePreview1] = useState();
  const [otherImagePreview2, setOtherImagePreview2] = useState();
  const [otherImagePreview3, setOtherImagePreview3] = useState();
  const [otherImagePreview4, setOtherImagePreview4] = useState();
  const [otherImagePreview5, setOtherImagePreview5] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [otherUploaded1, setOtherUploaded1] = useState(false);
  const [otherUploaded2, setOtherUploaded2] = useState(false);
  const [otherUploaded3, setOtherUploaded3] = useState(false);
  const [otherUploaded4, setOtherUploaded4] = useState(false);
  const [otherUploaded5, setOtherUploaded5] = useState(false);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { id } = useParams();
  const navigate = useNavigate();

  const onImageChange = (event) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const onOtherImageChange1 = (event) => {
    if (event.target.files && event.target.files[0]) {
      let otherImage1 = event.target.files[0];
      setOtherImage1(otherImage1);
    }
  };
  const onOtherImageChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      let otherImage2 = event.target.files[0];
      setOtherImage2(otherImage2);
    }
  };
  const onOtherImageChange3 = (event) => {
    if (event.target.files && event.target.files[0]) {
      let otherImage3 = event.target.files[0];
      setOtherImage3(otherImage3);
    }
  };
  const onOtherImageChange4 = (event) => {
    if (event.target.files && event.target.files[0]) {
      let otherImage4 = event.target.files[0];
      setOtherImage4(otherImage4);
    }
  };
  const onOtherImageChange5 = (event) => {
    if (event.target.files && event.target.files[0]) {
      let otherImage5 = event.target.files[0];
      setOtherImage5(otherImage5);
    }
  };
  const [wordCount, setWordCount] = useState(0);
  const [formData, setData] = useState({
    profilePhoto: "",
    userDescription: "",
    photos: [],
    urls: [],
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

  const handleOtherUpload1 = async (e) => {
    e.preventDefault();
    // if there is an image with post

    if (otherImage1) {
      const data = new FormData();
      const fileName = Date.now() + otherImage1.name;
      data.append("name", fileName);
      data.append("file", otherImage1);

      // newPost.image = fileName;
      setData({ ...formData, photos: [...formData.photos, fileName] });

      try {
        dispatch(uploadImage(data));
        setOtherUploaded1(true);
      } catch (err) {
        console.log(err);
        setOtherUploaded1(false);
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

  const handleOtherUpload2 = async (e) => {
    e.preventDefault();
    // if there is an image with post

    if (otherImage2) {
      const data = new FormData();
      const fileName = Date.now() + otherImage2.name;
      data.append("name", fileName);
      data.append("file", otherImage2);

      // newPost.image = fileName;
      setData({ ...formData, photos: [...formData.photos, fileName] });
      try {
        dispatch(uploadImage(data));
        setOtherUploaded2(true);
      } catch (err) {
        console.log(err);
        setOtherUploaded2(false);
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

  const handleOtherUpload3 = async (e) => {
    e.preventDefault();
    // if there is an image with post

    if (otherImage3) {
      const data = new FormData();
      const fileName = Date.now() + otherImage3.name;
      data.append("name", fileName);
      data.append("file", otherImage3);

      // newPost.image = fileName;
      setData({ ...formData, photos: [...formData.photos, fileName] });
      try {
        dispatch(uploadImage(data));
        setOtherUploaded3(true);
      } catch (err) {
        console.log(err);
        setOtherUploaded3(false);
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
  const handleOtherUpload4 = async (e) => {
    e.preventDefault();
    // if there is an image with post

    if (otherImage4) {
      const data = new FormData();
      const fileName = Date.now() + otherImage4.name;
      data.append("name", fileName);
      data.append("file", otherImage4);

      // newPost.image = fileName;
      setData({ ...formData, photos: [...formData.photos, fileName] });
      try {
        dispatch(uploadImage(data));
        setOtherUploaded4(true);
      } catch (err) {
        console.log(err);
        setOtherUploaded4(false);
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
  const handleOtherUpload5 = async (e) => {
    e.preventDefault();
    // if there is an image with post

    if (otherImage5) {
      const data = new FormData();
      const fileName = Date.now() + otherImage5.name;
      data.append("name", fileName);
      data.append("file", otherImage5);

      // newPost.image = fileName;
      setData({ ...formData, photos: [...formData.photos, fileName] });
      try {
        dispatch(uploadImage(data));
        setOtherUploaded5(true);
      } catch (err) {
        console.log(err);
        setOtherUploaded5(false);
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
    console.log(formData);
    e.preventDefault();
    if (wordCount < 10) {
      console.log("word count must be at least 10");
      return;
    }
    try {
      const {
        data: {
          data: { data },
        },
      } = await signupProfileView(formData);
      navigate(`/auth/signup/lookingfor-info/${id}`, { replace: true });
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

  useEffect(() => {
    if (!otherImage1) {
      setOtherImagePreview1(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(otherImage1);
    setOtherImagePreview1(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [otherImage1]);

  useEffect(() => {
    if (!otherImage2) {
      setOtherImagePreview2(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(otherImage2);
    setOtherImagePreview2(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [otherImage2]);
  useEffect(() => {
    if (!otherImage3) {
      setOtherImagePreview3(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(otherImage3);
    setOtherImagePreview3(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [otherImage3]);
  useEffect(() => {
    if (!otherImage4) {
      setOtherImagePreview4(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(otherImage4);
    setOtherImagePreview4(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [otherImage4]);
  useEffect(() => {
    if (!otherImage5) {
      setOtherImagePreview5(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(otherImage5);
    setOtherImagePreview5(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [otherImage5]);

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
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                More pictures (Up to 5)
              </FormLabel>
              <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div
                  className="other-images-container"
                  style={{ position: "relative" }}
                >
                  {!otherImage1 ? (
                    <input
                      type="file"
                      name="other-1"
                      id="other-1"
                      accept="image/*"
                      onChange={onOtherImageChange1}
                    />
                  ) : (
                    <img
                      src={otherImagePreview1}
                      alt="profile"
                      style={{
                        width: "12rem",
                        height: "20rem",
                        borderRadius: "15px",
                      }}
                    />
                  )}
                  {!otherImage1 ? (
                    <label for="other-1" id="profile-view-images-upload">
                      {<CloudUploadIcon />}
                    </label>
                  ) : otherImage1 && !otherUploaded1 ? (
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
                        setOtherImage1(undefined);
                      }}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  ) : otherImage1 && otherUploaded1 ? (
                    <h3 className="image-uploaded-logo">Image Uploaded</h3>
                  ) : (
                    ""
                  )}
                  {otherImage1 && !otherUploaded1 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        background: "rgba(0,0,0,0.6)",
                        borderRadius: 0,
                        color: "#fff",
                        "&:hover": {
                          background: "rgba(0,0,0,0.6)",
                        },
                      }}
                      onClick={handleOtherUpload1}
                    >
                      <DoneIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>

                <div
                  className="other-images-container"
                  style={{ position: "relative" }}
                >
                  {!otherImage2 ? (
                    <input
                      type="file"
                      name="other-2"
                      id="other-2"
                      accept="image/*"
                      onChange={onOtherImageChange2}
                    />
                  ) : (
                    <img
                      src={otherImagePreview2}
                      alt="profile"
                      style={{
                        width: "12rem",
                        height: "20rem",
                        borderRadius: "15px",
                      }}
                    />
                  )}
                  {!otherImage2 ? (
                    <label for="other-2" id="profile-view-images-upload">
                      {<CloudUploadIcon />}
                    </label>
                  ) : otherImage2 && !otherUploaded2 ? (
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
                        setOtherImage2(undefined);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  ) : otherImage2 && otherUploaded2 ? (
                    <h3 className="image-uploaded-logo">Image Uploaded</h3>
                  ) : (
                    ""
                  )}
                  {otherImage2 && !otherUploaded2 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        background: "rgba(0,0,0,0.6)",
                        borderRadius: 0,
                        color: "#fff",
                        "&:hover": {
                          background: "rgba(0,0,0,0.6)",
                        },
                      }}
                      onClick={handleOtherUpload2}
                    >
                      <DoneIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>

                <div
                  className="other-images-container"
                  style={{ position: "relative" }}
                >
                  {!otherImage3 ? (
                    <input
                      type="file"
                      name="other-3"
                      id="other-3"
                      accept="image/*"
                      onChange={onOtherImageChange3}
                    />
                  ) : (
                    <img
                      src={otherImagePreview3}
                      alt="profile"
                      style={{
                        width: "12rem",
                        height: "20rem",
                        borderRadius: "15px",
                      }}
                    />
                  )}
                  {!otherImage3 ? (
                    <label for="other-3" id="profile-view-images-upload">
                      {<CloudUploadIcon />}
                    </label>
                  ) : otherImage3 && !otherUploaded3 ? (
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
                        setOtherImage3(undefined);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  ) : otherImage3 && otherUploaded3 ? (
                    <h3 className="image-uploaded-logo">Image Uploaded</h3>
                  ) : (
                    ""
                  )}
                  {otherImage3 && !otherUploaded3 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        background: "rgba(0,0,0,0.6)",
                        borderRadius: 0,
                        color: "#fff",
                        "&:hover": {
                          background: "rgba(0,0,0,0.6)",
                        },
                      }}
                      onClick={handleOtherUpload3}
                    >
                      <DoneIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>

                <div
                  className="other-images-container"
                  style={{ position: "relative" }}
                >
                  {!otherImage4 ? (
                    <input
                      type="file"
                      name="other-4"
                      id="other-4"
                      accept="image/*"
                      onChange={onOtherImageChange4}
                    />
                  ) : (
                    <img
                      src={otherImagePreview4}
                      alt="profile"
                      style={{
                        width: "12rem",
                        height: "20rem",
                        borderRadius: "15px",
                      }}
                    />
                  )}
                  {!otherImage4 ? (
                    <label for="other-4" id="profile-view-images-upload">
                      {<CloudUploadIcon />}
                    </label>
                  ) : otherImage4 && !otherUploaded4 ? (
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
                        setOtherImage4(undefined);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  ) : otherImage4 && otherUploaded4 ? (
                    <h3 className="image-uploaded-logo">Image Uploaded</h3>
                  ) : (
                    ""
                  )}
                  {otherImage4 && !otherUploaded4 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        background: "rgba(0,0,0,0.6)",
                        borderRadius: 0,
                        color: "#fff",
                        "&:hover": {
                          background: "rgba(0,0,0,0.6)",
                        },
                      }}
                      onClick={handleOtherUpload4}
                    >
                      <DoneIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>
                <div
                  className="other-images-container"
                  style={{ position: "relative" }}
                >
                  {!otherImage5 ? (
                    <input
                      type="file"
                      name="other-5"
                      id="other-5"
                      accept="image/*"
                      onChange={onOtherImageChange5}
                    />
                  ) : (
                    <img
                      src={otherImagePreview5}
                      alt="profile"
                      style={{
                        width: "12rem",
                        height: "20rem",
                        borderRadius: "15px",
                      }}
                    />
                  )}
                  {!otherImage5 ? (
                    <label for="other-5" id="profile-view-images-upload">
                      {<CloudUploadIcon />}
                    </label>
                  ) : otherImage5 && !otherUploaded5 ? (
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
                        setOtherImage5(undefined);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  ) : otherImage5 && otherUploaded5 ? (
                    <h3 className="image-uploaded-logo">Image Uploaded</h3>
                  ) : (
                    ""
                  )}
                  {otherImage5 && !otherUploaded5 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        background: "rgba(0,0,0,0.6)",
                        borderRadius: 0,
                        color: "#fff",
                        "&:hover": {
                          background: "rgba(0,0,0,0.6)",
                        },
                      }}
                      onClick={handleOtherUpload5}
                    >
                      <DoneIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>
              </Box>
            </Stack>
          </Grid>
          <Grid sm={12} xs={12}>
            <Stack spacing={1.7}>
              <FormLabel>
                Add links to your favorite videos (Ex:Movie trailers, Music,
                Funny videos, etc)
              </FormLabel>
              <FormDialogBox
                title="Video URL"
                message="Enter a valid and embeddable url of the video"
                setData={setData}
                formData={formData}
              >
                <IconButton
                  style={{
                    color: "#fff",
                    background: "var(--color-primary)",
                    width: "5rem",
                    height: "5rem",
                    borderRadius: "50%",
                    margin: "1rem auto",
                  }}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
              </FormDialogBox>
              {/* <TextField
                id="filled-multiline-static"
                rows={10}
                variant="filled"
                value={formData.userDescription}
                onChange={handleChange}
                required
              /> */}

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {formData?.urls.length > 0 &&
                  formData.urls.map((vidLink, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          fontSize: "1.3rem",
                          color: "#fff",
                          background: "var(--color-primary)",
                          display: "inline-block",
                          borderRadius: "15px",
                          padding: "0.5rem 1rem",
                        }}
                      >
                        {vidLink}
                      </div>
                    );
                  })}
              </div>
            </Stack>
          </Grid>
          <Grid sm={12} xs={12}>
            <Stack spacing={1.7}>
              <FormLabel>
                Tell us something about yourself (minimum 10 words)
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
              disabled={wordCount < 10}
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
