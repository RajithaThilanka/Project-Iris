import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import { Typography, Stack } from "@mui/material";
export default function SelectDoc() {
  const [view, setView] = React.useState("list");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <>
      <Box>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5">Take Selfie Photo</Typography>
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
