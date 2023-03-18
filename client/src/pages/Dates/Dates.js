import React, { useContext, useEffect, useRef, useState } from "react";
import DateCards from "../../components/DateCards/DateCards";
import "./Dates.css";
import Pulse from "react-reveal/Pulse";
import { getAllDates } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";
import { useSelector } from "react-redux";
import Navbar from "../../components/Appbar/Navbar";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";

function Dates() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  setActiveTab(3);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef();
  const { dates, setDates } = useContext(MatchesContext);
  useEffect(() => {
    const fetchDates = async () => {
      setLoading(true);
      try {
        const {
          data: {
            data: { data },
          },
        } = await getAllDates();
        setLoading(false);
        setDates(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchDates();
  }, []);
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    containerRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      <Navbar user={user} />
      <div
        className="dates-container"
        style={{
          display: "flex",
        }}
      >
        <VerticalNavbar />

        {!loading && dates.length > 0 && (
          <div className="dates">
            <DateCards />
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

export default Dates;
