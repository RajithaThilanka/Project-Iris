import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { TextField, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Donate } from "../../api/UserRequests";
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
export default function DonationPage() {
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
    // handle donation logic here
    console.log(`Donating ${amount} with message: ${message}`);
  };

  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { id } = useParams();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleDonateClick = async () => {
    try {
      const response = await Donate();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${serverPublic}donationimge.jpg)`,
        height: "100vh",
        backgroundSize: "100% auto",
        backgroundPosition: "center",
      }}
    >
      <Stack className="MainStack" spacing={12} direction="column">
        <Navbar user={user} />
        <Stack
          className="conponenentStack"
          spacing={5}
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Box
            className="containBox"
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              boxShadow: 5,
              width: "500px",
              height: "550px",
            }}
          >
            <Stack
              className="containStack"
              spacing={3}
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <img className="logo" src={serverPublic + "irislogo.png"} />

              <Typography variant="h5"> Advertice With Us</Typography>
              <FormControl sx={{ width: "300px" }}>
                <InputLabel type="number">Amount</InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
              <TextField
                sx={{ width: "300px" }}
                id="outlined-multiline-static"
                multiline
                rows={3}
                label="Enter Description"
              />
              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="Temperature"
                  defaultValue={30}
                  getAriaValueText={""}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={30}
                />
              </Box>

              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Button
                  sx={{ width: "140px" }}
                  variant="contained"
                  onClick={handleDonateClick}
                >
                  Submit
                </Button>
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
