import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Stack } from "@mui/material";

import Button from "@mui/material/Button";

export default function ProfileReportReason() {
  return (
    <div>
      <Stack
        spacing={0}
        direction="column"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography variant="inherit"> Report Description </Typography>

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
          Report Description
        </Box>
      </Stack>
    </div>
  );
}
