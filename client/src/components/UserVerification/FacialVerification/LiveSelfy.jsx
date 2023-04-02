import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./camButtonStyle.css";

export default function LiveSelfy() {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);
  const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "environment",
  };

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    setIsWebcamEnabled(false);
  }, []);

  const onUserMedia = (e) => {
    console.log(e);
  };
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(true);

  const refreshCam = () => {
    setUrl(null);
    setIsWebcamEnabled(true);
  };

  const [state, setState] = React.useState({
    ck: true,
    ck2: true,
  });
  const { ck } = state;
  const { ck2 } = state;

  return (
    <div>
      <Box>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5">Take Selfie Photo</Typography>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={ck} name="ck" />}
              label="Take a selfie of yourself with neutral expression"
            />
            <FormControlLabel
              control={<Checkbox checked={ck2} name="ck2" />}
              label="Make sure your whole face is visible ,Centered and your eyes are open"
            />
          </FormGroup>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Stack
              direction="column"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Box>
                {isWebcamEnabled && (
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                  />
                )}
              </Box>
            </Stack>
            {url && (
              <Box sx={{ width: "200px" }}>
                <img src={url} alt="Screenshot" />
              </Box>
            )}
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <button onClick={capturePhoto} className="buttonStyle">
              Capture
            </button>
            <button onClick={refreshCam} className="buttonStyle">
              Refresh
            </button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
