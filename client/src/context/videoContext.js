import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Peer from "simple-peer";
import { io } from "socket.io-client";
import MatchesContext from "./matches";
const VideoContext = createContext();
const socket = io("http://localhost:5000");
function VideoContextProvider({ children }) {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState(user.callTag);
  const [call, setCall] = useState({});
  const [me, setMe] = useState(user.callTag);
  const [videoActiveUsers, setVideoActiveUsers] = useState([]);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        if (myVideo.current) myVideo.current.srcObject = currentStream;
      });

    socket.emit("vidsetup", user);
    socket.on("me", (id) => {
      console.log(id);
      setMe(id);
    });
    socket.on("vidme", (vidUsers) => {
      console.log(vidUsers);
      setVideoActiveUsers(vidUsers);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  const valueToShare = {
    leaveCall,
    answerCall,
    callUser,
    call,
    setCall,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    videoActiveUsers,
    setMe,
    setVideoActiveUsers,
  };

  return (
    <VideoContext.Provider value={valueToShare}>
      {children}
    </VideoContext.Provider>
  );
}

export { VideoContextProvider };
export default VideoContext;
