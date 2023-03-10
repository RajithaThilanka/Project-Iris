import {
  Box,
  Button,
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
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { signUp } from "../../../actions/AuthActions";
import { signupLookingforInfo } from "../../../api/AuthRequests";

import { StyledFormControlLabel } from "../../UIComponents/Radio";

function LookingFor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formData, setData] = useState({
    lookingForGender: "male",
    minAge: 18,
    maxAge: 0,
    minHeight: 0,
    maxHeight: 0,
    userId: id,
  });

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
      setData({ ...formData, [event.target.name]: +event.target.value });
    } else {
      setData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "minAge") {
      setData({ ...formData, minAge: +event.target.value });
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupLookingforInfo(formData);
      dispatch(signUp(navigate));
    } catch (error) {
      console.log(error);
    }
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="signup-container">
      <form
        style={{
          width: "80vw",
          margin: "auto",
          height: "auto",
          background: "#fff",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
        onSubmit={handleSubmit}
        method="post"
      >
        <Grid container spacing={3} py={1} px={3} margin={2}>
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
              Your ideal partner should be
            </h3>
          </Grid>
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
                    checked={formData?.lookingForGender === "male"}
                  />
                  <StyledFormControlLabel
                    name="lookingForGender"
                    value="female"
                    label="female"
                    control={<Radio />}
                    checked={formData?.lookingForGender === "female"}
                  />
                </RadioGroup>
              </Stack>
            </Stack>
          </Grid>
          <Grid sm={12}>
            <Stack spacing={1.7}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Age between</FormLabel>
              <Stack direction="row">
                <FormControl sx={{ m: 1 }} fullWidth size="small">
                  <Select
                    onChange={handleChange}
                    name="minAge"
                    value={formData.minAge}
                  >
                    {generateAge(18)}
                  </Select>
                  <FormHelperText>Minimum age</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1 }} fullWidth size="small">
                  <Select name="maxAge" onChange={handleData}>
                    {generateAge(formData.minAge + 1)}
                  </Select>
                  <FormHelperText>Maximum age</FormHelperText>
                </FormControl>
              </Stack>
            </Stack>
          </Grid>
          <Grid sm={12}>
            <Stack spacing={1.7}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                Height between
              </FormLabel>
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
                    value={formData.minHeight}
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
                    value={formData.maxHeight}
                  />
                  <FormHelperText>Maximum height</FormHelperText>
                </FormControl>
              </Stack>
            </Stack>
          </Grid>
          <Grid sm={12}></Grid>
          <Grid sm={12}></Grid>
          <Grid sm={4}></Grid>
          <Grid sm={4}>
            <Button variant="contained" fullWidth type="submit">
              Finish
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default LookingFor;
