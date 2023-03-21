import React, { useState } from "react";
import "./popUpStyle.css";
import {
  Divider,
  Card,
  Box,
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";
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

export default function ProfileUpdatePop() {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
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
                  //value={currentpassword}
                  // onChange={handleCurrentPasswordChange}
                  //error={currentpasswordError}
                  // helperText={
                  //   currentpasswordError ? "Please enter current password" : ""
                  // }
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
                  // value={password}
                  // onChange={handlePasswordChange}
                  //error={passwordError}
                  // helperText={passwordError ? "Please enter a password" : ""}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <LockIcon />
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
                <Typography>Repeat new Password :</Typography>
                <TextField
                  id="repeat-password-input"
                  type="password"
                  autoComplete="new-password"
                  // value={confirmPassword}
                  // onChange={handleConfirmPasswordChange}
                  // error={confirmPasswordError}
                  // helperText={
                  //   confirmPasswordError ? "Passwords do not match" : ""
                  // }
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
                    //onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
}
