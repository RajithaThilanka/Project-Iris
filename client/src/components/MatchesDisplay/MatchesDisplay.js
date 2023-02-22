import axios from "axios";
import { useEffect, useState } from "react";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  return (
    <div className="matches-display">
      {matches?.map((match, _index) => (
        <div
          key={_index}
          className="match-card"
          onClick={() => setClickedUser(match)}
        >
          <div className="img-container">
            <img src={match?.url} alt={match?.first_name + " profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
