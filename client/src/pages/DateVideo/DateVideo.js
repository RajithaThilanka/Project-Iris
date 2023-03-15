import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notifications from "../../components/VideoPlayer/Notifications";
import Options from "../../components/VideoPlayer/Options";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import MatchesContext from "../../context/matches";
import "./DateVideo.css";
import { useSelector } from "react-redux";
import VideoContext, { VideoContextProvider } from "../../context/videoContext";

import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

function DateVideo() {
  // const { myVideo, stream } = useContext(VideoContext);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const { id } = useParams();
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);

  return (
    <div style={{ background: "var(--color-primary)", height: "100vh" }}>
      <VideoPlayer />
      <Options resId={id}>
        <Notifications resId={id} />
      </Options>
    </div>
  );
}

export default DateVideo;
