import styled from "@emotion/styled";
import { Avatar, Badge } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import MatchesContext from "../../../context/matches";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function UserListItem({ user, handleFunction }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { activeUsers } = useContext(MatchesContext);
  return (
    <div
      onClick={handleFunction}
      style={{
        cursor: "pointer",
        borderRadius: "50px",
        width: "100%",
      }}
    >
      <h6
        style={{
          backgroundColor: "var(--color-primary)",
          color: "#fff",
          fontSize: "1.4rem",
          padding: "1rem 2rem",
          borderRadius: "50px",
          fontWeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant={activeUsers.some((u) => u.userId === user._id) ? "dot" : ""}
        >
          <Avatar
            alt="user avatar"
            src={
              user.profilePhoto
                ? serverPublic + user.profilePhoto
                : serverPublic + "defaultProfile.png"
            }
          />
        </StyledBadge>
        <span style={{ flex: 1, textAlign: "center" }}>
          {user.firstname + " " + user.lastname}
        </span>
      </h6>
    </div>
  );
}

export default UserListItem;
