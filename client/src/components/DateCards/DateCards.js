import React, { useContext } from "react";
import MatchesContext from "../../context/matches";
import DateCard from "../DateCard/DateCard";
import "./DateCards.css";
function DateCards() {
  const { dates, setDates } = useContext(MatchesContext);
  const filteredDates = dates.filter((dt) => dt.status === "accepted");
  const renderedCards = filteredDates.map((dt) => {
    return <DateCard dateInfo={dt} key={dt._id} />;
  });
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="date-card-container">
      <div className="bg-video">
        <video
          src={serverPublic + "video.mp4"}
          className="bg-video__content"
          autoPlay
          muted
          loop
        />
      </div>
      {renderedCards}
    </div>
  );
}

export default DateCards;
