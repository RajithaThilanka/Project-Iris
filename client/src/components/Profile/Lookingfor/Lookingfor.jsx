import React from "react";
import {
  TextField,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import { InputLabel, Input } from "@mui/material";
import "./popUpStyle.css";
import { getMe } from "../../../api/UserRequests";
import { updateMe } from "../../api/UserRequests";
//import { updateMe } from "../../api/UserRequests";
export default function Lookingfor() {
  const [user, setUser] = useState(null);
  const [dbvar, setDBVar] = useState("");

  const [formdata, setfData] = useState("");

  const [showPopup1, setShowPopup1] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleUpdateClick = () => {
    setSuccessMessage("Update successful!");
  };
  const handleUpdateerrClick = () => {
    setSuccessMessage("Update unsuccessful!");
  };

  const handleChange1 = (event) => {
    setfData(event.target.value);
    setDBVar("lookingFor.gender");
  };
  const lookgendertogglePopup = () => {
    setShowPopup1(!showPopup1);
    setSuccessMessage("");
    setfData("");
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
      {/*Set Lookingfor */}
      {showPopup1 && (
        <Box sx={{ width: "250px", height: "600px" }}>
          <div className="popup-overlay">
            <div className="popup-content">
              <Stack direction="column" spacing={2}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h5">I am finding :</Typography>
                  <IconButton variant="outline" onClick={lookgendertogglePopup}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={formdata}
                  name="radio-buttons-group"
                  onChange={handleChange1}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="both"
                    control={<Radio />}
                    label="Both"
                  />
                </RadioGroup>
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    onClick={lookgendertogglePopup}
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
        <Stack direction="column" spacing={2}>
          <Typography
            variant="h7"
            sx={{ fontFamily: "Monospace", fontSize: "h6.fontSize", m: 1 }}
          >
            Looking for <br /> <br />
          </Typography>

          <Stack
            direction="Row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography spacing={2}>
              <PersonSearchIcon /> Lookingfor :{user?.lookingFor.gender}
            </Typography>

            <Button
              variant="text"
              endIcon={<ArrowForwardIosIcon />}
              onClick={lookgendertogglePopup}
            ></Button>
          </Stack>
          <hr />
        </Stack>
      </Box>
    </div>
  );
}
