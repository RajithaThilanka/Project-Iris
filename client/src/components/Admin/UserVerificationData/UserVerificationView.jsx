import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Stack } from "@mui/material";

import Button from "@mui/material/Button";
export default function UserVerificationView(props) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Stack
          direction="column"
          spacing={1}
          sx={{
            width: "100%",

            alignItems: "center",
          }}
        >
          <Typography variant="inherit"> Live Image </Typography>

          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 1,
              bgcolor: "gray",
              height: "180px",
              width: "180px",
              "&:hover": {
                transform: "scale(1.2)",
                transition: "transform 0.1s ease-in-out",
              },
            }}
            component="img"
            alt="Live image  was not uploaded"
            src={serverPublic + props.liveimg}
          />
        </Stack>

        <Stack
          spacing={0}
          direction="column"
          sx={{ width: "100%", height: "100%", alignItems: "center" }}
        >
          <Typography variant="inherit"> NIC </Typography>
          <Box
            sx={{
              width: "400px",
              height: "100%",
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
              padding={2}
            >
              <Box
                sx={{
                  boxShadow: 3,
                  borderRadius: 0.5,
                  bgcolor: "gray",
                  height: "200px",
                  "&:hover": {
                    transform: "scale(1.2)",
                    transition: "transform 0.1s ease-in-out",
                  },
                }}
                component="img"
                alt="Id Front side was not uploaded"
                src={serverPublic + props.idFront}
              />

              <Box
                sx={{
                  width: "300px",
                  height: "100%",
                  boxShadow: 3,
                  borderRadius: 0.5,
                  bgcolor: "gray",
                  height: "200px",
                  "&:hover": {
                    transform: "scale(1.2)",
                    transition: "transform 0.1s ease-in-out",
                  },
                }}
                component="img"
                alt="Id Back side was not uploaded"
                src={serverPublic + props.idBack}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
