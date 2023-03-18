import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileCards from "../../components/ProfileCards/ProfileCards";
import { users } from "../../dev-data/users";
import "./Friends.css";
import Pulse from "react-reveal/Pulse";
import MatchesContext from "../../context/matches";
import { getAllDates, getAllFriends } from "../../api/UserRequests";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import Navbar from "../../components/Appbar/Navbar";
import { useSelector } from "react-redux";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
function Friends() {
  const { friends, setFriends } = useContext(MatchesContext);
  const { dates, setDates } = useContext(MatchesContext);
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  const [loading, setLoading] = useState(true);
  setActiveTab(2);
  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllFriends();

        setFriends(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    const fetchDates = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getAllDates();

      setDates(data);
    };
    fetchDates();
  }, []);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const containerRef = useRef();
  useEffect(() => {
    containerRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      <Navbar user={user} />
      <div
        className="friends-container"
        style={{
          display: "flex",
        }}
      >
        <VerticalNavbar />
        {!loading && friends.length > 0 && (
          <div className="friends">
            <ProfileCards cardType="friend" />
          </div>
        )}
        {loading && (
          <div
            className="dashboard-loading-container"
            style={{ height: "100vh" }}
            ref={containerRef}
          >
            <div className="dashboard-loading-photo">
              <img src={serverPublic + "irislogo.png"} alt="loading-user" />
            </div>
          </div>
        )}
        <BottomNavbar />
      </div>
    </>
  );
}

export default Friends;
