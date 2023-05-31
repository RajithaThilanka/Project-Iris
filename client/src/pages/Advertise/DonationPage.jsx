import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { TextField, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Donate, Payment } from "../../api/UserRequests";
import Navbar from "../../components/Appbar/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./DonationStyle.css";
import { useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export default function DonationPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    setFullNameError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      setImage(file);
    };

    reader.readAsDataURL(file);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError("");
  };

  const handleDonateClick = async () => {
    if (!fullName) {
      setFullNameError("Please enter your full name");
    }
    if (!email) {
      setEmailError("Please enter your email");
    }
    if (!description) {
      setDescriptionError("Please enter a description");
    }

    if (fullName && email && description) {
      // try {
      //   navigate(`/advertise/checkout`);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleDonate = () => {
    console.log(`Donating ${amount} with message: ${message}`);
  };

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const [uploadedImage, setUploadedImage] = useState(null);

  const [sliderValue, setSliderValue] = useState(30);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  return (
    <div
      style={{
        height: "100vh",
        backgroundSize: "100% auto",
        backgroundPosition: "center",
      }}
    >
      <Stack className="MainStack" spacing={12} direction="column">
        <Stack
          className="conponenentStack"
          spacing={5}
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <Box
            className="containBox"
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              boxShadow: 5,
              width: "600px",
              height: "120%",
            }}
          >
            <Stack
              className="containStack"
              spacing={2}
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <img className="logo" src={serverPublic + "irislogo.png"} />

              <Typography variant="h5"> Advertice With Us</Typography>

              <Stack direction="column" padding={"20px"} spacing={2}>
                <TextField
                  // sx={{ width: "300px" }}
                  id="outlined-basic"
                  label="Enter Full Name"
                  variant="outlined"
                  value={fullName}
                  onChange={handleFullNameChange}
                  error={!!fullNameError}
                  helperText={fullNameError}
                />
                <TextField
                  // sx={{ width: "300px" }}
                  id="outlined-basic"
                  label="Enter Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                />

                <Box
                  sx={{
                    width: "300px",
                    height: "60px",
                    borderRadius: 1,
                    boxShadow: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography>Upload Addvertiement</Typography>
                  <IconButton>
                    <label htmlFor="file-upload">
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                      />
                      <FileUploadIcon />
                    </label>
                  </IconButton>
                </Box>

                <TextField
                  // sx={{ width: "300px" }}
                  id="outlined-multiline-static"
                  multiline
                  rows={3}
                  label="Enter Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  error={!!descriptionError}
                  helperText={descriptionError}
                />
              </Stack>

              <Box sx={{ width: 300 }}>
                <Typography>Select Days</Typography>
                <Slider
                  aria-label="Temperature"
                  defaultValue={sliderValue}
                  value={sliderValue}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={50}
                />
              </Box>
              <Typography variant="body1">Fee: {sliderValue}$ </Typography>

              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Button
                  onClick={handleDonateClick}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
