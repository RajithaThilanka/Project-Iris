import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function UserListItem({ user, handleFunction }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div onClick={handleFunction}>
      <div
        style={{
          cursor: "pointer",
          backgroundColor: "var( --color-grey-light-3)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          color: "black",
          padding: "16px 24px",
          marginBottom: "16px",
          borderRadius: "15px",
        }}
      >
        <Avatar sx={{ width: 24, height: 24 }}>{user.firstname[0]}</Avatar>
        <span>{user.firstname + " " + user.lastname}</span>
      </div>
    </div>
  );
}

export default UserListItem;
