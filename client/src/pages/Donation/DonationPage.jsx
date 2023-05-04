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

export default function DonationPage() {
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

  return (
    <div style={{ backgroundImage: `url(/images/donationimge.jpg)` }}>
      <Stack spacing={12} direction="column">
        <Navbar user={user} />
        <Stack
          spacing={5}
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Box
            sx={{
              borderRadius: 1,
              boxShadow: 5,
              width: "600px",
              height: "550px",
            }}
          >
            <Stack
              spacing={3}
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "100px",
              }}
            >
              <Typography variant="h5">
                Donate to Support Our Service
              </Typography>
              <FormControl sx={{ width: "300px" }}>
                <InputLabel type="number">Amount</InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
              <TextField sx={{ width: "300px" }} required label="Enter email" />
              <TextField
                sx={{ width: "300px" }}
                label="Leave a Message"
                multiline
                rows={1}
                value={message}
                onChange={handleMessageChange}
              />
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Button
                  sx={{ width: "140px" }}
                  variant="contained"
                  onClick={handleDonate}
                >
                  Donate
                </Button>
                <Button
                  sx={{ width: "140px" }}
                  variant="contained"
                  onClick={handleDonate}
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
