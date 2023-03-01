import { Chip, Divider } from "@mui/material";
import React, { useContext } from "react";
import { acceptConnection, cancelConRequest } from "../../api/UserRequests";
import Request from "../Request/Request";
import "./Requests.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MatchesContext from "../../context/matches";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Requests() {
  const {
    sentConRequests,
    setsentConRequests,
    receivedConRequests,
    setreceivedConRequests,
    connections,
    setConnections,
  } = useContext(MatchesContext);

  const handleAccept = async (id) => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await acceptConnection(id);
      setreceivedConRequests(
        receivedConRequests.filter((req) => req.senderId._id !== id)
      );
      setConnections([...connections, data]);
    } catch (err) {
      const {
        response: {
          data: {
            error: { name },
          },
        },
      } = err;

      toast.error(name, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelConRequest(id);
      setsentConRequests(
        sentConRequests.filter((req) => req.receiverId._id !== id)
      );
      setreceivedConRequests(
        receivedConRequests.filter((req) => req.senderId._id !== id)
      );
    } catch (err) {
      const {
        response: {
          data: {
            error: { name },
          },
        },
      } = err;

      toast.error(name, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="requests-container">
      <Divider>
        <Chip label="Sent"></Chip>
      </Divider>
      <div className="req-container-sent">
        {sentConRequests.length !== 0 ? (
          sentConRequests.map((req) => (
            <Request
              key={req._id}
              data={req}
              reqType="sent"
              handleCancelClick={() => handleCancel(req?.receiverId?._id)}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              fontSize: "1.1rem",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            No invitations <SentimentVeryDissatisfiedIcon />
          </div>
        )}
      </div>
      <Divider>
        <Chip label="Received"></Chip>
      </Divider>
      <div className="req-container-received">
        {receivedConRequests.length !== 0 ? (
          receivedConRequests.map((req) => (
            <Request
              key={req._id}
              data={req}
              reqType="received"
              handleAcceptClick={() => handleAccept(req?.senderId?._id)}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              fontSize: "1.1rem",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            No invitations <SentimentVeryDissatisfiedIcon />
          </div>
        )}
      </div>
      <Divider />
    </div>
  );
}

export default Requests;
