import React from "react";
import DateCard from "../DateCard/DateCard";
import "./DateCards.css";
function DateCards({ dates }) {
  return (
    <div className="date-card-container">
      <DateCard />
      <DateCard />
      <DateCard />
      <DateCard />
    </div>
  );
}

export default DateCards;
