import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Appbar/Navbar";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import { Button, Chip, Divider, IconButton } from "@mui/material";
import Zoom from "react-reveal/Zoom";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Box } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import { useDispatch, useSelector } from "react-redux";
import {
  getMatches,
  getSignUpQuestions,
  sendConRequest,
} from "../../api/UserRequests";
import SchoolIcon from "@mui/icons-material/School";
import HeightIcon from "@mui/icons-material/Height";
import ChurchIcon from "@mui/icons-material/Church";
import LanguageIcon from "@mui/icons-material/Language";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MatchesContext from "../../context/matches";
import { useContext } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "swiper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import "./Dashboard2.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { LazyLoadImage } from "react-lazy-load-image-component";

import SwiperCore, { EffectCoverflow, Navigation } from "swiper/core";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import { logout } from "../../actions/AuthActions";
import { FlagCircle, ForkRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Dates from "../Dates/Dates";
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const ENDPOINT = "http://localhost:5000";
let socket;
function Dashboard2() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  setActiveTab(0);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [swiper, setSwiper] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(0);
  const { filter } = useContext(MatchesContext);
  const {
    sentConRequests,
    setsentConRequests,
    receivedFriendRequests,
    setreceivedFriendRequests,
    dates,
    setDates,
    socketConnected,
    setsentFriendRequests,
    sentFriendRequests,
  } = useContext(MatchesContext);
  const { matches, setMatches } = useContext(MatchesContext);
  const [filtered, setFiltered] = useState([]);
  const profileContentRef = useRef();
  const [btnClicked, setBtnClicked] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const applyFilter = () => {
    const lookingForGenders = [];
    filter.gender.male && lookingForGenders.push("male");
    filter.gender.female && lookingForGenders.push("female");
    let filteredSugs = matches.filter((m) => {
      const age = Math.abs(
        new Date(Date.now() - Date.parse(m.dob)).getUTCFullYear() - 1970
      );

      const genderMatch = lookingForGenders.includes(m.gender);
      const countryMatch =
        filter.countries.length > 0
          ? filter.countries.includes(m.country)
          : true;
      const langMatch =
        filter.languages.length > 0
          ? m.languages.filter((value) => filter.languages.includes(value))
              .length > 0
          : true;
      let isOnline = true;
      if (filter.online) {
        isOnline = activeUsers.some((user) => user.userId === m._id)
          ? true
          : false;
      }
      return (
        age >= filter.age[0] &&
        age <= filter.age[1] &&
        genderMatch &&
        countryMatch &&
        langMatch &&
        isOnline
      );
    });
    return filteredSugs;
  };
  const navigate = useNavigate();
  const {
    setSocketConnected,
    activeUsers,
    setActiveUsers,
    receivedConRequests,
    setreceivedConRequests,
    notification,
    receivedDateRequests,
    setreceivedDateRequests,
    setFriends,
    friends,
    setConnections,
    connections,
    sentDateRequests,
    setsentDateRequests,
    setNotification,
  } = useContext(MatchesContext);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getSignUpQuestions();
        data?.questions.length > 0 &&
          navigate("/auth/signup/questions", {
            replace: true,
            state: {
              id: user._id,
            },
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestions();
  }, []);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("active-users", (activeUsers) => {
      setActiveUsers(activeUsers);
    });
  }, [user]);
  useEffect(() => {
    socket.on("new-con-req-received", (newConReq) => {
      if (!receivedConRequests.some((req) => req._id === newConReq._id)) {
        setreceivedConRequests([newConReq, ...receivedConRequests]);
      }
    });

    socket.on("new-friend-req-received", (newConReq) => {
      if (!receivedFriendRequests.some((req) => req._id === newConReq._id)) {
        setreceivedFriendRequests([newConReq, ...receivedFriendRequests]);
      }
    });
    socket.on("new-con-req-accepted", (newConReq) => {
      setsentConRequests(
        sentConRequests.filter((req) => req._id !== newConReq._id)
      );
      setConnections([...connections, newConReq]);
    });
    socket.on("new-friend-req-accepted", (newConReq) => {
      setsentFriendRequests(
        sentFriendRequests.filter((req) => req._id !== newConReq._id)
      );
      setFriends([...friends, newConReq]);
      setConnections(
        connections.filter(
          (u) =>
            u.receiverId._id !== newConReq.receiverId._id &&
            u.senderId._id !== newConReq.receiverId._id
        )
      );
    });
    socket.on("new-date-req-received", (newConReq) => {
      if (!receivedDateRequests.some((req) => req._id === newConReq._id)) {
        setreceivedDateRequests([newConReq, ...receivedDateRequests]);
      }
    });
    socket.on("new-date-req-accepted", (newConReq) => {
      setsentDateRequests(
        sentDateRequests.filter((req) => req._id !== newConReq._id)
      );
      setDates([...dates, newConReq]);
    });
  });

  useEffect(() => {
    socket.on("message recieved", async (newMessageRecieved) => {
      if (!notification.includes(newMessageRecieved)) {
        setNotification([newMessageRecieved, ...notification]);
        // setFetchAgain(!fetchAgain);
      }
    });
  });

  useEffect(() => {
    const generateSuggestions = async () => {
      setLoading(true);
      setErr(null);
      try {
        const {
          data: {
            data: { data },
          },
        } = await getMatches();
        console.log(data);
        setMatches(data);
        setLoading(false);
        setErr(null);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setErr(err);
        if (err.response.status === 401) {
          socket?.disconnect();
          dispatch(logout());
        }
      }
    };
    generateSuggestions();
  }, []);

  useEffect(() => {
    setFiltered([]);
    setFiltered(applyFilter());
  }, [filter, matches]);
  const handleConRequest = async (id) => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await sendConRequest(id);

      if (currentProfile === matches.length - 1) {
        setCurrentProfile((currentProfile + 1) % matches.length);
      }
      setMatches(matches.filter((m) => m._id !== id));
      // setCurrentProfile((currentProfile + 1) % matches.length);

      swiper?.slideTo(currentProfile);

      setsentConRequests([data, ...sentConRequests]);
      socket.emit("new-con-request-sent", data);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return null;
    }
  };
  const handleProfileContent = () => {
    profileContentRef?.current.classList.add("show");
    // profileContentRef?.current.classList.add("show");
    setBtnClicked(true);
  };

  const handleCloseProfileContent = () => {
    profileContentRef?.current.classList.remove("show");
    // profileContentRef?.current.classList.add("close");
    setBtnClicked(false);
  };

  const handleTap = (e) => {
    // e.stopPropogation();
    if (e.currentTarget != e.target) return;
    setCurrentPhoto(
      (currentPhoto + 1) % (filtered[currentProfile]?.photos?.length + 1)
    );
  };
  useEffect(() => {
    return () => {
      setSocketConnected(false);
      socket.off();
    };
  }, []);

  return (
    <>
      {socketConnected && <Navbar user={user} socket={socket} />}
      <div
        className="dashboard-container"
        style={{
          display: "flex",
        }}
      >
        <VerticalNavbar />

        <div className="suggestions-container">
          <div
            className="swiper-container-main"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {filtered.length > 0 && !loading && !err ? (
              <div className="current-profile">
                {btnClicked && (
                  <IconButton
                    className="more-info-btn"
                    onClick={handleCloseProfileContent}
                  >
                    <CloseIcon fontSize="large" sx={{ color: "#eee" }} />
                  </IconButton>
                )}
                <div
                  className="sugg-card"
                  style={{
                    filter: btnClicked && "blur(15px)",
                  }}
                >
                  <div className="sugg-card-profile-photo">
                    <LazyLoadImage
                      effect="blur"
                      src={
                        currentPhoto === 0
                          ? serverPublic +
                            filtered[currentProfile]?.profilePhoto
                          : serverPublic +
                            filtered[currentProfile]?.photos[currentPhoto - 1]
                      }
                      alt="profile"
                      onClick={handleTap}
                    />
                  </div>
                  {!btnClicked && (
                    <IconButton
                      className="more-info-btn"
                      onClick={handleProfileContent}
                    >
                      <MoreVertIcon fontSize="large" sx={{ color: "#eee" }} />
                    </IconButton>
                  )}
                  <div className="dashboard-other-images-container">
                    <div
                      className={
                        currentPhoto === 0
                          ? "horizonal-photo-line--active"
                          : "horizonal-photo-line"
                      }
                      onClick={() => setCurrentPhoto(0)}
                    ></div>
                    {filtered[currentProfile]?.photos?.length > 0 &&
                      filtered[currentProfile].photos.map((photo, index) => {
                        return (
                          // <div className="dashboard-other-image">
                          //   <img src={serverPublic + photo} alt="others" />
                          // </div>
                          <div
                            className={
                              currentPhoto !== 0 && currentPhoto === index + 1
                                ? "horizonal-photo-line--active"
                                : "horizonal-photo-line"
                            }
                            key={index}
                            onClick={() => setCurrentPhoto(index + 1)}
                          ></div>
                        );
                      })}
                  </div>
                  <div className="profile--header">
                    <IconButton
                      style={{
                        background: "rgba(0, 0, 0, 0.4)",
                        borderRadius: "50%",
                        width: "4rem",
                        height: "4rem",
                        color: "red",
                        position: "absolute",
                        right: "1rem",
                        top: 0,
                      }}
                      onClick={() =>
                        navigate(
                          `/users/report/${filtered[currentProfile]._id}`
                        )
                      }
                    >
                      <FlagCircle fontSize="large" />
                    </IconButton>

                    <h6 className="profile--name">
                      {filtered[currentProfile]?.callTag}

                      {filtered[currentProfile]?.verStatus && (
                        <VerifiedIcon
                          style={{ fill: "cyan" }}
                          fontSize="small"
                        />
                      )}
                    </h6>

                    <p className="profile--age">
                      {Math.abs(
                        new Date(
                          Date.now() - Date.parse(filtered[currentProfile]?.dob)
                        ).getUTCFullYear() - 1970
                      )}
                    </p>

                    <div className="profile--country">
                      {<LocationOnIcon fontSize="small" sx={{ padding: 0 }} />}
                      {filtered[currentProfile]?.country}
                    </div>
                    <div className="suggestion-status-container">
                      {activeUsers.some(
                        (user) => user.userId === filtered[currentProfile]?._id
                      ) ? (
                        <div className="suggestion-online--dot"></div>
                      ) : (
                        <div className="suggestion-offline--dot"></div>
                      )}

                      <div className="suggestion-status">
                        {activeUsers.some(
                          (user) =>
                            user.userId === filtered[currentProfile]?._id
                        )
                          ? "Online"
                          : "Offline"}
                      </div>
                    </div>
                    <Button
                      type="contained"
                      onClick={() =>
                        handleConRequest(filtered[currentProfile]?._id)
                      }
                      className="connect-btn-sug"
                    >
                      Connect
                    </Button>
                  </div>
                </div>

                <Box className="profileContent" ref={profileContentRef}>
                  <Zoom>
                    <Divider
                      sx={{
                        "&::before, &::after": {
                          borderColor: "var(--color-primary-light)",
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Chip
                        style={{
                          background: "var(--color-primary-light)",
                          fontSize: "1.3rem",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                        label="Basic Info"
                      ></Chip>
                    </Divider>

                    <div className="basic-info">
                      {filtered[currentProfile]?.gender === "male" ? (
                        <div className="profile--basic-info">
                          {
                            <ManIcon
                              fontSize="small"
                              className="sug-profile-content-ico"
                            />
                          }
                          Man
                        </div>
                      ) : (
                        <div className="profile--basic-info">
                          {
                            <WomanIcon
                              fontSize="small"
                              className="sug-profile-content-ico"
                            />
                          }
                          Woman
                        </div>
                      )}

                      <div className="profile--basic-info">
                        {
                          <WorkIcon
                            fontSize="small"
                            className="sug-profile-content-ico"
                          />
                        }
                        {filtered[currentProfile]?.occupation}
                      </div>
                      <div className="profile--basic-info">
                        {
                          <HeightIcon
                            fontSize="small"
                            className="sug-profile-content-ico"
                          />
                        }
                        {filtered[currentProfile]?.height + " ft"}
                      </div>
                      <div className="profile--basic-info">
                        {
                          <SchoolIcon
                            fontSize="small"
                            className="sug-profile-content-ico"
                          />
                        }
                        {filtered[
                          currentProfile
                        ]?.educationLevel[0].toUpperCase() +
                          filtered[currentProfile]?.educationLevel.slice(1)}
                      </div>
                      <div className="profile--basic-info">
                        {
                          <ChurchIcon
                            fontSize="small"
                            className="sug-profile-content-ico"
                          />
                        }
                        {filtered[currentProfile]?.religion}
                      </div>
                      <div className="profile--basic-info">
                        {
                          <LanguageIcon
                            fontSize="small"
                            className="sug-profile-content-ico"
                          />
                        }
                        {filtered[currentProfile]?.ethnicity[0].toUpperCase() +
                          filtered[currentProfile]?.ethnicity.slice(1)}
                      </div>
                    </div>
                    <Divider
                      sx={{
                        "&::before, &::after": {
                          borderColor: "var(--color-primary-light)",
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Chip
                        style={{
                          background: "var(--color-primary-light)",
                          fontSize: "1.3rem",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                        label="Looking For"
                      ></Chip>
                    </Divider>

                    <div className="looking-for">
                      <div className="profile--lookingfor-goal">
                        <div className="emoji-container">👋</div>
                        <div>
                          <span className="looking-for-span">Looking for</span>
                          {" " +
                            filtered[currentProfile]?.lookingFor
                              ?.relationshipGoal}
                        </div>
                      </div>
                      <div>
                        {filtered[
                          currentProfile
                        ]?.lookingFor?.gender[0].toUpperCase() +
                          filtered[currentProfile]?.lookingFor?.gender?.slice(
                            1
                          )}
                      </div>
                      <div>
                        Age between{" "}
                        {filtered[currentProfile]?.lookingFor?.ageRange?.minAge}{" "}
                        and{" "}
                        {filtered[currentProfile]?.lookingFor?.ageRange?.maxAge}
                      </div>
                      <div>
                        Height between{" "}
                        {
                          filtered[currentProfile]?.lookingFor?.height
                            ?.minHeight
                        }{" "}
                        ft and{" "}
                        {
                          filtered[currentProfile]?.lookingFor?.height
                            ?.maxHeight
                        }{" "}
                        ft
                      </div>
                    </div>
                    <Divider
                      sx={{
                        "&::before, &::after": {
                          borderColor: "var(--color-primary-light)",
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Chip
                        style={{
                          background: "var(--color-primary-light)",
                          fontSize: "1.3rem",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                        label="Movies"
                      ></Chip>
                    </Divider>
                    <div className="usertags">
                      {filtered[currentProfile]?.interests?.movies?.map(
                        (movie) => (
                          <div>{movie}</div>
                        )
                      )}
                    </div>
                    <Divider
                      sx={{
                        "&::before, &::after": {
                          borderColor: "var(--color-primary-light)",
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Chip
                        style={{
                          background: "var(--color-primary-light)",
                          fontSize: "1.3rem",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                        label="Music"
                      ></Chip>
                    </Divider>
                    <div className="usertags">
                      {filtered[currentProfile]?.interests?.music?.map(
                        (music) => (
                          <div>{music}</div>
                        )
                      )}
                    </div>
                    <Divider
                      sx={{
                        "&::before, &::after": {
                          borderColor: "var(--color-primary-light)",
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Chip
                        style={{
                          background: "var(--color-primary-light)",
                          fontSize: "1.3rem",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                        label="Social Media"
                      ></Chip>
                    </Divider>
                    <div className="usertags">
                      {filtered[currentProfile]?.interests?.socialMedia?.map(
                        (social) => (
                          <div>{social}</div>
                        )
                      )}
                    </div>
                    <Divider
                      sx={{
                        "&::before, &::after": {
                          borderColor: "var(--color-primary-light)",
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Chip
                        label="Sports"
                        style={{
                          background: "var(--color-primary-light)",
                          fontSize: "1.3rem",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      ></Chip>
                    </Divider>
                    <div className="usertags">
                      {filtered[currentProfile]?.interests?.sports?.map((s) => (
                        <div>{s}</div>
                      ))}
                    </div>

                    <Divider
                      sx={{
                        "&::before, &::after": {
                          borderColor: "var(--color-primary-light)",
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Chip
                        label="About me"
                        style={{
                          background: "var(--color-primary-light)",
                          fontSize: "1.3rem",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      ></Chip>
                    </Divider>
                    <div className="profile--description">
                      {filtered[currentProfile]?.userDescription}
                    </div>
                    <Divider
                      sx={{
                        "&::before, &::after": {
                          borderColor: "var(--color-primary-light)",
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Chip
                        label="Check these out!"
                        style={{
                          background: "var(--color-primary-light)",
                          fontSize: "1.3rem",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      ></Chip>
                    </Divider>
                    <div className="dashboard-profile-vid-container">
                      {filtered[currentProfile]?.urls.length > 0 &&
                        filtered[currentProfile]?.urls.map((vidUrl) => {
                          return (
                            <div className="profile-fav-songs">
                              <iframe
                                width="100%"
                                height="233.2"
                                src={vidUrl}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen="allowfullscreen"
                              ></iframe>
                            </div>
                          );
                        })}
                    </div>
                  </Zoom>
                </Box>
              </div>
            ) : !err && loading ? (
              <div
                className="dashboard-loading-container"
                style={{ height: "100vh" }}
              >
                <div className="dashboard-loading-photo">
                  <LazyLoadImage
                    effect="blur"
                    src={serverPublic + user.profilePhoto}
                    alt="loading-user"
                  />
                </div>
              </div>
            ) : !err && !loading && matches.length === 0 ? (
              <h3 className="dashboard-err-msg">
                No suggestions at the moment
                <SentimentVeryDissatisfiedIcon fontSize="large" />
              </h3>
            ) : err && !loading ? (
              <h3 className="dashboard-err-msg">
                {err?.response?.data?.message}
                <SentimentVeryDissatisfiedIcon fontSize="large" />
              </h3>
            ) : (
              ""
            )}
            {filtered.length > 0 && !loading && !err && (
              <Swiper
                spaceBetween={2}
                navigation={{
                  clickable: true,
                }}
                slidesPerView={3}
                slideToClickedSlide={true}
                // effect={"coverflow"}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  372: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  422: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  555: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  705: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1190: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
                onSlideChange={(el) => {
                  setCurrentProfile(el.realIndex);
                  setCurrentPhoto(0);
                }}
                initialSlide={currentProfile}
                onSwiper={setSwiper}
                grabCursor={true}
                centeredSlides={true}
              >
                {filtered.length > 0 && !err && !loading
                  ? filtered.map((character, index) => {
                      return (
                        <SwiperSlide
                          key={character._id}
                          style={{ positon: "relative" }}
                        >
                          <LazyLoadImage
                            effect="blur"
                            src={serverPublic + character.profilePhoto}
                            alt={character._id}
                          />
                          <div className="sug-profile-header">
                            <div className="sug-profile-calltag">
                              {character.callTag}

                              {character.verStatus && (
                                <VerifiedIcon
                                  style={{
                                    fill: "cyan",
                                    width: "1.6rem",
                                    height: "1.6rem",
                                  }}
                                  fontSize="small"
                                />
                              )}
                            </div>
                            <div className="sug-profile-age">
                              <PersonOutlineIcon />
                              {Math.abs(
                                new Date(
                                  Date.now() - Date.parse(character.dob)
                                ).getUTCFullYear() - 1970
                              )}
                            </div>
                            <div className="sug-profile-country">
                              <LocationOnIcon />
                              {character.country}
                            </div>
                          </div>
                          <div className="suggestion-status-container">
                            {activeUsers.some(
                              (user) =>
                                user.userId === matches[currentProfile]._id
                            ) ? (
                              <div className="suggestion-online--dot"></div>
                            ) : (
                              <div className="suggestion-offline--dot"></div>
                            )}

                            <div className="suggestion-status">
                              {activeUsers.some(
                                (user) =>
                                  user.userId === matches[currentProfile]._id
                              )
                                ? "Online"
                                : "Offline"}
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })
                  : ""}
              </Swiper>
            )}
          </div>
        </div>
        <BottomNavbar />
      </div>
    </>
  );
}

export default Dashboard2;
