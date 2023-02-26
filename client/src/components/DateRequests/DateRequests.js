import { Chip, Divider } from "@mui/material";
import React, { useContext, useEffect } from "react";
import {
  acceptDate,
  cancelDateRequest,
  getAllDates,
  getReceivedDateRequests,
  getSentDateRequests,
  sendDateRequest,
} from "../../api/UserRequests";
import DateRequest from "../DateRequest/DateRequest";
import "./DateRequests.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MatchesContext from "../../context/matches";
function DateRequests({ setNumRequests }) {
  const {
    sentDateRequests,
    setsentDateRequests,
    receivedDateRequests,
    setreceivedDateRequests,
    dates,
    setDates,
  } = useContext(MatchesContext);

  useEffect(() => {
    const fetchDates = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getAllDates();
      //   console.log(data);
      setDates([...dates, ...data]);
      //   console.log(dates);
    };
    fetchDates();
  }, []);

  React.useEffect(() => {
    const fetchsentDateRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getSentDateRequests();
      setsentDateRequests(data);
      //   console.log(sentConRequests);
    };
    fetchsentDateRequests();
  }, []);

  React.useEffect(() => {
    const fetchreceivedDateRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getReceivedDateRequests();
      setreceivedDateRequests(data);
    };
    fetchreceivedDateRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await acceptDate(id);
      setreceivedDateRequests(
        receivedDateRequests.filter((req) => req.senderId._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = async (id) => {
    try {
      setsentDateRequests(
        sentDateRequests.filter((req) => req.receiverId._id !== id)
      );

      console.log(dates);
      console.log(dates.filter((date) => date.receiverId._id !== id));
      setDates(dates.filter((date) => date.receiverId._id !== id));
      console.log(dates);
      await cancelDateRequest(id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setNumRequests(sentDateRequests.length + receivedDateRequests.length);
  }, [sentDateRequests, receivedDateRequests]);
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
