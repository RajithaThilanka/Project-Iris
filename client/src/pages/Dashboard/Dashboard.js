import { Button, Chip, Divider, IconButton } from "@mui/material";
import Zoom from "react-reveal/Zoom";
import { Box } from "@mui/system";
import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import "./Dashboard.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import UndoIcon from "@mui/icons-material/Undo";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Advanced() {
  const db = [
    {
      name: "Richard Hendricks",
      url: "./img/richard.jpg",
      country: "India",
      maritalStatus: "single",
      lookingFor: {
        gender: "male",
        ageRange: {
          minAge: 15,
          maxAge: 20,
        },
        height: {
          minHeight: 1.2,
          maxHeight: 3.4,
        },
      },
      profileDescription:
        "Hello guys, Im Dinitha from Sri Lanka. Im looking for a long term partner to share my life with.Feel free to hit me",
    },
    {
      name: "Erlich Bachman",
      url: "./img/erlich.jpg",
      country: "Pakistan",
      maritalStatus: "single",
      lookingFor: {
        gender: "male",
        ageRange: {
          minAge: 15,
          maxAge: 20,
        },
        height: {
          minHeight: 1.2,
          maxHeight: 3.4,
        },
      },
      profileDescription:
        "Hello guys, Im Dinitha from Sri Lanka. Im looking for a long term partner to share my life with.Feel free to hit me",
    },
    {
      name: "Monica Hall",
      url: "./img/monica.jpg",
      country: "France",
      maritalStatus: "single",
      lookingFor: {
        gender: "male",
        ageRange: {
          minAge: 15,
          maxAge: 20,
        },
        height: {
          minHeight: 1.2,
          maxHeight: 3.4,
        },
      },
      profileDescription:
        "Hello guys, Im Dinitha from Sri Lanka. Im looking for a long term partner to share my life with.Feel free to hit me",
    },
    {
      name: "Jared Dunn",
      url: "./img/jared.jpg",
      country: "UK",
      maritalStatus: "single",
      lookingFor: {
        gender: "male",
        ageRange: {
          minAge: 15,
          maxAge: 20,
        },
        height: {
          minHeight: 1.2,
          maxHeight: 3.4,
        },
      },
      profileDescription:
        "Hello guys, Im Dinitha from Sri Lanka. Im looking for a long term partner to share my life with.Feel free to hit me",
    },
    {
      name: "Dinesh Chugtai",
      url: "./img/dinesh.jpg",
      country: "USA",
      maritalStatus: "single",
      lookingFor: {
        gender: "male",
        ageRange: {
          minAge: 15,
          maxAge: 20,
        },
        height: {
          minHeight: 1.2,
          maxHeight: 3.4,
        },
      },
      profileDescription:
        "Hello guys, Im Dinitha from Sri Lanka. Im looking for a long term partner to share my life with.Feel free to hit me",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    console.log(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
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

  return (
    <Box className="container">
      <Box className="card-container">
        {db.map((character, index) => (
          <TinderCard
            swipeThreshold={2000}
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <Box
              style={{
                backgroundImage: "url(" + character.url + ")",
              }}
              className="card"
            ></Box>
            <div className="profile--header">
              <h6 className="profile--name">Dinitha W.</h6>
              <p className="profile--age">15</p>
              <div className="profile--country">
                {<LocationOnIcon fontSize="small" sx={{ padding: 0 }} />}
                {db[currentIndex].country}
              </div>
              <div className="suggestion-status-container">
                <div className="suggestion-online--dot"></div>
                <div className="suggestion-status">Online</div>
              </div>
            </div>
          </TinderCard>
        ))}
        <Box className="profileContent">
          <Zoom>
            <Divider>
              <Chip label="Basic Info"></Chip>
            </Divider>
            {db[currentIndex].gender === "male" ? (
              <div className="profile--gender">
                {<ManIcon fontSize="medium" />}Man
              </div>
            ) : (
              <div className="profile--gender">
                {<WomanIcon fontSize="medium" />}Woman
              </div>
            )}

            <div className="profile--relationship-status">
              {<PeopleAltIcon />}Single
            </div>
            <Divider>
              <Chip label="Looking For"></Chip>
            </Divider>
            <div className="looking-for">
              <div>female</div>
              <div>Age between 18-24</div>
              <div>Height between 2.2ft and 4.2ft</div>
            </div>

            <Divider>
              <Chip label="About me"></Chip>
            </Divider>
            <div className="profile--description">
              Hello guys, Im Dinitha from Sri Lanka. Im looking for a long term
              partner to share my life with.Feel free to hit me
            </div>
            <div className="profile--tags">
              Hello guys, Im Dinitha from Sri Lanka. Im looking for a long term
              partner to share my life with.Feel free to hit me
            </div>
            <div className="profile--tags"></div>
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
