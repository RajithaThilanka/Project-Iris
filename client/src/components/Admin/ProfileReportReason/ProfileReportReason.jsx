import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Stack, TextField } from "@mui/material";

import Button from "@mui/material/Button";

export default function ProfileReportReason(props) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <Stack
        spacing={3}
        direction="column"
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack
          spacing={0}
          direction="column"
          sx={{ width: "100%", height: "100%" }}
        >
          <Typography variant="inherit"> Report Description </Typography>
          <TextField
            sx={{ width: "300px" }}
            multiline
            disabled
            rows={3}
            value={props.desc}
            defaultValue="Default Value"
          />
        </Stack>
        <Stack
          spacing={0}
          direction="column"
          sx={{ width: "100%", height: "100%" }}
        >
          <Typography variant="inherit">Evidence</Typography>
          <Box
            sx={{
              boxShadow: 2,
              borderRadius: 1,
              bgcolor: "gray",
              height: "350px",
              width: "300px",
            }}
            component="img"
            alt="NO evidance"
            // src="https://images.unsplash.com/photo-1677484179240-ff398b0a2d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            src={serverPublic + props.evidence}
          />
        </Stack>
      </Stack>
    </div>
  );
}
