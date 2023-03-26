import React from "react";
import { Grid, Stack, Typography, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import SuggessionFactfiles from "../SuggessionFactfiles/SuggessionFactfiles";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function SuggestionContent(props) {
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="flex-start"
        marginBottom="50px"
        sx={{
          boxShadow: 4,
          height: "100%",
          width: { xl: 1000, lg: 1000, md: 650, sm: 550, xs: 350 },
          borderRadius: 2,
          textAlign: "center",
          bgcolor: "white",
          marginLeft: { xl: 20, lg: 20, md: 10, sm: 5, xs: 5 },
          marginRight: { xl: 20, lg: 20, md: 10, sm: 5, xs: 5 },
        }}
      >
        <Grid item xs={8}>
          <Stack direction="column" sx={{ padding: "10px" }} spacing={2}>
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
              <Typography variant="h6">About</Typography>
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
              <Typography variant="h6">Profile Description</Typography>
              <Typography sx={{ overflowX: "auto" }} variant="subtitle">
                {props.pdes}
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
                <Typography variant="h6"> Your Compatibility Level</Typography>
                <AvatarGroup total={3}>
                  <Avatar
                    sx={{
                      width: { xl: 70, lg: 70, md: 50, sm: 60, xs: 50 },
                      height: { xl: 70, lg: 70, md: 50, sm: 60, xs: 50 },
                    }}
                    alt="Remy Sharp"
                    src="https://images.unsplash.com/photo-1677484179240-ff398b0a2d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
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
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
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
        <Grid item xs={4} sx={{ padding: "10px" }}>
          <Stack direction="column">
            <Box
              sx={{
                width: "300px",
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
                <SuggessionFactfiles Height={props.Height} callName={props.callName} Ethnicity={props.Ethnicity} Dob={props.Dob} Education={props.Education} Language={props.Language} Income={props.Income} Haschildren={props.Haschildren} Religion={props.Religion} />
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
