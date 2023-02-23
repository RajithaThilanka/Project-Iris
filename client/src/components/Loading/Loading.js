import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: (theme) =>
          theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
        animationDuration: "550ms",

        left: 0,
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: "round",
        },
      }}
      size={40}
      thickness={4}
      {...props}
    />
  );
}

export default function Loader() {
  return <FacebookCircularProgress />;
}
