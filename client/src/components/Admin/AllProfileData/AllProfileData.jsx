import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Stack } from "@mui/material";

import Button from "@mui/material/Button";

export default function UserVerificationView() {
  return (
    <div>
      <Stack
        spacing={3}
        direction="column"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography variant="h6"> NIC </Typography>
        <Box
          sx={{
            width: "500px",
            height: "250px",
            border: 1,
            borderRadius: 0.5,
          }}
        >
          <Stack
            direction="row"
            spacing="1"
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Frant side
            </Box>
            <Box sx={{ width: "100%", justifyContent: "center" }}>
              back side
            </Box>
          </Stack>
        </Box>

        <Typography variant="h6"> Live Image </Typography>
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              width: "100%",
              height: "250px",
              border: 1,
              borderRadius: 0.5,
            }}
          >
            <Stack
              direction="row"
              spacing="1"
              sx={{ justifyContent: "center" }}
            >
              <Box sx={{ width: "100%" }}>Live Image</Box>
            </Stack>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "250px",
              border: 1,
              borderRadius: 0.5,
            }}
          >
            <Stack
              direction="row"
              spacing="1"
              sx={{ justifyContent: "center" }}
            >
              <Box sx={{ width: "100%" }}>Profile Picture</Box>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
