import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Appbar/Navbar";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import { Button, Chip, Divider, IconButton, Tooltip } from "@mui/material";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import Zoom from "react-reveal/Zoom";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Box } from "@mui/system";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import UndoIcon from "@mui/icons-material/Undo";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loading/Loading";
import { getMatches, sendConRequest } from "../../api/UserRequests";
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

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "./Dashboard2.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import SwiperCore, { EffectCoverflow, Navigation } from "swiper/core";
import { FreeMode, Thumbs } from "swiper";
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const ENDPOINT = "http://localhost:5000";
let socket;
function Dashboard2() {
  const { activeTab, setActiveTab } = useContext(MatchesContext);
  setActiveTab(0);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const images = [
    "user1.jpeg",
    "user2.jpeg",
    "user3.jpeg",
    "user4.jpeg",
    "user5.jpeg",
    "user6.jpeg",
  ];
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const [swiper, setSwiper] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(0);

  const {
    setSocketConnected,
    activeUsers,
    setActiveUsers,
    receivedConRequests,
    setreceivedConRequests,
    setMe,
  } = useContext(MatchesContext);
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
  });
  const { sentConRequests, setsentConRequests } = useContext(MatchesContext);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const generateSuggestions = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getMatches();
      setMatches(data);
    };
    generateSuggestions();
  }, []);
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

      console.log(currentProfile);
      console.log(swiper.realIndex);
      swiper?.slideTo(currentProfile);

      setsentConRequests([data, ...sentConRequests]);
      socket.emit("new-con-request-sent", data);

      toast.success("Connection request sent", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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

  return (
    <>
      <Navbar user={user} />
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
            {matches.length > 0 ? (
              <div className="current-profile" style={{ display: "flex" }}>
                <div
                  className="sugg-card"
                  style={{
                    backgroundImage: `url(${
                      serverPublic + matches[currentProfile].profilePhoto
                    })`,
                  }}
                >
                  <div className="profile--header">
                    <h6 className="profile--name">
                      {matches[currentProfile].callTag}

                      {matches[currentProfile].verStatus && (
                        <VerifiedIcon
                          style={{ fill: "cyan" }}
                          fontSize="small"
                        />
                      )}
                    </h6>
                    <p className="profile--age">
                      {Math.abs(
                        new Date(
                          Date.now() - Date.parse(matches[currentProfile].dob)
                        ).getUTCFullYear() - 1970
                      )}
                    </p>
                    <div className="profile--country">
                      {<LocationOnIcon fontSize="small" sx={{ padding: 0 }} />}
                      {matches[currentProfile].country}
                    </div>
                    <div className="suggestion-status-container">
                      {activeUsers.some(
                        (user) => user.userId === matches[currentProfile]._id
                      ) ? (
                        <div className="suggestion-online--dot"></div>
                      ) : (
                        <div className="suggestion-offline--dot"></div>
                      )}

                      <div className="suggestion-status">
                        {activeUsers.some(
                          (user) => user.userId === matches[currentProfile]._id
                        )
                          ? "Online"
                          : "Offline"}
                      </div>
                    </div>
                    <Button
                      type="contained"
                      style={{
                        color: "#fff",
                        background: "var(--color-primary)",
                        width: "40%",
                        margin: "auto",
                      }}
                      onClick={() =>
                        handleConRequest(matches[currentProfile]._id)
                      }
                    >
                      Connect
                    </Button>
                  </div>
                </div>
                <Box className="profileContent">
                  <Zoom>
                    <Divider>
                      <Chip
                        style={{
                          background: "var(--color-secondary)",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                        label="Basic Info"
                      ></Chip>
                    </Divider>

                    <div className="basic-info">
                      {matches[currentProfile]?.gender === "male" ? (
                        <div className="profile--basic-info">
                          {<ManIcon fontSize="medium" />}Man
                        </div>
                      ) : (
                        <div className="profile--basic-info">
                          {<WomanIcon fontSize="medium" />}Woman
                        </div>
                      )}

                      <div className="profile--basic-info">
                        {<WorkIcon />}
                        {matches[currentProfile]?.occupation}
                      </div>
                      <div className="profile--basic-info">
                        {<HeightIcon />}
                        {matches[currentProfile]?.height}
                      </div>
                      <div className="profile--basic-info">
                        {<SchoolIcon />}
                        {matches[currentProfile]?.educationLevel}
                      </div>
                      <div className="profile--basic-info">
                        {<ChurchIcon />}
                        {matches[currentProfile]?.religion}
                      </div>
                      <div className="profile--basic-info">
                        {<LanguageIcon />}
                        {matches[currentProfile]?.ethnicity}
                      </div>
                    </div>
                    <Divider>
                      <Chip
                        style={{
                          background: "var(--color-secondary)",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                        label="Looking For"
                      ></Chip>
                    </Divider>

                    <div className="looking-for">
                      <div>{matches[currentProfile]?.lookingFor?.gender}</div>
                      <div>
                        Age between{" "}
                        {matches[currentProfile]?.lookingFor?.ageRange?.minAge}{" "}
                        and{" "}
                        {matches[currentProfile]?.lookingFor?.ageRange?.maxAge}
                      </div>
                      <div>
                        Height between{" "}
                        {matches[currentProfile]?.lookingFor?.height?.minHeight}{" "}
                        ft and{" "}
                        {matches[currentProfile]?.lookingFor?.height?.maxHeight}{" "}
                        ft
                      </div>
                    </div>
                    <Divider>
                      <Chip
                        style={{
                          background: "var(--color-secondary)",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                        label="Movies"
                      ></Chip>
                    </Divider>
                    <div className="usertags">
                      {matches[currentProfile]?.interests?.movies?.map(
                        (movie) => (
                          <div>{movie}</div>
                        )
                      )}
                    </div>
                    <Divider>
                      <Chip
                        style={{
                          background: "var(--color-secondary)",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                        label="Music"
                      ></Chip>
                    </Divider>
                    <div className="usertags">
                      {matches[currentProfile]?.interests?.music?.map(
                        (music) => (
                          <div>{music}</div>
                        )
                      )}
                    </div>
                    <Divider>
                      <Chip
                        style={{
                          background: "var(--color-secondary)",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                        label="Social Media"
                      ></Chip>
                    </Divider>
                    <div className="usertags">
                      {matches[currentProfile]?.interests?.socialMedia?.map(
                        (social) => (
                          <div>{social}</div>
                        )
                      )}
                    </div>
                    <Divider>
                      <Chip
                        label="Sports"
                        style={{
                          background: "var(--color-secondary)",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                      ></Chip>
                    </Divider>
                    <div className="usertags">
                      {matches[currentProfile]?.interests?.sports?.map((s) => (
                        <div>{s}</div>
                      ))}
                    </div>

                    <Divider>
                      <Chip
                        label="About me"
                        style={{
                          background: "var(--color-secondary)",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                      ></Chip>
                    </Divider>
                    <div className="profile--description">
                      {matches[currentProfile]?.userDescription}
                    </div>
                  </Zoom>
                </Box>
              </div>
            ) : (
              <div className="dashboard-loading-container">
                <div className="dashboard-loading-photo">
                  <img
                    src={serverPublic + user.profilePhoto}
                    alt="loading-user"
                  />
                </div>
              </div>
            )}
            <Swiper
              slidesPerView={1}
              spaceBetween={4}
              navigation={true}
              centeredSlides={false}
              slideToClickedSlide={true}
              // effect={"coverflow"}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
              onSlideChange={(el) => setCurrentProfile(el.realIndex)}
              initialSlide={currentProfile}
              onSwiper={setSwiper}
            >
              {matches.length > 0
                ? matches.map((character) => {
                    return (
                      <SwiperSlide
                        key={character._id}
                        style={{ positon: "relative" }}
                      >
                        <img
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
                            15
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard2;
