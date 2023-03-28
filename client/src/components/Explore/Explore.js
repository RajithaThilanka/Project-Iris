import React, { useContext, useEffect, useState } from "react";
import MatchesContext from "../../context/matches";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import Navbar from "../../components/Appbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import io from "socket.io-client";
import "./Explore.css";
import Button from "@mui/material/Button";
import { logout } from "../../actions/AuthActions";
import VerifiedIcon from "@mui/icons-material/Verified";
import { getMyVerStatus, getVerStatus } from "../../api/UserRequests";
const ENDPOINT = "http://localhost:5000";
let socket;
function Explore() {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [verStatus, setVerStatus] = useState(false);
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
    connections,
    setConnections,
    setFriends,
    friends,
  } = useContext(MatchesContext);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

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
      }
    });
  });

  useEffect(() => {
    const getStatus = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getMyVerStatus();
        console.log(data);
        if (data) {
          data.status === "verified" ? setVerStatus(true) : setVerStatus(false);
        } else {
          setVerStatus(false);
        }
        //   setVerStatus()
      } catch (error) {
        console.log(error);
        setVerStatus(false);
      }
    };
    getStatus();
  }, []);
  useEffect(() => {
    return () => {
      socket.off();
      setSocketConnected(false);
    };
  }, []);
  return (
    <>
      {socketConnected && <Navbar user={user} socket={socket} />}

      <div
        className="explore-container"
        style={{
          display: "flex",
        }}
      >
        <div className="explore-card-container">
          {!verStatus && (
            <div
              className="explore-card-get-verified"
              style={{
                backgroundImage: `url(${serverPublic + "verify-person.jpg"})`,
              }}
            >
              <div className="verified-frame">
                <VerifiedIcon
                  sx={{
                    color: "#0973d6;",
                    transform: "translate(18.5rem,-1.6rem)",

                    borderRadius: "50%",
                    background: "#fff",
                  }}
                  fontSize="large"
                />
              </div>

              <div className="explore-card-verified-info">
                <div className="explore-card-info-1">
                  <h3 className="heading-secondary verified-card-heading">
                    Get Verified on{" "}
                    <span style={{ color: "var(--color-primary)" }}>IRIS</span>
                  </h3>
                  <h5 className="heading-tertiary verified-card-sub-heading">
                    Photo Verified
                  </h5>
                </div>
                <Button variant="contained" className="verified-card-btn">
                  TRY NOW
                </Button>
              </div>
            </div>
          )}
          <div className="welcome-to-explore-container">
            <h3 className="heading-tertiary">Welcome to Explore</h3>
            <h6>Check out these features as well</h6>
          </div>
          <div className="free-to-night-card">
            <img src={serverPublic + "night-life.jpg"} alt="" />
            <div className="free-to-night-info">
              <h3>Free</h3>
              <h3> Tonight</h3>
              <h5>Down for something spontaneous</h5>
              <h6>Discover</h6>
            </div>
          </div>
          <div className="free-to-night-card">
            <img src={serverPublic + "letsbefriends.jpg"} alt="" />
            <div className="free-to-night-info">
              <h3>Let's be</h3>
              <h3> Friends</h3>
              <h5>Maybe even besties</h5>
              <h6>Discover</h6>
            </div>
          </div>
          <div
            className="explore-card-coffee-date"
            style={{
              backgroundImage: `url(${serverPublic + "coffee-explore.jpg"})`,
            }}
          >
            <div className="explore-card-coffee-info">
              <div className="explore-card-coffee-info-1">
                <h3 className="heading-secondary coffee-card-heading">
                  Coffee Date
                </h3>
                <h5 className="heading-tertiary coffee-card-sub-heading">
                  Take me to your favorite cafe
                </h5>
              </div>
              <Button variant="contained" className="verified-card-btn">
                TRY NOW
              </Button>
            </div>
          </div>

          <div className="explore-passions-card">
            <img src={serverPublic + "creative.jpg"} alt="" />
            <div className="passions-card-tag">Creatives</div>
            <div className="explore-passions-card-info">
              <h3>Match Your Aesthetic </h3>
              <h5>Passions</h5>
            </div>
            <Button variant="contained" className="passion-card-btn">
              TRY NOW
            </Button>
          </div>
          <div className="explore-passions-card">
            <img src={serverPublic + "music.jpg"} alt="" />
            <div className="passions-card-tag">Music Lovers</div>
            <div className="explore-passions-card-info">
              <h3>Split Your Headphones</h3>
              <h5>Passions</h5>
            </div>
            <Button variant="contained" className="passion-card-btn">
              TRY NOW
            </Button>
          </div>
          <div className="explore-passions-card">
            <img src={serverPublic + "food.jpg"} alt="" />
            <div className="passions-card-tag">Foodies</div>
            <div className="explore-passions-card-info">
              <h3>Looking For A Snack?</h3>
              <h5>Passions</h5>
            </div>
            <Button variant="contained" className="passion-card-btn">
              TRY NOW
            </Button>
          </div>
          <div className="explore-passions-card">
            <img src={serverPublic + "food.jpg"} alt="" />
            <div className="passions-card-tag">Foodies</div>
            <div className="explore-passions-card-info">
              <h3>Looking For A Snack?</h3>
              <h5>Passions</h5>
            </div>
            <Button variant="contained" className="passion-card-btn">
              TRY NOW
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
