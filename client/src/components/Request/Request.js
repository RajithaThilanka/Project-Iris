import { Button } from "@mui/material";
import React from "react";
import "./Request.css";
import { AiFillStar } from "react-icons/ai";
import TimeAgo from "react-timeago";
function Request({ data, reqType, handleAcceptClick, handleCancelClick }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="request-container">
      <div className="req-user-img">
        {reqType === "received" ? (
          <img
            src={serverPublic + data.senderId.profilePhoto}
            alt={data?.senderId?.callTag}
          />
        ) : (
          <img
            src={serverPublic + data.receiverId.profilePhoto}
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
              <Button
                variant="contained"
                size="small"
                color="otherColors"
                onClick={handleCancelClick}
              >
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

export default Request;
