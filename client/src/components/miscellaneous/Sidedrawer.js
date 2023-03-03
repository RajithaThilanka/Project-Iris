import { Box, Button, Drawer, TextField, Tooltip } from "@mui/material";
import { createChat, searchUser } from "../../api/UserRequests";
import "./Sidedrawer.css";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ProfileMenu from "./ProfileMenu";
import NotificationMenu from "./NotificationMenu";
import Loader from "../Loading/Loading";
import UserListItem from "./UserAvatar/UserListItem";
import MatchesContext from "../../context/matches";
import { useNavigate } from "react-router-dom";
function Sidedrawer() {
  const anchor = "left";
  const {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
  } = useContext(MatchesContext);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const {
        data: {
          data: { data },
        },
      } = await searchUser(search);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const {
        data: {
          data: { data },
        },
      } = await createChat(userId);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      //   toggleDrawer(anchor, false);
    } catch (error) {
      console.log(error);
    }
  };
  const list = (anchor) => (
    <Box
      sx={{
        width: 400,
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
      role="presentation"
    >
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search by name"
          sx={{ mr: "16px", flex: 1 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch}>
          Go
        </Button>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          searchResult?.map((user) => {
            return (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            );
          })
        )}
        {loadingChat && <Loader />}
      </div>
    </Box>
  );

  return (
    <>
      <Box style={{}} className="chat-appbar">
        <Tooltip title="Search Friends" placement="bottom-end">
          <Button variant="ghost" onClick={toggleDrawer(anchor, true)}>
            <SearchIcon className="friend-search-icon" />
          </Button>
        </Tooltip>

        <div className="notification-container" style={{}}>
          <NotificationMenu className="bell-icon" />
        </div>
      </Box>
      <div>
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
}

export default Sidedrawer;
