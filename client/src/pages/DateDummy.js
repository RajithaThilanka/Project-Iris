import React from "react";
import { VideoContextProvider } from "../context/videoContext";
import DateVideo from "./DateVideo/DateVideo";

function DateDummy() {
  return (
    <VideoContextProvider>
      <div>
        <DateVideo />
      </div>
    </VideoContextProvider>
  );
}

export default DateDummy;
