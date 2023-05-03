import React from "react";
import { Grid, Stack, Typography, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import SuggessionFactfiles from "../SuggessionFactfiles/SuggessionFactfiles";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useState, useEffect } from "react";
import { getMe } from "../../../api/UserRequests";
import "./contentStyle.css";

export default function SuggestionContent(props) {
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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <Grid
        containesr
        justifyContent="center"
        alignItems="flex-start"
        marginBottom="50px"
        className="AboutContent"
        sx={{
          boxShadow: 4,
          height: "100%",
          // width: { xl: 1000, lg: 1000, md: 650, sm: 550 },
          borderRadius: 2,
          textAlign: "center",
          bgcolor: "white",
          marginLeft: { xl: 20, lg: 20, md: 10, sm: 5, xs: 5 },
          marginRight: { xl: 20, lg: 20, md: 10, sm: 5, xs: 5 },
        }}
      >
        <Grid item xl={8} lg={8} md={8} sm={8} xs={12}>
          <Stack
            className="InnerAbout"
            direction="column"
            sx={{ padding: "10px" }}
            spacing={2}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 2,
                textAlign: "center",
                bgcolor: "white",
                border: 5,
                justifyContent: "center",
                borderColor: "#FFD7EC",
                padding: 2,
              }}
            >
              <Typography className="Caption">About</Typography>
              <Typography sx={{ overflowX: "auto" }} variant="subtitle">
                {props.about}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 2,
                textAlign: "center",
                bgcolor: "white",
                border: 5,
                justifyContent: "center",
                borderColor: "#FFD7EC",
                padding: 2,
              }}
            >
              <Typography className="Caption">Profile Description</Typography>
              <Typography sx={{ overflowX: "auto" }} variant="subtitle">
                {props?.pdes}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 2,
                textAlign: "center",
                alignItems: "center",
                bgcolor: "white",
                border: 5,
                padding: 3,
                justifyContent: "center",
                borderColor: "#FFD7EC",
              }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Typography className="Caption">
                  Your Compatibility Level
                </Typography>
                <AvatarGroup total={3}>
                  <Avatar
                    sx={{
                      width: { xl: 70, lg: 70, md: 50, sm: 60, xs: 50 },
                      height: { xl: 70, lg: 70, md: 50, sm: 60, xs: 50 },
                    }}
                    alt="Remy Sharp"
                    src={serverPublic + props.profilePhoto}
                  />
                  <Avatar
                    sx={{
                      width: { xl: 90, lg: 90, md: 70, sm: 70, xs: 60 },
                      height: { xl: 90, lg: 90, md: 70, sm: 70, xs: 60 },
                      bgcolor: "#C81172",
                    }}
                  >
                    <Typography varient="h3">85%</Typography>
                  </Avatar>
                  <Avatar
                    sx={{
                      width: { xl: 70, lg: 70, md: 50, sm: 60, xs: 50 },
                      height: { xl: 70, lg: 70, md: 50, sm: 60, xs: 50 },
                    }}
                    alt="Agnes Walker"
                    src={serverPublic + user?.profilePhoto}
                  />
                </AvatarGroup>
              </Stack>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "400px",
                borderRadius: 2,
                textAlign: "center",
                bgcolor: "white",
                border: 5,
                padding: 2,
                justifyContent: "center",
                borderColor: "#FFD7EC",
              }}
            >
              <Typography variant="h6">Interests</Typography>
              <Stack direction="column" spacing={1}>
                <TextField
                  label="INTERESTS MOVIES"
                  multiline
                  variant="standard"
                  defaultValue=" "
                  rows={2}
                  disabled
                  value={props.movies}
                  sx={{ width: "100%" }}
                />
                <TextField
                  label="INTERESTS MUISIC"
                  multiline
                  variant="standard"
                  defaultValue=" "
                  rows={2}
                  disabled
                  value={props.music}
                  sx={{ width: "100%" }}
                />
                <TextField
                  label="INTERESTS SOCIAL MEDIA"
                  multiline
                  variant="standard"
                  defaultValue=" "
                  rows={2}
                  disabled
                  value={props.smedia}
                  sx={{ width: "100%" }}
                />
                <TextField
                  label="INTERESTS SPORTS"
                  multiline
                  variant="standard"
                  defaultValue=" "
                  rows={2}
                  disabled
                  value={props.sport}
                  sx={{ width: "100%" }}
                />
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid item xl={4} lg={4} md={4} sm={4} xs={12} sx={{ padding: "10px" }}>
          <Stack direction="column">
            <Box
              className="FactfileContent"
              sx={{
                // width: {
                //   xl: "300px",
                //   lg: "300px",
                //   md: "200px",
                //   sm: "160px",
                //   xs: "480px",
                // },
                height: "100%",
                borderRadius: 2,
                textAlign: "center",
                bgcolor: "white",
                border: 5,
                justifyContent: "center",
                borderColor: "#FFD7EC",
                padding: 3,
              }}
            >
              <Typography variant="h6">
                <SuggessionFactfiles
                  Height={props?.Height}
                  callName={props?.callName}
                  Ethnicity={props?.Ethnicity}
                  Dob={props?.Dob}
                  Education={props?.Education}
                  Language={props?.Language}
                  Income={props?.Income}
                  Haschildren={props?.Haschildren}
                  Religion={props?.Religion}
                />
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
