import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Stack } from "@mui/material";

import Button from "@mui/material/Button";

export default function UserVerificationView(props) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
      <Stack
        spacing={0}
        direction="column"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography variant="inherit"> Type </Typography>
        <Box
          sx={{
            width: "400px",
            height: "400px",
            border: 1,
            borderRadius: 0.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            direction="column"
            spacing={1}
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "300px",
                height: 1,
              }}
              component="img"
              alt="Id Front side was not uploaded"
              src={serverPublic + props.idFront}
            />

            <Box
              sx={{
                width: "300px",
                height: 1,
              }}
              component="img"
              alt="Id Back side was not uploaded"
              src={serverPublic + props.idBack}
            />
          </Stack>
        </Box>

        <Stack direction="row" spacing={5}>
          <Box
            sx={{
              width: "180px",
              height: "180px",
              border: 0,
              borderRadius: 0.5,
            }}
          >
            <Stack
              direction="row"
              spacing="1"
              sx={{ justifyContent: "center" }}
            >
              <Stack direction="column">
                <Typography align="center" variant="inherit">
                  Live Image
                </Typography>
                <Box
                  sx={{
                    boxShadow: 2,
                    borderRadius: 1,
                    bgcolor: "gray",
                    height: "180px",
                    width: "180px",
                  }}
                  component="img"
                  alt="Live image  was not uploaded"
                  src={serverPublic + props.liveimg}
                />
              </Stack>
            </Stack>
          </Box>
          <Box
            sx={{
              height: "180px",
              width: "180px",
              border: 0,
              borderRadius: 0.5,
            }}
          >
            <Stack
              direction="row"
              spacing="1"
              sx={{ justifyContent: "center" }}
            >
              <Stack direction="column">
                <Typography align="center" variant="inherit">
                  Profile Picture
                </Typography>
                <Box
                  sx={{
                    boxShadow: 2,
                    borderRadius: 1,
                    bgcolor: "gray",
                    height: "180px",
                    width: "180px",
                  }}
                  component="img"
                  alt="Profile picture was not uploaded"
                  //src="https://images.unsplash.com/photo-1677484179240-ff398b0a2d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  src={serverPublic + props.imid}
                />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
