import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import "./selectdoc.css";

export default function SelectDoc(props) {
  const [method, setMethod] = useState("");

  const handleOnClick = (event, value) => {
    setMethod(value);
    props.onSelectDoc(value);
    console.log("Selected value:", value);
  };

  return (
    <>
      <Box>
        <Stack direction="column" spacing={2}>
          <Typography className="selectText">
            Select verifation method
          </Typography>
          <ToggleButtonGroup
            orientation="vertical"
            value={method}
            exclusive
            onChange={handleOnClick}
            color="primary"
          >
            <ToggleButton
              className="VerificationMethod"
              sx={{
                width: {
                  xl: "300px",
                  lg: "300px",
                  md: "250px",
                  sm: "230px",
                  // xs: "220px",
                },
                height: {
                  xl: "80px",
                  lg: "77px",
                  md: "74px",
                  sm: "70px",
                  // xs: "65px",
                },
                "&.Mui-selected": { color: "#C81172" },
              }}
              value="Identity card"
              aria-label="list"
            >
              <Typography>Identity Card</Typography>
            </ToggleButton>

            <ToggleButton
              className="VerificationMethod"
              sx={{
                width: {
                  xl: "300px",
                  lg: "300px",
                  md: "250px",
                  sm: "230px",
                  // xs: "220px",
                },
                height: {
                  xl: "80px",
                  lg: "77px",
                  md: "74px",
                  sm: "70px",
                  // xs: "65px",
                },
                "&.Mui-selected": { color: "#C81172" },
              }}
              value="Passport"
              aria-label="module"
            >
              <Typography> Passport</Typography>
            </ToggleButton>

            <ToggleButton
              className="VerificationMethod"
              sx={{
                width: {
                  xl: "300px",
                  lg: "300px",
                  md: "250px",
                  sm: "230px",
                  // xs: "220px",
                },
                height: {
                  xl: "80px",
                  lg: "77px",
                  md: "74px",
                  sm: "70px",
                  // xs: "65px",
                },
                "&.Mui-selected": { color: "#C81172" },
              }}
              value="Driving licence"
              aria-label="quilt"
            >
              <Typography>Driving licence</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
    </>
  );
}
