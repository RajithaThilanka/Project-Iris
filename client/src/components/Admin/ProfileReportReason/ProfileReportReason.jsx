import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Stack, TextField } from "@mui/material";

import Button from "@mui/material/Button";

export default function ProfileReportReason(props) {
  return (
    <div>
      <Stack
        spacing={0}
        direction="column"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography variant="inherit"> Report Description </Typography>
        <TextField
          sx={{ width: '300px' }}
          multiline
          disabled
          rows={2}
          value={props.desc}

          defaultValue="Default Value"
        />


      </Stack>
    </div>
  );
}
