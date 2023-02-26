import React, { useContext, useEffect } from "react";
import DateCards from "../../components/DateCards/DateCards";
import "./Dates.css";
import Pulse from "react-reveal/Pulse";
function Dates() {
  return (
    <Pulse>
      <div className="dates-container">
        <DateCards />
      </div>
    </Pulse>
  );
}

export default Dates;
