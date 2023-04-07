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

export default function LiveSelfy() {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [liveimage, setLIveImage] = useState(null);
  const dispatch = useDispatch();

  //set live image
  // const handleFileChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     setLIveImage(img);
  //     console.log(img);
  //   }
  // };
  //Upload image and rename and new name upload
  const handleUploadAndImageNameUpdate = async (e) => {
    if (url !== null) {
      const data = new FormData();
      const newImageName = Date.now() + url.name;
      data.append("name", newImageName);
      data.append("file", url);

      try {
        await dispatch(uploadImage(data));
        console.log("Live image upload and name update success");
      } catch (err) {
        console.log(err);
        console.log("Live image upload and name update unsuccess");
      }
    } else {
      console.log("No image to upload");
    }
  };

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
