import VerificationCard from "./VerificationCard";
import { Stack, Typography, FormLabel } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AssignmentTurnedInTwoToneIcon from "@mui/icons-material/AssignmentTurnedInTwoTone";
import ContinueCard from "./ContinueCard";
import { useState } from "react";
import axios from "axios";
import { Form } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

function UploadImages() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [user, setUser] = useState(null);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const [formData, setData] = useState({
    profilePhoto: "",
  });

  // const dispatch = UseDispatch();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      console.log(img);
    }
  };

  const handleUpload = async (e) => {
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);

      // newPost.image = fileName;
      setData({ ...formData, profilePhoto: fileName });
      try {
        //dispatch(UploadImages(data));
        setUploaded(true);
      } catch (err) {
        console.log(err);
        setUploaded(false);
      }
    } else {
      toast.error("No image is chosen", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
  };

  return (
    <div>
      <VerificationCard title={"Upload Image of ID Card"}>
        <Stack spacing={2}>
          <FormLabel>
            <AssignmentTurnedInTwoToneIcon />
            Government-issued
          </FormLabel>
          <FormLabel>
            <AssignmentTurnedInTwoToneIcon />
            Original Full-size unedited documents
          </FormLabel>
          <FormLabel>
            <AssignmentTurnedInTwoToneIcon />
            Readable, Well-it, Coloured images
          </FormLabel>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            variant="contained"
            component="label"
            className="upload-button"
            onChange={handleFileChange}
          >
            Upload Font Page
            <input
              hidden
              accept="image/*"
              multiple={true}
              type="file"
              //onChange={handleFileChange}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
              <PhotoCamera />
            </IconButton>
          </Button>

          <Button
            variant="contained"
            component="label"
            className="upload-button"
            onChange={handleFileChange}
            onClick={() => {
              setUrl(true);
            }}
          >
            Upload Back Page
            <input hidden accept="image/*" multiple type="file" />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Button>
        </Stack>
        <ContinueCard nextpage={"/selfiPhoto"} onChange={handleUpload} />
        <Typography
          sx={{ fontSize: 22, fontFamily: "Poppins, sans-serif", color: "red" }}
        >
          Iris
        </Typography>
        {url && console.log("upload to the database")}
      </VerificationCard>
    </div>
  );
}

export default UploadImages;
