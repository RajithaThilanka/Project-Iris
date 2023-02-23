import * as React from "react";

import { styled } from "@mui/material/styles";

import FormControlLabel from "@mui/material/FormControlLabel";

export const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));
