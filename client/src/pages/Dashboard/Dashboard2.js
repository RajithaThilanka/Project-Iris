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
  const { filter } = useContext(MatchesContext);
  const { sentConRequests, setsentConRequests } = useContext(MatchesContext);
  const [matches, setMatches] = useState([]);
  const [filtered, setFiltered] = useState([]);

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
      return (
        age >= filter.age[0] &&
        age <= filter.age[1] &&
        genderMatch &&
        countryMatch &&
        langMatch
      );
    });
    return filteredSugs;
  };
  const {
    setSocketConnected,
    activeUsers,
    setActiveUsers,
    receivedConRequests,
    setreceivedConRequests,
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
            {filtered.length > 0 ? (
              <div className="current-profile" style={{ display: "flex" }}>
                <div
                  className="sugg-card"
                  style={{
                    backgroundImage: `url(${
                      serverPublic + filtered[currentProfile]?.profilePhoto
                    })`,
                  }}
                >
                  <div className="profile--header">
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
                      style={{
                        color: "#fff",
                        background: "var(--color-primary)",
                        width: "40%",
                        margin: "auto",
                      }}
                      onClick={() =>
                        handleConRequest(filtered[currentProfile]?._id)
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
                      {filtered[currentProfile]?.gender === "male" ? (
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
                        {filtered[currentProfile]?.occupation}
                      </div>
                      <div className="profile--basic-info">
                        {<HeightIcon />}
                        {filtered[currentProfile]?.height}
                      </div>
                      <div className="profile--basic-info">
                        {<SchoolIcon />}
                        {filtered[currentProfile]?.educationLevel}
                      </div>
                      <div className="profile--basic-info">
                        {<ChurchIcon />}
                        {filtered[currentProfile]?.religion}
                      </div>
                      <div className="profile--basic-info">
                        {<LanguageIcon />}
                        {filtered[currentProfile]?.ethnicity}
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
                      <div>{filtered[currentProfile]?.lookingFor?.gender}</div>
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
                      {filtered[currentProfile]?.interests?.movies?.map(
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
                      {filtered[currentProfile]?.interests?.music?.map(
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
                      {filtered[currentProfile]?.interests?.socialMedia?.map(
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
                      {filtered[currentProfile]?.interests?.sports?.map((s) => (
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
                      {filtered[currentProfile]?.userDescription}
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
              spaceBetween={2}
              navigation={{
                clickable: true,
              }}
              slidesPerView={1}
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
              grabCursor={true}
              centeredSlides={true}
            >
              {filtered.length > 0
                ? filtered.map((character, index) => {
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard2;
