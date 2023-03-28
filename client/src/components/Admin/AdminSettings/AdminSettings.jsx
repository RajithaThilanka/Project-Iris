import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useState } from "react";
import { Typography, Stack, Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { setHatespeech, hateSpeechChechNow } from "../../api/AdminRequests";

function CustomToolbar(props) {
  return null;
}
export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const handlehateSpeechClick = async () => {
    setIsLoading(true);
    try {
      const response = await hateSpeechChechNow();
      // handle the response as needed
    } catch (error) {
      console.error(error);
      // handle the error as needed
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [convertdate, setConvertDate] = useState(null);
  const handleButtonClick = () => {
    // Call the setHatespeech function with the appropriate parameter value
    setHatespeech("2022-04-01T10:00:00.000Z")
      .then((response) => {
        console.log(response.data); // Output the response data to the console
        // Handle the API response as needed
      })
      .catch((error) => {
        console.log(error.response.data); // Output the error data to the console
        // Handle the API error as needed
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
      <Stack direction="row" spacing="3">
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
                ToolbarComponent={CustomToolbar}
              />
            </LocalizationProvider>
          </Box>
        </Stack>
        <Stack direction="column" spacing={2} alignItems="center" padding={25}>
          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            //padding={25}
          >
            <Typography variant="h5">Hate Speech Schedule</Typography>
            <Button variant="contained" onClick={handleButtonClick}>
              Schedule Now
            </Button>
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
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
