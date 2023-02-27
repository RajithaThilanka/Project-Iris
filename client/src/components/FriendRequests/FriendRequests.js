import { Chip, Divider } from "@mui/material";
import React, { useContext, useEffect } from "react";
import {
  acceptFriend,
  cancelFriendRequest,
  getReceivedFriendRequests,
  getSentFriendRequests,
} from "../../api/UserRequests";

import "./FriendRequests.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FriendRequest from "../FriendRequest/FriendRequest";
import MatchesContext from "../../context/matches";
function FriendRequests({ setNumRequests }) {
  const {
    sentFriendRequests,
    setsentFriendRequests,
    receivedFriendRequests,
    setreceivedFriendRequests,
  } = useContext(MatchesContext);

  React.useEffect(() => {
    const fetchsentFriendRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getSentFriendRequests();
      setsentFriendRequests(data);
    };
    fetchsentFriendRequests();
  }, []);

  React.useEffect(() => {
    const fetchreceivedFriendRequests = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getReceivedFriendRequests();
      setreceivedFriendRequests(data);
    };
    fetchreceivedFriendRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await acceptFriend(id);
      setreceivedFriendRequests(
        receivedFriendRequests.filter((req) => req.senderId._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelFriendRequest(id);
      setsentFriendRequests(
        sentFriendRequests.filter((req) => req.receiverId._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setNumRequests(sentFriendRequests.length + receivedFriendRequests.length);
  }, [sentFriendRequests, receivedFriendRequests]);

  return (
    <div className="requests-container">
      <Divider>
        <Chip label="Sent"></Chip>
      </Divider>
      <div className="req-container-sent">
        {sentFriendRequests.length !== 0 ? (
          sentFriendRequests.map((req) => (
            <FriendRequest
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
        {receivedFriendRequests.length !== 0 ? (
          receivedFriendRequests.map((req) => (
            <FriendRequest
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

export default FriendRequests;
