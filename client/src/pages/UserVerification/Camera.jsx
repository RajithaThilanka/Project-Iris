import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Stack, Box, Button } from "@mui/material";
import "./camButtonStyle.css";

const videoConstraints = {
  width: 200,
  height: 200,
  facingMode: "environment",
};

const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

<<<<<<< HEAD
  // const capturePhoto = React.useCallback(async () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setUrl(imageSrc);
  // }, [webcamRef]);
=======
  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    setIsWebcamEnabled(false);
  }, []);
>>>>>>> 3596e5f4ade07003d8d79a5a6d99cdeba43c7ec8

  const onUserMedia = (e) => {
    console.log(e);
  };
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(true);

  const refreshCam = () => {
    setUrl(null);
    setIsWebcamEnabled(true);
  };

  const capturePhoto = React.useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Stack direction="column" spacing={1} alignItems="center">
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
      <Stack spacing={2} direction="row">
        <button onClick={capturePhoto} className="buttonStyle">
          Capture
        </button>
        <button onClick={refreshCam} className="buttonStyle">
          Refresh
        </button>
      </Stack>
    </>
  );
};

export default Camera;
