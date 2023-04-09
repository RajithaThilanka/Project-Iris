import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./camButtonStyle.css";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../actions/UploadAction";

export default function LiveSelfy(props) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();

  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);
  const [liveImageName, setLiveImageName] = useState("");

  const handleUploadAndImageNameUpdate = async (e) => {
    if (url !== null) {
      const data = new FormData();
      const newLiveImageName = Date.now() + ".jpeg";

      // Convert data URL to blob
      const blob = await fetch(url).then((r) => r.blob());

      // Create new File object with desired name and type
      const file = new File([blob], newLiveImageName, { type: "image/jpeg" });

      data.append("name", newLiveImageName);
      setLiveImageName(newLiveImageName);

      //props.onSelectLiveImage(liveImageName);

      data.append("file", file);

      try {
        props.onSelectLiveImage(liveImageName);
        await dispatch(uploadImage(data));
        console.log("Live image upload success");
      } catch (err) {
        console.log(err);
        console.log("Live image upload unsuccess");
      }
    } else {
      console.log("No image to upload");
    }
  };

  const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "environment",
  };

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    setIsWebcamEnabled(false);
    setCapturedImage(1);
  }, []);

  const onUserMedia = (e) => {
    console.log(e);
  };
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(true);

  const refreshCam = () => {
    setUrl(null);
    setIsWebcamEnabled(true);
    setCapturedImage(null);
  };

  const [state, setState] = React.useState({
    ck: true,
    ck2: true,
  });
  const { ck } = state;
  const { ck2 } = state;

  const [capturedImage, setCapturedImage] = useState(null);

  const handleCaptureAndReset = () => {
    if (capturedImage === null) {
      capturePhoto();
    } else {
      refreshCam();
    }
  };

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
                    screenshotQuality={1}
                    imageSmoothing={true}
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
            <Button onClick={handleCaptureAndReset} variant="outlined">
              {capturedImage === null ? "Capture" : "Reset"}
            </Button>
            {capturedImage !== null && (
              <Button
                onClick={handleUploadAndImageNameUpdate}
                variant="outlined"
              >
                Upload
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
