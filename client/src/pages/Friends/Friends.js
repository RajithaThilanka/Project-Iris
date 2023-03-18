import React, { useContext, useEffect } from "react";
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
  setActiveTab(2);
  useEffect(() => {
    const fetchFriends = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getAllFriends();
      // console.log(data);
      setFriends(data);
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

  return (
    <>
      <Navbar user={user} />
      <div
        className="friends-container"
        style={{
          display: "flex",
          backgroundImage:
            "radial-gradient(at top left,var(--color-primary) 1%,transparent)",
        }}
      >
        <VerticalNavbar />
        <Pulse>
          <div className="friends">
            <ProfileCards cardType="friend" />
          </div>
        </Pulse>
        <BottomNavbar />
      </div>
    </>
  );
}

export default Friends;
