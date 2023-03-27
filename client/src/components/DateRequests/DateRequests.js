import { Chip, Divider } from "@mui/material";
import React, { useContext, useEffect } from "react";
import {
  acceptDate,
  cancelDateRequest,
  getReceivedDateRequests,
  getSentDateRequests,
} from "../../api/UserRequests";
import DateRequest from "../DateRequest/DateRequest";
import "./DateRequests.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MatchesContext from "../../context/matches";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DateRequests({ socket }) {
  const {
    sentDateRequests,
    setsentDateRequests,
    receivedDateRequests,
    setreceivedDateRequests,
    dates,
    setDates,
  } = useContext(MatchesContext);

  const handleAccept = async (id) => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await acceptDate(id);
      setreceivedDateRequests(
        receivedDateRequests.filter((req) => req.senderId._id !== id)
      );

      socket.emit("new-date-request-accepted", data);
    } catch (err) {
      const { message } = err;

      toast.error(message, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleCancel = async (id) => {
    try {
      setsentDateRequests(
        sentDateRequests.filter((req) => req.receiverId._id !== id)
      );
      await cancelDateRequest(id);
      setDates(dates.filter((date) => date.receiverId._id !== id));
    } catch (err) {
      const { message } = err;

      toast.error(message, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="requests-container">
      <Divider>
        <Chip label="Sent"></Chip>
      </Divider>
      <div className="req-container-sent">
        {sentDateRequests.length !== 0 ? (
          sentDateRequests.map((req) => (
            <DateRequest
              key={req._id}
              data={req}
              reqType="sent"
              handleCancelClick={() => handleCancel(req?.receiverId?._id)}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              fontSize: "1.1rem",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            No invitations <SentimentVeryDissatisfiedIcon />
          </div>
        )}
      </div>
      <Divider>
        <Chip label="Received"></Chip>
      </Divider>
      <div className="req-container-received">
        {receivedDateRequests.length !== 0 ? (
          receivedDateRequests.map((req) => (
            <DateRequest
              key={req._id}
              data={req}
              reqType="received"
              handleAcceptClick={() => handleAccept(req?.senderId?._id)}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              fontSize: "1.1rem",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            No invitations <SentimentVeryDissatisfiedIcon />
          </div>
        )}
      </div>
      <Divider />
    </div>
  );
}

export default DateRequests;
