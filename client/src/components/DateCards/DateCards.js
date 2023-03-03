import React, { useContext } from "react";
import MatchesContext from "../../context/matches";
import DateCard from "../DateCard/DateCard";
import "./DateCards.css";
function DateCards() {
  const { dates, setDates } = useContext(MatchesContext);
  const filteredDates = dates.filter((dt) => dt.status === "accepted");
  const renderedCards = filteredDates.map((dt) => {
    return <DateCard dateInfo={dt} />;
  });
  return <div className="date-card-container">{renderedCards}</div>;
}

export default DateCards;
