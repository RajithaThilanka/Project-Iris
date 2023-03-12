import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Stack } from "@mui/material";

import Button from "@mui/material/Button";

export default function ProfileReportReason() {
  return (
    <div>
      <Stack
        spacing={3}
        direction="column"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography variant="h6"> Report Description </Typography>
        <Box
          sx={{
            width: "500px",
            height: "250px",
            border: 1,
            borderRadius: 0.5,
          }}
        >
          <Box
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Report Description
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
