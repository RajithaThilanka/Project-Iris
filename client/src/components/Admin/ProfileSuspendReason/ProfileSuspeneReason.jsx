import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Stack } from "@mui/material";

import Button from "@mui/material/Button";

export default function ProfileSuspeneReason(props) {
  return (
    <div style={{ height: "100vh" }}>
      <Stack
        spacing={0}
        direction="column"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography variant="h6"> Suspend Description </Typography>

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
          {props.description}
        </Box>
      </Stack>
    </div>
  );
}
