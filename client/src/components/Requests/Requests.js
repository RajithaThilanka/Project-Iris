import { Chip, Divider } from "@mui/material";
import React, { useContext, useEffect } from "react";
import {
  acceptConnection,
  cancelConRequest,
  getReceivedConRequests,
  getSentConRequests,
  sendConRequest,
} from "../../api/UserRequests";
import Request from "../Request/Request";
import "./Requests.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MatchesContext from "../../context/matches";
function Requests({ setNumRequests }) {
  // const [sentConRequests, setsentConRequests] = React.useState([]);
  // const [receivedConRequests, setreceivedConRequests] = React.useState([]);
  const {
    sentConRequests,
    setsentConRequests,
    receivedConRequests,
    setreceivedConRequests,
  } = useContext(MatchesContext);
  React.useEffect(() => {
    const fetchsentConRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getSentConRequests();
      setsentConRequests(data);
      console.log(sentConRequests);
    };
    fetchsentConRequests();
  }, []);

  React.useEffect(() => {
    const fetchreceivedConRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getReceivedConRequests();
      setreceivedConRequests(data);
    };
    fetchreceivedConRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await acceptConnection(id);
      setreceivedConRequests(
        receivedConRequests.filter((req) => req.senderId._id !== id)
      );
      console.log(receivedConRequests);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelConRequest(id);
      setsentConRequests(
        sentConRequests.filter((req) => req.receiverId._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setNumRequests(sentConRequests.length + receivedConRequests.length);
  }, [sentConRequests, receivedConRequests]);
  return (
    <div className="requests-container">
      <Divider>
        <Chip label="Sent"></Chip>
      </Divider>
      <div className="req-container-sent">
        {sentConRequests.length !== 0 ? (
          sentConRequests.map((req) => (
            <Request
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
        {receivedConRequests.length !== 0 ? (
          receivedConRequests.map((req) => (
            <Request
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

export default Requests;
