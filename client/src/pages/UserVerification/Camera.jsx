import React, { useRef } from "react";
import Webcam from "react-webcam";
import { Stack } from "@mui/system";

const videoConstraints = {
  width: 240,
  facingMode: "environment",
};

const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  // const capturePhoto = React.useCallback(async () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setUrl(imageSrc);
  // }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  const capturePhoto = React.useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
        />
        <button onClick={capturePhoto}>Capture</button>
        <button onClick={() => setUrl(null)}>Refresh</button>
        {url && (
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        )}
      </Stack>
    </>
  );
};

export default Camera;
