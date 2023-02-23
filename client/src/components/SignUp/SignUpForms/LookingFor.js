import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useState } from "react";

import { StyledFormControlLabel } from "../../UIComponents/Radio";

function LookingFor({ data, setData }) {
  const generateAge = (start) => {
    let ageMenuItems = [];
    for (let i = start; i <= 100; i++) {
      ageMenuItems.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return ageMenuItems;
  };

  const handleData = (event) => {
    if (
      event.target.name === "minHeight" ||
      event.target.name === "maxHeight"
    ) {
      setData({ [event.target.name]: +event.target.value });
    } else {
      setData({ [event.target.name]: event.target.value });
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "minAge") {
      setData({ minAge: +event.target.value });
    }
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
      <Grid container spacing={3} py={1} px={3} margin={2}>
        <Grid sm={12}>
          <Stack spacing={1.7}>
            <Stack spacing={2}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                name="lookingForGender"
                sx={{ display: "flex", flexDirection: "row" }}
                onChange={handleData}
              >
                <StyledFormControlLabel
                  name="lookingForGender"
                  value="male"
                  label="male"
                  control={<Radio />}
                  checked={data?.lookingForGender === "male"}
                />
                <StyledFormControlLabel
                  name="lookingForGender"
                  value="female"
                  label="female"
                  control={<Radio />}
                  checked={data?.lookingForGender === "female"}
                />
              </RadioGroup>
            </Stack>
          </Stack>
        </Grid>
        <Grid sm={12}>
          <Stack spacing={1.7}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>Age between</FormLabel>
            <Stack direction="row">
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  onChange={handleChange}
                  name="minAge"
                  value={data.minAge}
                >
                  {generateAge(18)}
                </Select>
                <FormHelperText>Minimum age</FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select name="maxAge" onChange={handleData}>
                  {generateAge(data.minAge + 1)}
                </Select>
                <FormHelperText>Maximum age</FormHelperText>
              </FormControl>
            </Stack>
          </Stack>
        </Grid>
        <Grid sm={12}>
          <Stack spacing={1.7}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>Height between</FormLabel>
            <Stack direction="row">
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <FilledInput
                  name="minHeight"
                  endAdornment={
                    <InputAdornment position="end">ft</InputAdornment>
                  }
                  inputProps={{
                    "aria-label": "height-feet",
                  }}
                  onChange={handleData}
                  value={data.minHeight}
                />
                <FormHelperText>Minimum height</FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <FilledInput
                  name="maxHeight"
                  endAdornment={
                    <InputAdornment position="end">ft</InputAdornment>
                  }
                  inputProps={{
                    "aria-label": "height-feet",
                  }}
                  onChange={handleData}
                  value={data.maxHeight}
                />
                <FormHelperText>Maximum height</FormHelperText>
              </FormControl>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LookingFor;
