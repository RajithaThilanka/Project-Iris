import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupAccountInfo } from "../../../api/AuthRequests";

function AccountInfo() {
  const [formData, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const resetForm = () => {
    setData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  };
  const navigate = useNavigate();
  const handleData = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.passwordConfirm) {
      try {
        const {
          data: {
            data: { data },
          },
        } = await signupAccountInfo(formData);
        resetForm();
        navigate(`/auth/signup/user-info/${data._id}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Passwords do not match");
    }
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="signup-container" style={{ height: "100vh" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "80vw",
          margin: "auto",
          height: "auto",
          background: "#fff",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        <Grid container spacing={3} py={4} px={3} margin={2}>
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
              Let's begin
            </h3>
          </Grid>
          <Grid sm={6}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>First Name</FormLabel>
              <TextField
                required
                size="small"
                label="Required"
                fullWidth
                name="firstname"
                onChange={handleData}
                value={formData.firstname}
              />
            </Stack>
          </Grid>
          <Grid sm={6}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Last Name</FormLabel>
              <TextField
                required
                size="small"
                label="Required"
                fullWidth
                name="lastname"
                onChange={handleData}
                value={formData.lastname}
              />
            </Stack>
          </Grid>
          <Grid sm={12}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Email</FormLabel>
              <TextField
                required
                label="Required"
                size="small"
                fullWidth
                name="email"
                type="email"
                onChange={handleData}
                value={formData.email}
              />
            </Stack>
          </Grid>
          <Grid sm={6}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Password</FormLabel>
              <TextField
                required
                label="Required"
                size="small"
                type="password"
                fullWidth
                name="password"
                onChange={handleData}
                value={formData.password}
              />
            </Stack>
          </Grid>
          <Grid sm={6}>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                Confirm Password
              </FormLabel>
              <TextField
                required
                label="Required"
                size="small"
                type="password"
                fullWidth
                name="passwordConfirm"
                onChange={handleData}
                value={formData.passwordConfirm}
              />
            </Stack>
          </Grid>
          <Grid sm={12}></Grid>
          <Grid sm={12}></Grid>
          <Grid sm={4}></Grid>
          <Grid sm={4}>
            <Button variant="contained" fullWidth type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AccountInfo;
