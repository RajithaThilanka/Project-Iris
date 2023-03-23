import React, { useInsertionEffect } from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  Card,
  CardContent,
  Typography,
  Content,
  Button,
  CardActions,
  Stack,
  Paper,
  Box,
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import ProComplete from "../../../components/Profile/ProfileComplete/profilecomplete";
import Factfile from "../../../components/Profile/ProfileFactfiles/Factfile";
import { getMe } from "../../../api/UserRequests";
import GppBadIcon from "@mui/icons-material/GppBad";

export default function ProfileAbout() {
  const [showPopup1, setShowPopup1] = useState(false);

  const togglePopup = () => {
    setShowPopup1(!showPopup1);
  };

  const ProfileData = require("../../../components/Profile/profileData.json");

  const [activeStat1, activeState1] = useState(1);
  const [activeStat2, activeState2] = useState(1);
  const [activeStat3, activeState3] = useState(1);
  const [activeStat4, activeState4] = useState(1);
  const [activeStat5, activeState5] = useState(1);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getMe();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {/* Call  Name popup */}
      {showPopup1 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5"> Enter About: </Typography>
                  <IconButton variant="outline" onClick={togglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <TextField
                  id="current-password-input"
                  type="text"
                  autoComplete="current-password"
                  //value={currentpassword}
                  // onChange={handleCurrentPasswordChange}
                  //error={currentpasswordError}
                  // helperText={
                  //   currentpasswordError ? "Please enter current password" : ""
                  // }
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

      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        marginTop={3}
        paddingLeft={10}
        paddingRight={10}
        spacing={2}
      >
        <Grid item xs={8}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              padding: 2,
              borderRadius: 0.5,
              boxShadow: 0.5,
              backgroundColor: "#e1f5fe",
              "&:hover": {
                backgroundColor: "#e1f5fe",
                //  opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Typography>About me</Typography>
            <TextField
              id="standard-multiline-static"
              multiline
              disabled={activeStat2}
              rows={3}
              variant="standard"
              value={user?.userDescription}
              sx={{ width: "100%", border: 0 }}
            />

            <Stack
              direction="row"
              spacing={2}
              justifyContent="right"
              marginTop={2}
            >
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIosIcon />}
                onClick={togglePopup}
              >
                Edit
              </Button>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              padding: 2,
              borderRadius: 0.5,
              boxShadow: 0.5,
              backgroundColor: "#e1f5fe",
              "&:hover": {
                backgroundColor: "#e1f5fe",
                //  opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Stack spacing={2} direction="row">
              <stack direction="column" spacing={2}>
                <Typography>
                  Profile Completetion.
                  <br /> <br />
                </Typography>
                <Stack direction="row" spacing={2}>
                  <ProComplete />
                  <Typography>
                    Your profile is coming together. Our tip: Add more photos to
                    grab the attention of your matches.
                  </Typography>
                </Stack>
              </stack>

              <stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <VerifiedUserIcon verified={user?.verified} />
                <Typography>
                  {user?.verified ? "Verified" : "Unverified"}
                </Typography>
              </stack>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Stack spacing={2} direction={"column"}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                padding: 2,
                borderRadius: 0.5,
                boxShadow: 0.5,
                backgroundColor: "#e1f5fe",
                "&:hover": {
                  backgroundColor: "#e1f5fe",
                  //  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <Typography>Profile Description</Typography>
              <TextField
                id="standard-multiline-static"
                multiline
                disabled={activeStat2}
                rows={3}
                variant="standard"
                value={user?.interests.profileDescription}
                sx={{ width: "100%", border: 0 }}
              />

              <Stack
                direction="row"
                spacing={2}
                justifyContent="right"
                marginTop={2}
              >
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={() => {
                    activeState2(0);
                  }}
                >
                  Edit
                </Button>
              </Stack>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                padding: 2,
                borderRadius: 0.5,
                boxShadow: 0.5,
                backgroundColor: "#e1f5fe",
                "&:hover": {
                  backgroundColor: "#e1f5fe",
                  //  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <Typography>
                Life style <br /> <br />
              </Typography>
              <Stack spacing={2} direction="column" spacing={2}>
                <TextField
                  id="outlined-multiline-static"
                  label="INTERESTS MOVIES"
                  multiline
                  variant="standard"
                  defaultValue=" "
                  rows={3}
                  value={user?.interests.movies}
                  disabled={activeStat3}
                  sx={{ width: "100%" }}
                />

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="right"
                  marginTop={2}
                >
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={() => {
                      activeState3(0);
                    }}
                  >
                    Edit
                  </Button>
                </Stack>

                <TextField
                  id="outlined-multiline-static"
                  label="SPORTS"
                  multiline
                  rows={3}
                  variant="standard"
                  defaultValue=" "
                  disabled={activeStat4}
                  value={user?.interests.sports}
                  sx={{ width: "100%" }}
                />

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="right"
                  marginTop={2}
                >
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={() => {
                      activeState4(0);
                    }}
                  >
                    Edit
                  </Button>
                </Stack>

                <TextField
                  id="outlined-multiline-static"
                  label="MUSIC"
                  multiline
                  rows={3}
                  variant="standard"
                  defaultValue=" "
                  disabled={activeStat5}
                  value={user?.interests.music}
                  sx={{ width: "100%" }}
                />
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="right"
                  marginTop={2}
                >
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={() => {
                      activeState5(0);
                    }}
                  >
                    Edit
                  </Button>
                </Stack>
                <TextField
                  id="outlined-multiline-static"
                  label="SOCIAL MEDIA"
                  multiline
                  rows={3}
                  variant="standard"
                  defaultValue=" "
                  disabled={activeStat5}
                  value={user?.interests.socialMedia}
                  sx={{ width: "100%" }}
                />
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="right"
                  marginTop={2}
                >
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={() => {
                      activeState5(0);
                    }}
                  >
                    Edit
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack spacing={2} direction={"column"}>
            <Factfile />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
