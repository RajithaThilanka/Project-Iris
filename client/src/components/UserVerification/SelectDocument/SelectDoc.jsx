import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Typography, Stack } from "@mui/material";

export default function SelectDoc(props) {
  const [view, setView] = React.useState("list");
  const [method, setMethod] = useState("");

  const handleChange = (event, nextView) => {
    setView(nextView);
    // update the method state based on the selected value of the toggle button group
    if (nextView === "idcard") {
      setMethod("identity card");
    } else if (nextView === "passport") {
      setMethod("passport");
    } else if (nextView === "drivinglicence") {
      setMethod("driving licence");
    }
    props.onSelectDoc(method);
  };

  return (
    <>
      <Box>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5">Select verifation method</Typography>
          <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
            color="primary"
          >
            <ToggleButton
              sx={{
                width: "300px",
                height: "80px",
                "&.Mui-selected": { color: "#C81172" },
              }}
              value="idcard"
              aria-label="list"
            >
              <Typography>Identity Card</Typography>
            </ToggleButton>

            <ToggleButton
              sx={{
                width: "300px",
                height: "80px",
                "&.Mui-selected": { color: "#C81172" },
              }}
              value="passport"
              aria-label="module"
            >
              <Typography> Passport</Typography>
            </ToggleButton>

            <ToggleButton
              sx={{
                width: "300px",
                height: "80px",
                "&.Mui-selected": { color: "#C81172" },
              }}
              value="drivinglicence"
              aria-label="quilt"
            >
              <Typography>Driving Liceense</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
    </>
  );
}
