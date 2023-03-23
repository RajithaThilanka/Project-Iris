import React from "react";
import "./popUpStyle.css"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import FormGroup from "@mui/material/FormGroup";
import { InputLabel, Input } from "@mui/material";
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
import { updateMe } from "../../api/UserRequests";


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
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdateClick = () => {
    // Perform update logic here, and if successful:
    setSuccessMessage("Update successful!");
  };
  const handleUpdateerrClick = () => {
    // Perform update logic here, and if successful:
    setSuccessMessage("Update unsuccessful!");
  };

  const [user, setUser] = useState(null);
  const [dbvar, setDBVar] = useState("");
  const [formdata, setfData] = useState("");
  const [checkedValues, setCheckedValues] = useState({});


  const handleChange1 = (event) => {
    setfData(event.target.value);
    setDBVar("firstname");
  };
  const handleChange2 = (event) => {
    setfData(event.target.value);
    setDBVar("callTag");
  };
  const handleChange3 = (date) => {
    setfData(date);
    setDBVar("dob");
  };
  const handleChange4 = (event) => {
    setfData(event.target.value);
    setDBVar("occupation");
  };
  const handleChange5 = (event) => {
    setfData(event.target.value);
    setDBVar("height");
  };
  const handleChange6 = (event) => {
    setfData(event.target.value);
    setDBVar("educationLevel");
  };


  const handleChange7 = (event) => {
    setCheckedValues({
      ...checkedValues,
      [event.target.name]: event.target.checked,
    });
    setDBVar("languages");

  };
  const handleChange8 = (event) => {
    setfData(event.target.value);
    setDBVar("monthlyIncome");
  };
  const handleChange9 = (event) => {
    setfData(event.target.value);
    setDBVar("hasChildren");
  };
  const handleChange10 = (event) => {
    setfData(event.target.value);
    setDBVar("religion");
  };



  const nametogglePopup = () => {
    setShowPopup1(!showPopup1);
    setSuccessMessage("");
    setfData("");
    setDBVar("");
  };

  const callnametogglePopup = () => {
    setShowPopup2(!showPopup2);
    setSuccessMessage("");
    setfData("");
    setDBVar("");

  };

  const dobtogglePopup = () => {
    setShowPopup3(!showPopup3);
    setSuccessMessage(" ");
    setfData(" ");
    setDBVar("");
  };
  const occtogglePopup = () => {
    setShowPopup4(!showPopup4);
    setSuccessMessage("");
    setfData("");
    setDBVar("");
  };
  const bodytogglePopup = () => {
    setShowPopup5(!showPopup5);
    setSuccessMessage("");
    setfData("");
    setDBVar("");
  };
  const educationtogglePopup = () => {
    setShowPopup6(!showPopup6);
    setSuccessMessage(" ");
    setfData(" ");
    setDBVar("");
  };
  const languagedobtogglePopup = () => {
    setShowPopup7(!showPopup7);
    setSuccessMessage(" ");
    setfData(" ");
    setDBVar("");
  };
  const maritaltogglePopup = () => {
    setShowPopup8(!showPopup8);
    setSuccessMessage(" ");
    setfData(" ");
    setDBVar("");
  };
  const haschildentogglePopup = () => {
    setShowPopup9(!showPopup9);
    setSuccessMessage("");
    setfData("");
    setDBVar("");
  };
  const religiontogglePopup = () => {
    setShowPopup10(!showPopup10);
    setSuccessMessage(" ");
    setfData(" ");
    setDBVar("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      [dbvar]: formdata,
    };

    updateMe(data)
      .then((response) => {
        handleUpdateClick();
      })
      .catch((error) => {
        handleUpdateerrClick();
      });
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    const arrdata = {
      [dbvar]: checkedValues,
    };

    updateMe(arrdata)
      .then((response) => {
        handleUpdateClick();
      })
      .catch((error) => {
        handleUpdateerrClick();
      });
  };

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
      {/* Name popup */}
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
                  label="Enter your first name"
                  value={formdata}
                  onChange={handleChange1}
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={nametogglePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
                <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
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
                  value={formdata}
                  onChange={handleChange2}
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
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
                <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
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
                  <DateCalendar onChange={handleChange3} />
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
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
                <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
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

                  type="text"
                  label="Enter your occupation"
                  value={formdata}
                  onChange={handleChange4}
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
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
                <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
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
                  label="Enter Your Height (Feet.inches)"
                  value={formdata}
                  onChange={handleChange5}
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
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
                <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
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
                  value={formdata}
                  onChange={handleChange6}
                >
                  <FormControlLabel
                    value="University/college degree(s)"
                    control={<Radio />}
                    label="University/college degree(s)"
                  />
                  <FormControlLabel
                    value="High school"
                    control={<Radio />}
                    label="High school"
                  />
                  <FormControlLabel
                    value="Technical/vocational school"
                    control={<Radio />}
                    label="Technical/vocational school"
                  />
                  <FormControlLabel
                    value="Did not complete high school"
                    control={<Radio />}
                    label="Did not complete high school"
                  />
                  <FormControlLabel
                    value="No formal qualifications"
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
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
                <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
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
                  <FormControlLabel control={<Checkbox />} label="Singhala" name="sinhala"
                    checked={checkedValues.sinhala || false}
                    onChange={handleChange7} />
                  <FormControlLabel control={<Checkbox />} label="Tamil" name="tamil"
                    checked={checkedValues.tamil || false}
                    onChange={handleChange7} />
                  <FormControlLabel control={<Checkbox />} label="English" name="english"
                    checked={checkedValues.english || false}
                    onChange={handleChange7} />
                  <FormControlLabel control={<Checkbox />} label="Japan" name="japan"
                    checked={checkedValues.japan || false}
                    onChange={handleChange7} />
                  <FormControlLabel control={<Checkbox />} label="Hindi" name="hindi"
                    checked={checkedValues.hindi || false}
                    onChange={handleChange7} />
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
                    onClick={handleSubmit2}
                  >
                    Save
                  </Button>
                </Stack>
                <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
              </Stack>
            </div>
          </div>
        </Box>
      )}

      {/* Monthly Income */}
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
                  name="radio-buttons-group"
                  value={formdata}
                  onChange={handleChange8}
                >
                  <FormControlLabel
                    value="below Rs.25,000"
                    control={<Radio />}
                    label="below Rs.25,000"
                  />
                  <FormControlLabel
                    value="between Rs.25,000 & Rs.50,000"
                    control={<Radio />}
                    label="between Rs.25,000 & Rs.50,000"
                  />
                  <FormControlLabel
                    value="between Rs.50,000 & Rs.75,000"
                    control={<Radio />}
                    label="between Rs.50,000 & Rs.75,000"
                  />
                  <FormControlLabel
                    value="between Rs.75,000 & Rs.100,000"
                    control={<Radio />}
                    label="between Rs.75,000 & Rs.100,000"
                  />
                  <FormControlLabel
                    value="above Rs.100,000"
                    control={<Radio />}
                    label="above Rs.100,000"
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
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
                <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
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
                  value={formdata} name="radio-buttons-group"
                  onChange={handleChange9}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes" />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No" />
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
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
                <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
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
                  value={formdata}
                  onChange={handleChange10}
                >
                  <FormControlLabel
                    value="Buddhist"
                    control={<Radio />}
                    label="Buddhist"
                  />
                  <FormControlLabel
                    value="Muslim"
                    control={<Radio />}
                    label="Muslim"
                  />
                  <FormControlLabel
                    value="Hindu"
                    control={<Radio />}
                    label="Hindu"
                  />
                  <FormControlLabel
                    value="Other religion"
                    control={<Radio />}
                    label="Other religion"
                  />
                  <FormControlLabel
                    value="Prefer not to specify"
                    control={<Radio />}
                    label="Prefer not to specify"
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
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Stack>
                <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
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
              <AttachMoneyIcon /> Monthly Income : {user?.monthlyIncome}
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
              <ChildCareIcon /> Has Children : {user?.hasChildren ? "Yes" : "No"}
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
          <InputLabel htmlFor="textbox">{successMessage}</InputLabel>
        </Stack>
      </Box>
    </div>
  );
}
