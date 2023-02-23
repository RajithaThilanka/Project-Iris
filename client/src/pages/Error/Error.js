import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Zoom from "react-reveal/Zoom";
import "./Error.css";
import Loader from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
function Error() {
  const { msg } = useParams();
  return (
    <div className="global-error-container">
      <Zoom>
        <div className="global-error-msg">
          {msg}
          <SentimentVeryDissatisfiedIcon fontSize="large" />
        </div>
      </Zoom>
    </div>
  );
}

export default Error;
