import VerificationCard from "./VerificationCard";
import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import ContinueCard from "./ContinueCard";
import AssignmentTurnedInTwoToneIcon from "@mui/icons-material/AssignmentTurnedInTwoTone";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Link } from "react-router-dom";
import Camera from "./Camera.jsx";
import { useState } from "react";

function SelfiPhoto() {
  const camaramode = false;
  const switchcamara = {
    camaramode: true,
  };
  const [Clicked, setClicked] = useState(false);
  return (
    <div>
      <VerificationCard title={"Take Selfie Photo"}>
        <Stack spacing={2}>
          <FormLabel>
            <AssignmentTurnedInTwoToneIcon />
            Take a selfie of yourself with neutral expression
          </FormLabel>
          <FormLabel>
            <AssignmentTurnedInTwoToneIcon />
            Make sure your whole face is visible ,Centered and your eyes are
            open
          </FormLabel>
        </Stack>
        <Button
          variant="contained"
          component="label"
          className="upload-button"
          onClick={() => {
            setClicked(true);
          }}
        >
          Take a Selfie
          {/* <input hidden accept="image/*" multiple type="file" /> */}
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            {/* <input hidden accept="image/*" type="file" /> */}
            <PhotoCamera />
          </IconButton>
        </Button>
        {/* if(camaramode === true){<Camera />} */}
        {Clicked && <Camera />}
        <Button
          type="submit"
          variant="contained"
          // disabled={loading}
          className="continue"
        >
          <Link to="/database" className="link-css">
            Submit
          </Link>
        </Button>
        <Typography
          sx={{ fontSize: 22, fontFamily: "Poppins, sans-serif", color: "red" }}
        >
          Iris
        </Typography>
      </VerificationCard>
    </div>
  );
}

export default SelfiPhoto;
