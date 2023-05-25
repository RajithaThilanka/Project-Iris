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

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div
      style={{
        backgroundImage: `url(${serverPublic}donationimge.jpg)`,
        height: "100vh",
        backgroundSize: "100% auto",
        backgroundPosition: "center",
      }}
    >
      <Stack className="MainStack" spacing={6} direction="column">
        <Stack
          className="conponenentStack"
          spacing={5}
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <Box
            className="containBox"
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              boxShadow: 5,
              width: "400px",
              height: "420px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              className="containStack"
              spacing={2}
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <img className="logo" src={serverPublic + "irislogo.png"} />

              <Box
                sx={{
                  width: "300px",
                  height: "120px",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography> Payment Success...</Typography>
              </Box>

              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Button
                  sx={{ width: "140px" }}
                  variant="contained"
                  onClick={() => {
                    navigate("/me/dashboard");
                  }}
                >
                  Back
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
