import React from "react";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
function UserBadgeItem({ user, handleFunction }) {
  return (
    <div
      style={{
        padding: "4px 6px",
        borderRadius: "15px",
        margin: "8px",
        marginBottom: "16px",
        fontSize: "12px",
        backgroundColor: "purple",
        color: "white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "16px",
        width: "10rem",
      }}
      onClick={handleFunction}
    >
      {user.firstname}
      <DoNotDisturbOnIcon />
    </div>
  );
}

export default UserBadgeItem;
