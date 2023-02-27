import { Button } from "@mui/material";
import React from "react";
import { users } from "../../dev-data/users";
import "./DateCard.css";
import Countdown from "react-countdown";
function DateCard({ dateInfo }) {
  const dateImgs = [
    {
      dateType: "coffee",
      img: "coffeedate.webp",
    },
    {
      dateType: "rainy",
      img: "rainydate.jpg",
    },
    {
      dateType: "summer",
      img: "summerdate.jpg",
    },
    {
      dateType: "winter",
      img: "winterdate.jpg",
    },
  ];
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const bkgImage = dateImgs.find((d) => d.dateType === dateInfo.dateType);
  return (
    <div className="date-card">
      <div
        className="date-card-img"
        style={{
          backgroundImage: `linear-gradient(
      to right bottom,
      var(--color-grey-light-1),
      transparent
    ),
    url("${serverPublic + bkgImage.img}")`,
        }}
      ></div>

      <div className="date-time-remaining">
        {
          // <Countdown
          //   date={
          //     Date.now() +
          //     new Date(dateInfo.scheduledAt).toUTCString().getTime() -
          //     Date.now()
          //   }
          // />
          9
        }
      </div>
      <div className="date-partners">
        <div className="partner">
          <img src="./img/dinesh.jpg" alt="" className="partner-img" />
          <h3 className="partner-name">Sender</h3>
        </div>
        <div className="partner">
          <img src="./img/dinesh.jpg" alt="" className="partner-img" />
          <h3 className="partner-name">Receiver</h3>
        </div>
      </div>
      <div className="date-scheduled-at">{new Date().toLocaleString()}</div>
      <div className="date-btn-container">
        <Button variant="contained" className="go-to-date-btn">
          Go to date
        </Button>
        <Button variant="contained" className="postpone-btn">
          Postpone
        </Button>
      </div>
    </div>
  );
}

export default DateCard;
