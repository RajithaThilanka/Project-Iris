import { Button } from "@mui/material";
import React from "react";
import "./FriendRequest.css";
import { AiFillStar } from "react-icons/ai";
import TimeAgo from "react-timeago";
function FriendRequest({
  data,
  reqType,
  handleAcceptClick,
  handleCancelClick,
}) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="request-container">
      <div className="req-user-img">
        {reqType === "received" ? (
          <img
            src={
              data?.senderId?.profilePhoto
                ? serverPublic + data?.senderId?.profilePhoto
                : serverPublic + "defaultProfile.png"
            }
            alt={data?.senderId?.callTag}
          />
        ) : (
          <img
            src={
              data?.receiverId?.profilePhoto
                ? serverPublic + data?.receiverId?.profilePhoto
                : serverPublic + "defaultProfile.png"
            }
            alt={data?.receiverId?.callTag}
          />
        )}
      </div>
      <div className="req-user-container">
        <div className="user-type">{<AiFillStar />}</div>
        <div className="req-user-info">
          <h7>
            {reqType === "sent"
              ? data?.receiverId?.callTag
              : data?.senderId?.callTag}
          </h7>
          <p>
            <TimeAgo date={data?.updatedAt} />
          </p>
        </div>
        <div className="req-user-options">
          {reqType === "received" ? (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={handleAcceptClick}
              >
                Accept
              </Button>
              <Button variant="contained" size="small" color="otherColors">
                Decline
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              size="small"
              fullWidth={false}
              color="otherColors"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendRequest;
