import { Chip, Divider } from "@mui/material";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
function FriendRequests() {
  const {
    sentFriendRequests,
    setsentFriendRequests,
    receivedFriendRequests,
    setreceivedFriendRequests,
    friends,
    setFriends,
    connections,
    setConnections,
  } = useContext(MatchesContext);

  const handleAccept = async (id) => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await acceptFriend(id);
      setreceivedFriendRequests(
        receivedFriendRequests.filter((req) => req.senderId._id !== id)
      );
      setConnections(connections.filter((u) => u.senderId._id !== id));
      setFriends([...friends, data]);
    } catch (err) {
      const {
        response: {
          data: {
            error: { name },
          },
        },
      } = err;

      toast.error(name, {
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
      await cancelFriendRequest(id);
      setsentFriendRequests(
        sentFriendRequests.filter((req) => req.receiverId._id !== id)
      );
      setreceivedFriendRequests(
        receivedFriendRequests.filter((req) => req.senderId._id !== id)
      );
    } catch (err) {
      const {
        response: {
          data: {
            error: { name },
          },
        },
      } = err;

      toast.error(name, {
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
