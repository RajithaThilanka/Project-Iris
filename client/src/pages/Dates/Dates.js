import React, { useContext, useEffect } from "react";
import DateCards from "../../components/DateCards/DateCards";
import "./Dates.css";
import Pulse from "react-reveal/Pulse";
import { getAllDates } from "../../api/UserRequests";
import MatchesContext from "../../context/matches";

function Dates() {
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

  return (
    <Pulse>
      <div className="dates-container">
        <DateCards />
      </div>
    </Pulse>
  );
}

export default Dates;
