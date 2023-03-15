import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useState } from "react";
import { Typography, Stack, Box, Button } from "@mui/material";
import dayjs from "dayjs";

export default function AdminSettings() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [currentDateTime, setCurrentDateTime] = useState(null);
  const handleClick = () => {
    const currentDate = new Date();
    setCurrentDateTime(currentDate.toLocaleString());
  };

  return (
    <div>
      <Stack diretion="column" spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="h5">
          Schedule Hatespeech Detect Date and Time
        </Typography>
        <Typography variant="h6">
          {dayjs(selectedDate).format("dddd, MMMM D, YYYY h:mm A")}
        </Typography>
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
            />
          </LocalizationProvider>
        </Box>
        <Typography variant="h5">Hate Speech Check Now</Typography>
        <Button variant="outlined" onClick={handleClick}>
          Schedule Now
        </Button>
        {/* {currentDateTime && <p>{currentDateTime}</p>} */}
      </Stack>
    </div>
  );
}
