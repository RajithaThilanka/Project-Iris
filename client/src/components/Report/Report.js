import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Report.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/UploadAction";
import { signupProfileView } from "../../api/AuthRequests";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { reportUser } from "../../api/UserRequests";
import Loader from "../Loading/Loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DialogBox from "../DialogBox/DialogBox";
function Report() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const [uploaded, setUploaded] = useState(false);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { id } = useParams();
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const initialData = {
    reportedUser: id,
    evidence: "",
    reason: "",
    description: "",
  };
  const [loading, setLoading] = useState(false);
  const [reported, setReported] = useState(false);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const [formData, setData] = useState(initialData);
  const imageRef = useRef();
  const navigate = useNavigate();
  const handleUpload = async (e) => {
    e.preventDefault();
    // if there is an image with post

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);

      // newPost.image = fileName;
      setData({ ...formData, evidence: fileName });
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
    setData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      const {
        data: {
          data: { data },
        },
      } = await reportUser(formData);
      setLoading(false);
      setReported(true);
      //   navigate(`/me`);
    } catch (error) {
      setLoading(false);
      setReported(false);
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
    <div className="report-container">
      {!reported ? (
        <form className="report-info-form" method="post">
          <IconButton
            sx={{
              position: "absolute",
              top: "2rem",
              left: "2rem",
              color: "var(--color-primary)",
            }}
            onClick={() => {
              setReported(false);
              setLoading(false);
              resetShare();
              setData(initialData);
              navigate("/me", { replace: true });
            }}
          >
            <ArrowBackIcon />
          </IconButton>
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
                Help us out to find what's wrong
              </h3>
            </Grid>
            <Grid sm={6} xs={12}>
              <Stack spacing={2}>
                <FormLabel>Reason</FormLabel>

                <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                  <Select
                    name="reason"
                    onChange={handleChange}
                    value={formData.reason}
                  >
                    <MenuItem value="nudity or pornography">
                      Nudity or pornography
                    </MenuItem>
                    <MenuItem value="sexual content or soliciting sex">
                      Sexual content or soliciting sex
                    </MenuItem>
                    <MenuItem value="harassment or threatening behavior">
                      Harassment or threatening behavior
                    </MenuItem>
                    <MenuItem value="obscene or offensive language">
                      Obscene or offensive language
                    </MenuItem>
                    <MenuItem value="spamming or scamming">
                      Spamming or scamming
                    </MenuItem>
                    <MenuItem value="drug use or violence">
                      Drug use or violence
                    </MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid sm={12} xs={12}>
              <Stack spacing={1.7}>
                <FormLabel>Describe the issue</FormLabel>
                <TextField
                  id="filled-multiline-static"
                  multiline
                  name="description"
                  rows={10}
                  variant="filled"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Stack>
            </Grid>
            <Grid sm={4}>
              <Stack spacing={1.7}>
                <FormLabel sx={{ marginLeft: "0.7rem" }}>
                  Evidence (Optional)
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

            <Grid sm={12} xs={1}></Grid>
            <Grid sm={4} xs={1}></Grid>
            <Grid sm={4} xs={8}>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Loader />
                </div>
              ) : (
                <DialogBox
                  title="Confirm Report"
                  content="Are you sure to report this user?"
                  YesBtn="Confirm"
                  NoBtn="Cancel"
                  handleYes={handleSubmit}
                >
                  <Button variant="contained" fullWidth>
                    Report
                  </Button>
                </DialogBox>
              )}
            </Grid>
          </Grid>
        </form>
      ) : (
        <div className="success-report-msg">
          <div className="success-report-msg-img">
            <img src={serverPublic + "tick.gif"} alt="tick" />
          </div>
          <h4 className="heading-tertiary">User reported</h4>
          <p>
            Thank you for helping out us to make this a better place.You will be
            notified once we review your report
          </p>
          <Link
            to="/me"
            replace={true}
            style={{ color: "var(--color-primary)", fontSize: "1.2rem" }}
          >
            Go back to dashboard
          </Link>
        </div>
      )}
    </div>
  );
}

export default Report;
