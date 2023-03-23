import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import FormGroup from "@mui/material/FormGroup";

import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Accordion from "@mui/material/Accordion";
import LockIcon from "@mui/icons-material/Lock";
import AccordionDetails from "@mui/material/AccordionDetails";
import InputAdornment from "@mui/material/InputAdornment";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
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
import { UpdateMe } from "../../../api/UserRequests";

export default function Factfile() {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup3, setShowPopup3] = useState(false);
  const [showPopup4, setShowPopup4] = useState(false);
  const [showPopup5, setShowPopup5] = useState(false);
  const [showPopup6, setShowPopup6] = useState(false);
  const [showPopup7, setShowPopup7] = useState(false);
  const [showPopup8, setShowPopup8] = useState(false);
  const [showPopup9, setShowPopup9] = useState(false);
  const [showPopup10, setShowPopup10] = useState(false);

  const nametogglePopup = () => {
    setShowPopup1(!showPopup1);
  };

  const callnametogglePopup = () => {
    setShowPopup2(!showPopup2);
  };

  const dobtogglePopup = () => {
    setShowPopup3(!showPopup3);
  };
  const occtogglePopup = () => {
    setShowPopup4(!showPopup4);
  };
  const bodytogglePopup = () => {
    setShowPopup5(!showPopup5);
  };
  const educationtogglePopup = () => {
    setShowPopup6(!showPopup6);
  };
  const languagedobtogglePopup = () => {
    setShowPopup7(!showPopup7);
  };
  const maritaltogglePopup = () => {
    setShowPopup8(!showPopup8);
  };
  const haschildentogglePopup = () => {
    setShowPopup9(!showPopup9);
  };
  const religiontogglePopup = () => {
    setShowPopup10(!showPopup10);
  };

  // const setName = () => {
  //   UpdateMe({ firstname: "Rajitha" })
  //     .then((response) => {
  //       console.log("Name updated successfully", response);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to update user", error);
  //     });
  // };

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
      {/* Call  Name popup */}
      {showPopup1 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5"> Enter First Name : </Typography>
                  <IconButton variant="outline" onClick={nametogglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <TextField
                  id="current-password-input"
                  type="text"
                  autoComplete="current-password"
                  //value={currentpassword}
                  // onChange={handleCurrentPasswordChange}
                  //error={currentpasswordError}
                  // helperText={
                  //   currentpasswordError ? "Please enter current password" : ""
                  // }
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={""}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      {/* Call  Name popup */}
      {showPopup2 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5"> Enter Call Name : </Typography>
                  <IconButton variant="outline" onClick={callnametogglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <TextField
                  id="current-password-input"
                  type="text"
                  autoComplete="current-password"
                  //value={currentpassword}
                  // onChange={handleCurrentPasswordChange}
                  //error={currentpasswordError}
                  // helperText={
                  //   currentpasswordError ? "Please enter current password" : ""
                  // }
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={callnametogglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    //onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      {/* DOB popup */}
      {showPopup3 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5"> Enter DOB :</Typography>
                  <IconButton variant="outline" onClick={dobtogglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar />
                </LocalizationProvider>
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={dobtogglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    //onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      {/* Occupation */}
      {showPopup4 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5"> Enter Occupation : </Typography>
                  <IconButton variant="outline" onClick={occtogglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <TextField
                  id="current-password-input"
                  type="text"
                  autoComplete="current-password"
                  //value={currentpassword}
                  // onChange={handleCurrentPasswordChange}
                  //error={currentpasswordError}
                  // helperText={
                  //   currentpasswordError ? "Please enter current password" : ""
                  // }
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={occtogglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    //onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      {/* Body Type */}
      {showPopup5 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5"> Enter New Height : </Typography>
                  <IconButton variant="outline" onClick={bodytogglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <TextField
                  id="current-password-input"
                  type="text"
                  autoComplete="current-password"
                  //value={currentpassword}
                  // onChange={handleCurrentPasswordChange}
                  //error={currentpasswordError}
                  // helperText={
                  //   currentpasswordError ? "Please enter current password" : ""
                  // }
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={bodytogglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    //onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      {/* Education  */}
      {showPopup6 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5">
                    Enter Highest Education Level :
                  </Typography>
                  <IconButton variant="outline" onClick={educationtogglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="University/college degree(s)"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="University/college degree(s)"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="High school"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Technical/vocational school"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Did not complete high school"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="No formal qualifications"
                  />
                </RadioGroup>
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={educationtogglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    //onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      {/* Languages */}
      {showPopup7 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5"> Enter New Languages : </Typography>
                  <IconButton
                    variant="outline"
                    onClick={languagedobtogglePopup}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Singhala" />
                  <FormControlLabel control={<Checkbox />} label="Tamil" />
                  <FormControlLabel control={<Checkbox />} label="English" />
                  <FormControlLabel control={<Checkbox />} label="Japan" />
                  <FormControlLabel control={<Checkbox />} label="Hindi" />
                </FormGroup>
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={languagedobtogglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    //onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      {/* Marital Status  */}
      {showPopup8 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5">Enter Marital Status :</Typography>
                  <IconButton variant="outline" onClick={maritaltogglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Single"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Single"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Separatedd"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Divorced"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Widowed"
                  />
                </RadioGroup>
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={maritaltogglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    //onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      {/* childern  */}
      {showPopup9 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5">Childern :</Typography>
                  <IconButton variant="outline" onClick={haschildentogglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Single"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Single"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Separatedd"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Divorced"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Widowed"
                  />
                </RadioGroup>
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={haschildentogglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    //onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      {/* Religion  */}
      {showPopup10 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5">Religion :</Typography>
                  <IconButton variant="outline" onClick={religiontogglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Buddhist"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Buddhist"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Muslim"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Hindu"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Other religion"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="Other religion"
                  />
                </RadioGroup>
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={religiontogglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    //onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </div>
          </div>
        </Box>
      )}

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
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={nametogglePopup}
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
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={callnametogglePopup}
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
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={dobtogglePopup}
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
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={occtogglePopup}
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
              Height : {user?.height}
            </Typography>

            <Button
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={bodytogglePopup}
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
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={educationtogglePopup}
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
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={languagedobtogglePopup}
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
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={maritaltogglePopup}
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
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={haschildentogglePopup}
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
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={religiontogglePopup}
            ></Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
