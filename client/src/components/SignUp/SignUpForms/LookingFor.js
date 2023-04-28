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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { signUp } from "../../../actions/AuthActions";
import { signupLookingforInfo } from "../../../api/AuthRequests";

import { StyledFormControlLabel } from "../../UIComponents/Radio";
import Loader from "../../Loading/Loading";

function LookingFor() {
  const {
    state: { id },
  } = useLocation();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const [formData, setData] = useState({
    lookingForGender: "male",
    relationshipGoal: "New friends",
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
    } else if (event.target.name === "relationshipGoal") {
      setData({ ...formData, relationshipGoal: event.target.value });
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await signupLookingforInfo(formData);
      setLoading(false);
      setErr(null);
      dispatch(signUp(navigate));
    } catch (error) {
      console.log(error);
      setErr(error);
      setLoading(false);
    }
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="signup-container">
      <form className="account-info-form" onSubmit={handleSubmit} method="post">
        <Grid container spacing={3} py={1} px={3} margin={2}>
          <Grid sm={12} xs={12}>
            <div style={{ textAlign: "center" }}>
              <img
                style={{ borderRadius: "50%", width: "4rem", height: "4rem" }}
                src={serverPublic + "irislogo.png"}
                alt="logo"
              />
            </div>
          </Grid>
          <Grid sm={12} xs={12}>
            <h3 className="heading-tertiary signup-heading">
              Your ideal partner should be
            </h3>
          </Grid>
          <Grid sm={12} xs={12}>
            <Stack spacing={1.7}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                Relationship goal
              </FormLabel>

              <FormControl sx={{ m: 1 }} fullWidth size="small">
                <Select
                  onChange={handleChange}
                  name="relationshipGoal"
                  value={formData.relationshipGoal}
                >
                  <MenuItem value="New friends">New friends</MenuItem>
                  <MenuItem value="Long term, open to short">
                    Long-term, open to short
                  </MenuItem>
                  <MenuItem value="Short-term, open to long">
                    Short-term, open to long
                  </MenuItem>
                  <MenuItem value="Short-term fun">Short-term fun</MenuItem>
                  <MenuItem value="Long-term partner">
                    Long-term partner
                  </MenuItem>
                  <MenuItem value="Still figuring it out">
                    Still figuring it out
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={12} xs={12}>
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
          <Grid sm={12} xs={12}>
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
          <Grid sm={12} xs={12}>
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
          <Grid sm={12} xs={1}></Grid>
          <Grid sm={12} xs={1}></Grid>
          <Grid sm={4} xs={1}></Grid>
          <Grid sm={4} xs={6}>
            {loading && !err ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </div>
            ) : (
              <Button variant="contained" fullWidth type="submit">
                Finish
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default LookingFor;
