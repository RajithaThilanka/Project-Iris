import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useState } from "react";
import { Typography, Stack, Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { setHatespeech, hateSpeechChechNow } from "../../api/AdminRequests";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import "./settingsStyle.css";

import ScheduleIcon from "@mui/icons-material/Schedule";
import UpdateClusters from "../UpdateClusters/UpdateClusters";

function CustomToolbar(props) {
  return null;
}
export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const handlehateSpeechClick = async () => {
    setIsLoading(true);
    try {
      const response = await hateSpeechChechNow();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClearDate = () => {
    setSelectedDate(null);
    setConvertDate(null);
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [convertdate, setConvertDate] = useState(null);

  const handleButtonClick = () => {
    setHatespeech(convertdate)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setConvertDate(dayjs(selectedDate).format("YYYY, MMMM D,h:mm A"));
  };

  const [currentDateTime, setCurrentDateTime] = useState(null);
  const handleClick = () => {
    const currentDate = new Date();
    setCurrentDateTime(currentDate.toLocaleString());
  };

  return (
    <div>
      <Stack
        direction="row"
        spacing="5"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Stack diretion="column" spacing={2} sx={{ alignItems: "center" }}>
          <Typography variant="h5">
            Schedule Hatespeech Detect Date and Time
          </Typography>
          <Typography variant="h6">{convertdate}</Typography>
          <Box
            sx={{
              border: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              padding: 3,
              boxShadow: 2,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDateTimePicker
                orientation="landscape"
                value={selectedDate}
                onChange={handleDateChange}
                ToolbarComponent={false}
              />
            </LocalizationProvider>
          </Box>
        </Stack>
        <Stack direction="column" spacing={2} alignItems="center" padding={5}>
          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            //padding={25}
          >
            <Typography variant="h5">Hate Speech Schedule</Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleClearDate}>
                Clear
              </Button>
              <Button variant="contained" onClick={handleButtonClick}>
                Schedule Now
              </Button>
            </Stack>
          </Stack>

          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            //padding={25}
          >
            <Typography variant="h5">Hate Speech Check Now</Typography>
            <Button
              variant="contained"
              onClick={handlehateSpeechClick}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Check Hate Speech Now"}
            </Button>
            {/* <Box
              sx={{
                width: "300px",
                height: "300px",
                border: 1,
                borderRadius: 1,
                boxShadow: 3,
              }}
            >
              <List
                sx={{
                  bgcolor: "background.paper",
                }}
                subheader={<ListSubheader>Scheduled Times</ListSubheader>}
              >
                <ListItem>
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText
                    id="switch-list-label-wifi"
                    primary="Schedule time"
                  />
                </ListItem>
              </List>
            </Box> */}
          </Stack>
        </Stack>
        <Stack direction="column" spacing={2}>
          <UpdateClusters />
        </Stack>
      </Stack>
    </div>
  );
}
