import React, { useContext, useEffect } from "react";
import ProfileCards from "../../components/ProfileCards/ProfileCards";
import { users } from "../../dev-data/users";
import "./Friends.css";
import Pulse from "react-reveal/Pulse";
import MatchesContext from "../../context/matches";
import { getAllDates, getAllFriends } from "../../api/UserRequests";
function Friends() {
  const { friends, setFriends } = useContext(MatchesContext);
  const { dates, setDates } = useContext(MatchesContext);

  // useEffect(() => {
  //   const fetchDates = async () => {
  //     const {
  //       data: {
  //         data: { data },
  //       },
  //     } = await getAllDates();
  //     setDates([...dates, data]);
  //   };
  //   fetchDates();
  // }, []);
  useEffect(() => {
    const fetchFriends = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getAllFriends();
      setFriends(data);
    };
    fetchFriends();
  }, []);

  return (
    <Pulse>
      <div className="friends-container">
        <ProfileCards cardType="friend" />
      </div>
    </Pulse>
  );
}

export default Friends;
