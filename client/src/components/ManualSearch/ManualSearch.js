import React, { useContext, useEffect, useState } from "react";

import {
  getAnyUser,
  getSearchNames,
  getSearchTokens,
} from "../../api/UserRequests";
import SearchIcon from "@mui/icons-material/Search";
import MatchesContext from "../../context/matches";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import Zoom from "react-reveal/Zoom";
import Navbar from "../../components/Appbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
// import "./Connections.css";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import io from "socket.io-client";
import Loader from "../Loading/Loading";
import { logout } from "../../actions/AuthActions";
import ClearIcon from "@mui/icons-material/Clear";
import "./ManualSearch.css";
import { IconButton } from "@mui/material";
import SearchUserCard from "../SearchUserCard/SearchUserCard";
const ENDPOINT = "http://localhost:5000";
let socket;
function ManualSearch() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  setActiveTab(6);
  const { connections, setConnections } = useContext(MatchesContext);
  const [searchLoading, setSearchLoading] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);

  const [resultVisible, setResultVisible] = useState(false);
  const [err, setErr] = useState(null);
  const [tokenErr, setTokenErr] = useState(null);
  const dispatch = useDispatch();

  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const {
    setSocketConnected,
    setActiveUsers,
    notification,
    setNotification,
    receivedConRequests,
    setreceivedConRequests,
    receivedFriendRequests,
    setreceivedFriendRequests,
    setsentConRequests,
    sentConRequests,
    socketConnected,
    setsentFriendRequests,
    setsentDateRequests,
    sentDateRequests,
    sentFriendRequests,
    setFriends,
    friends,
  } = useContext(MatchesContext);
  const [users, setUsers] = useState([]);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [keyword, setKeyword] = useState("");
  const [grid, setGrid] = useState(false);
  const [names, setNames] = useState([]);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("active-users", (activeUsers) => {
      setActiveUsers(activeUsers);
    });
  }, [user]);

  useEffect(() => {
    socket.on("new-con-req-received", (newConReq) => {
      if (!receivedConRequests.some((req) => req._id === newConReq._id)) {
        setreceivedConRequests([newConReq, ...receivedConRequests]);
      }
    });

    socket.on("new-friend-req-received", (newConReq) => {
      if (!receivedFriendRequests.some((req) => req._id === newConReq._id)) {
        setreceivedFriendRequests([newConReq, ...receivedFriendRequests]);
      }
    });
    socket.on("new-con-req-accepted", (newConReq) => {
      setsentConRequests(
        sentConRequests.filter((req) => req._id !== newConReq._id)
      );
      setConnections([...connections, newConReq]);
    });
    socket.on("new-friend-req-accepted", (newConReq) => {
      setsentFriendRequests(
        sentFriendRequests.filter((req) => req._id !== newConReq._id)
      );
      setFriends([...friends, newConReq]);

      setConnections(
        connections.filter(
          (u) =>
            u.receiverId._id !== newConReq.receiverId._id &&
            u.senderId._id !== newConReq.receiverId._id
        )
      );
    });
    socket.on("new-date-req-accepted", (newConReq) => {
      setsentDateRequests(
        sentDateRequests.filter((req) => req._id !== newConReq._id)
      );
    });
  });

  useEffect(() => {
    socket.on("message recieved", async (newMessageRecieved) => {
      if (!notification.includes(newMessageRecieved)) {
        setNotification([newMessageRecieved, ...notification]);

        // setFetchAgain(!fetchAgain);
      }
    });
  });

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const getTokenInfo = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getSearchTokens();
      } catch (error) {
        if (error.response.status === 400) setTokenErr(error);
        else setErr(error);
      }
    };
    getTokenInfo();
  }, []);
  useEffect(() => {
    return () => {
      socket.off();
      setSocketConnected(false);
    };
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      setErr(null);
      try {
        setSearchLoading(true);
        const {
          data: {
            data: { data },
          },
        } = await getSearchNames(keyword);
        setNames(data);
        setSearchLoading(false);
        setErr(null);
      } catch (error) {
        console.log(error);
        setErr(error);
        setSearchLoading(false);
        setKeyword("");
        setUsers([]);
        setNames([]);
      }
    };
    keyword && handleSearch();
  }, [keyword]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(null);
    const handleSearch = async () => {
      try {
        setResultLoading(true);
        const {
          data: {
            data: { data },
          },
        } = await getAnyUser(keyword);
        setUsers(data);
        setErr(null);
        setResultLoading(false);
      } catch (error) {
        console.log(error);

        setResultLoading(false);
        setErr(error);
        setKeyword("");
        setUsers([]);
        setNames([]);
      }
    };
    keyword && handleSearch();
    setResultVisible(true);
    setGrid(false);
  };
  return (
    <>
      {socketConnected && <Navbar user={user} socket={socket} />}
      {socketConnected ? (
        <div
          style={{
            display: "flex",
          }}
          className="manual-search-container"
        >
          <VerticalNavbar />
          <div
            className="manual-search"
            style={{ overflowY: tokenErr || err ? "hidden" : "scroll" }}
          >
            {!tokenErr && err?.response?.status !== 400 ? (
              <form className="search user-search-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={keyword}
                  onChange={handleChange}
                  className="search__input user-search__input"
                  onFocus={() => setGrid(true)}
                  onBlur={() => setGrid(false)}
                />
                <IconButton className="search__button">
                  <SearchIcon className="search__icon" />
                </IconButton>
                <IconButton
                  className="search__button"
                  onClick={() => {
                    setKeyword("");
                    setNames([]);
                    setUsers([]);
                    setResultVisible(false);
                  }}
                >
                  <ClearIcon className="search__icon" />
                </IconButton>
              </form>
            ) : (
              <div className="manual-search-err-msg token-err-msg">
                Tokens are expired.Try again later
              </div>
            )}
            {keyword && grid && (
              <div className="search-grid">
                <h5 className="heading-secondary">Recent searches</h5>
                <div className="search-grid-history">
                  {!searchLoading && !err ? (
                    names.slice(0, 8).map((u) => {
                      return (
                        <div className="search-grid-history-item">
                          <h6 className="heading-tertiary">
                            {u.firstname + " " + u.lastname}
                          </h6>
                        </div>
                      );
                    })
                  ) : searchLoading && !err ? (
                    <div className="manual-search-loader-container">
                      <Loader />
                    </div>
                  ) : !searchLoading && err ? (
                    <div className="manual-search-err-msg">
                      Something went wrong!
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
            {resultVisible && !err && (
              <div className="search-result-grid">
                {!resultLoading && !err
                  ? users.map((u) => {
                      return <SearchUserCard cardHolder={u} />;
                    })
                  : ""}
              </div>
            )}
            {resultLoading && !err && (
              <div className="manual-search-loader-container">
                <Loader />
              </div>
            )}
            {!resultLoading && err && (
              <div className="manual-search-err-msg">
                {err.response.status === 400
                  ? "Tokens expired.Try again tomorrow"
                  : "Something went wrong"}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ManualSearch;
