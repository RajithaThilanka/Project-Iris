import { Box, FormLabel, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useState } from "react";

function AccountInfo({ data, setData }) {
  const handleData = (event) => {
    setData({ [event.target.name]: event.target.value });
  };

  return (
    <Box
      sx={{
        width: "80vw",
        margin: "6rem auto",
        height: "60rem",
        boxShadow: "4rem 4rem 5rem rgba(0, 0, 0, 0.06)",
      }}
    >
      <Grid container spacing={3} py={4} px={3} margin={2}>
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
              value={data.firstname}
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
              value={data.lastname}
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
              onChange={handleData}
              value={data.email}
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
              value={data.password}
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
              value={data.passwordConfirm}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AccountInfo;
