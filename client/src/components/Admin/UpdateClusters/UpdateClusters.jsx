import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { updateClusters } from "../../../api/AdminRequests";

export default function UpdateClusters() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdateClusters = () => {
    setLoading(true);
    updateClusters()
      .then((response) => {
        console.log(response);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setSuccess(false);
  };

  return (
    <div>
      <Box
        sx={{
          width: 300,
          height: 300,
          boxShadow: 2,
          borderRadius: 1,
        }}
      >
        <Stack
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h6">Update Clusters</Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button variant="outlined" onClick={handleUpdateClusters}>
              Update
            </Button>
          )}
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Update Successful"
          />
          <Typography>{success}</Typography>
        </Stack>
      </Box>
    </div>
  );
}
