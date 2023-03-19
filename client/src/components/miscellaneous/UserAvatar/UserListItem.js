import styled from "@emotion/styled";
import { Avatar, Badge } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import MatchesContext from "../../../context/matches";
import "./UserListItem.css";
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
        width: "100%",
      }}
      className="user-list-item-container"
    >
      <h6
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          padding: " 10px 24px",
          borderBottom: "1px solid #fff",
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
            src={serverPublic + user.profilePhoto}
            sx={{
              width: "5rem",
              height: "5rem",
              border: "1px solid #fff",
            }}
          />
        </StyledBadge>
        <h6
          style={{
            fontSize: "1.3rem",
            padding: "0.1rem 1rem",
            color: "#000",
            fontWeight: 600,
            flex: 1,
          }}
        >
          {user.firstname + " " + user.lastname}
        </h6>
      </h6>
    </div>
  );
}

export default UserListItem;

// <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "row",
//                       alignItems: "center",
//                       gap: "10px",
//                       padding: " 10px 24px",
//                     }}
//                   >
//                     <StyledBadge
//                       overlap="circular"
//                       anchorOrigin={{
//                         vertical: "bottom",
//                         horizontal: "right",
//                       }}
//                       variant={
//                         activeUsers.some(
//                           (u) =>
//                             u.userId === getSenderFull(user, chat?.users)._id
//                         )
//                           ? "dot"
//                           : ""
//                       }
//                     >
//                       <Avatar
//                         alt="user avatar"
//                         src={
//                           serverPublic +
//                           getSenderFull(loggedUser, chat.users).profilePhoto
//                         }
//                         sx={{
//                           width: "6rem",
//                           height: "6rem",
//                           border: "1px solid #fff",
//                         }}
//                       />
//                     </StyledBadge>

//                     <h6
//                       style={{
//                         fontSize: "1.4rem",
//                         padding: "0.1rem 1rem",

//                         fontWeight: 600,
//                         flex: 1,
//                       }}
//                     >
//                       {getSenderFull(loggedUser, chat.users).firstname +
//                         " " +
//                         getSenderFull(loggedUser, chat.users).lastname}
