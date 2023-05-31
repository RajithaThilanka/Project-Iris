import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Stack, TextField } from "@mui/material";

import Button from "@mui/material/Button";

export default function ProfileReportReason(props) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div style={{ height: "100vh" }}>
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
              "&:hover": {
                transform: "scale(1.2)",
                transition: "transform 0.1s ease-in-out",
              },
            }}
            component="img"
            alt="NO evidance"
            src={serverPublic + props.evidence}
          />
        </Stack>
      </Stack>
    </div>
  );
}
