import React, { useState } from "react";
import {
  Divider,
  Card,
  Box,
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import Tooltip from "@mui/material/Tooltip";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import InputAdornment from "@mui/material/InputAdornment";
import "./popupStyle.css";

import updateMyPassword from "../../../api/UserRequests";

export default function ProfileSettings() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const [password, setPassword] = useState("");
  const [currentpassword, setcurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentpasswordError, setcurrentPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleCurrentPasswordChange = (event) => {
    setcurrentPassword(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    if (!currentpassword) {
      setcurrentPasswordError(true);
      valid = false;
    }
    if (!password) {
      setPasswordError(true);
      valid = false;
    }
    if (!confirmPassword || confirmPassword !== password) {
      setConfirmPasswordError(true);
      valid = false;
    }
    if (valid) {
      valid = true;
      // do password reset action here
      setConfirmPasswordError(false);
      setPasswordError(false);
      setcurrentPasswordError(false);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const togglePopup2 = () => {
    setShowPopup2(!showPopup2);
  };
  return (
    <div>
      {/* Password popup */}
      {showPopup && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5"> Enter New Password </Typography>
                  <IconButton variant="outline" onClick={togglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Typography>Current Password :</Typography>
                <TextField
                  id="current-password-input"
                  type="password"
                  autoComplete="current-password"
                  value={currentpassword}
                  onChange={handleCurrentPasswordChange}
                  error={currentpasswordError}
                  helperText={
                    currentpasswordError ? "Please enter current password" : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography>New Password :</Typography>
                <TextField
                  id="new-password-input"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  helperText={passwordError ? "Please enter a password" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography>Repeat new Password :</Typography>
                <TextField
                  id="repeat-password-input"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={confirmPasswordError}
                  helperText={
                    confirmPasswordError ? "Passwords do not match" : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={togglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}
      {/* Email popup*/}
      {showPopup2 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5"> Enter New Email </Typography>
                  <IconButton variant="outlined" onClick={togglePopup2}>
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Typography>Current Email :</Typography>
                <TextField
                  id="outlined-password-input"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography>New Email :</Typography>
                <TextField
                  id="outlined-email-input"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={togglePopup2}
                  >
                    Cancel
                  </Button>
                  <Button sx={{ width: "100%" }} variant="contained">
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent={"center"}
        marginTop={5}
      >
        <Box
          marginBottom="10"
          sx={{
            backgroundColor: "white",
            color: "black",
            height: "100%",
            width: "650px",
            borderRadius: "5px",
            padding: "16px",
            alignItems: "center",
            boxShadow: 1,
          }}
        >
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              spacing={3}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography>
                <LockIcon /> Password
              </Typography>
              <IconButton onClick={togglePopup}>
                <EditIcon />
              </IconButton>
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography>
                <EmailIcon /> Email
              </Typography>
              <IconButton onClick={togglePopup2}>
                <EditIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
