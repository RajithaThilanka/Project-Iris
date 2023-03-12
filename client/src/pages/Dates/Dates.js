import React, { useContext, useEffect } from "react";
import DateCards from "../../components/DateCards/DateCards";
import "./Dates.css";
import Pulse from "react-reveal/Pulse";
import { getAllDates } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";
import { useSelector } from "react-redux";
import Navbar from "../../components/Appbar/Navbar";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";

function Dates() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  setActiveTab(3);
  const { dates, setDates } = useContext(MatchesContext);
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
        style={{
          display: "flex",
          backgroundImage:
            "radial-gradient(at top left,var(--color-primary) 1%,transparent)",
        }}
      >
        <VerticalNavbar />
        <Pulse>
          <div className="dates-container">
            <DateCards />
          </div>
        </Pulse>
      </div>
    </>
  );
}

export default Dates;
