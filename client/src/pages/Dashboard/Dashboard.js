import { Button, Chip, Divider, IconButton } from "@mui/material";
import Zoom from "react-reveal/Zoom";
import { Box } from "@mui/system";
import React, { useState, useMemo, useRef, useEffect, createRef } from "react";
import TinderCard from "react-tinder-card";
import "./Dashboard.css";
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
import MatchesContext from "../../context/matches";
import { useContext } from "react";
function Advanced() {
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { sentConRequests, setsentConRequests, addRequest } =
    useContext(MatchesContext);
  const [matches, setMatches] = useState([]);
  // let { matches, loading } = useSelector((state) => state.matchReducer);
  const [currentIndex, setCurrentIndex] = useState(matches?.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    const generateSuggestions = async () => {
      const {
        data: {
          data: { data },
        },
      } = await getMatches();

      setCurrentIndex(data?.length - 1);
      setMatches(data);
    };
    generateSuggestions();
  }, []);

  const handleConRequest = async (direction, id) => {
    try {
      let response = null;
      if (direction === "right") {
        response = await sendConRequest(id);
        return response;
      } else if (direction === "left") {
        console.log("disliked");
      }
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const childRefs = useMemo(
    () =>
      Array(matches.length)
        .fill(0)
        .map((i) => React.createRef()),
    [matches]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < matches?.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = async (direction, id, index) => {
    setLastDirection(direction);
    const response = await handleConRequest(direction, id);
    if (response) {
      const {
        data: {
          data: { data },
        },
      } = response;
      addRequest(data);
    }
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);

    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < matches.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };
  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Box className="container">
      <Box className="card-container">
        {matches?.length === 0 ? (
          <div className="loading-icon">
            <Loader />
          </div>
        ) : (
          matches.map((character, index) => (
            <TinderCard
              swipeThreshold={2000}
              ref={childRefs[index]}
              className="swipe"
              key={character._id}
              onSwipe={(dir) => swiped(dir, character._id, index)}
              onCardLeftScreen={() => outOfFrame(character._id, index)}
            >
              <Box
                style={{
                  backgroundImage: `url(${serverPublic}${character.profilePhoto})`,
                }}
                className="card"
              ></Box>
              <div className="profile--header">
                <h6 className="profile--name">{character.callTag}</h6>
                <p className="profile--age">{character.age}</p>
                <div className="profile--country">
                  {<LocationOnIcon fontSize="small" sx={{ padding: 0 }} />}
                  {character.country}
                </div>
                <div className="suggestion-status-container">
                  <div className="suggestion-online--dot"></div>
                  <div className="suggestion-status">Online</div>
                </div>
              </div>
            </TinderCard>
          ))
        )}
        <Box className="profileContent">
          <Zoom>
            <Divider>
              <Chip label="Basic Info"></Chip>
            </Divider>
            <div className="basic-info">
              {matches[currentIndex] === "male" ? (
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
                {matches[currentIndex]?.occupation}
              </div>
              <div className="profile--basic-info">
                {<HeightIcon />}
                {matches[currentIndex]?.height}
              </div>
              <div className="profile--basic-info">
                {<SchoolIcon />}
                {matches[currentIndex]?.educationLevel}
              </div>
              <div className="profile--basic-info">
                {<ChurchIcon />}
                {matches[currentIndex]?.religion}
              </div>
              <div className="profile--basic-info">
                {<LanguageIcon />}
                {matches[currentIndex]?.ethnicity}
              </div>
            </div>
            <Divider>
              <Chip label="Looking For"></Chip>
            </Divider>
            <div className="looking-for">
              <div>{matches[currentIndex]?.lookingFor?.gender}</div>
              <div>
                Age between{" "}
                {matches[currentIndex]?.lookingFor?.ageRange?.minAge} and{" "}
                {matches[currentIndex]?.lookingFor?.ageRange?.maxAge}
              </div>
              <div>
                Height between{" "}
                {matches[currentIndex]?.lookingFor?.height?.minHeight} ft and{" "}
                {matches[currentIndex]?.lookingFor?.height?.maxHeight} ft
              </div>
            </div>
            <Divider>
              <Chip label="Movies"></Chip>
            </Divider>
            <div className="usertags">
              {matches[currentIndex]?.interests?.movies?.map((movie) => (
                <div>{movie}</div>
              ))}
            </div>
            <Divider>
              <Chip label="Music"></Chip>
            </Divider>
            <div className="usertags">
              {matches[currentIndex]?.interests?.music?.map((music) => (
                <div>{music}</div>
              ))}
            </div>
            <Divider>
              <Chip label="Social Media"></Chip>
            </Divider>
            <div className="usertags">
              {matches[currentIndex]?.interests?.socialMedia?.map((social) => (
                <div>{social}</div>
              ))}
            </div>
            <Divider>
              <Chip label="Sports"></Chip>
            </Divider>
            <div className="usertags">
              {matches[currentIndex]?.interests?.sports?.map((s) => (
                <div>{s}</div>
              ))}
            </div>

            <Divider>
              <Chip label="About me"></Chip>
            </Divider>
            <div className="profile--description">
              {matches[currentIndex]?.userDescription}
            </div>
          </Zoom>

          {/* <div className="slide-down-btn-container">
            <IconButton className="slide-down-btn">
              <ArrowDownwardIcon fontSize="large" />
            </IconButton>
          </div> */}
        </Box>
      </Box>
      <Box className="swipe-buttons">
        <IconButton
          className="swipe-button__left"
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          <MoodBadIcon fontSize="large" />
        </IconButton>

        <IconButton
          className="swipe-button__right"
          disabled={!canSwipe}
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          <SentimentVerySatisfiedIcon fontSize="large" />
        </IconButton>
        <IconButton
          disabled={!canGoBack}
          className="swipe-button__undo"
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
        >
          <UndoIcon fontSize="large" />
        </IconButton>
      </Box>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </Box>
  );
}

export default Advanced;
