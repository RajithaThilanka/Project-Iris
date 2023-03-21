import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BoyIcon from "@mui/icons-material/Boy";
import PublicIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import PetsIcon from "@mui/icons-material/Pets";
import ChurchIcon from "@mui/icons-material/Church";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import BookIcon from "@mui/icons-material/Book";
import { Paper, Stack, Box, IconButton, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import LanguageIcon from "@mui/icons-material/Language";
import WcIcon from "@mui/icons-material/Wc";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import { getMe } from "../../../api/UserRequests";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProfileUpdatePop from "../ProfileUpdatePopUp/ProfileUpdatePop";

export default function Factfile() {
  const [showProfileUpdatePop, setShowProfileUpdatePop] = useState(false);
  const toggleProfileUpdatePop = () => {
    setShowProfileUpdatePop(!showProfileUpdatePop);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getMe();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          padding: 2,
          borderRadius: 0.5,
          boxShadow: 0.5,
          backgroundColor: "#e1f5fe",
          "&:hover": {
            backgroundColor: "#e1f5fe",
            //  opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Typography
          variant="h7"
          sx={{ fontFamily: "Monospace", fontSize: "h6.fontSize", m: 1 }}
        >
          FACTFILES <br /> <br />
        </Typography>

        <Stack direction="column" spacing={2}>
          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <PersonIcon /> Name :{user?.firstname}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              onClick={toggleProfileUpdatePop}
            ></Button>
          </Stack>
          <hr />

          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <PersonIcon /> Call Name : {user?.callTag}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                // activeState2(0);
              }}
            ></Button>
          </Stack>
          <hr />
          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <CakeIcon /> DOB : {user?.dob}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                // activeState2(0);
              }}
            ></Button>
          </Stack>
          <hr />
          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <WorkIcon /> Occupation : {user?.occupation}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                // activeState2(0);
              }}
            ></Button>
          </Stack>
          <hr />
          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <BoyIcon />
              Body Type : {user?.height}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                // activeState2(0);
              }}
            ></Button>
          </Stack>
          <hr />
          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <SchoolIcon /> Education Level : {user?.educationLevel}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                // activeState2(0);
              }}
            ></Button>
          </Stack>
          <hr />
          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <LanguageIcon /> Language : {user?.languages}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                // activeState2(0);
              }}
            ></Button>
          </Stack>
          <hr />
          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <WcIcon /> Merital Status : {user?.maritalStatus}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                // activeState2(0);
              }}
            ></Button>
          </Stack>
          <hr />
          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <ChildCareIcon /> Has Children : {user?.hasChildren}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                // activeState2(0);
              }}
            ></Button>
          </Stack>
          <hr />
          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <TempleBuddhistIcon /> Religion : {user?.religion}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                // activeState2(0);
              }}
            ></Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
